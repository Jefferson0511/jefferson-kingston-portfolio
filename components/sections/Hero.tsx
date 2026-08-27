import Link from 'next/link'
import { DetectionFrame } from '@/components/primitives/DetectionFrame'
import { DetectionClip } from '@/components/primitives/DetectionClip'
import { Icon, type IconName } from '@/components/primitives/Icon'
import { profile } from '@/content/profile'
import { featuredProject } from '@/content/projects'
import { credentials } from '@/content/credentials'
import { wildlifeNarrative } from '@/content/caseStudy'

const MARKS: Record<string, IconName> = {
  GitHub: 'github',
  LinkedIn: 'linkedin',
}

// Staggering the entrance by element reads as the page composing itself rather
// than as one block fading in. The custom property is consumed by `.enter`.
const delay = (ms: number) => ({ '--enter-delay': `${ms}ms` }) as React.CSSProperties

const demo = wildlifeNarrative.demo

/*
 * Derived rather than hardcoded, so a change to profile.name carries through.
 * The middle name is deliberately dropped from the display: "David Kingston" on
 * the second line runs past the width of the copy column at this type size, and
 * the full legal name is still carried by the page title, the JSON-LD and the
 * footer.
 */
const words = profile.name.split(' ')
const firstName = words[0] ?? profile.name
const lastName = words[words.length - 1] ?? ''

/*
 * Three figures, all traceable. The first two come straight from the flagship's
 * metrics, which carry a required `source`. The third counts the credentials
 * array rather than asserting a number, so it cannot drift out of step with the
 * publications section below it.
 */
const TONES = ['text-detect', 'text-alert']

const stats = [
  // Mapped rather than indexed: metrics[0] is Metric | undefined under
  // noUncheckedIndexedAccess, and spreading that yields optional fields.
  ...featuredProject.metrics.map((metric, i) => ({
    value: metric.value,
    label: metric.label,
    source: metric.source,
    tone: TONES[i] ?? 'text-ink',
  })),
  {
    value: String(credentials.length),
    label: 'Publication & patent',
    // Counted, not asserted, so it cannot drift from the credentials section.
    source: credentials.map((c) => c.venue.split(/[:,]/)[0] ?? c.venue).join(', '),
    tone: 'text-cat-backend',
  },
]

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="mb-28">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-14">
        <div>
          <p
            className="enter flex items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-detect"
            style={delay(0)}
          >
            <span aria-hidden="true" className="h-px w-10 bg-detect" />
            {profile.status}
          </p>

          {/*
           * The one change that mattered most. This was capped at 52px, which is
           * why the page read as timid next to bolder portfolios. It is now up
           * to 132px, with the surname carrying the accent whole: colouring only
           * part of it split the word mid-syllable and read as a typo.
           */}
          <h1
            id="hero-heading"
            className="enter display mt-5 text-display text-ink"
            style={delay(80)}
          >
            <span className="block">{firstName}</span>
            <span className="block text-detect">{lastName}</span>
          </h1>

          <p
            className="enter mt-6 max-w-xl text-lg leading-relaxed text-ink-muted sm:text-xl"
            style={delay(160)}
          >
            {profile.thesis}
          </p>

          <div className="enter mt-8 flex flex-wrap items-stretch gap-2.5" style={delay(240)}>
            {/*
             * The flagship leads, ahead of the resume. A technical reader who is
             * going to be convinced will be convinced by the work, and this is
             * the only link on the page that opens depth.
             */}
            {/* leading-none overrides .display's 0.85 line-height, which is set
                for stacked headlines and clips descenders on a single line. */}
            <Link
              href={`/projects/${featuredProject.slug}`}
              className="display flex items-center gap-2.5 rounded-sm bg-detect px-7 py-4 text-lg leading-none tracking-[0.06em] text-surface transition-opacity hover:opacity-90"
            >
              Flagship case study
              <span aria-hidden="true">&rarr;</span>
            </Link>

            {profile.resumeHref ? (
              <a
                href={profile.resumeHref}
                className="display flex items-center gap-2.5 rounded-sm border border-line-strong px-6 py-4 text-lg leading-none tracking-[0.06em] text-ink transition-colors hover:border-detect hover:text-detect"
              >
                <Icon name="document" size={16} />
                Resume
              </a>
            ) : (
              /* A visible dashed amber marker, never a dead link and never a
                 silent omission. */
              <span className="display flex items-center rounded-sm border border-dashed border-alert px-6 py-4 text-lg leading-none tracking-[0.06em] text-alert">
                Resume pending
              </span>
            )}
          </div>

          {/*
           * Repeated from the sticky header on purpose. The header carries these
           * at icon size for someone who already knows what they want; this row
           * spells the address out for someone reading top to bottom.
           */}
          <nav
            aria-label="Profile links"
            className="enter mt-7 flex flex-wrap items-center gap-x-6 gap-y-1"
            style={delay(320)}
          >
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 py-1 text-sm text-ink-muted transition-colors hover:text-detect"
            >
              <Icon name="mail" size={14} />
              {profile.email}
            </a>
            {profile.links.map((link) => {
              const mark = MARKS[link.label]
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 py-1 text-sm text-ink-muted transition-colors hover:text-detect"
                >
                  {mark && <Icon name={mark} size={14} />}
                  {link.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )
            })}
          </nav>
        </div>

        {/*
         * The strongest evidence available, moving, above the fold. This is also
         * what fills the right column that a headshot would otherwise occupy,
         * and for an ML portfolio it argues the case better than a face would.
         */}
        <div className="enter" style={delay(400)}>
          {demo ? (
            <DetectionClip
              mode="ambient"
              src={demo.src}
              caption={demo.shortCaption}
              maxWidth={Math.min(demo.maxWidth, 420)}
              aspect={demo.aspect}
            />
          ) : (
            <DetectionFrame
              image={featuredProject.image}
              priority
              pendingLabel="Wildlife detection frame pending"
            />
          )}
        </div>
      </div>

      {/* Figures as a hero element, each in its own panel. */}
      <dl className="enter mt-14 grid gap-4 sm:grid-cols-3" style={delay(480)}>
        {stats.map((stat) => (
          <div
            key={stat.label}
            // flex-col is required, not cosmetic: the `order` utilities below
            // have no effect without a flex container.
            className="flex flex-col rounded-sm border border-line bg-surface-raised p-5 transition-colors hover:border-line-strong"
          >
            {/* DOM order stays dt then dd, which is what <dl> requires and what
                reads correctly aloud. `order` lifts the figure above the label. */}
            <dt className="order-2 mt-2 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink">
              {stat.label}
            </dt>
            {/* leading-none because Tailwind's text-4xl carries its own
                line-height, which overrides .display's tighter 0.85. */}
            <dd className={`display order-1 text-4xl leading-none sm:text-5xl ${stat.tone}`}>
              {stat.value}
            </dd>
            <dd className="order-3 mt-1 text-[0.6875rem] leading-snug text-ink-faint">
              {stat.source}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
