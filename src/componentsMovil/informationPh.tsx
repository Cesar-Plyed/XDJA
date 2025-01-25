function informationPh() {
  return (
    <section className="">
      <section id="inicio" className="hero">
        <h1>Construyendo el Futuro con XDJA</h1>
        <p>Proyectos de construcción de alta calidad y diseño innovador.</p>
        <button>Ver Proyectos</button>
        <button>Solicitar Cotización</button>
      </section>

      <section id="sobre-nosotros">
        <h2>¿Quiénes Somos?</h2>
        <p>Información sobre la misión, visión y valores de XDJA.</p>
        <img src="equipo-trabajando.jpg" alt="Equipo trabajando" />
      </section>

      <section id="servicios">
        <h2>Nuestros Servicios</h2>
        <div className="servicio">
          <img src="residencial-icon.png" alt="Residencial" />
          <h3>Construcción Residencial</h3>
          <p>Descripción del servicio de construcción residencial.</p>
        </div>
      </section>

      <section id="servicios">
        <h2>Nuestros Servicios</h2>
        <div className="servicio">
          <img src="residencial-icon.png" alt="Residencial" />
          <h3>Construcción Residencial</h3>
          <p>Descripción del servicio de construcción residencial.</p>
        </div>
      </section>

      <section id="testimonios">
        <h2>Lo que Dicen Nuestros Clientes</h2>
        <div className="testimonio">
          <p>"Excelente servicio y calidad en cada detalle."</p>
          <p>- Cliente Satisfecho</p>
        </div>
      </section>
    </section>
  );
}

export default informationPh;
