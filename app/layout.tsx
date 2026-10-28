import type { Metadata, Viewport } from 'next';
import './globals.css';
import { siteUrl, siteName, siteTagline } from '@/lib/site';

const description =
  'Axiom Inc. builds AI-powered digital products and premium web experiences at the intersection of engineering rigor and design elegance.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${siteName} — ${siteTagline}`,
  description,
  applicationName: siteName,
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    type: 'website',
    url: '/',
    siteName,
    title: `${siteName} — ${siteTagline}`,
    description,
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: `${siteName} — ${siteTagline}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteName} — ${siteTagline}`,
    description,
    images: ['/og.png'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2D6A4F',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Next.js emits its own charset and viewport tags; declaring them here
            as well produced duplicate, conflicting meta tags in the export. */}
        {/* Marks scripting as available before first paint, so JS-only reveal
            animations do not hide content from clients that never run JS. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=DM+Mono:wght@300;400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
