'use client';

import { useEffect } from 'react';

// Mounts the scroll-reveal behaviour for a page: elements carrying `.reveal`
// and `.divider` gain the `in` class as they enter the viewport, and the nav
// border deepens once the page has scrolled. Kept in its own client component
// so both the home page and the 404 shell share one implementation.
export default function RevealInit() {
  useEffect(() => {
    const revealObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('in');
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal, .divider').forEach((el) => revealObs.observe(el));

    // Elements inside the hero are already on screen at load, so stagger them in
    // rather than waiting on the observer.
    const heroRevealTimer = setTimeout(() => {
      document.querySelectorAll('#hero .reveal').forEach((el, i) => {
        setTimeout(() => el.classList.add('in'), i * 130);
      });
    }, 80);

    const handleNavScroll = () => {
      const nav = document.getElementById('nav');
      if (!nav) return;
      nav.style.borderBottomColor =
        window.scrollY > 40 ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.07)';
    };

    handleNavScroll();
    window.addEventListener('scroll', handleNavScroll);

    return () => {
      revealObs.disconnect();
      clearTimeout(heroRevealTimer);
      window.removeEventListener('scroll', handleNavScroll);
    };
  }, []);

  return null;
}
