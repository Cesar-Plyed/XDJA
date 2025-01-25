import { Component } from "react";
import "../Styles/navBar.scss";

export default class navBarPh extends Component {
  render() {
    return (
      <div className="">
        <div className="logo">XDJA</div>
        <nav>
          <ul>
            <li>
              <a href="#inicio">Inicio</a>
            </li>
            <li>
              <a href="#sobre-nosotros">Sobre Nosotros</a>
            </li>
            <li>
              <a href="#servicios">Servicios</a>
            </li>
            <li>
              <a href="#proyectos">Proyectos</a>
            </li>
            <li>
              <a href="#testimonios">Testimonios</a>
            </li>
            <li>
              <a href="#contacto">Contacto</a>
            </li>
          </ul>
        </nav>
        <button className="cta">Solicitar Cotización</button>
      </div>
    );
  }
}
