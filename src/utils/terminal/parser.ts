/**
 * Parser - Converts tokens into structured commands
 */

import { tokenize } from './lexer';
import { ParsedCommand } from '../../types/terminal';

export function parseCommand(input: string): ParsedCommand {
  const tokens = tokenize(input);
  
  if (tokens.length === 0) {
    return { type: 'EMPTY', args: [] };
  }

  const firstToken = tokens[0];
  
  // Help command
  if (firstToken.value === 'help') {
    return { type: 'HELP', args: tokens.slice(1).map(t => t.value) };
  }

  // Clear command
  if (firstToken.value === 'clear' || firstToken.value === 'cls') {
    return { type: 'CLEAR', args: [] };
  }

  // History command
  if (firstToken.value === 'history') {
    return { type: 'HISTORY', args: [] };
  }

  // Stats command
  if (firstToken.value === 'stats') {
    return { type: 'STATS', args: [] };
  }

  // List / ls command (show available rooms)
  if (firstToken.value === 'list' || firstToken.value === 'ls') {
    return { 
      type: 'HELP', // Reuse help to show available commands
      args: [] 
    };
  }

  // Open room [name]
  if (firstToken.value === 'open' && tokens[1]?.value === 'room') {
    const roomName = tokens[2]?.value || '';
    return { type: 'OPEN_ROOM', args: [roomName] };
  }

  // Goto [location]
  if (firstToken.value === 'goto' || firstToken.value === 'go') {
    const location = tokens[1]?.value || '';
    return { type: 'GOTO', args: [location] };
  }

  // Back / Home
  if (firstToken.value === 'back') {
    return { type: 'BACK', args: [] };
  }

  if (firstToken.value === 'home') {
    return { type: 'HOME', args: [] };
  }

  // Write "content" -> [target]
  if (firstToken.value === 'write') {
    const stringToken = tokens.find(t => t.type === 'STRING');
    const arrowIndex = tokens.findIndex(t => t.type === 'ARROW');
    const target = arrowIndex !== -1 ? tokens[arrowIndex + 1]?.value : 'diary';
    
    if (stringToken) {
      return { type: 'WRITE', args: [stringToken.value, target] };
    }
  }

  // New [type]
  if (firstToken.value === 'new') {
    const itemType = tokens[1]?.value || 'diary';
    return { type: 'NEW', args: [itemType] };
  }

  // Link [type]/[id] to [type]/[id]
  if (firstToken.value === 'link') {
    // Parse: link diary/23 to scrapbook/9
    const toIndex = tokens.findIndex(t => t.value === 'to');
    if (toIndex !== -1) {
      const fromParts = tokens.slice(1, toIndex).map(t => t.value).join('');
      const toParts = tokens.slice(toIndex + 1).map(t => t.value).join('');
      return { type: 'LINK', args: [fromParts, toParts] };
    }
  }

  // Search [query]
  if (firstToken.value === 'search' || firstToken.value === 'find') {
    const query = tokens.slice(1).map(t => t.value).join(' ');
    return { type: 'SEARCH', args: [query] };
  }

  // Unknown command
  return { type: 'UNKNOWN', args: tokens.map(t => t.value) };
}
