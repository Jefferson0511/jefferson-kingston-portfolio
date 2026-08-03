import { ProjectCard } from '@/components/primitives/ProjectCard'
import { otherProjects } from '@/content/projects'

export default function Home() {
  // No <main> here — the root layout owns it, along with the width constraint.
  // The i === 0 href is temporary, purely to compare interactive vs inert.
  // Removed in Task 9.
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {otherProjects.map((project, i) => (
        <ProjectCard
          key={project.slug}
          project={project}
          href={i === 0 ? '/projects/wildlife-intrusion' : undefined}
        />
      ))}
    </div>
  )
}
