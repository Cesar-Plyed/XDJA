import { AboutSection } from '@components/organisms/AboutSection/AboutSection';
import { Hero } from '@components/organisms/Hero/Hero';
import { ProjectsCarousel } from '@components/organisms/ProjectsCarousel/ProjectsCarousel';
import { ReviewsSection } from '@components/organisms/ReviewsSection/ReviewsSection';
import { ServicesGrid } from '@components/organisms/ServicesGrid/ServicesGrid';
import { FC } from 'react';
import { useI18n } from '@i18n/useI18n';
import { useSeo } from '@hooks/useSeo';

type HomePageProps = Record<string, never>;

export const HomePage: FC<HomePageProps> = () => {
  const { t } = useI18n();
  const seo = useSeo({
    title: t('seo.home.title'),
    description: t('seo.home.description'),
  });

  return (
    <>
      {seo}
      <Hero />
      <AboutSection />
      <ServicesGrid />
      <ProjectsCarousel /> 
      <ReviewsSection />
    </>
  );
};

export type { HomePageProps };