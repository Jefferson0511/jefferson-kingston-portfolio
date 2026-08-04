import type { Metadata } from 'next'
import Link from 'next/link'
import { SectionHeader } from '@/components/primitives/SectionHeader'
import { DetectionFrame } from '@/components/primitives/DetectionFrame'
import { DetectionClip } from '@/components/primitives/DetectionClip'
import { MetricStrip } from '@/components/primitives/MetricStrip'
import { EvidenceChip } from '@/components/primitives/EvidenceChip'
import { ChannelDiagram } from '@/components/primitives/ChannelDiagram'
import { featuredProject } from '@/content/projects'
import { credentials } from '@/content/credentials'
import { wildlifeNarrative } from '@/content/caseStudy'

export const metadata: Metadata = {
  title: featuredProject.title,
  description: featuredProject.summary,
}

const publication = credentials.find((c) => c.kind === 'publication')

function Pending({ children }: { children: React.ReactNode }) {
  return (
    <p className="max-w-2xl rounded-sm border border-dashed border-alert p-4 font-mono text-xs uppercase tracking-[0.1em] text-alert">
      {children}
    </p>
  )
}

export default function WildlifeIntrusionCaseStudy() {
  return (
    <>
      {/* 01 — Header */}
      <section aria-labelledby="cs-heading" className="mb-20">
        <Link
          href="/"
          className="inline-block py-1 font-mono text-[0.625rem] uppercase tracking-[0.13em] text-ink-faint transition-colors hover:text-detect"
        >
          &larr; Back
        </Link>
        <h1
          id="cs-heading"
          className="mt-4 max-w-3xl text-[clamp(1.75rem,4vw,2.5rem)] font-semibold leading-tight tracking-[-0.02em] text-ink"
        >
          {featuredProject.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          <EvidenceChip variant="solid">IEEE Xplore &middot; {featuredProject.date}</EvidenceChip>
          {featuredProject.stack.map((tech) => (
            <EvidenceChip key={tech}>{tech}</EvidenceChip>
          ))}
        </div>
        <div className="mt-8">
          {/*
           * The real footage is the strongest evidence on this page, so it opens
           * the case study. A still cannot demonstrate tracking at all — only
           * detection — and persistent track identities are half of what this
           * project does. Falls back to a DetectionFrame when no clip exists.
           */}
          {wildlifeNarrative.demo ? (
            <DetectionClip
              mode="inspect"
              src={wildlifeNarrative.demo.src}
              caption={wildlifeNarrative.demo.caption}
              maxWidth={wildlifeNarrative.demo.maxWidth}
              aspect={wildlifeNarrative.demo.aspect}
            />
          ) : (
            <DetectionFrame
              image={featuredProject.image}
              priority
              pendingLabel="Wildlife detection frame pending"
            />
          )}
        </div>
      </section>

      {/* 02 — The problem */}
      <section aria-labelledby="cs-problem" className="mb-20">
        <SectionHeader
          index="02"
          label="The problem"
          title="Why vision alone falls short"
          id="cs-problem"
        />
        {wildlifeNarrative.problem ? (
          <p className="max-w-2xl leading-relaxed text-ink-muted">{wildlifeNarrative.problem}</p>
        ) : (
          <Pending>Pending &mdash; the vision-only failure modes, in Jefferson&rsquo;s words</Pending>
        )}
      </section>

      {/* 03 — Approach */}
      <section aria-labelledby="cs-approach" className="mb-20">
        <SectionHeader index="03" label="Approach" title="Why these choices" id="cs-approach" />
        {wildlifeNarrative.approach ? (
          <p className="max-w-2xl leading-relaxed text-ink-muted">{wildlifeNarrative.approach}</p>
        ) : (
          <Pending>
            Pending &mdash; why YOLOv8n specifically, what DeepSORT adds, what each sensor
            contributes
          </Pending>
        )}
      </section>

      {/* 04 — Fusion */}
      <section aria-labelledby="cs-fusion" className="mb-20">
        <SectionHeader index="04" label="Fusion" title="Channels into a decision" id="cs-fusion" />
        <ChannelDiagram
          channels={wildlifeNarrative.channels}
          fusedLabel={wildlifeNarrative.fusedLabel}
        />
      </section>

      {/* 05 — Dataset */}
      <section aria-labelledby="cs-dataset" className="mb-20">
        <SectionHeader
          index="05"
          label="Dataset"
          title="14 classes, 13,879 images"
          id="cs-dataset"
        />
        <p className="max-w-2xl leading-relaxed text-ink-muted">{wildlifeNarrative.dataset}</p>
      </section>

      {/* 06 — Results */}
      <section aria-labelledby="cs-results" className="mb-20">
        <SectionHeader
          index="06"
          label="Results"
          title="Against a vision-only baseline"
          id="cs-results"
        />
        {/* The copy names the baseline explicitly — an unqualified percentage reads as inflated. */}
        <p className="max-w-2xl leading-relaxed text-ink-muted">{wildlifeNarrative.results}</p>
        <div className="mt-6">
          <MetricStrip metrics={featuredProject.metrics} showSource />
        </div>
      </section>

      {/* 07 — Publication. Limitations was cut at Jefferson's request, so this ends the page. */}
      {publication && (
        <section aria-labelledby="cs-publication" className="mb-12">
          <SectionHeader index="07" label="Publication" title="Citation" id="cs-publication" />
          <div className="border-l-2 border-detect pl-4">
            <h3 className="max-w-2xl text-[1.0625rem] font-semibold leading-snug text-ink">
              {publication.title}
            </h3>
            <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-ink-muted">
              {publication.venue}
            </p>
            <p className="num mt-1.5 text-[0.6875rem] text-ink-faint">{publication.date}</p>
          </div>
        </section>
      )}
    </>
  )
}
