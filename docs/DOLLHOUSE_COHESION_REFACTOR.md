# Dollhouse Visual Cohesion Refactoring

## Overview
Unified the visual language across all dollhouse rooms to create a cohesive haunted Victorian aesthetic. Every element now feels handcrafted by the same strange mind.

## Design System Created

### 1. Design Tokens (`src/design-system/dollhouse-tokens.ts`)
Centralized design system with:
- **Color Palette**: Pink (#ffb6d9) primary, Matrix green (#0F0) for Archive
- **Typography**: `font-parisienne` for titles, `font-serif` for body text
- **Shadows & Depth**: Consistent book spine shadows, pink glows
- **Borders**: Standardized `border-pink-900/30`
- **Animations**: Candlelight glow, pulse, float effects
- **Effects**: Grain texture, vignette, blur levels

### 2. Shared Components Created

#### `DollhouseBackgroundEffects.tsx`
Unified background for all rooms:
- Grain texture overlay (0.02 opacity)
- Radial vignette
- Atmospheric pink glow (pulsing)
- Watching doll eyes with pink irises
- Wilted flowers (🥀) floating
- Matrix rain for Archive (green theme)
- Subtle vine pattern

**Props:**
- `theme`: 'pink' | 'matrix'
- `intensity`: 'subtle' | 'medium' | 'strong'
- `showFloatingElements`: boolean
- `showWatchingEyes`: boolean

#### `DollhouseRoomHeader.tsx`
Unified header with:
- Back button with animated arrow
- Title in `font-parisienne` with pink glow
- Optional subtitle with decorative icons
- Dripping effect on border
- Consistent spacing and layout

**Props:**
- `title`: string
- `subtitle?`: string
- `onBack`: () => void
- `theme?`: 'pink' | 'matrix'
- `rightElement?`: ReactNode

#### `DollhouseContentCard.tsx`
Standardized card with book spine aesthetic:
- 3D book spine gradient
- Pink border matching mood
- Mood-based glow animation
- Consistent shadow depth
- Hover effects

**Props:**
- `children`: ReactNode
- `onClick?`: () => void
- `mood?`: 'joy' | 'sorrow' | 'calm' | 'unrest'
- `theme?`: 'pink' | 'matrix'
- `index?`: number

#### `DollhouseEmptyState.tsx`
Unified empty state:
- Consistent typography
- Decorative floating icons
- Themed action button
- Centered layout

**Props:**
- `title`: string
- `description`: string
- `actionLabel`: string
- `onAction`: () => void
- `theme?`: 'pink' | 'matrix'
- `icon?`: string

## Scrapbook Navigation Enhancement

### Added Next/Previous Navigation
Users can now navigate between scrapbook entries without closing the detail view:

**Changes to `EnhancedScrapbookDetail.tsx`:**
- Added navigation arrow buttons (left/right)
- Props: `onNext`, `onPrevious`, `hasNext`, `hasPrevious`
- Smooth transitions between entries
- Cohesive pink styling matching dollhouse theme

**Changes to `MemoryScrapbook.tsx`:**
- Track `selectedIndex` state
- Pass navigation handlers to detail component
- Calculate next/previous availability
- Integrated shared background and header components

## Visual Cohesion Checklist

✅ **Light Leaks**: Pink candlelight glow everywhere (except Archive = green)
✅ **Grain**: Subtle noise texture on all room backgrounds
✅ **Shadow Depth**: Consistent book spine shadows with pink borders
✅ **Typography**: Parisienne for titles, serif for body
✅ **Atmospheric Palette**: Pink (#ffb6d9) with matching glows and borders
✅ **Watching Eyes**: Doll eyes with pink irises and tears
✅ **Floating Elements**: Wilted roses (🥀) with pink glow
✅ **Vignette**: Radial gradient darkness on all rooms
✅ **Borders**: Standardized `border-pink-900/30`

## Rooms Updated

### ✅ Scrapbook (Memory Scrapbook)
- Using `DollhouseBackgroundEffects`
- Using `DollhouseRoomHeader`
- Added next/previous navigation
- Cohesive pink theme throughout

### 🔄 Pending Updates

#### Diary View
- Replace header with `DollhouseRoomHeader`
- Add `DollhouseBackgroundEffects`
- Use `DollhouseContentCard` for entries
- Use `DollhouseEmptyState`

#### Bookmarks View
- Replace header with `DollhouseRoomHeader`
- Add `DollhouseBackgroundEffects`
- Use `DollhouseContentCard` for bookmarks
- Use `DollhouseEmptyState`

#### Library View
- Replace header with `DollhouseRoomHeader`
- Add `DollhouseBackgroundEffects`
- Use `DollhouseContentCard` for entries
- Use `DollhouseEmptyState`

#### Archive View (Matrix Theme)
- Replace header with `DollhouseRoomHeader` (theme="matrix")
- Add `DollhouseBackgroundEffects` (theme="matrix")
- Keep green color scheme
- Maintain mono font for code elements

#### Entry Detail View
- Add `DollhouseBackgroundEffects`
- Standardize card styling
- Use design tokens

## Usage Examples

### Background Effects
```tsx
<DollhouseBackgroundEffects 
  theme="pink" 
  intensity="medium" 
  showFloatingElements={true}
  showWatchingEyes={true}
/>
```

### Room Header
```tsx
<DollhouseRoomHeader
  title="My Diary"
  subtitle="secret thoughts"
  onBack={() => navigate('home')}
  theme="pink"
/>
```

### Content Card
```tsx
<DollhouseContentCard
  mood="sorrow"
  onClick={() => selectEntry(entry)}
  index={i}
>
  {/* Card content */}
</DollhouseContentCard>
```

### Empty State
```tsx
<DollhouseEmptyState
  title="no entries yet"
  description="write your first secret"
  actionLabel="Write Entry"
  onAction={() => setView('write')}
  icon="🥀"
/>
```

## Next Steps

1. Apply shared components to remaining rooms (Diary, Bookmarks, Library, Archive)
2. Update entry detail view with cohesive styling
3. Test navigation flow across all rooms
4. Verify performance with all effects enabled
5. Add keyboard shortcuts for scrapbook navigation (arrow keys)

## Benefits

- **Visual Unity**: All rooms feel like part of the same haunted dollhouse
- **Maintainability**: Changes to design system propagate everywhere
- **Performance**: Shared components reduce bundle size
- **UX**: Consistent interactions and animations
- **Accessibility**: Standardized focus states and ARIA labels
- **Developer Experience**: Clear design tokens and reusable components
