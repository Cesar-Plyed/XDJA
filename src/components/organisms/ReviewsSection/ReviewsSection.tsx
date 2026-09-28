import { Button } from "@components/atoms/Button/Button";
import { Icon } from "@components/atoms/Icon/Icon";
import { Spinner } from "@components/atoms/Spinner/Spinner";
import { Typography } from "@components/atoms/Typography/Typography";
import { Rating } from "@components/molecules/Rating/Rating";
import { useI18n } from "@i18n/useI18n";
import { api, Review } from "@lib/api";
import { FC, useCallback, useEffect, useState } from "react";


interface ReviewsSectionProps {
  className?: string;
}

export const ReviewsSection: FC<ReviewsSectionProps> = ({ className = '' }) => {
  const { t, locale } = useI18n();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [translatedReviews, setTranslatedReviews] = useState<Record<string, string>>({});
  const [translating, setTranslating] = useState<Record<string, boolean>>({});

  const fetchReviews = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.getReviewsByProject('', 1, 10);
      setReviews(response.items);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load reviews');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleTranslate = async (reviewId: string, targetLang: 'es' | 'en') => {
    setTranslating((prev) => ({ ...prev, [reviewId]: true }));
    try {
      const result = await api.translateReview(reviewId, targetLang);
      setTranslatedReviews((prev) => ({ ...prev, [reviewId]: result.translatedText }));
    } catch (err) {
      console.error('Translation failed:', err);
    } finally {
      setTranslating((prev) => ({ ...prev, [reviewId]: false }));
    }
  };

  const getDisplayText = (review: Review) => {
    if (review.language === locale) {
      return review.description;
    }
    if (translatedReviews[review.id]) {
      return translatedReviews[review.id];
    }
    return review.description;
  };

  const shouldShowTranslate = (review: Review) => {
    return review.language !== locale && !translatedReviews[review.id];
  };

  if (loading) {
    return (
      <section className={`reviews ${className}`} aria-labelledby="reviews-title">
        <div className="reviews__container">
          <Typography id="reviews-title" variant="h2" weight="bold" className="reviews__title" gutterBottom>
            {t('reviews.title')}
          </Typography>
          <div className="reviews__loading" role="status" aria-live="polite">
            <Spinner size="lg" color="primary" />
            <Typography variant="p" color="muted" className="reviews__loading-text">
              {t('reviews.loading')}
            </Typography>
          </div>
        </div>
      </section>
    );
  }

  if (error || reviews.length === 0) {
    return (
      <section className={`reviews ${className}`} aria-labelledby="reviews-title">
        <div className="reviews__container">
          <Typography id="reviews-title" variant="h2" weight="bold" className="reviews__title" gutterBottom>
            {t('reviews.title')}
          </Typography>
          <div className="reviews__empty" role="status">
            <Icon name="star" size={64} className="reviews__empty-icon" />
            <Typography variant="p" color="muted" className="reviews__empty-text">
              {error || t('reviews.no_reviews')}
            </Typography>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`reviews ${className}`} aria-labelledby="reviews-title">
      <div className="reviews__container">
        <Typography id="reviews-title" variant="h2" weight="bold" className="reviews__title" gutterBottom>
          {t('reviews.title')}
        </Typography>
        <Typography variant="p" color="muted" className="reviews__subtitle" gutterBottom>
          {t('reviews.subtitle')}
        </Typography>
        <div className="reviews__grid" role="list">
          {reviews.map((review) => (
            <article key={review.id} className="review-card" role="listitem">
              <div className="review-card__header">
                <Rating value={review.rating} max={5} size="md" className="review-card__rating" aria-label={t('reviews.rating_label')} />
                <span className="review-card__language">
                  <Icon name="globe" size={14} />
                  {review.language.toUpperCase()}
                </span>
              </div>
              <Typography variant="p" className="review-card__text">
                "{getDisplayText(review)}"
              </Typography>
              <footer className="review-card__footer">
                <div className="review-card__author">
                  {review.alias ? (
                    <>
                      <Typography variant="small" weight="medium" className="review-card__alias">
                        @{review.alias}
                      </Typography>
                    </>
                  ) : (
                    <Typography variant="small" color="muted" className="review-card__anonymous">
                      {t('reviews.anonymous')}
                    </Typography>
                  )}
                  <Typography variant="small" color="muted" className="review-card__date">
                    {new Date(review.createdAt).toLocaleDateString(locale, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </Typography>
                </div>
                {shouldShowTranslate(review) && !translating[review.id] && (
                  <Button
                    variant="ghost"
                    size="sm"
                    leftIcon={<Icon name="globe" size={16} />}
                    onClick={() => handleTranslate(review.id, locale)}
                    disabled={translating[review.id]}
                    className="review-card__translate"
                  >
                    {locale === 'es' ? 'Traducir al español' : 'Translate to English'}
                  </Button>
                )}
                {translating[review.id] && (
                  <Button
                    variant="ghost"
                    size="sm"
                    isLoading
                    className="review-card__translate"
                    disabled
                  >
                    {locale === 'es' ? 'Traduciendo...' : 'Translating...'}
                  </Button>
                )}
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export type { ReviewsSectionProps };