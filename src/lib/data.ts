import { TimelineEventData, TechItem, Project } from './types';

/**
 * Timeline of key career milestones.
 */
export const timelineEvents: TimelineEventData[] = [
  {
    year: '2019',
    title: 'Initial Boot',
    description: 'Began coding journey in Yemen. Learned Python & C++ basics.',
    color: '#06b6d4' // Cyan
  },
  {
    year: '2021',
    title: 'System Migration',
    description: 'Relocated to Malaysia. Expanded stack to React, Next.js, and Node.',
    color: '#3b82f6' // Blue
  },
  {
    year: '2023',
    title: 'Core Upgrade',
    description: 'Focus shifted to High-Performance Systems, Game Dev (Unity), and Architecture.',
    color: '#8b5cf6' // Violet
  },
  {
    year: '2025',
    title: 'Future Protocol',
    description: 'Exploring AI Integration, Neural Networks, and Advanced Graphics Programming.',
    color: '#d946ef', // Fuchsia
    isEncrypted: true
  },
];

/**
 * List of technical skills with categories and proficiency levels.
 */
export const TECH_STACK: TechItem[] = [
  { name: 'Java', category: 'BACKEND', level: 'Senior', description: 'High-performance backend systems.' },
  { name: 'Unity', category: 'GAME_DEV', level: 'Advanced', description: '3D Physics & Shaders.' },
  { name: 'C#', category: 'GAME_DEV', level: 'Advanced', description: 'Scripting & Tool Development.' },
  { name: 'Next.js', category: 'BACKEND', level: 'Intermediate', description: 'Full-stack web apps.' },
  { name: 'Node.js', category: 'BACKEND', level: 'Senior', description: 'Microservices & APIs.' },
  { name: 'Linux', category: 'SYS_ADMIN', level: 'Expert', description: 'Shell Scripting & Server Mgmt.' },
  { name: 'Docker', category: 'SYS_ADMIN', level: 'Intermediate', description: 'Containerization & CI/CD.' },
  { name: 'Python', category: 'BACKEND', level: 'Advanced', description: 'Data Analysis & Automation.' },
  { name: 'PostgreSQL', category: 'BACKEND', level: 'Intermediate', description: 'Complex Queries & Optimization.' },
  { name: 'TypeScript', category: 'BACKEND', level: 'Advanced', description: 'Type-safe scalable code.' },
  { name: 'AWS', category: 'SYS_ADMIN', level: 'Intermediate', description: 'Cloud Infrastructure.' },
  { name: 'Three.js', category: 'GAME_DEV', level: 'Intermediate', description: 'WebGL & 3D Web Experiences.' },
];

/**
 * List of featured projects.
 */
export const projects: Project[] = [
  {
    title: 'Planetary Claim',
    category: 'Game Dev',
    image: 'https://images.unsplash.com/photo-1614726365723-49cfae963956?w=800&q=80',
    video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', // Placeholder
    description: 'A 4X space exploration strategy game built with Unity & C#. Features procedural planet generation and AI factions.',
    className: 'col-span-1 md:col-span-2 md:row-span-2', // Hero Item
  },
  {
    title: 'Alto Clef',
    category: 'System Tool',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
    video: '',
    description: 'Advanced audio processing CLI for audiophiles. Written in Rust.',
    className: 'col-span-1 md:col-span-1 md:row-span-1',
  },
  {
    title: 'Neon Nexus',
    category: 'Web App',
    image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&q=80',
    video: '',
    description: 'Cyberpunk social dashboard with real-time WebSocket updates.',
    className: 'col-span-1 md:col-span-1 md:row-span-2', // Tall Item
  },
  {
    title: 'Void Walker',
    category: 'Modding',
    image: 'https://images.unsplash.com/photo-1623479322729-28b25c16b011?w=800&q=80',
    video: '',
    description: 'Content expansion mod for Minecraft adding new dimensions.',
    className: 'col-span-1 md:col-span-1 md:row-span-1',
  },
];
