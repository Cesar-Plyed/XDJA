import { useCallback, useEffect, useRef, useState } from 'react';
import { api } from '@lib/api';
import type { Review } from '@lib/api';

/**
 * Lista paginada de reviews con "cargar más", filtro por proyecto y
 * protección contra respuestas desordenadas (si cambias el filtro rápido).
 */
export function useReviews(projectId: string | null, pageSize = 9) {
  const [items, setItems] = useState<Review[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const requestId = useRef(0);

  const fetchPage = useCallback(
    async (targetPage: number, replace: boolean) => {
      const id = ++requestId.current;
      if (replace) setLoading(true);
      else setLoadingMore(true);

      try {
        const res = await api.getReviews({ page: targetPage, pageSize, projectId });
        if (id !== requestId.current) return; // llegó una respuesta vieja
        setItems((prev) => {
          if (replace) return res.items;
          const seen = new Set(prev.map((r) => r.id));
          return [...prev, ...res.items.filter((r: { id: string; }) => !seen.has(r.id))];
        });
        setTotal(res.total);
        setPage(targetPage);
        setError(null);
      } catch (err) {
        if (id !== requestId.current) return;
        setError(err instanceof Error ? err.message : 'Failed to load reviews');
      } finally {
        if (id === requestId.current) {
          setLoading(false);
          setLoadingMore(false);
        }
      }
    },
    [projectId, pageSize]
  );

  useEffect(() => {
    void fetchPage(1, true);
  }, [fetchPage]);

  const loadMore = useCallback(() => fetchPage(page + 1, false), [fetchPage, page]);
  const refetch = useCallback(() => fetchPage(1, true), [fetchPage]);

  /** Agrega una review recién creada arriba de la lista sin volver a pedirla. */
  const prepend = useCallback((review: Review) => {
    setItems((prev) => (prev.some((r) => r.id === review.id) ? prev : [review, ...prev]));
    setTotal((prev) => prev + 1);
  }, []);

  return {
    items,
    total,
    loading,
    loadingMore,
    error,
    hasMore: items.length < total,
    loadMore,
    refetch,
    prepend,
  };
}