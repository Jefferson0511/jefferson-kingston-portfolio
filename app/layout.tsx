import type { Metadata } from 'next'
import { Playfair_Display, Inter, IBM_Plex_Mono } from 'next/font/google'
import { SkipLink } from '@/components/primitives/SkipLink'
import { SiteHeader } from '@/components/primitives/SiteHeader'
import { profile } from '@/content/profile'
import { site } from '@/content/site'
import './globals.css'

/*
 * Only weight 900 is loaded. Playfair is used exclusively at display sizes,
 * where its stroke contrast is the whole reason to choose it, and a lighter
 * weight would only invite it into body copy where Inter belongs.
 */
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['900'],
  display: 'swap',
  variable: '--font-playfair',
})

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' })

// Only 400 (default) and 600 (font-semibold, used by MetricStrip) are ever
// applied. Declaring 500 as well made next/font preload a file the page never
// used, which cost bytes and produced a browser preload warning.
const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
  variable: '--font-plex-mono',
})

const description =
  'MS Computer Science at Northeastern. I build systems that detect, track and interpret signals in real time, including an IEEE-published wildlife intrusion detection system.'

export const metadata: Metadata = {
  // Makes every relative URL below resolve absolutely, which Open Graph requires.
  metadataBase: new URL(site.url),
  title: {
    default: `${profile.name} · ML and Computer Vision`,
    template: `%s · ${profile.name}`,
  },
  description,
  // Driven by the one launch flag, together with app/robots.ts. See content/site.ts
  // for why this is a single constant and what has to be true before it flips.
  robots: site.launchReady ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: {
    type: 'profile',
    title: `${profile.name} · ML and Computer Vision`,
    description,
    url: site.url,
    // No `images` entry here on purpose: app/opengraph-image.tsx is a file
    // convention and Next injects the og:image tags from it. Declaring it again
    // would emit a duplicate.
  },
  twitter: { card: 'summary_large_image' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${plexMono.variable}`}>
      {/* The paper grain lives on body::before in globals.css rather than in a
          wrapper element here, so nothing in the markup exists purely to hold a
          texture. The drifting blur blobs are gone: they were lifted from the
          benchmark site. */}
      <body className="bg-paper text-ink antialiased">
        <SkipLink />
        {/* Sticky, so the resume and contact details never scroll out of reach. */}
        <SiteHeader />
        {/* The layout owns the single main landmark. No page declares its own.
            Wide, because the display type and the two-column split need room. */}
        <main id="content" className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:px-14">
          {children}
        </main>
        <footer className="mx-auto max-w-6xl px-5 pb-14 sm:px-8 lg:px-14">
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-rule pt-7">
            <p className="label text-ink-faint">{profile.name}</p>
            <a
              href="#content"
              className="label inline-block py-1 text-ink-faint transition-colors hover:text-burgundy"
            >
              Back to top &uarr;
            </a>
          </div>
        </footer>
      </body>
    </html>
  )
}
