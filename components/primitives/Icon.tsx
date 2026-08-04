export type IconName = 'github' | 'linkedin' | 'mail' | 'document' | 'play' | 'pause'

type Props = {
  name: IconName
  /** Edge length in pixels. Icons are square and inherit currentColor. */
  size?: number
  className?: string
}

/*
 * Inline SVG rather than an icon package. Three marks and three glyphs is not
 * worth a dependency, and inlining means no extra request on a page whose whole
 * point is loading fast.
 *
 * A typed Record keyed on IconName means adding a name without drawing it is a
 * compile error rather than a silently empty icon.
 */
const PATHS: Record<IconName, React.ReactNode> = {
  // Both brand marks are filled single paths, so they read correctly at 16px
  // where a stroked approximation turns to mush.
  github: (
    <path
      fill="currentColor"
      d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38l-.01-1.49c-2.23.48-2.7-1.07-2.7-1.07-.36-.93-.89-1.18-.89-1.18-.73-.5.05-.49.05-.49.8.06 1.23.83 1.23.83.71 1.22 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.83-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.52.56.83 1.28.83 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48l-.01 2.2c0 .21.14.46.55.38A8 8 0 0 0 8 0Z"
    />
  ),
  linkedin: (
    <path
      fill="currentColor"
      d="M13.63 0H2.37A2.35 2.35 0 0 0 0 2.32v11.36A2.35 2.35 0 0 0 2.37 16h11.26A2.35 2.35 0 0 0 16 13.68V2.32A2.35 2.35 0 0 0 13.63 0ZM5.05 13.34H2.72V6.02h2.33v7.32ZM3.88 4.94a1.36 1.36 0 1 1 0-2.72 1.36 1.36 0 0 1 0 2.72Zm9.46 8.4h-2.32V9.62c0-.91-.33-1.53-1.14-1.53-.63 0-1 .43-1.17.84-.06.15-.08.36-.08.56v3.85H6.31s.03-6.63 0-7.32h2.32v1.04c.31-.48.86-1.16 2.1-1.16 1.53 0 2.68 1 2.68 3.15v4.29Z"
    />
  ),
  mail: (
    <>
      <rect x="1" y="3" width="14" height="10" rx="1.5" />
      <path d="m1.8 4.2 5.4 4.2a1.3 1.3 0 0 0 1.6 0l5.4-4.2" />
    </>
  ),
  document: (
    <>
      <path d="M9 1.5H4.5A1.5 1.5 0 0 0 3 3v10A1.5 1.5 0 0 0 4.5 14.5h7A1.5 1.5 0 0 0 13 13V5.5Z" />
      <path d="M9 1.5v4h4" />
    </>
  ),
  play: <path fill="currentColor" stroke="none" d="M4.5 2.7 13 8l-8.5 5.3V2.7Z" />,
  pause: (
    <path fill="currentColor" stroke="none" d="M4 2.5h2.6v11H4v-11Zm5.4 0H12v11H9.4v-11Z" />
  ),
}

export function Icon({ name, size = 16, className }: Props) {
  return (
    <svg
      // Purely decorative: every caller pairs the icon with a real text label,
      // so announcing it again would just repeat the link name.
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 16 16"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {PATHS[name]}
    </svg>
  )
}
