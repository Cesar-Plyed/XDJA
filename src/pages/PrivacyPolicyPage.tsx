import { FC } from 'react';
import { useI18n } from '../i18n/I18nProvider';
import '../styles/legalPages.scss';

const PrivacyPolicyPage: FC = () => {
  const { t } = useI18n();

  return (
    <div className="legal-page">
      <div className="legal-page__container">
        <h1>{t('legal.privacy_title')}</h1>
        <p className="legal-page__intro">{t('legal.privacy_intro')}</p>

        <section className="legal-section">
          <h2>{t('legal.section1_title')}</h2>
          <p>{t('legal.section1_text')}</p>
        </section>

        <section className="legal-section">
          <h2>{t('legal.section2_title')}</h2>
          <p>{t('legal.section2_text')}</p>
        </section>

        <section className="legal-section">
          <h2>{t('legal.section3_title')}</h2>
          <p>{t('legal.section3_text')}</p>
        </section>

        <section className="legal-section">
          <h2>{t('legal.section4_title')}</h2>
          <p>{t('legal.section4_text')}</p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
