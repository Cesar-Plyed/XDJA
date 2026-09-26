import { FC } from 'react';
import { useI18n } from '../i18n/I18nProvider';
import '../styles/aboutSection.scss';

const AboutSection: FC = () => {
  const { t } = useI18n();

  return (
    <section id="about" className="about">
      <div className="about__container">
        <div className="about__content">
          <h2 className="about__title">{t('about.title')}</h2>
          <p className="about__text">{t('about.description')}</p>
        </div>

        <div className="about__features">
          <div className="about__feature">
            <div className="about__feature-icon">✓</div>
            <h3 className="about__feature-title">{t('about.feature1_title')}</h3>
            <p className="about__feature-text">{t('about.feature1_text')}</p>
          </div>
          <div className="about__feature">
            <div className="about__feature-icon">✓</div>
            <h3 className="about__feature-title">{t('about.feature2_title')}</h3>
            <p className="about__feature-text">{t('about.feature2_text')}</p>
          </div>
          <div className="about__feature">
            <div className="about__feature-icon">✓</div>
            <h3 className="about__feature-title">{t('about.feature3_title')}</h3>
            <p className="about__feature-text">{t('about.feature3_text')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
