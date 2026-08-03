type Props = {
  /** Always visible text. Colour is never the only signal. */
  text: string
  kind: 'detect' | 'alert'
}

export function ClassLabel({ text, kind }: Props) {
  const fill = kind === 'detect' ? 'bg-detect' : 'bg-alert'

  // text-surface on either fill is the same high ratio inverted:
  // 9.2:1 on teal, 7.3:1 on amber.
  return (
    <span
      className={`absolute -top-[1.0625rem] -left-px whitespace-nowrap px-1.5 py-px font-mono text-[0.5625rem] leading-normal text-surface ${fill}`}
    >
      {text}
    </span>
  )
}
