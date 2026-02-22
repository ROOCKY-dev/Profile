// ============================================================
// PROJECT DATA — Add new projects by simply appending to the array!
// ============================================================

export interface ProjectData {
  /** URL-safe slug (used in routes) */
  id: string;
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
}

// ============================================================
// To add a project, just add a new object to this array ↓
// ============================================================
export const PROJECTS: ProjectData[] = [
  {
    id: 'StackerForge',
    title: 'STACKERFORGE',
    category: 'MC MOD DEVELOPMENT',
    year: '2024',
    description:
      'An experiment in developing MC mods using AI that went better than expected. Used Google AntiGravity and OpenAI image gen to give the final product.',
    longDescription:
      'StackerForge began as a curiosity-driven experiment — could AI meaningfully assist in Minecraft mod development? The answer turned out to be a resounding yes. Leveraging Google AntiGravity for code generation and OpenAI\'s image generation for textures and assets, the mod was brought from concept to a fully playable release in record time. The project challenged conventional modding workflows and opened the door to an AI-augmented creative pipeline.',
    image:
      'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2025/02/minecraft-key-art-feature.jpg',
    tags: ['Minecraft', 'AI', 'Modding', 'Java'],
    role: 'Lead Developer',
    stack: ['Java', 'NeoForge', 'Google AntiGravity', 'OpenAI'],
    featured: true,
  },
  {
    id: 'portfolio-v3',
    title: 'PORTFOLIO V3',
    category: 'WEB DEVELOPMENT',
    year: '2026',
    description:
      'A brutalist, high-performance portfolio built with Next.js, Three.js, and Framer Motion — the very site you\'re browsing right now.',
    longDescription:
      'Version 3 of the personal portfolio was designed from the ground up with a brutalist aesthetic, balancing raw visual impact with smooth interactivity. Built on Next.js 16 with React 19, using ai tools like google stitch for design and nano-banana for images and openclaw for deployment management it features custom cursor interactions, noise overlays, performance-level toggling, and scroll-driven animations via Framer Motion. The 3D elements are powered by React Three Fiber and drei, while post-processing adds cinematic depth. Every section is data-driven for easy content updates.',
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80',
    tags: ['Next.js', 'React', 'Three.js', 'Framer Motion', 'Tailwind', 'AI'],
    role: 'Designer & Developer',
    stack: ['Next.js', 'React 19', 'TypeScript', 'Three.js', 'Tailwind CSS', 'Framer Motion' , 'google stitch', 'nano-banana', 'openclaw'],
    link: 'https://roocky.dev',
    featured: true,
  },

];
/*
{
  id: 'my-new-project',           // URL slug → /work/my-new-project
  title: 'MY NEW PROJECT',
  category: 'WEB DEVELOPMENT',
  year: '2026',
  description: 'A short card description.',
  longDescription: 'The full story for the detail page...',
  image: 'https://example.com/cover.jpg',
  tags: ['React', 'TypeScript'],
  role: 'Full Stack Developer',
  stack: ['Next.js', 'Tailwind', 'Prisma'],
  link: 'https://example.com',
  featured: true,                  // set true to show on homepage
},

*/
