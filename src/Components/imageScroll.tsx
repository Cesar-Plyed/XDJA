import {
    motion,
    MotionValue,
    useScroll,
    useSpring,
    useTransform,
  } from "motion/react";
  import { useRef } from "react";
  import { imgLd } from "../assets/Images/ImagesLoader";
  
  function useParallax(value: MotionValue<number>, distance: number) {
    return useTransform(value, [0, 1], [-distance, distance]);
  }
  
  function Image({ src, alt }: { id: number; src: string; alt: string }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref });
    const y = useParallax(scrollYProgress, 300);
  
    return (
      <section className="img-container">
        <div ref={ref}>
          <img src={src} alt={alt} />
        </div>
        <motion.h2
          // Hide until scroll progress is measured
          initial={{ visibility: "hidden" }}
          animate={{ visibility: "visible" }}
          style={{ y }}
        >
          {alt}
        </motion.h2>
      </section>
    );
  }
  
  export default function Parallax() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001,
    });
  
    return (
      <div id="example">
        <div className="content">
          {imgLd.map((image, index) => (
            <Image key={index} id={index + 1} src={image.src} alt={image.alt} />
          ))}
          <motion.div className="progress" style={{ scaleX }} />
        </div>
        <StyleSheet />
      </div>
    );
  }
  
  /**
   * ==============   Styles   ================
   */
  
  function StyleSheet() {
    return (
      <style>{`
        html {
          scroll-snap-type: y mandatory;
        }
  
        body {
          margin: 0;
          padding: 0;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
  
        #example {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          overflow-x: hidden;
        }
  
        .content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
  
        .img-container {
          height: 100vh;
          scroll-snap-align: start;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }
  
        .img-container > div {
          width: 400px;
          height: 500px;
          margin: 20px;
          background: #f5f5f5;
          overflow: hidden;
        }
  
        .img-container img {
          width: 400px;
          height: 500px;
        }
  
        @media (max-width: 500px) {
          .img-container > div {
            width: 150px;
            height: 200px;
          }
  
          .img-container img {
            width: 150px;
            height: 200px;
          }
        }
  
        .img-container h2 {
          color: red;
          margin: 0;
          font-family: JetBrains Mono, monospace;
          font-size: 50px;
          font-weight: 700;
          letter-spacing: -3px;
          line-height: 1.2;
          position: absolute;
          display: inline-block;
          top: calc(50% - 25px);
          left: calc(50% + 120px);
        }
  
        .progress {
          position: fixed;
          left: 0;
          right: 0;
          height: 5px;
          background: red;
          bottom: 60px;
          transform: scaleX(0);
        }
    `}</style>
    );
  }
  