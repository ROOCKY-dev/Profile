/**
 * Represents the current activity status of the bot/user.
 */
export type BotStatus = 'CODING' | 'BROWSING' | 'DISCORD' | 'GAMING' | 'OFFLINE' | 'CUSTOM';

/**
 * Represents the current focus level, affecting animation intensity.
 */
export type FocusLevel = 'CALM' | 'NORMAL' | 'HYPER_FOCUSED';

/**
 * Structure for system log entries.
 */
export interface LogEntry {
  id: string;
  timestamp: string;
  type: 'INFO' | 'WARN' | 'ERROR' | 'SUCCESS';
  message: string;
}

/**
 * Represents the full system state including status, focus, and errors.
 */
export interface SystemState {
  status: BotStatus;
  focusLevel: FocusLevel;
  customStatus?: string;
  customColor?: string;
  errorCount: number;
}

/**
 * Data structure for timeline events in the Info Section.
 */
export interface TimelineEventData {
  year: string;
  title: string;
  description: string;
  color: string;
  isEncrypted?: boolean;
}

/**
 * Categories for technical skills.
 */
export type TechCategory = 'ALL' | 'LANGUAGES' | 'GAME_ENGINES' | 'SPECIALIZATIONS' | 'INFRASTRUCTURE';

/**
 * Data structure for a technical skill item.
 */
export interface TechItem {
  name: string;
  category: TechCategory;
  level: string;
  description: string;
}

/**
 * Data structure for a project showcase item.
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
 * Content structure for the Landing Section.
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
 * Content structure for the About Me section.
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
