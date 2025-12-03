# Reusable Components - Quick Reference Guide

## 🎯 When to Use What

### Need floating particles?
→ Use `AnimatedParticles`

### Need a floating element (emoji, icon, etc.)?
→ Use `FloatingElement`

### Need a glowing/pulsing effect?
→ Use `GlowingElement`

### Need to delay heavy animations?
→ Use `ProgressiveEffects`

### Creating a new page background?
→ Use `BaseBackground`

---

## 📦 Component Cheat Sheet

### AnimatedParticles
**Location:** `src/components/shared/effects/AnimatedParticles.tsx`

**Quick Start:**
```tsx
import { AnimatedParticles } from '@/components/shared/effects/AnimatedParticles';

<AnimatedParticles
  count={12}
  color="rgba(255, 255, 255, 0.3)"
  animationType="float"
/>
```

**Props:**
- `count` - Number of particles (required)
- `color` - Particle color (default: white)
- `minSize` / `maxSize` - Size range in px (default: 1-3)
- `minDuration` / `maxDuration` - Animation duration range (default: 15-25)
- `animationType` - "float" | "fall" | "drift" (default: "float")
- `className` - Additional CSS classes

**Animation Types:**
- `float` - Gentle up/down/side motion (dust, sparkles)
- `fall` - Top to bottom (rain, snow, falling leaves)
- `drift` - Left to right (clouds, smoke)

---

### FloatingElement
**Location:** `src/components/shared/effects/FloatingElement.tsx`

**Quick Start:**
```tsx
import { FloatingElement } from '@/components/shared/effects/FloatingElement';

<FloatingElement
  position={{ left: '20%', top: '15%' }}
  animation={{ y: [0, -30, 0], rotate: [0, -10, 10, 0] }}
  duration={8}
>
  🧸
</FloatingElement>
```

**Props:**
- `children` - Content to animate (required)
- `position` - { left?, right?, top } (required)
- `opacity` - Element opacity (default: 0.2)
- `filter` - CSS filter string
- `animation` - { y?, x?, rotate? } arrays
- `duration` - Animation duration in seconds (default: 8)
- `delay` - Animation delay in seconds (default: 0)
- `className` - Additional CSS classes
- `style` - Additional inline styles

**Common Patterns:**
```tsx
// Gentle float
animation={{ y: [0, -30, 0], rotate: [0, -10, 10, 0] }}

// Aggressive float
animation={{ y: [0, -50, 0], rotate: [0, -20, 20, 0], x: [0, 20, 0] }}

// Spin
animation={{ rotate: [0, 360] }}
```

---

### GlowingElement
**Location:** `src/components/shared/effects/GlowingElement.tsx`

**Quick Start:**
```tsx
import { GlowingElement } from '@/components/shared/effects/GlowingElement';

<GlowingElement
  position={{ left: '50%', top: '10%' }}
  color="rgba(212, 175, 55, 1)"
  glowColor="rgba(212, 175, 55, 0.3)"
/>
```

**Props:**
- `position` - { left?, right?, top?, bottom? } (required)
- `color` - Base color (required)
- `glowColor` - Glow color (required)
- `size` - { width, height } (default: 0.5rem x 0.5rem)
- `opacity` - [start, peak, end] (default: [0, 0.8, 0])
- `scale` - [start, peak, end] (default: [0.5, 1.5, 0.5])
- `duration` - Animation duration (default: 2)
- `delay` - Animation delay (default: 0)
- `children` - Optional content inside
- `className` - Additional CSS classes

**Common Use Cases:**
```tsx
// Candle flame
<GlowingElement
  color="rgba(255, 200, 100, 1)"
  glowColor="rgba(255, 150, 0, 0.6)"
  opacity={[0.7, 1, 0.7]}
  scale={[0.9, 1.1, 0.9]}
  duration={2}
/>

// Crystal sparkle
<GlowingElement
  color="rgba(212, 175, 55, 1)"
  glowColor="rgba(212, 175, 55, 0.3)"
  opacity={[0, 0.8, 0]}
  scale={[0.3, 1.5, 0.3]}
  duration={2}
/>

// Magic glow
<GlowingElement
  color="rgba(255, 182, 217, 1)"
  glowColor="rgba(255, 182, 217, 0.5)"
  opacity={[0.5, 1, 0.5]}
  scale={[1, 1.2, 1]}
  duration={3}
/>
```

