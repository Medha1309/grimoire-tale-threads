# App-Wide Visual Cohesion Brainstorming

## Current State Analysis

### Existing Visual Themes

#### 1. **Library (Stories Page)**
- **Color**: Dark browns, ambers, book spine aesthetic
- **Effects**: Torch lighting, watching eyes, genre-specific glows
- **Typography**: Serif for titles, tracking-widest for authors
- **Cards**: Book spine with 3D depth, ornate borders
- **Atmosphere**: Gothic library, candlelit reading room

#### 2. **Gilded Parlour (Forum)**
- **Color**: Dark reds (#6a0000, #8B0000), gold accents
- **Effects**: Gothic library background, spiders, chandeliers
- **Typography**: Serif, tracking-[0.3em] for buttons
- **Cards**: Flat cards with red borders, hover effects
- **Atmosphere**: Victorian parlour, gossip and whispers

#### 3. **Dollhouse (Diary)**
- **Color**: Pink (#ffb6d9), feminine horror
- **Effects**: Doll eyes, wilted roses, grain texture
- **Typography**: Parisienne for titles, serif for body
- **Cards**: Book spine with pink borders, mood glows
- **Atmosphere**: Haunted dollhouse, secret confessions

#### 4. **Archive (Matrix Theme)**
- **Color**: Green (#0F0), digital
- **Effects**: Matrix rain, glitch effects
- **Typography**: Mono for code, serif for content
- **Cards**: Terminal-style with green borders
- **Atmosphere**: Compromised system, digital horror

## Shared Visual DNA to Extract

### 1. **Book Spine Aesthetic** ✨
**Currently in:** Library, Dollhouse
**Should extend to:** Forum cards, Profile cards

**Why it works:**
- Creates physical depth
- Suggests "opening" content
- Vintage, tactile feel
- Works with any color theme

**Unified Component:**
```tsx
<BookSpineCard
  theme="pink" | "red" | "amber" | "green"
  mood="joy" | "sorrow" | "calm" | "unrest"
  genre="horror" | "mystery" | "romance" | "thriller"
>
  {content}
</BookSpineCard>
```

### 2. **Watching Eyes** 👁️
**Currently in:** Library, Dollhouse (different styles)
**Should extend to:** Forum, Profile, About

**Unification needed:**
- Same doll eye design everywhere
- Color-themed irises (pink for dollhouse, red for forum, amber for library)
- Same tracking/blinking behavior
- Same tear/blood drip effect

**Unified Component:**
```tsx
<WatchingEyes
  count={2-6}
  irisColor="pink" | "red" | "amber" | "green"
  intensity="subtle" | "medium" | "strong"
/>
```

### 3. **Atmospheric Glow** ✨
**Currently in:** All pages (different implementations)
**Needs:** Unified pulsing glow system

**Pattern:**
- Radial gradient from center
- Pulsing animation (3-4s cycle)
- Theme-specific color
- Blur effect

**Unified Component:**
```tsx
<AtmosphericGlow
  color="pink" | "red" | "amber" | "green"
  intensity="subtle" | "medium" | "strong"
  position="center" | "top" | "bottom"
/>
```

### 4. **Grain & Vignette** 📽️
**Currently in:** Dollhouse
**Should extend to:** All pages

**Why:**
- Vintage photograph feel
- Unifies the aesthetic
- Adds texture without noise
- Subtle depth

### 5. **Dripping Effects** 💧
**Currently in:** Dollhouse headers
**Should extend to:** Forum headers, Library headers

**Pattern:**
- Border with dripping animation
- Theme-colored drips
- Subtle, not overwhelming

### 6. **Floating Elements** 🌸
**Currently in:** Dollhouse (roses), Library (dust)
**Should extend to:** Forum (candle smoke?), Profile

**Theme-specific:**
- Dollhouse: Wilted roses 🥀
- Library: Dust motes, pages
- Forum: Candle smoke, whispers
- Archive: Matrix characters

## Proposed Unified Design System

### Core Components to Create

#### 1. **`<UnifiedCard>`**
Replaces: StoryCard, ForumCard, DiaryCard, BookmarkCard

```tsx
interface UnifiedCardProps {
  variant: 'book-spine' | 'flat' | 'terminal';
  theme: 'pink' | 'red' | 'amber' | 'green';
  mood?: 'joy' | 'sorrow' | 'calm' | 'unrest';
  genre?: 'horror' | 'mystery' | 'romance' | 'thriller';
  cover?: string;
  coverType?: 'image' | 'gif' | 'video';
  children: ReactNode;
  onClick?: () => void;
}
```

**Features:**
- Book spine 3D effect (all themes)
- Theme-colored borders and glows
- Mood/genre-specific animations
- Hover blurb reveal
- Consistent shadow depths

#### 2. **`<UnifiedBackground>`**
Replaces: DollhouseBackgroundEffects, LibraryBackground, GothicLibraryBackground

```tsx
interface UnifiedBackgroundProps {
  theme: 'pink' | 'red' | 'amber' | 'green';
  intensity: 'subtle' | 'medium' | 'strong';
  effects: {
    grain?: boolean;
    vignette?: boolean;
    watchingEyes?: boolean;
    floatingElements?: boolean;
    atmosphericGlow?: boolean;
  };
}
```

**Features:**
- Grain texture (all themes)
- Vignette darkness (all themes)
- Watching eyes (theme-colored irises)
- Floating elements (theme-specific)
- Atmospheric glow (theme-colored)

#### 3. **`<UnifiedHeader>`**
Replaces: DollhouseRoomHeader, Library header, Forum header

```tsx
interface UnifiedHeaderProps {
  title: string;
  subtitle?: string;
  onBack: () => void;
  theme: 'pink' | 'red' | 'amber' | 'green';
  rightElement?: ReactNode;
  showDrip?: boolean;
}
```

**Features:**
- Consistent layout
- Theme-colored title glow
- Dripping border effect
- Back button with animation
- Decorative icons

#### 4. **`<UnifiedEmptyState>`**
Already created for Dollhouse, extend to all pages

```tsx
interface UnifiedEmptyStateProps {
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
  theme: 'pink' | 'red' | 'amber' | 'green';
  icon: string;
}
```

## Color Theme Mapping

### Pink Theme (Dollhouse)
```ts
{
  primary: '#ffb6d9',
  glow: 'rgba(255, 182, 217, 0.4)',
  border: 'rgba(255, 182, 217, 0.3)',
  shadow: '0 0 20px rgba(255, 182, 217, 0.3)',
  floatingElement: '🥀',
  eyeIris: 'pink-600',
}
```

### Red Theme (Forum)
```ts
{
  primary: '#8B0000',
  glow: 'rgba(139, 0, 0, 0.4)',
  border: 'rgba(139, 0, 0, 0.3)',
  shadow: '0 0 20px rgba(139, 0, 0, 0.3)',
  floatingElement: '🕯️',
  eyeIris: 'red-600',
}
```

### Amber Theme (Library)
```ts
{
  primary: '#d97706',
  glow: 'rgba(217, 119, 6, 0.4)',
  border: 'rgba(217, 119, 6, 0.3)',
  shadow: '0 0 20px rgba(217, 119, 6, 0.3)',
  floatingElement: '📖',
  eyeIris: 'amber-600',
}
```

### Green Theme (Archive)
```ts
{
  primary: '#0F0',
  glow: 'rgba(0, 255, 0, 0.4)',
  border: 'rgba(0, 255, 0, 0.3)',
  shadow: '0 0 20px rgba(0, 255, 0, 0.5)',
  floatingElement: '💾',
  eyeIris: 'green-500',
}
```

## Typography Unification

### Current Issues
- Library uses `tracking-widest` for authors
- Forum uses `tracking-[0.3em]` for buttons
- Dollhouse uses `font-parisienne` for titles
- Inconsistent font sizes

### Proposed Standard
```ts
{
  title: {
    font: 'font-parisienne',
    size: 'text-5xl',
    tracking: 'tracking-wider',
  },
  subtitle: {
    font: 'font-serif',
    size: 'text-xs',
    tracking: 'tracking-wide',
    style: 'italic',
  },
  body: {
    font: 'font-serif',
    size: 'text-base',
    tracking: 'tracking-normal',
  },
  button: {
    font: 'font-serif',
    size: 'text-sm',
    tracking: 'tracking-widest',
    transform: 'uppercase',
  },
  mono: {
    font: 'font-mono',
    size: 'text-sm',
    tracking: 'tracking-tight',
  },
}
```

## Animation Timing Unification

### Current Issues
- Different pulse durations
- Different hover transitions
- Inconsistent easing

### Proposed Standard
```ts
{
  // Slow & Eerie
  atmosphericGlow: { duration: 4, ease: 'easeInOut' },
  eyeBlink: { duration: 4, ease: 'easeInOut' },
  floatingElement: { duration: 12, ease: 'easeInOut' },
  
  // Medium
  cardHover: { duration: 0.3, ease: 'easeOut' },
  pageTransition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  
  // Fast
  buttonPress: { duration: 0.1, ease: 'easeOut' },
  tooltipShow: { duration: 0.2, ease: 'easeOut' },
}
```

## Refactoring Strategy

### Phase 1: Create Unified Components ✅ (Partially Done)
- [x] `dollhouse-tokens.ts` (expand to app-wide)
- [x] `DollhouseBackgroundEffects` (rename to `UnifiedBackground`)
- [x] `DollhouseRoomHeader` (rename to `UnifiedHeader`)
- [x] `DollhouseContentCard` (rename to `UnifiedCard`)
- [x] `DollhouseEmptyState` (rename to `UnifiedEmptyState`)

### Phase 2: Extend Design Tokens
- [ ] Merge `dollhouse-tokens.ts` with `tokens.ts`
- [ ] Add red, amber, green themes
- [ ] Add genre-specific colors
- [ ] Add unified animation timings

### Phase 3: Refactor Library
- [ ] Replace `StoryCard` with `UnifiedCard`
- [ ] Add `UnifiedBackground` with amber theme
- [ ] Add `UnifiedHeader`
- [ ] Add grain & vignette
- [ ] Unify watching eyes

### Phase 4: Refactor Forum
- [ ] Replace forum cards with `UnifiedCard`
- [ ] Add `UnifiedBackground` with red theme
- [ ] Add `UnifiedHeader`
- [ ] Add grain & vignette
- [ ] Add watching eyes with red irises
- [ ] Add dripping effect to headers

### Phase 5: Refactor Archive
- [ ] Use `UnifiedCard` with terminal variant
- [ ] Use `UnifiedBackground` with green theme
- [ ] Keep Matrix rain as special effect
- [ ] Maintain mono font for code elements

### Phase 6: Cross-Page Elements
- [ ] Unified navigation transitions
- [ ] Consistent loading states
- [ ] Unified error states
- [ ] Consistent modal styling

## Benefits of Unification

### For Users
- **Cohesive Experience**: Every page feels part of the same app
- **Visual Continuity**: Easier navigation, less cognitive load
- **Thematic Consistency**: Each section has its color but shares DNA
- **Professional Polish**: Looks intentional, not patchwork

### For Developers
- **Code Reuse**: 70-80% less duplication
- **Easier Maintenance**: Change once, apply everywhere
- **Faster Development**: New pages use existing components
- **Better Testing**: Test components once, works everywhere

### For Performance
- **Smaller Bundle**: Shared components reduce size
- **Better Caching**: Same components cached across pages
- **Optimized Animations**: Shared animation controller
- **Lazy Loading**: Load effects once, reuse everywhere

## Questions to Resolve

1. **Should Forum cards use book spine aesthetic?**
   - Pro: Visual consistency, depth
   - Con: Might feel too "book-like" for discussions
   - **Proposal**: Use book spine but with red theme, call them "whisper cards"

2. **Should all pages have watching eyes?**
   - Pro: Unifying creepy element
   - Con: Might be too much on some pages
   - **Proposal**: Yes, but with theme-colored irises and adjustable intensity

3. **Should grain texture be on all pages?**
   - Pro: Vintage feel, unifies aesthetic
   - Con: Might make some pages feel dated
   - **Proposal**: Yes, but very subtle (0.02 opacity)

4. **Should Archive keep its unique style?**
   - Pro: Intentional contrast, "glitch in the system"
   - Con: Breaks cohesion
   - **Proposal**: Keep green theme and Matrix rain, but add grain/vignette for cohesion

5. **Should we unify the torch effect from Library?**
   - Pro: Unique interaction, engaging
   - Con: Might not fit other themes
   - **Proposal**: Keep as Library-specific feature, but add similar "reveal" effects to other pages

## Implementation Priority

### High Priority (Do First)
1. Merge design tokens into unified system
2. Create `UnifiedCard` component
3. Create `UnifiedBackground` component
4. Apply to Dollhouse (already started)
5. Apply to Library (most similar to Dollhouse)

### Medium Priority
6. Apply to Forum
7. Create unified navigation transitions
8. Unify watching eyes across all pages
9. Add grain texture to all pages

### Low Priority
10. Apply to Archive (keep unique elements)
11. Unify modals and overlays
12. Add seasonal themes
13. Sound design integration

## Success Metrics

- [ ] All pages use same design token system
- [ ] All cards share base component
- [ ] All backgrounds share base component
- [ ] All headers share base component
- [ ] Grain texture on all pages
- [ ] Vignette on all pages
- [ ] Watching eyes on all pages (theme-colored)
- [ ] Consistent animation timings
- [ ] Consistent typography
- [ ] 70%+ code reduction in visual components
- [ ] Bundle size reduction of 20%+
- [ ] User feedback: "feels cohesive"
