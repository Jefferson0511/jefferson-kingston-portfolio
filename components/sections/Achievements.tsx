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

      <ul className="space-y-5">
        {achievements.map((achievement) => (
          <li key={achievement.title} className="border-l-2 border-line-strong pl-4">
            <h3 className="text-[0.9375rem] font-semibold text-ink">{achievement.title}</h3>
            <p className="mt-1 text-sm text-ink-muted">{achievement.detail}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
