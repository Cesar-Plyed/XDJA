import { FC, HTMLAttributes } from 'react';

export type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'small' | 'lead';
export type TypographyColor = 'default' | 'primary' | 'secondary' | 'muted' | 'white' | 'error' | 'success';
export type TypographyWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold';

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  color?: TypographyColor;
  weight?: TypographyWeight;
  as?: React.ElementType;
  gutterBottom?: boolean;
  noWrap?: boolean;
}

const variantTagMap: Record<TypographyVariant, string> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  p: 'p',
  span: 'span',
  small: 'small',
  lead: 'p',
};

export const Typography: FC<TypographyProps> = ({
  variant = 'p',
  color = 'default',
  weight = 'normal',
  as: Component,
  gutterBottom = false,
  noWrap = false,
  className = '',
  children,
  ...props
}) => {
  const Tag = Component || variantTagMap[variant];
  const classes = [
    'typography',
    `typography--${variant}`,
    `typography--${color}`,
    `typography--${weight}`,
    gutterBottom ? 'typography--gutter-bottom' : '',
    noWrap ? 'typography--no-wrap' : '',
    className,
  ].filter(Boolean).join(' ');

  return <Tag className={classes} {...props}>{children}</Tag>;
};