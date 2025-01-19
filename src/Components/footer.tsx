import { Component } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { iconLd } from "../assets/Images/ImagesLoader";
import "../Styles/footer.scss";
import { Link } from "react-router-dom";

export class footer extends Component {
  render() {
    return (
      <footer className="footer">
        <section className="sec-socMed">
          <Link
            className="link-Facebook link"
            to={"https://www.facebook.com/xdjaconstructionllc?mibextid=LQQJ4d"}
          >
            Facebook
          </Link>
          <Link
            className="link-Whatsapp link"
            to={"http://wa.me/+1(574)3046758"}
          >
            Whatsapp
          </Link>
        </section>
        <section className="sec-icon">
          <LazyLoadImage
            alt={""}
            src={iconLd.src}
            height={60}
            width={60}
          ></LazyLoadImage>
        </section>
        <section className="sec-credit">
          <div className="div-text">
              <span className="spa-text">This page was animated with</span>
              <Link className="link-Motion link" to={"https://motion.dev/"}>
                <span className="spa-text">Motion</span>
              </Link>
              <span className="spa-text">and was styled whit</span>
              <Link className="link-Boot link" to={"https://motion.dev/"}>
                <span className="spa-text">Bootstrap</span>
              </Link>
          </div>
        </section>
      </footer>
    );
  }
}

export default footer;
