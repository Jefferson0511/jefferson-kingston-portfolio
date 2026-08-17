import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { profile } from '@/content/profile'

export const alt = `${profile.name} — systems that detect, track and interpret signals in real time`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/*
 * Deliberately typographic rather than a frame from the demo clip.
 *
 * That footage carries a broadcaster's watermark, and an Open Graph image is
 * reproduced in every LinkedIn post, Slack unfurl and message preview that ever
 * links here — the one place a borrowed watermark would travel furthest and be
 * least explicable. The captions on the site can attribute the source; a 1200px
 * card in someone's feed cannot.
 *
 * The tokens are duplicated as literals below because this renders through
 * satori, which never sees the stylesheet and so cannot resolve a CSS custom
 * property. They must be kept in step with app/globals.css by hand.
 */
const INK = '#e6edf4'
const INK_MUTED = '#93a6b8'
const INK_FAINT = '#7d92a8'
const SURFACE = '#1a2430'
const DETECT = '#4fd8e4'
const LINE_STRONG = '#607890'

/*
 * Inter is loaded from a committed file rather than left to satori's bundled
 * fallback, which shaped the name and thesis with visibly uneven word spacing.
 *
 * These are .woff on purpose: satori reads ttf, otf and woff but not woff2, so
 * the faces next/font already self-hosts for the site are unusable here. Read at
 * build time only — this route prerenders to a PNG, so neither file is ever sent
 * to a browser.
 */
const fonts = [
  { name: 'Inter', weight: 400 as const, style: 'normal' as const, data: readFileSync(join(process.cwd(), 'app/fonts/inter-latin-400-normal.woff')) },
  { name: 'Inter', weight: 600 as const, style: 'normal' as const, data: readFileSync(join(process.cwd(), 'app/fonts/inter-latin-600-normal.woff')) },
]

// Satori supports flexbox but not grid, so every container is an explicit flex.
export default function Image() {
  const tick = { position: 'absolute' as const, width: 26, height: 26 }

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          backgroundColor: SURFACE,
          padding: 72,
          position: 'relative',
          fontFamily: 'Inter',
        }}
      >
        {/* The detection-box motif from DetectionFrame, carried onto the card. */}
        <div style={{ ...tick, top: 36, left: 36, borderTop: `3px solid ${DETECT}`, borderLeft: `3px solid ${DETECT}` }} />
        <div style={{ ...tick, top: 36, right: 36, borderTop: `3px solid ${DETECT}`, borderRight: `3px solid ${DETECT}` }} />
        <div style={{ ...tick, bottom: 36, left: 36, borderBottom: `3px solid ${DETECT}`, borderLeft: `3px solid ${DETECT}` }} />
        <div style={{ ...tick, bottom: 36, right: 36, borderBottom: `3px solid ${DETECT}`, borderRight: `3px solid ${DETECT}` }} />

        <div style={{ display: 'flex', fontSize: 21, letterSpacing: 3, color: INK_FAINT }}>
          {profile.status.toUpperCase()}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 82,
              fontWeight: 600,
              letterSpacing: -2,
              lineHeight: 1.05,
              color: INK,
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 22,
              // Wide enough for the thesis to set on one line. At 880 it broke
              // after "real", orphaning "time." on a line of its own.
              maxWidth: 1010,
              fontSize: 33,
              lineHeight: 1.4,
              color: INK_MUTED,
            }}
          >
            {profile.thesis}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 14 }}>
          <div
            style={{
              display: 'flex',
              padding: '11px 20px',
              borderRadius: 3,
              backgroundColor: DETECT,
              color: SURFACE,
              fontSize: 20,
              letterSpacing: 1.5,
            }}
          >
            IEEE XPLORE · 2026
          </div>
          <div
            style={{
              display: 'flex',
              padding: '11px 20px',
              borderRadius: 3,
              border: `1px solid ${LINE_STRONG}`,
              color: INK_MUTED,
              fontSize: 20,
              letterSpacing: 1.5,
            }}
          >
            INDIAN PATENT · 2024
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  )
}
