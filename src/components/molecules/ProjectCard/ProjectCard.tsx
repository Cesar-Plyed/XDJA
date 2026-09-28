import type { FC } from 'react';
import type { PortfolioItem } from '@types_cm/portfolio';
import { Icon } from '@components/atoms/Icon/Icon';
import { Typography } from '@components/atoms/Typography/Typography';

interface ProjectCardProps {
  project: PortfolioItem;
}

/** Horizontal card: image on the left with a blurred backdrop; title and description on the right. */
export const ProjectCard: FC<ProjectCardProps> = ({ project }) => (
  <article className="project-card">
    <div className="project-card__media">
      {/* Blurred backdrop layer for the sides */}
      {project.imageUrl && (
        <div 
          className="project-card__media-bg" 
          style={{ backgroundImage: `url(${project.imageUrl})` }}
          aria-hidden="true"
        />
      )}

      {project.imageUrl ? (
        <img
          src={project.imageUrl}
          alt={project.title}
          className="project-card__image"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="project-card__placeholder" aria-hidden="true">
          <Icon name="building2" size={48} />
        </div>
      )}
    </div>
    
    <div className="project-card__body">
      <Typography variant="h3" weight="semibold" className="project-card__title">
        {project.title}
      </Typography>
      {project.description && (
        <Typography variant="p" color="muted" className="project-card__description">
          {project.description}
        </Typography>
      )}
    </div>
  </article>
);

export type { ProjectCardProps };