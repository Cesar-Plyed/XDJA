import { FC } from 'react';
import { useI18n } from '../i18n/I18nProvider';
import LanguageSwitcher from './LanguageSwitcher';
import '../styles/navBar.scss';
import '../styles/languageSwitcher.scss';

const NavBar: FC = () => {
  const { t, locale } = useI18n();

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__brand">XDJA</div>
        <div className="navbar__controls">
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
