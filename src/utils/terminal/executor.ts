/**
 * Executor - Executes parsed commands
 */

import { parseCommand } from './parser';
import { CommandResult, CommandContext } from '../../types/terminal';

const HELP_TEXT = [
  'Available commands:',
  '',
  '  open room diary       - Open diary entries',
  '  open room write       - Start writing',
  '  open room scrapbook   - View scrapbook',
  '  open room art         - Open art studio',
  '  open room archive     - Browse archive',
  '',
  '  help / ls             - Show this help',
  '  clear                 - Clear terminal',
  '  home                  - Return home',
  '',
  'Tip: Commands are case-insensitive',
];

export function executeCommand(input: string, context: CommandContext): CommandResult {
  const command = parseCommand(input);

  switch (command.type) {
    case 'EMPTY':
      return { command: input, success: true, output: [] };

    case 'HELP':
      return { command: input, success: true, output: HELP_TEXT };

    case 'CLEAR':
      return { command: input, success: true, output: ['Terminal cleared'] };

    case 'HISTORY':
      return { command: input, success: true, output: ['Command history feature coming soon'] };

    case 'STATS':
      return { 
        command: input, 
        success: true, 
        output: [
          'Boudoir Statistics:',
          'Feature coming soon...',
        ] 
      };

    case 'OPEN_ROOM': {
      const room = command.args[0];
      const roomMap: Record<string, string> = {
        diary: 'diary',
        write: 'write',
        scrapbook: 'scrapbook',
        art: 'art',
        studio: 'art',
        archive: 'archive',
        bookmarks: 'bookmarks',
        books: 'bookmarks',
        saved: 'bookmarks',
      };

      if (roomMap[room]) {
        context.onNavigate(roomMap[room]);
        return { 
          command: input, 
          success: true, 
          output: [`Opening ${room} room...`] 
        };
      }

      return { 
        command: input, 
        success: false, 
        output: [`Unknown room: ${room}`, 'Try: diary, write, scrapbook, art, archive'] 
      };
    }

    case 'GOTO': {
      const location = command.args[0]?.toLowerCase();
      const validLocations = ['diary', 'scrapbook', 'art', 'bookmarks', 'home'];
      
      if (validLocations.includes(location)) {
        context.onNavigate(location === 'home' ? 'home' : location);
        return { 
          command: input, 
          success: true, 
          output: [`Navigating to ${location}...`] 
        };
      }

      return { 
        command: input, 
        success: false, 
        output: [`Unknown location: ${location}`] 
      };
    }

    case 'BACK':
    case 'HOME':
      context.onNavigate('home');
      return { 
        command: input, 
        success: true, 
        output: ['Returning home...'] 
      };

    case 'WRITE': {
      const [content, target] = command.args;
      
      if (!content) {
        return { 
          command: input, 
          success: false, 
          output: ['Usage: write "your text" -> diary'] 
        };
      }

      // Navigate to write view
      context.onNavigate('write');
      
      return { 
        command: input, 
        success: true, 
        output: [`Creating new ${target} entry...`, 'Opening editor...'] 
      };
    }

    case 'NEW': {
      const itemType = command.args[0] || 'diary';
      
      if (itemType === 'diary') {
        context.onNavigate('write');
        return { 
          command: input, 
          success: true, 
          output: ['Opening diary editor...'] 
        };
      }

      return { 
        command: input, 
        success: false, 
        output: [`Creating ${itemType} not yet supported`] 
      };
    }

    case 'LIST': {
      const itemType = command.args[0] || 'all';
      return { 
        command: input, 
        success: true, 
        output: [`Listing ${itemType}...`, 'Feature coming soon'] 
      };
    }

    case 'SEARCH': {
      const query = command.args[0];
      return { 
        command: input, 
        success: true, 
        output: [`Searching for: ${query}`, 'Feature coming soon'] 
      };
    }

    case 'LINK':
      return { 
        command: input, 
        success: true, 
        output: ['Linking feature coming soon'] 
      };

    case 'UNKNOWN':
    default:
      return { 
        command: input, 
        success: false, 
        output: [`Unknown command: ${command.args[0] || input}`, "Type 'help' for available commands"] 
      };
  }
}
