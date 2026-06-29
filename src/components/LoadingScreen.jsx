import { useState, useEffect } from 'react';

const loadingPhrases = [
  'Iniciando conexión segura...',
  'Despertando los servidores de Ultragen...',
  'Sincronizando recuerdos...',
  'Cargando galerías...',
  'Preparando interfaz...',
  'Ya casi estamos...',
  'Esto toma un poco más de lo habitual...',
  'Solo un momento más...'
];

export default function LoadingScreen({ loaded }) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [render, setRender] = useState(true);

  useEffect(() => {
    let interval;
    if (!loaded) {
      interval = setInterval(() => {
        setPhraseIndex((prev) => (prev + 1) % loadingPhrases.length);
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [loaded]);

  useEffect(() => {
    if (loaded) {
      setVisible(false);
      const timeout = setTimeout(() => setRender(false), 800); // Wait for fade out animation
      return () => clearTimeout(timeout);
    }
  }, [loaded]);

  if (!render) return null;

  return (
    <div className={`loading-screen ${!visible ? 'fade-out' : ''}`}>
      <div className="loading-content">
        <div className="loading-logo">M</div>
        <div className="loading-bar-container">
          <div className="loading-bar-progress"></div>
        </div>
        <p className="loading-text">{loadingPhrases[phraseIndex]}</p>
      </div>
    </div>
  );
}
