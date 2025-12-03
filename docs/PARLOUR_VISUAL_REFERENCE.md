# Gilded Parlour - Visual Reference Guide

## 🎨 Quick Visual Overview

### Color Palette
```
Velvet Burgundy:  #2d0a0a  ████████
Tarnished Gold:   #d4af37  ████████
Warm Cream:       #f4e4c1  ████████
Mahogany:         #2d1810  ████████
Brass:            #8B7355  ████████
Dark Brass:       #6B5D47  ████████
```

### Typography Hierarchy
```
PAGE TITLE          Playfair Display, 48px, 0.25em spacing
Section Heading     Playfair Display, 24px, 0.15em spacing
Post Title          Cormorant Garamond, 20px, 0.05em spacing
Body Text           Crimson Text, 16px, 1.75 line height
UI ELEMENTS         Inter, 14px, 0.15em spacing
```

### Lighting System
```
Key Light (Warm):   rgb(255, 220, 180) - Candlelight
Fill Light (Cool):  rgb(200, 210, 220) - Ambient
Rim Light (Cool):   rgb(180, 190, 200) - Edges
```

---

## 🕯️ Candle Anatomy

```
     Smoke Wisp ↑
         ~~~
        /   \
       | 🔥 |  ← Flame (realistic teardrop)
       |     |
        \___/
          |    ← Wick
     ┌────┴────┐
     │         │  ← Brass candlestick
     │         │
     └─────────┘
         |||
    Light Cast (radial gradient)
```

**Flame Colors (from center out):**
1. Core: rgba(255, 220, 180, 1) - Hottest
2. Mid: rgba(255, 180, 100, 0.9)
3. Outer: rgba(255, 120, 40, 0.6)
4. Glow: rgba(255, 140, 60, 0.4)

---

## 📐 Layout Structure

```
┌─────────────────────────────────────────────────┐
│  ← Back    THE GILDED PARLOUR    [NEW POST]    │ ← Header
├─────────────────────────────────────────────────┤
│  [Search discussions...]                        │ ← Search
├─────────────────────────────────────────────────┤
│  [Filters: Recent | Popular | Tags]            │ ← Filters
├─────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────────┐ │
│  │  Post Card                                │ │
│  │  ┌─────────────────────────────────────┐ │ │
│  │  │ Title in Cormorant Garamond         │ │ │
│  │  │ Body preview in Crimson Text...     │ │ │
│  │  │ [Tags] [🕯️ Likes] [💬 Comments]    │ │ │
│  │  └─────────────────────────────────────┘ │ │
│  └───────────────────────────────────────────┘ │
│  ...more posts...                              │
└─────────────────────────────────────────────────┘

🕯️ Candles on left edge (3)
🕯️ Candles on right edge (3)
✨ Dust particles floating throughout
```

---

## 🎭 Background Layers (Z-Index)

```
Layer 10: Content (posts, buttons, text)
Layer 5:  Dust particles, subtle effects
Layer 0:  Background system ↓

  ┌─ Velvet base (#2d0a0a)
  ├─ Wood paneling texture
  ├─ Aged paper overlay
  ├─ Three-point lighting
  ├─ Atmospheric haze
  ├─ Gilded corner accents
  └─ 6 × Authentic candles
```

---

## 🎬 Lighting Diagram

```
        Fill Light (cool, from above)
              ↓↓↓↓↓↓↓
    ┌─────────────────────────┐
    │                         │
Rim │    Key Light (warm)     │ Rim
→   │         ↓↓↓             │   ←
    │    [Content Area]       │
    │                         │
    └─────────────────────────┘
         Vignette (dark)
```

**Result:** Warm center, cool edges, dark corners = depth

---

## 🎨 Material Textures

### Velvet
```
Base: Solid burgundy
+ Directional nap (subtle lines)
+ Sheen (catches light)
= Rich, tactile appearance
```

### Tarnished Gold
```
Not shiny: #d4af37 (muted)
+ Oxidation (darker tones)
+ Acanthus leaf motifs
= Aged elegance
```

### Aged Paper
```
Cream base: #f4e4c1
+ Fractal noise texture
+ Subtle imperfections
= 18th-century correspondence
```

---

## 🔥 Candle Animation Keyframes

```
Time:   0%    15%   30%   50%   70%   85%   100%
Scale:  1.0   1.05  0.98  1.08  0.95  1.02  1.0
Opacity:0.9   1.0   0.85  0.95  0.88  0.92  0.9
Y-pos:  0     -2    +1    -3    0     -1    0

Duration: 3 seconds
Easing: easeInOut
Repeat: Infinite
```

**Result:** Natural, irregular flicker

---

## 📏 Spacing & Proportions

### Golden Ratio Usage
```
Content width: 1200px max
Sidebar: 300px (1:1.618 ratio)
Margins: 48px (3rem)
Card padding: 32px (2rem)
```

