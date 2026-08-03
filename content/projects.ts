import type { Project } from './types'

export const projects: Project[] = [
  {
    slug: 'wildlife-intrusion',
    title: 'Wildlife Intrusion Detection System',
    summary:
      'Real-time system fusing YOLOv8n object detection, DeepSORT multi-object tracking, and PIR/ultrasonic sensors to detect and alert on wild animal intrusion.',
    stack: ['YOLOv8n', 'DeepSORT', 'PIR', 'Ultrasonic', 'Python'],
    metrics: [
      {
        value: '-67%',
        label: 'False positives',
        source: 'vs vision-only baseline, IEEE Xplore, RAEEUCCI-2026',
      },
      {
        value: '13,879',
        label: 'Images / 14 classes',
        source: 'Custom dataset, IEEE Xplore, RAEEUCCI-2026',
      },
    ],
    links: [],
    date: 'Apr 2026',
    image: null,
    featured: true,
    repoVerified: false,
  },
  {
    slug: 'traffic-management',
    title: 'Intelligent Traffic Management System',
    summary:
      'IoT-based traffic management integrating YOLO object detection, LiDAR speed estimation, and acoustic sensors to prioritize emergency vehicles.',
    stack: ['YOLO', 'LiDAR', 'Acoustic sensors', 'IoT'],
    metrics: [],
    links: [],
    date: 'Oct 2024',
    image: null,
    featured: false,
    repoVerified: false,
  },
  {
    slug: 'marine-surveillance',
    title: 'Aerial Marine Surveillance',
    summary:
      'YOLOv10 detection with DeepSORT tracking to identify humans and unusual activity in drone footage over marine environments, focused on detection robustness in challenging conditions.',
    stack: ['YOLOv10', 'DeepSORT', 'Python'],
    metrics: [],
    links: [],
    date: 'Nov 2024',
    image: null,
    featured: false,
    repoVerified: false,
  },
  {
    slug: 'ddos-detection',
    title: 'LSTM-Based Distributed DDoS Detection',
    summary:
      'LSTM model over multi-source network telemetry, using online learning with incremental streaming ingestion and gradient updates to reduce model drift without full retraining.',
    stack: ['LSTM', 'TensorFlow', 'Streaming ingestion'],
    metrics: [
      { value: '94%', label: 'Detection accuracy', source: 'Project measurement, Apr 2024' },
      { value: '<50ms', label: 'Inference latency', source: 'Project measurement, Apr 2024' },
    ],
    links: [],
    date: 'Apr 2024',
    image: null,
    featured: false,
    repoVerified: false,
  },
  {
    slug: 'sign-language',
    title: 'Real-Time Sign Language Interpretation',
    summary:
      'MediaPipe Holistic landmark extraction with OpenCV preprocessing and LSTM classification, optimized for latency through batching and quantization and deployed as a full browser-based inference pipeline.',
    stack: ['MediaPipe', 'OpenCV', 'LSTM', 'Quantization'],
    metrics: [],
    links: [],
    date: 'Dec 2023 – Jan 2024',
    image: null,
    featured: false,
    repoVerified: false,
  },
  {
    slug: 'job-platform',
    title: 'Job Application Platform',
    summary:
      'Full-stack application tracking platform. This is the production deployment evidence that the ML projects alone do not demonstrate.',
    stack: ['Next.js', 'Node.js', 'PostgreSQL', 'Vercel', 'Railway'],
    metrics: [],
    links: [],
    date: '2025',
    image: null,
    featured: false,
    repoVerified: false,
  },
]

/**
 * The flagship. Throws at module load if the featured project is missing, so a
 * bad edit to `projects` fails the build rather than rendering an empty hero.
 */
const featured = projects.find((p) => p.featured)
if (!featured) {
  throw new Error('content/projects.ts: exactly one project must have featured: true')
}
export const featuredProject: Project = featured

/** Everything except the flagship, for the "Other projects" section. */
export const otherProjects: Project[] = projects.filter((p) => !p.featured)
