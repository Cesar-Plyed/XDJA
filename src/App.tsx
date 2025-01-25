import Navbar from "./Components/navBar.tsx";
import Carrousel from "./Components/imageScroll.tsx";
import Footer from "./Components/footer.tsx";
import Information from "./Components/information.tsx";
//phone
import NavBarPh from "./componentsMovil/navBarPh.tsx";
import FooterPh from "./componentsMovil/footerPh.tsx";
import InformationPh from "./componentsMovil/informationPh.tsx";
import ImageScrollPh from "./componentsMovil/imageScrollPh.tsx";
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
      className={`bg-background text-foreground p-8 dark:bg-primary-foreground dark:text-primary div-container h-dvh grid  
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
    </div>
  );
}

export default Home;
