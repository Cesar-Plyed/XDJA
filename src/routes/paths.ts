export const WRITE_REVIEW_PARAM = 'write';

export const ROUTES = {
  home: '/',
  reviews: '/reviews',
  writeReview: `/reviews?${WRITE_REVIEW_PARAM}=1`,
  projects: '/projects',
  privacy: '/privacy',
  terms: '/terms',
  cookies: '/cookies',
} as const;