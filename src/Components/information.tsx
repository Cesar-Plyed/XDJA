import { Component } from "react";
import "../Styles/information.scss"

export class information extends Component {
  render() {
    return (
      <div className="div-information">
        <div className="div-titleInformation">
          <h1 className="h1-title">
            We renew <span className="span-title">your spaces</span>
          </h1>{" "}
        </div>
        <div className="div-subInformation">
          <span className="span-point">
            <div className="div-information">
              <p>Roodfing</p>
              <p>Siding</p>
              <p>Framing</p>
              <p>Drywall</p>
              <p>Windows & Doors</p>
              <p>Flooring and more!</p>
            </div>
          </span>
        </div>
      </div>
    );
  }
}

export default information;
