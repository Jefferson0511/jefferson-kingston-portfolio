type Props = {
  /** Extra classes, usually vertical margin. */
  className?: string
}

/*
 * The reference's signature structural device: a full-width hairline with tiny
 * square markers at each end. It replaces box shadows and heavy borders as the
 * way sections are separated and headers framed.
 *
 * The rule itself uses --color-rule, which is deliberately below any contrast
 * threshold because it carries no information. The endpoint markers use
 * --color-edge so they stay visible as the deliberate detail they are.
 *
 * aria-hidden throughout: this is punctuation, and a screen reader announcing a
 * separator between every section is noise. Sections already have headings.
 */
export function HairRule({ className = '' }: Props) {
  return (
    <div aria-hidden="true" className={`relative h-[5px] w-full ${className}`}>
      <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-rule" />
      <span className="absolute left-0 top-0 h-[5px] w-[5px] bg-edge" />
      <span className="absolute right-0 top-0 h-[5px] w-[5px] bg-edge" />
    </div>
  )
}
