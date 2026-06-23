import { useEffect, useRef } from 'react';

export default function Hero({ user, hackActive, hackConfig }) {
  const imgRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (imgRef.current) {
        const scrollY = window.scrollY;
        const translateY = scrollY * 0.35;
        imgRef.current.style.transform = `translate3d(0, ${translateY}px, 0)`;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const hh = hackActive && hackConfig?.config?.hero_hack || {};

  return (
    <section id="inicio" className="hero">
      <img
        ref={imgRef}
        className="hero-image"
        src={user.hero}
        alt="Monserrat"
        loading="eager"
      />
      <div className="hero-overlay" />
      {hackActive && <div className="hero-hack-overlay" />}
      <div className="hero-content">
        <h1>{hh.title || 'Monserrat'}</h1>
        <p className="hero-subtitle">{hh.subtitle || 'mi sitio social'}</p>
      </div>
      <div className="hero-scroll">Explora ahora</div>
    </section>
  );
}
