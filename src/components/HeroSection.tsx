import { FC } from 'react';
import { useResponsive } from '../hooks/useResponsive';
import '../styles/heroSection.scss';

const HeroSection: FC = () => {
  const { isMobile } = useResponsive();

  return (
    <section id="home" className="hero">
      <div className="hero__content">
        <div className="hero__text">
          <h1 className="hero__title">Renovamos Espacios con Criterio</h1>
          <p className="hero__subtitle">Construcción moderna, responsable y pensada para crecer.</p>
          <div className="hero__actions">
            <a href="#contact" className="hero__cta hero__cta--primary">
              Solicitar Cotización
            </a>
            <a href="#services" className="hero__cta hero__cta--secondary">
              Ver Servicios
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
