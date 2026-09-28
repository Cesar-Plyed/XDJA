import { FC } from 'react';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'white';
  className?: string;
}

export const Spinner: FC<SpinnerProps> = ({ size = 'md', color = 'primary', className = '' }) => {
  const sizeClasses = {
    sm: 'spinner--sm',
    md: 'spinner--md',
    lg: 'spinner--lg',
  };

  const colorClasses = {
    primary: 'spinner--primary',
    secondary: 'spinner--secondary',
    white: 'spinner--white',
  };

  const classes = ['spinner', sizeClasses[size], colorClasses[color], className].filter(Boolean).join(' ');

  return (
    <svg className={classes} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle className="spinner__circle" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
};