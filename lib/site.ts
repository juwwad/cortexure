/**
 * Canonical site URL, used to resolve relative metadata URLs (Open Graph
 * images, canonical links) at build time. Override per deployment with
 * NEXT_PUBLIC_SITE_URL; the default matches the current GitHub Pages host.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://juwwad.github.io/cortexure'
).replace(/\/$/, '');

export const siteName = 'Axiom Inc.';

export const siteTagline = 'AI Engineering x Premium Web Development';

/**
 * Href for an in-page section anchor. The sections only exist on the home
 * page, so on any other route (e.g. the 404 page) the link must point back at
 * `/#<id>`; a bare `#<id>` there is a dead anchor that scrolls nowhere.
 */
export const sectionHref = (pathname: string, id: string) =>
  pathname === '/' ? `#${id}` : `/#${id}`;
