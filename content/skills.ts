import type { SkillGroup } from './types'

/** Grouped by category, never one flat alphabetized list. */
export const skillGroups: SkillGroup[] = [
  {
    name: 'ML / CV',
    skills: [
      'Python',
      'TensorFlow',
      'PyTorch',
      'OpenCV',
      'YOLOv8/v10',
      'DeepSORT',
      'MediaPipe',
      'LSTM',
    ],
  },
  {
    name: 'Backend / Full-stack',
    skills: ['Node.js', 'Next.js', 'PostgreSQL', 'MongoDB', 'React'],
  },
  {
    name: 'Languages',
    skills: ['Python', 'C++', 'Java', 'C', 'JavaScript', 'SQL'],
  },
  {
    name: 'Tools / Infra',
    skills: ['Docker', 'Git', 'Vercel', 'Railway'],
  },
]
