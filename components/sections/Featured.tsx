import Link from 'next/link'
import { SectionHeader } from '@/components/primitives/SectionHeader'
import { MetricStrip } from '@/components/primitives/MetricStrip'
import { EvidenceChip } from '@/components/primitives/EvidenceChip'
import { Icon } from '@/components/primitives/Icon'
import { featuredProject } from '@/content/projects'

const repo = featuredProject.links[0]

export function Featured() {
  return (
    <section aria-labelledby="featured-heading" className="mb-24">
      <SectionHeader
        index="02"
        label="Featured"
        title={featuredProject.title}
        id="featured-heading"
      />

      <p className="max-w-2xl leading-relaxed text-ink-muted">{featuredProject.summary}</p>

      <div className="mt-6">
        <MetricStrip metrics={featuredProject.metrics} showSource />
      </div>

      <div className="mt-6 flex flex-wrap gap-1.5">
        {featuredProject.stack.map((tech) => (
          <EvidenceChip key={tech}>{tech}</EvidenceChip>
        ))}
      </div>

      {/*
       * The repo link belongs here because nothing else on the site renders it.
       * The featured project is excluded from the projects grid, and Hero and
       * this section both point at the case study, so a populated `links` array
       * on the flagship rendered nowhere at all. The brief is explicit that
       * every featured project needs a working GitHub link.
       */}
      <div className="mt-8 flex flex-wrap gap-2.5">
        <Link
          href={`/projects/${featuredProject.slug}`}
          className="inline-block rounded-sm border border-line-strong px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] text-ink transition-colors hover:border-detect hover:text-detect"
        >
          Read the full case study &rarr;
        </Link>

        {featuredProject.repoVerified && repo && (
          <a
            href={repo.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-sm border border-line-strong px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] text-ink transition-colors hover:border-detect hover:text-detect"
          >
            <Icon name="github" size={14} />
            Source
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        )}
      </div>
    </section>
  )
}