---

### ProgressiveEffects
**Location:** `src/components/shared/effects/ProgressiveEffects.tsx`

**Quick Start:**
```tsx
import { ProgressiveEffects } from '@/components/shared/effects/ProgressiveEffects';

<ProgressiveEffects delay={100} priority="medium">
  <HeavyAnimationComponent />
</ProgressiveEffects>
```

**Props:**
- `children` - Content to delay (required)
- `delay` - Delay in ms (default: 100)
- `priority` - "high" | "medium" | "low" (default: "medium")
- `fallback` - Content to show while loading

**Priority Levels:**
- `high` - Uses requestAnimationFrame, loads quickly
- `medium` - Uses setTimeout, balanced
- `low` - Uses requestIdleCallback, loads when browser is idle

**When to Use:**
- Wrap heavy animations that aren't critical
- Wrap particle systems
- Wrap complex visual effects
- Wrap anything that slows initial render

---

### BaseBackground
**Location:** `src/components/shared/backgrounds/BaseBackground.tsx`

**Quick Start:**
```tsx
import { BaseBackground } from '@/components/shared/backgrounds/BaseBackground';

const staticLayers = <StaticPattern />;
const animatedLayers = <AnimatedEffects />;

<BaseBackground
  staticLayers={staticLayers}
  animatedLayers={animatedLayers}
  animationDelay={100}
  animationPriority="medium"
/>
```

**Props:**
- `staticLayers` - Content that renders immediately
- `animatedLayers` - Content that loads progressively
- `animationDelay` - Delay for animated layers (default: 100)
- `animationPriority` - Priority for animated layers (default: "medium")
- `className` - Background className (default: "bg-zinc-950")
- `children` - Additional content

**Pattern:**
```tsx
export const MyBackground: React.FC = React.memo(() => {
  const staticLayers = (
    <>
      <Pattern />
      <Texture />
      <Vignette />
    </>
  );

  const animatedLayers = (
    <>
      <AnimatedParticles count={12} />
      <FloatingElements />
      <GlowingEffects />
    </>
  );

  return (
    <BaseBackground
      staticLayers={staticLayers}
      animatedLayers={animatedLayers}
    />
  );
});
```

---

## 🎨 Common Recipes

### Recipe 1: Floating Dust
```tsx
<AnimatedParticles
  count={12}
  color="rgba(161, 161, 161, 0.4)"
  minSize={1}
  maxSize={3}
  minDuration={15}
  maxDuration={25}
  animationType="float"
/>
```

### Recipe 2: Falling Snow
```tsx
<AnimatedParticles
  count={20}
  color="rgba(255, 255, 255, 0.8)"
  minSize={2}
  maxSize={4}
  minDuration={10}
  maxDuration={20}
  animationType="fall"
/>
```

### Recipe 3: Floating Toy
```tsx
<FloatingElement
  position={{ left: '20%', top: '15%' }}
  opacity={0.18}
  filter="drop-shadow(0 0 20px rgba(255, 182, 217, 0.9))"
  animation={{ y: [0, -30, 0], rotate: [0, -15, 15, 0] }}
  duration={8}
>
  🧸
</FloatingElement>
```

### Recipe 4: Candle Flame
```tsx
<GlowingElement
  position={{ left: '5%', top: '30%' }}
  size={{ width: '0.75rem', height: '1.5rem' }}
  color="rgba(255, 200, 100, 0.9)"
  glowColor="rgba(255, 100, 0, 0.6)"
  opacity={[0.8, 1, 0.7]}
  scale={[1, 1.1, 0.95]}
  duration={2}
/>
```

### Recipe 5: Crystal Sparkle
```tsx
<GlowingElement
  position={{ left: '50%', top: '10%' }}
  color="rgba(212, 175, 55, 1)"
  glowColor="rgba(212, 175, 55, 0.3)"
  opacity={[0, 0.8, 0]}
  scale={[0.3, 1.5, 0.3]}
  duration={2}
  delay={0.5}
/>
```

