'use client'

import { useEffect, useRef, useState } from 'react'
import { Icon } from './Icon'

type Props = {
  src: string
  /** Text alternative, and the visible caption beneath the frame. */
  caption: string
  /** Upper bound in pixels. Never set above the source's native width. */
  maxWidth: number
  /** CSS aspect-ratio of the source, so the box is reserved before metadata loads. */
  aspect: string
  /**
   * 'ambient' plays on its own when scrolled into view and offers a single
   * pause button — for the hero, where the job is to move on arrival.
   * 'inspect' stays paused and uses native controls, which bring seeking and
   * fullscreen — for the case study, where the job is to be examined.
   */
  mode: 'ambient' | 'inspect'
  /** Plate label, e.g. "Fig. 01". Omit and the caption runs without one. */
  plate?: string
}

export function DetectionClip({ src, caption, maxWidth, aspect, mode, plate }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  // Tracks a deliberate pause so scrolling away and back does not restart
  // footage the visitor chose to stop.
  const userPaused = useRef(false)
  const [playing, setPlaying] = useState(false)
  const [failed, setFailed] = useState(false)

  const ambient = mode === 'ambient'

  useEffect(() => {
    if (!ambient) return
    const video = videoRef.current
    if (!video) return

    /*
     * Reduced motion is checked here rather than in CSS because autoplay is a
     * JavaScript behaviour no media query can reach. Under `reduce` the clip
     * rests on its first frame and the visitor can still start it by hand —
     * the footage is never withheld, only the automatic movement.
     */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            // Autoplay can be refused by policy or a data-saver setting.
            // Resting on the first frame is an acceptable outcome, so there is
            // nothing to report on rejection.
            if (!userPaused.current) void video.play().catch(() => {})
          } else {
            video.pause()
          }
        }
      },
      { threshold: 0.25 },
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [ambient])

  function toggle() {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      userPaused.current = false
      void video.play().catch(() => {})
    } else {
      userPaused.current = true
      video.pause()
    }
  }

  /*
   * A decode failure has to be caught here, on the element's error event.
   *
   * The <p> nested inside <video> looks like it covers this and does not: that
   * child renders only for a browser with no <video> support at all. When the
   * container parses but the codec inside it is one the browser cannot decode,
   * the element stays in the layout and paints nothing — a silent blank box,
   * which is exactly how an mp4v-encoded clip failed here without any visible
   * sign. Content-Type: video/mp4 describes the container and says nothing
   * about the stream inside it, so the network layer looks healthy too.
   */
  if (failed) {
    return (
      <figure className="w-full" style={{ maxWidth: `${maxWidth}px` }}>
        <div
          className="flex items-center justify-center border border-dashed border-burgundy bg-paper-raised p-5"
          style={{ aspectRatio: aspect }}
        >
          <p className="label max-w-[34ch] text-center leading-relaxed text-burgundy">
            This clip could not be decoded in your browser
          </p>
        </div>
        <figcaption className="mt-3 text-[0.8125rem] leading-relaxed text-ink-muted">
          {caption}
        </figcaption>
      </figure>
    )
  }

  return (
    <figure className="w-full" style={{ maxWidth: `${maxWidth}px` }}>
      {/*
       * Hairline border on a paper well, not a filled dark box. The corner ticks
       * that used to sit here are gone: they belonged to the detection-HUD
       * vocabulary of the previous design, and a plate is framed by its rule.
       */}
      <div className="relative overflow-hidden border border-rule bg-paper-raised">

        {/*
         * No CSS bounding boxes over this. The footage is real model output, so
         * boxes and track identities are already rendered into the frames and
         * overlaying ours would double them.
         *
         * Ambient mode omits native controls because a control bar over a 420px
         * frame is most of the composition. That is not a shortcut past WCAG
         * 2.2.2 — the button below is the pause mechanism it asks for.
         */}
        <video
          ref={videoRef}
          className="block h-auto w-full"
          style={{ aspectRatio: aspect }}
          src={src}
          controls={!ambient}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={caption}
          onError={() => setFailed(true)}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />

        {ambient && (
          <button
            type="button"
            onClick={toggle}
            className="absolute bottom-3 right-3 z-10 grid h-10 w-10 place-items-center rounded-full border border-edge bg-paper/85 text-ink backdrop-blur-sm transition-colors hover:border-burgundy hover:bg-burgundy hover:text-paper"
          >
            <Icon name={playing ? 'pause' : 'play'} size={13} />
            <span className="sr-only">{playing ? 'Pause' : 'Play'} the detection clip</span>
          </button>
        )}
      </div>

      {/* Plate caption: the figure number in burgundy, then the description.
          Aligned to the top rather than the baseline, because the description
          wraps and a baseline-aligned number drops below its own first line. */}
      <figcaption className="mt-3 flex items-start gap-3">
        {plate && <span className="label mt-0.5 shrink-0 font-semibold text-burgundy">{plate}</span>}
        <span className="max-w-2xl text-[0.8125rem] leading-relaxed text-ink-muted">{caption}</span>
      </figcaption>
    </figure>
  )
}
