const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdOybvlEsZIbQxsfFdvt6gJdNLgKSgU8R3mlv1vd0nlnzTMGQ/viewform?usp=header';

export default function Guestbook({ entries = [] }) {
  return (
    <section id="libro" className="section">
      <h2 className="section-title">Libro de Visitas</h2>
      <p className="section-subtitle">déjame tus palabras</p>

      <div className="guestbook-container">
        <div className="guestbook-header">
          <span className="guestbook-header-label">Firmar</span>
          <a
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="guestbook-form-link"
            title="Abrir formulario para firmar"
          >
            ✍️
          </a>
        </div>

        <div className="guestbook-entries">
          {entries.length === 0 ? (
            <p className="guestbook-empty">
              Sé el primero en firmar...
            </p>
          ) : (
            entries.map((entry) => (
              <div key={entry.id} className="guestbook-entry">
                <div className="guestbook-entry-head">
                  <strong className="guestbook-entry-name">{entry.nombre}</strong>
                  <span className="guestbook-entry-date">{entry.fecha}</span>
                </div>
                <p className="guestbook-entry-message">{entry.mensaje}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
