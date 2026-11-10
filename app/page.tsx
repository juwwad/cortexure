'use client';

import Cursor from '@/components/Cursor';
import ScrollProgress from '@/components/ScrollProgress';
import RevealInit from '@/components/RevealInit';
import Navigation from '@/components/Navigation';
import Marquee from '@/components/Marquee';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import About from '@/components/About';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <div className="noise"></div>
      <ScrollProgress />
      <RevealInit />
      <Cursor />
      <Navigation />
      <main id="main">
        <Hero />
        <Marquee />
        <div className="divider"></div>
        <Services />
        <div className="divider"></div>
        <Projects />
        <div className="divider"></div>
        <About />
        <div className="divider"></div>
        <Testimonials />
        <Footer />
      </main>
    </>
  );
}
