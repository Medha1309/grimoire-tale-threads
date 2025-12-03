# Library Torch Lighting Enhancement

## Changes Made

### 1. Increased Darkness Overlay
**Before:**
- Dark overlay: `rgba(0,0,0,0.3)` with torch active
- Base darkness: `rgba(0,0,0,0.5)` without torch
- Opacity transitions between states

**After:**
- Dark overlay: `rgba(0,0,0,0.65)` with torch active
- Base darkness: `rgba(0,0,0,0.7)` without torch
- Removed opacity transitions for cleaner effect

**Impact:**
- Library is now noticeably darker
- Creates stronger contrast with torch light
- Books are still visible but dimmer
- Torch effect is much more dramatic

### 2. Enhanced Torch Light Brightness

**Outer Ring (Main Light):**
- Size: `600px` → `700px` (larger radius)
- Opacity: `0.4/0.2/0.1` → `0.5/0.3/0.15` (brighter)
- Coverage: `60%` → `65%` (wider spread)

**Middle Ring (Bright Core):**
- Size: `300px` → `400px` (larger)
- Opacity: `0.6/0.3` → `0.7/0.4` (brighter)
- Coverage: `60%` → `65%` (wider)

**Inner Ring (Flame Flicker):**
- Size: `150px` → `200px` (larger)
- Opacity: `0.8/0.4` → `0.9/0.5` (brighter)
- Maintains pulse animation

### 3. Improved Gradient Radius
- Torch gradient radius: `350px` → `400px`
- Creates smoother falloff from light to dark
- Better visibility transition

## Visual Result

### The Torch Effect Now:
1. **At Rest (No Torch)**: Library is quite dark (70% black overlay) - books are visible but dim
2. **With Torch**: Bright warm light follows cursor, dramatically illuminating the area
3. **Contrast**: Strong difference between lit and unlit areas
4. **Atmosphere**: Feels like exploring a dark library with a torch

### User Experience:
- **Initial State**: Dark library with instruction to move cursor
- **Movement**: Torch immediately lights up the area around cursor
- **Exploration**: Users naturally move cursor to see different books
- **Engagement**: The lighting mechanic makes browsing more interactive
- **Visibility**: Books are always readable, just dimmer without torch

## Technical Details

### Darkness Levels:
- **Without torch**: 70% darkness (books at 30% visibility)
- **With torch center**: 0% darkness (books at 100% visibility)
- **With torch edge**: 65% darkness (books at 35% visibility)

### Torch Light Layers:
1. **Outer glow**: 700px radius, warm orange fade
2. **Middle core**: 400px radius, bright yellow-orange
3. **Inner flame**: 200px radius, flickering bright center

### Performance:
- Uses CSS gradients (GPU accelerated)
- RequestAnimationFrame for smooth cursor tracking
- No performance impact from increased brightness

## Balance Achieved

✅ **Dark enough**: Torch effect is clearly visible and impactful  
✅ **Bright enough**: Books remain visible even without torch  
✅ **Interactive**: Cursor movement feels meaningful  
✅ **Atmospheric**: Creates eerie library exploration feeling  
✅ **Functional**: Users can still browse without frustration  

The sweet spot: Users can see the books without the torch, but the torch makes them significantly brighter and easier to read. This encourages interaction while maintaining usability.
