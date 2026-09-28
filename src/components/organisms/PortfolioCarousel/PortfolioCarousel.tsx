import { FC, useState, useEffect, useCallback, useRef } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useI18n } from '@i18n/useI18n';
import { Typography } from '@components/atoms/Typography/Typography';
import { Icon } from '@components/atoms/Icon/Icon';
import { Spinner } from '@components/atoms/Spinner/Spinner';
import { Project } from '@types_cm/api';
import { api } from '@lib/api';

interface PortfolioCarouselProps {
  className?: string;
}

export const PortfolioCarousel: FC<PortfolioCarouselProps> = ({ className = '' }) => {
  const { t } = useI18n();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const autoPlayRef = useRef<number | null>(null);
  const INTERVAL_MS = 5000;

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.getProjects(1, 20);
      setProjects(response.items);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current !== null) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, []);

  const startAutoPlay = useCallback(() => {
    stopAutoPlay();
    autoPlayRef.current = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % Math.max(projects.length, 1));
    }, INTERVAL_MS);
  }, [projects.length, stopAutoPlay]);

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [startAutoPlay, stopAutoPlay]);

  const handleSelect = (index: number) => {
    const clamped = ((index % projects.length) + projects.length) % projects.length;
    setActiveIndex(clamped);
    startAutoPlay();
  };

  const next = () => handleSelect(activeIndex + 1);
  const prev = () => handleSelect(activeIndex - 1);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
    startAutoPlay();
  };

  if (loading) {
    return (
      <section id="portfolio" className={`portfolio ${className}`} aria-labelledby="portfolio-title">
        <div className="portfolio__container">
          <Typography id="portfolio-title" variant="h2" weight="bold" className="portfolio__title" gutterBottom>
            {t('portfolio.title')}
          </Typography>
          <Typography variant="p" color="muted" className="portfolio__subtitle" gutterBottom>
            {t('portfolio.subtitle')}
          </Typography>
          <div className="portfolio__loading" role="status" aria-live="polite">
            <Spinner size="lg" color="primary" />
            <Typography variant="p" color="muted" className="portfolio__loading-text">
              {t('portfolio.loading')}
            </Typography>
          </div>
        </div>
      </section>
    );
  }

  if (error || projects.length === 0) {
    return (
      <section id="portfolio" className={`portfolio ${className}`} aria-labelledby="portfolio-title">
        <div className="portfolio__container">
          <Typography id="portfolio-title" variant="h2" weight="bold" className="portfolio__title" gutterBottom>
            {t('portfolio.title')}
          </Typography>
          <Typography variant="p" color="muted" className="portfolio__subtitle" gutterBottom>
            {t('portfolio.subtitle')}
          </Typography>
          <div className="portfolio__empty" role="status">
            <Icon name="building2" size={64} className="portfolio__empty-icon" />
            <Typography variant="p" color="muted" className="portfolio__empty-text">
              {error || t('portfolio.no_projects')}
            </Typography>
          </div>
        </div>
      </section>
    );
  }

  const project = projects[activeIndex];

  return (
    <section id="portfolio" className={`portfolio ${className}`} aria-labelledby="portfolio-title">
      <div className="portfolio__container">
        <Typography id="portfolio-title" variant="h2" weight="bold" className="portfolio__title" gutterBottom>
          {t('portfolio.title')}
        </Typography>
        <Typography variant="p" color="muted" className="portfolio__subtitle" gutterBottom>
          {t('portfolio.subtitle')}
        </Typography>

        <div
          className="portfolio__carousel"
          onMouseEnter={stopAutoPlay}
          onMouseLeave={startAutoPlay}
          aria-label={t('portfolio.carousel_label')}
        >
          <div className="portfolio__carousel-track">
            <div className="portfolio__slide">
              <div className="portfolio__slide-image">
                {project.images && project.images.length > 0 ? (
                  <LazyLoadImage
                    src={project.images[0].url}
                    alt={project.title}
                    className="portfolio__slide-img"
                    placeholder={
                      <div className="portfolio__slide-placeholder">
                        <Icon name="building2" size={64} />
                      </div>
                    }
                    effect="blur"
                    width={1200}
                    height={675}
                  />
                ) : (
                  <div className="portfolio__slide-placeholder">
                    <Icon name="building2" size={64} />
                  </div>
                )}
                <div className="portfolio__slide-overlay" />
              </div>
              <div className="portfolio__slide-content">
                <Typography variant="h3" weight="semibold" className="portfolio__slide-title">
                  {project.title}
                </Typography>
                {project.description && (
                  <Typography variant="p" color="muted" className="portfolio__slide-description">
                    {project.description}
                  </Typography>
                )}
                <div className="portfolio__slide-meta">
                  <Typography variant="small" color="muted" className="portfolio__slide-count">
                    {activeIndex + 1} / {projects.length}
                  </Typography>
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="portfolio__control portfolio__control--prev"
            onClick={prev}
            aria-label={t('portfolio.prev_slide')}
          >
            <Icon name="chevronLeft" size={24} className="portfolio__control-icon" />
          </button>
          <button
            type="button"
            className="portfolio__control portfolio__control--next"
            onClick={next}
            aria-label={t('portfolio.next_slide')}
          >
            <Icon name="chevronRight" size={24} className="portfolio__control-icon" />
          </button>

          <div className="portfolio__indicators" role="tablist" aria-label={t('portfolio.carousel_label')}>
            {projects.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`portfolio__indicator ${index === activeIndex ? 'portfolio__indicator--active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`${index + 1} / ${projects.length}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export type { PortfolioCarouselProps };
