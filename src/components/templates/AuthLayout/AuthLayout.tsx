import { FC, ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { useTheme } from '@hooks/useTheme';
import { Header } from '@components/organisms/Header/Header';

interface AuthLayoutProps {
  children?: ReactNode;
}

export const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  const { theme } = useTheme();

  return (
    <div className={`app-shell auth-layout ${theme}`}>
      <Header />
      <main className="app-main auth-main" id="main-content" role="main">
        {children || <Outlet />}
      </main>
    </div>
  );
};

export type { AuthLayoutProps };