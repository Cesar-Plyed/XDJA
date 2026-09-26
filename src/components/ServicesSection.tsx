import { FC } from 'react';
import { useI18n } from '../i18n/I18nProvider';
import '../styles/servicesSection.scss';

const ServicesSection: FC = () => {
  const { t } = useI18n();

  const services = [
    {
      id: 1,
      title: t('services.service1_title'),
      description: t('services.service1_text'),
      icon: '🏗️',
    },
    {
      id: 2,
      title: t('services.service2_title'),
      description: t('services.service2_text'),
      icon: '🔨',
    },
    {
      id: 3,
      title: t('services.service3_title'),
      description: t('services.service3_text'),
      icon: '🎨',
    },
    {
      id: 4,
      title: t('services.service4_title'),
      description: t('services.service4_text'),
      icon: '✨',
    },
  ];

  return (
    <section id="services" className="services">
      <div className="services__container">
        <h2 className="services__title">{t('services.title')}</h2>
        <p className="services__subtitle">{t('services.subtitle')}</p>

        <div className="services__grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-card__icon">{service.icon}</div>
              <h3 className="service-card__title">{service.title}</h3>
              <p className="service-card__description">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
