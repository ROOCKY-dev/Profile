import { BotStatus } from './types';

/**
 * Status Hex Colors
 * Maps each BotStatus to a specific hexadecimal color for visualizers (Canvas/Three.js).
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
 * Status Tailwind Classes
 * Maps each BotStatus to Tailwind CSS classes for UI elements (badges, dots, etc).
 */
export const STATUS_COLORS: Record<BotStatus, string> = {
  CODING: 'bg-cyan-500 shadow-cyan-500/50',
  BROWSING: 'bg-orange-500 shadow-orange-500/50',
  DISCORD: 'bg-indigo-500 shadow-indigo-500/50',
  GAMING: 'bg-green-500 shadow-green-500/50',
  OFFLINE: 'bg-zinc-700 shadow-zinc-700/50',
  CUSTOM: 'bg-pink-500 shadow-pink-500/50',
};

/**
 * Status Description Text
 * Detailed description of the current status.
 */
export const STATUS_TEXT: Record<BotStatus, string> = {
  CODING: 'Coding in VS Code',
  BROWSING: 'Browsing / Email',
  DISCORD: 'Active on Discord',
  GAMING: 'Chilling / Playing',
  OFFLINE: 'Do Not Disturb',
  CUSTOM: 'Custom Status',
};

/**
 * Status Display Text
 * Short text displayed in the main landing section status badge.
 */
export const STATUS_DISPLAY_TEXT: Record<BotStatus, string> = {
  CODING: 'VS Code Active',
  BROWSING: 'Chrome Active',
  DISCORD: 'Discord Active',
  GAMING: 'Steam Active',
  OFFLINE: 'System Offline',
  CUSTOM: 'User Defined',
};

/**
 * Visualizer Configuration
 * Constants for the 3D Orb Visualizer animation speeds and pulse intensities.
 */
export const VISUALIZER_CONFIG = {
  SPEED: {
    CODING: 2,
    GAMING: 3,
    DISCORD: 1.5,
    BROWSING: 1,
    OFFLINE: 0.1,
    DEFAULT: 0.5,
  },
  PULSE: {
    HYPER_FOCUSED: 2,
    CALM: 0.5,
    NORMAL: 1,
  },
  FOCUS_SPEED_MULTIPLIER: {
    HYPER_FOCUSED: 2.5,
    CALM: 0.5,
  }
};

/**
 * Game Constants
 * Configuration for the "System Restore" mini-game.
 */
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
