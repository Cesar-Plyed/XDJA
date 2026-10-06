import { FC, useState, useEffect, useRef, FormEvent, ChangeEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Project } from '@types_cm/api';
import { Spinner } from '@components/atoms/Spinner/Spinner';
import { Button } from '@components/atoms/Button/Button';
import { api, ApiError } from '@lib/api';
import { Typography } from '@components/atoms/Typography/Typography';
import { Card, CardBody, CardHeader } from '@components/molecules/Card/Card';
import { FormField } from '@components/molecules/FormField/FormField';
import { useI18n } from '@i18n/useI18n';
import { Icon, IconName } from '@components/atoms/Icon/Icon';
import { Rating } from '@components/molecules/Rating/Rating';
import { useAdminReviews, useReviewHistory } from '@hooks/useApi';
import { useSeo } from '@hooks/useSeo';

type AdminDashboardPageProps = Record<string, never>;

const MAX_IMAGES = 5;
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const PAGE_SIZE = 10;

const TAB_IDS = ['overview', 'projects', 'reviews', 'settings'] as const;
type AdminTab = (typeof TAB_IDS)[number];

type PendingDelete = {
  kind: 'review' | 'project';
  id: string;
  title: string;
};

type Feedback = {
  tone: 'success' | 'error';
  text: string;
};

