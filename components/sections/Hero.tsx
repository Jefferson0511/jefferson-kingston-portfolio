import Link from 'next/link'
import { DetectionFrame } from '@/components/primitives/DetectionFrame'
import { HeroVideo } from '@/components/primitives/HeroVideo'
import { MetricStrip } from '@/components/primitives/MetricStrip'
import { EvidenceChip } from '@/components/primitives/EvidenceChip'
import { Icon, type IconName } from '@/components/primitives/Icon'
import { profile } from '@/content/profile'
import { featuredProject } from '@/content/projects'
import { wildlifeNarrative } from '@/content/caseStudy'

const MARKS: Record<string, IconName> = {
  GitHub: 'github',
  LinkedIn: 'linkedin',
}

// Staggering the entrance by element reads as the page composing itself rather
// than as one block fading in. The custom property is consumed by `.enter`.
const delay = (ms: number) => ({ '--enter-delay': `${ms}ms` }) as React.CSSProperties

const demo = wildlifeNarrative.demo

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="mb-24">
      {/*
       * Asymmetric two-column, collapsing to a single column below lg. The
       * uneven split is the point: nine identically stacked full-width sections
       * were what made the page feel like a document rather than a portfolio.
       */}
      <div className="grid items-start gap-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-12">
        <div>
          <p
            className="enter font-mono text-[0.6875rem] uppercase tracking-[0.13em] text-ink-faint"
            style={delay(0)}
          >
            {profile.status}
          </p>

          <h1
            id="hero-heading"
            className="enter mt-3 text-display font-semibold leading-[1.05] tracking-[-0.022em] text-ink"
            style={delay(70)}
          >
            {profile.name}
          </h1>

          <p
            className="enter mt-4 max-w-md text-lg leading-relaxed text-ink-muted"
            style={delay(140)}
          >
            {profile.thesis}
          </p>

          <div className="enter mt-8 flex flex-wrap items-center gap-2.5" style={delay(210)}>
            {/*
             * The flagship case study leads, ahead of the resume. A technical
             * reader who is going to be convinced will be convinced by the
             * work, and this is the only link on the page that opens depth.
             */}
            <Link
              href={`/projects/${featuredProject.slug}`}
              className="flex items-center gap-2 rounded-sm bg-detect px-4 py-2.5 font-mono text-xs uppercase tracking-[0.1em] text-surface transition-opacity hover:opacity-90"
            >
              Flagship case study
              <span aria-hidden="true">&rarr;</span>
            </Link>

            {profile.resumeHref ? (
              <a
                href={profile.resumeHref}
                className="flex items-center gap-2 rounded-sm border border-line-strong px-4 py-2.5 font-mono text-xs uppercase tracking-[0.1em] text-ink transition-colors hover:border-detect hover:text-detect"
              >
                <Icon name="document" size={14} />
                Resume (PDF)
              </a>
            ) : (
              /*
               * A visible dashed amber marker, not a dead link and not a silent
               * omission. During development the gap should be impossible to
               * miss, and the launch gate requires the real PDF before launch.
               */
              <span className="rounded-sm border border-dashed border-alert px-4 py-2.5 font-mono text-xs uppercase tracking-[0.1em] text-alert">
                Resume pending
              </span>
            )}
          </div>

          {/*
           * Repeated from the sticky header on purpose. The header carries them
           * at icon size for someone who already knows what they want; this row
           * spells the address out for someone reading top to bottom, which is
           * the reason they read as buried when the only copy was 14px muted
           * text at the foot of the hero.
           */}
          <nav
            aria-label="Profile links"
            className="enter mt-6 flex flex-wrap items-center gap-x-5 gap-y-1"
            style={delay(280)}
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
         * The strongest evidence available, moving, above the fold. A still can
         * only ever show detection; persistent track identities across frames
         * are half of what this project does, and a frame throws that away.
         * Capped at 420px from a 640px source, so it is downscaled and stays
         * sharp. The case study shows the same clip at native size, where the
         * burned-in class labels are meant to be read.
         */}
        <div className="enter" style={delay(350)}>
          {demo ? (
            <HeroVideo
              src={demo.src}
              caption={demo.shortCaption}
              maxWidth={Math.min(demo.maxWidth, 420)}
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

      <div className="enter mt-12 border-t border-line pt-8" style={delay(420)}>
        <MetricStrip metrics={featuredProject.metrics} />
        <div className="mt-5 flex flex-wrap gap-1.5">
          <EvidenceChip variant="solid">IEEE Xplore &middot; 2026</EvidenceChip>
          <EvidenceChip>Indian Patent &middot; 2024</EvidenceChip>
        </div>
      </div>
    </section>
  )
}
