import { SectionHeader } from '@/components/primitives/SectionHeader'
import { Icon, type IconName } from '@/components/primitives/Icon'
import { profile } from '@/content/profile'

const MARKS: Record<string, IconName> = {
  GitHub: 'github',
  LinkedIn: 'linkedin',
}

// Every tile is well past the 24x24 WCAG 2.2 SC 2.5.8 floor, which the previous
// bulleted list of 20px text links was not.
const tile =
  'flex items-center gap-3  border border-edge px-4 py-3 text-sm text-ink transition-colors hover:border-burgundy hover:text-burgundy'

export function Contact() {
  return (
    <section aria-labelledby="contact-heading" className="mb-12">
      <SectionHeader index="09" label="Contact" title="Get in touch" id="contact-heading" />

      <div className="border border-rule p-5 sm:p-6">
        {profile.availability ? (
          <p className="max-w-xl leading-relaxed text-ink-muted">{profile.availability}</p>
        ) : (
          /* Same amber pending convention as the bio: an unfilled gap should be
             loud during development, never quietly absent at launch. */
          <p className="max-w-xl border border-dashed border-burgundy p-3 font-mono text-xs uppercase tracking-[0.1em] text-burgundy">
            Pending &mdash; which roles and which term, in Jefferson&rsquo;s words
          </p>
        )}

        {/* Email is the primary action and gets the filled treatment; the rest
            are equal-weight outlines. */}
        <a
          href={`mailto:${profile.email}`}
          className="mt-5 flex w-full items-center justify-between gap-3 bg-burgundy px-4 py-3.5 text-paper transition-opacity hover:opacity-90 sm:w-auto"
        >
          <span className="flex min-w-0 items-center gap-3">
            <Icon name="mail" size={17} />
            <span className="truncate text-sm font-semibold">{profile.email}</span>
          </span>
          <span aria-hidden="true" className="font-mono text-xs">
            &rarr;
          </span>
        </a>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {profile.links.map((link) => {
            const mark = MARKS[link.label]
            return (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={tile}
              >
                {mark && <Icon name={mark} size={17} />}
                {link.label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            )
          })}

          {profile.resumeHref && (
            <a href={profile.resumeHref} className={tile}>
              <Icon name="document" size={17} />
              Resume (PDF)
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
