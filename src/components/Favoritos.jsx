import { useState } from 'react';
import PhotoViewer from './PhotoViewer';

export default function Favoritos({ favoritos = [] }) {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerImage, setViewerImage] = useState(null);

  return (
    <section id="favoritos" className="section">
      <h2 className="section-title">Favoritos</h2>
      <p className="section-subtitle">Mis lugares y fotografías especiales</p>
      <div className="favoritos-grid">
        {favoritos.filter(f => f.image).map((item) => (
          <div
            key={item.id}
            className="favorito-card"
            onClick={() => {
              setViewerImage(item.image);
              setViewerOpen(true);
            }}
          >
            <div className="favorito-image-wrapper">
              <img className="favorito-image" src={item.image} alt={item.title} loading="lazy" />
              {(() => {
                const t = (item.type || '').trim().toLowerCase();
                if (!['general', 'moderate', 'adult'].includes(t)) return null;
                return <span className={`favorito-type type-${t}`}>{item.type}</span>;
              })()}
              {item.rating && item.rating !== 'general' && (
                <span className={`favorito-rating-badge rating-${item.rating}`}>
                  {item.rating}
                </span>
              )}
            </div>
            <div className="favorito-info">
              <div className="favorito-meta">
                <h3 className="favorito-title">{item.title}</h3>
                {item.comentario && (
                  <p className="favorito-comentario">{item.comentario}</p>
                )}
              </div>
              {item.secondlife_url && (
                <a
                  href={item.secondlife_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="favorito-sl-link"
                  title="Abrir en Second Life"
                  onClick={e => e.stopPropagation()}
                >
                  SL →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
      {viewerOpen && viewerImage && (
        <PhotoViewer
          images={[viewerImage]}
          currentIndex={0}
          onClose={() => { setViewerOpen(false); setViewerImage(null); }}
          onNavigate={() => {}}
        />
      )}
    </section>
  );
}
