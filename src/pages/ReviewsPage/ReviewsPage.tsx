import { ChangeEvent, FC, useMemo, useState } from 'react';
import { useProjects } from '@hooks/useApi';
import { useI18n } from '@i18n/useI18n';
import type { Review } from '@lib/api';
import { Button } from '@components/atoms/Button/Button';
import { Icon } from '@components/atoms/Icon/Icon';
import { Label } from '@components/atoms/Label/Label';
import { Spinner } from '@components/atoms/Spinner/Spinner';
import { Typography } from '@components/atoms/Typography/Typography';
import { useReviews } from '@hooks/useReviews';
import { ReviewForm } from '@components/organisms/ReviewForm/RevireFrom';
import { ReviewCard } from '@components/molecules/ReviewCard/ReviewCard';

export const ReviewsPage: FC = () => {
  const { t } = useI18n();
  const { data: projectsData } = useProjects(1, 50);
  const projects = useMemo(() => projectsData?.items ?? [], [projectsData]);

  const [filterProjectId, setFilterProjectId] = useState('');
  const { items, total, loading, loadingMore, error, hasMore, loadMore, refetch, prepend } =
    useReviews(filterProjectId || null, 9);

  const projectTitleById = useMemo(
    () => new Map(projects.map((p) => [p.id, p.title])),
    [projects]
  );

  const handleCreated = (review: Review) => {
    // Solo la mostramos arriba si encaja con el filtro activo
    if (!filterProjectId || review.projectId === filterProjectId) prepend(review);
  };

  const scrollToForm = () => {
    const form = document.getElementById('write-review');
    form?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    document.getElementById('review-description')?.focus({ preventScroll: true });
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
          <Icon name="star" size={56} className="reviews-page__state-icon" />
          <Typography variant="p" color="muted">{t('reviews.no_reviews')}</Typography>
        </div>
      );
    }

    return (
      <>
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
            onClick={scrollToForm}
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

          <aside id="write-review" className="reviews-page__form">
            <ReviewForm projects={projects} onCreated={handleCreated} />
          </aside>
        </div>
      </div>
    </section>
  );
};