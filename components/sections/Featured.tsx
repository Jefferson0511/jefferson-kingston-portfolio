import Link from 'next/link'
import { SectionHeader } from '@/components/primitives/SectionHeader'
import { MetricStrip } from '@/components/primitives/MetricStrip'
import { EvidenceChip } from '@/components/primitives/EvidenceChip'
import { featuredProject } from '@/content/projects'

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

      <Link
        href={`/projects/${featuredProject.slug}`}
        className="mt-8 inline-block rounded-sm border border-line-strong px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] text-ink transition-colors hover:border-detect hover:text-detect"
      >
        Read the full case study &rarr;
      </Link>
    </section>
  )
}
