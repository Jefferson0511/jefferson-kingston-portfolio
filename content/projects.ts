import type { Project } from './types'

/*
 * Every repo URL below was verified against its README on 2026-08-26, not just
 * checked for a 200. A link resolving to a repo that contradicts its own card is
 * worse than no link at all, because it hands the reader the contradiction
 * directly. `npm run check-links` covers reachability; the claims are on us.
 */
export const projects: Project[] = [
  {
    slug: 'wildlife-intrusion',
    category: 'vision',
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
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/Jefferson0511/Multimodal-Integration-of-Sensors-with-Computer-Vision-To-Detect-and-Alert-Wild-Animal-Intrusion',
      },
    ],
    date: 'Apr 2026',
    image: null,
    featured: true,
    repoVerified: true,
  },
  {
    /*
     * This card describes what the code does. The LiDAR speed estimation and
     * acoustic sensing that used to sit here belong to the filed patent's
     * broader design, not to this repository, and presenting them as
     * implemented put a claim on the site that clicking through would
     * immediately contradict. The patent stands on its own under credentials.
     */
    slug: 'traffic-management',
    category: 'vision',
    title: 'Adaptive Traffic Signal Control',
    summary:
      'Replaces fixed-timer signals with a schedule computed from junction camera footage. Counts per-lane vehicle density with YOLOv7-tiny and SORT, detects emergency vehicles for preemption, and drives a physical Arduino signal rig over serial.',
    stack: ['YOLOv7-tiny', 'SORT', 'Arduino', 'IoT', 'Python'],
    metrics: [],
    links: [{ label: 'GitHub', href: 'https://github.com/Jefferson0511/adaptive-traffic-signal' }],
    date: 'Oct 2024',
    image: null,
    featured: false,
    repoVerified: true,
  },
  {
    slug: 'marine-surveillance',
    category: 'vision',
    title: 'Aerial Marine Surveillance',
    summary:
      'YOLOv10 detection with DeepSORT tracking to identify humans and unusual activity in drone footage over marine environments, focused on detection robustness in challenging conditions.',
    stack: ['YOLOv10', 'DeepSORT', 'Python'],
    metrics: [],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/Jefferson0511/Accurate-Object-Tracking-Framework-for-Drone-Based-Marine-Surveillance',
      },
    ],
    date: 'Nov 2024',
    image: null,
    featured: false,
    repoVerified: true,
  },
  {
    // No public repository for this one, confirmed by Jefferson. repoVerified
    // stays false, so ProjectCard falls back to the profile link rather than
    // rendering a dead href.
    slug: 'ddos-detection',
    category: 'security',
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
  /*
   * The sign language project was removed at Jefferson's request. The public
   * repo of that name is a separate VIT course project (MediaPipe Hands and a
   * Random Forest over 15 ASL letters), not the NUS work this card described,
   * so linking it would have pointed at different work while the card claimed
   * MediaPipe Holistic, an LSTM and quantization.
   *
   * Note the NUS entry in content/experience.ts still describes that pipeline.
   * It has no public repo behind it, which is fine for an employment bullet in
   * a way it is not for a project card.
   */
  {
    /*
     * Named for what the repo contains rather than the vaguer "full-stack
     * platform". A NestJS service with validated DTOs, an entity and spec files
     * is the backend evidence the ML work does not provide, and being specific
     * is what makes it useful to a backend reviewer.
     */
    slug: 'job-platform',
    category: 'backend',
    title: 'Job Application Platform',
    summary:
      'Next.js and Mantine admin front end over a NestJS REST service, with TypeORM against PostgreSQL. Validated DTOs for create, update and filter, a Job entity carrying draft state, and unit plus e2e test scaffolding.',
    stack: ['Next.js', 'NestJS', 'TypeORM', 'PostgreSQL', 'TypeScript'],
    metrics: [],
    links: [{ label: 'GitHub', href: 'https://github.com/Jefferson0511/job-application-website' }],
    date: '2025',
    image: null,
    featured: false,
    repoVerified: true,
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

/**
 * Projects with no confirmed public repo. Drives the caveat note, so the note
 * cannot drift out of step with the data the way a hardcoded sentence would.
 */
export const unverifiedProjects: Project[] = projects.filter((p) => !p.repoVerified)


