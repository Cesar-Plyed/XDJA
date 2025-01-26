//vercel analytics
import { Analytics } from "@vercel/analytics/react";
//desktop
import Navbar from "./ComponentsWn/navBar.tsx";
import Carrousel from "./ComponentsWn/imageScroll.tsx";
import Footer from "./ComponentsWn/footer.tsx";
import Information from "./ComponentsWn/information.tsx";
//phone
import NavBarPh from "./ComponentsPh/navBarPh.tsx";
import FooterPh from "./ComponentsPh/footerPh.tsx";
import InformationPh from "./ComponentsPh/informationPh.tsx";
import ImageScrollPh from "./ComponentsPh/imageScrollPh.tsx";
//styles
import "./Styles/home.scss";
import { useEffect, useState } from "react";

export function getWidt() {
  const [width, setWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const updateHeight = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  return width;
}

function Home() {
  return (
    <div
      className={`bg-background text-foreground dark:bg-primary-foreground dark:text-primary div-container h-dvh grid  
        ${
          getWidt() <= 768
            ? "grid-rows-[60px_1fr_200px]"
            : "grid-rows-[80px_1fr_60px]"
        }`}
    >
      <nav>{getWidt() <= 768 ? <NavBarPh /> : <Navbar />}</nav>
      <main>
        <section>
          {getWidt() <= 768 ? <InformationPh /> : <Information />}
          {getWidt() <= 768 ? <ImageScrollPh /> : <Carrousel />}
        </section>
      </main>
      <footer>{getWidt() <= 768 ? <FooterPh /> : <Footer />}</footer>
      <Analytics />
    </div>
  );
}

export default Home;
