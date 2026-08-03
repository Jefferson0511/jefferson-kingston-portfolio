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
        {/*
         * --line-strong is calibrated for borders (3:1, WCAG 1.4.11), not text
         * (4.5:1, WCAG 1.4.3). Using it here measured 3.43:1 and failed, so this
         * separator uses --ink-faint at 4.9:1. aria-hidden because "03 slash
         * Publications" is noise read aloud; the separator is purely visual.
         */}
        <span aria-hidden="true" className="mx-2 text-ink-faint">
          /
        </span>
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
