import { FC } from 'react';
import { useTheme } from '../hooks/useTheme';
import '../styles/themeToggle.scss';

const ThemeToggle: FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      title={`Current theme: ${theme}`}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};

export default ThemeToggle;
