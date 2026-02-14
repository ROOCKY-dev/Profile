export type BotStatus = 'CODING' | 'BROWSING' | 'DISCORD' | 'GAMING' | 'OFFLINE' | 'CUSTOM';

export type FocusLevel = 'CALM' | 'NORMAL' | 'HYPER_FOCUSED';

export interface LogEntry {
  id: string;
  timestamp: string;
  type: 'INFO' | 'WARN' | 'ERROR' | 'SUCCESS';
  message: string;
}

export const STATUS_COLORS = {
  CODING: 'bg-cyan-500 shadow-cyan-500/50',
  BROWSING: 'bg-orange-500 shadow-orange-500/50',
  DISCORD: 'bg-indigo-500 shadow-indigo-500/50',
  GAMING: 'bg-green-500 shadow-green-500/50',
  OFFLINE: 'bg-zinc-700 shadow-zinc-700/50',
  CUSTOM: 'bg-pink-500 shadow-pink-500/50', // Default custom color, can be overridden
};

export const STATUS_TEXT = {
  CODING: 'Coding in VS Code',
  BROWSING: 'Browsing / Email',
  DISCORD: 'Active on Discord',
  GAMING: 'Chilling / Playing',
  OFFLINE: 'Do Not Disturb',
  CUSTOM: 'Custom Status',
};

export interface SystemState {
  status: BotStatus;
  focusLevel: FocusLevel;
  customStatus?: string;
  customColor?: string;
  errorCount: number;
}

export interface TimelineEventData {
  year: string;
  title: string;
  description: string;
  color: string;
  isEncrypted?: boolean;
}
