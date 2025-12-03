# 👁️ Dynamic Favicon System

## Overview

The dynamic favicon makes Grimr feel "aware" by changing the favicon based on user activity and app state. No images needed - everything is generated dynamically using canvas.

## Features

### 🎭 Automatic State Detection

The favicon automatically responds to:

- **Mouse Movement** → Active state (wider, alert eye)
- **Typing** → Typing state (pupil moves side to side)
- **Tab Hidden** → Watching state (narrowed, suspicious eye)
- **Inactivity** → Returns to idle after 3 seconds
- **Random Blinks** → Eye blinks every 3-10 seconds for realism

### 👁️ Eye States

1. **Idle** - Normal open eye, calm and observant
2. **Active** - Wider eye with larger pupil, alert
3. **Watching** - Narrowed eye looking to the side (when tab is hidden)
4. **Typing** - Pupil moves rapidly side to side
5. **Notification** - Red dot appears in corner
6. **Blink** - Quick closed eye animation

## Usage

### Automatic (Already Enabled)

The system initializes automatically in `main.tsx`. Just use the app normally and watch the favicon respond!

### Manual Control

```typescript
import { setFaviconState, showFaviconNotification } from '@/utils/dynamicFavicon';

// Set a specific state
setFaviconState('typing');

// Show notification
showFaviconNotification();
```

### React Hooks

```typescript
import { useFaviconNotification, useFaviconContext } from '@/hooks/useFaviconAwareness';

// In a component with notifications
const { hasNewNotification } = useNotifications();
useFaviconNotification(hasNewNotification);

// In a writing component
useFaviconContext('writing'); // Sets to typing state

// In a reading component
useFaviconContext('reading'); // Sets to watching state

// In a social component
useFaviconContext('social'); // Sets to active state
```

## Demo

Visit `/favicon-demo.html` to see all states and test the system interactively.

## Technical Details

### How It Works

1. Creates a 32x32 canvas element
2. Draws different eye designs based on state
3. Converts canvas to data URL
4. Updates the favicon link element in the DOM
5. Listens to document events for automatic state changes

### Performance

- Minimal CPU usage (only redraws on state change)
- No external images or network requests
- Canvas operations are highly optimized
- Event listeners use debouncing for idle detection

### Browser Support

Works in all modern browsers that support:
- Canvas API
- Data URLs for favicons
- Document visibility API

## Integration Examples

### Notification System

```typescript
// In your notification hook
useEffect(() => {
  if (unreadCount > 0) {
    showFaviconNotification();
  }
}, [unreadCount]);
```

### Writing Editor

```typescript
// In diary/writing components
const DiaryEditor = () => {
  useFaviconContext('writing');
  
  return (
    // Your editor JSX
  );
};
```

### Reader Component

```typescript
// In story reader
const StoryReader = () => {
  useFaviconContext('reading');
  
  return (
    // Your reader JSX
  );
};
```

## Customization

To add new states or modify existing ones, edit `src/utils/dynamicFavicon.ts`:

```typescript
// Add a new state
type FaviconState = 'idle' | 'active' | 'notification' | 'watching' | 'typing' | 'yourNewState';

// Add drawing logic
private drawYourNewState() {
  const ctx = this.ctx;
  // Your custom drawing code
}

// Add to switch statement
private draw() {
  switch (this.currentState) {
    case 'yourNewState':
      this.drawYourNewState();
      break;
    // ...
  }
}
```

## Why This Works

The dynamic favicon creates a sense of awareness because:

1. **Responds to user actions** - Feels like the app is paying attention
2. **Random blinks** - Adds organic, lifelike behavior
3. **Context awareness** - Changes based on what you're doing
4. **Subtle notifications** - Non-intrusive way to show updates
5. **Tab visibility detection** - "Watches" you when you leave

This makes Grimr feel alive and aware, enhancing the horror/gothic atmosphere without any image files or external dependencies.
