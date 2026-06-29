import cafeImg from '../assets/cafe.avif';

export default function CoffeeSupport() {
  const handleDonate = () => {
    window.open('secondlife:///app/agent/a8c18228-601a-4a14-b5f3-b00d3202c0ad/pay', '_blank');
  };

  return (
    <section className="section coffee-section">
      <h2 className="section-title">Invitame un cafecito</h2>
      <p className="section-subtitle">Apoya mi trabajo</p>
      <div className="coffee-card">
        <div
          className="coffee-card-bg"
          style={{ backgroundImage: 'url(' + cafeImg + ')' }}
        />
        <div className="coffee-card-image">
          <img src={cafeImg} alt="Café" />
        </div>
        <div className="coffee-card-content">
          <div className="coffee-card-body">
            <p className="coffee-card-text">
              Si disfrutas mi contenido y quieres que siga creando más historias,
              más capítulos y más aventuras, puedes apoyarme con un pequeño gesto.
              Cada contribución me da energía para seguir escribiendo.
            </p>
            <p className="coffee-card-subtext">
              Cada cafecito desbloquea secretos dentro de la web.
            </p>
          </div>
          <div className="coffee-card-action">
            <button className="outline-btn" onClick={handleDonate}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="outline-btn-icon"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" x2="6" y1="2" y2="4"/><line x1="10" x2="10" y1="2" y2="4"/><line x1="14" x2="14" y1="2" y2="4"/></svg>
              <span>Invitame un cafecito 500L</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
