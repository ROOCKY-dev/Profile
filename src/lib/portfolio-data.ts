import { PROJECTS, ProjectData } from './project-data';

export type Project = ProjectData;
export { PROJECTS };

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
      wa: 'https://wa.link/jpl25x',
    },
  },
  portfolio: { issue: 'No. 04', version: 'v4.0', year: '2026' },
  roles: ['VIBECODER', 'STUDENT', 'GAMER', 'MODDER'],
  marquee: [
    '1+ YEARS EXP',
    '2 SHIPPED PROJECTS',
    'AI / VIBECODING',
    'CYBER SEC @ UNITEN',
    'AVAILABLE FOR COLLAB',
    'REMOTE FRIENDLY',
    'BASED IN MALAYSIA',
  ],
  ticker: [
    'PORTFOLIO No. 04 — ISSUE 01 / VOL. IV',
    '24/7 WORKSHOP — LIGHTS ON',
    'NOW BUILDING — PORTFOLIO REDESIGN',
  ],
  stats: [
    { num: '02', label: 'Projects Shipped', sub: 'MC mods · web · AI' },
    { num: '01+', label: 'Years Shipping', sub: 'Full-stack + gamedev' },
    { num: 'MY', label: 'Kuala Lumpur', sub: 'Remote-friendly' },
  ],
  capabilities: [
    {
      n: '01', key: 'AI',
      verb: 'Ship AI-driven apps',
      sentence: ['Utilizing', 'AI tools', 'to build AI-driven apps, pipelines & automations.'],
      tools: ['Claude Code', 'Cursor', 'Antigravity', 'Ollama', 'OpenAI'],
      blurb: 'Integrating LLMs into production workflows, from automated content pipelines to intelligent coding agents that ship faster than traditional teams.'
    },
    {
      n: '02', key: 'GAME',
      verb: 'Make worlds & mods',
      sentence: ['Writing', 'mod & engine code', 'for Minecraft mods, systems and gameplay loops.'],
      tools: ['Java', 'NeoForge', 'Fabric', 'C#', 'Unity', 'Blender'],
      blurb: 'Crafting complex mechanics and immersive environments. Specializing in Java-based modding for Minecraft and C# systems within Unity.'
    },
    {
      n: '03', key: 'WEB',
      verb: 'Ship fast websites',
      sentence: ['Building with', 'a modern web stack', 'to ship fast, type-heavy, honest websites.'],
      tools: ['TypeScript', 'Next.js', 'React 19', 'Tailwind', 'Framer Motion'],
      blurb: 'Developing high-performance, accessible, and visually striking web experiences using the latest React ecosystem and Swiss-inspired design principles.'
    },
    {
      n: '04', key: 'OPS',
      verb: 'Keep servers on',
      sentence: ['Running', 'Linux & server tooling', 'so things stay up 24/7 without babysitting.'],
      tools: ['Linux', 'Ubuntu', 'Docker', 'Git', 'C++'],
      blurb: 'Managing robust server environments and deployment pipelines to ensure maximum uptime and security for 24/7 digital products.'
    },
  ],
  projects: PROJECTS,
  services: [
    { n: '01', title: 'Minecraft Mod', desc: 'Custom NeoForge / Fabric mods, from mechanic to release on Modrinth.', price: 'FROM $300', tt: '2–4 WEEKS' },
    { n: '02', title: 'Web Build', desc: 'Marketing sites, portfolios, dashboards. Next.js, opinionated type, honest motion.', price: 'FROM $800', tt: '2–3 WEEKS' },
    { n: '03', title: 'AI Pipeline', desc: 'Practical vibecoding setups: Cursor / Claude / Ollama, codegen & content.', price: 'FROM $400', tt: '1–2 WEEKS' },
  ],
  stack: {
    LANGUAGES: ['C++', 'Java', 'C#', 'TypeScript'],
    STACKS: ['Next.js', 'React 19', 'Tailwind', 'NeoForge', 'Fabric'],
    'GAME ENGINES': ['Unity'],
    INFRASTRUCTURE: ['Linux', 'Ubuntu', 'Docker'],
    TOOLS: ['Git', 'Blender', 'OpenAI', 'AntiGravity', 'Cursor', 'Claude Code', 'Ollama'],
  },
  stat: {
    status: 'WORKING',
  },
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
};
