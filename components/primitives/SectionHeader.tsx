import { HairRule } from './HairRule'

type Props = {
  /** Two-digit section number, e.g. "03". */
  index: string
  /** Eyebrow text, e.g. "Publications & Patents". */
  label: string
  title: string
  /** Must match the aria-labelledby on the owning <section>, and doubles as the
   *  nav anchor target. */
  id: string
  /** Optional narrative line, set in the right column beside the label. */
  intro?: string
}

export function SectionHeader({ index, label, title, id, intro }: Props) {
  return (
    /* scroll-mt clears the sticky header, or an in-page anchor lands with the
       heading hidden behind the bar and every nav link looks broken. */
    <header className="mb-12 scroll-mt-28">
      {/*
       * Rule above and below the title, which is the reference's framing device
       * and replaces the previous eyebrow-plus-short-dash. Titles are set in
       * Playfair at up to 64px, against 10px mono labels: the extreme contrast
       * between the two is the point of the whole system.
       */}
      <HairRule />

      <h2 id={id} className="display py-6 text-section text-ink">
        {title}
      </h2>

      <HairRule />

      {/* Split columns beneath: technical label left, narrative right. */}
      <div className="mt-7 grid gap-6 sm:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] sm:gap-10">
        <div>
          <p className="label text-ink">
            <span className="tabular-nums">{index}</span>
            {/* aria-hidden because "03 slash Projects" is noise read aloud. */}
            <span aria-hidden="true" className="mx-2 text-ink-faint">
              /
            </span>
            {label}
          </p>
        </div>
        {intro && <p className="max-w-2xl leading-relaxed text-ink-muted">{intro}</p>}
      </div>
    </header>
  )
}
