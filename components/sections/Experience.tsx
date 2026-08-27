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
      />
      {/*
       * No intro line here. The one that used to sit here was written by me, not
       * by Jefferson, and it asserted that both internships were hands-on
       * computer vision work, which was not true of the AAM role. Section
       * intros must come from content, never be composed to fill the slot.
       */}

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
