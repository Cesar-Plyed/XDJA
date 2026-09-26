import {
  motion,
  MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { useRef } from 'react';
import { imgLd } from '../assets/Images/ImagesLoader';
import '../styles/imagesScroll.scss';

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

interface ImageCardProps {
  src: string;
  alt: string;
  className: string;
}

function ImageCard({ src, alt, className }: ImageCardProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 300);

  return (
    <section className="image-container">
      <div ref={ref} className="image-container__wrapper">
        <img src={src} alt={alt} className={className} />
      </div>
      <motion.h2
        className="image-container__label"
        initial={{ visibility: 'hidden' }}
        animate={{ visibility: 'visible' }}
        style={{ y }}
      >
        {alt}
      </motion.h2>
    </section>
  );
}

const ImageScroll = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section className="image-scroll">
      <div className="image-scroll__container">
        <div id="example" className="image-scroll__content">
          {imgLd.map((image) => (
            <ImageCard
              key={image.id}
              src={image.src}
              alt={image.alt}
              className="image-scroll__img"
            />
          ))}
          <motion.div className="image-scroll__progress" style={{ scaleX }} />
        </div>
      </div>
    </section>
  );
};

export default ImageScroll;
