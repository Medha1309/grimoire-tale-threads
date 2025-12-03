# Curtain Animation - Troubleshooting Guide

## How to See the Curtain Animation

The curtain animation plays **once** when you first enter the Parlour. Here's how to see it:

### Method 1: Hard Refresh (Recommended)
1. Go to `http://localhost:5173/forum`
2. Press `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
3. The curtain animation will play

### Method 2: Navigate Away and Back
1. Click "Back" or go to another page (Home, Library, etc.)
2. Click "Parlour" in the navigation
3. The curtain animation will play

### Method 3: Clear State
1. Open browser DevTools (F12)
2. Go to Console tab
3. Type: `location.reload(true)`
4. Press Enter

## What You Should See

### Timing:
- **0.0s** - Black screen, curtains closed
- **0.3s** - Curtains begin to part
- **0.4s** - Text "Enter the parlour..." fades in
- **0.9s** - Second line "where secrets are whispered in shadows" appears
- **2.1s** - Curtains fully open
- **2.5s** - Animation complete, parlour revealed

### Visual Elements:
1. **Curtains**:
   - Dark velvet texture
   - Subtle vertical lines
   - 8 sparkles on each curtain that twinkle
   - Reduced red shadows (subtle, not overpowering)

2. **Text**:
   - "Enter the parlour..." - larger, blood-red glow
   - "where secrets are whispered in shadows" - smaller, fades in/out

3. **Background**:
   - Creeping darkness effect
   - Smooth curtain movement

## If You Don't See It

### Check 1: Are you on the right page?
- URL should be: `http://localhost:5173/forum`
- NOT `/` or `/stories` or `/diary`

### Check 2: Did it already play?
- The animation only plays ONCE per page load
- Refresh the page to see it again

### Check 3: Is the dev server running?
- Check terminal for `npm run dev`
- Should see: `Local: http://localhost:5173/`

### Check 4: Browser cache
- Try incognito/private mode
- Or clear browser cache

### Check 5: Console errors
- Open DevTools (F12)
- Check Console tab for errors
- If you see errors, report them

## Animation Details

### Sparkles on Curtains:
- **Count**: 8 per curtain (16 total)
- **Size**: 1px dots
- **Color**: Zinc-400 (light gray)
- **Animation**: Fade in/out + scale
- **Duration**: 2 seconds per cycle
- **Staggered**: Each sparkle starts at different time

### Curtain Texture:
- **Pattern**: Vertical lines (velvet effect)
- **Opacity**: 20%
- **Color**: White with very low opacity

### Shadows:
- **Color**: Blood red `rgba(106, 0, 0, 0.3)`
- **Reduced** from previous `0.8` to `0.3`
- **Position**: Inner edges of curtains

## Technical Details

### State Management:
```typescript
const [showCurtain, setShowCurtain] = useState(true);
```

- Starts as `true` on page load
- Set to `false` after 2.5 seconds
- Controlled by `AnimatePresence`

### Why Only Once?
The curtain is designed to play once per visit to create a dramatic entrance. This is intentional UX design - you don't want the curtain every time you navigate within the forum.

## Testing Tips

### Quick Test Loop:
1. Navigate to `/forum`
2. See curtain
3. Click "Back"
4. Click "Parlour" again
5. See curtain again

### Or:
1. Keep `/forum` open
2. Press `Ctrl + Shift + R` to hard refresh
3. See curtain
4. Repeat as needed

## Expected Behavior

✅ **Correct**:
- Curtain plays once when entering `/forum`
- Smooth 2.5 second animation
- Sparkles visible on curtains
- Text fades in with glow
- Curtains part smoothly

❌ **Not Expected**:
- Curtain plays every time you scroll
- Curtain plays when navigating between posts
- Curtain loops infinitely
- No sparkles visible
- Curtains don't move

## Summary

The curtain animation is working correctly if:
1. It plays when you first load `/forum`
2. You see sparkles twinkling on the curtains
3. Text appears with blood-red glow
4. Curtains part smoothly over 2.5 seconds
5. It doesn't play again until you refresh or navigate away and back

**To see it again**: Just refresh the page! 🎭
