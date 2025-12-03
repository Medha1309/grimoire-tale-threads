# Dollhouse Transition - Quick Start

## What You'll See

### First Time Visiting Dollhouse
1. Click "Diary" in the navigation
2. Watch the creepy door opening animation (2s)
3. See glowing eyes appear in the darkness (1.5s)
4. Read the whisper: "come inside... the dolls are waiting" (1.5s)
5. Dollhouse page loads

### Navigating Between Rooms
Every time you click a room (Library, Scrapbook, Bookmarks, Matrix):
1. Flickering candle appears
2. Shadow figure passes by
3. "entering..." whisper
4. New room loads (1.2s total)

## Testing

### Test Entry Animation Again

**Method 1: Clear session storage**
```javascript
// In browser console:
sessionStorage.removeItem('dollhouseTransitionShown');
// Then navigate to Diary page
```

**Method 2: Close and reopen tab**
Close and reopen your browser tab, then visit the Dollhouse.

**Method 3: Use incognito/private window**
Open an incognito/private browsing window and navigate to the Dollhouse.

### Debugging
Check the browser console for transition logs:
- `🚪 Dollhouse transition started` - Transition component mounted
- `👁️ Transition: Eyes stage` - Eyes appearing
- `💬 Transition: Whisper stage` - Whisper text
- `✅ Transition: Complete` - Transition finishing
- `🏠 Transition: Calling onComplete` - Page loading

If you don't see these logs, the transition isn't running.

## Files to Check

If you want to customize the animations:

- **Entry animation timing**: `src/components/diary/DollhouseTransition.tsx` (lines 18-30)
- **Room animation timing**: `src/components/diary/RoomTransition.tsx` (line 13)
- **Disable entry transition**: `src/components/diary/DollhousePageWrapper.tsx` (comment out lines 36-40)
- **Disable room transitions**: `src/pages/Dollhouse.tsx` (replace `navigateToRoom()` with `setView()`)

## Key Features

✅ Entry animation plays once per session  
✅ Room transitions play every time  
✅ Smooth, GPU-accelerated animations  
✅ Horror-themed visual effects  
✅ Non-blocking (doesn't prevent navigation)  
✅ Session-based (resets on browser close)  

## Customization Examples

### Make Entry Animation Faster
```typescript
// In DollhouseTransition.tsx
const doorTimer = setTimeout(() => setStage('eyes'), 1000); // was 2000
const eyesTimer = setTimeout(() => setStage('whisper'), 2000); // was 3500
const whisperTimer = setTimeout(() => setStage('complete'), 3000); // was 5000
```

### Make Room Transition Slower
```typescript
// In RoomTransition.tsx
const timer = setTimeout(onComplete, 2000); // was 1200
```

### Change Whisper Text
```typescript
// In DollhouseTransition.tsx, line 235
come inside...  // Change this
the dolls are waiting  // And this
```

```typescript
// In RoomTransition.tsx, line 80
entering...  // Change this
```

## Troubleshooting

**Q: Entry animation plays every time**  
A: Check if sessionStorage is enabled in your browser. Some privacy modes disable it.

**Q: Animations are choppy**  
A: Animations use GPU acceleration. Check browser performance settings.

**Q: Want to skip animations during development**  
A: Set `sessionStorage.setItem('dollhouseTransitionShown', 'true')` in console, or comment out the transition components.

**Q: Room transitions not showing**  
A: Check that `navigateToRoom()` is being called instead of `setView()` directly.

## Performance

- Entry animation: ~5.5 seconds
- Room animation: ~1.2 seconds
- Memory impact: Minimal (components unmount after animation)
- CPU usage: Low (GPU-accelerated transforms)
- No impact on page load time (runs after page loads)
