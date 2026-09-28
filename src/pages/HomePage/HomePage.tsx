import { AboutSection } from '@components/organisms/AboutSection/AboutSection';
import { Hero } from '@components/organisms/Hero/Hero';
import { ProjectsCarousel } from '@components/organisms/ProjectsCarousel/ProjectsCarousel';
import { ReviewsSection } from '@components/organisms/ReviewsSection/ReviewsSection';
import { ServicesGrid } from '@components/organisms/ServicesGrid/ServicesGrid';
import { FC } from 'react';

type HomePageProps = Record<string, never>;

export const HomePage: FC<HomePageProps> = () => {
  return (
    <>
      <Hero />
      <AboutSection />
      <ServicesGrid />
      <ProjectsCarousel /> 
      <ReviewsSection />
    </>
  );
};

export type { HomePageProps };