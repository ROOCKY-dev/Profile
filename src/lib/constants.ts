import { BotStatus } from './types';

/**
 * Mapping of Bot Statuses to their canonical HEX color codes.
 * Used primarily in Canvas/WebGL contexts (Three.js) where Tailwind classes cannot be used directly.
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
 * Configuration constants for the "System Restore" mini-game.
 * Adjust these values to balance gameplay difficulty and pacing.
 */
export const GAME_CONSTANTS = {
  // Text labels that appear on "Data" particles
  DATA_LABELS: [
    'React', 'Next.js', 'Typescript', 'Node.js',
    'Postgres', 'Docker', 'AWS', 'GraphQL',
    'Tailwind', 'Three.js'
  ],

  // Progression Goals
  SCORE_TO_WIN: 500,       // Points required to trigger the "Access Granted" screen
  SCORE_PER_DATA: 100,     // Points awarded per collected data packet

  // Spawn Logic
  SPAWN_CHANCE: 0.05,      // Probability of a particle spawning per frame (0.0 - 1.0)
  GLITCH_PROBABILITY: 0.3, // Chance that a spawned particle is a "Glitch" (Bad) instead of "Data" (Good)

  // Visuals (Hex Colors)
  PLAYER_COLOR: '#06b6d4', // Cyan
  DATA_COLOR: '#22c55e',   // Green
  GLITCH_COLOR: '#ef4444', // Red

  // Physics & Dimensions
  PARTICLE_SIZE_DATA: 16,
  PARTICLE_SIZE_GLITCH: 20,
  COLLISION_DISTANCE: 30,  // Distance in pixels to trigger a collision
};
