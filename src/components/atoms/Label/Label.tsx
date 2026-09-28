import { FC, LabelHTMLAttributes } from 'react';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  variant?: 'default' | 'small' | 'bold';
  required?: boolean;
}

export const Label: FC<LabelProps> = ({ children, variant = 'default', required = false, className = '', ...props }) => {
  const classes = ['label', `label--${variant}`, className].filter(Boolean).join(' ');

  return (
    <label className={classes} {...props}>
      {children}
      {required && <span className="label__required" aria-hidden="true">*</span>}
    </label>
  );
};