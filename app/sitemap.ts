import type { MetadataRoute } from 'next'
import { site } from '@/content/site'
import { featuredProject } from '@/content/projects'

export default function sitemap(): MetadataRoute.Sitemap {
  // An empty sitemap while the gate is closed. Advertising URLs that robots.txt
  // disallows would be a contradiction, and there is nothing to submit yet.
  if (!site.launchReady) return []

  /*
   * The case study lives at a hardcoded route directory, so this derives its URL
   * from the same slug the page renders. If the slug in content/projects.ts ever
   * changes without app/projects/<slug>/ being renamed to match, the sitemap
   * will point at a 404 — the link checker covers that.
   */
  return [
    { url: site.url, changeFrequency: 'monthly', priority: 1 },
    {
      url: `${site.url}/projects/${featuredProject.slug}`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}
