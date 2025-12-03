# Library Torch Lighting Enhanced + New Classic Books

## Changes Made

### 1. Enhanced Torch Lighting Effect ✨

Made the torch cursor look like it's actually illuminating a darker room:

**Darker Base Lighting:**
- Increased darkness from `0.7` to `0.9` opacity when torch is inactive
- Increased darkness from `0.65` to `0.85` opacity around the torch when active
- Reduced illuminated radius from 400px to 350px for more dramatic contrast

**Brighter, More Realistic Torch:**
- Added 5 layers of light for realistic torch effect:
  1. **Outer glow** (800px) - Warm ambient light
  2. **Main torch light** (600px) - Primary illumination
  3. **Inner bright core** (350px) - Focused brightness
  4. **Flickering flame** (180px) - Animated pulse effect
  5. **Hot center** (80px) - Brightest point with blur

**Result:**
- Room now appears much darker
- Torch creates a dramatic pool of warm, flickering light
- Feels like you're actually exploring a dark library with a torch
- More immersive horror atmosphere

### 2. Added 5 Classic Public Domain Books 📚

Added these copyright-free classics to the library:

#### The Tell-Tale Heart by Edgar Allan Poe (1843)
- **Genre**: Horror
- **Cover**: Creepy eye GIF
- Psychological horror about guilt and madness
- The beating heart metaphor

#### The Yellow Wallpaper by Charlotte Perkins Gilman (1892)
- **Genre**: Horror
- **Cover**: Wallpaper pattern GIF
- Feminist horror classic
- Woman's descent into madness

#### The Monkey's Paw by W. W. Jacobs (1902)
- **Genre**: Horror
- **Cover**: Mysterious hand GIF
- Classic cursed wish story
- "Be careful what you wish for"

#### The Masque of the Red Death by Edgar Allan Poe (1842)
- **Genre**: Horror
- **Cover**: Red death themed GIF
- Plague allegory
- Seven colored rooms symbolism

#### The Signal-Man by Charles Dickens (1866)
- **Genre**: Mystery
- **Cover**: Train/railway GIF
- Victorian ghost story
- Premonition horror

### Files Modified

1. **src/data/seedStories.ts** - Added 5 new classic stories
2. **src/pages/Stories.tsx** - Enhanced darkness overlay
3. **src/components/library/TorchEffect.tsx** - Improved torch lighting with 5 layers

### Why These Changes?

**Lighting Enhancement:**
- Creates more dramatic atmosphere
- Makes the torch feel functional and necessary
- Enhances the horror/mystery vibe
- More immersive exploration experience

**Classic Books:**
- All public domain (no copyright issues)
- Literary masterpieces everyone should read
- Perfect for horror-themed platform
- Adds cultural/educational value
- GIFs from Giphy (safe to use)

## Testing

To see the changes:
1. Navigate to the Library/Stories page
2. Move your cursor to activate the torch
3. Notice the much darker room and brighter torch effect
4. Scroll through the books - you'll see 5 new classics!

## Technical Details

### Torch Lighting Layers
```
Layer 1: 800px - Outer warm glow (rgba(255,180,80,0.4))
Layer 2: 600px - Main torch light (rgba(255,210,120,0.65))
Layer 3: 350px - Inner bright core (rgba(255,230,160,0.85))
Layer 4: 180px - Flickering flame (rgba(255,245,210,0.95))
Layer 5: 80px - Hot center (rgba(255,250,230,1))
```

### Darkness Overlay
```
Inactive: rgba(0,0,0,0.9) - 90% dark
Active: radial-gradient from transparent to rgba(0,0,0,0.85)
Radius: 350px illuminated area
```

## Before vs After

**Before:**
- Room was moderately dark (70% opacity)
- Torch was subtle
- Didn't feel like you needed the torch
- 3 demo stories only

**After:**
- Room is very dark (90% opacity)
- Torch is bright and warm with realistic layers
- Torch feels essential for navigation
- 8 total stories (3 demo + 5 classics)
- More dramatic, immersive atmosphere

Enjoy exploring the darker, more atmospheric library! 🕯️📚👻
