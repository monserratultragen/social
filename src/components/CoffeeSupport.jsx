export default function CoffeeSupport() {
  const handleDonate = () => {
    window.open('secondlife:///app/agent/a8c18228-601a-4a14-b5f3-b00d3202c0ad/pay', '_blank');
  };

  return (
    <section className="section coffee-section">
      <h2 className="section-title">Invitame un cafecito</h2>
      <p className="section-subtitle">Apoya mi trabajo</p>
      <div className="coffee-card">
        <div className="coffee-card-body">
          <p className="coffee-card-text">
            Si disfrutas mi contenido y quieres que siga creando más historias,
            más capítulos y más aventuras, puedes apoyarme con un pequeño gesto.
            Cada contribución me da energía para seguir escribiendo.
          </p>
        </div>
        <div className="coffee-card-action">
          <button className="coffee-btn" onClick={handleDonate}>
            ☕ Invitame un cafecito 500L
          </button>
        </div>
      </div>
    </section>
  );
}
