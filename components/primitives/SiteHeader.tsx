import Link from 'next/link'
import { Icon, type IconName } from './Icon'
import { profile } from '@/content/profile'

// Maps a profile link label to its mark. Anything unrecognised falls through to
// a text-only link rather than guessing at an icon.
const MARKS: Record<string, IconName> = {
  GitHub: 'github',
  LinkedIn: 'linkedin',
}

/*
 * In-page anchors target the section headings, which already carry ids for
 * `aria-labelledby`. No new ids were added: reusing them means an anchor cannot
 * point at a section that has no accessible name.
 */
const SECTIONS = [
  { label: 'Work', href: '#projects-heading' },
  { label: 'Research', href: '#credentials-heading' },
  { label: 'About', href: '#about-heading' },
  { label: 'Contact', href: '#contact-heading' },
]

const target = 'grid h-10 w-10 place-items-center rounded-sm transition-colors'

export function SiteHeader() {
  return (
    /*
     * Sticky, not fixed. Sticky stays in the document flow, so the page needs no
     * compensating top padding and nothing slides under the first heading.
     *
     * This exists because contact details were previously reachable only by
     * scrolling. A recruiter deciding in thirty seconds should never have to
     * hunt for the resume or an email address.
     */
    <header className="sticky top-0 z-40 border-b border-line bg-surface/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="display flex min-w-0 items-center gap-2.5 text-xl leading-none text-ink transition-colors hover:text-detect"
        >
          {/* Decorative only. Colour never carries meaning on its own here: the
              name sits beside it and says who this is. */}
          <span aria-hidden="true" className="pulse h-1.5 w-1.5 shrink-0 rounded-full bg-detect" />
          <span className="truncate">Jefferson Kingston</span>
        </Link>

        <div className="flex shrink-0 items-center gap-1">
          {/* Section links are hidden below lg, where four of them plus four
              icon targets and a pill will not fit. The content is still
              reachable by scrolling, so nothing is lost. */}
          <nav aria-label="Sections" className="mr-3 hidden items-center gap-6 lg:flex">
            {SECTIONS.map((section) => (
              <a
                key={section.href}
                href={section.href}
                className="py-2 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-muted transition-colors hover:text-detect"
              >
                {section.label}
              </a>
            ))}
          </nav>

          <nav aria-label="Profile links" className="flex items-center gap-1">
            <a
              href={`mailto:${profile.email}`}
              className={`${target} text-ink-muted hover:text-detect`}
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
                  className={
                    mark
                      ? `${target} text-ink-muted hover:text-detect`
                      : 'rounded-sm px-2 py-2 text-sm text-ink-muted transition-colors hover:text-detect'
                  }
                >
                  {mark ? <Icon name={mark} /> : link.label}
                  <span className="sr-only">{mark ? link.label : ''} (opens in a new tab)</span>
                </a>
              )
            })}

            {profile.resumeHref && (
              <a
                href={profile.resumeHref}
                className="display ml-1.5 flex items-center gap-2 rounded-sm bg-detect px-4 py-2.5 text-sm leading-none tracking-[0.06em] text-surface transition-opacity hover:opacity-90"
              >
                <Icon name="document" size={14} />
                {/* Hidden on narrow screens where the targets will not fit; the
                    icon plus screen-reader text still identifies it. */}
                <span className="hidden sm:inline">Resume</span>
                <span className="sr-only sm:hidden">Resume (PDF)</span>
              </a>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
