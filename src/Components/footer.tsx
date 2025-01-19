import React, { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { iconLd } from "../assets/Images/ImagesLoader";
import "../Styles/footer.scss";
import { Link } from "react-router-dom";

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

function footer() {
  return (
    <footer
      className="footer"
      style={{ "--width": `${getWidt}` } as React.CSSProperties}
    >
      <section className="sec-socMed">
        <Link
          className="link-Facebook link"
          to={"https://www.facebook.com/xdjaconstructionllc?mibextid=LQQJ4d"}
        >
          Facebook
        </Link>
        <Link className="link-Whatsapp link" to={"http://wa.me/+1(574)3046758"}>
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
        <div className="div-text" style={{ padding: "" }}>
          <span className="spa-text">This page was animated witH</span>
          <Link className="link-Motion link" to={"https://motion.dev/"}>
            <span className="spa-text-link">Motion</span>
          </Link>
          <span className="spa-text">and was styled whit</span>
          <Link className="link-Boot link" to={"https://motion.dev/"}>
            <span className="spa-text-link">Bootstrap</span>
          </Link>
        </div>
      </section>
    </footer>
  );
}

export default footer;
