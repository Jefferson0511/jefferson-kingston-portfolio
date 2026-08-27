type Props = {
  /** Two-digit section number, e.g. "03". */
  index: string
  /** Eyebrow text after the number, e.g. "Publications & Patents". */
  label: string
  title: string
  /** Must match the aria-labelledby on the owning <section>, and doubles as the
   *  nav anchor target. */
  id: string
}

export function SectionHeader({ index, label, title, id }: Props) {
  return (
    /*
     * scroll-mt clears the sticky header. Without it an in-page anchor lands
     * with the heading hidden behind the bar, which makes every nav link look
     * broken even though the scroll worked.
     */
    <header className="mb-10 scroll-mt-24">
      <p className="flex items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-detect">
        <span aria-hidden="true" className="h-px w-10 bg-detect" />
        <span className="tabular-nums">{index}</span>
        {/*
         * --line-strong is calibrated for borders (3:1, WCAG 1.4.11), not text
         * (4.5:1, WCAG 1.4.3). An earlier version used it here and measured
         * 3.43:1, so this separator uses --ink-faint. aria-hidden because
         * "03 slash Publications" is noise read aloud.
         */}
        <span aria-hidden="true" className="text-ink-faint">
          /
        </span>
        {label}
      </p>

      {/* Was 22px. Section headings at that size read as body copy with some
          weight on it, which was much of why the page felt flat. */}
      <h2 id={id} className="display mt-3 text-section text-ink">
        {title}
      </h2>

      {/* Decorative divider, bounds nothing interactive, so --color-line is right. */}
      <div className="mt-5 h-px bg-line" />
    </header>
  )
}
