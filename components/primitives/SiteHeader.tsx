import Link from 'next/link'
import { Icon, type IconName } from './Icon'
import { profile } from '@/content/profile'

// Maps a profile link label to its mark. Anything unrecognised falls through to
// a text-only link rather than guessing at an icon.
const MARKS: Record<string, IconName> = {
  GitHub: 'github',
  LinkedIn: 'linkedin',
}

const target = 'grid h-10 w-10 place-items-center rounded-sm transition-colors'

export function SiteHeader() {
  return (
    /*
     * Sticky, not fixed. Sticky stays in the document flow, so the page needs no
     * compensating top padding and nothing can slide underneath the first
     * heading at an awkward scroll position.
     *
     * This exists because contact details were previously reachable only by
     * scrolling — either to the end of the hero or to the last section. A
     * recruiter deciding in thirty seconds should never have to hunt for the
     * resume or an email address, so both are on screen the whole time.
     */
    <header className="sticky top-0 z-40 border-b border-line bg-surface/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-5 py-2.5 sm:px-8">
        {/* Home rather than #content, so this doubles as the way back from the
            case study route and the "Back" link there is not the only exit. */}
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2.5 rounded-sm py-1 text-sm font-semibold text-ink transition-colors hover:text-detect"
        >
          {/* Decorative only. Colour never carries meaning on its own here — the
              name sits beside it and says who this is. */}
          <span aria-hidden="true" className="pulse h-1.5 w-1.5 shrink-0 rounded-full bg-detect" />
          <span className="truncate">Jefferson Kingston</span>
        </Link>

        <nav aria-label="Primary" className="flex shrink-0 items-center gap-1">
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
                <span className="sr-only">
                  {mark ? link.label : ''} (opens in a new tab)
                </span>
              </a>
            )
          })}

          {profile.resumeHref && (
            <a
              href={profile.resumeHref}
              className="ml-1 flex items-center gap-2 rounded-sm bg-detect px-3 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-surface transition-opacity hover:opacity-90"
            >
              <Icon name="document" size={14} />
              {/* The word is hidden on narrow screens where four targets plus a
                  name will not fit; the icon plus screen-reader text still
                  identifies it. */}
              <span className="hidden sm:inline">Resume</span>
              <span className="sr-only sm:hidden">Resume (PDF)</span>
            </a>
          )}
        </nav>
      </div>
    </header>
  )
}
