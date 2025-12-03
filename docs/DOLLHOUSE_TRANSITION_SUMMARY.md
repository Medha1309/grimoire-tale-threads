# Dollhouse Creepy Transition - Implementation Summary

## What Was Added

When you click on the Dollhouse link in the navigation, instead of immediately loading the page, you'll now experience a haunting multi-stage animation sequence:

### Entry Animation (First Visit Only)
1. **Door Opening** - Ornate wooden doors slowly creak open revealing darkness
2. **Eyes Appearing** - Multiple pairs of glowing pink eyes watch you from the shadows
3. **Whisper** - Ghostly text appears: "come inside... the dolls are waiting"

### Room Navigation Animation (Every Time)
When clicking on any room within the Dollhouse (Library, Scrapbook, Bookmarks, Matrix):
- Flickering candle appears
- Shadow figure passes across the screen
- "entering..." whisper text
- Quick 1.2 second transition

## Files Created

1. **src/components/diary/DollhouseTransition.tsx** - Main entry animation (5.5s)
2. **src/components/diary/RoomTransition.tsx** - Quick room navigation animation (1.2s)
3. **src/components/diary/DollhousePageWrapper.tsx** - Wrapper that manages when to show transitions

## Files Modified

1. **src/router/index.tsx** - Wrapped Dollhouse routes with transition wrapper
2. **src/pages/Dollhouse.tsx** - Added room transition logic and updated all navigation handlers

## How It Works

### Session-Based Entry Transition
- The full entry animation only plays once per browser session
- Stored in `sessionStorage` with key `dollhouseTransitionShown`
- Resets when you close the browser tab/window
- Subsequent visits in the same session skip directly to the page

### Always-On Room Transitions
- Every time you click a room, the quick candle transition plays
- Creates continuity and maintains the eerie atmosphere
- Short enough to not be annoying but impactful enough to be noticed

## Testing

To test the entry transition again:
1. Open browser console
2. Run: `sessionStorage.removeItem('dollhouseTransitionShown')`
3. Navigate to the Dollhouse page

Or simply close and reopen your browser tab.

## Design Philosophy

The transitions serve to:
- Build anticipation and tension
- Establish the dollhouse horror atmosphere
- Make navigation feel like entering a haunted space
- Reward exploration with special effects
- Maintain visual consistency across the experience

The timing is carefully balanced - long enough to create impact but short enough to not frustrate users who visit frequently.
