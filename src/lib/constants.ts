import { BotStatus } from './types';

export const STATUS_HEX_COLORS: Record<BotStatus, string> = {
  CODING: '#06b6d4', // Cyan
  BROWSING: '#f97316', // Orange
  DISCORD: '#6366f1', // Indigo
  GAMING: '#22c55e', // Green
  OFFLINE: '#52525b', // Zinc
  CUSTOM: '#ffffff', // Default white, usually overridden by customColor prop
};
