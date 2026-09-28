import { IconLd } from '@assets/Icon/iconLoad';
import { FC, ImgHTMLAttributes } from 'react';

interface LogoProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  size?: number;
}

export const Logo: FC<LogoProps> = ({ size = 40, className = '', ...props }) => (
  <img
    src={IconLd.src}
    alt="XDJA Logo"
    width={size}
    height={size}
    className={className}
    {...props}
  />
);