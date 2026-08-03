import { SectionHeader } from '@/components/primitives/SectionHeader'
import { EvidenceChip } from '@/components/primitives/EvidenceChip'
import { MetricStrip } from '@/components/primitives/MetricStrip'
import { featuredProject } from '@/content/projects'

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl p-10">
      <section aria-labelledby="demo-heading">
        <SectionHeader
          index="03"
          label="Publications & Patents"
          title="Peer-reviewed and granted"
          id="demo-heading"
        />
        <div className="flex flex-wrap gap-2">
          <EvidenceChip variant="solid">IEEE Xplore &middot; 2026</EvidenceChip>
          <EvidenceChip>Patent 202441075847</EvidenceChip>
          <EvidenceChip>YOLOv8n + DeepSORT</EvidenceChip>
        </div>
        <div className="mt-8">
          <MetricStrip metrics={featuredProject.metrics} showSource />
        </div>
      </section>
    </main>
  )
}
