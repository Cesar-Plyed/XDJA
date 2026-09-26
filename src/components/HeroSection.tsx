import { FC } from 'react';
import { useI18n } from '../i18n/I18nProvider';
import '../styles/heroSection.scss';

const HeroSection: FC = () => {
  const { t } = useI18n();

  return (
    <section id="home" className="hero">
      <div className="hero__content">
        <div className="hero__text">
          <h1 className="hero__title">{t('hero.title')}</h1>
          <p className="hero__subtitle">{t('hero.subtitle')}</p>
          <div className="hero__actions">
            <a href="#contact" className="hero__cta hero__cta--primary">
              {t('hero.cta_primary')}
            </a>
            <a href="#portfolio" className="hero__cta hero__cta--secondary">
              {t('hero.cta_secondary')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
