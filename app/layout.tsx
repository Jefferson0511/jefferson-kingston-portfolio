import type { Metadata } from 'next'
import { Anton, Inter, IBM_Plex_Mono } from 'next/font/google'
import { SkipLink } from '@/components/primitives/SkipLink'
import { SiteHeader } from '@/components/primitives/SiteHeader'
import { profile } from '@/content/profile'
import { site } from '@/content/site'
import './globals.css'

/*
 * Anton ships a single weight, which is the point: it is a display face for
 * large sizes only, never body copy. Chosen over Bebas Neue deliberately, since
 * Bebas is what the site this was benchmarked against uses and the result would
 * have read as a copy. Anton is heavier and blunter, which suits the subject.
 */
const anton = Anton({ subsets: ['latin'], weight: '400', display: 'swap', variable: '--font-anton' })

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
    <html lang="en" className={`${anton.variable} ${inter.variable} ${plexMono.variable}`}>
      <body className="relative bg-surface text-ink antialiased">
        {/*
         * Ambient background wash, fixed and behind everything. Decorative only:
         * aria-hidden, pointer-events-none, and low enough opacity that no text
         * contrast ratio measured against --color-surface is affected.
         */}
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div
            className="blob absolute -right-40 -top-40 h-[38rem] w-[38rem] rounded-full bg-detect/[0.045] blur-[140px]"
            style={{ '--blob-duration': '18s' } as React.CSSProperties}
          />
          <div
            className="blob absolute -bottom-40 -left-40 h-[30rem] w-[30rem] rounded-full bg-cat-backend/[0.04] blur-[140px]"
            style={{ '--blob-duration': '24s' } as React.CSSProperties}
          />
        </div>

        <SkipLink />
        {/* Sticky, so the resume and contact details never scroll out of reach. */}
        <SiteHeader />
        {/*
         * The layout owns the single main landmark. No page declares its own.
         * Widened from max-w-4xl: 132px display type cannot share an 832px row
         * with a second column, and the extra width is what lets the hero name
         * and the detection clip sit side by side.
         */}
        <main id="content" className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:px-12">
          {children}
        </main>
        <footer className="mx-auto max-w-6xl px-5 pb-12 sm:px-8 lg:px-12">
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6">
            <p className="font-mono text-[0.625rem] uppercase tracking-[0.13em] text-ink-faint">
              {profile.name}
            </p>
            <a
              href="#content"
              className="inline-block py-1 font-mono text-[0.625rem] uppercase tracking-[0.13em] text-ink-faint transition-colors hover:text-detect"
            >
              Back to top &uarr;
            </a>
          </div>
        </footer>
      </body>
    </html>
  )
}
