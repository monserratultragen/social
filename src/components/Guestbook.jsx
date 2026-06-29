import { useMemo } from 'react';

const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdOybvlEsZIbQxsfFdvt6gJdNLgKSgU8R3mlv1vd0nlnzTMGQ/viewform?usp=header';

export default function Guestbook({ entries = [] }) {
  const sorted = useMemo(() => {
    return [...entries].sort((a, b) => {
      const dateA = a.created_at ? new Date(a.created_at) : new Date(0);
      const dateB = b.created_at ? new Date(b.created_at) : new Date(0);
      return dateB - dateA;
    });
  }, [entries]);

  return (
    <section id="libro" className="section">
      <h2 className="section-title">Libro de Visitas</h2>
      <p className="section-subtitle">déjame tus palabras</p>

      <div className="guestbook-container">
        <div className="guestbook-btn-row">
          <a
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="outline-btn"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="outline-btn-icon"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
            <span>Firmar</span>
          </a>
        </div>

        <div className="guestbook-entries">
          {sorted.length === 0 ? (
            <p className="guestbook-empty">
              Sé el primero en firmar...
            </p>
          ) : (
            sorted.map((entry) => (
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