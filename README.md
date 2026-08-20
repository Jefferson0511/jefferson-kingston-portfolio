# Portfolio

Personal site for Jefferson David Kingston, MS Computer Science at Northeastern.
Live at **https://jefferson-kingston-portfolio.vercel.app**.

The design brief was narrow: convince a technical reader in about thirty seconds,
then give them somewhere to go if they stay. The organising idea is perception and
real-time interpretation, since that is what the work is actually about, and it
shows up in the interface rather than sitting in a tagline. Cards read as
detection boxes and lock on when you point at them. The flagship's real inference
output plays above the fold.

## Stack

Next.js 16 (App Router), React 19, TypeScript in strict mode with
`noUncheckedIndexedAccess`, Tailwind CSS v4, deployed on Vercel.

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
npm run typecheck
npm run build
npm run check-links https://your-deployment.vercel.app
```

## A few decisions worth explaining

**Content is typed, and the types enforce honesty.** `Metric.source` in
`content/types.ts` is not optional, so no figure can reach the page without
saying where it came from. Fields that are not yet written are `null` or empty
rather than filled with plausible text, and the components render a visible amber
marker in their place. The intent is that a gap is impossible to miss in
development and impossible to ship by accident.

**Two colours, enforced structurally.** `app/globals.css` defines ten semantic
tokens with their measured contrast ratios in comments. There are two separate
line tokens because one would have silently failed: borders need 3:1 under WCAG
1.4.11, text needs 4.5:1 under 1.4.3, and a single token used for both would pass
review while failing the standard. An audit later caught eight places where the
border token had been used for text at 3.43:1, which is exactly the mistake the
split exists to make findable.

**Detection boxes are CSS, not baked into images.** `BoundingBox` coordinates are
percentages, so one screenshot serves every breakpoint, labels stay crisp at any
resolution, and fixing a wrong label does not mean re-exporting a file.

**One flag controls indexing.** `launchReady` in `content/site.ts` drives both the
`robots` metadata and the `robots.txt` route. Those are two files, and flipping
one without the other is a silent half-launch, so they read the same constant. The
file also carries the checklist of what has to be true before it flips. Both
mechanisms are kept because neither covers the other's gap: a meta tag only
applies once a crawler has fetched the page, and a disallowed URL can still
surface from external links.

**Motion is opt-in and never load-bearing.** Every animation ends at the state the
element already has in the HTML, so a browser that ignores all of it still shows a
complete page. Scroll reveals use a `view()` timeline with no JavaScript, wrapped
in `@supports` so Firefox gets the static page rather than a broken one. Each
block is gated on `prefers-reduced-motion: no-preference` by hand, because a
scroll-driven animation takes its progress from scroll position and zeroing
`animation-duration` does nothing to it.

## About the demo footage

`public/wildlife-detection-demo.mp4` is **broadcast footage from the ABN Digital
YouTube channel**, with the YOLOv8n and DeepSORT pipeline run over it to produce
the visible detection boxes and track identities. It is a demonstration of the
model on found footage. **It is not from the project's own dataset**, and the
13,879-image dataset described in the case study is a separate thing. The captions
on the site say so as well. A faint channel watermark is visible beside the
detection label; it is theirs, and it has been left alone deliberately rather than
edited out.

The clip was also transcoded from `mp4v` to H.264. OpenCV's `VideoWriter` defaults
to MPEG-4 Part 2, which no browser will decode, and a file in that state still
serves a perfectly healthy `200 video/mp4` because the content type describes the
container and not the stream inside it. Worth knowing if you replace the clip.
