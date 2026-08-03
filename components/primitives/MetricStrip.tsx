import type { Metric } from '@/content/types'

type Props = {
  metrics: Metric[]
  /** Show provenance beneath each figure. Use on the case study, omit where space is tight. */
  showSource?: boolean
}

export function MetricStrip({ metrics, showSource = false }: Props) {
  // Returning null on an empty array means callers need no conditional of their own.
  if (metrics.length === 0) return null

  return (
    <dl className="flex flex-wrap gap-x-8 gap-y-4">
      {metrics.map((metric) => (
        /*
         * DOM order is dt then dd, which is what <dl> requires and what reads
         * correctly to a screen reader (label, then value). The `order`
         * utilities lift the figure above the label visually without breaking
         * either guarantee.
         */
        <div key={`${metric.label}-${metric.value}`} className="flex flex-col">
          <dt className="order-2 mt-0.5 font-mono text-[0.5rem] uppercase tracking-[0.13em] text-ink-faint">
            {metric.label}
          </dt>
          <dd className="num order-1 text-[1.75rem] font-semibold leading-tight text-detect">
            {metric.value}
          </dd>
          {showSource && (
            <dd className="order-3 mt-1 max-w-[22ch] text-[0.6875rem] leading-snug text-ink-faint">
              {metric.source}
            </dd>
          )}
        </div>
      ))}
    </dl>
  )
}
