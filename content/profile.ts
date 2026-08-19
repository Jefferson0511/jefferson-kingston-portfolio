import type { Profile } from './types'

export const profile: Profile = {
  name: 'Jefferson David Kingston',
  thesis: 'Systems that detect, track and interpret signals in real time.',
  status: 'MS Computer Science, Northeastern University',
  email: 'kingston.je@northeastern.edu',
  githubUrl: 'https://github.com/jefferson0511',
  links: [
    // Confirmed correct: repos live on this account. The Pages site at
    // jefferson0511.github.io/portfolio-website is the separate photography
    // portfolio, deliberately not linked here — different audience.
    { label: 'GitHub', href: 'https://github.com/jefferson0511' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/Jefferson-Kingston' },
  ],
  education: [
    {
      org: 'Northeastern University, Boston',
      title: 'MS Computer Science',
      period: 'Sep 2025 – May 2027 expected',
      summary: 'Graduation may extend to Dec 2027 depending on co-op timing.',
    },
    {
      org: 'Vellore Institute of Technology, Chennai',
      title: 'B.Tech Computer Science and Engineering',
      period: 'Jun 2021 – Jun 2025',
      summary: '',
    },
  ],
  bio: 'I am an MS CS student at Northeastern. My work sits across computer vision, applied ML and backend engineering, and the spread is deliberate: a model is only useful inside a system that actually runs, so I wanted to understand both halves. That has meant a published paper, a filed patent, and projects running from wildlife detection to network security to a full-stack application platform. These days I get as much out of shipping a backend that holds up in production as I do out of training a model.',
  availability:
    'Available for a Spring 2027 co-op and full-time roles starting in 2027. On an F-1 visa, authorized for CPT and OPT.',
  resumeHref: '/jefferson-kingston-resume.pdf',
}
