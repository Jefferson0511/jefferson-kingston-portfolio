import { SectionHeader } from '@/components/primitives/SectionHeader'
import { Pill } from '@/components/primitives/Pill'
import { skillGroups } from '@/content/skills'

export function Skills() {
  return (
    <section aria-labelledby="skills-heading" className="mb-24">
      <SectionHeader index="06" label="Skills" title="Tools and languages" id="skills-heading" />

      {/* Grouped by category, never one flat alphabetized list. */}
      <div className="space-y-6">
        {skillGroups.map((group) => (
          <div key={group.name}>
            <h3 className="mb-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.13em] text-ink-faint">
              {group.name}
            </h3>
            <ul className="flex flex-wrap gap-1.5">
              {group.skills.map((skill) => (
                <li key={skill}>
                  <Pill>{skill}</Pill>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
