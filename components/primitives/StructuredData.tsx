import { profile } from '@/content/profile'
import { site } from '@/content/site'
import { skillGroups } from '@/content/skills'
import { credentials } from '@/content/credentials'
import { featuredProject } from '@/content/projects'

/*
 * JSON-LD, emitted regardless of the launch gate.
 *
 * Crawlers will not read it while noindex holds, which is the point of leaving
 * it on: markup that only appears the moment the site goes live is markup that
 * has never once been validated. It is inert either way, so there is no cost to
 * having it in place and tested early.
 *
 * Everything below is derived from content/, so no claim can appear here that
 * the page itself does not already make. The `identifier` on the publication is
 * null and is therefore absent rather than guessed — the same rule the visible
 * page follows.
 */

// dangerouslySetInnerHTML is the documented way to emit JSON-LD in React, and
// the payload is built from typed local content rather than any user input.
function Script({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function PersonSchema() {
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    url: site.url,
    email: `mailto:${profile.email}`,
    description: profile.thesis,
    sameAs: profile.links.map((link) => link.href),
    alumniOf: profile.education.map((role) => ({
      '@type': 'CollegeOrUniversity',
      name: role.org,
    })),
    // Flattened from the visible skill groups, deduplicated because Python
    // deliberately appears under both ML/CV and Languages on the page.
    knowsAbout: [...new Set(skillGroups.flatMap((group) => group.skills))],
  }

  return <Script data={person} />
}

export function PublicationSchema() {
  const publication = credentials.find((c) => c.kind === 'publication')
  if (!publication) return null

  const article = {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    headline: publication.title,
    name: publication.title,
    author: { '@type': 'Person', name: profile.name, url: site.url },
    datePublished: publication.isoDate,
    publisher: { '@type': 'Organization', name: 'IEEE' },
    isPartOf: { '@type': 'PublicationEvent', name: publication.venue },
    about: featuredProject.summary,
    url: `${site.url}/projects/${featuredProject.slug}`,
  }

  return <Script data={article} />
}
