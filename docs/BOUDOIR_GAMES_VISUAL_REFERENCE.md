# 🎨 Boudoir Games - Visual Reference

## Color Palettes

### Ouroboros (Snake Game)
```
Primary:   #ec4899 (Pink 500)
Accent:    #f472b6 (Pink 400)
Food:      #fbbf24 (Amber 400)
Glow:      #f59e0b (Amber 500)
Background: #000000 (Pure Black)
Grid:      #ec489920 (Pink 10% opacity)
```

**Visual Style:**
- Ethereal pink serpent with gradient
- Glowing golden food particles
- Subtle grid overlay
- Pulsing glow effects
- Smooth scale animations

### Haunted Pac-Man
```
Primary:   #a855f7 (Purple 500)
Accent:    #8b5cf6 (Violet 500)
Walls:     #4c1d95 → #5b21b6 (Purple gradient)
Souls:     #fbbf24 (Amber 400)
Ghost 1:   #ef4444 (Red 500)
Ghost 2:   #8b5cf6 (Violet 500)
Ghost 3:   #ec4899 (Pink 500)
Background: #000000 (Pure Black)
```

**Visual Style:**
- Purple gradient maze walls
- Glowing ghost auras
- Pulsing soul dots
- Emoji-based characters (👻💀)
- Haunted atmosphere

### Terminal Interface
```
Background:  #000000 (Black 90% opacity)
Border:      #ec489950 (Pink 50% opacity)
Text:        #ec4899 (Pink 500)
Input:       #f472b6 (Pink 400)
Output:      #f472b680 (Pink 50% opacity)
Error:       #ef4444 (Red 500)
Header BG:   #831843 (Pink 900 30% opacity)
```

**Visual Style:**
- macOS-style window controls
- Monospace font (Courier New)
- Retro terminal aesthetic
- Glowing border effects
- Smooth backdrop blur

## Layout Specifications

### Ouroboros Game Window
```
Dimensions: 320px × 320px (20×20 grid, 16px cells)
Border: 2px solid pink with glow
Padding: 24px
Border Radius: 8px
Shadow: 0 0 40px rgba(236, 72, 153, 0.3)
```

### Haunted Pac-Man Window
```
Dimensions: 360px × 360px (15×15 grid, 24px cells)
Border: 2px solid purple with glow
Padding: 24px
Border Radius: 8px
Shadow: 0 0 40px rgba(168, 85, 247, 0.3)
```

### Terminal Window
```
Width: 100% (max 768px)
Height: 384px (content area)
Border: 2px solid pink
Border Radius: 8px
Backdrop: blur(8px)
Shadow: 0 0 40px rgba(236, 72, 153, 0.3)
```

## Animation Specifications

### Snake Movement
```typescript
// Head glow pulse
animate: {
  scale: [1, 1.1, 1],
  opacity: [0.8, 1, 0.8]
}
duration: 0.5s
repeat: Infinity
easing: ease-in-out
```

### Food Pulse
```typescript
animate: {
  scale: [1, 1.2, 1],
  opacity: [0.8, 1, 0.8]
}
duration: 1s
repeat: Infinity
easing: ease-in-out
```

### Ghost Movement
```typescript
animate: {
  scale: [1, 1.15, 1],
  opacity: [0.8, 1, 0.8]
}
duration: 0.8s
repeat: Infinity
delay: index * 0.2s
```

### Terminal Appearance
```typescript
initial: { opacity: 0, y: 20 }
animate: { opacity: 1, y: 0 }
exit: { opacity: 0, y: 20 }
duration: 0.3s
```

### Game Over Overlay
```typescript
initial: { opacity: 0, scale: 0, rotate: -180 }
animate: { opacity: 1, scale: 1, rotate: 0 }
transition: spring (damping: 10)
```

## Typography

### Terminal
```
Font Family: 'Courier New', monospace
Font Size: 14px (0.875rem)
Line Height: 1.5
Letter Spacing: normal
```

### Game Headers
```
Font Family: 'Courier New', monospace
Font Size: 24px (1.5rem)
Font Weight: bold
Letter Spacing: 0.1em
Text Transform: uppercase
```

