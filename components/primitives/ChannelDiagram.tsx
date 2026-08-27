import type { Channel } from '@/content/types'

type Props = {
  channels: Channel[]
  /** Text on the fused result bar, e.g. "confirmed". */
  fusedLabel: string
}

// A typed Record, so adding a Channel kind without a fill is a compile error.
// Note these are only existing tokens — no third colour enters the system.
const FILLS: Record<Channel['kind'], string> = {
  detect: 'bg-burgundy',
  alert: 'bg-burgundy',
  neutral: 'bg-ink-muted',
}

export function ChannelDiagram({ channels, fusedLabel }: Props) {
  return (
    <figure className="border border-rule p-5">
      <figcaption className="mb-4 font-mono text-[0.625rem] uppercase tracking-[0.13em] text-ink-faint">
        Sensor channels resolving into one decision
      </figcaption>

      <ul className="space-y-2">
        {channels.map((channel) => (
          <li key={channel.name} className="grid grid-cols-[5.5rem_1fr] items-center gap-3">
            <span className="text-right font-mono text-[0.5625rem] uppercase tracking-[0.11em] text-ink-faint">
              {channel.name}
            </span>
            <span className="relative block h-3.5 overflow-hidden bg-paper-raised">
              {/*
               * bar-grow ties the fill to a scroll timeline, so the bars sweep
               * out as the diagram enters view and the chart reads as a
               * measurement being taken. The width below is the resting state,
               * so a browser without scroll timelines shows the finished bar.
               */}
              <span
                className={`bar-grow absolute inset-y-0 left-0 ${FILLS[channel.kind]} opacity-90`}
                style={{ width: `${channel.strength}%` }}
              />
              {/* A bar conveyed only by width is invisible to a screen reader. */}
              <span className="sr-only">{`${channel.name} signal strength ${channel.strength} percent`}</span>
            </span>
          </li>
        ))}

        <li className="grid grid-cols-[5.5rem_1fr] items-center gap-3 pt-1">
          <span className="text-right font-mono text-[0.5625rem] uppercase tracking-[0.11em] text-ink">
            Fused
          </span>
          <span className="relative flex h-5 items-center justify-end bg-ink px-2">
            <span className="num text-[0.5625rem] uppercase tracking-[0.05em] text-paper">
              {fusedLabel}
            </span>
          </span>
        </li>
      </ul>
    </figure>
  )
}
