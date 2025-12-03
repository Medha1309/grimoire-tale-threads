# Haunted Art Studio - Complete Feature List

## Overview

The Cursed Atelier is a fully haunted gothic art studio with supernatural disturbances, reality-bending effects, and eerie phenomena that make creating art a truly unsettling experience.

## Haunted Features Implemented

### 1. Spectral Interference
**What it does**: Ghostly distortions appear on the canvas
- Random pixels become translucent
- Ghost-like overlays fade in and out
- Colors shift and blend mysteriously
- Occurs every ~25 seconds

### 2. Reality Tears
**What it does**: Canvas glitches and tears like reality is breaking
- Horizontal strips shift and offset
- RGB color channels split apart
- Scan-line artifacts appear
- Creates a VHS-tape-degradation effect

### 3. Mirror Dimension
**What it does**: Canvas flips horizontally for 1-2 seconds
- Your artwork suddenly mirrors itself
- Disorients the artist
- Returns to normal after brief duration
- Happens randomly during drawing

### 4. Shadow Hands
**What it does**: Dark spectral hands reach across the canvas
- Appear from edges of screen
- Slowly crawl across artwork
- Semi-transparent black silhouettes
- Disappear after 3 seconds
- Occur every ~5 seconds

### 5. Spectral Faces
**What it does**: Ghostly faces materialize in the canvas
- Faint facial features appear
- Eyes and mouth visible
- Very low opacity (barely visible)
- Fade in and out over 4 seconds
- Appear every ~15 seconds

### 6. Blood Dripping
**What it does**: Blood-red drips fall down the canvas
- Start from top edge
- Drip downward slowly
- Leave faint trails
- Occur every ~8 seconds
- Multiple drips can appear simultaneously

### 7. Whispers
**What it does**: Eerie text messages appear at bottom of screen
- Messages like "they are watching..."
- "do you see them too?"
- "the canvas remembers..."
- Fade in and out
- Appear every ~12 seconds

