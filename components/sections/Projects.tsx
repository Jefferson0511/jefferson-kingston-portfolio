import { SectionHeader } from '@/components/primitives/SectionHeader'
import { ProjectCard } from '@/components/primitives/ProjectCard'
import { otherProjects } from '@/content/projects'

export function Projects() {
  return (
    <section aria-labelledby="projects-heading" className="mb-24">
      <SectionHeader index="04" label="Projects" title="Other work" id="projects-heading" />

      <div className="grid gap-4 sm:grid-cols-2">
        {/*
         * No href is passed. Every card is inert until repoVerified flips true
         * in Phase 3, at which point this is where the repo URL gets threaded
         * through.
         */}
        {otherProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  )
}
