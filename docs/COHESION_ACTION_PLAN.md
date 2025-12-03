# App-Wide Cohesion: Action Plan

## Executive Summary

Transform the app from 4 separate visual themes into 1 unified design system with 4 color variations. Every page will share the same visual DNA: book spine cards, watching eyes, grain texture, atmospheric glows, and dripping effects.

## The Vision

**"One Strange Mind, Four Haunted Rooms"**

Imagine walking through a Victorian mansion where every room was decorated by the same eccentric artist. Each room has its own color (pink bedroom, red parlour, amber library, green archive), but the same eerie touches appear everywhere: watching doll eyes, vintage grain, dripping borders, floating elements, and that unsettling book spine aesthetic.

## Phase 1: Unified Design System (Week 1)

### Step 1.1: Merge Design Tokens
**File:** `src/design-system/app-tokens.ts`

Combine `dollhouse-tokens.ts` and `tokens.ts` into one comprehensive system:

```ts
export const appTokens = {
  themes: {
    dollhouse: { primary: '#ffb6d9', ... },
    forum: { primary: '#8B0000', ... },
    library: { primary: '#d97706', ... },
    archive: { primary: '#0F0', ... },
  },
  typography: { /* unified */ },
  shadows: { /* unified */ },
  animations: { /* unified */ },
  effects: { /* unified */ },
}
```

### Step 1.2: Create Universal Components
**Folder:** `src/components/universal/`

1. **`UnifiedCard.tsx`**
   - Absorbs: StoryCard, DollhouseContentCard, Forum cards
   - Props: theme, variant, mood, genre
   - Features: Book spine 3D, theme glows, hover effects

2. **`UnifiedBackground.tsx`**
   - Absorbs: DollhouseBackgroundEffects, LibraryBackground, GothicLibraryBackground
   - Props: theme, intensity, effects config
   - Features: Grain, vignette, eyes, floating elements, glow

3. **`UnifiedHeader.tsx`**
   - Absorbs: DollhouseRoomHeader, Library header, Forum header
   - Props: theme, title, subtitle, onBack
   - Features: Dripping border, glowing title, back button

4. **`UnifiedEmptyState.tsx`**
   - Already created, just move and extend
   - Add theme support for all 4 themes

5. **`WatchingEyes.tsx`** (Universal)
   - Unify Library and Dollhouse eye implementations
   - Props: theme (determines iris color), count, intensity
   - Features: Doll eyes with theme-colored irises, tears, tracking

### Step 1.3: Create Theme Utilities
**File:** `src/utils/theme-utils.ts`

```ts
export const getThemeColors = (theme: Theme) => { /* ... */ }
export const getThemeFloatingElement = (theme: Theme) => { /* ... */ }
export const getThemeEyeColor = (theme: Theme) => { /* ... */ }
```

## Phase 2: Refactor Dollhouse (Week 1-2)

### Already Done ✅
- Created dollhouse-specific tokens
- Created shared background component
- Created shared header component
- Created shared card component
- Updated Scrapbook with navigation

### Remaining Tasks
- [ ] Apply `UnifiedCard` to Diary view
- [ ] Apply `UnifiedCard` to Bookmarks view
- [ ] Apply `UnifiedCard` to Library view (within dollhouse)
- [ ] Apply `UnifiedBackground` to all dollhouse views
- [ ] Apply `UnifiedHeader` to all dollhouse views
- [ ] Test navigation flow
- [ ] Verify performance

## Phase 3: Refactor Library (Week 2)

### Current State
- Custom StoryCard with book spine
- Torch lighting effect (keep as unique feature)
- Watching eyes (different implementation)
- Genre-specific effects

### Refactoring Steps

#### 3.1: Replace StoryCard
```tsx
// Before
<StoryCard
  title={story.title}
  author={story.author}
  cover={story.cover}
  genre={story.genre}
  onClick={() => goTo(story.slug)}
/>

// After
<UnifiedCard
  theme="library"
  variant="book-spine"
  genre={story.genre}
  cover={story.cover}
  onClick={() => goTo(story.slug)}
>
  <CardTitle>{story.title}</CardTitle>
  <CardAuthor>{story.author}</CardAuthor>
  <CardBlurb>{story.blurb}</CardBlurb>
</UnifiedCard>
```

