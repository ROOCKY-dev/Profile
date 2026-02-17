import { TimelineEventData, TechItem, Project, AboutMeContent, LandingContent } from './types';

export const timelineEvents: TimelineEventData[] = [
  {
    year: '2022 - 2024',
    title: 'Academic Foundations',
    description: 'Graduated Al-Baihani Model High-school (Aden, Yemen) with 87.75%. Served as Chess Club Manager and Sociological Support Team member, developing leadership and community skills.',
    color: '#06b6d4' // Cyan
  },
  {
    year: '2025',
    title: 'Early Technical Ventures',
    description: 'Developed "X Play station" offline web app. Launched "Denied SMP" Minecraft server. Conceptualized "IdeaSpark" SaaS. Analyzed MGM Resorts cyberattack for security project.',
    color: '#3b82f6' // Blue
  },
  {
    year: '2025 - Present',
    title: 'Current Stage',
    description: 'Pursuing B.S. in Computer Science at UNITEN (Malaysia). Leading "AetherFall" server dev. Building "Planetary Claim" MMO-RTS. Growing roocky.dev portfolio.',
    color: '#8b5cf6' // Violet
  },
  {
    year: '2026 - 2027',
    title: 'Looking Ahead',
    description: 'Targeting high-level scholarships in Netherlands, Germany, or China. Goal: Specialize in Game AI & Software Architecture in a top-tier global tech ecosystem.',
    color: '#d946ef', // Fuchsia
    isEncrypted: true
  },
];

export const TECH_STACK: TechItem[] = [
  // Languages
  { name: 'C++', category: 'LANGUAGES', level: 'Intermediate', description: 'Systems Programming & Game Logic.' },
  { name: 'Java', category: 'LANGUAGES', level: 'Senior', description: 'Enterprise Backend & Android.' },
  { name: 'Python', category: 'LANGUAGES', level: 'Advanced', description: 'AI Integration & Scripting.' },
  { name: 'JavaScript', category: 'LANGUAGES', level: 'Advanced', description: 'Web Interactivity & Logic.' },

  // Game Engines
  { name: 'Unity', category: 'GAME_ENGINES', level: 'Advanced', description: 'C# Scripting & Physics.' },
  { name: 'Unreal', category: 'GAME_ENGINES', level: 'Intermediate', description: 'Blueprints & C++.' },

  // Specializations
  { name: 'UI/UX', category: 'SPECIALIZATIONS', level: 'Advanced', description: 'User-Centric Interfaces.' },
  { name: 'Game Mech', category: 'SPECIALIZATIONS', level: 'Expert', description: 'Gameplay Loops & Systems.' },
  { name: 'AI', category: 'SPECIALIZATIONS', level: 'Intermediate', description: 'Behavior Trees & Pathfinding.' },

  // Infrastructure
  { name: 'Linux', category: 'INFRASTRUCTURE', level: 'Expert', description: 'Ubuntu Server Administration.' },
  { name: 'Minecraft', category: 'INFRASTRUCTURE', level: 'Expert', description: 'Fabric/Paper/Forge Architecture.' },
];

export const PROJECTS: Project[] = [
  {
    title: 'Planetary Claim',
    category: 'Game Dev',
    image: 'https://images.unsplash.com/photo-1614726365723-49cfae963956?w=800&q=80',
    video: '', // Placeholder
    description: 'An ambitious MMO-RTS project built in Unity. It leverages an AI-first development philosophy to create a massive, persistent strategic environment based on the core foundations of Rusted Warfare.',
    className: 'col-span-1 md:col-span-2 md:row-span-2', // Hero Item
  },
  {
    title: 'Minecraft Ecosystems',
    category: 'Infrastructure',
    image: 'https://images.unsplash.com/photo-1623479322729-28b25c16b011?w=800&q=80', // Using a blocky/voxel-like image
    video: '',
    description: 'Head Developer & Admin for high-performance servers. Developed custom mods (KubeJS, Polymer) and designed unique gameplay loops including faction wars and custom death mechanics.',
    className: 'col-span-1 md:col-span-1 md:row-span-1',
  },
  {
    title: 'Problem Marketplace',
    category: 'Web App',
    image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&q=80',
    video: '',
    description: 'A conceptual platform connecting users facing technical hurdles with developers. Built to turn real-world frustrations into innovative software solutions.',
    className: 'col-span-1 md:col-span-1 md:row-span-1', // Regular Item
  },
];

export const ABOUT_ME: AboutMeContent = {
  title: 'About Me',
  icon: '👨‍💻',
  description: 'I am a driven Computer Science student at Universiti Tenaga Nasional (UNITEN) with a passion for building complex, scalable systems and immersive digital experiences. Originally from Yemen and currently based in Malaysia, I operate under the alias <span class="text-cyan-400 font-mono">Roocky dev</span>, where I bridge the gap between technical logic and creative game design.<br/><br/>My work is defined by an AI-first approach, whether I\'m optimizing server environments or conceptualizing next-gen mechanics. I thrive at the intersection of low-level programming and high-level user experience.',
  currentFocusTitle: 'Current Focus',
  currentFocusIcon: '🎯',
  currentFocusDescription: 'I am currently deep-diving into Discrete Structures and Computer Organization while expanding my portfolio in game development. My goal is to transition into the European or Chinese tech landscapes for the 2026-2027 academic year, bringing a global perspective to software engineering.',
  quote: '"Turning complex problems into elegant code and boring games into technical masterpieces."'
};

export const LANDING_CONTENT: LandingContent = {
  name: 'Ahmed Husam Ghaithan',
  alias: '(ROOCKY dev)',
  roles: [
    'Computer Science Student',
    'Game Developer',
    'Systems Architect',
    'Gamer'
  ],
  statusTitle: 'Current Status',
  focusTitle: 'Focus Level',
  modulesTitle: 'Modules',
  navItems: [
    { label: 'Projects', action: 'info-section', colorClass: 'group-hover:text-cyan-400' },
    { label: 'About', action: 'info-section', colorClass: 'group-hover:text-cyan-400' },
    { label: 'Play Game', action: 'game-section', colorClass: 'group-hover:text-cyan-400' },
    { label: 'Contact Me', action: 'modal', colorClass: 'group-hover:text-green-400' },
    { label: 'My CV', action: '#', colorClass: 'group-hover:text-white' },
  ]
};
