import type { Credential } from './types'

export const credentials: Credential[] = [
  {
    kind: 'publication',
    title:
      'Multimodal Integration of Sensors with Computer Vision to Detect and Alert Wild Animal Intrusion',
    venue:
      'IEEE Xplore: oral presentation at RAEEUCCI-2026, SRM Institute of Science and Technology, Chennai',
    // No DOI supplied. Deliberately null rather than invented.
    identifier: null,
    date: 'Apr 2026',
    isoDate: '2026-04',
    href: null,
  },
  {
    kind: 'patent',
    title: 'IoT-based traffic management system',
    venue: 'Indian Patent',
    identifier: 'Application No. 202441075847',
    date: 'Oct 2024',
    isoDate: '2024-10',
    href: null,
  },
]
