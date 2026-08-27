import Image from 'next/image'
import type { ProjectImage } from '@/content/types'
import { ClassLabel } from './ClassLabel'

type Props = {
  /** null renders a deliberate pending well, never a broken image. */
  image: ProjectImage | null
  /** CSS aspect-ratio value. */
  ratio?: string
  /** Set true only for the hero image, which is the LCP element. */
  priority?: boolean
  /** Shown inside the pending well to state what is expected. */
  pendingLabel?: string
}

export function DetectionFrame({
  image,
  ratio = '16 / 9',
  priority = false,
  pendingLabel = 'Detection output pending',
}: Props) {
  return (
    <div
      className="relative overflow-hidden bg-paper-raised"
      style={{ aspectRatio: ratio }}
    >
      {/* Corner ticks — the frame reads as an annotation viewport even when empty. */}
      <span className="pointer-events-none absolute left-2 top-2 h-1.5 w-1.5 border-l border-t border-ink/50" />
      <span className="pointer-events-none absolute right-2 top-2 h-1.5 w-1.5 border-r border-t border-ink/50" />
      <span className="pointer-events-none absolute bottom-2 left-2 h-1.5 w-1.5 border-b border-l border-ink/50" />
      <span className="pointer-events-none absolute bottom-2 right-2 h-1.5 w-1.5 border-b border-r border-ink/50" />

      {image ? (
        <>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 720px"
            className="object-cover"
          />
          {/*
           * Boxes are percentage-positioned spans, never baked into the image
           * file. One screenshot therefore serves both card and case study,
           * boxes stay crisp at any resolution, labels are correctable without
           * re-exporting, and everything scales across breakpoints for free.
           */}
          {image.boxes.map((box) => (
            <span
              key={box.label}
              className={`absolute border ${box.kind === 'detect' ? 'border-burgundy' : 'border-burgundy'}`}
              style={{
                left: `${box.x}%`,
                top: `${box.y}%`,
                width: `${box.w}%`,
                height: `${box.h}%`,
              }}
            >
              <ClassLabel text={box.label} kind={box.kind} />
            </span>
          ))}
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          {/* ink-muted, not ink-faint: this label sits on the figure well, where
              ink-faint measures 4.3:1 and misses the 4.5:1 floor. */}
          <p className="label text-ink-muted">
            {pendingLabel}
          </p>
        </div>
      )}
    </div>
  )
}
