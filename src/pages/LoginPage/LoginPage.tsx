import { FC, useState, FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useI18n } from '@i18n/useI18n';
import { Typography } from '@components/atoms/Typography/Typography';
import { Card, CardHeader, CardBody, CardFooter } from '@components/molecules/Card/Card';
import { FormField } from '@components/molecules/FormField/FormField';
import { Icon } from '@components/atoms/Icon/Icon';
import { Button } from '@components/atoms/Button/Button';
import { api } from '@lib/api';

type LoginPageProps = Record<string, never>;

export const LoginPage: FC<LoginPageProps> = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const from = (location.state as { from?: Location })?.from?.pathname || '/admin';

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await api.login(email, password);
      localStorage.setItem('xdja-auth-token', response.token);
      localStorage.setItem('xdja-user', JSON.stringify({ email, role: 'admin' }));
      navigate(from, { replace: true });
    } catch {
      setError(t('auth.invalid_credentials'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page" role="main">
      <div className="login-page__background" aria-hidden="true">
        <div className="login-page__shape login-page__shape--1" />
        <div className="login-page__shape login-page__shape--2" />
        <div className="login-page__shape login-page__shape--3" />
      </div>

      <div className="login-page__container">
        <Card variant="elevated" padding="none" className="login-page__card">
          <CardHeader>
            <div className="login-page__header">
              <div className="login-page__logo">
                <Icon name="building2" size={48} className="login-page__logo-icon" />
                <Typography variant="h3" weight="bold" className="login-page__logo-text">
                  XDJA
                </Typography>
              </div>
              <Typography variant="h2" weight="bold" className="login-page__title" gutterBottom>
                {t('auth.login_title')}
              </Typography>
              <Typography variant="p" color="muted" className="login-page__subtitle">
                {t('auth.login_subtitle')}
              </Typography>
            </div>
          </CardHeader>

          <CardBody className="login-page__body">
            <form onSubmit={handleSubmit} className="login-page__form" noValidate>
              {error && (
                <div className="login-page__error" role="alert">
                  <Icon name="shield" size={18} />
                  <Typography variant="small" color="error">{error}</Typography>
                </div>
              )}

              <FormField
                label={t('auth.email')}
                type="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                placeholder={t('auth.email_placeholder')}
                required
                autoComplete="email"
                leftIcon={<Icon name="mail" size={20} />}
                fullWidth
                error={error && !email ? t('auth.email_required') : undefined}
              />

              <FormField
                label={t('auth.password')}
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                placeholder={t('auth.password_placeholder')}
                required
                autoComplete="current-password"
                leftIcon={<Icon name="lock" size={20} />}
                rightIcon={
                  <button
                    type="button"
                    className="form-field__toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? t('auth.hide_password') : t('auth.show_password')}
                    aria-pressed={showPassword}
                  >
                    <Icon name={showPassword ? 'eyeOff' : 'eye'} size={20} />
                  </button>
                }
                fullWidth
                error={error && !password ? t('auth.password_required') : undefined}
              />

              <div className="login-page__options">
                <label className="login-page__checkbox">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRememberMe(e.target.checked)}
                    className="login-page__checkbox-input"
                  />
                  <span className="login-page__checkbox-label">{t('auth.remember_me')}</span>
                </label>
                <a href="#forgot-password" className="login-page__forgot-link">
                  {t('auth.forgot_password')}
                </a>
              </div>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                size="lg"
                isLoading={loading}
                className="login-page__submit-btn"
              >
                {t('auth.login_button')}
              </Button>
            </form>
          </CardBody>

          <CardFooter className="login-page__footer" align="center">
            <Typography variant="small" color="muted">
              {t('auth.back_to_site')}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="login-page__back-link"
              >
                {t('auth.home')}
              </Button>
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export type { LoginPageProps };