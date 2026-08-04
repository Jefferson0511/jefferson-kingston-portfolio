import type { Metadata } from 'next'
import { Inter, IBM_Plex_Mono } from 'next/font/google'
import { SkipLink } from '@/components/primitives/SkipLink'
import { SiteHeader } from '@/components/primitives/SiteHeader'
import { profile } from '@/content/profile'
import './globals.css'

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

export const metadata: Metadata = {
  title: {
    default: `${profile.name} — ML and Computer Vision`,
    template: `%s — ${profile.name}`,
  },
  description:
    'MS Computer Science at Northeastern. I build systems that detect, track and interpret signals in real time, including an IEEE-published wildlife intrusion detection system.',
  // Stays until the Phase 4 launch gate passes. Removing this early risks
  // Google caching a half-finished portfolio, which cannot be quickly undone.
  robots: { index: false, follow: false },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${plexMono.variable}`}>
      <body className="bg-surface text-ink antialiased">
        <SkipLink />
        {/* Sticky, so the resume and contact details never scroll out of reach. */}
        <SiteHeader />
        {/* The layout owns the single main landmark. No page declares its own. */}
        <main id="content" className="mx-auto max-w-4xl px-5 py-14 sm:px-8">
          {children}
        </main>
        <footer className="mx-auto max-w-4xl px-5 pb-12 sm:px-8">
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
