type Props = {
  children: React.ReactNode
  /** 'solid' for peer-reviewed or granted credentials, 'outline' for stack and context. */
  variant?: 'solid' | 'outline'
}

export function EvidenceChip({ children, variant = 'outline' }: Props) {
  // text-surface on the solid fill is the same 9.2:1 ratio inverted.
  const styles =
    variant === 'solid'
      ? 'bg-detect text-surface border-detect'
      : 'border-line-strong text-ink-muted'

  return (
    <span
      className={`inline-block rounded-sm border px-2 py-1 font-mono text-[0.625rem] tracking-wide ${styles}`}
    >
      {children}
    </span>
  )
}
