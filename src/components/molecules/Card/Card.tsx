import { FC, ReactNode } from 'react';

export interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outlined' | 'elevated';
}

export const Card: FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  padding = 'md',
  variant = 'default',
}) => {
  const classes = [
    'card',
    `card--${variant}`,
    `card--padding-${padding}`,
    hover ? 'card--hover' : '',
    className,
  ].filter(Boolean).join(' ');

  return <div className={classes}>{children}</div>;
};

export interface CardHeaderProps {
  children: ReactNode;
  action?: ReactNode;
}

export const CardHeader: FC<CardHeaderProps> = ({ children, action }) => {
  return (
    <div className="card__header">
      <div className="card__header-content">{children}</div>
      {action && <div className="card__header-action">{action}</div>}
    </div>
  );
};

export interface CardBodyProps {
  children: ReactNode;
  className?: string;
}

export const CardBody: FC<CardBodyProps> = ({ children, className = '' }) => {
  return <div className={`card__body ${className}`}>{children}</div>;
};

export interface CardFooterProps {
  children: ReactNode;
  className?: string;
  align?: 'left' | 'center' | 'right' | 'between';
}

export const CardFooter: FC<CardFooterProps> = ({ children, className = '', align = 'left' }) => {
  return <div className={`card__footer card__footer--${align} ${className}`}>{children}</div>;
};