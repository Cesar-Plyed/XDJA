import { useState, useEffect, useCallback } from 'react';
import { api } from '../lib/api';
import type { Project, PaginatedProjects, PaginatedReviews, TranslateReviewResponse } from '../types/api';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useProjects(page = 1, pageSize = 10) {
  const [state, setState] = useState<UseApiState<PaginatedProjects>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchProjects = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const data = await api.getProjects(page, pageSize);
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({ data: null, loading: false, error: error as Error });
    }
  }, [page, pageSize]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return { ...state, refetch: fetchProjects };
}

export function useProject(id: string | null) {
  const [state, setState] = useState<UseApiState<Project>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchProject = useCallback(async () => {
    if (!id) {
      setState({ data: null, loading: false, error: null });
      return;
    }
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const data = await api.getProject(id);
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({ data: null, loading: false, error: error as Error });
    }
  }, [id]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  return { ...state, refetch: fetchProject };
}

export function useReviewsByProject(projectId: string | null, page = 1, pageSize = 10) {
  const [state, setState] = useState<UseApiState<PaginatedReviews>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchReviews = useCallback(async () => {
    if (!projectId) {
      setState({ data: null, loading: false, error: null });
      return;
    }
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const data = await api.getReviewsByProject(projectId, page, pageSize);
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({ data: null, loading: false, error: error as Error });
    }
  }, [projectId, page, pageSize]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return { ...state, refetch: fetchReviews };
}

export function useTranslateReview() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const translate = useCallback(async (reviewId: string, lang: 'es' | 'en'): Promise<TranslateReviewResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.translateReview(reviewId, lang);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err as Error);
      setLoading(false);
      return null;
    }
  }, []);

  return { translate, loading, error };
}

export function useCreateReview() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createReview = useCallback(async (data: {
    projectId: string | null;
    rating: number;
    description: string;
    alias?: string | null;
    language: 'es' | 'en';
    turnstileToken: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const result = await api.createReview(data);
      setLoading(false);
      return result;
    } catch (err) {
      setError(err as Error);
      setLoading(false);
      return null;
    }
  }, []);

  return { createReview, loading, error };
}