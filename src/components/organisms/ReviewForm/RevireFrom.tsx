import { ChangeEvent, FC, FormEvent, useCallback, useState } from 'react';
import { api, ApiError } from '@lib/api';
import type { Project, Review } from '@lib/api';
import { useI18n } from '@i18n/useI18n';
import { useTheme } from '@hooks/useTheme';
import { Button } from '@components/atoms/Button/Button';
import { Icon } from '@components/atoms/Icon/Icon';
import { Label } from '@components/atoms/Label/Label';
import { Typography } from '@components/atoms/Typography/Typography';
import { Rating } from '@components/molecules/Rating/Rating';
import { Turnstile } from '@components/atoms/Turnstile/Turnstile';

const MAX_WORDS = 700;
const MAX_ALIAS = 60;
const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;

const countWords = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;

interface ReviewFormProps {
  projects: Project[];
  onCreated: (review: Review) => void;
}

interface FieldErrors {
  rating?: string;
  description?: string;
  captcha?: string;
}

export const ReviewForm: FC<ReviewFormProps> = ({ projects, onCreated }) => {
  const { t, locale } = useI18n();
  const { theme } = useTheme();

  const [projectId, setProjectId] = useState('');
  const [rating, setRating] = useState(0);
  const [alias, setAlias] = useState('');
  const [description, setDescription] = useState('');
  const [languageOverride, setLanguageOverride] = useState<'es' | 'en' | null>(null);
  const language = languageOverride ?? locale;

  const [token, setToken] = useState('');
  const [captchaResetKey, setCaptchaResetKey] = useState(0);
  const [captchaFailed, setCaptchaFailed] = useState(false);

  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const words = countWords(description);
  const captchaEnabled = Boolean(TURNSTILE_SITE_KEY);
  const captchaMisconfigured = !captchaEnabled && !import.meta.env.DEV;

  const handleVerify = useCallback((value: string) => {
    setToken(value);
    setCaptchaFailed(false);
  }, []);
  const handleExpire = useCallback(() => setToken(''), []);
  const handleCaptchaError = useCallback(() => {
    setToken('');
    setCaptchaFailed(true);
  }, []);

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    if (rating < 1) next.rating = t('reviews.form.rating_required');
    if (!description.trim()) next.description = t('reviews.form.description_required');
    else if (words > MAX_WORDS) next.description = t('reviews.form.description_too_long');
    if (captchaEnabled && !token) next.captcha = t('reviews.form.captcha_required');
    return next;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setFormError(null);

    const fieldErrors = validate();
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0 || captchaMisconfigured) return;

    setSubmitting(true);
    try {
      const created = await api.createReview({
        projectId: projectId || null,
        rating,
        description: description.trim(),
        alias: alias.trim() || null,
        language,
        // En desarrollo sin site key el backend omite la verificación si no tiene TURNSTILE_SECRET_KEY
        turnstileToken: token || 'dev-token',
      });

      onCreated(created);
      setSuccess(true);
      setProjectId('');
      setRating(0);
      setAlias('');
      setDescription('');
      setLanguageOverride(null);
      setErrors({});
    } catch (err) {
      if (err instanceof ApiError && err.status === 429) {
        setFormError(t('reviews.form.rate_limited'));
      } else if (err instanceof ApiError && err.details?.length) {
        setFormError(err.details.map((d) => d.message).join(' · '));
      } else {
        setFormError(err instanceof Error && err.message ? err.message : t('reviews.form.generic_error'));
      }
    } finally {
      // El token de Turnstile es de un solo uso: siempre se reinicia
      setToken('');
      setCaptchaResetKey((k) => k + 1);
      setSubmitting(false);
    }
  };

  return (
    <form className="review-form" onSubmit={handleSubmit} noValidate aria-labelledby="review-form-title">
      <Typography id="review-form-title" variant="h3" weight="bold" className="review-form__title">
        {t('reviews.form.title')}
      </Typography>
      <Typography variant="small" color="muted" className="review-form__subtitle">
        {t('reviews.form.subtitle')}
      </Typography>

      {success && (
        <div className="review-form__alert review-form__alert--success" role="status">
          <Icon name="check" size={18} />
          <span>{t('reviews.form.success')}</span>
        </div>
      )}
      {formError && (
        <div className="review-form__alert review-form__alert--error" role="alert">
          <Icon name="x" size={18} />
          <span>{formError}</span>
        </div>
      )}
      {captchaMisconfigured && (
        <div className="review-form__alert review-form__alert--error" role="alert">
          <Icon name="x" size={18} />
          <span>{t('reviews.form.captcha_missing_config')}</span>
        </div>
      )}

      {/* Rating */}
      <div className="review-form__field">
        <Label required>{t('reviews.form.rating')}</Label>
        <Rating
          value={rating}
          size="lg"
          interactive
          onChange={(value) => {
            setRating(value);
            setErrors((prev) => ({ ...prev, rating: undefined }));
          }}
          ariaLabel={t('reviews.form.rating')}
        />
        {errors.rating && <p className="input__error" role="alert">{errors.rating}</p>}
      </div>

      {/* Proyecto (opcional) */}
      {projects.length > 0 && (
        <div className="review-form__field">
          <Label htmlFor="review-project">{t('reviews.form.project')}</Label>
          <select
            id="review-project"
            className="input__field review-form__select"
            value={projectId}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setProjectId(e.target.value)}
          >
            <option value="">{t('reviews.form.project_none')}</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>{project.title}</option>
            ))}
          </select>
        </div>
      )}

      {/* Texto */}
      <div className="review-form__field">
        <Label htmlFor="review-description" required>{t('reviews.form.description')}</Label>
        <textarea
          id="review-description"
          className={`input__field review-form__textarea ${errors.description ? 'input__field--error' : ''}`}
          rows={5}
          value={description}
          placeholder={t('reviews.form.description_placeholder')}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
            setDescription(e.target.value);
            setErrors((prev) => ({ ...prev, description: undefined }));
          }}
          aria-invalid={Boolean(errors.description)}
        />
        <div className="review-form__meta">
          {errors.description ? (
            <p className="input__error" role="alert">{errors.description}</p>
          ) : <span />}
          <span className={`review-form__counter ${words > MAX_WORDS ? 'review-form__counter--over' : ''}`}>
            {words} / {MAX_WORDS} {t('reviews.form.words')}
          </span>
        </div>
      </div>

      {/* Alias + idioma */}
      <div className="review-form__row">
        <div className="review-form__field">
          <Label htmlFor="review-alias">{t('reviews.form.alias')}</Label>
          <input
            id="review-alias"
            className="input__field"
            type="text"
            maxLength={MAX_ALIAS}
            value={alias}
            placeholder={t('reviews.form.alias_placeholder')}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setAlias(e.target.value)}
            autoComplete="nickname"
          />
        </div>
        <div className="review-form__field">
          <Label htmlFor="review-language">{t('reviews.form.language')}</Label>
          <select
            id="review-language"
            className="input__field review-form__select"
            value={language}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setLanguageOverride(e.target.value as 'es' | 'en')}
          >
            <option value="es">Español</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>

      {/* Anti-spam */}
      {TURNSTILE_SITE_KEY && (
        <div className="review-form__field">
          <Turnstile
            siteKey={TURNSTILE_SITE_KEY}
            theme={theme === 'dark' ? 'dark' : 'light'}
            resetKey={captchaResetKey}
            onVerify={handleVerify}
            onExpire={handleExpire}
            onError={handleCaptchaError}
          />
          {captchaFailed && <p className="input__error" role="alert">{t('reviews.form.captcha_error')}</p>}
          {errors.captcha && !captchaFailed && <p className="input__error" role="alert">{errors.captcha}</p>}
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        isLoading={submitting}
        disabled={captchaMisconfigured}
        leftIcon={<Icon name="messageSquare" size={18} />}
      >
        {t('reviews.form.submit')}
      </Button>
    </form>
  );
};