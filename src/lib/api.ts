import type {
  Project,
  PaginatedProjects,
  PaginatedReviews,
  PaginatedReviewHistory,
  DeleteReviewResponse,
  DeleteProjectResponse,
  TranslateReviewResponse,
  CreateReviewRequest,
  CreateReviewResponse,
  LoginResponse,
  HealthResponse,
  ApiErrorResponse,
} from '../types/api';
import { upload } from '@vercel/blob/client';

export type { Project, Review, PaginatedProjects, PaginatedReviews, ReviewHistory, PaginatedReviewHistory } from '../types/api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api';

export class ApiError extends Error {
  public readonly status: number;
  public readonly details?: ApiErrorResponse['details'];

  constructor(message: string, status: number, details?: ApiErrorResponse['details']) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get('content-type');
  const isJson = contentType?.includes('application/json');

  if (!response.ok) {
    const errorData = isJson ? await response.json() : { error: await response.text() };
    throw new ApiError(
      errorData.error ?? `HTTP error ${response.status}`,
      response.status,
      errorData.details
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  if (!isJson) {
    await response.text();
    throw new ApiError(
      'Expected JSON response but received non-JSON content. Backend may not be running.',
      response.status
    );
  }

  return response.json();
}

// ---------------------------------------------------------------------------
// Session storage + silent refresh
//
// Access token: 24h JWT. Refresh token: single-use, rotated on every refresh
// (backend deletes the old one), so concurrent refresh attempts would log the
// user out — all 401s therefore share ONE in-flight refresh (single-flight).
// ---------------------------------------------------------------------------

const AUTH_TOKEN_KEY = 'xdja-auth-token';
const REFRESH_TOKEN_KEY = 'xdja-refresh-token';

type RefreshOutcome =
  /** New tokens stored — caller may retry the original request. */
  | 'ok'
  /** Refresh token invalid/rotated/expired — session is dead, re-login required. */
  | 'expired'
  /** Backend or Redis temporarily unavailable — keep tokens, retry later. */
  | 'transient';

let inflightRefresh: Promise<RefreshOutcome> | null = null;

async function performRefresh(): Promise<RefreshOutcome> {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  if (!refreshToken) return 'expired';

  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (response.status === 401) {
      // Rotated or malformed token: only a re-login can recover.
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      return 'expired';
    }

    if (!response.ok) {
      // 503 (Redis down / not configured) or 429 (rate limited): transient.
      return 'transient';
    }

    const data = await response.json();
    localStorage.setItem(AUTH_TOKEN_KEY, data.token);
    localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
    return 'ok';
  } catch {
    // Network failure: transient, keep the session for a later retry.
    return 'transient';
  }
}

function refreshSession(): Promise<RefreshOutcome> {
  if (!inflightRefresh) {
    inflightRefresh = performRefresh().finally(() => {
      inflightRefresh = null;
    });
  }
  return inflightRefresh;
}

/**
 * Runs an API call and, if it fails with 401, silently renews the session and
 * retries once. Callers only ever see the retried result or an ApiError.
 */
async function withRefresh<T>(operation: () => Promise<T>): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    const canRefresh = error instanceof ApiError && error.status === 401 && localStorage.getItem(REFRESH_TOKEN_KEY);
    if (!canRefresh) throw error;

    const outcome = await refreshSession();
    if (outcome === 'ok') return operation();
    if (outcome === 'transient') {
      throw new ApiError('Session renewal temporarily unavailable', 503);
    }
    throw new ApiError('Session expired', 401);
  }
}

function jsonRequest(path: string, init: RequestInit = {}): Promise<Response> {
  return fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...init.headers },
  });
}

