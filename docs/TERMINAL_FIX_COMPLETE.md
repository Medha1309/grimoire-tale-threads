# Terminal Fix Complete

## Issue
Commands were case-sensitive, so "Open diary room" failed while "open diary room" worked.

## Root Cause
The lexer was not converting words to lowercase, making all commands case-sensitive.

## Fix Applied

### 1. Lexer (src/utils/terminal/lexer.ts)
```typescript
// Before
tokens.push({ type: 'WORD', value });

// After
tokens.push({ type: 'WORD', value: value.toLowerCase() });
```

Now all commands are automatically converted to lowercase.

### 2. Parser (src/utils/terminal/parser.ts)
- Removed unused `raw` property from ParsedCommand
- Added `ls` as alias for `help`
- Cleaned up return statements

### 3. Executor (src/utils/terminal/executor.ts)
- Updated help text with more commands
- Added `write` and `archive` rooms
- Removed redundant `.toLowerCase()` calls (now handled by lexer)
- Added tip about case-insensitivity

### 4. Types (src/types/terminal.ts)
- Removed `raw` property (not used)
- Kept interface clean and simple

## Commands Now Work

All these variations now work:

```bash
# Case variations
open room diary
Open room diary
OPEN ROOM DIARY
Open Room Diary

# All rooms
open room diary
open room write
open room scrapbook
open room art
open room archive

# Shortcuts
help
ls
clear
home
```

## Testing

Try these commands in the terminal:

1. `Open room diary` ✓ (was failing, now works)
2. `OPEN ROOM WRITE` ✓
3. `help` ✓
4. `ls` ✓ (shows help)
5. `clear` ✓
6. `home` ✓

## Available Commands

### Navigation
- `open room diary` - View diary entries
- `open room write` - Start writing
- `open room scrapbook` - View scrapbook
- `open room art` - Open art studio
- `open room archive` - Browse archive

### Utility
- `help` - Show all commands
- `ls` - Same as help
- `clear` - Clear terminal output
- `home` - Return to home

### Aliases
- `art` = `studio`
- `bookmarks` = `books` = `saved`

## Summary

The terminal now:
- ✅ Works with any case (Open, open, OPEN)
- ✅ Has better help text
- ✅ Supports more rooms (write, archive)
- ✅ Has `ls` shortcut
- ✅ Cleaner code

Try it now - type "Open room diary" and it will work! 🎉
