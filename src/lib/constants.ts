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
  WIN_SCORE: 500,
  SPAWN_RATE: 0.05,
  GLITCH_CHANCE: 0.7,
  PLAYER_COLOR: '#06b6d4',
  PLAYER_SHADOW_COLOR: '#06b6d4',
  DATA_COLOR: '#22c55e',
  GLITCH_COLOR: '#ef4444',
  PLAYER_RADIUS: 12,
  COLLISION_DISTANCE: 30,
  SCORE_INCREMENT: 100,
  DATA_LABELS: [
    'React', 'Next.js', 'Typescript', 'Node.js',
    'Postgres', 'Docker', 'AWS', 'GraphQL',
    'Tailwind', 'Three.js'
  ]
};
