import type { Role } from './types'

export const experience: Role[] = [
  {
    org: 'National University of Singapore',
    // Comma rather than the middle dot: this is a job title, and a comma is how
    // one reads on a resume, which is the document a recruiter compares against.
    title: 'Academic Internship, Computer Vision',
    period: 'Dec 2023 – Jan 2024',
    summary:
      'Built a real-time sign language interpretation pipeline using MediaPipe Holistic and LSTM classification, optimized for latency and deployed for browser-based inference.',
  },
  {
    org: 'AAM India',
    title: 'Data Analyst Intern',
    period: 'Oct – Nov 2023',
    summary:
      // The computer vision claim that used to end this entry was removed on
      // 2026-08-27: Jefferson confirmed this role did not involve CV work.
      'Data collection, preprocessing and feature engineering for ML pipelines targeting defect detection.',
  },
]