### Recipe 6: Progressive Background
```tsx
export const MyBackground: React.FC = React.memo(() => {
  const staticLayers = (
    <>
      <div className="absolute inset-0 bg-zinc-950" />
      <Pattern />
      <Vignette />
    </>
  );

  const animatedLayers = (
    <>
      <AnimatedParticles count={12} animationType="float" />
      <FloatingElement position={{ left: '20%', top: '15%' }}>
        🌟
      </FloatingElement>
    </>
  );

  return (
    <BaseBackground
      staticLayers={staticLayers}
      animatedLayers={animatedLayers}
      animationDelay={100}
      animationPriority="medium"
    />
  );
});
```

---

## 🚀 Performance Tips

### 1. Always Memoize
```tsx
// ✅ Good
export const MyBackground = React.memo(() => { ... });

// ❌ Bad
export const MyBackground = () => { ... };
```

### 2. Use Progressive Loading
```tsx
// ✅ Good - Heavy effects load after initial render
<BaseBackground
  staticLayers={<Static />}
  animatedLayers={<Heavy />}
/>

// ❌ Bad - Everything loads at once
<div>
  <Static />
  <Heavy />
</div>
```

### 3. Reduce Particle Counts
```tsx
// ✅ Good - 12 particles
<AnimatedParticles count={12} />

// ❌ Bad - 50 particles
<AnimatedParticles count={50} />
```

### 4. Use Appropriate Priorities
```tsx
// ✅ Good - Critical effects load first
<ProgressiveEffects priority="high">
  <ImportantEffect />
</ProgressiveEffects>

// ✅ Good - Decorative effects load last
<ProgressiveEffects priority="low">
  <DecorativeEffect />
</ProgressiveEffects>
```

### 5. Memoize Expensive Arrays
```tsx
// ✅ Good
const items = React.useMemo(() => 
  Array.from({ length: 10 }, (_, i) => ({ id: i })),
  []
);

// ❌ Bad - Recreates array every render
const items = Array.from({ length: 10 }, (_, i) => ({ id: i }));
```

---

## 📝 Naming Conventions

### Component Names
- PascalCase
- Descriptive
- Pattern: `[Adjective][Noun]`

Examples:
- `AnimatedParticles` ✅
- `FloatingElement` ✅
- `GlowingElement` ✅
- `BaseBackground` ✅

### Props Names
- camelCase
- Clear purpose
- Consistent across components

Examples:
- `animationType` ✅
- `glowColor` ✅
- `animationDelay` ✅

### File Structure
```
src/components/shared/
├── effects/
│   ├── AnimatedParticles.tsx
│   ├── FloatingElement.tsx
│   ├── GlowingElement.tsx
│   └── ProgressiveEffects.tsx
└── backgrounds/
    └── BaseBackground.tsx
```

---

## ✅ Checklist for New Components

When creating a new reusable component:

- [ ] Use TypeScript with proper types
- [ ] Wrap with `React.memo`
- [ ] Add `displayName` for debugging
- [ ] Use `useMemo` for expensive computations
- [ ] Support `className` prop
- [ ] Document props with comments
- [ ] Follow naming conventions
- [ ] Add to this guide
- [ ] Test performance
- [ ] Check accessibility

---

## 🔗 Related Documentation

- [PERFORMANCE_AND_CONSISTENCY_REFACTOR.md](./PERFORMANCE_AND_CONSISTENCY_REFACTOR.md) - Full refactor details
- [NAMING_CONVENTIONS_GUIDE.md](./NAMING_CONVENTIONS_GUIDE.md) - App-wide naming conventions
- [src/design-system/tokens.ts](./src/design-system/tokens.ts) - Design tokens
- [src/utils/animations.ts](./src/utils/animations.ts) - Animation utilities

---

## 💡 Need Help?

1. Check this guide first
2. Look at existing implementations:
   - `GothicLibraryBackground.tsx` - Uses all components
   - `DollhouseBackground.tsx` - Uses FloatingElement
3. Check the component source code
4. Ask the team

---

**Last Updated:** Performance & Consistency Refactor
**Maintained By:** Development Team
