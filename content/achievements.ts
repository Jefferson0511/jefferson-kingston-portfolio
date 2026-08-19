import type { Achievement } from './types'

/*
 * Separators here are the middle dot, matching EvidenceChip. Em dashes were
 * doing this job across three content files, and an em dash mid-line is the
 * clearest signature of machine-written copy — the thing Jefferson asked to keep
 * off the page. The distinction worth holding onto: dashes were removed from
 * prose, and label separators were standardised on the one the design already
 * uses, rather than a third style being introduced.
 */
export const achievements: Achievement[] = [
  {
    title: 'Winner · "AI and Gen-AI" Ideathon, SBB CFF FFS',
    detail: 'Proposed a GenAI assistant for SAP workflows.',
  },
  {
    title: 'Finalist · Dark Patterns Hackathon',
    detail: 'Used OCR and image recognition to flag misleading e-commerce content.',
  },
]
