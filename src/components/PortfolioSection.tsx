import { FC } from 'react';
import { useI18n } from '../i18n/I18nProvider';
import '../styles/portfolioSection.scss';

const PortfolioSection: FC = () => {
  const { t } = useI18n();

  const projects = [
    {
      id: 1,
      title: t('portfolio.project1_title'),
      description: t('portfolio.project1_desc'),
      image: '🏢',
    },
    {
      id: 2,
      title: t('portfolio.project2_title'),
      description: t('portfolio.project2_desc'),
      image: '🏠',
    },
    {
      id: 3,
      title: t('portfolio.project3_title'),
      description: t('portfolio.project3_desc'),
      image: '🏗️',
    },
    {
      id: 4,
      title: t('portfolio.project4_title'),
      description: t('portfolio.project4_desc'),
      image: '🛍️',
    },
  ];

  return (
    <section id="portfolio" className="portfolio">
      <div className="portfolio__container">
        <h2 className="portfolio__title">{t('portfolio.title')}</h2>
        <p className="portfolio__subtitle">{t('portfolio.subtitle')}</p>
        <div className="portfolio__grid">
          {projects.map((project) => (
            <div key={project.id} className="portfolio-card">
              <div className="portfolio-card__image">{project.image}</div>
              <h3 className="portfolio-card__title">{project.title}</h3>
              <p className="portfolio-card__description">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
