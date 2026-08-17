/**
 * Resolves every external URL the site can render, plus every local asset it
 * references, and reports what actually works.
 *
 * Run with:  node scripts/check-links.mjs
 *            node scripts/check-links.mjs https://jefferson-kingston-portfolio.vercel.app
 *
 * Passing an origin also checks the deployed assets over HTTP instead of the
 * local filesystem, which is the only way to catch a file that exists on disk
 * but was never deployed.
 *
 * Exits non-zero on any failure so the launch gate can depend on it.
 */
import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const origin = process.argv[2]?.replace(/\/$/, '') ?? null

/*
 * Content is read as text and scraped rather than imported.
 *
 * Importing it would mean compiling TypeScript first, and would run the
 * module-load guard in content/projects.ts. A checker that cannot run until the
 * app is in a valid state is useless for finding out why it is not, so this
 * stays deliberately dumb and dependency-free.
 */
function read(relative) {
  const path = join(root, relative)
  return existsSync(path) ? readFileSync(path, 'utf8') : ''
}

const sources = [
  'content/profile.ts',
  'content/projects.ts',
  'content/credentials.ts',
  'content/caseStudy.ts',
  'content/site.ts',
]
const text = sources.map(read).join('\n')

// Every https URL in single or double quotes.
const urls = [...new Set([...text.matchAll(/['"](https:\/\/[^'"\s]+)['"]/g)].map((m) => m[1]))]

// Every rooted asset path, e.g. '/jefferson-kingston-resume.pdf'.
const assets = [...new Set([...text.matchAll(/['"](\/[a-z0-9][^'"\s]*\.[a-z0-9]+)['"]/gi)].map((m) => m[1]))]

/*
 * Routes are enumerated by walking app/ for page files rather than scraped out
 * of content with a regex. An earlier version matched the featured slug by
 * pattern and silently found nothing, which meant the case study route went
 * unchecked while the run still reported success — the exact failure a link
 * checker exists to prevent. The filesystem is the actual source of truth for
 * what routes exist.
 */
function findRoutes(dir, segments = []) {
  const found = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      // Route groups (parens) and private folders (underscore) add no segment.
      const skip = entry.name.startsWith('(') || entry.name.startsWith('_')
      found.push(...findRoutes(join(dir, entry.name), skip ? segments : [...segments, entry.name]))
    } else if (/^page\.(tsx|ts|jsx|js)$/.test(entry.name)) {
      found.push('/' + segments.join('/'))
    }
  }
  return found
}

const routes = [...findRoutes(join(root, 'app')), '/robots.txt', '/sitemap.xml', '/opengraph-image']

const results = []

async function probe(url, label) {
  try {
    /*
     * HEAD first, then GET on rejection. Some hosts — GitHub among them — answer
     * HEAD with 403 or 405 while serving GET perfectly well, so a HEAD-only
     * checker invents failures. `redirect: 'follow'` is the default and is what
     * we want: a repo that has been renamed still resolves, and reporting the
     * final URL makes the rename visible.
     */
    let res = await fetch(url, { method: 'HEAD', redirect: 'follow' })
    if (res.status === 403 || res.status === 405) {
      res = await fetch(url, { method: 'GET', redirect: 'follow' })
    }
    const redirected = res.url.replace(/\/$/, '') !== url.replace(/\/$/, '')
    results.push({
      ok: res.ok,
      url,
      label,
      status: res.status,
      note: redirected ? `-> ${res.url}` : '',
    })
  } catch (error) {
    results.push({ ok: false, url, label, status: 'ERR', note: error.message })
  }
}

const jobs = urls.map((url) => probe(url, 'external'))

for (const asset of assets) {
  if (origin) {
    jobs.push(probe(origin + asset, 'asset'))
  } else {
    const path = join(root, 'public', asset)
    results.push({
      ok: existsSync(path),
      url: asset,
      label: 'asset (local)',
      status: existsSync(path) ? 'on disk' : 'MISSING',
      note: '',
    })
  }
}

if (origin) for (const route of routes) jobs.push(probe(origin + route, 'route'))

await Promise.all(jobs)

results.sort((a, b) => Number(a.ok) - Number(b.ok) || a.url.localeCompare(b.url))

console.log(origin ? `Checking against ${origin}\n` : 'Checking local files and external URLs\n')
for (const r of results) {
  console.log(
    `${r.ok ? 'PASS' : 'FAIL'}  ${String(r.status).padEnd(8)} ${r.label.padEnd(13)} ${r.url} ${r.note}`,
  )
}

const failed = results.filter((r) => !r.ok)
console.log(`\n${results.length - failed.length} passed, ${failed.length} failed`)

if (!origin) {
  console.log('\nNote: no origin given, so assets were checked on disk only.')
  console.log('A file present locally may still be missing from the deployment.')
}

process.exit(failed.length > 0 ? 1 : 0)
