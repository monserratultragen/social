export default function Contacto() {
  return (
    <section id="contacto" className="section">
      <h2 className="section-title">Contacto</h2>
      <p className="section-subtitle">escríbeme</p>
      <div className="contacto-container">
        <p className="contacto-text">
          Me encanta conectar con nuevas personas y compartir momentos.
          Si quieres saber más de mí o simplemente saludar, aquí estoy.
        </p>
        <div className="contacto-links">
          <a href="secondlife:///app/agent/a8c18228-601a-4a14-b5f3-b00d3202c0ad/about" className="outline-btn" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="outline-btn-icon"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            <span>Escríbeme</span>
          </a>
        </div>
      </div>
    </section>
  );
}
