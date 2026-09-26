import { FC } from 'react';
import '../styles/servicesSection.scss';

const ServicesSection: FC = () => {
  const services = [
    {
      id: 1,
      title: 'Hormigón Estampado',
      description: 'Pisos decorativos con diseños personalizados.',
      icon: '🏗️',
    },
    {
      id: 2,
      title: 'Reparación Estructural',
      description: 'Reparación y refuerzo de estructuras.',
      icon: '🔨',
    },
    {
      id: 3,
      title: 'Renovación de Espacios',
      description: 'Transformación completa de ambientes.',
      icon: '🎨',
    },
    {
      id: 4,
      title: 'Acabados Premium',
      description: 'Detalles y acabados de alta calidad.',
      icon: '✨',
    },
  ];

  return (
    <section id="services" className="services">
      <div className="services__container">
        <h2 className="services__title">Nuestros Servicios</h2>
        <p className="services__subtitle">
          Ofrecemos soluciones completas en construcción y renovación
        </p>

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
