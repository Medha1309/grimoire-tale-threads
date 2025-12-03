# Dollhouse Terminal System

A command-line interface embedded in the Dollhouse that allows power users to navigate and control the app using text commands.

## 🎯 Overview

The terminal appears as a vintage CRT monitor at the top of the Dollhouse home view, featuring:
- Phosphor green text on black background
- Scanline effects and subtle glow
- Typewriter boot-up sequence
- Command history with arrow keys
- Real-time command execution

## 🎬 Animation Sequence

1. **0-2.5s**: Dollhouse flicker animation
2. **2.5s**: Terminal appears and begins boot sequence
3. **2.5-3.3s**: Boot text types out:
   - "SYSTEM INITIALIZING..."
   - "DOLLHOUSE OS v1.0"
   - "Type 'help' for commands"
4. **3.5s+**: Title and rooms fade in below

## 📝 Available Commands

### Navigation
```bash
open room diary          # Open the diary room
open room scrapbook      # Open scrapbook
open room art            # Open art studio
open room bookmarks      # Open saved books

goto [location]          # Navigate to location
back                     # Return to previous view
home                     # Return to home
```

### Content Creation
```bash
write "text" -> diary    # Create diary entry
write "text" -> library  # Create story
new diary                # New diary entry
new scrapbook            # New scrapbook entry
```

### Information
```bash
list diary               # List diary entries
list scrapbook           # List scrapbook entries
search [query]           # Search content
stats                    # Show statistics
```

### System
```bash
help                     # Show all commands
help [command]           # Show specific command help
clear                    # Clear terminal
history                  # Show command history
```

## 🏗️ Architecture

### Three-Layer System

**1. Lexer** (`src/utils/terminal/lexer.ts`)
- Tokenizes input into meaningful parts
- Handles quoted strings, arrows, numbers
- Returns array of typed tokens

**2. Parser** (`src/utils/terminal/parser.ts`)
- Converts tokens into structured commands
- Pattern matches command types
- Returns ParsedCommand object

**3. Executor** (`src/utils/terminal/executor.ts`)
- Executes parsed commands
- Calls navigation handlers
- Returns success/error messages

### Component Structure

```
src/
├── components/
│   └── terminal/
│       └── DollhouseTerminal.tsx    # Main terminal UI
├── utils/
│   └── terminal/
│       ├── lexer.ts                 # Tokenization
│       ├── parser.ts                # Command parsing
│       └── executor.ts              # Command execution
└── types/
    └── terminal.ts                  # Type definitions
```

## 🎨 Visual Design

- **Frame**: Ornate Victorian border with amber/zinc gradient
- **Screen**: Black background with green phosphor text
- **Effects**: 
  - Scanline animation (8s loop)
  - Subtle glow pulse
  - CRT curvature (subtle)
- **Input**: Large, easy-to-click input field
- **Output**: Last 3 commands shown with success/error indicators

## 🔮 Future Enhancements

- [ ] Link diary/scrapbook entries
- [ ] Export to PDF
- [ ] Version history viewer
- [ ] Batch operations
- [ ] Command aliases (shortcuts)
- [ ] Tab completion
- [ ] Search functionality
- [ ] Statistics dashboard
- [ ] Easter eggs (summon ghost, seance, etc.)

## 💡 Usage Tips

- Use **up/down arrows** to cycle through command history
- Commands are **case-insensitive**
- Quoted strings preserve spaces: `write "hello world" -> diary`
- Type `help` to see all available commands
- Terminal works alongside traditional UI - use whichever you prefer

## 🎮 Power User Benefits

- **Speed**: Navigate faster than clicking
- **Efficiency**: Chain multiple operations
- **Discovery**: Learn app structure through commands
- **Cool Factor**: Feels like a tiny OS inside a haunted house
