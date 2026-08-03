import { SectionHeader } from '@/components/primitives/SectionHeader'
import { profile } from '@/content/profile'

export function Contact() {
  // inline-block + py-1 keeps every target at least 24px tall for WCAG 2.2
  // SC 2.5.8. These are standalone list links, so the in-sentence exception
  // does not apply to them.
  const linkClass = 'inline-block py-1 text-base text-ink transition-colors hover:text-detect'

  return (
    <section aria-labelledby="contact-heading" className="mb-12">
      <SectionHeader index="09" label="Contact" title="Get in touch" id="contact-heading" />

      <ul className="space-y-2">
        <li>
          <a href={`mailto:${profile.email}`} className={linkClass}>
            {profile.email}
          </a>
        </li>
        {profile.links.map((link) => (
          <li key={link.href}>
            <a href={link.href} className={linkClass}>
              {link.label}
            </a>
          </li>
        ))}
        {profile.resumeHref && (
          <li>
            <a href={profile.resumeHref} className={linkClass}>
              Resume (PDF)
            </a>
          </li>
        )}
      </ul>
    </section>
  )
}
