import Link from 'next/link'
import { Icon, type IconName } from './Icon'
import { profile } from '@/content/profile'

const MARKS: Record<string, IconName> = {
  GitHub: 'github',
  LinkedIn: 'linkedin',
}

/*
 * Anchors target the section headings, which already carry ids for
 * aria-labelledby. No new ids: reusing them means an anchor cannot point at a
 * section with no accessible name.
 */
const SECTIONS = [
  { label: 'Work', href: '#projects-heading' },
  { label: 'Research', href: '#credentials-heading' },
  { label: 'About', href: '#about-heading' },
  { label: 'Contact', href: '#contact-heading' },
]

export function SiteHeader() {
  return (
    /*
     * Sticky, not fixed, so the page needs no compensating top padding.
     * Translucent beige with a blur, and only a hairline beneath it: the spec
     * removes shadows and heavy borders everywhere.
     */
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-14">
        {/* Name stacked on two lines at small size, as in the reference. The
            contrast against the 116px Playfair below is deliberate. */}
        <Link
          href="/"
          className="shrink-0 text-[0.9375rem] font-semibold leading-[1.15] text-ink transition-colors hover:text-burgundy"
        >
          <span className="block">Jefferson</span>
          <span className="block">Kingston</span>
        </Link>

        <div className="flex items-center gap-5">
          {/* Kept visible rather than hidden behind the circular toggle. A
              recruiter deciding in thirty seconds should not have to open a
              menu to find anything. */}
          <nav aria-label="Sections" className="hidden items-center gap-6 lg:flex">
            {SECTIONS.map((section) => (
              <a
                key={section.href}
                href={section.href}
                className="label py-2 text-ink-muted transition-colors hover:text-burgundy"
              >
                {section.label}
              </a>
            ))}
          </nav>

          <nav aria-label="Profile links" className="flex items-center gap-1.5">
            <a
              href={`mailto:${profile.email}`}
              className="grid h-10 w-10 place-items-center rounded-full text-ink-muted transition-colors hover:text-burgundy"
            >
              <Icon name="mail" />
              <span className="sr-only">Email {profile.email}</span>
            </a>

            {profile.links.map((link) => {
              const mark = MARKS[link.label]
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-10 w-10 place-items-center rounded-full text-ink-muted transition-colors hover:text-burgundy"
                >
                  {mark ? <Icon name={mark} /> : link.label}
                  <span className="sr-only">{mark ? link.label : ''} (opens in a new tab)</span>
                </a>
              )
            })}

            {profile.resumeHref && (
              /*
               * The reference's circular button, reused as the primary action
               * rather than as a menu trigger. Burgundy because the spec
               * reserves it for interactive elements, and this is the most
               * interactive thing in the header.
               */
              <a
                href={profile.resumeHref}
                className="ml-1 grid h-11 w-11 place-items-center rounded-full bg-burgundy text-paper transition-opacity hover:opacity-85"
              >
                <Icon name="document" size={15} />
                <span className="sr-only">Resume (PDF)</span>
              </a>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
