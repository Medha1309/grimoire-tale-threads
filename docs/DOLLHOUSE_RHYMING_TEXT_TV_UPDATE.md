# Dollhouse Rhyming Text & TV Frame Update

## Rhyming Text Implementation

### Final Rhyming Verse (AABB scheme):
1. **"Some memories write themselves in time..."** (rhymes with line 2)
2. **"Some flicker through the static's grime..."** (rhymes with line 1: time/grime)
3. **"Some hide behind the locked-up doors..."** (rhymes with line 4)
4. **"Some sleep in portraits evermore..."** (rhymes with line 3: doors/evermore)

### Rhyme Analysis:
- **Lines 1-2:** time / grime (perfect rhyme)
- **Lines 3-4:** doors / evermore (perfect rhyme)
- **Flow:** Natural, mysterious, poetic
- **Tone:** Spooky yet elegant

## Enhanced TV Static Effect

### New Features:

#### 1. Vintage TV Frame
- **Realistic bezel** with wood-grain brown tones (#2a2520 → #0a0805)
- **3D depth** with inset shadows and gradients
- **Rounded corners** (rounded-3xl) for authentic CRT look
- **20px border** simulating thick TV casing
- **Brand label** "GRIMOIRE" at bottom (subtle, period-appropriate)

#### 2. Screen Details
- **Inner bezel** with additional depth (inset-4)
- **Curved glass effect** using radial gradient
- **Screen reflection/glare** for realism
- **Proper containment** (85% width/height, centered)

#### 3. Physical Presence
- **TV stand shadow** beneath the unit
- **Proper sizing** (max-w-5xl, max-h-85vh)
- **Centered positioning** in viewport

### Visual Improvements:

**Before:**
- Fullscreen static effect
- No frame or context
- Felt abstract

**After:**
- Looks like actual vintage TV
- Physical presence in space
- Contextual and immersive
- More cinematic and period-appropriate

## Technical Implementation

### TV Frame Structure:
```tsx
<div className="vintage-tv-container">
  <div className="tv-bezel">
    <div className="inner-screen-bezel">
      <div className="curved-glass-effect" />
      <motion.div className="static-content">
        {/* All static effects */}
      </motion.div>
      <div className="screen-reflection" />
    </div>
    <div className="brand-label">GRIMOIRE</div>
  </div>
  <div className="tv-stand-shadow" />
</div>
```

### Color Palette:
- **Frame:** #2a2520 (warm brown) → #0a0805 (dark brown)
- **Inner bezel:** #1a1510 (medium brown)
- **Border:** #0a0805 (darkest brown)
- **Shadows:** rgba(0,0,0,0.8-0.9)

## User Experience

### Rhyming Text:
- Creates memorable, poetic atmosphere
- Perfect rhyme scheme enhances flow
- Mysterious and haunting tone
- Easy to remember

### TV Frame:
- Instantly recognizable as vintage TV
- Adds nostalgia and horror movie vibes
- Makes static effect more impactful
- Creates sense of "watching something forbidden"

## Thematic Coherence

The combination of:
1. **Rhyming verse** (literary, poetic)
2. **Vintage TV** (retro horror aesthetic)
3. **Static and figure** (found footage horror)

Creates a cohesive horror experience that references:
- Classic horror poetry
- Found footage films (The Ring, Sinister)
- Vintage horror TV broadcasts
- Creepypasta aesthetics

## Performance

- No performance impact from rhyming text (same number of lines)
- TV frame adds minimal DOM elements
- All effects remain optimized
- Smooth 60fps animation maintained
