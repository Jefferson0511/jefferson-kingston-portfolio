type Props = {
  /** Two-digit section number, e.g. "03". */
  index: string
  /** Eyebrow text after the number, e.g. "Publications & Patents". */
  label: string
  title: string
  /** Must match the aria-labelledby on the owning <section>. */
  id: string
}

export function SectionHeader({ index, label, title, id }: Props) {
  return (
    <header className="mb-8">
      <p className="font-mono text-[0.6875rem] uppercase tracking-[0.15em] text-detect">
        <span className="tabular-nums">{index}</span>
        <span className="mx-2 text-line-strong">/</span>
        {label}
      </p>
      <h2 id={id} className="mt-1.5 text-[1.375rem] font-semibold tracking-[-0.012em] text-ink">
        {title}
      </h2>
      {/* Decorative divider — bounds nothing interactive, so --color-line is correct here. */}
      <div className="mt-3 h-px bg-line" />
    </header>
  )
}
