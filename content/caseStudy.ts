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
  /**
   * CSS aspect-ratio value matching the source. Reserving the box up front
   * matters: a <video> reports a 2:1 default intrinsic size until its metadata
   * arrives, so without this the hero frame lays out at 2:1 and then snaps to
   * the real ratio — a layout shift on the most visible element of the page.
   */
  aspect: string
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
   * 640x234, 16s, H.264 High 4.0, no audio track. Capped at its own width so it
   * is never upscaled — stretching it to the 832px layout width would read soft.
   *
   * Two things about this file are worth knowing before editing it.
   *
   * The source was encoded mp4v (MPEG-4 Part 2), which no browser will decode.
   * It has been transcoded to H.264. Any replacement clip needs the same
   * treatment; OpenCV's VideoWriter defaults to mp4v, so anything coming out of
   * the detection pipeline will have this problem. A .mp4 extension and a
   * video/mp4 Content-Type both look fine either way and prove nothing.
   *
   * It is cropped from 640x360 to remove a broadcaster's logo and a burned-in
   * SUBSCRIBE overlay. A faint channel watermark remains beside the detection
   * label and cannot be cropped out, so the captions name the source instead.
   * The footage is not from this project's dataset and the copy must never
   * imply otherwise — the 13,879-image dataset claim sits on the same page, and
   * letting a visitor conflate the two would put that claim in doubt.
   */
  demo: {
    src: '/wildlife-detection-demo.mp4',
    caption:
      'Real detection output: a YOLOv8n bounding box with a DeepSORT track identity persisting across frames as the subject moves through the scene. Run on third-party broadcast footage from ABN Digital, not on this project’s own dataset — the channel watermark beside the label is theirs.',
    shortCaption:
      'Recorded output — YOLOv8n + DeepSORT, run on third-party broadcast footage',
    maxWidth: 640,
    aspect: '640 / 234',
  },
}
