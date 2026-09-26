import { FC } from 'react';
import { useI18n } from '../i18n/I18nProvider';
import '../styles/legalPages.scss';

const CookiesPolicyPage: FC = () => {
  const { t } = useI18n();

  return (
    <div className="legal-page">
      <div className="legal-page__container">
        <h1>{t('legal.cookies_policy_title')}</h1>
        <p className="legal-page__intro">{t('legal.cookies_intro')}</p>

        <section className="legal-section">
          <h2>{t('legal.cookies_section1_title')}</h2>
          <p>{t('legal.cookies_section1_text')}</p>
        </section>

        <section className="legal-section">
          <h2>{t('legal.cookies_section2_title')}</h2>
          <p>{t('legal.cookies_section2_text')}</p>
        </section>
      </div>
    </div>
  );
};

export default CookiesPolicyPage;
