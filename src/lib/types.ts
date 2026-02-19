/**
 * Represents the current activity status of the bot/user.
 * Used to determine the visual theme and behavior of the application.
 */
export type BotStatus = 'CODING' | 'BROWSING' | 'DISCORD' | 'GAMING' | 'OFFLINE' | 'CUSTOM';

/**
 * Represents the current focus intensity level.
 * Affects animation speeds, pulse intensity, and visual effects.
 */
export type FocusLevel = 'CALM' | 'NORMAL' | 'HYPER_FOCUSED';

/**
 * Represents a single log entry in the system log or terminal output.
 */
export interface LogEntry {
  /** Unique identifier for the log entry (UUID) */
  id: string;
  /** ISO timestamp string */
  timestamp: string;
  /** Severity level of the log */
  type: 'INFO' | 'WARN' | 'ERROR' | 'SUCCESS';
  /** The log message content */
  message: string;
}

/**
 * Maps BotStatus to specific Tailwind CSS class combinations for background and shadow.
 * Used for UI indicators like status dots or badges.
 */
export const STATUS_COLORS = {
  CODING: 'bg-cyan-500 shadow-cyan-500/50',
  BROWSING: 'bg-orange-500 shadow-orange-500/50',
  DISCORD: 'bg-indigo-500 shadow-indigo-500/50',
  GAMING: 'bg-green-500 shadow-green-500/50',
  OFFLINE: 'bg-zinc-700 shadow-zinc-700/50',
  CUSTOM: 'bg-pink-500 shadow-pink-500/50', // Default custom color, can be overridden
};

/**
 * Human-readable descriptions for each BotStatus.
 * Displayed in the UI to explain the current activity.
 */
export const STATUS_TEXT = {
  CODING: 'Coding in VS Code',
  BROWSING: 'Browsing / Email',
  DISCORD: 'Active on Discord',
  GAMING: 'Chilling / Playing',
  OFFLINE: 'Do Not Disturb',
  CUSTOM: 'Custom Status',
};

/**
 * Represents the global state of the "System" (Portfolio).
 * This state drives the visualizer and status indicators.
 */
export interface SystemState {
  status: BotStatus;
  focusLevel: FocusLevel;
  /** Optional custom status text when status is 'CUSTOM' */
  customStatus?: string;
  /** Optional custom hex color when status is 'CUSTOM' */
  customColor?: string;
  /** Number of simulated or actual errors, affects visual feedback */
  errorCount: number;
}

/**
 * Data structure for a single event in the Timeline section.
 */
export interface TimelineEventData {
  year: string;
  title: string;
  description: string;
  /** Hex color code associated with the event type or era */
  color: string;
  /** If true, the description appears encrypted/obfuscated */
  isEncrypted?: boolean;
}

/**
 * Categories for filtering technical skills.
 */
export type TechCategory = 'ALL' | 'LANGUAGES' | 'GAME_ENGINES' | 'SPECIALIZATIONS' | 'INFRASTRUCTURE';

/**
 * Represents a single technical skill or tool.
 */
export interface TechItem {
  name: string;
  category: TechCategory;
  /** Proficiency level (e.g., "Advanced", "Intermediate") */
  level: string;
  /** Brief description of experience with the tool */
  description: string;
}

/**
 * Represents a project in the portfolio.
 */
export interface Project {
  title: string;
  category: string;
  /** URL to the project thumbnail image */
  image: string;
  /** URL to the project video preview (optional) */
  video: string;
  description: string;
  /** CSS classes for grid positioning (e.g., 'col-span-2') */
  className: string;
}

/**
 * Content structure for the Landing Section.
 */
export interface LandingContent {
  name: string;
  alias: string;
  roles: string[];
  statusTitle: string;
  focusTitle: string;
  modulesTitle: string;
  /** Navigation items displayed in the landing section */
  navItems: {
    label: string;
    /** Target section ID (e.g., 'info-section') or action (e.g., 'modal') */
    action: string;
    /** Tailwind class for hover color */
    colorClass: string;
  }[];
}

/**
 * Content structure for the About Me section.
 */
export interface AboutMeContent {
  title: string;
  icon: string;
  description: string; // Supports HTML
  currentFocusTitle: string;
  currentFocusIcon: string;
  currentFocusDescription: string;
  quote: string;
}
