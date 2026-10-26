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
