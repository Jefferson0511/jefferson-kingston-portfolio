import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { profile } from '@/content/profile'

export const alt = `${profile.name}: systems that detect, track and interpret signals in real time`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/*
 * Deliberately typographic rather than a frame from the demo clip. That footage
 * carries a broadcaster's watermark, and an Open Graph image is reproduced in
 * every unfurl and feed preview that links here: the one place a borrowed
 * watermark would travel furthest and be least explicable. Captions on the site
 * can attribute a source; a card in someone's feed cannot.
 *
 * The tokens are duplicated as literals because this renders through satori,
 * which never sees the stylesheet and cannot resolve a custom property. Keep
 * them in step with app/globals.css by hand.
 */
const PAPER = '#faf9f6'
const INK = '#1f2937'
const MUTED = '#616770'
const FAINT = '#6c727a'
const BURGUNDY = '#4a0e17'
const RULE = '#cecfd0'
const EDGE = '#8d9197'

/*
 * Playfair and Inter are read from committed .woff files. Satori reads ttf, otf
 * and woff but not woff2, so the faces next/font self-hosts for the site are
 * unusable here. Build time only: this route prerenders to a PNG, so neither
 * file is ever sent to a browser.
 */
const font = (f: string) => readFileSync(join(process.cwd(), 'app/fonts', f))
const fonts = [
  { name: 'Playfair', weight: 900 as const, style: 'normal' as const, data: font('playfair-display-latin-900-normal.woff') },
  { name: 'Inter', weight: 400 as const, style: 'normal' as const, data: font('inter-latin-400-normal.woff') },
  { name: 'Inter', weight: 600 as const, style: 'normal' as const, data: font('inter-latin-600-normal.woff') },
]

/** The site's hairline with square endpoint markers, carried onto the card. */
function Rule() {
  return (
    <div style={{ display: 'flex', position: 'relative', width: '100%', height: 6 }}>
      <div style={{ display: 'flex', position: 'absolute', left: 0, right: 0, top: 2, height: 1, backgroundColor: RULE }} />
      <div style={{ display: 'flex', position: 'absolute', left: 0, top: 0, width: 6, height: 6, backgroundColor: EDGE }} />
      <div style={{ display: 'flex', position: 'absolute', right: 0, top: 0, width: 6, height: 6, backgroundColor: EDGE }} />
    </div>
  )
}

// Satori supports flexbox but not grid, so every container is an explicit flex.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: PAPER,
          padding: '0 76px',
          fontFamily: 'Inter',
        }}
      >
        <Rule />

        <div
          style={{
            display: 'flex',
            fontFamily: 'Playfair',
            fontWeight: 900,
            fontSize: 118,
            lineHeight: 1,
            letterSpacing: -3,
            color: INK,
            padding: '30px 0 26px',
          }}
        >
          Jefferson Kingston
        </div>

        <Rule />

        <div style={{ display: 'flex', gap: 48, marginTop: 34 }}>
          <div style={{ display: 'flex', flexDirection: 'column', width: 230 }}>
            <div style={{ display: 'flex', fontSize: 15, letterSpacing: 2.4, color: INK, fontWeight: 600 }}>
              ML / COMPUTER VISION
            </div>
            <div style={{ display: 'flex', fontSize: 16, color: FAINT, marginTop: 8 }}>
              MS Northeastern
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <div style={{ display: 'flex', fontSize: 33, lineHeight: 1.35, color: INK, maxWidth: 720 }}>
              {profile.thesis.replace(/\.$/, '')} —
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 26 }}>
              <div
                style={{
                  display: 'flex',
                  backgroundColor: BURGUNDY,
                  color: PAPER,
                  fontSize: 15,
                  letterSpacing: 1.8,
                  padding: '11px 24px',
                  borderRadius: 999,
                }}
              >
                IEEE XPLORE · 2026
              </div>
              <div
                style={{
                  display: 'flex',
                  border: `1px solid ${EDGE}`,
                  color: MUTED,
                  fontSize: 15,
                  letterSpacing: 1.8,
                  padding: '11px 24px',
                  borderRadius: 999,
                }}
              >
                INDIAN PATENT · 2024
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  )
}
