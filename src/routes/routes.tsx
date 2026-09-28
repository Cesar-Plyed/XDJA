import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AuthLayout } from '@components/templates/AuthLayout/AuthLayout';
import { MainLayout } from '@components/templates/MainLayout/MainLayout';
import { useI18n } from '@i18n/useI18n';
import { AdminDashboardPage } from '@pages/AdminDashboardPage/AdminDashboardPage';
import { CookiesPolicyPage } from '@pages/CookiesPolicyPage/CookiesPolicyPage';
import { HomePage } from '@pages/HomePage/HomePage';
import { LoginPage } from '@pages/LoginPage/LoginPage';
import { PrivacyPolicyPage } from '@pages/PrivacyPolicyPage/PrivacyPolicyPage';
import { ReviewsPage } from '@pages/ReviewsPage/ReviewsPage';
import { TermsOfServicePage } from '@pages/TermsOfServicePage/TermsOfServicePage';

function AppRoutes() {
  useI18n();
  const [cookiesConsent, setCookiesConsent] = useState<boolean | null>(null);
  const [legalModal, setLegalModal] = useState<'privacy' | 'cookies' | 'terms' | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('xdja-cookies-consent');
    setCookiesConsent(saved === 'accepted' ? true : saved === 'declined' ? false : null);
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem('xdja-cookies-consent', 'accepted');
    setCookiesConsent(true);
  };

  const handleDeclineCookies = () => {
    localStorage.setItem('xdja-cookies-consent', 'declined');
    setCookiesConsent(false);
  };

  const openLegalModal = (type: 'privacy' | 'cookies' | 'terms') => {
    setLegalModal(type);
  };

  const closeLegalModal = () => {
    setLegalModal(null);
  };

  const router = createBrowserRouter([
    {
      element: (
        <MainLayout
          onLegalClick={openLegalModal}
          legalModal={legalModal}
          closeLegalModal={closeLegalModal}
          cookiesConsent={cookiesConsent}
          handleAcceptCookies={handleAcceptCookies}
          handleDeclineCookies={handleDeclineCookies}
        />
      ),
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: 'privacy',
          element: <PrivacyPolicyPage />,
        },
        {
          path: 'terms',
          element: <TermsOfServicePage />,
        },
        {
          path: 'cookies',
          element: <CookiesPolicyPage />,
        },
      ],
    },
    {
      path: '/reviews',
      element: <MainLayout
        onLegalClick={openLegalModal}
        legalModal={legalModal}
        closeLegalModal={closeLegalModal}
        cookiesConsent={cookiesConsent}
        handleAcceptCookies={handleAcceptCookies}
        handleDeclineCookies={handleDeclineCookies}
      />,
      children: [
        {
          index: true,
          element: <ReviewsPage />,
        },
      ],
    },
    {
      path: '/login',
      element: <AuthLayout />,
      children: [
        {
          index: true,
          element: <LoginPage />,
        },
      ],
    },
    {
      path: '/admin',
      element: <AuthLayout />,
      children: [
        {
          index: true,
          element: <AdminDashboardPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default AppRoutes;