import Link from 'next/link'
import { DetectionFrame } from '@/components/primitives/DetectionFrame'
import { DetectionClip } from '@/components/primitives/DetectionClip'
import { HairRule } from '@/components/primitives/HairRule'
import { Pill } from '@/components/primitives/Pill'
import { Icon, type IconName } from '@/components/primitives/Icon'
import { profile } from '@/content/profile'
import { featuredProject } from '@/content/projects'
import { wildlifeNarrative } from '@/content/caseStudy'

const MARKS: Record<string, IconName> = {
  GitHub: 'github',
  LinkedIn: 'linkedin',
}

const delay = (ms: number) => ({ '--enter-delay': `${ms}ms` }) as React.CSSProperties

const demo = wildlifeNarrative.demo

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="mb-24">
      {/*
       * Title framed above and below by hairlines, which is the reference's
       * structural device and the thing that makes the beige feel composed
       * rather than empty.
       */}
      <HairRule className="enter" />

      <h1
        id="hero-heading"
        className="enter display py-7 text-display text-ink"
        style={delay(60)}
      >
        {profile.name.split(' ')[0]} {profile.name.split(' ').slice(-1)}
      </h1>

      <HairRule className="enter" />

      {/* Split columns: small technical detail left, narrative right. */}
      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] lg:gap-14">
        <div className="enter" style={delay(140)}>
          <p className="label font-semibold text-ink">ML / Computer vision</p>
          <p className="mt-1.5 text-sm text-ink-faint">selected work &mdash;</p>

          <div className="mt-5 flex flex-wrap gap-1.5">
            <Pill>Computer vision</Pill>
            <Pill>Sensor fusion</Pill>
            <Pill>Backend</Pill>
          </div>

          {/*
           * Figures set as an editorial table rather than a row of bordered
           * stat panels. That row was lifted from the benchmark site; Playfair
           * numerals stacked in the margin belong to this design instead, and
           * they fill a column that was otherwise dead space.
           */}
          <div className="mt-9 border-t border-rule pt-7">
            <dl>
              {featuredProject.metrics.map((metric) => (
                /* DOM order is dt then dd, which <dl> requires and which reads
                   correctly aloud as label then value. The `order` utilities
                   lift the figure above the label visually without breaking
                   either guarantee, and need the flex parent to work. */
                <div key={metric.label} className="mb-7 flex flex-col last:mb-0">
                  <dt className="label order-2 mt-2 font-semibold text-ink">{metric.label}</dt>
                  <dd className="display order-1 text-[2.75rem] text-burgundy">{metric.value}</dd>
                  <dd className="order-3 mt-0.5 text-[0.8125rem] leading-snug text-ink-faint">
                    {metric.source}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div>
          <p
            className="enter max-w-2xl text-2xl leading-[1.4] text-ink sm:text-[1.75rem]"
            style={delay(200)}
          >
            {profile.thesis.replace(/\.$/, '')} &mdash;
          </p>

          {/* Small mono block against the large serif above it. The extreme
              contrast between the two registers is the design. */}
          <p
            className="enter mt-6 max-w-xl font-mono text-[0.6875rem] uppercase leading-[1.8] tracking-[0.08em] text-ink-muted"
            style={delay(260)}
          >
            MS Computer Science at Northeastern. IEEE-published wildlife intrusion detection.
            {profile.availability ? ` ${profile.availability}` : ''}
          </p>

          <div className="enter mt-8 flex flex-wrap items-center gap-2.5" style={delay(320)}>
            <Link
              href={`/projects/${featuredProject.slug}`}
              className="label rounded-full bg-burgundy px-7 py-3.5 text-paper transition-opacity hover:opacity-85"
            >
              Flagship case study
            </Link>

            {profile.resumeHref ? (
              <a
                href={profile.resumeHref}
                className="label inline-flex items-center gap-2 rounded-full border border-edge px-6 py-3.5 text-ink transition-colors hover:border-burgundy hover:bg-burgundy hover:text-paper"
              >
                <Icon name="document" size={13} />
                Resume
              </a>
            ) : (
              <span className="label rounded-full border border-dashed border-burgundy px-6 py-3.5 text-burgundy">
                Resume pending
              </span>
            )}
          </div>

          <nav
            aria-label="Profile links"
            className="enter mt-6 flex flex-wrap items-center gap-x-6 gap-y-1"
            style={delay(380)}
          >
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 py-1 text-sm text-ink-muted transition-colors hover:text-burgundy"
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
                  className="inline-flex items-center gap-2 py-1 text-sm text-ink-muted transition-colors hover:text-burgundy"
                >
                  {mark && <Icon name={mark} size={14} />}
                  {link.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )
            })}
          </nav>

          {/* The figure, captioned as a plate. */}
          <figure className="enter mt-10" style={delay(440)}>
            {demo ? (
              <DetectionClip
                mode="ambient"
                src={demo.src}
                caption={demo.shortCaption}
                maxWidth={demo.maxWidth}
                aspect={demo.aspect}
                plate="Fig. 01"
              />
            ) : (
              <DetectionFrame
                image={featuredProject.image}
                priority
                pendingLabel="Wildlife detection frame pending"
              />
            )}
          </figure>
        </div>
      </div>
    </section>
  )
}
