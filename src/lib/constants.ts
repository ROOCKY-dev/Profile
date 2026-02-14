import { BotStatus } from './types';

/**
 * Hex color codes corresponding to each bot status.
 * Used for canvas drawing and 3D materials where Tailwind classes cannot be used directly.
 */
export const STATUS_HEX_COLORS: Record<BotStatus, string> = {
  CODING: '#06b6d4', // Cyan
  BROWSING: '#f97316', // Orange
  DISCORD: '#6366f1', // Indigo
  GAMING: '#22c55e', // Green
  OFFLINE: '#52525b', // Zinc
  CUSTOM: '#ffffff', // Default white, usually overridden by customColor prop
};

/**
 * Configuration constants for the CoreVisualizer 3D orb.
 */
export const VISUALIZER_CONSTANTS = {
  HYPER_FOCUS_COLOR: '#d946ef', // Magenta
  BASE_SCALE: 1,
  ANIMATION_SPEEDS: {
    CODING: 2,
    GAMING: 3,
    DISCORD: 1.5,
    BROWSING: 1,
    OFFLINE: 0.1,
  } as Record<BotStatus, number>,
  FOCUS_INTENSITY: {
    HYPER_FOCUSED: 2,
    NORMAL: 1,
    CALM: 0.5,
  },
};

/**
 * Configuration constants for the 'Security Breach' mini-game.
 */
export const GAME_CONSTANTS = {
  WIN_SCORE: 500,
  SCORE_PER_PACKET: 100,
  PLAYER_RADIUS: 12,
  COLLISION_DISTANCE: 30,
  SPAWN_RATE: 0.05,
  GLITCH_CHANCE: 0.3, // 1 - 0.7
  PARTICLE_SIZE: {
    DATA: 16,
    GLITCH: 20,
  },
  BASE_SPEED: {
    DATA: 2,
    GLITCH: 3,
  },
  COLORS: {
    PLAYER: '#06b6d4',
    DATA: '#22c55e',
    GLITCH: '#ef4444',
    HUD_SCORE: '#22d3ee', // cyan-400
  },
  DATA_LABELS: [
    'React', 'Next.js', 'Typescript', 'Node.js',
    'Postgres', 'Docker', 'AWS', 'GraphQL',
    'Tailwind', 'Three.js'
  ],
};
