import { SectionHeader } from '@/components/primitives/SectionHeader'
import { Accordion } from '@/components/primitives/Accordion'
import { experience } from '@/content/experience'

export function Experience() {
  return (
    <section aria-labelledby="experience-heading" className="mb-24">
      <SectionHeader
        index="05"
        label="Experience"
        title="Where I have worked"
        id="experience-heading"
        intro="Two internships, both hands-on with computer vision pipelines rather than adjacent to them."
      />

      {/*
       * An accordion rather than a flat list. The organisation and role stay
       * visible so the section is scannable at a glance, and the detail is one
       * click away for anyone who wants it. Collapsing by default also stops
       * this section competing with the projects grid for attention.
       */}
      <Accordion
        items={experience.map((role) => ({
          title: role.org,
          meta: role.title,
          trailing: role.period,
          body: role.summary,
        }))}
      />
    </section>
  )
}