export const AdminDashboardPage: FC<AdminDashboardPageProps> = () => {
  const { t, locale } = useI18n();
  const seo = useSeo({
    title: t('seo.admin.title'),
    description: t('seo.admin.description'),
    noindex: true,
  });
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [reviewsPage, setReviewsPage] = useState(1);
  const [historyPage, setHistoryPage] = useState(1);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [pendingDelete, setPendingDelete] = useState<PendingDelete | null>(null);
  const [deleting, setDeleting] = useState(false);
  const confirmRef = useRef<HTMLDivElement>(null);

  const reviews = useAdminReviews(reviewsPage, PAGE_SIZE);
  const history = useReviewHistory(historyPage, PAGE_SIZE);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrls: [] as string[],
  });

  // Tab state lives in the URL (?tab=reviews) so it is deep-linkable.
  const tabParam = searchParams.get('tab');
  const activeTab: AdminTab = (TAB_IDS as readonly string[]).includes(tabParam ?? '')
    ? (tabParam as AdminTab)
    : 'overview';
  const setActiveTab = (id: AdminTab) => setSearchParams({ tab: id });

  useEffect(() => {
    const token = localStorage.getItem('xdja-auth-token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchProjects();
  }, [navigate]);

  // Refresh already failed fatally (or no refresh token exists): the admin
  // session is gone — drop the stale keys and return to the login screen.
  useEffect(() => {
    if (history.error instanceof ApiError && history.error.status === 401) {
      api.clearSession();
      navigate('/login');
    }
  }, [history.error, navigate]);

  // Keep the confirm dialog keyboard-friendly while it is open.
  useEffect(() => {
    if (!pendingDelete) return;
    confirmRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPendingDelete(null);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [pendingDelete]);

  const formatDate = (iso: string) =>
    new Intl.DateTimeFormat(locale === 'es' ? 'es' : 'en', { dateStyle: 'medium' }).format(new Date(iso));

  const totalPages = (total: number) => Math.max(1, Math.ceil(total / PAGE_SIZE));

  const projectTitle = (projectId: string | null) => {
    if (!projectId) return t('admin.no_project');
    return projects.find((p) => p.id === projectId)?.title ?? t('admin.no_project');
  };

  /** Maps API errors to translated, actionable copy; flags dead sessions. */
  const describeError = (err: unknown, fallbackKey: string) => {
    if (err instanceof ApiError) {
      if (err.status === 401) return { sessionExpired: true, message: t('admin.session_expired') };
      if (err.status === 404) return { sessionExpired: false, message: t('admin.not_found') };
      if (err.status === 429) return { sessionExpired: false, message: t('admin.too_many_requests') };
      if (err.status >= 500) return { sessionExpired: false, message: t('admin.server_unavailable') };
    }
    return { sessionExpired: false, message: t(fallbackKey) };
  };

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.getProjects(1, 50);
      setProjects(response.items);
    } catch (err) {
      console.error('Failed to load projects:', err);
      setError(t('admin.load_error'));
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    fetchProjects();
  };

  const handleLogout = async () => {
    await api.logout();
    navigate('/login');
  };

  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    e.target.value = '';

    const imageFiles = files.filter((f) => f.type.startsWith('image/'));

    if (formData.imageUrls.length + imageFiles.length > MAX_IMAGES) {
      setUploadError(t('admin.max_images'));
      return;
    }

    setUploadingImages(true);
    setUploadError(null);

    try {
      for (const file of imageFiles) {
        if (file.size > MAX_FILE_SIZE) {
          setUploadError(t('admin.upload_error'));
          continue;
        }

        try {
          const url = await api.uploadImage(file);
          setFormData((prev) => ({
            ...prev,
            imageUrls: [...prev.imageUrls, url],
          }));
        } catch {
          setUploadError(t('admin.upload_error'));
        }
      }
    } finally {
      setUploadingImages(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index),
    }));
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', imageUrls: [] });
    setEditingProject(null);
    setShowCreateProject(false);
    setUploadError(null);
  };

  const handleCreateProject = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.createProject({
        title: formData.title,
        description: formData.description,
        imageUrls: formData.imageUrls,
      });
      resetForm();
      fetchProjects();
    } catch (err) {
      console.error('Failed to create project:', err);
      const info = describeError(err, 'admin.save_failed');
      setFeedback({ tone: 'error', text: info.message });
      if (info.sessionExpired) {
        api.clearSession();
        navigate('/login');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const openDeleteConfirm = (kind: PendingDelete['kind'], id: string, title: string) => {
    setFeedback(null);
    setPendingDelete({ kind, id, title });
  };

  const handleDeleteProject = (project: Project) => {
    openDeleteConfirm('project', project.id, project.title);
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    setDeleting(true);

    try {
      if (pendingDelete.kind === 'review') {
        await api.deleteReview(pendingDelete.id);
        setFeedback({ tone: 'success', text: t('admin.review_deleted') });
        // Avoid an empty page when the last item of a page is removed.
        if (reviews.data && reviews.data.items.length === 1 && reviewsPage > 1) {
          setReviewsPage(reviewsPage - 1);
        } else {
          reviews.refetch();
        }
        history.refetch();
      } else {
        await api.deleteProject(pendingDelete.id);
        setFeedback({ tone: 'success', text: t('admin.project_deleted') });
        // Deleting a project moves its reviews to history too.
        fetchProjects();
        reviews.refetch();
        history.refetch();
      }
      setPendingDelete(null);
    } catch (err) {
      const info = describeError(err, 'admin.delete_failed');
      setPendingDelete(null);
      if (info.sessionExpired) {
        api.clearSession();
        navigate('/login');
        return;
      }
      setFeedback({ tone: 'error', text: info.message });
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-page">
        {seo}
        <div className="admin-page__loading">
          <Spinner size="lg" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-page">
        {seo}
        <div className="admin-page__error-state">
          <Icon name="shield" size={48} className="admin-page__error-icon" />
          <Typography variant="p" color="muted" className="admin-page__error-text">
            {error}
          </Typography>
          <Button variant="primary" onClick={handleRetry} leftIcon={<Icon name="loader2" size={16} />}>
            {t('admin.retry')}
          </Button>
        </div>
      </div>
    );
  }

  const adminTabs: { id: AdminTab; label: string; icon: IconName }[] = [
    { id: 'overview', label: t('admin.overview'), icon: 'layoutDashboard' },
    { id: 'projects', label: t('admin.projects'), icon: 'images' },
    { id: 'reviews', label: t('admin.reviews'), icon: 'star' },
    { id: 'settings', label: t('admin.settings'), icon: 'settings' },
  ];

  const reviewsTotalPages = reviews.data ? totalPages(reviews.data.total) : 1;
  const historyTotalPages = history.data ? totalPages(history.data.total) : 1;

  return (
    <div className="admin-page">
      {seo}
      <header className="admin-page__header">
        <div className="admin-page__header-left">
          <Typography variant="h1" weight="bold" className="admin-page__title">
            {t('admin.dashboard')}
          </Typography>
          <Typography variant="p" color="muted" className="admin-page__subtitle">
            {t('admin.dashboard_subtitle')}
          </Typography>
        </div>
        <div className="admin-page__header-right">
          <Button variant="ghost" onClick={handleLogout} leftIcon={<Icon name="logOut" size={18} />}>
            {t('auth.logout')}
          </Button>
        </div>
      </header>

      <nav className="admin-page__tabs" role="tablist" aria-label={t('admin.tabs_label')}>
        {adminTabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`${tab.id}-panel`}
            id={`${tab.id}-tab`}
            className={`admin-page__tab ${activeTab === tab.id ? 'admin-page__tab--active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <Icon name={tab.icon} size={20} />
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="admin-page__content">
        {feedback && (
          <div
            className={`admin-page__feedback admin-page__feedback--${feedback.tone}`}
            role="status"
            aria-live="polite"
          >
            <Icon name={feedback.tone === 'success' ? 'check' : 'shield'} size={18} aria-hidden="true" />
            <Typography variant="small" className="admin-page__feedback-text">
              {feedback.text}
            </Typography>
            <button
              type="button"
              className="admin-page__feedback-close"
              onClick={() => setFeedback(null)}
              aria-label={t('admin.dismiss_message')}
            >
              <Icon name="x" size={14} aria-hidden="true" />
            </button>
          </div>
        )}

        {activeTab === 'overview' && (
          <div role="tabpanel" id="overview-panel" aria-labelledby="overview-tab">
            <div className="admin-page__stats">
              <Card variant="outlined" padding="lg" className="admin-page__stat-card">
                <CardBody>
                  <div className="admin-page__stat">
                    <Icon name="images" size={32} className="admin-page__stat-icon" />
                    <div className="admin-page__stat-info">
                      <Typography variant="h2" weight="bold" className="admin-page__stat-value">
                        {projects.length}
                      </Typography>
                      <Typography variant="small" color="muted" className="admin-page__stat-label">
                        {t('admin.total_projects')}
                      </Typography>
                    </div>
                  </div>
                </CardBody>
              </Card>
              <Card variant="outlined" padding="lg" className="admin-page__stat-card">
                <CardBody>
                  <div className="admin-page__stat">
                    <Icon name="star" size={32} className="admin-page__stat-icon" />
                    <div className="admin-page__stat-info">
                      <Typography variant="h2" weight="bold" className="admin-page__stat-value">
                        {reviews.data ? reviews.data.total : '—'}
                      </Typography>
                      <Typography variant="small" color="muted" className="admin-page__stat-label">
                        {t('admin.total_reviews')}
                      </Typography>
                    </div>
                  </div>
                </CardBody>
              </Card>
              <Card variant="outlined" padding="lg" className="admin-page__stat-card">
                <CardBody>
                  <div className="admin-page__stat">
                    <Icon name="trash2" size={32} className="admin-page__stat-icon" />
                    <div className="admin-page__stat-info">
                      <Typography variant="h2" weight="bold" className="admin-page__stat-value">
                        {history.data ? history.data.total : '—'}
                      </Typography>
                      <Typography variant="small" color="muted" className="admin-page__stat-label">
                        {t('admin.recently_deleted')}
                      </Typography>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>

            <Card variant="outlined" padding="lg" className="admin-page__recent">
              <CardHeader>
                <Typography variant="h3" weight="semibold">{t('admin.recent_projects')}</Typography>
              </CardHeader>
              <CardBody>
                {projects.slice(0, 5).length === 0 ? (
                  <Typography variant="p" color="muted" className="admin-page__empty">
                    {t('admin.no_projects_yet')}
                  </Typography>
                ) : (
                  <div className="admin-page__project-list">
                    {projects.slice(0, 5).map((project) => (
                      <div key={project.id} className="admin-page__project-item">
                        <div className="admin-page__project-info">
                          <Typography variant="p" weight="medium">{project.title}</Typography>
                          <Typography variant="small" color="muted">
                            {formatDate(project.createdAt)}
                          </Typography>
                        </div>
                        <div className="admin-page__project-actions">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingProject(project)}
                            leftIcon={<Icon name="edit" size={16} />}
                          >
                            {t('admin.edit')}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteProject(project)}
                            leftIcon={<Icon name="trash2" size={16} />}
                            className="admin-page__delete-btn"
                          >
                            {t('admin.delete')}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardBody>
            </Card>
          </div>
        )}

        {activeTab === 'projects' && (
          <div role="tabpanel" id="projects-panel" aria-labelledby="projects-tab">
            <div className="admin-page__toolbar">
              <Typography variant="h2" weight="bold">{t('admin.manage_projects')}</Typography>
              <Button
                variant="primary"
                onClick={() => { setEditingProject(null); setFormData({ title: '', description: '', imageUrls: [] }); setShowCreateProject(true); }}
                leftIcon={<Icon name="plus" size={18} />}
              >
                {t('admin.add_project')}
              </Button>
            </div>

            <Card variant="outlined" padding="none" className="admin-page__table-card">
              <CardBody className="admin-page__table-body">
                {projects.length === 0 ? (
                  <div className="admin-page__empty-state">
                    <Icon name="images" size={64} className="admin-page__empty-icon" />
                    <Typography variant="h3" weight="semibold" className="admin-page__empty-title">
                      {t('admin.no_projects')}
                    </Typography>
                    <Typography variant="p" color="muted" className="admin-page__empty-text">
                      {t('admin.no_projects_text')}
                    </Typography>
                    <Button
                      variant="primary"
                      onClick={() => { setEditingProject(null); setFormData({ title: '', description: '', imageUrls: [] }); setShowCreateProject(true); }}
                      leftIcon={<Icon name="plus" size={18} />}
                    >
                      {t('admin.add_first_project')}
                    </Button>
                  </div>
                ) : (
                  <div className="admin-page__table-wrapper">
                    <table className="admin-page__table" role="grid">
                      <thead>
                        <tr>
                          <th scope="col">{t('admin.project_image')}</th>
                          <th scope="col">{t('admin.project_title')}</th>
                          <th scope="col">{t('admin.project_description')}</th>
                          <th scope="col">{t('admin.project_created')}</th>
                          <th scope="col">{t('admin.actions')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {projects.map((project) => (
                          <tr key={project.id}>
                            <td>
                              {project.images && project.images.length > 0 ? (
                                <img
                                  src={project.images[0].url}
                                  alt={project.title}
                                  width={64}
                                  height={44}
                                  className="admin-page__project-thumb"
                                  loading="lazy"
                                />
                              ) : (
                                <div className="admin-page__no-image">
                                  <Icon name="image" size={24} />
                                </div>
                              )}
                            </td>
                            <td>
                              <Typography variant="p" weight="medium">{project.title}</Typography>
                            </td>
                            <td>
                              <Typography variant="small" color="muted" className="admin-page__description-cell">
                                {project.description || t('admin.no_description')}
                              </Typography>
                            </td>
                            <td>
                              <Typography variant="small" color="muted">
                                {formatDate(project.createdAt)}
                              </Typography>
                            </td>
                            <td>
                              <div className="admin-page__action-buttons">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setEditingProject(project);
                                    setFormData({
                                      title: project.title,
                                      description: project.description ?? '',
                                      imageUrls: project.images?.map((img) => img.url) ?? [],
                                    });
                                    setShowCreateProject(true);
                                  }}
                                  leftIcon={<Icon name="edit" size={16} />}
                                  aria-label={t('admin.edit_project') + ' ' + project.title}
                                />
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteProject(project)}
                                  leftIcon={<Icon name="trash2" size={16} />}
                                  className="admin-page__delete-btn"
                                  aria-label={t('admin.delete_project') + ' ' + project.title}
                                />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardBody>
            </Card>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div role="tabpanel" id="reviews-panel" aria-labelledby="reviews-tab">
            <div className="admin-page__toolbar">
              <Typography variant="h2" weight="bold">{t('admin.manage_reviews')}</Typography>
              <Button
                variant="ghost"
                onClick={() => { reviews.refetch(); history.refetch(); }}
                leftIcon={<Icon name="loader2" size={18} />}
              >
                {t('admin.refresh')}
              </Button>
            </div>

            <Card variant="outlined" padding="none" className="admin-page__table-card">
              <CardBody className="admin-page__table-body">
                {reviews.loading && !reviews.data ? (
                  <div className="admin-page__table-loading">
                    <Spinner size="sm" />
                  </div>
                ) : reviews.error ? (
                  <div className="admin-page__empty-state">
                    <Icon name="shield" size={48} className="admin-page__empty-icon" />
                    <Typography variant="p" color="muted">
                      {describeError(reviews.error, 'admin.reviews_load_error').message}
                    </Typography>
                    <Button variant="primary" onClick={reviews.refetch} leftIcon={<Icon name="loader2" size={16} />}>
                      {t('admin.retry')}
                    </Button>
                  </div>
                ) : !reviews.data || reviews.data.items.length === 0 ? (
                  <div className="admin-page__empty-state">
                    <Icon name="star" size={64} className="admin-page__empty-icon" />
                    <Typography variant="h3" weight="semibold" className="admin-page__empty-title">
                      {t('admin.no_reviews')}
                    </Typography>
                    <Typography variant="p" color="muted" className="admin-page__empty-text">
                      {t('admin.no_reviews_text')}
                    </Typography>
                  </div>
                ) : (
                  <>
                    <div className="admin-page__table-wrapper">
                      <table className="admin-page__table" role="grid">
                        <thead>
                          <tr>
                            <th scope="col">{t('admin.rating')}</th>
                            <th scope="col">{t('admin.review_text')}</th>
                            <th scope="col">{t('admin.author')}</th>
                            <th scope="col">{t('admin.project_title')}</th>
                            <th scope="col">{t('admin.date')}</th>
                            <th scope="col">{t('admin.actions')}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {reviews.data.items.map((review) => (
                            <tr key={review.id}>
                              <td>
                                <Rating
                                  value={review.rating}
                                  size="sm"
                                  ariaLabel={t('admin.rating_aria', { value: review.rating })}
                                />
                              </td>
                              <td>
                                <Typography variant="small" color="muted" className="admin-page__description-cell">
                                  {review.description}
                                </Typography>
                              </td>
                              <td>
                                <Typography variant="small" weight="medium">
                                  {review.alias ?? t('admin.anonymous')}
                                </Typography>
                              </td>
                              <td>
                                <Typography variant="small" color="muted">
                                  {projectTitle(review.projectId)}
                                </Typography>
                              </td>
                              <td>
                                <Typography variant="small" color="muted">
                                  {formatDate(review.createdAt)}
                                </Typography>
                              </td>
                              <td>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => openDeleteConfirm('review', review.id, review.description)}
                                  leftIcon={<Icon name="trash2" size={16} />}
                                  className="admin-page__delete-btn"
                                  aria-label={t('admin.delete_review')}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {reviews.data.total > PAGE_SIZE && (
                      <div className="admin-page__pagination">
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={reviewsPage <= 1}
                          onClick={() => setReviewsPage((p) => p - 1)}
                          leftIcon={<Icon name="chevronLeft" size={16} />}
                        >
                          {t('admin.prev_page')}
                        </Button>
                        <Typography variant="small" color="muted">
                          {t('admin.page_of', { current: reviewsPage, total: reviewsTotalPages })}
                        </Typography>
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={reviewsPage >= reviewsTotalPages}
                          onClick={() => setReviewsPage((p) => p + 1)}
                          rightIcon={<Icon name="chevronRight" size={16} />}
                        >
                          {t('admin.next_page')}
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </CardBody>
            </Card>

            <Card variant="outlined" padding="lg">
              <CardHeader>
                <div className="admin-page__history-header">
                  <Typography variant="h3" weight="semibold">{t('admin.deleted_section_title')}</Typography>
                  <Typography variant="small" color="muted">{t('admin.deleted_retention_note')}</Typography>
                </div>
              </CardHeader>
              <CardBody>
                {history.loading && !history.data ? (
                  <div className="admin-page__table-loading">
                    <Spinner size="sm" />
                  </div>
                ) : history.error ? (
                  <div className="admin-page__empty">
                    <Typography variant="p" color="muted">
                      {describeError(history.error, 'admin.reviews_load_error').message}
                    </Typography>
                    <Button variant="ghost" size="sm" onClick={history.refetch} leftIcon={<Icon name="loader2" size={16} />}>
                      {t('admin.retry')}
                    </Button>
                  </div>
                ) : !history.data || history.data.items.length === 0 ? (
                  <Typography variant="p" color="muted" className="admin-page__empty">
                    {t('admin.no_deleted_reviews')}
                  </Typography>
                ) : (
                  <>
                    <div className="admin-page__project-list">
                      {history.data.items.map((item) => (
                        <div key={item.id} className="admin-page__project-item">
                          <div className="admin-page__project-info">
                            <Typography variant="p" weight="medium" className="admin-page__description-cell">
                              {item.description}
                            </Typography>
                            <Typography variant="small" weight="medium">
                              {item.alias ?? t('admin.anonymous')}
                            </Typography>
                            <Typography variant="small" color="muted">
                              {t('admin.deleted_on', { date: formatDate(item.deletedAt) })}
                            </Typography>
                          </div>
                          <Rating
                            value={item.rating}
                            size="sm"
                            ariaLabel={t('admin.rating_aria', { value: item.rating })}
                          />
                        </div>
                      ))}
                    </div>
                    {history.data.total > PAGE_SIZE && (
                      <div className="admin-page__pagination">
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={historyPage <= 1}
                          onClick={() => setHistoryPage((p) => p - 1)}
                          leftIcon={<Icon name="chevronLeft" size={16} />}
                        >
                          {t('admin.prev_page')}
                        </Button>
                        <Typography variant="small" color="muted">
                          {t('admin.page_of', { current: historyPage, total: historyTotalPages })}
                        </Typography>
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={historyPage >= historyTotalPages}
                          onClick={() => setHistoryPage((p) => p + 1)}
                          rightIcon={<Icon name="chevronRight" size={16} />}
                        >
                          {t('admin.next_page')}
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </CardBody>
            </Card>
          </div>
        )}

        {activeTab === 'settings' && (
          <div role="tabpanel" id="settings-panel" aria-labelledby="settings-tab">
            <Typography variant="h2" weight="bold" className="admin-page__section-title">
              {t('admin.settings')}
            </Typography>
            <Card variant="outlined" padding="lg">
              <CardBody>
                <Typography variant="p" color="muted">
                  {t('admin.settings_coming_soon')}
                </Typography>
              </CardBody>
            </Card>
          </div>
        )}
      </div>

      {pendingDelete && (
        <div className="admin-page__modal-overlay" onClick={() => setPendingDelete(null)}>
          <div
            ref={confirmRef}
            className="admin-page__modal admin-page__confirm"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="confirm-delete-title"
            aria-describedby="confirm-delete-text"
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-page__confirm-body">
              <Icon name="shield" size={32} className="admin-page__confirm-icon" aria-hidden="true" />
              <Typography variant="h3" weight="semibold" id="confirm-delete-title">
                {t('admin.confirm_delete_title')}
              </Typography>
              <Typography variant="p" color="muted" id="confirm-delete-text">
                {pendingDelete.kind === 'review' ? t('admin.confirm_delete_review') : t('admin.confirm_delete')}
              </Typography>
              <Typography variant="small" weight="medium" className="admin-page__confirm-item">
                {pendingDelete.title}
              </Typography>
            </div>
            <div className="admin-page__form-actions">
              <Button variant="ghost" onClick={() => setPendingDelete(null)} disabled={deleting}>
                {t('common.cancel')}
              </Button>
              <Button
                variant="ghost"
                className="admin-page__delete-btn"
                onClick={confirmDelete}
                isLoading={deleting}
                leftIcon={<Icon name="trash2" size={16} />}
              >
                {t('admin.delete')}
              </Button>
            </div>
          </div>
        </div>
      )}

      {(showCreateProject || editingProject) && (
        <div className="admin-page__modal-overlay" onClick={resetForm}>
          <div className="admin-page__modal" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <Typography variant="h3" weight="semibold">
                {editingProject ? t('admin.edit_project_title') : t('admin.add_project_title')}
              </Typography>
              <Button
                variant="ghost"
                size="sm"
                onClick={resetForm}
                aria-label={t('common.close')}
              >
                <Icon name="x" size={24} />
              </Button>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleCreateProject} className="admin-page__project-form">
                <FormField
                  label={t('admin.project_title')}
                  value={formData.title}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder={t('admin.project_title_placeholder')}
                  required
                  fullWidth
                />
                <FormField
                  label={t('admin.project_description')}
                  value={formData.description}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder={t('admin.project_description_placeholder')}
                  fullWidth
                />
                <div className="admin-page__upload-section">
                  <label className="admin-page__upload-label">
                    <Icon name="image" size={16} />
                    {t('admin.upload_images')}
                  </label>
                  <label className="admin-page__upload-area" aria-label={t('admin.drag_drop')}>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileSelect}
                      disabled={uploadingImages || formData.imageUrls.length >= MAX_IMAGES}
                      className="admin-page__file-input"
                    />
                    <Icon name="upload" size={32} className="admin-page__upload-icon" />
                    <Typography variant="small" color="muted">
                      {t('admin.drag_drop')}
                    </Typography>
                    <Typography variant="small" color="muted" className="admin-page__upload-hint">
                      {t('admin.max_images')} · 5 MB {t('admin.upload_button').toLowerCase()}
                    </Typography>
                  </label>
                  {uploadingImages && (
                    <div className="admin-page__upload-indicator">
                      <Spinner size="sm" />
                      <Typography variant="small">{t('admin.uploading')}</Typography>
                    </div>
                  )}
                  {uploadError && (
                    <Typography variant="small" color="error" className="admin-page__upload-error">
                      {uploadError}
                    </Typography>
                  )}
                  {formData.imageUrls.length > 0 && (
                    <div className="admin-page__image-preview">
                      {formData.imageUrls.map((url, idx) => (
                        <div key={idx} className="admin-page__image-thumb">
                          <img src={url} alt={`Preview ${idx + 1}`} width={80} height={64} className="admin-page__image-preview-img" loading="lazy" />
                          <button
                            type="button"
                            className="admin-page__image-remove"
                            onClick={() => handleRemoveImage(idx)}
                            aria-label={t('admin.remove_image')}
                          >
                            <Icon name="x" size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="admin-page__form-actions">
                  <Button
                    variant="ghost"
                    onClick={resetForm}
                  >
                    {t('common.cancel')}
                  </Button>
                  <Button variant="primary" type="submit" isLoading={isSubmitting} disabled={formData.imageUrls.length === 0}>
                    {editingProject ? t('admin.save_changes') : t('admin.create_project')}
                  </Button>
                </div>
              </form>
            </CardBody>
          </div>
        </div>
      )}
    </div>
  );
};

export type { AdminDashboardPageProps };
