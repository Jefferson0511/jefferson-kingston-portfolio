import { SectionHeader } from '@/components/primitives/SectionHeader'
import { profile } from '@/content/profile'

export function Contact() {
  return (
    <section aria-labelledby="contact-heading" className="mb-12">
      <SectionHeader index="09" label="Contact" title="Get in touch" id="contact-heading" />

      <ul className="space-y-3">
        <li>
          <a
            href={`mailto:${profile.email}`}
            className="text-base text-ink transition-colors hover:text-detect"
          >
            {profile.email}
          </a>
        </li>
        {profile.links.map((link) => (
          <li key={link.href}>
            <a href={link.href} className="text-base text-ink transition-colors hover:text-detect">
              {link.label}
            </a>
          </li>
        ))}
        {profile.resumeHref && (
          <li>
            <a
              href={profile.resumeHref}
              className="text-base text-ink transition-colors hover:text-detect"
            >
              Resume (PDF)
            </a>
          </li>
        )}
      </ul>
    </section>
  )
}
