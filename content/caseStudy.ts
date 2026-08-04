import type { Channel } from './types'

export type DemoClip = {
  src: string
  caption: string
  /**
   * A one-line version for the hero, where the frame is small and the caption
   * sits in a narrow column. Says the same thing in fewer words rather than
   * saying less — it still names the models and still says "recorded".
   */
  shortCaption: string
  /** Native width in pixels. The player is capped here so it is never upscaled. */
  maxWidth: number
}

export type CaseStudyNarrative = {
  /** null until the vision-only failure modes are described. */
  problem: string | null
  /** null until the tradeoffs behind each choice are explained. */
  approach: string | null
  dataset: string
  results: string
  channels: Channel[]
  fusedLabel: string
  /** null when no footage exists; the header falls back to a DetectionFrame. */
  demo: DemoClip | null
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
  /*
   * 640x360 native, 16s, no audio track. Capped at its own width so it is never
   * upscaled — stretching it to the 832px layout width would read as soft.
   */
  demo: {
    src: '/wildlife-detection-demo.mp4',
    caption:
      'Real detection output: YOLOv8n bounding boxes with DeepSORT track identities persisting across frames as subjects move through the scene.',
    shortCaption: 'Recorded output — YOLOv8n detection, DeepSORT tracking',
    maxWidth: 640,
  },
}
