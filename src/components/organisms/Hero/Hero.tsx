import { FC } from 'react';
import { useI18n } from '@i18n/useI18n';
import { Typography } from '@components/atoms/Typography/Typography';
import { Icon } from '@components/atoms/Icon/Icon';
import { Button } from '@components/atoms/Button/Button';

interface HeroProps {
  className?: string;
}

export const Hero: FC<HeroProps> = ({ className = '' }) => {
  const { t } = useI18n();

  return (
    <section id="home" className={`hero ${className}`} aria-labelledby="hero-title">
      <div className="hero__background" aria-hidden="true" />
      <div className="hero__container">
        <div className="hero__content">
          <div className="hero__text">
            <Typography
              id="hero-title"
              variant="h1"
              weight="bold"
              className="hero__title"
              gutterBottom
            >
              {t('hero.title')}
            </Typography>
            <Typography variant="lead" color="muted" className="hero__subtitle" gutterBottom>
              {t('hero.subtitle')}
            </Typography>
            <div className="hero__actions">
              <Button
                variant="primary"
                size="lg"
                leftIcon={<Icon name="messageSquare" size={22} />}
                onClick={() => window.open('https://wa.me/+15743046758', '_blank', 'noopener,noreferrer')}
                className="hero__cta hero__cta--primary"
              >
                {t('hero.cta_primary')}
              </Button>
              <Button
                variant="outline"
                size="lg"
                rightIcon={<Icon name="arrowRight" size={22} />}
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                className="hero__cta hero__cta--secondary"
              >
                {t('hero.cta_secondary')}
              </Button>
            </div>
          </div>
          <div className="hero__visual" aria-hidden="true">
            <div className="hero__visual-card hero__visual-card--1">
              <Icon name="building2" size={48} />
            </div>
            <div className="hero__visual-card hero__visual-card--2">
              <Icon name="hammer" size={48} />
            </div>
            <div className="hero__visual-card hero__visual-card--3">
              <Icon name="palette" size={48} />
            </div>
          </div>
        </div>
      </div>
      <div className="hero__scroll-indicator" aria-hidden="true">
        <Icon name="chevronRight" size={24} className="hero__scroll-icon" />
      </div>
    </section>
  );
};

export type { HeroProps };