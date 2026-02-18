/**
 * Represents the current activity status of the bot/user.
 * Used to drive visual themes and animations.
 */
export type BotStatus = 'CODING' | 'BROWSING' | 'DISCORD' | 'GAMING' | 'OFFLINE' | 'CUSTOM';

/**
 * Represents the intensity of the current activity.
 * - CALM: Low activity, slow animations.
 * - NORMAL: Standard baseline.
 * - HYPER_FOCUSED: High activity, fast/intense animations.
 */
export type FocusLevel = 'CALM' | 'NORMAL' | 'HYPER_FOCUSED';

/**
 * Structure for system log entries displayed in the console/terminal.
 */
export interface LogEntry {
  id: string;
  timestamp: string;
  type: 'INFO' | 'WARN' | 'ERROR' | 'SUCCESS';
  message: string;
}

/**
 * Mapping of statuses to Tailwind CSS classes for background and shadow colors.
 * Used for UI indicators (badges, dots).
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
 * Human-readable descriptions for each status.
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
 * The global state object representing the "system's" current condition.
 */
export interface SystemState {
  status: BotStatus;
  focusLevel: FocusLevel;
  customStatus?: string;
  customColor?: string;
  errorCount: number;
}

/**
 * Data structure for a single event in the Timeline component.
 */
export interface TimelineEventData {
  year: string;
  title: string;
  description: string;
  color: string; // Hex color for theming
  isEncrypted?: boolean; // If true, text will decrypt on scroll reveal
}

export type TechCategory = 'ALL' | 'LANGUAGES' | 'GAME_ENGINES' | 'SPECIALIZATIONS' | 'INFRASTRUCTURE';

/**
 * Represents a skill or technology in the Tech Stack.
 */
export interface TechItem {
  name: string;
  category: TechCategory;
  level: string; // e.g., 'Advanced', 'Intermediate'
  description: string;
}

/**
 * Represents a project in the portfolio.
 */
export interface Project {
  title: string;
  category: string;
  image: string;
  video: string; // URL to video preview (optional)
  description: string;
  className: string; // Grid positioning classes (e.g., 'col-span-2')
}

/**
 * Configuration for the Landing Section content.
 */
export interface LandingContent {
  name: string;
  alias: string;
  roles: string[];
  statusTitle: string;
  focusTitle: string;
  modulesTitle: string;
  navItems: {
    label: string;
    action: string; // section ID or 'modal'
    colorClass: string;
  }[];
}

/**
 * Configuration for the About Me section.
 */
export interface AboutMeContent {
  title: string;
  icon: string;
  description: string;
  currentFocusTitle: string;
  currentFocusIcon: string;
  currentFocusDescription: string;
  quote: string;
}
