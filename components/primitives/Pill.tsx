type Props = {
  children: React.ReactNode
  /** Filled burgundy instead of outlined. For a peer-reviewed or granted credential. */
  solid?: boolean
  /** Adds the hover inversion. Only pass this when the pill is inside a link or button. */
  interactive?: boolean
}

/*
 * Thin-bordered transparent capsule, replacing the old rectangular EvidenceChip.
 *
 * The border uses --color-edge rather than --color-rule. That is not a style
 * preference: a pill inside a link is part of an interactive control, and WCAG
 * 1.4.11 wants its boundary at 3:1. --color-rule measures 1.5:1, which reads
 * beautifully as a divider and would fail here.
 *
 * The hover inversion is opt-in via `interactive`, because a pill that changes
 * on hover while not being clickable is a lie the visitor discovers by clicking.
 * group-hover is used so the whole card or link drives it, not the pill alone.
 */
export function Pill({ children, solid = false, interactive = false }: Props) {
  const base =
    'inline-flex items-center rounded-full border px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.12em] transition-colors duration-300'

  if (solid) {
    return (
      <span className={`${base} border-burgundy bg-burgundy text-paper`}>{children}</span>
    )
  }

  return (
    <span
      className={`${base} border-edge text-ink-muted ${
        interactive ? 'group-hover:border-burgundy group-hover:bg-burgundy group-hover:text-paper' : ''
      }`}
    >
      {children}
    </span>
  )
}
