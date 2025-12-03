# Polish Implementation Guide

## Quick Reference: Before & After

### Animation Timings

**BEFORE** (Inconsistent):
```typescript
// Dollhouse
transition={{ duration: 3 }}      // Candle glow
transition={{ duration: 8 }}      // Float
transition={{ duration: 0.3 }}    // Hover

// Parlour  
transition={{ duration: 3.5 }}    // Curtain
transition={{ duration: 2 }}      // Pulse

// Chains
transition={{ duration: 22 }}     // Float ornaments ❌ TOO SLOW
transition={{ duration: 6 }}      // Flourishes
```

**AFTER** (Unified):
```typescript
import { UNIFIED_TIMINGS, createTransition } from '../design-system/unified-tokens';

// All rooms
transition={createTransition('breathe')}  // 3s - Candle glow, pulses
transition={createTransition('float')}    // 8s - Floating elements
transition={createTransition('drift')}    // 20s - Background ornaments
transition={createTransition('quick')}    // 0.3s - Hover states
transition={createTransition('smooth')}   // 0.6s - Page transitions
transition={createTransition('epic')}     // 3.5s - Curtains
```

---

## Step-by-Step Implementation

### 1. Update Dollhouse Components

#### File: `src/components/diary/DollhouseBackground.tsx`

**Add grain and vignette:**
```typescript
import { UNIFIED_TEXTURES } from '../../design-system/unified-tokens';

// Add to background container
<div className="fixed inset-0 pointer-events-none">
  {/* Existing background */}
  
  {/* ADD: Film grain */}
  <div 
    className="absolute inset-0"
    style={{
      backgroundImage: UNIFIED_TEXTURES.grain.backgroundImage,
      opacity: UNIFIED_TEXTURES.grain.opacity,
    }}
  />
  
  {/* ADD: Vignette */}
  <div 
    className="absolute inset-0"
    style={{
      background: UNIFIED_TEXTURES.vignette.medium,
    }}
  />
</div>
```

#### File: `src/components/diary/DollhouseHomeView.tsx`

**Update animation timings:**
```typescript
import { UNIFIED_TIMINGS, createTransition } from '../../design-system/unified-tokens';

// BEFORE
animate={{ opacity: [0.5, 0.8, 0.5] }}
transition={{ duration: 3, repeat: Infinity }}

// AFTER
animate={{ opacity: [0.5, 0.8, 0.5] }}
transition={{ ...createTransition('breathe'), repeat: Infinity }}
```

**Update card shadows:**
```typescript
import { UNIFIED_DEPTH } from '../../design-system/unified-tokens';

// BEFORE
style={{
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5), 0 0 30px rgba(255, 182, 217, 0.15)',
}}

// AFTER
style={{
  boxShadow: UNIFIED_DEPTH.shadows.cardGlow('rgba(255, 182, 217, 0.4)'),
}}
```

---

### 2. Update Parlour Components

#### File: `src/pages/GildedParlour.tsx`

**Add grain:**
```typescript
import { UNIFIED_TEXTURES } from '../design-system/unified-tokens';

// Add after ambient glow div
<div 
  className="fixed inset-0 pointer-events-none opacity-[0.02]"
  style={{
    backgroundImage: UNIFIED_TEXTURES.grain.backgroundImage,
  }}
/>
```

**Update card shadows in ForumList:**
```typescript
// File: src/components/forum/ForumList.tsx
import { UNIFIED_DEPTH } from '../../design-system/unified-tokens';

style={{
  boxShadow: UNIFIED_DEPTH.shadows.cardGlow('rgba(232, 197, 71, 0.4)'),
}}
```

---

### 3. Update Chains Components

#### File: `src/pages/Chains.tsx`

**Add grain:**
```typescript
import { UNIFIED_TEXTURES } from '../design-system/unified-tokens';

// Add after damask pattern
<div 
  className="fixed inset-0 pointer-events-none opacity-[0.02]"
  style={{
    backgroundImage: UNIFIED_TEXTURES.grain.backgroundImage,
  }}
/>
```

**CRITICAL: Reduce floating ornament speed:**
```typescript
import { UNIFIED_TIMINGS } from '../design-system/unified-tokens';

// BEFORE (TOO SLOW)
{[
  { char: '⛓️', left: '12%', duration: 22, delay: 0 },
  { char: '◈', left: '28%', duration: 24, delay: 4 },
  // ...
].map((orn, i) => (
  <motion.div
    animate={{ y: '-10vh', opacity: [0, 0.2, 0.35, 0.2, 0] }}
    transition={{ duration: orn.duration, repeat: Infinity }}
  />
))}

// AFTER (UNIFIED)
{[
  { char: '⛓️', left: '12%', delay: 0 },
  { char: '◈', left: '28%', delay: 4 },
  // ...
].map((orn, i) => (
  <motion.div
    animate={{ y: '-10vh', opacity: [0, 0.2, 0.35, 0.2, 0] }}
    transition={{ 
      duration: UNIFIED_TIMINGS.drift, // 20s instead of 22-26s
      repeat: Infinity,
      delay: orn.delay,
    }}
  />
))}
```

**Update flourish animations:**
```typescript
// BEFORE
transition={{ duration: 6, delay: i * 1.5, repeat: Infinity }}

// AFTER
transition={{ 
  duration: UNIFIED_TIMINGS.breathe, // Keep at 6s, but use token
  delay: i * 1.5, 
  repeat: Infinity 
}}
```

