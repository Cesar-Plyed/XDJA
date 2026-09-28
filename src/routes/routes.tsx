import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthLayout } from '@components/templates/AuthLayout/AuthLayout';
import { MainLayout } from '@components/templates/MainLayout/MainLayout';
import { AdminDashboardPage } from '@pages/AdminDashboardPage/AdminDashboardPage';
import { CookiesPolicyPage } from '@pages/CookiesPolicyPage/CookiesPolicyPage';
import { HomePage } from '@pages/HomePage/HomePage';
import { LoginPage } from '@pages/LoginPage/LoginPage';
import { PrivacyPolicyPage } from '@pages/PrivacyPolicyPage/PrivacyPolicyPage';
import { ReviewsPage } from '@pages/ReviewsPage/ReviewsPage';
import { TermsOfServicePage } from '@pages/TermsOfServicePage/TermsOfServicePage';
import { ProjectsPage } from '@pages/ProjectsPage/ProjectsPage';

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'projects', element: <ProjectsPage /> },
      { path: 'reviews', element: <ReviewsPage /> },
      { path: 'privacy', element: <PrivacyPolicyPage /> },
      { path: 'terms', element: <TermsOfServicePage /> },
      { path: 'cookies', element: <CookiesPolicyPage /> },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'admin', element: <AdminDashboardPage /> },
    ],
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}