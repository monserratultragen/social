import { useState } from 'react';

export default function Perfil({ user, hackActive, hackConfig }) {
  const [diarioModal, setDiarioModal] = useState(null);
  const ph = hackActive && hackConfig?.config?.perfil_hack || {};
  const novelasImg = hackActive ? (ph.card_novelas_img || '') : (user.cardNovelasImg || '');
  const desktopImg = hackActive ? (ph.card_desktop_img || '') : (user.cardDesktopImg || '');

  return (
    <section id="perfil" className={`section${hackActive ? ' perfil-hacked' : ''}`}>
      {hackActive && <div className="perfil-hacked-overlay" />}
      <h2 className="section-title">{hackActive ? ph.title : 'Sobre mí'}</h2>
      <p className="section-subtitle">{hackActive ? ph.subtitle : 'puedes conocerme desde aquí'}</p>
      <div className="perfil-container">
        <div className="perfil-avatar-wrapper">
          <img className="perfil-avatar" src={user.avatar} alt={user.fullName} />
          <h3 className="perfil-name">{hackActive ? ph.name : user.fullName}</h3>
          {(hackActive ? ph.tagline : user.tagline).split('\n').filter(Boolean).map((line, i) => (
            <p key={i} className="perfil-tagline">{line}</p>
          ))}
          <div className="perfil-details">
            <p>📍 {user.location}</p>
            <p>🎂 {user.birthday}</p>
            <p>✉️ {user.email}</p>
          </div>
        </div>
        <div>
          <p className="perfil-bio">{user.bio}</p>
          <div className="diarios-section">
            <h3 className="diarios-title">{hackActive ? ph.diarios_title : 'Diarios'}</h3>
            <div className="diarios-grid">
              <div className={`diario-card${novelasImg ? ' has-bg' : ''}`} style={novelasImg ? { backgroundImage: `url(${novelasImg})` } : {}} onClick={() => setDiarioModal('novelas')}>
                <div className="diario-card-icon">📖</div>
                <div className="diario-card-name">{hackActive ? ph.diario_novelas_name : 'Novelas'}</div>
                <div className="diario-card-desc">{hackActive ? ph.diario_novelas_desc : 'Mis historias y relatos'}</div>
              </div>
              <div className={`diario-card${desktopImg ? ' has-bg' : ''}`} style={desktopImg ? { backgroundImage: `url(${desktopImg})` } : {}} onClick={() => setDiarioModal('desktop')}>
                <div className="diario-card-icon">💻</div>
                <div className="diario-card-name">{hackActive ? ph.diario_desktop_name : 'Desktop'}</div>
                <div className="diario-card-desc">{hackActive ? ph.diario_desktop_desc : 'Mi escritorio personal'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {hackActive && (
        <div className="perfil-hack-signature">{hackConfig?.config?.hack_signature || 'Renegados de Ultragen'}</div>
      )}
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