---

### 4. Update About Page

#### File: `src/components/about/InvestigationRoom.tsx`

**Add vintage grain:**
```typescript
import { UNIFIED_TEXTURES } from '../../design-system/unified-tokens';

// Add to background
<div 
  className="fixed inset-0 pointer-events-none"
  style={{
    backgroundImage: UNIFIED_TEXTURES.grain.backgroundImage,
    opacity: UNIFIED_TEXTURES.grain.opacityVintage, // 0.03 for vintage feel
  }}
/>

<div 
  className="fixed inset-0 pointer-events-none"
  style={{
    background: UNIFIED_TEXTURES.vignette.strong,
  }}
/>
```

**Update typewriter timing:**
```typescript
import { UNIFIED_TIMINGS } from '../../design-system/unified-tokens';

// BEFORE
const typingDelay = 150;

// AFTER
const typingDelay = UNIFIED_TIMINGS.instant * 1000; // 150ms
```

---

### 5. Update Animation System

#### File: `src/utils/animation-system.ts`

**Replace hardcoded durations:**
```typescript
import { UNIFIED_TIMINGS, UNIFIED_EASING } from '../design-system/unified-tokens';

// BEFORE
export const transitions = {
  fast: { duration: 0.15, ease: 'easeInOut' },
  smooth: { duration: 0.3, ease: 'easeInOut' },
  slow: { duration: 0.6, ease: 'easeInOut' },
};

// AFTER
export const transitions = {
  instant: { duration: UNIFIED_TIMINGS.instant, ease: UNIFIED_EASING.smooth },
  quick: { duration: UNIFIED_TIMINGS.quick, ease: UNIFIED_EASING.smooth },
  smooth: { duration: UNIFIED_TIMINGS.smooth, ease: UNIFIED_EASING.smooth },
  dramatic: { duration: UNIFIED_TIMINGS.dramatic, ease: UNIFIED_EASING.smooth },
  epic: { duration: UNIFIED_TIMINGS.epic, ease: UNIFIED_EASING.dramatic },
};
```

---

## Testing Checklist

### Visual Consistency
- [ ] All cards have same shadow depth
- [ ] Grain visible on all pages (subtle, not distracting)
- [ ] Vignettes enhance depth without obscuring content
- [ ] Borders consistent thickness per room

### Animation Consistency
- [ ] Hover states: 0.3s everywhere
- [ ] Page transitions: 0.6s everywhere
- [ ] Candle glows: 3s everywhere
- [ ] Floating elements: 8s everywhere
- [ ] Background ornaments: 20s everywhere
- [ ] Curtains: 3.5s (Parlour, Chains)

### Room Individuality Preserved
- [ ] Dollhouse: Pink theme intact
- [ ] Parlour: Gold theme intact
- [ ] Chains: Purple theme intact
- [ ] About: Gray theme intact
- [ ] Each room has unique decorative elements

### Transitions
- [ ] Landing → Dollhouse: Smooth
- [ ] Landing → Parlour: Curtain works
- [ ] Landing → Chains: Curtain works
- [ ] Landing → About: Smooth
- [ ] Between rooms: No jarring changes

### Performance
- [ ] No frame drops on animations
- [ ] Grain doesn't impact performance
- [ ] Reduced motion respected

---

## Common Patterns

### Adding Grain to Any Page
```typescript
import { UNIFIED_TEXTURES } from '../design-system/unified-tokens';

<div className="fixed inset-0 pointer-events-none">
  <div 
    className="absolute inset-0"
    style={{
      backgroundImage: UNIFIED_TEXTURES.grain.backgroundImage,
      opacity: UNIFIED_TEXTURES.grain.opacity,
    }}
  />
</div>
```

### Creating Consistent Cards
```typescript
import { createCardStyle, createHoverStyle } from '../design-system/unified-tokens';

const cardStyle = createCardStyle('dollhouse'); // or 'parlour', 'chains', 'about'
const hoverStyle = createHoverStyle('dollhouse');

<motion.div
  style={cardStyle}
  whileHover={hoverStyle}
>
  {/* Card content */}
</motion.div>
```

### Consistent Animations
```typescript
import { createTransition } from '../design-system/unified-tokens';

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={createTransition('smooth')}
>
  {/* Content */}
</motion.div>
```

---

## Priority Order

1. **HIGH PRIORITY** (Most visible):
   - Chains floating ornaments (reduce from 22-26s to 20s)
   - Add grain to all pages
   - Unify card shadows

2. **MEDIUM PRIORITY** (Polish):
   - Standardize hover timings (0.3s)
   - Add vignettes consistently
   - Update animation-system.ts

3. **LOW PRIORITY** (Nice to have):
   - Refactor existing components to use helper functions
   - Document patterns for future components

---

## Rollback Plan

If changes cause issues:

1. **Grain causing performance issues?**
   - Reduce opacity to 0.01
   - Or remove grain, keep other changes

2. **Animations feel wrong?**
   - Revert to room-specific timings
   - Keep shadow/texture changes

3. **Colors look off?**
   - Check that room themes are correctly applied
   - Verify primaryRgba values match original colors

---

## Success Metrics

**Before**: Inconsistent timing, no grain, varied shadows
**After**: Unified timing, subtle grain, consistent shadows

**Goal**: Professional polish without losing room character

**Time**: 4-6 hours total implementation
**Impact**: High - submission differentiator
