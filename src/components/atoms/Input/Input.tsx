import { InputHTMLAttributes, forwardRef } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftIcon, rightIcon, fullWidth = false, className = '', id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = error ? `${inputId}-error` : undefined;
    const helperId = helperText ? `${inputId}-helper` : undefined;

    const wrapperClasses = ['input-wrapper', fullWidth ? 'input-wrapper--full-width' : '', className].filter(Boolean).join(' ');

    const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;

    return (
      <div className={wrapperClasses}>
        {label && <label htmlFor={inputId} className="input__label">{label}</label>}
        <div className="input__inner">
          {leftIcon && <span className="input__icon input__icon--left">{leftIcon}</span>}
          <input
            ref={ref}
            id={inputId}
            className={`input__field ${error ? 'input__field--error' : ''}`}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={describedBy}
            {...props}
          />
          {rightIcon && <span className="input__icon input__icon--right">{rightIcon}</span>}
        </div>
        {error && <p id={errorId} className="input__error" role="alert">{error}</p>}
        {helperText && !error && <p id={helperId} className="input__helper">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';