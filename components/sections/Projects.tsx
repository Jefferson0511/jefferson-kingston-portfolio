import { SectionHeader } from '@/components/primitives/SectionHeader'
import { ProjectCard } from '@/components/primitives/ProjectCard'
import { otherProjects } from '@/content/projects'
import { profile } from '@/content/profile'

export function Projects() {
  return (
    <section aria-labelledby="projects-heading" className="mb-24">
      <SectionHeader index="04" label="Projects" title="Other work" id="projects-heading" />

      <div className="grid gap-4 sm:grid-cols-2">
        {/*
         * INTERIM: every card points at the GitHub profile rather than its own
         * repo, because per-repo URLs are not confirmed public yet. A profile
         * link cannot 404, which is the failure the brief specifically warns
         * about. Swap `project.links` in once repoVerified flips true — see the
         * reminder in project memory.
         */}
        {otherProjects.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            href={project.repoVerified ? project.links[0]?.href : profile.githubUrl}
          />
        ))}
      </div>

      <p className="mt-5 text-[0.8125rem] text-ink-faint">
        Repository links point to the GitHub profile for now. Per-project repositories are being
        prepared.
      </p>
    </section>
  )
}
