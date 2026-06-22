import { useEffect, useCallback } from 'react';

export default function PhotoViewer({ images, currentIndex, onClose, onNavigate }) {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate(Math.max(0, currentIndex - 1));
      if (e.key === 'ArrowRight')
        onNavigate(Math.min(images.length - 1, currentIndex + 1));
    },
    [currentIndex, images.length, onClose, onNavigate]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  return (
    <div className="photo-viewer-overlay" onClick={onClose}>
      <div className="photo-viewer-content" onClick={(e) => e.stopPropagation()}>
        <button className="photo-viewer-close" onClick={onClose}>
          ✕
        </button>

        <div className="photo-viewer-main">
          {currentIndex > 0 && (
            <button
              className="photo-viewer-prev"
              onClick={() => onNavigate(currentIndex - 1)}
            >
              ‹
            </button>
          )}

          <img src={images[currentIndex]} alt="" />

          {currentIndex < images.length - 1 && (
            <button
              className="photo-viewer-next"
              onClick={() => onNavigate(currentIndex + 1)}
            >
              ›
            </button>
          )}

          <div className="photo-viewer-counter">
            {currentIndex + 1} / {images.length}
          </div>
        </div>

        {images.length > 1 && (
          <div className="photo-viewer-thumbs">
            {images.map((src, i) => (
              <div
                key={i}
                className={`photo-viewer-thumb ${i === currentIndex ? 'active' : ''}`}
                onClick={() => onNavigate(i)}
              >
                <img src={src} alt="" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
