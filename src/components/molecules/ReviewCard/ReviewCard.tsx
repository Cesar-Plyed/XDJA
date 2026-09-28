import { FC, useEffect, useState } from 'react';
import { api } from '@lib/api';
import type { Review } from '@lib/api';
import { useI18n } from '@i18n/useI18n';
import { Icon } from '@components/atoms/Icon/Icon';
import { Typography } from '@components/atoms/Typography/Typography';
import { Rating } from '@components/molecules/Rating/Rating';

interface ReviewCardProps {
  review: Review;
  projectTitle?: string;
}

export const ReviewCard: FC<ReviewCardProps> = ({ review, projectTitle }) => {
  const { t, locale } = useI18n();
  const [translated, setTranslated] = useState<string | null>(null);
  const [showTranslated, setShowTranslated] = useState(false);
  const [translating, setTranslating] = useState(false);
  const [translateError, setTranslateError] = useState(false);

  const needsTranslation = review.language !== locale;

  // If the visitor switches language, the previous translation no longer applies
  useEffect(() => {
    setTranslated(null);
    setShowTranslated(false);
    setTranslateError(false);
  }, [locale]);

  const handleToggleTranslation = async () => {
    if (showTranslated) {
      setShowTranslated(false);
      return;
    }
    if (translated) {
      setShowTranslated(true);
      return;
    }
    setTranslating(true);
    setTranslateError(false);
    try {
      const result = await api.translateReview(review.id, locale);
      setTranslated(result.translatedText);
      setShowTranslated(true);
    } catch {
      setTranslateError(true);
    } finally {
      setTranslating(false);
    }
  };

  const text = showTranslated && translated ? translated : review.description;

  return (
    <article className="review-card">
      <div className="review-card__header">
        <Rating value={review.rating} size="sm" className="review-card__rating" ariaLabel={t('reviews.rating_label')} />
        <span className="review-card__language">
          <Icon name="globe" size={14} />
          {review.language.toUpperCase()}
        </span>
      </div>

      {projectTitle && (
        <span className="review-card__project">
          <Icon name="building2" size={14} />
          {projectTitle}
        </span>
      )}

      <Typography variant="p" className="review-card__text">
        “{text}”
      </Typography>

      <footer className="review-card__footer">
        <div className="review-card__author">
          {review.alias ? (
            <Typography variant="small" weight="medium" className="review-card__alias">
              @{review.alias}
            </Typography>
          ) : (
            <Typography variant="small" color="muted" className="review-card__anonymous">
              {t('reviews.anonymous')}
            </Typography>
          )}
          <time className="review-card__date" dateTime={review.createdAt}>
            {new Date(review.createdAt).toLocaleDateString(locale === 'es' ? 'es-MX' : 'en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>
      </footer>

      {needsTranslation && (
        <button
          type="button"
          className="review-card__translate"
          onClick={handleToggleTranslation}
          disabled={translating}
        >
          <Icon name="globe" size={16} />
          {translating
            ? t('reviews.translating')
            : showTranslated
              ? t('reviews.show_original')
              : t('reviews.translate')}
        </button>
      )}
      {translateError && (
        <p className="review-card__error" role="alert">
          {t('reviews.translate_error')}
        </p>
      )}
    </article>
  );
};