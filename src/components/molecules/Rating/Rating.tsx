import { FC } from 'react';
import { Icon } from '../../atoms/Icon/Icon';

export interface RatingProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onChange?: (value: number) => void;
  className?: string;
  ariaLabel?: string;
}

export const Rating: FC<RatingProps> = ({
  value,
  max = 5,
  size = 'md',
  interactive = false,
  onChange,
  className = '',
  ariaLabel,
}) => {
  const sizeClasses = {
    sm: 'rating--sm',
    md: 'rating--md',
    lg: 'rating--lg',
  };

  const classes = ['rating', sizeClasses[size], interactive ? 'rating--interactive' : '', className].filter(Boolean).join(' ');

  const stars = Array.from({ length: max }, (_, index) => {
    const starValue = index + 1;
    const isFilled = starValue <= value;
    const isPartial = !isFilled && starValue - 0.5 <= value;

    const handleClick = () => {
      if (interactive && onChange) {
        onChange(starValue);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (!interactive) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onChange?.(starValue);
      } else if (e.key === 'ArrowRight' && starValue < max) {
        e.preventDefault();
        onChange?.(starValue + 1);
      } else if (e.key === 'ArrowLeft' && starValue > 1) {
        e.preventDefault();
        onChange?.(starValue - 1);
      }
    };

    return (
      <button
        key={starValue}
        type="button"
        className={`rating__star ${isFilled ? 'rating__star--filled' : ''} ${isPartial ? 'rating__star--partial' : ''}`}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        disabled={!interactive}
        aria-label={ariaLabel ? `${ariaLabel} ${starValue} de ${max}` : undefined}
        tabIndex={interactive ? 0 : -1}
      >
        <Icon name="star" size={size === 'sm' ? 16 : size === 'md' ? 20 : 24} className="rating__star-icon" />
      </button>
    );
  });

  return (
    <div className={classes} role="img" aria-label={ariaLabel || `Calificación: ${value} de ${max}`}>
      {stars}
    </div>
  );
};