### Score Display
```
Font Family: 'Courier New', monospace
Font Size: 18px (1.125rem)
Font Weight: normal
```

### Cryptic Messages
```
Font Family: 'Courier New', monospace
Font Size: 20px (1.25rem)
Font Weight: normal
Text Align: center
```

## Component Hierarchy

```
BoudoirTerminal
├── Terminal Header
│   ├── Window Controls (●●●)
│   └── Title (BOUDOIR_TERMINAL.EXE)
├── Terminal Content
│   ├── History Display
│   │   ├── Input Lines (pink)
│   │   ├── Output Lines (pink 80%)
│   │   └── Error Lines (red)
│   └── Scrollable Container
└── Terminal Input
    ├── Prompt (>)
    └── Input Field

OuroborosGame
├── Game Container
│   ├── Header
│   │   ├── Title (OUROBOROS.EXE)
│   │   ├── Subtitle
│   │   └── Score Display
│   ├── Game Board
│   │   ├── Grid Lines
│   │   ├── Snake Segments
│   │   ├── Food Particle
│   │   └── Game Over Overlay
│   └── Controls Info
└── Backdrop (click to close)

HauntedPacmanGame
├── Game Container
│   ├── Header
│   │   ├── Title (HAUNTED_MAZE.EXE)
│   │   ├── Subtitle
│   │   └── Score Display
│   ├── Game Board
│   │   ├── Maze Walls
│   │   ├── Soul Dots
│   │   ├── Pacman (👻)
│   │   ├── Ghosts (💀)
│   │   └── Game Over Overlay
│   └── Controls Info
└── Backdrop (click to close)
```

## Responsive Behavior

### Desktop (1024px+)
- Full-size game windows
- Centered terminal
- All animations enabled
- Full backdrop blur

### Tablet (768px - 1023px)
- Slightly smaller game windows
- Terminal width: 90%
- Reduced animation complexity
- Lighter backdrop blur

### Mobile (< 768px)
- Scaled-down game windows
- Terminal width: 95%
- Minimal animations
- No backdrop blur (performance)

## Accessibility

### Keyboard Navigation
- All games fully keyboard-controlled
- ESC to exit games
- Enter to submit terminal commands
- Tab navigation in terminal

### Visual Indicators
- High contrast text (WCAG AA compliant)
- Clear focus states
- Visible game boundaries
- Distinct color coding

### Screen Reader Support
- Semantic HTML structure
- ARIA labels on interactive elements
- Descriptive button text
- Status announcements

## Performance Optimizations

### Game Loop
```typescript
// Use requestAnimationFrame for smooth 60fps
const gameLoop = useRef<number>();

const tick = () => {
  updateGame();
  gameLoop.current = requestAnimationFrame(tick);
};

// Cleanup
return () => {
  if (gameLoop.current) {
    cancelAnimationFrame(gameLoop.current);
  }
};
```

### Rendering
- Use CSS transforms (not position)
- Minimize DOM updates
- Batch state updates
- Memoize expensive calculations

### Memory Management
- Clear intervals on unmount
- Remove event listeners
- Clean up animation frames
- Limit history length in terminal

## Browser Compatibility

### Supported Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Required Features
- CSS Grid
- CSS Transforms
- LocalStorage
- ES6+ JavaScript
- Framer Motion support

## Testing Checklist

### Visual Testing
- [ ] Colors match specification
- [ ] Animations are smooth
- [ ] Text is readable
- [ ] Borders and shadows render correctly
- [ ] Responsive layouts work

### Functional Testing
- [ ] Games launch correctly
- [ ] Controls respond properly
- [ ] Collision detection works
- [ ] Score tracking accurate
- [ ] Archive saves sessions
- [ ] Statistics calculate correctly

### Performance Testing
- [ ] 60fps game loop
- [ ] No memory leaks
- [ ] Fast terminal response
- [ ] Smooth animations
- [ ] Quick game loading

---

**Use this reference when:**
- Implementing the games
- Customizing colors
- Debugging visual issues
- Ensuring consistency
- Creating new games

**Visual Preview:** Open `public/test-boudoir-games.html` to see the design in action.