### Typography Scale
```
xs:   12px  (0.75rem)  - Footnotes
sm:   14px  (0.875rem) - Captions
base: 16px  (1rem)     - Body
lg:   18px  (1.125rem) - Emphasis
xl:   20px  (1.25rem)  - Subheadings
2xl:  24px  (1.5rem)   - Section headers
3xl:  30px  (1.875rem) - Page titles
4xl:  36px  (2.25rem)  - Display
5xl:  48px  (3rem)     - Hero
```

---

## 🎯 Interactive States

### Buttons
```
Default:  Tarnished gold border, transparent bg
Hover:    Brighter gold, subtle glow
Active:   Slightly darker, scale 0.98
Focus:    Gold outline, no harsh ring
```

### Links
```
Default:  #8B7355 (brass)
Hover:    #d4af37 (gold)
Visited:  #6B5D47 (darker brass)
```

### Cards
```
Default:  Subtle border, transparent bg
Hover:    Brighter border, slight lift
Active:   Pressed state, scale 0.99
```

---

## 🌟 Special Effects

### Dust Particles
- Count: 8 particles
- Size: 1px (tiny)
- Color: rgba(200, 180, 160, 0.3)
- Movement: Slow upward float with drift
- Duration: 20-24 seconds per cycle

### Corner Flourishes
- SVG acanthus leaf motifs
- Tarnished gold color
- Subtle pulse animation (6s)
- Opacity: 0.2-0.3 range

### Atmospheric Haze
- Very subtle (opacity 0.3-0.5)
- Warm tone (255, 240, 220)
- Slow pulse (12s)
- Simulates air quality from candles

---

## 📱 Responsive Breakpoints

```
Mobile:   < 640px   - Single column, simplified
Tablet:   640-1024px - Adjusted spacing
Desktop:  > 1024px   - Full experience
```

### Mobile Adjustments
- Title: 3xl instead of 5xl
- Candles: Reduced to 4 (2 per side)
- Dust: Reduced to 5 particles
- Padding: 1rem instead of 3rem

---

## 🎨 Color Usage Guide

### When to Use Each Color

**Tarnished Gold (#d4af37)**
- Primary actions (buttons)
- Titles and headers
- Interactive elements
- Emphasis

**Warm Cream (#f4e4c1)**
- Body text
- Content areas
- Readable text

**Brass (#8B7355)**
- Secondary text
- Subtle UI elements
- Borders
- Inactive states

**Burgundy (#2d0a0a)**
- Background base
- Depth and shadow
- Grounding element

---

## 🔍 Attention to Detail

### Subtle Touches
1. **Candle wicks**: 1px black line above flame
2. **Smoke wisps**: Very faint, rises slowly
3. **Light falloff**: Follows inverse square law
4. **Velvet sheen**: Catches light at angle
5. **Paper texture**: Barely visible noise
6. **Corner ornaments**: Authentic acanthus leaves
7. **Typography**: Period-correct letter spacing
8. **Shadows**: Soft, realistic blur

### What Makes It Feel Real
- Physics-based animations
- Historically accurate colors
- Proper material properties
- Motivated lighting
- Subtle imperfections
- Attention to scale

---

## 🎬 Cinematic References

### Lighting Style
- **Barry Lyndon** - Natural candlelight
- **Pride & Prejudice (2005)** - Period interiors
- **The Crown** - Prestige quality
- **Bridgerton** - Color palette

### Color Grading
- Warm highlights (candlelight)
- Cool shadows (depth)
- Rich midtones (velvet)
- Controlled contrast

---

## ✅ Quality Checklist

Before considering it "done":
- [ ] Candles flicker naturally (not mechanical)
- [ ] Typography is readable and elegant
- [ ] Colors feel period-appropriate
- [ ] Lighting creates depth
- [ ] Materials look tactile
- [ ] Animations are smooth (60fps)
- [ ] No gimmicky effects
- [ ] Feels sophisticated, not cartoonish
- [ ] Works on mobile
- [ ] Loads quickly

---

## 🎭 The "Bridgerton Test"

Ask yourself:
1. Could this be a scene in Bridgerton? ✓
2. Does it feel expensive? ✓
3. Is it historically plausible? ✓
4. Would it work without the horror elements? ✓
5. Is it sophisticated, not gimmicky? ✓

If all yes → You've achieved the goal.

---

## 📚 Quick Reference

**Main Background Component:**
`src/components/forum/RegencyParlourBackground.tsx`

**Typography System:**
`src/design-system/regency-typography.ts`

**Page Implementation:**
`src/pages/GildedParlour.tsx`

**Fonts Loaded:**
- Playfair Display (display)
- Crimson Text (body)
- Cormorant Garamond (elegant)
- Inter (UI)

**Performance:**
- 60fps smooth
- ~8 animated elements
- GPU-accelerated transforms
- Memoized components

---

This visual reference should help maintain consistency as you continue developing the Parlour. Every detail serves the goal: **Bridgerton-level sophistication with subtle psychological tension.** 🕯️✨
