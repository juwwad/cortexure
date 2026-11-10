import type { Metadata } from 'next';
import Link from 'next/link';
import Cursor from '@/components/Cursor';
import ScrollProgress from '@/components/ScrollProgress';
import RevealInit from '@/components/RevealInit';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: '404: Page not found',
};

export default function NotFound() {
  return (
    <>
      <div className="noise"></div>
      <ScrollProgress />
      <RevealInit />
      <Cursor />
      <Navigation />
      <main id="main">
        <section className="not-found">
          <p className="section-label reveal">Error 404</p>
          <h1 className="section-title reveal delay1">This page could not be found.</h1>
          <p className="section-sub reveal delay2">
            The link may be broken or the page may have moved. Head back to the
            home page to keep exploring.
          </p>
          <div className="reveal delay3">
            <Link href="/" className="btn-primary">
              Back to home <span>↗</span>
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
