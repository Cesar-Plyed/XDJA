import { FC } from 'react';
import { useResponsive } from '../hooks/useResponsive';

const Information: FC = () => {
  const { isMobile } = useResponsive();

  return (
    <section className="information">
      <div className="information__content">
        <h1 className={`information__title information__title--${isMobile ? 'mobile' : 'desktop'}`}>
          We renew your spaces
        </h1>
        <a href="#contact" className="information__cta">
          We are experts in concrete
        </a>
      </div>
    </section>
  );
};

export default Information;
