import { FC } from 'react';
import { useI18n } from '@i18n/useI18n';
import { Typography } from '@components/atoms/Typography/Typography';
import { Card, CardBody } from '@components/molecules/Card/Card';
import { Icon } from '@components/atoms/Icon/Icon';

interface AboutSectionProps {
  className?: string;
}

const features = [
  {
    id: 1,
    titleKey: 'about.feature1_title',
    textKey: 'about.feature1_text',
  },
  {
    id: 2,
    titleKey: 'about.feature2_title',
    textKey: 'about.feature2_text',
  },
  {
    id: 3,
    titleKey: 'about.feature3_title',
    textKey: 'about.feature3_text',
  },
] as const;

export const AboutSection: FC<AboutSectionProps> = ({ className = '' }) => {
  const { t } = useI18n();

  return (
    <section id="about" className={`about ${className}`} aria-labelledby="about-title">
      <div className="about__container">
        <div className="about__content">
          <Typography id="about-title" variant="h2" weight="bold" className="about__title" gutterBottom>
            {t('about.title')}
          </Typography>
          <Typography variant="lead" color="muted" className="about__text">
            {t('about.description')}
          </Typography>
        </div>

        <div className="about__features" role="list">
          {features.map((feature) => (
            <Card
              key={feature.id}
              className="about__feature"
              hover
              padding="lg"
            >
              <CardBody className="about__feature-body">
                <div className="about__feature-icon">
                  <Icon name="check" size={24} className="feature-check" />
                </div>
                <Typography variant="h3" weight="semibold" className="about__feature-title" gutterBottom>
                  {t(feature.titleKey)}
                </Typography>
                <Typography variant="p" color="muted" className="about__feature-text">
                  {t(feature.textKey)}
                </Typography>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export type { AboutSectionProps };