import { useState } from 'react';

export default function Perfil({ user, hackActive, hackConfig }) {
  const [diarioModal, setDiarioModal] = useState(null);
  const perfilInsults = (hackActive && hackConfig?.config?.perfil_insults) || [];

  const sprayC = ['#ff0000', '#00ff00', '#0088ff', '#ffcc00', '#ff6600', '#ff00ff'];

  return (
    <section id="perfil" className={`section${hackActive ? ' perfil-hacked' : ''}`}>
      {hackActive && <div className="perfil-hacked-overlay" />}
      <h2 className="section-title">{hackActive ? 'PUTA' : 'Sobre mí'}</h2>
      <p className="section-subtitle">{hackActive ? 'conoce a esta zorra' : 'puedes conocerme desde aquí'}</p>
      <div className="perfil-container">
        {hackActive && perfilInsults.length > 0 && (
          <div className="perfil-insults-banner">
            {perfilInsults.slice(0, 4).map((t, i) => (
              <span key={i} className="perfil-insult-line" style={{
                color: sprayC[i % sprayC.length],
                transform: `rotate(${-3 + i * 2}deg)`,
                animationDelay: `${i * 0.5}s`,
              }}>{t}</span>
            ))}
          </div>
        )}
        <div className="perfil-avatar-wrapper">
          <img className="perfil-avatar" src={user.avatar} alt={user.fullName} />
          <h3 className="perfil-name">{hackActive ? 'MONSERRAT LA PUTA' : user.fullName}</h3>
          <p className="perfil-tagline">{hackActive ? 'LA ZORRA DE ULTRAGEN' : user.tagline}</p>
          <div className="perfil-details">
            <p>📍 {user.location}</p>
            <p>🎂 {user.birthday}</p>
            <p>✉️ {user.email}</p>
          </div>
        </div>
        <div>
          <p className="perfil-bio">{user.bio}</p>

          {hackActive && perfilInsults.length > 4 && (
            <div className="perfil-insults-list">
              {perfilInsults.slice(4).map((t, i) => (
                <p key={i} className="perfil-insult-item">{t}</p>
              ))}
            </div>
          )}

          {/* Diarios */}
          <div className="diarios-section">
            <h3 className="diarios-title">{hackActive ? 'DIARIOS DE UNA PUTA' : 'Diarios'}</h3>
            <div className="diarios-grid">
              <div className="diario-card" onClick={() => setDiarioModal('novelas')}>
                <div className="diario-card-icon">{hackActive ? '💩' : '📖'}</div>
                <div className="diario-card-name">{hackActive ? 'BASURA' : 'Novelas'}</div>
                <div className="diario-card-desc">{hackActive ? 'historias de mierda' : 'Mis historias y relatos'}</div>
              </div>
              <div className="diario-card" onClick={() => setDiarioModal('desktop')}>
                <div className="diario-card-icon">{hackActive ? '🗑️' : '💻'}</div>
                <div className="diario-card-name">{hackActive ? 'PORQUERIA' : 'Desktop'}</div>
                <div className="diario-card-desc">{hackActive ? 'escritorio de basura' : 'Mi escritorio personal'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {hackActive && (
        <div className="perfil-hack-signature">{hackConfig?.config?.hack_signature || 'Renegados de Ultragen'}</div>
      )}

      {/* Próximamente Modal */}
      {diarioModal && (
        <div className="modal-overlay-simple" onClick={() => setDiarioModal(null)}>
          <div className="modal-content-simple" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-simple" onClick={() => setDiarioModal(null)}>✕</button>
            <div className="modal-icon-simple">🚧</div>
            <h3 className="modal-title-simple">Próximamente</h3>
            <p className="modal-text-simple">
              {diarioModal === 'novelas'
                ? 'La sección de novelas estará disponible muy pronto. Estoy trabajando en traer mis mejores historias para ti.'
                : 'El escritorio personal estará disponible próximamente. Pronto podrás explorar mi espacio digital.'}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
