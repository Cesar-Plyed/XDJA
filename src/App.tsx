import Navbar from "./Components/navBar.tsx";
import Carrousel from "./Components/imageScroll.tsx";
import Footer from "./Components/footer.tsx";
import Information from "./Components/information.tsx";
import "./Styles/home.scss";

function Home() {
  return (
    <div className="div-container">
      <nav>
        <Navbar></Navbar>
      </nav>
      <main>
        <section>
          <Information></Information>
          <Carrousel></Carrousel>
        </section>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
}

export default Home;
