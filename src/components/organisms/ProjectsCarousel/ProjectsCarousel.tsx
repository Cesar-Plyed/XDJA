import { FC, KeyboardEvent, PointerEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useProjects } from '@hooks/useApi';
import { useI18n } from '@i18n/useI18n';
import { Icon } from '@components/atoms/Icon/Icon';
import { Spinner } from '@components/atoms/Spinner/Spinner';
import { Typography } from '@components/atoms/Typography/Typography';

const AUTOPLAY_MS = 5000;
const SWIPE_THRESHOLD_PX = 50;

export const ProjectsCarousel: FC = () => {
  const { t } = useI18n();
  const { data, loading, error } = useProjects(1, 20);

  const projects = data?.items ?? [];
  const total = projects.length;

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const pointerStartX = useRef<number | null>(null);

  const goTo = useCallback(
    (index: number) => {
      if (total === 0) return;
      setActive(((index % total) + total) % total); // navegación circular
    },
    [total]
  );
  const next = useCallback(() => goTo(active + 1), [goTo, active]);
  const prev = useCallback(() => goTo(active - 1), [goTo, active]);

  // Autoplay: se reinicia con cada cambio de slide y se pausa con hover/focus
  useEffect(() => {
    if (total < 2 || paused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setTimeout(() => setActive((i) => (i + 1) % total), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [total, paused, active]);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
  };

  // Swipe táctil / arrastre
  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    pointerStartX.current = e.clientX;
  };
  const handlePointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (pointerStartX.current === null) return;
    const diff = e.clientX - pointerStartX.current;
    pointerStartX.current = null;
    if (Math.abs(diff) < SWIPE_THRESHOLD_PX) return;
    if (diff < 0) { next(); } else { prev(); }
  };

  const renderBody = () => {
    if (loading) {
      return (
        <div className="portfolio__loading" role="status" aria-live="polite">
          <Spinner size="lg" color="primary" />
          <Typography variant="p" color="muted">{t('portfolio.loading')}</Typography>
        </div>
      );
    }

    if (error || total === 0) {
      return (
        <div className="portfolio__empty" role="status">
          <Icon name="building2" size={64} className="portfolio__empty-icon" />
          <Typography variant="p" color="muted">
            {error ? t('portfolio.error') : t('portfolio.no_projects')}
          </Typography>
        </div>
      );
    }

    return (
      <div
        className="projects-carousel"
        role="region"
        aria-roledescription="carousel"
        aria-label={t('portfolio.title')}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div
          className="projects-carousel__viewport"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => { pointerStartX.current = null; }}
        >
          <div
            className="projects-carousel__track"
            style={{ transform: `translateX(-${active * 100}%)` }}
            aria-live={paused || total < 2 ? 'polite' : 'off'}
          >
            {projects.map((project, index) => {
              const images = [...(project.images ?? [])].sort((a, b) => a.order - b.order);
              const cover = images[0];

              return (
                <article
                  key={project.id}
                  className="projects-carousel__slide"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} / ${total}`}
                  aria-hidden={index !== active}
                >
                  {cover ? (
                    <img
                      src={cover.url}
                      alt={project.title}
                      className="projects-carousel__image"
                      loading={index === 0 ? 'eager' : 'lazy'}
                      draggable={false}
                    />
                  ) : (
                    <div className="projects-carousel__placeholder">
                      <Icon name="building2" size={64} />
                    </div>
                  )}
                  <div className="projects-carousel__overlay" aria-hidden="true" />

                  <div className="projects-carousel__badges">
                    {images.length > 1 && (
                      <span className="projects-carousel__badge">
                        <Icon name="images" size={14} /> {images.length}
                      </span>
                    )}
                    <span className="projects-carousel__badge">{index + 1} / {total}</span>
                  </div>

                  <div className="projects-carousel__caption">
                    <h3 className="projects-carousel__title">{project.title}</h3>
                    {project.description && (
                      <p className="projects-carousel__description">{project.description}</p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {total > 1 && (
          <>
            <div className="projects-carousel__indicators">
              {projects.map((project, index) => (
                <button
                  key={project.id}
                  type="button"
                  className={`projects-carousel__dot ${index === active ? 'projects-carousel__dot--active' : ''}`}
                  aria-label={`${index + 1} / ${total}`}
                  aria-current={index === active}
                  onClick={() => goTo(index)}
                />
              ))}
            </div>

            <button
              type="button"
              className="projects-carousel__control projects-carousel__control--prev"
              onClick={prev}
              aria-label={t('portfolio.prev')}
            >
              <Icon name="chevronLeft" size={24} />
            </button>
            <button
              type="button"
              className="projects-carousel__control projects-carousel__control--next"
              onClick={next}
              aria-label={t('portfolio.next')}
            >
              <Icon name="chevronRight" size={24} />
            </button>
          </>
        )}
      </div>
    );
  };

  return (
    <section id="portfolio" className="portfolio" aria-labelledby="portfolio-title">
      <div className="portfolio__container">
        <h2 id="portfolio-title" className="portfolio__title">{t('portfolio.title')}</h2>
        <p className="portfolio__subtitle">{t('portfolio.subtitle')}</p>
        {renderBody()}
      </div>
    </section>
  );
};