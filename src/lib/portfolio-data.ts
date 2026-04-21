import { PROJECTS, ProjectData } from './project-data';

// Re-export for backward compatibility
export type Project = ProjectData;
export { PROJECTS };

export interface TechItem {
  name: string;
  category: 'CORE' | 'TOOLS' | 'LANGUAGES' | 'GAME_ENGINES' | 'INFRASTRUCTURE' | 'STACKS';
}

export interface Capability {
  n: string;
  key: string;
  verb: string;
  sentence: string[];
  tools: string[];
}

export interface Service {
  n: string;
  title: string;
  desc: string;
  price: string;
  tt: string;
}

/**
 * Centralized data source for the portfolio website.
 * Updated to Swiss/Bauhaus v4.0 design improvements.
 */
export const PORTFOLIO_DATA = {
  personal: {
    name: 'AHMED HUSAM GHAITHAN',
    alias: 'ROOCKY.DEV',
    role: 'Creative Thinker & Tech Enthusiast',
    location: 'KUALA LUMPUR, MY',
    tz: 'Asia/Kuala_Lumpur',
    tzLabel: 'UTC+8',
    email: 'letsbuild@roocky.dev',
    socials: {
      github: 'https://github.com/ROOCKY-dev/',
      instagram: 'https://www.instagram.com/roocky_dev/',
      wa: 'https://wa.link/jpl25x'
    }
  },
  portfolio: {
    issue: 'No. 04',
    version: 'v4.0',
    year: '2026'
  },
  roles: ['VIBECODER', 'STUDENT', 'GAMER', 'MODDER'],
  marquee: [
    '1+ YEARS EXP',
    '2 SHIPPED PROJECTS',
    'AI / VIBECODING',
    'CYBER SEC @ UNITEN',
    'AVAILABLE FOR COLLAB',
    'REMOTE FRIENDLY',
    'BASED IN MALAYSIA'
  ],
  ticker: [
    'PORTFOLIO No. 04 — ISSUE 01 / VOL. IV',
    '24/7 WORKSHOP — LIGHTS ON',
    'PRESS [T] FOR TWEAKS · [→] NEXT PAGE',
    'NOW BUILDING — PORTFOLIO REDESIGN'
  ],
  stats: [
    { num: '02', label: 'Projects Shipped', sub: 'MC mods · web · AI' },
    { num: '01+', label: 'Years Shipping', sub: 'Full-stack + gamedev' },
    { num: 'MY', label: 'Kuala Lumpur', sub: 'Remote-friendly' }
  ],
  capabilities: [
    {
      n: '01', key: 'AI',
      verb: 'Ship AI-driven apps',
      sentence: ['Utilizing', 'AI tools', 'to build AI-driven apps, pipelines & automations.'],
      tools: ['Claude Code', 'Cursor', 'Antigravity', 'Ollama', 'OpenAI'],
    },
    {
      n: '02', key: 'GAME',
      verb: 'Make worlds & mods',
      sentence: ['Writing', 'mod & engine code', 'for Minecraft mods, systems and gameplay loops.'],
      tools: ['Java', 'NeoForge', 'Fabric', 'C#', 'Unity', 'Blender'],
    },
    {
      n: '03', key: 'WEB',
      verb: 'Ship fast websites',
      sentence: ['Building with', 'a modern web stack', 'to ship fast, type-heavy, honest websites.'],
      tools: ['TypeScript', 'Next.js', 'React 19', 'Tailwind', 'Framer Motion'],
    },
    {
      n: '04', key: 'OPS',
      verb: 'Keep servers on',
      sentence: ['Running', 'Linux & server tooling', 'so things stay up 24/7 without babysitting.'],
      tools: ['Linux', 'Ubuntu', 'Docker', 'Git', 'C++'],
    },
  ],
  projects: PROJECTS,
  services: [
    { n: '01', title: 'Minecraft Mod', desc: 'Custom NeoForge / Fabric mods, from mechanic to release on Modrinth.', price: 'FROM $300', tt: '2–4 WEEKS' },
    { n: '02', title: 'Web Build', desc: 'Marketing sites, portfolios, dashboards. Next.js, opinionated type, honest motion.', price: 'FROM $800', tt: '2–3 WEEKS' },
    { n: '03', title: 'AI Pipeline', desc: 'Practical vibecoding setups: Cursor / Claude / Ollama, codegen & content.', price: 'FROM $400', tt: '1–2 WEEKS' },
  ],
  status: {
    WORKING:   { label: 'WORKING',   now: 'Redesigning the portfolio — Swiss/Bauhaus style.' },
    AVAILABLE: { label: 'AVAILABLE', now: 'Open to new collaborations — mods, webs, AI pipelines.' },
    STUDYING:  { label: 'STUDYING',  now: 'Cyber Security coursework @ UNITEN — networks week.' },
    RESTING:   { label: 'RESTING',   now: 'Offline. Back on the tools in a bit.' },
  },
  log: [
    { t: '04:12', e: 'git push  portfolio-v4  origin/production' },
    { t: '03:58', e: 'refactor  Hero  →  kinetic cycling roles' },
    { t: '03:31', e: 'drop  Three.js  from bundle  (-214 KB)' },
    { t: '02:47', e: 'add  WorkshopStatus  component' },
    { t: '02:12', e: 'coffee  ++' },
    { t: '01:40', e: 'plan   →   spec/2026-04-06-portfolio.md' },
  ],
  contact: {
    methods: [
      { id: 'email', label: 'Email', value: 'letsbuild@roocky.dev', url: 'mailto:letsbuild@roocky.dev', icon: 'mail' },
      { id: 'whatsapp', label: 'WhatsApp', value: 'Chat on WhatsApp', url: 'https://wa.link/jpl25x', icon: 'chat' },
      { id: 'github', label: 'GitHub', value: '@ROOCKY-dev', url: 'https://github.com/ROOCKY-dev/', icon: 'code' },
      { id: 'instagram', label: 'Instagram', value: '@roocky_dev', url: 'https://www.instagram.com/roocky_dev/', icon: 'photo_camera' }
    ],
    resumeUrl: '#'
  }
};
