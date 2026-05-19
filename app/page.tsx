'use client';

import { useEffect, useRef, useState } from 'react';
import Cursor from '@/components/Cursor';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import About from '@/components/About';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

export default function Home() {
  useEffect(() => {
    // Scroll reveal observer
    const revealObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('in');
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal').forEach((el) => revealObs.observe(el));

    // Hero reveals immediately
    setTimeout(() => {
      document.querySelectorAll('#hero .reveal').forEach((el, i) => {
        setTimeout(() => el.classList.add('in'), i * 130);
      });
    }, 80);

    // Nav scroll effect
    const handleNavScroll = () => {
      const nav = document.getElementById('nav');
      if (nav) {
        if (window.scrollY > 40) {
          nav.style.borderBottomColor = 'rgba(0,0,0,0.1)';
        } else {
          nav.style.borderBottomColor = 'rgba(0,0,0,0.07)';
        }
      }
    };

    window.addEventListener('scroll', handleNavScroll);

    return () => {
      window.removeEventListener('scroll', handleNavScroll);
    };
  }, []);

  return (
    <>
      <div className="noise"></div>
      <Cursor />
      <Navigation />
      <Hero />
      <div className="divider"></div>
      <Services />
      <div className="divider"></div>
      <Projects />
      <div className="divider"></div>
      <About />
      <div className="divider"></div>
      <Testimonials />
      <Footer />
    </>
  );
}
