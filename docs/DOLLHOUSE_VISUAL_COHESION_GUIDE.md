# Dollhouse Visual Cohesion Guide

## The Unified Aesthetic

Every room in the dollhouse now shares a cohesive haunted Victorian aesthetic, as if created by the same strange mind.

## Core Visual Elements

### 1. Color Palette
```
Primary Pink: #ffb6d9
- Used for: titles, borders, glows, accents
- Mood: Eerie, feminine, unsettling

Matrix Green: #0F0 (Archive only)
- Used for: Archive room theme
- Mood: Digital, glitchy, compromised
```

### 2. Typography Hierarchy
```
Titles: font-parisienne (cursive script)
- Dollhouse room titles
- Section headers
- Decorative text

Body: font-serif
- Content text
- Descriptions
- Buttons

Mono: font-mono (Archive only)
- Code-like elements
- System messages
```

### 3. Light Leaks & Atmospheric Glow

**Pink Candlelight Effect:**
- Subtle pulsing glow (3-4s cycle)
- Radial gradient from center
- Opacity: 0.06 → 0.08 → 0.06
- Applied to all rooms except Archive

**Matrix Glow (Archive):**
- Green phosphorescent glow
- Sharper, more digital feel
- Opacity: 0.1 → 0.2 → 0.1

### 4. Grain & Texture

**Film Grain Overlay:**
```css
opacity: 0.02
background: SVG noise pattern
position: fixed, full screen
pointer-events: none
```

Applied to ALL rooms for vintage photograph feel.

### 5. Shadow Depth

**Book Spine Shadow:**
```css
box-shadow: 
  -8px 0 16px rgba(0,0,0,0.8),
  inset -2px 0 4px rgba(0,0,0,0.5),
  0 0 20px [mood-color]30
```

**Card Hover:**
```css
box-shadow:
  0 8px 30px rgba(0,0,0,0.6),
  0 0 40px rgba(255,182,217,0.25)
```

### 6. Watching Eyes

**Doll Eyes Design:**
- White sclera with pink blood vessels
- Pink iris with black pupil
- Glassy highlight (top-left)
- Pink tear/blood drip
- Subtle tracking movement
- Blink animation (scale: 1 → 0.95 → 1)

**Placement:**
- 2-6 eyes depending on intensity
- Scattered across viewport
- Never in center (peripheral vision)
- Fade in/out: opacity 0.08 → 0.18 → 0.08

### 7. Floating Elements

**Wilted Roses (🥀):**
- Pink-tinted with hue-rotate(320deg)
- Float animation: y: 0 → 12 → 0
- Rotate: 0 → -10 → 10 → 0
- Opacity: 0.12 → 0.25 → 0.12
- Duration: 12-16s per cycle

**Matrix Rain (Archive only):**
- Green Japanese characters
- Vertical scroll animation
- Opacity fade in/out
- 20 columns, staggered timing

### 8. Borders & Frames

**Standard Border:**
```css
border: 1px solid rgba(255, 182, 217, 0.3)
```

**Hover State:**
```css
border: 1px solid rgba(255, 182, 217, 0.5)
```

**Book Spine Right Edge:**
```css
border-right: 2px solid [mood-color]
```

### 9. Vignette Effect

**Radial Gradient:**
```css
background: radial-gradient(
  ellipse at center,
  transparent 0%,
  rgba(0,0,0,0.7) 100%
)
```

Applied to all rooms for focus and depth.

### 10. Mood Colors

Used for entry-specific glows and accents:

```
joy: #ffd700 (gold)
sorrow: #6b7280 (gray)
calm: #93c5fd (blue)
unrest: #a53e3e (red)
```

## Room-Specific Implementations

### Scrapbook ✅
- Pink theme throughout
- Wilted roses floating
- Doll eyes watching
- Film grain overlay
- Vignette darkness
- Unified header with dripping effect
- Next/Previous navigation in detail view

### Diary (Pending)
- Same pink theme
- Book spine cards
- Mood-based glows
- Unified header

### Bookmarks (Pending)
- Pink theme
- Book spine cards for saved stories
- Unified header

### Library (Pending)
- Pink theme
- Entry cards with book aesthetic
- Unified header

### Archive (Exception)
- Matrix green theme
- Digital glitch effects
- Mono font for system text
- Green phosphorescent glow
- Matrix rain instead of roses

## Animation Timing

**Slow & Eerie:**
- Candlelight glow: 3-4s
- Eye blinks: 4-8s
- Floating elements: 8-16s
- Atmospheric shifts: 20-25s

**Quick & Responsive:**
- Hover effects: 0.2-0.3s
- Button presses: 0.1s
- Card transitions: 0.4-0.5s

## Interaction States

### Buttons
```
Default: border-pink-900/30, bg-transparent
Hover: border-pink-700/50, bg-pink-900/10
Active: scale(0.95)
```

### Cards
```
Default: y: 0, scale: 1
Hover: y: -8, scale: 1.02
Active: scale: 0.98
```

### Navigation Arrows
```
Default: opacity: 1, x: 0
Hover: scale: 1.1, x: ±4
Active: scale: 0.95
```

## Accessibility Considerations

- All interactive elements have focus states
- ARIA labels on icon buttons
- Sufficient color contrast (WCAG AA)
- Reduced motion support (prefers-reduced-motion)
- Keyboard navigation support

## Performance Optimizations

- Shared components reduce bundle size
- CSS transforms for animations (GPU accelerated)
- Lazy loading for heavy effects
- Debounced scroll/resize handlers
- Memoized components where appropriate

## Design Philosophy

**"Handcrafted Horror"**
- Every element feels intentionally placed
- Subtle imperfections (tilted doors, cracks)
- Consistent but not sterile
- Eerie but beautiful
- Unsettling but inviting

**"Victorian Dollhouse"**
- Ornate but decaying
- Feminine but sinister
- Nostalgic but corrupted
- Delicate but disturbing

**"Unified Mind"**
- Same color palette
- Same typography
- Same animation timing
- Same shadow depths
- Same atmospheric effects

## Testing Checklist

- [ ] All rooms have grain texture
- [ ] All rooms have vignette
- [ ] Pink glow consistent (except Archive)
- [ ] Typography matches (parisienne + serif)
- [ ] Borders use same pink shade
- [ ] Shadow depths match
- [ ] Watching eyes appear in all rooms
- [ ] Floating elements present
- [ ] Animations smooth at 60fps
- [ ] Hover states consistent
- [ ] Focus states visible
- [ ] Mobile responsive
- [ ] Dark mode compatible (already dark)

## Future Enhancements

1. **Sound Design**: Subtle ambient sounds per room
2. **Parallax**: Depth layers for floating elements
3. **Particle System**: Dust motes in light beams
4. **Weather Effects**: Occasional rain on windows
5. **Time-Based**: Different effects at night vs day
6. **Seasonal**: Themes for holidays (Halloween, etc.)
