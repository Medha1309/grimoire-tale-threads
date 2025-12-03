# About Page - Quick Start Guide

## What Was Built

A hyper-realistic, cinematic About page that feels like a still from a black-and-white film. The page presents information through physical objects in an attic environment.

## Key Features

### 🎬 Cinematic Environment
- Realistic attic with wooden floors, sloped roof, and window lighting
- Dust particles floating in light beams
- Film grain and vignette effects
- Parallax camera movement on scroll

### 📖 Interactive Objects

1. **Journal on Crate** (Lower-left)
   - Click to open and read about what the app is
   - Hover for ink smoke effect
   - Two-page spread with detailed info

2. **Wall Blueprint** (Right wall)
   - Shows tech stack as architectural diagram
   - Click for detailed data flow explanation
   - Hand-drawn dollhouse cutaway

3. **Memory Chest** (Center-right)
   - Click to open and see feature objects
   - Each object represents a room/feature
   - Hover objects for tooltips

4. **Attic Window** (Upper-left)
   - Occasional memory flickers
   - Text plaque explaining "why"
   - Foggy glass with realistic streaks

### ⏱️ Disappearing Title
- "The Dollhouse Diary" appears for 5 seconds
- Consistent with Contact page timing
- Smooth fade transitions

## How to Use

### Navigation
1. Visit `/about` route
2. Title appears and fades after 5 seconds
3. Scroll to see parallax camera movement
4. Click objects to interact

### Interactions
- **Hover** over objects to see effects
- **Click** journal, blueprint, or chest to open
- **Scroll** to explore the attic
- **Click outside** modals to close

## Components Created

```
src/components/about/
├── AtticScene.tsx           # Base environment
├── DisappearingTitle.tsx    # Title animation
├── JournalOnCrate.tsx       # "What" section
├── WallBlueprint.tsx        # Tech stack
├── MemoryChest.tsx          # Features
├── AtticWindow.tsx          # "Why" section
└── index.ts                 # Exports
```

## Reused Components

- `Card` - For modal overlays
- `SpiderField` - Crawling spiders
- `useNavigation` - Routing
- Framer Motion - Animations
- Existing design tokens

## Visual Style

### Colors
- **Base**: Near black `#0a0a0a`
- **Wood**: Brown tones `rgba(45,40,35)` - `rgba(60,50,40)`
- **Paper**: Aged white `rgba(220,215,200)`
- **Metal**: Gray-brown `rgba(100,90,80)`

### Effects
- Realistic shadows and depth
- Wood grain textures
- Paper aging effects
- Metal patina
- Dust and fog

## Performance

- **40 rain drops** (reduced for performance)
- **8 spiders** (optimized count)
- **GPU-accelerated** animations
- **Minimal DOM** elements
- **CSS gradients** instead of images

## Accessibility

- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ ARIA labels
- ✅ Reduced motion support
- ✅ Touch-friendly

## Mobile Responsive

- Adapts layout for small screens
- Touch-friendly hit areas
- Reduced particle effects
- Optimized for portrait

## Testing

Run the app and visit `/about`:

```bash
npm run dev
```

Then navigate to the About page from the navbar or directly visit `http://localhost:5173/about`

## What to Look For

### Visual Quality
- Does it feel like a movie still?
- Are textures realistic?
- Is lighting believable?
- Do objects look physical?

### Interactions
- Do objects respond to hover?
- Do modals open smoothly?
- Is scrolling smooth?
- Are animations at 60fps?

### Content
- Is information clear?
- Are tooltips helpful?
- Is navigation intuitive?
- Does it tell a story?

## Customization

### Adjust Lighting
In `AtticScene.tsx`, modify the window light:
```typescript
animate={{
  opacity: [0.15, 0.25, 0.15], // Change intensity
}}
```

### Change Particle Count
In `About.tsx`, adjust rain:
```typescript
{[...Array(40)].map(...)} // Change 40 to desired count
```

### Modify Flicker Timing
In `AtticWindow.tsx`, adjust frequency:
```typescript
const interval = setInterval(showFlicker, 8000); // Change 8000ms
```

### Update Content
Edit text in each component:
- `JournalOnCrate.tsx` - App description
- `WallBlueprint.tsx` - Tech stack
- `MemoryChest.tsx` - Feature list
- `AtticWindow.tsx` - Why it matters

## Troubleshooting

### Performance Issues
- Reduce particle counts
- Disable parallax on scroll
- Simplify shadow effects
- Use `will-change` sparingly

### Layout Issues
- Check viewport units
- Verify absolute positioning
- Test on different screen sizes
- Inspect z-index layers

### Animation Jank
- Check for layout thrashing
- Use `transform` instead of `top/left`
- Enable GPU acceleration
- Reduce simultaneous animations

## Next Steps

1. **Test** on different devices
2. **Gather** user feedback
3. **Optimize** based on metrics
4. **Enhance** with sound (optional)
5. **Add** more interactive elements

## Documentation

- Full details: `ABOUT_PAGE_CINEMATIC_REDESIGN.md`
- Component docs: Inline JSDoc comments
- Design tokens: `src/design-system/`

---

**The About page is now a cinematic experience that showcases the app's story through physical, interactive objects in a realistic attic environment.**
