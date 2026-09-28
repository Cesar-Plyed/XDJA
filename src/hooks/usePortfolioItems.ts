import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { imgLd } from '@assets/Images/ImagesLoader';
import { api } from '@lib/api';
import type { Project } from '@lib/api';
import { useI18n } from '@i18n/useI18n';
import type { PortfolioItem } from '@types_cm/portfolio';

export const CAROUSEL_MAX_ITEMS = 10;
const PROJECTS_PAGE_SIZE = 6;

const toPortfolioItem = (project: Project): PortfolioItem => {
  const images = [...(project.images ?? [])].sort((a, b) => a.order - b.order);
  return {
    id: project.id,
    title: project.title,
    description: project.description,
    imageUrl: images[0]?.url ?? null,
    imageCount: images.length,
  };
};

/** Static projects from ImagesLoader, already translated to the active language. */
export function useStaticPortfolioItems(): PortfolioItem[] {
  const { t } = useI18n();
  return useMemo(
    () =>
      imgLd.map((img) => ({
        id: `static-${img.id}`,
        title: t(img.altKey),
        description: t(img.descKey),
        imageUrl: img.src,
        imageCount: 1,
      })),
    [t]
  );
}

/**
 * Carousel slides: ImagesLoader first, then the most recent projects from the database,
 * up to CAROUSEL_MAX_ITEMS in total. If the API fails, only the static ones are shown.
 */
export function useCarouselItems(): PortfolioItem[] {
  const staticItems = useStaticPortfolioItems();
  const [dbItems, setDbItems] = useState<PortfolioItem[]>([]);
  const slots = Math.max(CAROUSEL_MAX_ITEMS - staticItems.length, 0);

  useEffect(() => {
    if (slots === 0) return;
    let cancelled = false;
    api
      .getProjects(1, slots) // the backend sorts by createdAt desc
      .then((res) => {
        if (!cancelled) setDbItems(res.items.map(toPortfolioItem));
      })
      .catch(() => {
        if (!cancelled) setDbItems([]);
      });
    return () => {
      cancelled = true;
    };
  }, [slots]);

  return useMemo(() => [...staticItems, ...dbItems].slice(0, CAROUSEL_MAX_ITEMS), [staticItems, dbItems]);
}

/** Full listing for /projects: static items + paginated database items with "load more". */
export function useAllPortfolioItems() {
  const staticItems = useStaticPortfolioItems();
  const [dbItems, setDbItems] = useState<PortfolioItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(false);
  const requestId = useRef(0);

  const fetchPage = useCallback(async (targetPage: number, replace: boolean) => {
    const id = ++requestId.current;
    if (replace) setLoading(true);
    else setLoadingMore(true);
    try {
      const res = await api.getProjects(targetPage, PROJECTS_PAGE_SIZE);
      if (id !== requestId.current) return;
      const mapped = res.items.map(toPortfolioItem);
      setDbItems((prev) => {
        if (replace) return mapped;
        const seen = new Set(prev.map((p) => p.id));
        return [...prev, ...mapped.filter((p) => !seen.has(p.id))];
      });
      setTotal(res.total);
      setPage(targetPage);
      setError(false);
    } catch {
      if (id === requestId.current) setError(true);
    } finally {
      if (id === requestId.current) {
        setLoading(false);
        setLoadingMore(false);
      }
    }
  }, []);

  useEffect(() => {
    void fetchPage(1, true);
  }, [fetchPage]);

  return {
    items: [...staticItems, ...dbItems],
    loading,
    loadingMore,
    error,
    hasMore: dbItems.length < total,
    loadMore: () => fetchPage(page + 1, false),
    retry: () => fetchPage(1, true),
  };
}