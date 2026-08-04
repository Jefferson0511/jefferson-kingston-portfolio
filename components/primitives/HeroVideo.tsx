'use client'

import { useEffect, useRef, useState } from 'react'
import { Icon } from './Icon'

type Props = {
  src: string
  /** Text alternative, and the visible caption beneath the frame. */
  caption: string
  /** Native pixel width. The player is never upscaled past its own resolution. */
  maxWidth: number
}

export function HeroVideo({ src, caption, maxWidth }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  // Tracks a deliberate pause so scrolling away and back does not restart
  // footage the visitor chose to stop.
  const userPaused = useRef(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    /*
     * Reduced motion is checked here rather than in CSS because autoplay is a
     * JavaScript behaviour that no media query can reach. Under `reduce` the
     * clip stays on its first frame and the visitor can still start it by
     * hand — the footage is never withheld, only the automatic movement.
     */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (!userPaused.current) {
              // Autoplay can be refused by policy or a data-saver setting.
              // Swallowing it leaves the first frame showing, which is a fine
              // resting state, so there is nothing to report.
              void video.play().catch(() => {})
            }
          } else {
            video.pause()
          }
        }
      },
      { threshold: 0.25 },
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

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

  return (
    <figure className="w-full" style={{ maxWidth: `${maxWidth}px` }}>
      <div className="relative overflow-hidden rounded-sm bg-surface-sunken">
        {/* Corner ticks, matching DetectionFrame so the motif carries over. */}
        <span className="pointer-events-none absolute left-2 top-2 z-10 h-1.5 w-1.5 border-l border-t border-ink/50" />
        <span className="pointer-events-none absolute right-2 top-2 z-10 h-1.5 w-1.5 border-r border-t border-ink/50" />
        <span className="pointer-events-none absolute bottom-2 left-2 z-10 h-1.5 w-1.5 border-b border-l border-ink/50" />
        <span className="pointer-events-none absolute bottom-2 right-2 z-10 h-1.5 w-1.5 border-b border-r border-ink/50" />

        {/*
         * Native controls are deliberately omitted: a control bar over a 420px
         * frame is most of the composition, and the single button below is the
         * only control this clip needs. It is not a shortcut past WCAG 2.2.2 —
         * that success criterion wants a pause mechanism for motion lasting
         * over five seconds, and this provides one.
         *
         * No CSS bounding boxes here either. The footage is real model output,
         * so boxes and track identities are already rendered into the frames.
         */}
        <video
          ref={videoRef}
          className="block h-auto w-full"
          src={src}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={caption}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        >
          <p className="p-4 text-sm text-ink-muted">
            Your browser cannot play this video. {caption}
          </p>
        </video>

        <button
          type="button"
          onClick={toggle}
          className="absolute bottom-3 right-3 z-10 grid h-9 w-9 place-items-center rounded-sm border border-line-strong bg-surface/85 text-ink backdrop-blur-sm transition-colors hover:border-detect hover:text-detect"
        >
          <Icon name={playing ? 'pause' : 'play'} size={13} />
          <span className="sr-only">{playing ? 'Pause' : 'Play'} the detection clip</span>
        </button>
      </div>

      <figcaption className="mt-2.5 font-mono text-[0.625rem] leading-relaxed tracking-[0.04em] text-ink-faint">
        {caption}
      </figcaption>
    </figure>
  )
}
