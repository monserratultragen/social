import { useState } from 'react';
import PhotoViewer from './PhotoViewer';
import { validarClaveMaestra, fetchRecuerdoFotos } from '../services/api';

function getFotos(recuerdo) {
  if (recuerdo.fotos) {
    const validas = recuerdo.fotos.filter(Boolean);
    if (validas.length > 0) return validas;
  }
  if (recuerdo.image) return [recuerdo.image];
  return [];
}

const sprayColors = ['#ff0000', '#00ff00', '#0088ff', '#ffcc00', '#ff6600', '#ff00ff', '#00ffff', '#cc00ff'];
const emojis = ['🍆', '🥵', '🍑'];

export default function Recuerdos({ recuerdos = [], bannerUrl, hackConfig }) {
  const [locked, setLocked] = useState(true);
  const [pwModal, setPwModal] = useState(false);
  const [pwValue, setPwValue] = useState('');
  const [pwError, setPwError] = useState(false);
  const [validating, setValidating] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerImages, setViewerImages] = useState([]);
  const [viewerIndex, setViewerIndex] = useState(0);

  const handleUnlock = async () => {
    setValidating(true);
    setPwError(false);
    const valida = await validarClaveMaestra(pwValue);
    setValidating(false);
    if (valida) {
      setLocked(false);
      setPwModal(false);
      setPwValue('');
    } else {
      setPwError(true);
    }
  };

  const openViewer = async (recuerdo) => {
    if (locked) { setPwModal(true); return; }
    let fotos = getFotos(recuerdo);
    if (fotos.length <= 1 && recuerdo.id) {
      try {
        const extra = await fetchRecuerdoFotos(recuerdo.id);
        if (extra.length > fotos.length) fotos = extra;
      } catch {}
    }
    setViewerImages(fotos);
    setViewerIndex(0);
    setViewerOpen(true);
  };

  const firstImage = (recuerdo) => getFotos(recuerdo)[0] || '';
  const visible = recuerdos.filter(r => getFotos(r).length > 0);

  if (!hackConfig) return null;

  const c = hackConfig.config;
  const insults = c.insults || [];
  const rand = () => insults[Math.floor(Math.random() * insults.length)];
  const positions = Array.from({ length: 15 }, (_, i) => ({
    top: `${5 + Math.random() * 85}%`,
    left: `${Math.random() * 80}%`,
    right: 'auto',
    rotate: `${-30 + Math.random() * 60}deg`,
    size: `${0.9 + Math.random() * 1.2}rem`,
  }));

  return (
    <section id="recuerdos" className="section recuerdos-section-defaced">
      <div className="recuerdos-defaced-overlay" />

      <div className="recuerdos-header-defaced">
        <h2 className="recuerdos-title-defaced">SITIO HACKEADO!!</h2>
        <p className="recuerdos-subtitle-defaced">{c.header_subtitle || ''}</p>
      </div>

      {c.ticker1 && (
        <div className="recuerdos-ticker-wrap">
          <div className="recuerdos-ticker"><span>{c.ticker1}</span></div>
        </div>
      )}

      {bannerUrl && (
        <div className="recuerdos-banner-wrapper">
          <div className="recuerdos-banner-overlay-text">
            {c.banner_overlay || ''}
            {c.banner_sub && <span className="recuerdos-banner-sub">{c.banner_sub}</span>}
          </div>
          <img src={bannerUrl} alt="" className="recuerdos-banner-img" />
        </div>
      )}

      {c.defaced_lines && c.defaced_lines.length > 0 && (
        <div className="recuerdos-defaced-message">
          {c.defaced_lines.map((line, i) => (
            <p key={i} className={i === 0 ? 'recuerdos-defaced-line' : 'recuerdos-defaced-line-sm'}>{line}</p>
          ))}
        </div>
      )}

      {locked && c.locked_hint && (
        <p className="recuerdos-locked-hint-defaced">{c.locked_hint}</p>
      )}

      <div className="recuerdos-grid-defaced">
        {visible.map((recuerdo, i) => (
          <div key={recuerdo.id} className="recuerdo-card-defaced" onClick={() => openViewer(recuerdo)}>
            <div className={`recuerdo-img-wrapper-defaced ${locked ? 'blurred' : ''}`}>
              <img src={firstImage(recuerdo)} alt="" loading="lazy" />
            </div>
            <span className="recuerdo-card-defaced-graffiti" style={{
              top: `${8 + Math.random() * 55}%`,
              left: `${-5 + Math.random() * 35}%`,
              transform: `rotate(${-25 + Math.random() * 50}deg)`,
              color: sprayColors[(i * 3) % sprayColors.length],
              background: 'rgba(0,0,0,0.5)',
            }}>{rand()}</span>
            <span className="recuerdo-card-defaced-graffiti" style={{
              top: `${50 + Math.random() * 30}%`,
              left: `${30 + Math.random() * 40}%`,
              transform: `rotate(${25 - Math.random() * 60}deg)`,
              fontSize: '0.65rem',
              opacity: 0.75,
              color: sprayColors[(i * 7) % sprayColors.length],
              background: 'rgba(0,0,0,0.5)',
            }}>{rand()}</span>
            {recuerdo.date && <div className="recuerdo-card-defaced-date">{recuerdo.date}</div>}
          </div>
        ))}
      </div>

      {c.ticker2 && (
        <div className="recuerdos-ticker-wrap" style={{ marginTop: '30px' }}>
          <div className="recuerdos-ticker"><span>{c.ticker2}</span></div>
        </div>
      )}

      {c.footer_lines && c.footer_lines.length > 0 && (
        <div className="recuerdos-defaced-footer">
          {c.footer_lines.map((line, i) => (
            <p key={i} className={i === 0 ? 'recuerdos-defaced-line' : 'recuerdos-defaced-line-sm'}
               style={i === c.footer_lines.length - 1 ? { marginTop: '20px', color: '#ff0000', fontSize: '1.2rem', textShadow: '0 0 12px rgba(255,0,0,0.6)' } : {}}>{line}</p>
          ))}
        </div>
      )}

      {viewerOpen && !locked && (
        <PhotoViewer images={viewerImages} currentIndex={viewerIndex}
          onClose={() => setViewerOpen(false)} onNavigate={setViewerIndex} />
      )}

      {pwModal && (
        <div className="modal-overlay-simple recuerdos-modal-pw-defaced" onClick={() => { setPwModal(false); setPwError(false); setPwValue(''); }}>
          <div className="modal-content-simple modal-pw recuerdos-modal-pw-inner-defaced" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-simple recuerdos-modal-close-defaced" onClick={() => { setPwModal(false); setPwError(false); setPwValue(''); }}>✕</button>
            <div className="modal-icon-simple" style={{ fontSize: '3rem' }}>🔐</div>
            <h3 className="modal-title-simple" style={{ fontFamily: "'Caveat', cursive", color: '#cc0000', fontSize: '2rem', letterSpacing: '2px' }}>ACCESO BLOQUEADO</h3>
            <p className="modal-text-simple" style={{ fontFamily: "'Courier New', monospace", color: '#00ff00', fontSize: '1rem', textShadow: '0 0 8px rgba(255,0,0,0.3)' }}>
              {c.pw_instruction || 'Ingresa la contraseña'}<br />{c.pw_insult || ''}
            </p>
            <input className="modal-pw-input recuerdos-modal-input-defaced" type="password" placeholder="CONTRASEÑA"
              value={pwValue} onChange={(e) => { setPwValue(e.target.value); setPwError(false); }}
              onKeyDown={(e) => { if (e.key === 'Enter') handleUnlock(); }} autoFocus />
            {pwError && <p className="modal-pw-error" style={{ fontFamily: "'Caveat', cursive", color: '#ff0000', fontSize: '1.5rem' }}>{c.pw_error || 'INCORRECTO'}</p>}
            {validating && <p className="modal-pw-error" style={{ fontFamily: "'Courier New', monospace", color: '#ffcc00', fontSize: '1rem', textShadow: '0 0 8px rgba(255,204,0,0.4)' }}>Validando...</p>}
            <button className="modal-pw-btn recuerdos-modal-btn-defaced" onClick={handleUnlock} disabled={validating}>DESBLOQUEAR</button>
          </div>
        </div>
      )}
    </section>
  );
}