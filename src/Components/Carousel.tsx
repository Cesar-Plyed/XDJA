import "../Styles/Carousel.css";

export default function Carousel() {
  return (
    <section className="sec-carousel">
      <div id="carouselExampleIndicators" className="carousel slide">

        {/* Bottom imdicator by jus image */}
        <div className="carousel-indicators">
          {(() => {
            const btnLoop = [];

            for (let i = 0; i < 13; i++) {
              btnLoop.push(
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to={`${i}`}
                  className="active"
                  aria-current="true"
                  aria-label={`Slide ${i}`}
                  id={`button${i}`}
                  onClick={() => {
                    console.log("I es" + i);
                  }}
                ></button>
              );
            }

            return btnLoop;
          })()}
        </div>

        {/* Upload All Images by link */}
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://i.ibb.co/wBHrZXh/img1.jpg"
              className="d-block w-100"
              alt="..."
            />
          </div>

          <div className="carousel-item">
            <img
              src="https://i.ibb.co/cbPSpQL/img2.jpg"
              className="d-block w-100"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://i.ibb.co/fQzHCjt/img3.jpg"
              className="d-block w-100"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://i.ibb.co/0Cs7LV6/img4.jpg"
              className="d-block w-100"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://i.ibb.co/27skqcJ/img5.jpg"
              className="d-block w-100"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://i.ibb.co/cYhkzPb/img6.jpg"
              className="d-block w-100"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://i.ibb.co/9sJkXjB/img7.jpg"
              className="d-block w-100"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://i.ibb.co/jZcGKT3/img8.jpg"
              className="d-block w-100"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://i.ibb.co/h7bS0Yf/img9.jpg"
              className="d-block w-100"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://i.ibb.co/bL3CQx3/img10.jpg"
              className="d-block w-100"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://i.ibb.co/z5dZRcQ/img11.jpg"
              className="d-block w-100"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://i.ibb.co/TT6xfG8/img12.jpg"
              className="d-block w-100"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://i.ibb.co/mbNvPP8/img13.jpg"
              className="d-block w-100"
            />
          </div>
        </div>

        {/* Side Buttons */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </section>
  );
}
