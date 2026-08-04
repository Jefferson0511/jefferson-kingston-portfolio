import Link from 'next/link'
import type { Project } from '@/content/types'
import { EvidenceChip } from './EvidenceChip'
import { MetricStrip } from './MetricStrip'

type Props = {
  project: Project
  /**
   * Destination, when one genuinely exists — an internal case study route, or an
   * external repo URL. Omit it and the card renders inert: no hover, no focus
   * ring, not in the tab order.
   */
  href?: string
}

// Offset by a pixel so the ticks sit on the border rather than inside it.
const CORNERS = [
  '-left-px -top-px border-l border-t',
  '-right-px -top-px border-r border-t',
  '-bottom-px -left-px border-b border-l',
  '-bottom-px -right-px border-b border-r',
]

export function ProjectCard({ project, href }: Props) {
  const interactive = href !== undefined
  const external = href?.startsWith('http') ?? false

  const body = (
    <>
      {/*
       * The corner ticks mirror DetectionFrame, and on an interactive card they
       * are the hover state: pointing at one extends all four corners inward,
       * so the card visibly locks on. That is the site's one interaction idea,
       * reused rather than joined by a second — the brief asked for a single
       * memorable element instead of five flourishes.
       */}
      {CORNERS.map((corner) => (
        <span
          key={corner}
          aria-hidden="true"
          className={`pointer-events-none absolute h-1.5 w-1.5 transition-all duration-300 ${corner} ${
            interactive
              ? 'border-detect/50 group-hover:h-3.5 group-hover:w-3.5 group-hover:border-detect group-focus-visible:h-3.5 group-focus-visible:w-3.5 group-focus-visible:border-detect'
              : 'border-line-strong'
          }`}
        />
      ))}

      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-[1.0625rem] font-semibold text-ink">{project.title}</h3>
        <span className="num shrink-0 text-[0.6875rem] text-ink-faint">{project.date}</span>
      </div>

      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{project.summary}</p>

      {project.metrics.length > 0 && (
        <div className="mt-4">
          <MetricStrip metrics={project.metrics} />
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <EvidenceChip key={tech}>{tech}</EvidenceChip>
        ))}
      </div>
    </>
  )

  const base = 'relative rounded-sm border border-line-strong p-4'
  const active =
    'group block transition-[border-color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:border-detect hover:bg-surface-raised focus-visible:border-detect'

  /*
   * The interactive/inert split is a correctness decision, not styling. A hover
   * affordance on an unclickable card is a lie the user discovers by clicking,
   * so an inert card gets no transition, no focus ring, and no tab stop.
   */
  if (!interactive) {
    return <article className={base}>{body}</article>
  }

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} ${active}`}>
        {body}
        {/* Announce the new tab, which is otherwise a silent surprise. */}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    )
  }

  return (
    <Link href={href} className={`${base} ${active}`}>
      {body}
    </Link>
  )
}
