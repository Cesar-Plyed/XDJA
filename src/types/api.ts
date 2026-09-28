export type SupportedLanguage = 'es' | 'en';

export interface ProjectImage {
  id: string;
  projectId: string;
  url: string;
  order: number;
  createdAt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string | null;
  images: ProjectImage[];
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedProjects {
  items: Project[];
  total: number;
  page: number;
  pageSize: number;
}

export interface Review {
  id: string;
  projectId: string | null;
  rating: number;
  description: string;
  alias: string | null;
  language: SupportedLanguage;
  createdAt: string;
}

export interface PaginatedReviews {
  items: Review[];
  total: number;
  page: number;
  pageSize: number;
}

export interface TranslateReviewResponse {
  translatedText: string;
  originalLanguage: SupportedLanguage;
}

export interface CreateReviewRequest {
  projectId: string | null;
  rating: number;
  description: string;
  alias?: string | null;
  language: SupportedLanguage;
  turnstileToken: string;
}

export interface CreateReviewResponse {
  id: string;
  projectId: string | null;
  rating: number;
  description: string;
  alias: string | null;
  language: SupportedLanguage;
  createdAt: string;
}

export interface ApiErrorResponse {
  error: string;
  details?: Array<{ field: string; message: string }>;
  message?: string;
}

export interface HealthResponse {
  status: 'ok';
  timestamp: string;
}