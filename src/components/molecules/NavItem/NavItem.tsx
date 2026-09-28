import { FC, ReactNode } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

export interface NavItemProps extends Omit<NavLinkProps, 'children'> {
  label: string;
  icon?: ReactNode;
  activeClassName?: string;
  className?: string;
}

export const NavItem: FC<NavItemProps> = ({
  label,
  icon,
  activeClassName = 'nav-item--active',
  className = '',
  to,
  ...props
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => [`nav-item`, isActive ? activeClassName : '', className].filter(Boolean).join(' ')}
      {...props}
    >
      {icon && <span className="nav-item__icon">{icon}</span>}
      <span className="nav-item__label">{label}</span>
    </NavLink>
  );
};