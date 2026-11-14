/**
 * Canonical site URL, used to resolve relative metadata URLs (Open Graph
 * images, canonical links) at build time. Override per deployment with
 * NEXT_PUBLIC_SITE_URL; the default is the live production origin.
 *
 * The default deliberately does NOT point at https://juwwad.github.io/cortexure:
 * that GitHub Pages host serves the README via Jekyll and returns 404 for every
 * exported asset (see #66), so a build that defaulted to it would advertise
 * canonical/og:image/sitemap URLs that do not exist.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://axiom.juwwad.me'
).replace(/\/$/, '');

export const siteName = 'Axiom Inc.';

export const siteTagline = 'AI Engineering x Premium Web Development';
