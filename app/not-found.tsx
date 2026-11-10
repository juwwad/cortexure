import type { Metadata } from 'next';
import Link from 'next/link';
import Cursor from '@/components/Cursor';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: '404: Page not found',
};

export default function NotFound() {
  return (
    <>
      <div className="noise"></div>
      <Cursor />
      <Navigation />
      <main id="main">
        <section className="not-found">
          <p className="section-label">Error 404</p>
          <h1 className="section-title">This page could not be found.</h1>
          <p className="section-sub">
            The link may be broken or the page may have moved. Head back to the
            home page to keep exploring.
          </p>
          <Link href="/" className="btn-primary">
            Back to home <span>↗</span>
          </Link>
        </section>
        <Footer />
      </main>
    </>
  );
}
