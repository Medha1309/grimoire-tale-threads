# Terminal Visual Guide

## States

### Unfocused (Default)
```
┌─────────────────────────────────────────────────┐
│ [dark, subtle border]                           │
│                                                 │
│ 12:34 $ type 'help' or start typing...    ▊    │
│                                                 │
└─────────────────────────────────────────────────┘
  Type 'help' for all commands or try these:
  [open room diary] [open room write] [ls]
```

**Colors**:
- Background: black/80
- Border: zinc-800/60
- Text: zinc-300
- Prompt: zinc-600

### Focused (Lights Up!)
```
┌═════════════════════════════════════════════════┐ ← Pink glow!
║ [brighter, pink border, glowing]                ║
║                                                 ║
║ 12:34 $ open room di|                      █    ║ ← Pink cursor
║         └─────────────────────────┐             ║
║         │ open room diary         │             ║
║         │ Navigate to diary...    │             ║
║         └─────────────────────────┘             ║
║                                                 ║
╚═════════════════════════════════════════════════╝
  ↑↓ history • Enter to submit • Start typing...
```

**Colors**:
- Background: zinc-900/95 (lighter!)
- Border: #ffb6d9/40 (pink!)
- Shadow: Pink glow
- Text: zinc-100 (brighter!)
- Prompt: #ffb6d9 (pink!)
- Cursor: #ffb6d9 (pink, pulsing!)

### Hover (Subtle Hint)
```
┌─────────────────────────────────────────────────┐
│ [slightly lighter border]                       │
│                                                 │
│ 12:34 $ type 'help' or start typing...    ▊    │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Colors**:
- Border: zinc-700/80 (slightly lighter)

## Suggestions Dropdown

```
┌─────────────────────────────────────────────────┐
║ 12:34 $ open room di|                      █    ║
║         └─────────────────────────────┐         ║
║         │ open room diary             │         ║
║         │ Navigate to diary entries   │         ║
║         ├─────────────────────────────┤         ║
║         │ open room write             │         ║
║         │ Start writing a new entry   │         ║
║         └─────────────────────────────┘         ║
╚═════════════════════════════════════════════════╝
```

**Features**:
- Appears when typing
- Shows matching commands
- Click to auto-fill
- Descriptions included
- Max 5 suggestions shown

## Tooltips

### Time Display
```
    ┌──────────────┐
    │ Current time │
    └──────┬───────┘
           ↓
      [12:34]
```

### Prompt Symbol
```
    ┌────────────────┐
    │ Command prompt │
    └───────┬────────┘
            ↓
           [$]
```

### Input Field
```
    ┌──────────────────────────────────────────┐
    │ Type commands here. Press up/down arrows │
    │ to navigate history                      │
    └────────────────┬─────────────────────────┘
                     ↓
         [type 'help' or start typing...]
```

### Expand Button
```
    ┌──────────────────────┐
    │ Show command output  │
    └──────────┬───────────┘
               ↓
              [▲]
```

### Quick Commands
```
    ┌──────────────────────────┐
    │ Click to use: open room  │
    │ diary                    │
    └──────────┬───────────────┘
               ↓
        [open room diary]
```

## Animation Sequence

### 1. Initial Load
```
[Fade in from top]
Duration: 600ms
Delay: 3.2s
```

### 2. Focus Animation
```
Border: zinc-800 → #ffb6d9/40
Background: black/80 → zinc-900/95
Shadow: none → pink glow
Duration: 300ms
```

### 3. Cursor Pulse
```
Unfocused:
opacity: 0.6 → 0 → 0.6 (1s loop)

Focused:
opacity: 1 → 0 → 1 (1s loop)
scale: 1 → 1.1 → 1 (1s loop)
```

### 4. Suggestions Fade
```
In: opacity 0 → 1, y -10 → 0 (200ms)
Out: opacity 1 → 0, y 0 → -10 (200ms)
```

## Responsive Behavior

### Desktop (> 768px)
```
┌─────────────────────────────────────────────────┐
│ Full width, max 3xl                             │
│ All features visible                            │
│ Suggestions dropdown full width                 │
└─────────────────────────────────────────────────┘
```

### Tablet (768px - 1024px)
```
┌───────────────────────────────────────┐
│ Slightly narrower                     │
│ All features work                     │
│ Suggestions adapt                     │
└───────────────────────────────────────┘
```

### Mobile (< 768px)
```
┌─────────────────────────────┐
│ Full width with padding     │
│ Touch-friendly              │
│ Suggestions stack           │
└─────────────────────────────┘
```

## Color Palette

### Unfocused
```
Background:  #000000 (80% opacity)
Border:      #27272a (60% opacity)
Text:        #d4d4d8
Prompt:      #52525b
Placeholder: #3f3f46
Cursor:      #71717a
```

### Focused (Lights Up)
```
Background:  #18181b (95% opacity)
Border:      #ffb6d9 (40% opacity)
Shadow:      #ffb6d9 (15% opacity, 30px blur)
Text:        #fafafa
Prompt:      #ffb6d9
Placeholder: #52525b
Cursor:      #ffb6d9
```

### Suggestions
```
Background:  #18181b (95% opacity)
Border:      #ffb6d9 (30% opacity)
Command:     #ffb6d9
Description: #71717a
Hover:       #ffb6d9 (10% opacity)
```

## Interaction Flow

```
1. User sees terminal
   ↓
2. Hovers → border lightens
   ↓
3. Clicks → lights up pink!
   ↓
4. Types → suggestions appear
   ↓
5. Selects suggestion → auto-fills
   ↓
6. Presses Enter → executes
   ↓
7. Output shows → can expand/collapse
```

## Keyboard Shortcuts

```
Key         Action
───────────────────────────────
Tab         Focus terminal
Type        Show suggestions
↑           Previous command
↓           Next command
Enter       Submit command
Esc         Blur (unfocus)
Click       Select suggestion
```

## Accessibility Features

### Visual
- High contrast when focused
- Clear hover states
- Visible cursor
- Readable font sizes
- Color-blind friendly (not relying on color alone)

### Keyboard
- Full keyboard navigation
- Clear focus indicators
- Logical tab order
- Escape to exit

### Screen Readers
- Descriptive tooltips
- Button labels
- Input placeholder
- ARIA attributes

## Summary

The terminal now:
- Lights up beautifully when clicked
- Shows helpful suggestions
- Has tooltips everywhere
- Provides clear visual feedback
- Much more discoverable
- Easier to use
- More engaging

The pink glow effect makes it feel magical! ✨
