import { ProjectCard } from '@/components/primitives/ProjectCard'
import { otherProjects } from '@/content/projects'

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl p-10">
      {/* The i === 0 href is temporary, purely to compare interactive vs inert. Removed in Task 9. */}
      <div className="grid gap-4 sm:grid-cols-2">
        {otherProjects.map((project, i) => (
          <ProjectCard
            key={project.slug}
            project={project}
            href={i === 0 ? '/projects/wildlife-intrusion' : undefined}
          />
        ))}
      </div>
    </main>
  )
}
