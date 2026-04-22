export interface ProjectData {
  id: string;
  n: string;
  title: string;
  category: string;
  year: string;
  description: string;
  longDescription?: string;
  image?: string;
  gallery?: string[];
  tags?: string[];
  role?: string;
  stack?: string[];
  link?: string;
  featured?: boolean;
  status?: 'WORKING' | 'AVAILABLE' | 'STUDYING' | 'RESTING' | 'IN PROGRESS';
  duotone: { a: string; b: string };
  glyph: string;
  tagline: string;
}

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
    tags: ['Minecraft', 'AI', 'Modding', 'Java'],
    role: 'Lead Developer',
    stack: ['Java', 'NeoForge', 'Google AntiGravity', 'OpenAI'],
    link: 'https://modrinth.com/mod/stackerforge',
    featured: true,
    duotone: { a: '#0A0A0A', b: '#8A6A3A' },
    glyph: 'SF',
    tagline: 'Blocks that stack themselves.',
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
    tags: ['Next.js', 'React', 'Framer Motion', 'Tailwind', 'AI'],
    role: 'Designer & Developer',
    stack: ['Next.js', 'React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    link: 'https://roocky.dev',
    featured: true,
    duotone: { a: '#0A0A0A', b: '#3A4A6A' },
    glyph: 'P4',
    tagline: 'This site. Recursion intentional.',
  },
  {
    id: 'anvil',
    n: '03',
    title: 'ANVIL',
    category: 'PRIVATE TOOLING',
    year: '2026',
    description: 'Private workshop tooling project. Details under wraps for now.',
    longDescription: 'Anvil is a private tooling project — a workshop companion that keeps recurring jobs running quietly in the background. Writeup coming once it ships publicly.',
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
    tags: ['AI', 'Productivity', 'React'],
    role: 'Author',
    stack: ['React', 'Claude', 'Local-first'],
    status: 'IN PROGRESS',
    duotone: { a: '#0A0A0A', b: '#6A4A6A' },
    glyph: 'RF',
    tagline: 'Plan. Focus. Ship.',
  },
];
