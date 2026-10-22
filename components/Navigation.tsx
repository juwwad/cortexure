'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMobile = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    // Close the mobile menu when the viewport grows past the mobile breakpoint
    // (globals.css switches the nav layout at max-width: 680px).
    const mq = window.matchMedia('(min-width: 681px)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) setMenuOpen(false);
    };
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  return (
    <nav id="nav">
      <Link href="#" className="nav-logo">
        Axiom Inc.
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
