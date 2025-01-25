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

function getWidt() {
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
    <div className="div-container">
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
