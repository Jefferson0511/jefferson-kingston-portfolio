import { SectionHeader } from '@/components/primitives/SectionHeader'
import { EvidenceChip } from '@/components/primitives/EvidenceChip'
import { MetricStrip } from '@/components/primitives/MetricStrip'
import { DetectionFrame } from '@/components/primitives/DetectionFrame'
import { featuredProject } from '@/content/projects'

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl p-10">
      <div className="mb-10 space-y-6">
        <DetectionFrame image={null} pendingLabel="Wildlife frame pending" />
        <DetectionFrame
          image={{
            src: '/placeholder-check.png',
            alt: 'Temporary verification image',
            boxes: [
              { label: 'elephant 0.94', kind: 'detect', x: 11, y: 26, w: 30, h: 52 },
              { label: 'intrusion · PIR+US', kind: 'alert', x: 53, y: 41, w: 25, h: 36 },
            ],
          }}
        />
      </div>

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
