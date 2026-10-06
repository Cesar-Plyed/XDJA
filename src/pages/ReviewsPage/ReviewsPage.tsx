import { ChangeEvent, FC, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { WRITE_REVIEW_PARAM } from '@routes/paths';
import { useProjects } from '@hooks/useApi';
import { useI18n } from '@i18n/useI18n';
import type { Review } from '@lib/api';
import { Button } from '@components/atoms/Button/Button';
import { Icon } from '@components/atoms/Icon/Icon';
import { Label } from '@components/atoms/Label/Label';
import { Spinner } from '@components/atoms/Spinner/Spinner';
import { Typography } from '@components/atoms/Typography/Typography';
import { useReviews } from '@hooks/useReviews';
import { useSeo } from '@hooks/useSeo';
import { ReviewForm } from '@components/organisms/ReviewForm/RevireFrom';
import { ReviewCard } from '@components/molecules/ReviewCard/ReviewCard';

export const ReviewsPage: FC = () => {
  const { t } = useI18n();
  const seo = useSeo({
    title: t('seo.reviews.title'),
    description: t('seo.reviews.description'),
  });
  const { data: projectsData } = useProjects(1, 50);
  const projects = useMemo(() => projectsData?.items ?? [], [projectsData]);

  const [filterProjectId, setFilterProjectId] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { items, total, loading, loadingMore, error, hasMore, loadMore, refetch, prepend } =
    useReviews(filterProjectId || null, 9);

  const projectTitleById = useMemo(
    () => new Map(projects.map((p) => [p.id, p.title])),
    [projects]
  );

  const handleCreated = (review: Review) => {
    // Only prepend it when it matches the active filter
    if (!filterProjectId || review.projectId === filterProjectId) prepend(review);
  };

  const renderList = () => {
    if (loading) {
      return (
        <div className="reviews-page__state" role="status" aria-live="polite">
          <Spinner size="lg" color="primary" />
          <Typography variant="p" color="muted">{t('reviews.loading')}</Typography>
        </div>
      );
    }

    if (error) {
      return (
        <div className="reviews-page__state" role="alert">
          {seo}
          <Icon name="star" size={56} className="reviews-page__state-icon" />
          <Typography variant="p" color="muted">{t('reviews.error')}</Typography>
          <Button variant="outline" size="sm" onClick={() => void refetch()}>
            {t('reviews.retry')}
          </Button>
        </div>
      );
    }

    if (items.length === 0) {
      return (
        <div className="reviews-page__state" role="status">
          {seo}
          <Icon name="star" size={56} className="reviews-page__state-icon" />
          <Typography variant="p" color="muted">{t('reviews.no_reviews')}</Typography>
        </div>
      );
    }

    return (
      <>
        {seo}
        <div className="reviews-page__grid" role="list">
          {items.map((review) => (
            <div key={review.id} role="listitem">
              <ReviewCard
                review={review}
                projectTitle={review.projectId ? projectTitleById.get(review.projectId) : undefined}
              />
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="reviews-page__more">
            <Button variant="outline" onClick={() => void loadMore()} isLoading={loadingMore}>
              {t('reviews.load_more')}
            </Button>
          </div>
        )}
      </>
    );
  };

  useEffect(() => {
    if (!searchParams.has(WRITE_REVIEW_PARAM)) return;
    setShowReviewForm(true);
    const next = new URLSearchParams(searchParams);
    next.delete(WRITE_REVIEW_PARAM);
    setSearchParams(next, { replace: true });
  }, [searchParams, setSearchParams]);

  return (
    <section className="reviews-page" aria-labelledby="reviews-page-title">
      <div className="reviews-page__container">
        <header className="reviews-page__header">
          <Typography id="reviews-page-title" variant="h1" weight="bold" className="reviews-page__title">
            {t('reviews.page_title')}
          </Typography>
          <Typography variant="lead" color="muted" className="reviews-page__subtitle">
            {t('reviews.page_subtitle')}
          </Typography>
          <Button
            variant="primary"
            leftIcon={<Icon name="messageSquare" size={18} />}
            onClick={() => setShowReviewForm(true)}
            className="reviews-page__cta"
          >
            {t('reviews.write_review')}
          </Button>
        </header>

        <div className="reviews-page__layout">
          <div className="reviews-page__list">
          <div className="reviews-page__toolbar">
            <span className="reviews-page__count" aria-live="polite">
              {loading ? '' : `${total} ${t('reviews.count_label')}`}
            </span>

            {projects.length > 0 && (
              <div className="reviews-page__filter">
                <Label htmlFor="reviews-filter">{t('reviews.filter_label')}</Label>
                <select
                  id="reviews-filter"
                  className="input__field review-form__select"
                  value={filterProjectId}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => setFilterProjectId(e.target.value)}
                >
                  <option value="">{t('reviews.filter_all')}</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>{project.title}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {renderList()}
        </div>
      </div>

      {showReviewForm && (
        <div className="reviews-page__modal-overlay" onClick={() => setShowReviewForm(false)}>
          <div className="reviews-page__modal" onClick={(e) => e.stopPropagation()}>
            <div className="reviews-page__modal-header">
              <Typography variant="h3" weight="bold">{t('reviews.write_review')}</Typography>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowReviewForm(false)}
                aria-label={t('common.close')}
              >
                <Icon name="x" size={24} />
              </Button>
            </div>
            <div className="reviews-page__modal-body">
              <ReviewForm
                projects={projects}
                onCreated={(review) => {
                  handleCreated(review);
                  setShowReviewForm(false);
                }}
              />
            </div>
          </div>
        </div>
      )}
      </div>
    </section>
  );
};