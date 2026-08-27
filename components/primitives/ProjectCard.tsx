import Link from 'next/link'
import type { Project, ProjectCategory } from '@/content/types'
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
  /** Position in the grid, rendered as the oversized ghost numeral. 1-indexed. */
  index?: number
}

/*
 * A typed Record, so adding a ProjectCategory without a colour is a compile
 * error rather than an unstyled badge. Every value is above 4.5:1 on the card
 * background, because the badge label has to be readable as text and not merely
 * distinguishable as a hue — colour is never the only signal.
 */
const CATEGORY: Record<ProjectCategory, { label: string; className: string }> = {
  vision: { label: 'Computer vision', className: 'border-cat-vision/40 text-cat-vision' },
  backend: { label: 'Backend', className: 'border-cat-backend/40 text-cat-backend' },
  security: { label: 'Security / ML', className: 'border-cat-security/40 text-cat-security' },
  research: { label: 'Research', className: 'border-cat-research/40 text-cat-research' },
}

// Offset by a pixel so the ticks sit on the border rather than inside it.
const CORNERS = [
  '-left-px -top-px border-l border-t',
  '-right-px -top-px border-r border-t',
  '-bottom-px -left-px border-b border-l',
  '-bottom-px -right-px border-b border-r',
]

export function ProjectCard({ project, href, index }: Props) {
  const interactive = href !== undefined
  const external = href?.startsWith('http') ?? false
  const category = CATEGORY[project.category]

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

      {/*
       * Oversized ghost numeral. Decorative, so aria-hidden and out of the
       * accessibility tree: the card already has a heading and a date, and a
       * screen reader announcing "zero four" before the title would be noise.
       */}
      {index !== undefined && (
        <span
          aria-hidden="true"
          className="display pointer-events-none absolute right-4 top-1 select-none text-[5rem] leading-none text-ink/[0.045]"
        >
          {String(index).padStart(2, '0')}
        </span>
      )}

      <div className="relative flex flex-wrap items-center gap-2">
        <span
          className={`rounded-sm border px-2 py-1 font-mono text-[0.5625rem] uppercase tracking-[0.12em] ${category.className}`}
        >
          {category.label}
        </span>
        <span className="num text-[0.6875rem] text-ink-faint">{project.date}</span>
      </div>

      <h3 className="display relative mt-3 text-2xl text-ink">{project.title}</h3>

      <p className="relative mt-2.5 text-sm leading-relaxed text-ink-muted">{project.summary}</p>

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

  const base = 'relative overflow-hidden rounded-sm border border-line bg-surface-raised p-5'
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
