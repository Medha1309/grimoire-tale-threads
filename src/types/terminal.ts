/**
 * Terminal Type Definitions
 */

export interface CommandResult {
  command: string;
  success: boolean;
  output: string[];
}

export interface CommandContext {
  onNavigate: (view: string) => void;
}

export interface ParsedCommand {
  type: CommandType;
  args: string[];
}

export type CommandType =
  | 'EMPTY'
  | 'HELP'
  | 'CLEAR'
  | 'HISTORY'
  | 'STATS'
  | 'OPEN_ROOM'
  | 'GOTO'
  | 'BACK'
  | 'HOME'
  | 'WRITE'
  | 'NEW'
  | 'LIST'
  | 'SEARCH'
  | 'LINK'
  | 'UNKNOWN';
