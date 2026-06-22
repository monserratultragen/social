import { useEffect, useRef } from 'react';

export default function Hero({ user }) {
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
      <div className="hero-content">
        <h1>Monserrat</h1>
        <p>{user.tagline}</p>
      </div>
      <div className="hero-scroll">Descubre</div>
    </section>
  );
}
