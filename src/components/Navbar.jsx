import { useState, useEffect, useCallback } from 'react';

export default function Navbar({ hiddenSections = [] }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  const allSections = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'perfil', label: 'Perfil' },
    { id: 'galerias', label: 'Galerías' },

    { id: 'favoritos', label: 'Favoritos' },
    { id: 'libro', label: 'Libro' },
    { id: 'contacto', label: 'Contacto' },
  ];

  const sections = allSections.filter(s => !hiddenSections.includes(s.id));

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);

      const scrollY = window.scrollY + 150;
      let current = 'inicio';
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el && el.offsetTop <= scrollY) {
          current = section.id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  }, []);

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="navbar-logo">Monserrat</div>
      <ul className={`navbar-links${menuOpen ? ' open' : ''}`}>
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={activeSection === s.id ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(s.id);
              }}
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
      <button
        className={`navbar-hamburger${menuOpen ? ' open' : ''}`}
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Menú"
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
}
