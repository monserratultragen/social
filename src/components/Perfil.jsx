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
          <div className="perfil-meta">
            <div className="perfil-taglines">
              {(hackActive ? ph.tagline : user.tagline).split('\n').filter(Boolean).map((line, i) => (
                <p key={i} className="perfil-tagline">{line}</p>
              ))}
            </div>
            <div className="perfil-details">
              <p><span className="perfil-detail-label">Ubicación:</span> {user.location}</p>
              <p><span className="perfil-detail-label">Cumpleaños:</span> {user.birthday}</p>
              <p><span className="perfil-detail-label">Email:</span> {user.email}</p>
            </div>
          </div>
        </div>
        <div>
          <p className="perfil-bio">{user.bio}</p>
          <div className="diarios-section">
            <h3 className="diarios-title">{hackActive ? ph.diarios_title : 'Conoce mis obras'}</h3>
            <div className="diarios-grid">
              <div className={`diario-card${novelasImg ? ' has-bg' : ''}`} style={novelasImg ? { backgroundImage: `url(${novelasImg})` } : {}} onClick={() => setDiarioModal('novelas')}>
                <span className="diario-card-tag diario-card-tag--monserrat">Autor: Monserrat</span>
                <div className="diario-card-name">{hackActive ? ph.diario_novelas_name : 'Novelas'}</div>
                <div className="diario-card-desc">{hackActive ? ph.diario_novelas_desc : 'Mi historia contada a través de mis diarios personales.'}</div>
              </div>
              <div className={`diario-card${desktopImg ? ' has-bg' : ''}`} style={desktopImg ? { backgroundImage: `url(${desktopImg})` } : {}} onClick={() => setDiarioModal('desktop')}>
                <span className="diario-card-tag diario-card-tag--marcus">Autor: Marcus</span>
                <div className="diario-card-name">{hackActive ? ph.diario_desktop_name : 'Desktop'}</div>
                <div className="diario-card-desc">{hackActive ? ph.diario_desktop_desc : 'Colección de artículos y escritos seleccionados.'}</div>
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