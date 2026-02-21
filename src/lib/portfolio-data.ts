export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  image: string;
  link?: string;
}

export interface TechItem {
  name: string;
  category: 'CORE' | 'TOOLS' | 'LANGUAGES' | 'GAME_ENGINES' | 'INFRASTRUCTURE';
}

export interface Capability {
  title: string;
  description: string;
  icon: string; // Material Symbol name
}

export const PORTFOLIO_DATA = {
  personal: {
    name: 'Ahmed Husam Ghaithan',
    alias: 'ROOCKY dev',
    role: 'Game Developer & Systems Architect',
    location: 'Malaysia', // From bio
    email: 'hello@roocky.dev', // Placeholder or extract if available
    socials: {
      github: '#',
      linkedin: '#',
      twitter: '#'
    }
  },
  hero: {
    title: ['GAME', 'DEV', 'ARCHITECT'], // Split for the layout
    subtitle: '<System.Init> Portfolio_v2.0',
    description: 'Crafting immersive digital experiences. Bridging the gap between technical logic and creative game design.'
  },
  marquee: [
    '3+ YEARS EXP',
    '3 MAJOR PROJECTS',
    'UNITY / UNREAL',
    'AVAILABLE FOR HIRE'
  ],
  capabilities: [
    {
      title: 'Game Mechanics',
      description: 'Designing complex gameplay loops and systems for immersive player experiences.',
      icon: 'videogame_asset'
    },
    {
      title: 'Infrastructure',
      description: 'Expertise in server administration, Linux, and scalable backend architecture.',
      icon: 'dns'
    },
    {
      title: 'UI/UX Design',
      description: 'Creating user-centric interfaces that feel alive and responsive.',
      icon: 'layers'
    }
  ],
  projects: [
    {
      id: 'planetary-claim',
      title: 'PLANETARY CLAIM',
      category: 'GAME DEV',
      year: '2025',
      description: 'An ambitious MMO-RTS project built in Unity with an AI-first development philosophy.',
      image: 'https://images.unsplash.com/photo-1614726365723-49cfae963956?w=800&q=80'
    },
    {
      id: 'minecraft-ecosystems',
      title: 'MC ECOSYSTEMS',
      category: 'INFRASTRUCTURE',
      year: '2024',
      description: 'High-performance server architecture with custom mods and unique gameplay loops.',
      image: 'https://images.unsplash.com/photo-1623479322729-28b25c16b011?w=800&q=80'
    },
    {
      id: 'problem-marketplace',
      title: 'PROBLEM MARKET',
      category: 'WEB APP',
      year: '2025',
      description: 'A platform connecting users facing technical hurdles with developers.',
      image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&q=80'
    }
  ],
  techStack: {
    core: [
      { name: 'Unity', category: 'GAME_ENGINES' },
      { name: 'Unreal Engine', category: 'GAME_ENGINES' },
      { name: 'C++', category: 'LANGUAGES' },
      { name: 'Java', category: 'LANGUAGES' },
      { name: 'Python', category: 'LANGUAGES' }
    ],
    tools: [
      { name: 'Linux', category: 'INFRASTRUCTURE' },
      { name: 'Git', category: 'TOOLS' },
      { name: 'Blender', category: 'TOOLS' }, // Assumed
      { name: 'Figma', category: 'TOOLS' }    // Assumed
    ]
  }
};
