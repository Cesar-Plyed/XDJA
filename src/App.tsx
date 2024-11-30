import TopBar from "./Components/TopBar.tsx";
import Carousel from "./Components/Carousel.tsx";
import Footer from "./Components/Footer.tsx";
import "./Styles/Body.css";

function App() {
  return (
    <main className="main-content">
      <TopBar />
      {/* <main>
        <section className="sec-information">
          <h1 className="title">We renew your spaces</h1>
          <p className="p-information">
            <p className="p-item">Roofing</p>
            <p className="p-item">Siding</p>
            <p className="p-item">Farming</p>
            <p className="p-item">Drywall</p>
            <p className="p-item">Widnows & Doors</p>
            <p className="p-item">Flooring and more!</p>
          </p>
          <h1>We are the experts in concrete</h1>
        </section>
        <Carousel />
      </main> */}
      <Footer />
    </main>
  );
}

export default App;
