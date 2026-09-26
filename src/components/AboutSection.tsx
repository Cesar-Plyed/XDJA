import { FC } from 'react';
import '../styles/aboutSection.scss';

const AboutSection: FC = () => {
  return (
    <section id="about" className="about">
      <div className="about__container">
        <div className="about__content">
          <h2 className="about__title">Sobre XDJA Construction</h2>
          <p className="about__text">
            Somos una empresa especializada en la construcción y renovación de espacios con enfoque en la calidad,
            seguridad y transparencia. Con años de experiencia en el mercado, nos comprometemos a entregar proyectos
            excepcionales que superan las expectativas de nuestros clientes.
          </p>
        </div>

        <div className="about__features">
          <div className="about__feature">
            <div className="about__feature-icon">✓</div>
            <h3 className="about__feature-title">Diseño Limpio</h3>
            <p className="about__feature-text">Experiencia moderna y enfocada en resultados.</p>
          </div>
          <div className="about__feature">
            <div className="about__feature-icon">✓</div>
            <h3 className="about__feature-title">Expertos en Hormigón</h3>
            <p className="about__feature-text">Especialistas en trabajos de concreto de alta calidad.</p>
          </div>
          <div className="about__feature">
            <div className="about__feature-icon">✓</div>
            <h3 className="about__feature-title">Garantía Garantizada</h3>
            <p className="about__feature-text">Todos nuestros trabajos incluyen garantía y respaldo.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
