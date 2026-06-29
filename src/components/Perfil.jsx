import { useState, useRef, useCallback } from 'react';

export default function Perfil({ user, hackActive, hackConfig }) {
  const [diarioModal, setDiarioModal] = useState(null);
  const [devModal, setDevModal] = useState(null);
  const [devNotes, setDevNotes] = useState(null);
  const ph = hackActive && hackConfig?.config?.perfil_hack || {};
  const novelasImg = hackActive ? (ph.card_novelas_img || '') : (user.cardNovelasImg || '');
  const desktopImg = hackActive ? (ph.card_desktop_img || '') : (user.cardDesktopImg || '');
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef(null);

  const handleAvatarClick = useCallback(async () => {
    clickCountRef.current += 1;
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    clickTimerRef.current = setTimeout(() => { clickCountRef.current = 0; }, 1500);
    if (clickCountRef.current >= 5) {
      clickCountRef.current = 0;
      if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
      if (!devNotes) {
        const module = await import('../data/dev-notes.js');
        setDevNotes(module.default);
      }
      setDevModal(true);
    }
  }, [devNotes]);

  return (
    <section id="perfil" className={`section${hackActive ? ' perfil-hacked' : ''}`}>
      {hackActive && <div className="perfil-hacked-overlay" />}
      <h2 className="section-title">{hackActive ? ph.title : 'Sobre mí'}</h2>
      <p className="section-subtitle">{hackActive ? ph.subtitle : 'puedes conocerme desde aquí'}</p>
      <div className="perfil-container">
        <div className="perfil-avatar-wrapper">
          <img className="perfil-avatar" src={user.avatar} alt={user.fullName} onClick={handleAvatarClick} />
          <h3 className="perfil-name">{hackActive ? ph.name : user.fullName}</h3>
          <div className="perfil-meta">
            <div className="perfil-taglines">
              {(hackActive ? ph.tagline : user.tagline).split('\n').filter(Boolean).map((line, i) => (
                <p key={i} className="perfil-tagline">{line}</p>
              ))}
            </div>
            <div className="perfil-details">
              <p className="perfil-detail-item">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="perfil-detail-icon" title="Ubicación"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <span>{user.location}</span>
              </p>
              <p className="perfil-detail-item">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="perfil-detail-icon" title="Cumpleaños"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                <span>{user.birthday}</span>
              </p>
              <p className="perfil-detail-item">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="perfil-detail-icon" title="Email"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                <span>{user.email}</span>
              </p>
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
      {devModal && devNotes && (
        <div className="modal-overlay-simple" onClick={() => setDevModal(null)}>
          <div className="dev-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-simple" onClick={() => setDevModal(null)}>✕</button>
            <div className="dev-modal-grid">
              <div className="dev-modal-left">
                <h3 className="dev-modal-title">◆ FICHA PERSONAL</h3>
                {devNotes.map((section, i) => (
                  <div key={i} className="dev-modal-section">
                    <h4 className="dev-modal-category">{section.category}</h4>
                    {section.items.map((item, j) => (
                      <div key={j} className="dev-modal-row">
                        <span className="dev-modal-label">{item.label}:</span>
                        <span className="dev-modal-value">{item.value}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div className="dev-modal-divider" />
              <div className="dev-modal-right">
                <p className="dev-modal-prompt">Ciertas respuestas solo se encuentran cuando dejas de buscar con los ojos y empiezas a buscar con la mente.</p>
                <p className="dev-modal-subprompt">Resuelve los acertijos y obtendrás una recompensa.</p>
                <button className="dev-modal-btn" onClick={() => {}}>COMENZAR</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}