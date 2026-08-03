export default function Home() {
  return (
    <main className="min-h-screen bg-surface p-10">
      <h1 className="text-display font-sans font-semibold tracking-tight text-ink">
        Jefferson David Kingston
      </h1>
      <p className="mt-2 text-ink-muted">Inter should render here.</p>
      <p className="num mt-4 text-2xl text-detect">-67% 13,879 94% &lt;50ms</p>
      <p className="num mt-1 text-2xl text-alert">1234567890</p>
      <div className="mt-6 border-t border-line pt-4">
        <span className="border border-line-strong px-3 py-1 text-sm">line-strong border</span>
      </div>
      <a href="#" className="mt-6 inline-block bg-surface-raised px-4 py-2">
        Tab to me — focus ring must be teal
      </a>
    </main>
  )
}
