import { FC, useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Project } from '@types_cm/api';
import { Spinner } from '@components/atoms/Spinner/Spinner';
import { Button } from '@components/atoms/Button/Button';
import { api } from '@lib/api';
import { Typography } from '@components/atoms/Typography/Typography';
import { Card, CardBody, CardHeader } from '@components/molecules/Card/Card';
import { FormField } from '@components/molecules/FormField/FormField';
import { useI18n } from '@i18n/useI18n';
import { Icon, IconName } from '@components/atoms/Icon/Icon';

type AdminDashboardPageProps = Record<string, never>;

const MAX_IMAGES = 5;
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const AdminDashboardPage: FC<AdminDashboardPageProps> = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'reviews' | 'settings'>('overview');
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrls: [] as string[],
  });

  useEffect(() => {
    const token = localStorage.getItem('xdja-auth-token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchProjects();
  }, [navigate]);

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

  const handleLogout = () => {
    localStorage.removeItem('xdja-auth-token');
    localStorage.removeItem('xdja-user');
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
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!window.confirm(t('admin.confirm_delete'))) return;
    try {
      setProjects((prev) => prev.filter((p) => p.id !== projectId));
    } catch (err) {
      console.error('Failed to delete project:', err);
    }
  };

  if (loading) {
    return (
      <div className="admin-page">
        <div className="admin-page__loading">
          <Spinner size="lg" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-page">
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

  const adminTabs: { id: typeof activeTab; label: string; icon: IconName }[] = [
    { id: 'overview', label: t('admin.overview'), icon: 'layoutDashboard' },
    { id: 'projects', label: t('admin.projects'), icon: 'images' },
    { id: 'reviews', label: t('admin.reviews'), icon: 'star' },
    { id: 'settings', label: t('admin.settings'), icon: 'settings' },
  ];

  return (
    <div className="admin-page">
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
                        0
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
                    <Icon name="messageSquare" size={32} className="admin-page__stat-icon" />
                    <div className="admin-page__stat-info">
                      <Typography variant="h2" weight="bold" className="admin-page__stat-value">
                        0
                      </Typography>
                      <Typography variant="small" color="muted" className="admin-page__stat-label">
                        {t('admin.pending_reviews')}
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
                            {new Date(project.createdAt).toLocaleDateString()}
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
                            onClick={() => handleDeleteProject(project.id)}
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
                                {new Date(project.createdAt).toLocaleDateString()}
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
                                  onClick={() => handleDeleteProject(project.id)}
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
            <Typography variant="h2" weight="bold" className="admin-page__section-title">
              {t('admin.manage_reviews')}
            </Typography>
            <Card variant="outlined" padding="lg">
              <CardBody>
                <Typography variant="p" color="muted">
                  {t('admin.reviews_coming_soon')}
                </Typography>
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
                          <img src={url} alt={`Preview ${idx + 1}`} className="admin-page__image-preview-img" loading="lazy" />
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
