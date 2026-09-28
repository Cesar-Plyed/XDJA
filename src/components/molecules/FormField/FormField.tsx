import { Input, InputProps } from '@components/atoms/Input/Input';
import { Label, LabelProps } from '@components/atoms/Label/Label';
import { FC, ReactNode } from 'react';

export interface FormFieldProps extends Omit<InputProps, 'label' | 'error' | 'helperText'> {
  label?: string;
  labelProps?: LabelProps;
  error?: string;
  helperText?: string;
  required?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

export const FormField: FC<FormFieldProps> = ({
  label,
  labelProps,
  error,
  helperText,
  required = false,
  leftIcon,
  rightIcon,
  fullWidth = true,
  className = '',
  id,
  ...inputProps
}) => {
  const fieldId = id || `field-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`form-field ${className}`}>
      {label && (
        <Label htmlFor={fieldId} required={required} {...labelProps}>
          {label}
        </Label>
      )}
      <Input
        id={fieldId}
        error={error}
        helperText={helperText}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        fullWidth={fullWidth}
        {...inputProps}
      />
    </div>
  );
};