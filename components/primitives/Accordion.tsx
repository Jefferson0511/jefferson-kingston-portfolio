'use client'

import { useId, useState } from 'react'

export type AccordionItem = {
  /** Left-hand heading, the always-visible line. */
  title: string
  /** Small line beneath the title, e.g. an organisation or a date range. */
  meta?: string
  /** Right-aligned secondary text, e.g. a period. */
  trailing?: string
  /** Revealed on expand. */
  body: string
}

type Props = {
  items: AccordionItem[]
  /** Heading level for each row's title, so the page outline stays correct. */
  headingLevel?: 3 | 4
}

/*
 * Minimal accordion in the reference's register: a clean list, a circular
 * bordered + on the far right, no boxes.
 *
 * Height animates through .accordion-panel's grid-template-rows 0fr to 1fr,
 * which is the one way CSS can transition to a content-derived height. No
 * measuring, no library, and it degrades to an instant open where the
 * transition is unsupported or reduced motion is requested.
 *
 * Accessibility, none of which the reference site bothers with:
 *  - the whole row is one <button>, so it is a single tab stop
 *  - aria-expanded reports state, aria-controls ties it to the panel
 *  - the panel keeps its id and is never removed from the DOM, so the
 *    relationship stays valid while collapsed
 *  - the + is aria-hidden, because aria-expanded already conveys the state and
 *    announcing "plus" would be noise
 */
export function Accordion({ items, headingLevel = 3 }: Props) {
  const baseId = useId()
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const Heading = headingLevel === 3 ? 'h3' : 'h4'

  return (
    <ul className="border-t border-rule">
      {items.map((item, i) => {
        const open = openIndex === i
        const panelId = `${baseId}-panel-${i}`

        return (
          <li key={item.title} className="border-b border-rule">
            <button
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenIndex(open ? null : i)}
              className="group flex w-full items-center gap-5 py-6 text-left"
            >
              <div className="min-w-0 flex-1">
                <Heading className="display text-2xl text-ink transition-colors duration-300 group-hover:text-burgundy sm:text-3xl">
                  {item.title}
                </Heading>
                {item.meta && <p className="mt-1.5 text-sm text-ink-muted">{item.meta}</p>}
              </div>

              {item.trailing && (
                <span className="num hidden shrink-0 text-[0.6875rem] text-ink-faint sm:block">
                  {item.trailing}
                </span>
              )}

              {/*
               * 44px, comfortably past the 24px WCAG 2.2 SC 2.5.8 floor. The
               * bar rotates rather than swapping glyphs, so there is nothing to
               * animate between and no layout shift.
               */}
              <span
                aria-hidden="true"
                className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full border border-edge transition-colors duration-300 group-hover:border-burgundy group-hover:bg-burgundy"
              >
                <span className="absolute h-px w-3.5 bg-ink transition-colors duration-300 group-hover:bg-paper" />
                <span
                  className={`absolute h-px w-3.5 bg-ink transition-[transform,background-color] duration-300 group-hover:bg-paper ${
                    open ? 'rotate-0' : 'rotate-90'
                  }`}
                />
              </span>
            </button>

            <div id={panelId} className="accordion-panel" data-open={open}>
              <div>
                <p className="max-w-2xl pb-7 leading-relaxed text-ink-muted">{item.body}</p>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
