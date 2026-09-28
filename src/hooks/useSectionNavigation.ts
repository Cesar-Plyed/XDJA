import { useCallback, useEffect, type MouseEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const SECTION_IDS = ['home', 'about', 'services', 'portfolio', 'reviews', 'contact'] as const;
export type SectionId = (typeof SECTION_IDS)[number];

const isModifiedClick = (e: MouseEvent<HTMLElement>): boolean =>
  e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;

export function useHashScroll(): void {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (!window.location.hash) window.scrollTo({ top: 0 });
  }, [pathname]);

  useEffect(() => {
    if (!hash) return;
    const id = decodeURIComponent(hash.slice(1));
    const frame = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    return () => cancelAnimationFrame(frame);
  }, [hash, key]);
}


export function useSectionNavigation() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return useCallback(
    (id: SectionId, event?: MouseEvent<HTMLElement>): void => {
      if (event) {
        if (isModifiedClick(event)) return;
        event.preventDefault();
      }
      const existsHere = document.getElementById(id) !== null;
      navigate({ pathname: existsHere ? pathname : '/', hash: `#${id}` }, { replace: existsHere });
    },
    [navigate, pathname]
  );
}