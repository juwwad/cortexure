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

/**
 * Date the home page content last changed, for `sitemap.xml`'s `lastmod`.
 *
 * This is deliberately a constant rather than `new Date()`: a build-time
 * timestamp makes `lastmod` equal the deploy time, so it changes on every
 * deploy even when nothing shipped. Crawlers detect that pattern and start
 * ignoring the signal entirely. Bump this by hand when page content changes.
 *
 * A source-file mtime is not a substitute — a fresh CI checkout stamps every
 * file with the checkout time, which collapses back to the deploy time.
 */
export const lastContentChange = new Date('2026-11-20T00:00:00Z');

export const siteTagline = 'AI Engineering x Premium Web Development';

/**
 * Href for an in-page section anchor. The sections only exist on the home
 * page, so on any other route (e.g. the 404 page) the link must point back at
 * `/#<id>`; a bare `#<id>` there is a dead anchor that scrolls nowhere.
 */
export const sectionHref = (pathname: string, id: string) =>
  pathname === '/' ? `#${id}` : `/#${id}`;
