import Link from 'next/link'
import type { Project, ProjectCategory } from '@/content/types'
import { Pill } from './Pill'

type Props = {
  project: Project
  /**
   * Destination, when one genuinely exists — an internal case study route, or an
   * external repo URL. Omit it and the card renders inert: no hover, no focus
   * ring, not in the tab order.
   */
  href?: string
}

/*
 * Labels only. The previous version mapped each category to its own colour,
 * which was lifted from the benchmark site and also contradicts the rule that
 * burgundy is reserved for interactive elements. Every pill is now identical
 * until hovered, and the category is conveyed by its text.
 */
const CATEGORY_LABEL: Record<ProjectCategory, string> = {
  vision: 'Computer vision',
  backend: 'Backend',
  security: 'Security / ML',
  research: 'Research',
}

export function ProjectCard({ project, href }: Props) {
  const interactive = href !== undefined
  const external = href?.startsWith('http') ?? false

  const body = (
    <>
      {/*
       * No corner ticks and no oversized ghost numeral. Both belonged to the
       * previous design and both came from the site this was benchmarked
       * against. A plate is framed by its rule, and nothing else.
       */}
      <div className="flex items-start justify-between gap-4">
        <h3 className="display text-[1.75rem] text-ink transition-colors duration-300 group-hover:text-burgundy">
          {project.title}
        </h3>
        <span className="num mt-1.5 shrink-0 text-[0.6875rem] text-ink-faint">{project.date}</span>
      </div>

      <p className="mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-ink-muted">
        {project.summary}
      </p>

      {/* Figures inline as small serif numerals, not a nested strip of panels. */}
      {project.metrics.length > 0 && (
        <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
          {project.metrics.map((metric) => (
            <div key={metric.label} className="flex flex-col">
              <dt className="label order-2 mt-1 text-ink-faint">{metric.label}</dt>
              <dd className="display order-1 text-2xl text-burgundy">{metric.value}</dd>
            </div>
          ))}
        </dl>
      )}

      <div className="mt-5 flex flex-wrap gap-1.5">
        <Pill interactive={interactive}>{CATEGORY_LABEL[project.category]}</Pill>
        {project.stack.map((tech) => (
          <Pill key={tech}>{tech}</Pill>
        ))}
      </div>
    </>
  )

  const base = 'relative block border border-rule p-6'
  /*
   * scale-[1.02] and a border colour shift, per the spec. `transform` is on the
   * transition list explicitly rather than using `transition-all`, which would
   * also animate layout properties and cost more than it gives.
   */
  const active =
    'group transition-[border-color,transform] duration-300 hover:scale-[1.02] hover:border-burgundy focus-visible:border-burgundy'

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
