# 🎮 Boudoir Games - Integration Guide

## Quick Start

### Step 1: Import the Terminal Component

```typescript
import { BoudoirTerminal } from '../components/diary/BoudoirTerminal';
import { useState } from 'react';
```

### Step 2: Add State Management

```typescript
function BoudoirPage() {
  const [showTerminal, setShowTerminal] = useState(false);
  
  // ... rest of your component
}
```

### Step 3: Add Terminal Trigger

You can trigger the terminal in multiple ways:

#### Option A: Button in the Room
```typescript
<button
  onClick={() => setShowTerminal(true)}
  className="px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-mono transition-colors"
  style={{
    boxShadow: '0 0 20px rgba(236, 72, 153, 0.5)',
  }}
>
  OPEN TERMINAL
</button>
```

#### Option B: Keyboard Shortcut
```typescript
useEffect(() => {
  const handleKeyPress = (e: KeyboardEvent) => {
    // Press ` (backtick) to open terminal
    if (e.key === '`' && !showTerminal) {
      e.preventDefault();
      setShowTerminal(true);
    }
  };

  window.addEventListener('keydown', handleKeyPress);
  return () => window.removeEventListener('keydown', handleKeyPress);
}, [showTerminal]);
```

#### Option C: Interactive Object (Recommended)
```typescript
<div
  onClick={() => setShowTerminal(true)}
  className="cursor-pointer hover:scale-105 transition-transform"
  style={{
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  }}
>
  <div className="relative">
    {/* Computer/Terminal Icon */}
    <div className="text-6xl">💻</div>
    
    {/* Glowing effect */}
    <div
      className="absolute inset-0 rounded-full blur-xl opacity-50"
      style={{
        background: 'radial-gradient(circle, #ec4899, transparent)',
      }}
    />
    
    {/* Hover hint */}
    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-pink-400 text-sm font-mono whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
      Click to access terminal
    </div>
  </div>
</div>
```

### Step 4: Render the Terminal

```typescript
return (
  <div className="relative min-h-screen bg-black">
    {/* Your existing Boudoir content */}
    <div className="p-8">
      {/* Room decorations, furniture, etc. */}
    </div>

    {/* Terminal Overlay */}
    {showTerminal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <BoudoirTerminal onClose={() => setShowTerminal(false)} />
      </div>
    )}
  </div>
);
```

## Complete Example

```typescript
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BoudoirTerminal } from '../components/diary/BoudoirTerminal';
import { BoudoirAtmosphere, useBoudoirAtmosphere } from './BoudoirAtmosphere';

export const BoudoirRoom: React.FC = () => {
  const [showTerminal, setShowTerminal] = useState(false);
  const { atmospherePos, atmosphereActive } = useBoudoirAtmosphere();

  // Keyboard shortcut: Press ` to open terminal
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === '`' && !showTerminal) {
        e.preventDefault();
        setShowTerminal(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showTerminal]);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Boudoir Atmosphere */}
      <BoudoirAtmosphere active={atmosphereActive} position={atmospherePos} />

      {/* Main Content */}
      <div className="relative z-10 p-8">
        <h1 className="text-4xl font-bold text-pink-400 mb-8 font-mono">
          THE BOUDOIR
        </h1>

        {/* Interactive Terminal Computer */}
        <div className="flex items-center justify-center min-h-[60vh]">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowTerminal(true)}
            className="relative cursor-pointer"
          >
            {/* Computer Icon */}
            <div className="text-8xl">💻</div>
            
            {/* Glow Effect */}
            <motion.div
              className="absolute inset-0 rounded-full blur-2xl"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                background: 'radial-gradient(circle, #ec4899, transparent)',
              }}
            />

            {/* Hint Text */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-pink-400 text-sm font-mono whitespace-nowrap text-center"
            >
              <div>Click to access terminal</div>
              <div className="text-xs text-pink-500/70 mt-1">
                or press ` (backtick)
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Additional Boudoir Content */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Other interactive elements */}
        </div>
      </div>

      {/* Terminal Modal */}
      <AnimatePresence>
        {showTerminal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowTerminal(false)}
          >
            <div onClick={(e) => e.stopPropagation()}>
              <BoudoirTerminal onClose={() => setShowTerminal(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
```

## Styling Tips

### Terminal Positioning
```css
/* Centered (Recommended) */
.terminal-container {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

/* Bottom-right corner */
.terminal-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 50;
}

/* Full screen */
.terminal-container {
  position: fixed;
  inset: 0;
  z-index: 50;
}
```

### Custom Backdrop
```typescript
<div
  className="fixed inset-0 z-50"
  style={{
    background: 'radial-gradient(circle at center, rgba(236, 72, 153, 0.1), rgba(0, 0, 0, 0.9))',
    backdropFilter: 'blur(10px)',
  }}
>
  <BoudoirTerminal onClose={() => setShowTerminal(false)} />
</div>
```

## Advanced Features

### Auto-open on First Visit
```typescript
useEffect(() => {
  const hasVisited = localStorage.getItem('boudoir_visited');
  if (!hasVisited) {
    setTimeout(() => {
      setShowTerminal(true);
      localStorage.setItem('boudoir_visited', 'true');
    }, 2000);
  }
}, []);
```

### Terminal Notification Badge
```typescript
const { getGameStats } = useGameArchive();
const stats = getGameStats();

<div className="relative">
  <button onClick={() => setShowTerminal(true)}>
    💻 Terminal
  </button>
  {stats.totalGames > 0 && (
    <div className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
      {stats.totalGames}
    </div>
  )}
</div>
```

### Multiple Terminal Instances
```typescript
// For different rooms or contexts
<BoudoirTerminal 
  onClose={() => setShowTerminal(false)}
  initialCommand="help" // Auto-run command on open
  theme="pink" // or "purple", "green", etc.
/>
```

## Testing

### Test the Integration
1. Open the Boudoir page
2. Click the terminal trigger
3. Type `help` to see commands
4. Try `EXECUTE SNAKE` to launch Ouroboros
5. Try `EXECUTE PACMAN` to launch Haunted Pac-Man
6. Check `STATS` to see game statistics
7. Verify games are logged with `HISTORY`

### Verify Archive Integration
1. Play a few games
2. Navigate to Archive Room
3. Check that game sessions appear in the archive
4. Verify statistics are accurate

## Troubleshooting

### Terminal Not Showing
- Check z-index is high enough (50+)
- Verify state management is working
- Check for console errors

### Games Not Launching
- Ensure game components are imported
- Check for TypeScript errors
- Verify game archive hook is working

### Archive Not Saving
- Check localStorage is enabled
- Verify useGameArchive hook is called
- Check browser console for errors

## Performance Tips

1. **Lazy Load Games:** Only import game components when needed
2. **Debounce Terminal Input:** Prevent excessive re-renders
3. **Memoize Stats:** Cache game statistics calculations
4. **Optimize Animations:** Use CSS transforms over position changes

---

**Ready to integrate!** Follow this guide to add the terminal and games to your Boudoir room.
