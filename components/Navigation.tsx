'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMobile = () => {
    setMenuOpen(false);
  };

  return (
    <nav id="nav">
      <Link href="#" className="nav-logo">
        Cortexture
      </Link>
      <div className="nav-links">
        <a href="#services">Services</a>
        <a href="#projects">Work</a>
        <a href="#about">About</a>
        <a href="#contact" className="nav-cta">
          Start a project →
        </a>
      </div>
      <button
        className="nav-hamburger"
        id="hamburger"
        aria-label="Menu"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} id="mobile-menu">
        <a href="#services" onClick={closeMobile}>
          Services
        </a>
        <a href="#projects" onClick={closeMobile}>
          Work
        </a>
        <a href="#about" onClick={closeMobile}>
          About
        </a>
        <a href="#contact" className="nav-cta" onClick={closeMobile}>
          Start a project →
        </a>
      </div>
    </nav>
  );
}
