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
  bio: null,
  availability: null,
  resumeHref: '/jefferson-kingston-resume.pdf',
}
