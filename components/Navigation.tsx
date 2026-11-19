'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { sectionHref } from '@/lib/site';

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

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
      <Link href="/" className="nav-logo">
        Axiom Inc.
      </Link>
      <div className="nav-links">
        <a href={sectionHref(pathname, 'services')}>Services</a>
        <a href={sectionHref(pathname, 'projects')}>Work</a>
        <a href={sectionHref(pathname, 'about')}>About</a>
        {/* #contact exists on every route (the footer renders on the 404 page),
            so it stays a plain in-page anchor. */}
        <a href="#contact" className="nav-cta">
          Start a project →
        </a>
      </div>
      <button
        className="nav-hamburger"
        aria-label="Menu"
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} id="mobile-menu">
        <a href={sectionHref(pathname, 'services')} onClick={closeMobile}>
          Services
        </a>
        <a href={sectionHref(pathname, 'projects')} onClick={closeMobile}>
          Work
        </a>
        <a href={sectionHref(pathname, 'about')} onClick={closeMobile}>
          About
        </a>
        <a href="#contact" className="nav-cta" onClick={closeMobile}>
          Start a project →
        </a>
      </div>
    </nav>
  );
}
