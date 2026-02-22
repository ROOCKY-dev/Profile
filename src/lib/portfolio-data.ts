import { PROJECTS, ProjectData } from './project-data';

// Re-export for backward compatibility
export type Project = ProjectData;
export { PROJECTS };

export interface TechItem {
  name: string;
  category: 'CORE' | 'TOOLS' | 'LANGUAGES' | 'GAME_ENGINES' | 'INFRASTRUCTURE';
}

export interface Capability {
  title: string;
  description: string;
  icon: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: 'Ahmed Husam Ghaithan',
    alias: 'ROOCKY dev',
    role: 'Creative Thinker & Tech Enthusiast',
    location: 'Malaysia',
    email: 'letsbuild@roocky.dev',
    socials: {
      github: 'https://github.com/ROOCKY-dev/',
      instagram: 'https://www.instagram.com/roocky_dev/',
      wa: 'https://wa.link/jpl25x'
    }
  },
  hero: {
    title: ['VIBECODER' , 'STUDENT' , 'GAMER' ], // Split for the layout
    subtitle: '<System.Init> Portfolio_v3.0',
    description: 'Crafting immersive digital experiences. Bridging the gap between Imagination and reality'
  },
  marquee: [
    '1+ YEARS EXP',
    '1+ MAJOR PROJECTS',
    'AI / VibeCoding',
    'Cyber Security Student @ UNITEN',
    'AVAILABLE FOR WORK'
  ],
  capabilities: [
    {
      title: 'Game Mechanics',
      description: 'Designing complex gameplay loops and systems for immersive player experiences.',
      icon: 'videogame_asset'
    },
    {
      title: 'Administrative',
      description: 'Expertise in server administration, Linux, Ubuntu and Game servers.',
      icon: 'dns'
    },
    {
      title: 'AI Development',
      description: 'Strong Grab over ai tools and vibeCoding agents.',
      icon: 'layers'
    },
    {
      title: 'Minecraft Mods Development',
      description: 'making minecraft mods for NeoForge and Fabric',
      icon: 'brush'
    }
  ],
  // Projects are now sourced from project-data.ts
  projects: PROJECTS,
  techStack: {
    core: [
      { name: 'C++', category: 'LANGUAGES' },
      { name: 'Java', category: 'LANGUAGES' },
      { name: 'C#', category: 'LANGUAGES' },
      { name: 'WebDev', category: 'STACKS' },
      { name: 'Git', category: 'TOOLS' },
    ],
    tools: [
      { name: 'Unity', category: 'GAME_ENGINES' },
      { name: 'Linux', category: 'INFRASTRUCTURE' },
      { name: 'Blender', category: 'TOOLS' },
    ],
    AI: [
      { name: 'Lovable', category: 'TOOLS' },
      { name: 'AntiGravity', category: 'TOOLS' },
      { name: 'CursorCode', category: 'TOOLS' },
      { name: 'ClaudCode', category: 'TOOLS' },
      { name: 'Ollama', category: 'TOOLS' },
    ]
  },
  /*
 Options :
  AVAILABLE
  STUDYING
  WORKING
  RESTING
  */
  stat:{ status : 'WORKING' }
};
