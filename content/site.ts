/**
 * Site-level configuration. Distinct from `profile`, which describes Jefferson;
 * this describes the deployment.
 */
export const site = {
  /** Canonical origin, no trailing slash. Used for metadataBase, robots and sitemap. */
  url: 'https://jefferson-kingston-portfolio.vercel.app',

  /**
   * The single switch controlling whether search engines may index this site.
   *
   * It exists because the two halves of "do not index me" live in different
   * files — the `robots` metadata in app/layout.tsx and the robots.txt route —
   * and flipping one without the other is a silent half-launch. Both now read
   * this constant, so there is exactly one thing to change and no way to change
   * only part of it.
   *
   * Indexing is close to irreversible on the timescale that matters here: once
   * Google has cached a page it may serve that snapshot for weeks, and a
   * portfolio with four empty sections is worse than no portfolio at all. So
   * this stays false until every item below is genuinely done, not merely
   * started.
   *
   * Before flipping it to true:
   *
   *   [ ] profile.bio written
   *   [ ] profile.availability written — which roles, which term
   *   [ ] wildlifeNarrative.problem written
   *   [ ] wildlifeNarrative.approach written
   *   [ ] every project either repoVerified: true with a working link, or
   *       removed; the interim caveat line in Projects.tsx deleted
   *   [ ] the resume PDF confirmed to be the ML/CV version, not the
   *       on-campus one
   *   [ ] the resume and the site agree on skills and projects
   *   [ ] the link checker passes with no failures
   *   [ ] the page checked in a real browser at mobile and desktop widths
   */
  launchReady: false,
} as const
