import { FC } from 'react';
import { useI18n } from '../i18n/I18nProvider';
import '../styles/cookieBanner.scss';

interface CookieBannerProps {
  onAccept: () => void;
  onDecline: () => void;
}

const CookieBanner: FC<CookieBannerProps> = ({ onAccept, onDecline }) => {
  const { t } = useI18n();

  return (
    <div className="cookie-banner">
      <div className="cookie-banner__content">
        <h3 className="cookie-banner__title">{t('cookies.banner_title')}</h3>
        <p className="cookie-banner__text">{t('cookies.banner_text')}</p>
      </div>
      <div className="cookie-banner__actions">
        <button className="cookie-banner__btn cookie-banner__btn--accept" onClick={onAccept}>
          {t('cookies.accept')}
        </button>
        <button className="cookie-banner__btn cookie-banner__btn--decline" onClick={onDecline}>
          {t('cookies.decline')}
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
