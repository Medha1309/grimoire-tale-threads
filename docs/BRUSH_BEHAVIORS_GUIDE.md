# 🖌️ Brush Behaviors Guide

## How Each Brush is ACTUALLY Different

### 🩸 Blood
**Physics-Based Dripping**
- Drips downward with gravity (15% chance)
- Random drip length (5-20px)
- Splatter effect (8% chance)
- 5-point splatter pattern
- Variable width (1.2-2x)
- Shadow blur: 15px

**Best For:** Horror scenes, wounds, dramatic effects

---

### ⬛ Charcoal
**Grainy Texture Simulation**
- Width varies ±40% per stroke
- 3 grain particles per stroke
- Random grain placement
- Variable grain opacity (10-30%)
- Mimics real charcoal dust

**Best For:** Sketching, shading, rough drafts

---

### 🖋️ Ink
**Precision Tool**
- Consistent width (no variation)
- Minimal blur (1px)
- Clean, sharp edges
- No randomness
- Perfect for technical work

**Best For:** Line art, details, clean outlines

---

### ⚡ Scratch
**Color Inverter**
- Difference blend mode (inverts colors)
- 80% of normal width
- Jagged path (30% chance of offset)
- Random direction changes
- Creates distressed look

**Best For:** Distressed effects, highlights, special FX

---

### 🦠 Decay
**Organic Spread Algorithm**
- 5-10 dots per stroke
- Random circular placement
- Variable dot sizes (0-30% of brush)
- Variable opacity (20-60%)
- Mimics mold/decay growth

**Best For:** Deterioration, organic textures, age

---

### ✨ Ethereal
**Multi-Layer Glow**
- Outer glow layer (1.5x width, 20% opacity)
- Inner core layer (normal width, 70% opacity)
- Shadow blur: 25px
- Soft, fading edges
- Ghostly transparency

**Best For:** Spirits, magic, soft highlights

---

### 💧 Watercolor
**Bleeding Simulation**
- Radial gradient bleeding
- 1.3x radius spread
- 25% opacity (transparent layers)
- Soft edges (8px blur)
- Builds up with multiple strokes

**Best For:** Soft backgrounds, washes, atmospheric effects

---

### 🎨 Oil
**Impasto Texture**
- 1.2x width (thick paint)
- 2-pass rendering (texture)
- Random offset per pass (±2px)
- Variable opacity (80-100%)
- Shadow for depth (2px blur)

**Best For:** Textured painting, visible brushwork

---

### 💡 Neon
**Electric Glow System**
- Outer glow (2x width, 30% opacity)
- Inner core (0.5x width, 100% opacity)
- Dual-layer rendering
- Shadow blur: 30px (outer), 15px (inner)
- Bright, electric effect

**Best For:** Highlights, accents, cyberpunk effects

---

### 💨 Smoke
**Wispy Particle System**
- 15% opacity (very transparent)
- Bezier curves (smooth flow)
- Random drift (±50% of brush size)
- Particle effects (20% chance)
- Shadow blur: 20px

**Best For:** Atmosphere, fog, ethereal backgrounds

---

## Comparison Table

| Brush | Opacity | Blur | Special Effect | Complexity |
|-------|---------|------|----------------|------------|
| Blood | 100% | 15px | Drips + Splatters | High |
| Charcoal | 100% | 0px | Grain Texture | Medium |
| Ink | 100% | 1px | None (Precise) | Low |
| Scratch | 100% | 0px | Color Inversion | Medium |
| Decay | 20-60% | 0px | Organic Spread | High |
| Ethereal | 70% | 25px | Multi-Layer Glow | High |
| Watercolor | 25% | 8px | Radial Bleeding | Medium |
| Oil | 80-100% | 2px | Multi-Pass Texture | Medium |
| Neon | 30-100% | 30px | Dual-Layer Glow | High |
| Smoke | 15% | 20px | Bezier + Particles | High |

## Usage Tips

### Layering
1. **Base**: Watercolor or Smoke (soft background)
2. **Mid**: Charcoal or Oil (main forms)
3. **Details**: Ink (clean lines)
4. **Effects**: Ethereal, Neon, or Blood (accents)

### Combining Brushes
- **Charcoal + Ink**: Sketch then outline
- **Watercolor + Ethereal**: Soft glowing backgrounds
- **Oil + Decay**: Aged, textured surfaces
- **Neon + Smoke**: Cyberpunk atmosphere
- **Blood + Scratch**: Horror distress effects

### Settings Per Brush

#### For Smooth Results:
- Blood: Smoothing 40%, Scatter 0%
- Charcoal: Smoothing 30%, Scatter 20%
- Ink: Smoothing 70%, Scatter 0%

#### For Textured Results:
- Decay: Smoothing 0%, Scatter 50%
- Oil: Smoothing 20%, Scatter 10%
- Watercolor: Smoothing 60%, Scatter 30%

#### For Atmospheric:
- Smoke: Smoothing 80%, Scatter 40%
- Ethereal: Smoothing 60%, Scatter 20%
- Neon: Smoothing 50%, Scatter 0%

## Technical Implementation

### Rendering Order
1. Apply blend mode
2. Set tool-specific composite operation
3. Calculate smoothing
4. Apply scatter
5. Execute brush-specific algorithm
6. Apply symmetry if enabled
7. Reset canvas state

### Performance
- Each brush: 10-50 lines of code
- Optimized algorithms
- Conditional rendering
- No frame drops
- Smooth 60fps

---

**Each brush is now a unique creative tool with its own personality!** 🎨✨
