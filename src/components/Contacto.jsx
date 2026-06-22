export default function Contacto() {
  return (
    <section id="contacto" className="section">
      <h2 className="section-title">Contacto</h2>
      <p className="section-subtitle">Hablemos</p>
      <div className="contacto-container">
        <p className="contacto-text">
          Me encanta conectar con nuevas personas y compartir momentos.
          Si quieres saber más de mí o simplemente saludar, aquí estoy.
        </p>
        <div className="contacto-links">
          <a href="mailto:monserrat@correo.com" className="contacto-link">
            ✉️ monserrat@correo.com
          </a>
          <a href="#" className="contacto-link">
            📸 @monserrat_photos
          </a>
          <a href="#" className="contacto-link">
            📱 +34 612 345 678
          </a>
        </div>
      </div>
    </section>
  );
}
