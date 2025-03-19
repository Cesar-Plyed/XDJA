import {
  motion,
  MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { imgLd } from "../assets/Images/ImagesLoader";
import "../Styles/imagesScroll.scss";

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

function Image({
  src,
  alt,
  className,
}: {
  id: number;
  src: string;
  alt: string;
  className: string;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 300);

  return (
    <section className="img-container w-full">
      <div ref={ref}>
        <img src={src} alt={alt} className={className} />
      </div>
      <motion.h2
        className={`backdrop-blur-sm px-1 rounded-lg  text-black;
`}
        initial={{ visibility: "hidden" }}
        animate={{ visibility: "visible" }}
        style={{ y }}
      >
        {alt}
      </motion.h2>
    </section>
  );
}

function imageScrollPh() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section>
      <div className="grid grid-cols-1 width-full overflow-x-hidden">
        <div id="example">
          <div className="bg-card rounded-lg shadow content">
            {imgLd.map((image, index) => (
              <Image
                key={index}
                id={index + 1}
                src={image.src}
                alt={image.alt}
                className="w-full h-auto rounded-lg mb-2"
              />
            ))}
            <motion.div className="progress" style={{ scaleX }} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default imageScrollPh;
