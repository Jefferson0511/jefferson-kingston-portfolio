type Props = {
  src: string
  /** Describes what the footage shows. Serves as the text alternative. */
  caption: string
  /** Native pixel width, so the player is never upscaled past its own resolution. */
  maxWidth: number
}

export function DemoVideo({ src, caption, maxWidth }: Props) {
  return (
    <figure>
      <div
        className="relative overflow-hidden rounded-sm bg-surface-sunken"
        style={{ maxWidth: `${maxWidth}px` }}
      >
        {/* Corner ticks, matching DetectionFrame so the motif carries over. */}
        <span className="pointer-events-none absolute left-2 top-2 z-10 h-1.5 w-1.5 border-l border-t border-ink/50" />
        <span className="pointer-events-none absolute right-2 top-2 z-10 h-1.5 w-1.5 border-r border-t border-ink/50" />
        <span className="pointer-events-none absolute bottom-2 left-2 z-10 h-1.5 w-1.5 border-b border-l border-ink/50" />
        <span className="pointer-events-none absolute bottom-2 right-2 z-10 h-1.5 w-1.5 border-b border-r border-ink/50" />

        {/*
         * No CSS bounding boxes over this one. The footage is real model output,
         * so detection boxes and track IDs are already rendered in the frames —
         * overlaying our own would double them up and look broken.
         *
         * `controls` is not optional here: an autoplaying loop longer than five
         * seconds needs a pause mechanism to satisfy WCAG 2.2.2.
         *
         * `preload="metadata"` fetches only enough to show a first frame rather
         * than the whole 1.9 MB, so the page stays cheap until someone plays it.
         */}
        <video
          className="block h-auto w-full"
          src={src}
          controls
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={caption}
        >
          {/* Fallback for a browser that cannot play the source at all. */}
          <p className="p-4 text-sm text-ink-muted">
            Your browser cannot play this video. {caption}
          </p>
        </video>
      </div>

      <figcaption className="mt-3 max-w-2xl text-[0.8125rem] leading-relaxed text-ink-faint">
        {caption}
      </figcaption>
    </figure>
  )
}
