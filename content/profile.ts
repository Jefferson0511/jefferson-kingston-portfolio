import type { Profile } from './types'

export const profile: Profile = {
  name: 'Jefferson David Kingston',
  // Jefferson's words. The previous version ("Systems that detect, track and
  // interpret signals in real time") was his verdict: boring and fake. Plain
  // statement of what he does, no adjectives, nothing to live up to.
  thesis: 'I build computer vision systems, and the backends that keep them running.',
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
  // The visa line came out at Jefferson's request. Fall 2026 added alongside
  // Spring 2027, so both co-op terms are covered.
  availability: 'Open to a Fall 2026 or Spring 2027 co-op, and full-time roles from 2027.',
  resumeHref: '/jefferson-kingston-resume.pdf',
}
