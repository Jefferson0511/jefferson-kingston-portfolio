import { SectionHeader } from '@/components/primitives/SectionHeader'
import { achievements } from '@/content/achievements'

export function Achievements() {
  return (
    <section aria-labelledby="achievements-heading" className="mb-24">
      <SectionHeader
        index="07"
        label="Achievements"
        title="Competitions"
        id="achievements-heading"
      />

      {/* Hairline-separated rows rather than a left bar, so the rule vocabulary
          stays consistent with the rest of the page. */}
      <ul className="border-t border-rule">
        {achievements.map((achievement) => (
          <li key={achievement.title} className="border-b border-rule py-5">
            <h3 className="display text-xl text-ink">{achievement.title}</h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">
              {achievement.detail}
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}
