import { FC } from 'react';
import { useI18n } from '../i18n/I18nProvider';
import '../styles/legalPages.scss';

const TermsOfServicePage: FC = () => {
  const { t } = useI18n();

  return (
    <div className="legal-page">
      <div className="legal-page__container">
        <h1>{t('legal.terms_title')}</h1>
        <p className="legal-page__intro">{t('legal.terms_intro')}</p>

        <section className="legal-section">
          <h2>{t('legal.terms_section1_title')}</h2>
          <p>{t('legal.terms_section1_text')}</p>
        </section>

        <section className="legal-section">
          <h2>{t('legal.terms_section2_title')}</h2>
          <p>{t('legal.terms_section2_text')}</p>
        </section>

        <section className="legal-section">
          <h2>{t('legal.terms_section3_title')}</h2>
          <p>{t('legal.terms_section3_text')}</p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
