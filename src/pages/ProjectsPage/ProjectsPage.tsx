import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '@i18n/useI18n';
import { useAllPortfolioItems } from '@hooks/usePortfolioItems';
import { useSeo } from '@hooks/useSeo';
import { Button } from '@components/atoms/Button/Button';
import { Icon } from '@components/atoms/Icon/Icon';
import { Spinner } from '@components/atoms/Spinner/Spinner';
import { Typography } from '@components/atoms/Typography/Typography';
import { ProjectCard } from '@components/molecules/ProjectCard/ProjectCard';

export const ProjectsPage: FC = () => {
  const { t } = useI18n();
  const { items, loading, loadingMore, error, hasMore, loadMore, retry } = useAllPortfolioItems();
  const seo = useSeo({
    title: t('seo.projects.title'),
    description: t('seo.projects.description'),
  });

  return (
    <section className="projects-page" aria-labelledby="projects-page-title">
      {seo}
      <div className="projects-page__container">
        <Link to="/#portfolio" className="projects-page__back">
          <Icon name="chevronLeft" size={18} />
          <span>{t('portfolio.back')}</span>
        </Link>

        <header className="projects-page__header">
          <Typography id="projects-page-title" variant="h1" weight="bold" className="projects-page__title">
            {t('portfolio.page_title')}
          </Typography>
          <Typography variant="lead" color="muted" className="projects-page__subtitle">
            {t('portfolio.page_subtitle')}
          </Typography>
        </header>

        <div className="projects-page__list" role="list">
          {items.map((project) => (
            <div key={project.id} role="listitem">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {loading && (
          <div className="projects-page__state" role="status" aria-live="polite">
            <Spinner size="lg" color="primary" />
            <Typography variant="p" color="muted">{t('portfolio.loading')}</Typography>
          </div>
        )}

        {error && !loading && (
          <div className="projects-page__state" role="alert">
            <Typography variant="p" color="muted">{t('portfolio.error')}</Typography>
            <Button variant="outline" size="sm" onClick={() => void retry()}>
              {t('reviews.retry')}
            </Button>
          </div>
        )}

        {hasMore && !loading && (
          <div className="projects-page__more">
            <Button variant="outline" onClick={() => void loadMore()} isLoading={loadingMore}>
              {t('portfolio.load_more')}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};