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
}

export function DetectionClip({ src, caption, maxWidth, aspect, mode }: Props) {
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
          className="flex items-center justify-center rounded-sm border border-dashed border-alert bg-surface-sunken p-5"
          style={{ aspectRatio: aspect }}
        >
          <p className="max-w-[34ch] text-center font-mono text-[0.6875rem] uppercase leading-relaxed tracking-[0.1em] text-alert">
            This clip could not be decoded in your browser
          </p>
        </div>
        <figcaption className="mt-2.5 text-[0.8125rem] leading-relaxed text-ink-faint">
          {caption}
        </figcaption>
      </figure>
    )
  }

  return (
    <figure className="w-full" style={{ maxWidth: `${maxWidth}px` }}>
      <div className="relative overflow-hidden rounded-sm bg-surface-sunken">
        {/* Corner ticks, matching DetectionFrame so the motif carries over. */}
        <span className="pointer-events-none absolute left-2 top-2 z-10 h-1.5 w-1.5 border-l border-t border-ink/50" />
        <span className="pointer-events-none absolute right-2 top-2 z-10 h-1.5 w-1.5 border-r border-t border-ink/50" />
        <span className="pointer-events-none absolute bottom-2 left-2 z-10 h-1.5 w-1.5 border-b border-l border-ink/50" />
        <span className="pointer-events-none absolute bottom-2 right-2 z-10 h-1.5 w-1.5 border-b border-r border-ink/50" />

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
            className="absolute bottom-3 right-3 z-10 grid h-9 w-9 place-items-center rounded-sm border border-line-strong bg-surface/85 text-ink backdrop-blur-sm transition-colors hover:border-detect hover:text-detect"
          >
            <Icon name={playing ? 'pause' : 'play'} size={13} />
            <span className="sr-only">{playing ? 'Pause' : 'Play'} the detection clip</span>
          </button>
        )}
      </div>

      <figcaption
        className={
          ambient
            ? 'mt-2.5 font-mono text-[0.625rem] leading-relaxed tracking-[0.04em] text-ink-faint'
            : 'mt-3 max-w-2xl text-[0.8125rem] leading-relaxed text-ink-faint'
        }
      >
        {caption}
      </figcaption>
    </figure>
  )
}
