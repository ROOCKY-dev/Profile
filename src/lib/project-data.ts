// ============================================================
/**
 * Centralized project data source.
 * Defines the structure and content for portfolio projects.
 */
// PROJECT DATA — Add new projects by simply appending to the array!
// ============================================================

export interface ProjectData {
  /** URL-safe slug (used in routes) */
  id: string;
  /** Display number, e.g. "01" */
  n: string;
  /** Display title */
  title: string;
  /** Category label, e.g. "MC MOD DEVELOPMENT" */
  category: string;
  /** Year string, e.g. "2024" */
  year: string;
  /** Short description shown on cards */
  description: string;
  /** Longer narrative for the detail page (falls back to description if omitted) */
  longDescription?: string;
  /** Hero / cover image URL */
  image: string;
  /** Additional gallery images for detail page */
  gallery?: string[];
  /** Tech/topic tags for filtering */
  tags?: string[];
  /** Your role in the project */
  role?: string;
  /** Technologies / tools used */
  stack?: string[];
  /** External link (repo, live demo, etc.) */
  link?: string;
  /** If true, shown in the highlighted section on the homepage */
  featured?: boolean;
  /** Status of the project (e.g., "IN PROGRESS") */
  status?: string;
  /** Duotone colors for hover effects */
  duotone?: { a: string; b: string };
  /** Short glyph identifier, e.g., "SF" */
  glyph?: string;
  /** Short catchy tagline */
  tagline?: string;
}

// ============================================================
// To add a project, just add a new object to this array ↓
// ============================================================
export const PROJECTS: ProjectData[] = [
  {
    id: 'stackerforge',
    n: '01',
    title: 'STACKERFORGE',
    category: 'MC MOD DEVELOPMENT',
    year: '2024',
    description:
      'An experiment in developing MC mods using AI that went better than expected. Used Google AntiGravity and OpenAI image-gen to ship the final product.',
    longDescription:
      'StackerForge began as a curiosity-driven experiment — could AI meaningfully assist in Minecraft mod development? The answer turned out to be a resounding yes. Leveraging Google AntiGravity for code generation and OpenAI for textures and assets, the mod went from concept to a fully playable release in record time. It challenged conventional modding workflows and opened the door to an AI-augmented creative pipeline.',
    image: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2025/02/minecraft-key-art-feature.jpg',
    tags: ['Minecraft', 'AI', 'Modding', 'Java'],
    role: 'Lead Developer',
    stack: ['Java', 'NeoForge', 'Google AntiGravity', 'OpenAI'],
    featured: true,
    duotone: { a: '#0A0A0A', b: '#8A6A3A' },
    glyph: 'SF',
    tagline: 'Blocks that stack themselves.',
    link: 'https://modrinth.com/mod/stackerforge',
  },
  {
    id: 'portfolio-v4',
    n: '02',
    title: 'PORTFOLIO V4',
    category: 'WEB DEVELOPMENT',
    year: '2026',
    description:
      "Swiss / Bauhaus high-performance portfolio — the very site you're browsing. Built with Next.js 16, React 19, Framer Motion.",
    longDescription:
      'Version 4 of the personal portfolio is a Swiss/Bauhaus rework of V3. Kinetic workshop feel, thick rules, typographic cards, live status. Built on Next.js 16 with React 19; data-driven sections make content updates painless. Ships without Three.js for a leaner, faster bundle.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80',
    tags: ['Next.js', 'React', 'Framer Motion', 'Tailwind', 'AI'],
    role: 'Designer & Developer',
    stack: ['Next.js', 'React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    featured: true,
    duotone: { a: '#0A0A0A', b: '#3A4A6A' },
    glyph: 'P4',
    tagline: 'This site. Recursion intentional.',
    link: 'https://roocky.dev',
  },
  {
    id: 'anvil',
    n: '03',
    title: 'ANVIL',
    category: 'PRIVATE TOOLING',
    year: '2026',
    description: 'Private workshop tooling project. Details under wraps for now.',
    longDescription: 'Anvil is a private tooling project — a workshop companion that keeps recurring jobs running quietly in the background. Writeup coming once it ships publicly.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80',
    tags: ['Tooling', 'Workshop'],
    role: 'Author',
    stack: ['TypeScript', 'Node', 'TBD'],
    status: 'IN PROGRESS',
    duotone: { a: '#0A0A0A', b: '#4A4A4A' },
    glyph: 'AN',
    tagline: 'Quiet workshop companion.',
  },
  {
    id: 'r-focus',
    n: '04',
    title: 'R-FOCUS',
    category: 'PRODUCTIVITY',
    year: '2026',
    description: 'AI-powered Pomodoro focus timer with Claude-generated plans, streaks, and analytics.',
    longDescription: 'R-Focus is a Pomodoro timer that plans your session with an LLM before you start — break down a task, estimate tomatoes, execute. Streak + analytics keep the feedback loop tight.',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&q=80',
    tags: ['AI', 'Productivity', 'React'],
    role: 'Author',
    stack: ['React', 'Claude', 'Local-first'],
    status: 'IN PROGRESS',
    duotone: { a: '#0A0A0A', b: '#6A4A6A' },
    glyph: 'RF',
    tagline: 'Plan. Focus. Ship.',
  },
];
