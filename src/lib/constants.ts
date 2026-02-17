import { BotStatus } from './types';

export const STATUS_HEX_COLORS: Record<BotStatus, string> = {
  CODING: '#06b6d4', // Cyan
  BROWSING: '#f97316', // Orange
  DISCORD: '#6366f1', // Indigo
  GAMING: '#22c55e', // Green
  OFFLINE: '#52525b', // Zinc
  CUSTOM: '#ffffff', // Default white, usually overridden by customColor prop
};

export const GAME_CONSTANTS = {
  DATA_LABELS: [
    'React', 'Next.js', 'Typescript', 'Node.js',
    'Postgres', 'Docker', 'AWS', 'GraphQL',
    'Tailwind', 'Three.js'
  ],
  SCORE_TO_WIN: 500,
  SCORE_PER_DATA: 100,
  SPAWN_CHANCE: 0.05,
  GLITCH_PROBABILITY: 0.3, // 30% chance for a particle to be a glitch

  PLAYER_COLOR: '#06b6d4',
  DATA_COLOR: '#22c55e',
  GLITCH_COLOR: '#ef4444',

  PARTICLE_SIZE_DATA: 16,
  PARTICLE_SIZE_GLITCH: 20,

  COLLISION_DISTANCE: 30,
};
