import { BotStatus } from './types';

/**
 * Maps each BotStatus to a specific hex color code.
 * Used for the CoreVisualizer and other canvas-based elements.
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
 * Constants governing the gameplay mechanics and visuals in the GameCanvas component.
 */
export const GAME_CONSTANTS = {
  /** Labels that appear on collected data particles */
  DATA_LABELS: [
    'React', 'Next.js', 'Typescript', 'Node.js',
    'Postgres', 'Docker', 'AWS', 'GraphQL',
    'Tailwind', 'Three.js'
  ],
  /** Score required to trigger the "Win" state */
  SCORE_TO_WIN: 500,
  /** Points awarded per collected data particle */
  SCORE_PER_DATA: 100,
  /** Probability (0-1) of a particle spawning per frame */
  SPAWN_CHANCE: 0.05,
  /** Probability (0-1) that a spawned particle is a glitch (enemy) */
  GLITCH_PROBABILITY: 0.3,

  PLAYER_COLOR: '#06b6d4',
  DATA_COLOR: '#22c55e',
  GLITCH_COLOR: '#ef4444',

  PARTICLE_SIZE_DATA: 16,
  PARTICLE_SIZE_GLITCH: 20,

  /** Distance in pixels to trigger a collision between player and particle */
  COLLISION_DISTANCE: 30,
};

/**
 * Background color stops for the InfoSection scroll animation.
 * Transitions from Dark Cyan -> Purple -> Red -> Green.
 */
export const INFO_SECTION_BG_COLORS = [
  "rgba(10, 20, 30, 1)", // Dark Cyan/Black (About)
  "rgba(10, 20, 30, 1)", // Dark Cyan/Black (Timeline)
  "rgba(20, 10, 30, 1)", // Dark Purple (Tech)
  "rgba(30, 10, 10, 1)", // Dark Red (Projects)
  "rgba(5, 20, 10, 1)"   // Dark Green (End)
];

/**
 * Glow color stops for the InfoSection scroll animation.
 * Corresponds to the background color transitions.
 */
export const INFO_SECTION_GLOW_COLORS = [
  "rgba(0, 100, 255, 0.1)", // Blue Glow
  "rgba(0, 100, 255, 0.1)", // Blue Glow
  "rgba(200, 0, 255, 0.1)", // Purple Glow
  "rgba(255, 0, 100, 0.1)", // Red/Pink Glow
  "rgba(0, 255, 100, 0.1)"  // Green Glow
];
