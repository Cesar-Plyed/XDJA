import { Link } from "react-router-dom";
import "../Styles/TopBar.css";

function TopBar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid">
          {/* This link is the logo */}
          <Link to={""} className="navbar-brand"></Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="c">
                <Link className="nav-link" aria-current="page" to={"/"}>
                  Home
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={""}
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Contact us
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      className="dropdown-item"
                      to={"https://wa.me/+1(574)304-6758?"}
                    >
                      WhatsApp
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to={
                        "https://www.facebook.com/xdjaconstructionllc?mibextid=LQQJ4d"
                      }
                    >
                      Facebook
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to={"mailto:xdjaconstructionllc@gmail.com"}
                    >
                      Emalil
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default TopBar;
