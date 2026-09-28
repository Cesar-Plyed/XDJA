import type {
  Project,
  PaginatedProjects,
  PaginatedReviews,
  TranslateReviewResponse,
  CreateReviewRequest,
  CreateReviewResponse,
  HealthResponse,
  ApiErrorResponse,
} from '../types/api';

export type { Project, Review, PaginatedProjects, PaginatedReviews } from '../types/api';

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

  async login(email: string, password: string): Promise<{ token: string; expiresIn: string }> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return handleResponse<{ token: string; expiresIn: string }>(response);
  },

  async getProjects(page = 1, pageSize = 10): Promise<PaginatedProjects> {
    const response = await fetch(`${API_BASE_URL}/projects?page=${page}&pageSize=${pageSize}`);
    return handleResponse<PaginatedProjects>(response);
  },

  async getProject(id: string): Promise<Project> {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`);
    return handleResponse<Project>(response);
  },

  async createProject(data: { title: string; description?: string; imageUrls?: string[] }): Promise<Project> {
    const response = await fetch(`${API_BASE_URL}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...this.getAuthHeaders() },
      body: JSON.stringify(data),
    });
    return handleResponse<Project>(response);
  },

  async getUploadToken(): Promise<{ uploadToken: string }> {
    const response = await fetch(`${API_BASE_URL}/projects/upload-token`, {
      headers: { ...this.getAuthHeaders() },
    });
    return handleResponse<{ uploadToken: string }>(response);
  },

  async uploadImageDirect(file: File): Promise<string> {
    const { uploadToken } = await this.getUploadToken();
    const formData = new FormData();
    formData.set('file', file);
    const uploadResponse = await fetch('https://api.vercel.com/api/v1/blob/upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${uploadToken}` },
      body: formData,
    });
    if (!uploadResponse.ok) {
      throw new ApiError('Upload failed', uploadResponse.status);
    }
    const blob = await uploadResponse.json();
    return blob.url;
  },

  async uploadImage(file: File): Promise<string> {
    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
    const result = await this.uploadImageBase64({
      fileName: file.name,
      mimeType: file.type,
      base64,
    });
    return result.url;
  },

  async uploadImageBase64(data: { fileName: string; mimeType: string; base64: string }): Promise<{ url: string }> {
    const response = await fetch(`${API_BASE_URL}/projects/upload`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...this.getAuthHeaders() },
      body: JSON.stringify(data),
    });
    return handleResponse<{ url: string }>(response);
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
    const response = await fetch(`${API_BASE_URL}/reviews?${params}`);
    return handleResponse<PaginatedReviews>(response);
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
};