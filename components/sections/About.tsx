import { SectionHeader } from '@/components/primitives/SectionHeader'
import { profile } from '@/content/profile'

export function About() {
  return (
    <section aria-labelledby="about-heading" className="mb-24">
      <SectionHeader index="08" label="About" title="Background" id="about-heading" />

      {profile.bio ? (
        <p className="max-w-2xl leading-relaxed text-ink-muted">{profile.bio}</p>
      ) : (
        /* Same treatment as the resume: a visible marker, never invented boilerplate. */
        <p className="max-w-2xl rounded-sm border border-dashed border-alert p-4 font-mono text-xs uppercase tracking-[0.1em] text-alert">
          Bio pending &mdash; 2 to 3 sentences in Jefferson&rsquo;s own voice
        </p>
      )}

      <ul className="mt-8 space-y-5">
        {profile.education.map((degree) => (
          <li key={degree.org}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-[0.9375rem] font-semibold text-ink">{degree.title}</h3>
              <span className="num text-[0.6875rem] text-ink-faint">{degree.period}</span>
            </div>
            <p className="mt-0.5 text-sm text-ink-muted">{degree.org}</p>
            {/* Guarded because the VIT entry has an empty summary; an empty p would leave stray spacing. */}
            {degree.summary && (
              <p className="mt-1 text-[0.8125rem] text-ink-faint">{degree.summary}</p>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
