import { useState } from 'react';
import PhotoViewer from './PhotoViewer';

function AlbumDetail({ album, onBack }) {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);

  return (
    <div>
      <div className="album-detail-header">
        <button className="album-back" onClick={onBack}>← Álbumes</button>
        <h3 className="album-detail-title">{album.title}</h3>
      </div>
      <div className="collage-grid">
        {album.photos.map((src, i) => (
          <div
            key={i}
            className={`collage-item ${i === 0 || i === 4 || i === 7 || i === 11 ? 'collage-wide' : ''} ${i === 2 || i === 9 ? 'collage-tall' : ''}`}
            onClick={() => { setViewerIndex(i); setViewerOpen(true); }}
          >
            <img src={src} alt={`${album.title} ${i + 1}`} loading="lazy" />
          </div>
        ))}
      </div>
      {viewerOpen && (
        <PhotoViewer
          images={album.photos}
          currentIndex={viewerIndex}
          onClose={() => setViewerOpen(false)}
          onNavigate={setViewerIndex}
        />
      )}
    </div>
  );
}

export default function Galerias({ albums = [] }) {
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  if (selectedAlbum) {
    return (
      <section id="galerias" className="section">
        <AlbumDetail album={selectedAlbum} onBack={() => setSelectedAlbum(null)} />
      </section>
    );
  }

  return (
    <section id="galerias" className="section">
      <h2 className="section-title">Galerías</h2>
      <p className="section-subtitle">Mis álbumes de fotografías</p>
      <div className="albums-grid">
        {albums.map((album) => (
          <div key={album.id} className="album-card" onClick={() => setSelectedAlbum(album)}>
            <img className="album-cover" src={album.cover} alt={album.title} loading="lazy" />
            <div className="album-info">
              <div className="album-title">{album.title}</div>
              <div className="album-count">{album.count} fotografías</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
