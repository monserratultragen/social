import { useState, useMemo } from 'react';
import PhotoViewer from './PhotoViewer';

export default function Favoritos({ favoritos = [] }) {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);

  const images = useMemo(() => favoritos.filter(f => f.image).map((f) => f.image), [favoritos]);

  return (
    <section id="favoritos" className="section">
      <h2 className="section-title">Favoritos</h2>
      <p className="section-subtitle">Mis lugares y fotografías especiales</p>
      <div className="favoritos-grid">
        {favoritos.filter(f => f.image).map((item, i) => (
          <div
            key={item.id}
            className="favorito-card"
            onClick={() => {
              setViewerIndex(i);
              setViewerOpen(true);
            }}
          >
            <img className="favorito-image" src={item.image} alt={item.title} loading="lazy" />
            <div className="favorito-info">
              <div className="favorito-title">{item.title}</div>
              <div className="favorito-type">{item.type}</div>
            </div>
          </div>
        ))}
      </div>
      {viewerOpen && (
        <PhotoViewer
          images={images}
          currentIndex={viewerIndex}
          onClose={() => setViewerOpen(false)}
          onNavigate={setViewerIndex}
        />
      )}
    </section>
  );
}
