import { DetectionFrame } from '@/components/primitives/DetectionFrame'
import { MetricStrip } from '@/components/primitives/MetricStrip'
import { EvidenceChip } from '@/components/primitives/EvidenceChip'
import { profile } from '@/content/profile'
import { featuredProject } from '@/content/projects'

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="mb-24">
      <h1
        id="hero-heading"
        className="text-display font-semibold leading-[1.05] tracking-[-0.022em] text-ink"
      >
        {profile.name}
      </h1>
      <p className="mt-3 max-w-xl text-base text-ink-muted">{profile.thesis}</p>
      <p className="mt-1 font-mono text-[0.6875rem] uppercase tracking-[0.13em] text-ink-faint">
        {profile.status}
      </p>

      <div className="mt-8">
        {/* priority is set on this frame alone — it is the LCP element. */}
        <DetectionFrame
          image={featuredProject.image}
          priority
          pendingLabel="Wildlife detection frame pending"
        />
      </div>

      <div className="mt-6">
        <MetricStrip metrics={featuredProject.metrics} />
      </div>

      <div className="mt-5 flex flex-wrap gap-1.5">
        <EvidenceChip variant="solid">IEEE Xplore &middot; 2026</EvidenceChip>
        <EvidenceChip>Indian Patent &middot; 2024</EvidenceChip>
      </div>

      <nav aria-label="Profile links" className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2">
        {profile.resumeHref ? (
          <a
            href={profile.resumeHref}
            className="rounded-sm bg-detect px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] text-surface transition-opacity hover:opacity-90"
          >
            Resume (PDF)
          </a>
        ) : (
          /*
           * A visible dashed amber marker, not a dead link and not a silent
           * omission. During development the gap should be impossible to miss,
           * and the Phase 4 launch gate requires the real PDF before launch.
           */
          <span className="rounded-sm border border-dashed border-alert px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] text-alert">
            Resume pending
          </span>
        )}
        {/*
         * inline-block + py-1 lifts these to 28px tall. WCAG 2.2 SC 2.5.8 wants
         * 24x24 minimum, and they measured 20px. The sentence exception does not
         * apply — these are standalone nav links, not links inside prose.
         */}
        <a
          href={`mailto:${profile.email}`}
          className="inline-block py-1 text-sm text-ink-muted hover:text-detect"
        >
          {profile.email}
        </a>
        {profile.links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="inline-block py-1 text-sm text-ink-muted hover:text-detect"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </section>
  )
}
