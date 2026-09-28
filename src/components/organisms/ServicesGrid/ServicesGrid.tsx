import { Icon } from '@components/atoms/Icon/Icon';
import { Typography } from '@components/atoms/Typography/Typography';
import { Card, CardBody } from '@components/molecules/Card/Card';
import { useI18n } from '@i18n/useI18n';
import { FC } from 'react';

interface ServicesGridProps {
  className?: string;
}

const services = [
  {
    id: 1,
    icon: 'building2',
    titleKey: 'services.service1_title',
    descriptionKey: 'services.service1_text',
  },
  {
    id: 2,
    icon: 'hammer',
    titleKey: 'services.service2_title',
    descriptionKey: 'services.service2_text',
  },
  {
    id: 3,
    icon: 'palette',
    titleKey: 'services.service3_title',
    descriptionKey: 'services.service3_text',
  },
  {
    id: 4,
    icon: 'sparkles',
    titleKey: 'services.service4_title',
    descriptionKey: 'services.service4_text',
  },
] as const;

export const ServicesGrid: FC<ServicesGridProps> = ({ className = '' }) => {
  const { t } = useI18n();

  return (
    <section id="services" className={`services ${className}`} aria-labelledby="services-title">
      <div className="services__container">
        <Typography id="services-title" variant="h2" weight="bold" className="services__title" gutterBottom>
          {t('services.title')}
        </Typography>
        <Typography variant="p" color="muted" className="services__subtitle" gutterBottom>
          {t('services.subtitle')}
        </Typography>

        <div className="services__grid" role="list">
          {services.map((service) => (
            <Card
              key={service.id}
              className="service-card"
              hover
              padding="lg"
            >
              <CardBody className="service-card__body">
                <div className="service-card__icon">
                  <Icon name={service.icon} size={32} />
                </div>
                <Typography variant="h3" weight="semibold" className="service-card__title" gutterBottom>
                  {t(service.titleKey)}
                </Typography>
                <Typography variant="p" color="muted" className="service-card__description">
                  {t(service.descriptionKey)}
                </Typography>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export type { ServicesGridProps };