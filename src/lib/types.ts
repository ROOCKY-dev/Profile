/**
 * Represents the current activity status of the bot/user.
 */
export type BotStatus = 'CODING' | 'BROWSING' | 'DISCORD' | 'GAMING' | 'OFFLINE' | 'CUSTOM';

/**
 * Represents the current focus intensity level.
 * - CALM: Relaxed state.
 * - NORMAL: Standard working state.
 * - HYPER_FOCUSED: High intensity, 'in the zone' state.
 */
export type FocusLevel = 'CALM' | 'NORMAL' | 'HYPER_FOCUSED';

/**
 * Represents a log entry in the terminal or system logs.
 */
export interface LogEntry {
  id: string;
  timestamp: string;
  type: 'INFO' | 'WARN' | 'ERROR' | 'SUCCESS';
  message: string;
}

/**
 * Tailwind CSS classes for status indicators (background color and shadow).
 */
export const STATUS_COLORS: Record<BotStatus, string> = {
  CODING: 'bg-cyan-500 shadow-cyan-500/50',
  BROWSING: 'bg-orange-500 shadow-orange-500/50',
  DISCORD: 'bg-indigo-500 shadow-indigo-500/50',
  GAMING: 'bg-green-500 shadow-green-500/50',
  OFFLINE: 'bg-zinc-700 shadow-zinc-700/50',
  CUSTOM: 'bg-pink-500 shadow-pink-500/50', // Default custom color, can be overridden
};

/**
 * Human-readable text descriptions for each status.
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
 * Represents the global state of the system/bot.
 */
export interface SystemState {
  status: BotStatus;
  focusLevel: FocusLevel;
  customStatus?: string;
  customColor?: string;
  errorCount: number;
}

/**
 * Represents an event in the timeline.
 */
export interface TimelineEventData {
  year: string;
  title: string;
  description: string;
  color: string;
  isEncrypted?: boolean;
}

/**
 * Represents a project in the portfolio.
 */
export interface Project {
  title: string;
  category: string;
  image: string;
  video: string;
  description: string;
  className: string;
}

/**
 * Category for technical skills.
 */
export type TechCategory = 'ALL' | 'BACKEND' | 'GAME_DEV' | 'SYS_ADMIN';

/**
 * Represents a technical skill item.
 */
export interface TechItem {
  name: string;
  category: TechCategory;
  level: string;
  description: string;
}