#### 3.2: Add Unified Background
```tsx
<UnifiedBackground
  theme="library"
  intensity="medium"
  effects={{
    grain: true,
    vignette: true,
    watchingEyes: true,
    floatingElements: true, // dust motes, pages
    atmosphericGlow: true,
  }}
/>
```

#### 3.3: Replace Header
```tsx
<UnifiedHeader
  theme="library"
  title="LIBRARY"
  onBack={() => goTo('home')}
  rightElement={<WriteButton />}
  showDrip={true}
/>
```

#### 3.4: Keep Torch Effect
- Torch lighting is unique to Library
- Keep as special feature
- Layer on top of unified background

## Phase 4: Refactor Forum (Week 3)

### Current State
- Flat forum cards
- Gothic library background
- Red/gold color scheme
- Spiders, chandeliers

### Refactoring Steps

#### 4.1: Replace Forum Cards with Book Spine
```tsx
// Transform forum threads into "whisper cards"
<UnifiedCard
  theme="forum"
  variant="book-spine"
  mood={getMoodFromTags(thread.tags)}
  onClick={() => viewThread(thread.id)}
>
  <CardTitle>{thread.title}</CardTitle>
  <CardAuthor>{thread.authorName}</CardAuthor>
  <CardPreview>{thread.content}</CardPreview>
  <CardMeta>
    <Likes>{thread.likeCount}</Likes>
    <Replies>{thread.replyCount}</Replies>
  </CardMeta>
</UnifiedCard>
```

#### 4.2: Add Unified Background
```tsx
<UnifiedBackground
  theme="forum"
  intensity="strong"
  effects={{
    grain: true,
    vignette: true,
    watchingEyes: true, // red irises
    floatingElements: true, // candle smoke, whispers
    atmosphericGlow: true,
  }}
/>
```

#### 4.3: Keep Unique Elements
- Spiders (forum-specific)
- Chandeliers (forum-specific)
- Gossip effects (forum-specific)
- Layer on top of unified background

#### 4.4: Replace Header
```tsx
<UnifiedHeader
  theme="forum"
  title="THE GILDED PARLOUR"
  onBack={() => goTo('home')}
  rightElement={<WriteButton />}
  showDrip={true}
/>
```

## Phase 5: Refactor Archive (Week 3-4)

### Current State
- Matrix green theme
- Terminal aesthetic
- Matrix rain effect
- Mono font

### Refactoring Steps

#### 5.1: Use Terminal Variant
```tsx
<UnifiedCard
  theme="archive"
  variant="terminal" // special variant for Archive
  onClick={() => viewEntry(entry.id)}
>
  <TerminalHeader>ENTRY_{id}</TerminalHeader>
  <TerminalContent>{entry.content}</TerminalContent>
  <TerminalFooter>MOOD: {entry.mood}</TerminalFooter>
</UnifiedCard>
```

#### 5.2: Add Unified Background (with Matrix)
```tsx
<UnifiedBackground
  theme="archive"
  intensity="medium"
  effects={{
    grain: true, // subtle
    vignette: true,
    watchingEyes: true, // green irises
    floatingElements: true, // Matrix characters
    atmosphericGlow: true, // green
  }}
/>
```

#### 5.3: Keep Matrix Rain
- Matrix rain is unique to Archive
- Keep as special effect
- Layer on top of unified background

#### 5.4: Replace Header
```tsx
<UnifiedHeader
  theme="archive"
  title="SYSTEM ACCESS"
  subtitle="REALITY: UNCERTAIN"
  onBack={() => goTo('home')}
  showDrip={true} // green drips
/>
```

## Phase 6: Cross-Page Polish (Week 4)

### 6.1: Unified Transitions
Create page transition component:
```tsx
<PageTransition theme={currentTheme}>
  {children}
</PageTransition>
```

### 6.2: Unified Modals
Refactor all modals to use unified styling:
- CreateWhisperModal
- AddScrapbookModal
- CreateConfessionModal
- All use same base with theme colors

