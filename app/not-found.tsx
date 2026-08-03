import Link from 'next/link'

export default function NotFound() {
  return (
    <section aria-labelledby="notfound-heading" className="py-20">
      {/*
       * The amber alert token is semantic here rather than decorative:
       * a 404 genuinely is a failed lookup.
       */}
      <p className="font-mono text-[0.6875rem] uppercase tracking-[0.15em] text-alert">
        <span className="tabular-nums">404</span>
        <span className="mx-2 text-line-strong">/</span>
        No detection
      </p>
      <h1
        id="notfound-heading"
        className="mt-2 text-[1.375rem] font-semibold tracking-[-0.012em] text-ink"
      >
        That page is not here
      </h1>
      <Link
        href="/"
        className="mt-6 inline-block rounded-sm border border-line-strong px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] text-ink transition-colors hover:border-detect hover:text-detect"
      >
        &larr; Back to the portfolio
      </Link>
    </section>
  )
}
