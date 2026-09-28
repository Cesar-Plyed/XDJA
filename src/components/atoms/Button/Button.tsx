import { FC, ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

export const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = 'btn btn--atomic';
  const variantClass = `btn--${variant}`;
  const sizeClass = `btn--${size}`;
  const loadingClass = isLoading ? 'btn--loading' : '';
  const fullWidthClass = fullWidth ? 'btn--full-width' : '';

  const classes = [baseClasses, variantClass, sizeClass, loadingClass, fullWidthClass, className]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classes} disabled={disabled || isLoading} {...props}>
      {isLoading ? (
        <span className="btn__spinner" aria-hidden="true">
          <svg className="spinner" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle className="spinner__circle" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
          </svg>
        </span>
      ) : (
        <>
          {leftIcon && <span className="btn__icon btn__icon--left">{leftIcon}</span>}
          <span className="btn__content">{children}</span>
          {rightIcon && <span className="btn__icon btn__icon--right">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};