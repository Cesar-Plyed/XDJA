import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '@i18n/useI18n';
import { useReviews } from '@hooks/useReviews';
import { ROUTES } from '@routes/paths';
import { Icon } from '@components/atoms/Icon/Icon';
import { Spinner } from '@components/atoms/Spinner/Spinner';
import { Typography } from '@components/atoms/Typography/Typography';
import { ReviewCard } from '@components/molecules/ReviewCard/ReviewCard';

const PREVIEW_SIZE = 6;

interface ReviewsSectionProps {
  className?: string;
}

export const ReviewsSection: FC<ReviewsSectionProps> = ({ className = '' }) => {
  const { t } = useI18n();
  const { items, loading, error } = useReviews(null, PREVIEW_SIZE);

  const renderBody = () => {
    if (loading) {
      return (
        <div className="reviews__loading" role="status" aria-live="polite">
          <Spinner size="lg" color="primary" />
          <Typography variant="p" color="muted" className="reviews__loading-text">
            {t('reviews.loading')}
          </Typography>
        </div>
      );
    }

    if (error || items.length === 0) {
      return (
        <div className="reviews__empty" role={error ? 'alert' : 'status'}>
          <Icon name="star" size={64} className="reviews__empty-icon" />
          <Typography variant="p" color="muted" className="reviews__empty-text">
            {error ? t('reviews.error') : t('reviews.no_reviews')}
          </Typography>
        </div>
      );
    }

    return (
      <div className="reviews__grid" role="list">
        {items.map((review) => (
          <div key={review.id} role="listitem">
            <ReviewCard review={review} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <section id="reviews" className={`reviews ${className}`} aria-labelledby="reviews-title">
      <div className="reviews__container">
        <Typography id="reviews-title" variant="h2" weight="bold" className="reviews__title" gutterBottom>
          {t('reviews.title')}
        </Typography>
        <Typography variant="p" color="muted" className="reviews__subtitle" gutterBottom>
          {t('reviews.subtitle')}
        </Typography>

        <div className="reviews__actions">
          <Link to={ROUTES.writeReview} className="reviews__write-link">
            <Icon name="messageSquare" size={18} />
            <span>{t('reviews.write_review')}</span>
          </Link>
          {items.length > 0 && (
            <Link to={ROUTES.reviews} className="reviews__view-all">
              <span>{t('reviews.view_all')}</span>
              <Icon name="arrowRight" size={16} />
            </Link>
          )}
        </div>

        {renderBody()}
      </div>
    </section>
  );
};

export type { ReviewsSectionProps };