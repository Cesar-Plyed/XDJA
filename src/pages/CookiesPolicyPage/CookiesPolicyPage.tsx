import { FC } from 'react';
import { useI18n } from '@i18n/useI18n';
import { Typography } from '@components/atoms/Typography/Typography';
import { Card, CardBody } from '@components/molecules/Card/Card';

type CookiesPolicyPageProps = Record<string, never>;

export const CookiesPolicyPage: FC<CookiesPolicyPageProps> = () => {
  const { t } = useI18n();

  return (
    <div className="legal-page">
      <div className="legal-page__container">
        <Card variant="outlined" padding="lg" className="legal-page__card">
          <CardBody>
            <Typography variant="h1" weight="bold" className="legal-page__title" gutterBottom>
              {t('legal.cookies_policy_title')}
            </Typography>
            <Typography variant="lead" color="muted" className="legal-page__intro" gutterBottom>
              {t('legal.cookies_intro')}
            </Typography>

            <section className="legal-page__section">
              <Typography variant="h2" weight="semibold" className="legal-page__section-title" gutterBottom>
                {t('legal.cookies_section1_title')}
              </Typography>
              <Typography variant="p" color="muted" className="legal-page__section-text">
                {t('legal.cookies_section1_text')}
              </Typography>
            </section>

            <section className="legal-page__section">
              <Typography variant="h2" weight="semibold" className="legal-page__section-title" gutterBottom>
                {t('legal.cookies_section2_title')}
              </Typography>
              <Typography variant="p" color="muted" className="legal-page__section-text">
                {t('legal.cookies_section2_text')}
              </Typography>
            </section>

            <section className="legal-page__section">
              <Typography variant="h2" weight="semibold" className="legal-page__section-title" gutterBottom>
                {t('legal.cookies_section3_title')}
              </Typography>
              <Typography variant="p" color="muted" className="legal-page__section-text">
                {t('legal.cookies_section3_text')}
              </Typography>
            </section>

            <section className="legal-page__section">
              <Typography variant="h2" weight="semibold" className="legal-page__section-title" gutterBottom>
                {t('legal.cookies_section4_title')}
              </Typography>
              <Typography variant="p" color="muted" className="legal-page__section-text">
                {t('legal.cookies_section4_text')}
              </Typography>
            </section>

            <section className="legal-page__section">
              <Typography variant="h2" weight="semibold" className="legal-page__section-title" gutterBottom>
                {t('legal.cookies_section5_title')}
              </Typography>
              <Typography variant="p" color="muted" className="legal-page__section-text">
                {t('legal.cookies_section5_text')}
              </Typography>
            </section>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export type { CookiesPolicyPageProps };