/** A number shown on the site. `source` is required so no figure can appear without provenance. */
export type Metric = {
  value: string
  label: string
  /**
   * Where the number comes from. Need not be a publication:
   * "IEEE Xplore, RAEEUCCI-2026", "Indian Patent App. 202441075847",
   * or plainly "Project measurement, Apr 2024" are all valid.
   * The point is to force an explicit answer, not to require external validation.
   */
  source: string
}

/** A CSS-positioned annotation box. All values are percentages of the frame, never pixels. */
export type BoundingBox = {
  /** Visible text, e.g. "elephant 0.94". Required — colour is never the only signal. */
  label: string
  kind: 'detect' | 'alert'
  x: number
  y: number
  w: number
  h: number
}

export type ProjectImage = {
  src: string
  /** Describes the detection, not the file. "Elephant detected at 0.94 confidence…" */
  alt: string
  boxes: BoundingBox[]
}

export type ExternalLink = {
  label: string
  href: string
}

export type Project = {
  slug: string
  title: string
  summary: string
  stack: string[]
  metrics: Metric[]
  links: ExternalLink[]
  /** Human-readable, e.g. "Apr 2026". */
  date: string
  /** null until a screenshot exists. DetectionFrame renders an explicit empty well. */
  image: ProjectImage | null
  featured: boolean
  /** True when the repo is confirmed public with a real README. Gates link rendering. */
  repoVerified: boolean
}

export type Credential = {
  kind: 'publication' | 'patent'
  title: string
  venue: string
  identifier: string | null
  date: string
  href: string | null
}

export type Role = {
  org: string
  title: string
  period: string
  summary: string
}

export type SkillGroup = {
  name: string
  skills: string[]
}

export type Achievement = {
  title: string
  detail: string
}

/** A sensor channel in the fusion diagram. Lives here, not in the component, so content never imports from components. */
export type Channel = {
  name: string
  /** Relative signal confidence, 0 to 100. Illustrative of the fusion concept, not a measurement. */
  strength: number
  kind: 'detect' | 'alert' | 'neutral'
}

export type Profile = {
  name: string
  thesis: string
  status: string
  email: string
  /** Explicit rather than searched out of `links` by label. */
  githubUrl: string
  links: ExternalLink[]
  education: Role[]
  /** null until the bio is written. About section renders a visible pending well. */
  bio: string | null
  /** null until the ML/CV resume PDF is added to public/. */
  resumeHref: string | null
}
