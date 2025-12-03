# Dollhouse Creepy Transitions

## Overview
Added haunting transition animations when navigating to and within the Dollhouse page, creating a more immersive horror experience.

## Features

### 1. Entry Transition (First Visit)
When you first navigate to the Dollhouse page in a session, you'll experience a multi-stage creepy animation:

**Stage 1: Door Opening (6 seconds)**
- Victorian dollhouse door with arched frame (matching room aesthetic)
- Pink-tinted frosted glass panels with decorative molding
- Doors slowly slide open revealing darkness
- "creak" sound effect text (larger, more visible)
- Realistic door design consistent with dollhouse rooms

**Stage 2: Eyes Appearing (4 seconds)**
- Multiple pairs of glowing pink eyes appear in the darkness
- Eyes slowly scale up and linger
- Breathing sound effect text

**Stage 3: Whisper (4 seconds)**
- Ghostly text appears: "come inside..."
- Subtitle: "the dolls are waiting"
- Large glowing pink text with intense pulsing shadow

**Total Duration:** ~14.5 seconds

The transition only plays once per browser session (stored in sessionStorage). Subsequent visits to the Dollhouse will load normally.

### 2. Room Transition (Internal Navigation)
When clicking on any room within the Dollhouse (Library, Scrapbook, Bookmarks, Matrix), a quick creepy transition plays:

**Elements:**
- Flickering candle in the center
- Shadow figure passing across the screen
- "entering..." whisper text
- Atmospheric lighting effects

**Duration:** ~3.5 seconds

This transition plays every time you navigate between rooms, creating continuity and maintaining the eerie atmosphere.

## Implementation

### Components Created

1. **DollhouseTransition.tsx**
   - Full-screen entry animation
   - Three-stage sequence
   - Handles timing and transitions

2. **RoomTransition.tsx**
   - Quick room-to-room transition
   - Candle and shadow effects
   - Minimal but atmospheric

3. **DollhousePageWrapper.tsx**
   - Wraps the Dollhouse page
   - Manages session storage
   - Shows entry transition on first visit

### Files Modified

1. **src/router/index.tsx**
   - Added DollhousePageWrapper import
   - Wrapped Dollhouse routes with transition wrapper

2. **src/pages/Dollhouse.tsx**
   - Added RoomTransition import
   - Added state for room transitions
   - Created `navigateToRoom()` helper function
   - Updated all room navigation to use transitions
   - Added transition overlay to render

## User Experience

### First Visit Flow
1. User clicks "Diary" in navigation
2. Page starts loading
3. Door opening animation plays
4. Eyes appear in darkness
5. Whisper text appears
6. Dollhouse page fades in

### Subsequent Visits
- Direct navigation to Dollhouse (no entry transition)
- Room transitions still play when navigating internally

### Room Navigation Flow
1. User clicks on a room (e.g., "View All Entries")
2. Candle flicker transition appears
3. Shadow passes across screen
4. New room view fades in

## Technical Details

### Session Management
- Entry transition shown status stored in `sessionStorage`
- Key: `dollhouseTransitionShown`
- Resets when browser tab/window is closed
- Persists across page refreshes within same session

### Performance
- Transitions use Framer Motion for smooth animations
- GPU-accelerated transforms
- Minimal DOM manipulation
- Efficient cleanup on unmount

### Accessibility
- Transitions are purely visual
- No critical information conveyed only through animation
- Content remains accessible after transitions complete
- Can be skipped by refreshing page (for subsequent visits)

## Customization

### Adjusting Timing
Edit timing in `DollhouseTransition.tsx`:
```typescript
const doorTimer = setTimeout(() => setStage('eyes'), 3500); // Door stage
const eyesTimer = setTimeout(() => setStage('whisper'), 6000); // Eyes stage
const whisperTimer = setTimeout(() => setStage('complete'), 8500); // Whisper stage
```

Edit room transition timing in `RoomTransition.tsx`:
```typescript
const timer = setTimeout(onComplete, 2000); // Total duration
```

### Disabling Transitions
To disable entry transition:
- Comment out the transition check in `DollhousePageWrapper.tsx`
- Or set `sessionStorage.setItem('dollhouseTransitionShown', 'true')` in console

To disable room transitions:
- Replace `navigateToRoom()` calls with direct `setView()` calls in `Dollhouse.tsx`

## Future Enhancements

Potential additions:
- Sound effects (actual audio)
- Different transitions for different rooms
- Random variation in transition elements
- User preference to disable transitions
- More elaborate entry sequences
- Context-aware transitions based on time of day

## Horror Design Philosophy

The transitions serve multiple purposes:
1. **Build Anticipation** - Slow reveal creates tension
2. **Establish Atmosphere** - Reinforces dollhouse horror theme
3. **Create Immersion** - Makes navigation feel like entering a haunted space
4. **Reward Exploration** - Makes discovering rooms feel special
5. **Maintain Consistency** - Unified aesthetic across all navigation

The design balances being creepy without being annoying - transitions are short enough to not frustrate users but long enough to create impact.
