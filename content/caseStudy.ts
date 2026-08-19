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
  /*
   * Paragraphs, not one string. These sections carry a real argument and need
   * the breaks to be readable; a single string forced everything into one <p>
   * and ran four distinct points together. An empty array means not yet
   * written, and the page shows its pending marker.
   */
  problem: string[]
  approach: string[]
  dataset: string
  results: string
  channels: Channel[]
  fusedLabel: string
  /** null when no footage exists; the header falls back to a DetectionFrame. */
  demo: DemoClip | null
}

export const wildlifeNarrative: CaseStudyNarrative = {
  problem: [
    'Two things go wrong with a vision-only setup, and each one makes the other worse.',
    'The first is power. To catch an intrusion at the moment it happens, the camera pipeline has to be running continuously. In a rural deployment on solar or battery, that is a constant draw spent mostly on empty frames.',
    'The second is noise. An outdoor scene is full of movement that is not an animal: foliage in the wind, shadows shifting through the day, the change between daylight and night, small things crossing the frame. All of it produces detections.',
    'It would be easy to file false positives under accuracy and move on. In the field they cost more than that. They cause alert fatigue, and once the people receiving the alerts start ignoring them because most turn out to be wrong, the system has stopped doing its job whatever its mAP score says. What it needs is a way to filter noise before the vision model ever sees it, rather than getting better at classifying noise after the fact.',
  ],
  approach: [
    'The system only runs vision when there is a reason to. A PIR sensor picks up a heat and motion signature at almost no power cost and acts as the first-stage trigger. Until it fires, the camera and the GPU stay idle.',
    'A PIR reading on its own is not enough, because ambient thermal drift and wind will set it off. An ultrasonic sensor (HC-SR04) cross-checks it by confirming something is actually present within a set range. Only when both agree does the pipeline wake the camera and run inference. That staged gating, rather than any change to the model, is what brings the false positive rate down.',
    'YOLOv8n is the nano variant, chosen for the compute budget of embedded hardware at a remote site. It gives up some capacity for a small memory and latency footprint, which is the right trade when there is no GPU server nearby.',
    'DeepSORT sits on top of the per-frame detections and gives each animal a persistent identity. Without it, one animal walking through thirty frames reads as thirty separate detections: duplicate alerts, and no way to tell whether it is approaching or leaving. With a stable track ID, the system can reason about direction and dwell time. That is the difference between knowing something was detected and knowing this animal is moving toward the field.',
  ],
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
      'Real detection output: a YOLOv8n bounding box with a DeepSORT track identity persisting across frames as the subject moves through the scene. Run on third-party broadcast footage from ABN Digital, not on this project’s own dataset. The channel watermark beside the label is theirs.',
    shortCaption:
      'Recorded output: YOLOv8n + DeepSORT, run on third-party broadcast footage',
    maxWidth: 640,
    aspect: '640 / 234',
  },
}