### 6.3: Unified Loading States
```tsx
<UnifiedLoader theme={currentTheme} />
```

### 6.4: Unified Error States
```tsx
<UnifiedError theme={currentTheme} message={error} />
```

## Implementation Checklist

### Week 1: Foundation
- [ ] Create `app-tokens.ts` (merge existing tokens)
- [ ] Create `UnifiedCard` component
- [ ] Create `UnifiedBackground` component
- [ ] Create `UnifiedHeader` component
- [ ] Create `WatchingEyes` universal component
- [ ] Create theme utilities
- [ ] Test components in isolation

### Week 2: Dollhouse & Library
- [ ] Apply unified components to all Dollhouse views
- [ ] Refactor Library StoryCard to use UnifiedCard
- [ ] Add unified background to Library
- [ ] Add unified header to Library
- [ ] Unify watching eyes in Library
- [ ] Test Dollhouse navigation
- [ ] Test Library interactions

### Week 3: Forum
- [ ] Refactor Forum cards to use UnifiedCard
- [ ] Add unified background to Forum
- [ ] Add unified header to Forum
- [ ] Add watching eyes with red irises
- [ ] Keep spiders and chandeliers as unique
- [ ] Test Forum interactions
- [ ] Test post creation and viewing

### Week 4: Archive & Polish
- [ ] Refactor Archive to use UnifiedCard (terminal variant)
- [ ] Add unified background to Archive
- [ ] Add unified header to Archive
- [ ] Keep Matrix rain as unique
- [ ] Create unified transitions
- [ ] Refactor all modals
- [ ] Create unified loading/error states
- [ ] Final testing and polish

## Testing Strategy

### Visual Regression Testing
- Screenshot each page before/after
- Verify color themes are correct
- Check animations are smooth
- Verify hover states work

### Performance Testing
- Measure bundle size before/after
- Check FPS during animations
- Verify lazy loading works
- Test on mobile devices

### User Testing
- Get feedback on cohesion
- Verify navigation feels natural
- Check if themes are distinct enough
- Ensure accessibility maintained

## Success Criteria

### Technical
- [ ] 70%+ code reduction in visual components
- [ ] 20%+ bundle size reduction
- [ ] All pages use unified design tokens
- [ ] All cards use UnifiedCard component
- [ ] All backgrounds use UnifiedBackground
- [ ] All headers use UnifiedHeader
- [ ] No visual regressions

### Visual
- [ ] Grain texture on all pages
- [ ] Vignette on all pages
- [ ] Watching eyes on all pages (theme-colored)
- [ ] Dripping borders on all headers
- [ ] Book spine aesthetic on all cards
- [ ] Consistent animation timings
- [ ] Consistent typography

### User Experience
- [ ] Pages feel cohesive
- [ ] Themes are distinct but related
- [ ] Navigation feels natural
- [ ] No jarring transitions
- [ ] Interactions are consistent
- [ ] Performance is maintained

## Rollback Plan

If issues arise:
1. Keep old components alongside new ones
2. Feature flag to toggle between old/new
3. Gradual rollout (one page at a time)
4. Monitor user feedback and metrics
5. Quick revert if critical issues found

## Documentation

### For Developers
- [ ] Component API documentation
- [ ] Theme customization guide
- [ ] Migration guide from old components
- [ ] Performance optimization tips

### For Designers
- [ ] Design system documentation
- [ ] Color theme guidelines
- [ ] Animation timing reference
- [ ] Accessibility guidelines

## Next Steps

1. **Review this plan** - Get feedback, adjust priorities
2. **Create unified tokens** - Start with design system foundation
3. **Build UnifiedCard** - Most impactful component
4. **Test in Dollhouse** - Already partially done
5. **Expand to Library** - Most similar to Dollhouse
6. **Continue to Forum** - More different, but manageable
7. **Finish with Archive** - Keep unique elements
8. **Polish and optimize** - Final touches

## Questions?

- Should we do this all at once or gradually?
- Which page should we refactor first after Dollhouse?
- Should Forum cards really use book spine aesthetic?
- How much of Archive's uniqueness should we preserve?
- Should we add sound effects while we're at it?
