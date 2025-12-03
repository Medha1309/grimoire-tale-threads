/**
 * Lexer - Tokenizes command input
 * Handles quoted strings, arrows, and special characters
 */

export interface Token {
  type: 'WORD' | 'STRING' | 'ARROW' | 'SLASH' | 'NUMBER';
  value: string;
}

export function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < input.length) {
    const char = input[i];

    // Skip whitespace
    if (/\s/.test(char)) {
      i++;
      continue;
    }

    // Quoted string
    if (char === '"' || char === "'") {
      const quote = char;
      let value = '';
      i++; // Skip opening quote
      
      while (i < input.length && input[i] !== quote) {
        value += input[i];
        i++;
      }
      
      i++; // Skip closing quote
      tokens.push({ type: 'STRING', value });
      continue;
    }

    // Arrow ->
    if (char === '-' && input[i + 1] === '>') {
      tokens.push({ type: 'ARROW', value: '->' });
      i += 2;
      continue;
    }

    // Slash /
    if (char === '/') {
      tokens.push({ type: 'SLASH', value: '/' });
      i++;
      continue;
    }

    // Number
    if (/\d/.test(char)) {
      let value = '';
      while (i < input.length && /\d/.test(input[i])) {
        value += input[i];
        i++;
      }
      tokens.push({ type: 'NUMBER', value });
      continue;
    }

    // Word
    let value = '';
    while (i < input.length && /[a-zA-Z0-9_-]/.test(input[i])) {
      value += input[i];
      i++;
    }
    
    if (value) {
      // Convert to lowercase for case-insensitive commands
      tokens.push({ type: 'WORD', value: value.toLowerCase() });
    } else {
      i++; // Skip unknown character
    }
  }

  return tokens;
}
