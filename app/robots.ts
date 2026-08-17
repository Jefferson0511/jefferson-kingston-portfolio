import type { MetadataRoute } from 'next'
import { site } from '@/content/site'

export default function robots(): MetadataRoute.Robots {
  /*
   * Belt and braces with the `robots` metadata in layout.tsx, deliberately.
   *
   * The meta tag only works once a crawler has already fetched the page, and
   * a disallowed URL can still surface in results from external links alone.
   * Neither mechanism covers the other's gap, so both are driven from the same
   * flag rather than one being trusted.
   */
  if (!site.launchReady) {
    return { rules: [{ userAgent: '*', disallow: '/' }] }
  }

  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${site.url}/sitemap.xml`,
  }
}
