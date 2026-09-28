import type { AnchorHTMLAttributes, FC } from 'react';
import { useSectionNavigation, type SectionId } from '@hooks/useSectionNavigation';

interface SectionLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'onClick'> {
  section: SectionId;
  onNavigate?: () => void;
}

export const SectionLink: FC<SectionLinkProps> = ({ section, onNavigate, children, ...props }) => {
  const goToSection = useSectionNavigation();

  return (
    <a
      {...props}
      href={`/#${section}`}
      onClick={(e) => {
        goToSection(section, e);
        onNavigate?.();
      }}
    >
      {children}
    </a>
  );
};

export type { SectionLinkProps };