export const api = {
  getAuthToken(): string | null {
    return localStorage.getItem('xdja-auth-token');
  },

  getAuthHeaders(): Record<string, string> {
    const token = this.getAuthToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  },

  async health(): Promise<HealthResponse> {
    const response = await fetch(`${API_BASE_URL}/health`);
    return handleResponse<HealthResponse>(response);
  },

  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return handleResponse<LoginResponse>(response);
  },

  async getProjects(page = 1, pageSize = 10): Promise<PaginatedProjects> {
    // Wrapped like the authed calls: if this endpoint ever requires auth, the
    // session renews silently instead of surfacing a raw 401.
    return withRefresh(async () => {
      const response = await fetch(`${API_BASE_URL}/projects?page=${page}&pageSize=${pageSize}`, {
        headers: this.getAuthHeaders(),
      });
      return handleResponse<PaginatedProjects>(response);
    });
  },

  async getProject(id: string): Promise<Project> {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`);
    return handleResponse<Project>(response);
  },

  async createProject(data: { title: string; description?: string; imageUrls?: string[] }): Promise<Project> {
    return withRefresh(async () => {
      const response = await jsonRequest('/projects', {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(data),
      });
      return handleResponse<Project>(response);
    });
  },

  async deleteProject(id: string): Promise<DeleteProjectResponse> {
    return withRefresh(async () => {
      const response = await jsonRequest(`/projects/${id}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
      });
      return handleResponse<DeleteProjectResponse>(response);
    });
  },

  async uploadImage(file: File): Promise<string> {
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const blob = await upload(`projects/${safeName}`, file, {
      access: 'public',
      handleUploadUrl: `${API_BASE_URL}/projects/upload-token`,
      headers: this.getAuthHeaders(),
    });
    return blob.url;
  },

  async getReviewsByProject(projectId: string, page = 1, pageSize = 10): Promise<PaginatedReviews> {
    const response = await fetch(`${API_BASE_URL}/reviews/project/${projectId}?page=${page}&pageSize=${pageSize}`);
    return handleResponse<PaginatedReviews>(response);
  },

  async getReviews({ page = 1, pageSize = 10, projectId }: { page?: number; pageSize?: number; projectId?: string | null }): Promise<PaginatedReviews> {
    const params = new URLSearchParams({
      page: String(page),
      pageSize: String(pageSize),
    });
    if (projectId) {
      params.set('projectId', projectId);
    }
    return withRefresh(async () => {
      const response = await fetch(`${API_BASE_URL}/reviews?${params}`, {
        headers: this.getAuthHeaders(),
      });
      return handleResponse<PaginatedReviews>(response);
    });
  },

  async translateReview(reviewId: string, lang: 'es' | 'en'): Promise<TranslateReviewResponse> {
    const response = await fetch(`${API_BASE_URL}/reviews/${reviewId}/translate?lang=${lang}`);
    return handleResponse<TranslateReviewResponse>(response);
  },

  async createReview(data: CreateReviewRequest): Promise<CreateReviewResponse> {
    const response = await fetch(`${API_BASE_URL}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse<CreateReviewResponse>(response);
  },

  async deleteReview(id: string): Promise<DeleteReviewResponse> {
    return withRefresh(async () => {
      const response = await jsonRequest(`/reviews/${id}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
      });
      return handleResponse<DeleteReviewResponse>(response);
    });
  },

  async getReviewHistory(page = 1, pageSize = 10): Promise<PaginatedReviewHistory> {
    return withRefresh(async () => {
      const response = await jsonRequest(`/reviews/history?page=${page}&pageSize=${pageSize}`, {
        headers: this.getAuthHeaders(),
      });
      return handleResponse<PaginatedReviewHistory>(response);
    });
  },

  /**
   * Revokes the refresh token server-side (idempotent, never throws) and
   * clears both local tokens. Safe to call with an expired access token.
   */
  async logout(): Promise<void> {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    try {
      await jsonRequest('/auth/logout', {
        method: 'POST',
        body: JSON.stringify(refreshToken ? { refreshToken } : {}),
      });
    } catch {
      // Best effort — local session is cleared regardless.
    }
    this.clearSession();
  },

  /** Drops every locally stored session key (auth, refresh, user). */
  clearSession(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem('xdja-user');
  },
};