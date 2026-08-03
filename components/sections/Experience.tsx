import { SectionHeader } from '@/components/primitives/SectionHeader'
import { experience } from '@/content/experience'

export function Experience() {
  return (
    <section aria-labelledby="experience-heading" className="mb-24">
      <SectionHeader
        index="05"
        label="Experience"
        title="Where I have worked"
        id="experience-heading"
      />

      <ul className="space-y-8">
        {experience.map((role) => (
          <li key={role.org}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-[1.0625rem] font-semibold text-ink">{role.org}</h3>
              <span className="num text-[0.6875rem] text-ink-faint">{role.period}</span>
            </div>
            <p className="mt-0.5 font-mono text-[0.6875rem] uppercase tracking-[0.13em] text-detect">
              {role.title}
            </p>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">{role.summary}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
