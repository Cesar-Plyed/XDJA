import { Button } from '@components/atoms/Button/Button';
import { Icon } from '@components/atoms/Icon/Icon';
import { Typography } from '@components/atoms/Typography/Typography';
import { Link } from 'react-router-dom';
import { FC } from 'react';
import { ROUTES } from '@routes/paths';

interface CookieBannerProps {
  onAccept: () => void;
  onDecline: () => void;
  t: (key: string) => string;
}

export const CookieBanner: FC<CookieBannerProps> = ({ onAccept, onDecline, t }) => {
  return (
    <div className="cookie-banner" role="dialog" aria-label={t('cookies.banner_title')} aria-describedby="cookie-banner-description">
      <div className="cookie-banner__container">
        <div className="cookie-banner__content">
          <div className="cookie-banner__icon" aria-hidden="true">
            <Icon name="cookie" size={24} />
          </div>
          <div className="cookie-banner__text">
            <Typography id="cookie-banner-description" variant="p" className="cookie-banner__description">
              {t('cookies.banner_text')}
            </Typography>
            <Link to={ROUTES.cookies} className="cookie-banner__learn-more">
              {t('cookies.learn_more')}
            </Link>
          </div>
        </div>
        <div className="cookie-banner__actions">
          <Button variant="ghost" onClick={onDecline} className="cookie-banner__btn cookie-banner__btn--decline">
            {t('cookies.decline')}
          </Button>
          <Button variant="primary" onClick={onAccept} className="cookie-banner__btn cookie-banner__btn--accept">
            {t('cookies.accept')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export type { CookieBannerProps };