### 8. Canvas Decay
**What it does**: Artwork slowly ages and deteriorates
- Small decay spots appear
- Moldy green discoloration
- Happens very subtly over time
- Permanent effect (doesn't fade)
- Occurs every ~10 seconds

### 9. Possessed Brush
**What it does**: Brush draws on its own
- Random autonomous strokes appear
- Uses current brush settings
- Creates unexpected marks
- Lasts for 3 seconds
- Warning message appears
- Happens every ~15 seconds

### 10. Cursed Brush Strokes
**What it does**: Brush fights back and draws in wrong direction
- Strokes veer off in random angles
- Unpredictable line directions
- Creates chaotic, uncontrolled marks
- Part of possessed brush effect

### 11. Color Inversion
**What it does**: All colors suddenly invert to negatives
- Entire canvas becomes negative image
- Lasts for 0.8-1 second
- Very disorienting
- Returns to normal automatically

### 12. Vignette Darkening
**What it does**: Edges of canvas fade to black
- Radial gradient from center
- Creates tunnel vision effect
- Subtle and atmospheric
- Can stack with other effects

### 13. Static Noise
**What it does**: TV static overlay appears
- Random pixel noise
- Black and white interference
- Low intensity (3-5%)
- Creates analog horror aesthetic

### 14. Bleeding Colors
**What it does**: Colors bleed and drip into pixels below
- Paint appears to run down canvas
- Colors blend unnaturally
- Creates watercolor-like bleeding
- Permanent effect

### 15. Aging/Sepia Effect
**What it does**: Canvas takes on aged, vintage appearance
- Sepia tone applied
- Scratches and wear marks added
- Makes artwork look decades old
- Can be triggered randomly

### 16. Haunted Gallery - Glitching Artworks
**What it does**: Saved artworks glitch in the gallery
- Colors shift through hue spectrum
- Happens to random artworks
- Lasts 0.5 seconds
- Occurs every ~5 seconds

### 17. Haunted Gallery - Shadow Figures
**What it does**: Dark shadows obscure artworks
- Random artworks become very dark
- Pulsing black shadow overlay
- Lasts 3 seconds
- Different artwork each time
- Occurs every ~8 seconds

### 18. Atmospheric Glow
**What it does**: Pulsing background effects
- Pink/red radial gradients
- Moves around the screen
- Creates eerie ambiance
- Constant subtle animation

### 19. Brush-Specific Effects

**Blood Brush**:
- Shadow blur effect
- Variable dripping width
- Splatter patterns

**Charcoal Brush**:
- Rough texture variation
- Random width changes
- Grainy appearance

**Ink Brush**:
- Smooth, consistent strokes
- Deep black color
- Clean lines

**Scratch Brush**:
- Difference blend mode
- Inverts colors underneath
- Jagged, harsh marks

**Decay Brush**:
- Moldy green color
- Organic, spreading texture
- Aged appearance

**Ethereal Brush**:
- Glowing pink aura
- Shadow blur effect
- Ghostly transparency

## Technical Implementation

### Canvas Distortions Class
- `mirrorFlip()` - Horizontal flip
- `realityTear()` - Glitch strips and RGB split
- `spectralInterference()` - Ghostly overlay
- `applyVignette()` - Edge darkening
- `cursedBrushStroke()` - Autonomous marks
- `applyAging()` - Sepia and scratches
- `invertColors()` - Negative effect
- `addStaticNoise()` - TV static
- `applyBleeding()` - Color dripping

### Haunted Effects Component
- Shadow hands animation
- Spectral face rendering
- Blood drips animation
- Whisper text display
- Canvas decay application

### Haunted Gallery Hook
- Tracks glitching artworks
- Manages shadow effects
- Random selection algorithm
- Timed intervals

## Effect Frequencies

| Effect | Frequency | Duration |
|--------|-----------|----------|
| Possessed Brush | Every 15s | 3s |
| Shadow Hands | Every 5s | 3s |
| Spectral Face | Every 15s | 4s |
| Blood Drips | Every 8s | 5s |
| Whispers | Every 12s | 4s |
| Canvas Decay | Every 10s | Permanent |
| Mirror Flip | Every 25s | 1.5s |
| Color Inversion | Every 25s | 0.8s |
| Reality Tear | Every 25s | Instant |
| Gallery Glitch | Every 5s | 0.5s |
| Gallery Shadow | Every 8s | 3s |

## Whisper Messages

- "they are watching..."
- "do you see them too?"
- "the canvas remembers..."
- "your art will never die..."
- "something is wrong here..."
- "can you feel it?"
- "the shadows are moving..."
- "it knows your name..."
- "this place is cursed..."
- "you should not be here..."

## User Experience

### Subtle Horror
- Effects are frequent but not overwhelming
- Most effects are subtle and atmospheric
- Creates constant unease
- Never fully predictable

### Unpredictability
- Random timing prevents pattern recognition
- Multiple effects can stack
- Each session feels different
- Keeps users on edge

### Artistic Interference
- Effects genuinely affect the artwork
- Some effects are permanent (decay, bleeding)
- Others are temporary (inversion, mirror)
- Creates unique, haunted aesthetic

## Performance Considerations

- Effects are optimized with intervals
- Canvas operations are batched
- Animations use requestAnimationFrame
- No performance impact on drawing
- Smooth 60fps maintained

## Accessibility

- Effects can be overwhelming for some users
- Consider adding "Reduce Haunted Effects" toggle
- Whispers are visual only (no audio)
- All effects are visual, no flashing lights

## Future Enhancements

### Potential Additions
- Audio whispers (actual sound)
- Screamer effects (rare, opt-in)
- Collaborative haunting (multiple users)
- Cursed color palettes
- Haunted brush presets
- Reality tear animations
- More spectral figures
- Demonic symbols appearing
- Canvas breathing effect
- Time distortion
- Artwork possession (changes over time)

### Advanced Features
- AI-generated haunted elements
- Procedural horror generation
- User-triggered hauntings
- Haunting intensity slider
- Curse progression system
- Exorcism mechanics

## Design Philosophy

The haunted effects are designed to:
1. **Enhance the gothic horror aesthetic**
2. **Create genuine unease**
3. **Interfere with artistic control**
4. **Make each artwork unique**
5. **Maintain performance**
6. **Stay true to the theme**

---

**The Cursed Atelier is not just a drawing tool - it's a haunted experience where art and horror collide.**
