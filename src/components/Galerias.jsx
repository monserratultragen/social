import { useState, useMemo } from 'react';
import PhotoViewer from './PhotoViewer';

function isWide(photo) {
  return photo.orientacion === 'horizontal';
}

function layoutRows(photos) {
  const rows = [];
  const used = new Set();
  for (let i = 0; i < photos.length; i++) {
    if (used.has(i)) continue;
    const photo = photos[i];
    if (isWide(photo)) {
      let pairIdx = -1;
      for (let j = i + 1; j < photos.length; j++) {
        if (used.has(j)) continue;
        if (!isWide(photos[j])) {
          pairIdx = j;
          break;
        }
      }
      if (pairIdx >= 0) {
        rows.push([
          { ...photo, flex: 2, _idx: i },
          { ...photos[pairIdx], flex: 1, _idx: pairIdx },
        ]);
        used.add(i);
        used.add(pairIdx);
      } else {
        rows.push([{ ...photo, flex: 2, _idx: i }]);
        used.add(i);
      }
    } else {
      const group = [{ ...photo, flex: 1, _idx: i }];
      used.add(i);
      for (let j = i + 1; j < photos.length && group.length < 3; j++) {
        if (used.has(j)) continue;
        if (isWide(photos[j])) continue;
        group.push({ ...photos[j], flex: 1, _idx: j });
        used.add(j);
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
      }))
      .reverse();
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
                className={`smart-grid-item flex-${photo.flex}${!isWide(photo) ? ' is-vertical' : ''}`}
                onClick={() => setViewerIndex(photo._idx)}
              >
                {!isWide(photo) ? (
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
