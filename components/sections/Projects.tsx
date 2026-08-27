import { SectionHeader } from '@/components/primitives/SectionHeader'
import { ProjectCard } from '@/components/primitives/ProjectCard'
import { otherProjects, unverifiedProjects } from '@/content/projects'
import { profile } from '@/content/profile'

export function Projects() {
  return (
    <section aria-labelledby="projects-heading" className="mb-24">
      <SectionHeader index="04" label="Projects" title="Other work" id="projects-heading" />

      <div className="grid gap-4 sm:grid-cols-2">
        {/*
         * A verified project links to its own repo. One without a public repo
         * falls back to the profile, which cannot 404 and claims nothing that
         * clicking would disprove.
         */}
        {otherProjects.map((project, i) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={i + 2}
            href={project.repoVerified ? project.links[0]?.href : profile.githubUrl}
          />
        ))}
      </div>

      {/*
       * Derived from the data rather than written out, so it cannot drift. The
       * previous version was a hardcoded sentence saying every link pointed at
       * the profile, which stopped being true the moment the first real repo
       * was wired in and would have quietly misdescribed the page.
       */}
      {unverifiedProjects.length > 0 && (
        <p className="mt-5 text-[0.8125rem] text-ink-faint">
          {unverifiedProjects.map((p) => p.title).join(', ')}{' '}
          {unverifiedProjects.length === 1 ? 'has' : 'have'} no public repository yet, so{' '}
          {unverifiedProjects.length === 1 ? 'that card links' : 'those cards link'} to the GitHub
          profile instead.
        </p>
      )}
    </section>
  )
}
