import type { Channel } from './types'

export type CaseStudyNarrative = {
  /** null until the vision-only failure modes are described. */
  problem: string | null
  /** null until the tradeoffs behind each choice are explained. */
  approach: string | null
  dataset: string
  results: string
  channels: Channel[]
  fusedLabel: string
}

export const wildlifeNarrative: CaseStudyNarrative = {
  problem: null,
  approach: null,
  dataset:
    'A custom dataset of 13,879 images across 14 classes, collected to cover the species and conditions the system needed to distinguish in the field.',
  results:
    'Fusing the sensor channels with vision reduced false positives by 67% compared with a vision-only baseline.',
  /*
   * Channel strengths illustrate the fusion concept rather than reporting
   * measurements. They deliberately never pass through Metric, so they claim no
   * provenance they lack.
   */
  channels: [
    { name: 'Vision', strength: 88, kind: 'detect' },
    { name: 'PIR', strength: 61, kind: 'alert' },
    { name: 'Ultrasonic', strength: 47, kind: 'neutral' },
  ],
  fusedLabel: 'confirmed',
}
