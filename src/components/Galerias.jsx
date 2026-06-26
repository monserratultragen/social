import { useState, useMemo } from 'react';
import PhotoViewer from './PhotoViewer';

function layoutRows(photos) {
  const rows = [];
  let i = 0;
  while (i < photos.length) {
    if (photos[i].orientacion === 'horizontal') {
      const next = i + 1 < photos.length ? photos[i + 1] : null;
      if (next) {
        rows.push([
          { ...photos[i], flex: 2, _idx: i },
          { ...next, flex: 1, _idx: i + 1 },
        ]);
        i += 2;
      } else {
        rows.push([{ ...photos[i], flex: 1, _idx: i }]);
        i += 1;
      }
    } else {
      const group = [{ ...photos[i], flex: 1, _idx: i }];
      i += 1;
      while (i < photos.length) {
        if (group.length >= 3) break;
        const n = photos[i];
        if (n.orientacion === 'horizontal' && group.length < 2) {
          const remaining = 3 - group.length;
          group.push({ ...n, flex: remaining, _idx: i });
          i += 1;
          break;
        }
        group.push({ ...n, flex: 1, _idx: i });
        i += 1;
      }
      rows.push(group);
    }
  }
  return rows;
}

export default function Galerias({ albums = [] }) {
  const [viewerIndex, setViewerIndex] = useState(null);

  const photos = useMemo(() => {
    return (albums || [])
      .filter(a => a.cover)
      .map(a => ({
        ...a,
        src: a.cover,
        orientacion: a.cover_orientation || 'horizontal',
      }));
  }, [albums]);

  const rows = useMemo(() => layoutRows(photos), [photos]);

  if (photos.length === 0) return null;

  return (
    <section id="galerias" className="section">
      <h2 className="section-title">Galerías</h2>
      <p className="section-subtitle">Mis álbumes de fotografías</p>
      <div className="smart-grid">
        {rows.map((row, ri) => (
          <div key={ri} className="smart-grid-row">
            {row.map((photo, ci) => (
              <div
                key={ci}
                className={`smart-grid-item flex-${photo.flex}${photo.orientacion === 'vertical' ? ' is-vertical' : ''}`}
                onClick={() => setViewerIndex(photo._idx)}
              >
                {photo.orientacion === 'vertical' ? (
                  <>
                    <div className="vertical-blur-bg" style={{ backgroundImage: `url(${photo.src})` }} />
                    <img className="vertical-fg-img" src={photo.src} alt={photo.title || ''} loading="lazy" />
                  </>
                ) : (
                  <img src={photo.src} alt={photo.title || ''} loading="lazy" />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      {viewerIndex !== null && (
        <PhotoViewer
          images={photos.map(p => p.src)}
          captions={photos.map(p => p.comentario || '')}
          currentIndex={viewerIndex}
          onClose={() => setViewerIndex(null)}
          onNavigate={setViewerIndex}
        />
      )}
    </section>
  );
}
