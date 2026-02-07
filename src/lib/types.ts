export type BotStatus = 'IDLE' | 'THINKING' | 'WORKING' | 'ALERT' | 'OFFLINE';

export interface LogEntry {
  id: string;
  timestamp: string;
  type: 'INFO' | 'WARN' | 'ERROR' | 'SUCCESS';
  message: string;
}

export const STATUS_COLORS = {
  IDLE: 'bg-cyan-500 shadow-cyan-500/50',
  THINKING: 'bg-purple-500 shadow-purple-500/50',
  WORKING: 'bg-orange-500 shadow-orange-500/50',
  ALERT: 'bg-red-500 shadow-red-500/50',
  OFFLINE: 'bg-zinc-700 shadow-zinc-700/50',
};

export const STATUS_TEXT = {
  IDLE: 'Standby Mode',
  THINKING: 'Processing...',
  WORKING: 'Executing Tasks',
  ALERT: 'System Attention Required',
  OFFLINE: 'Offline',
};
