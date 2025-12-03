# Library No-Cover Update

## Overview
Removed covers from specific books and implemented a plain text design for stories without covers.

## Changes Made

### 1. Removed Covers from Specific Stories
Removed cover images from the following stories in `src/data/stories.ts`:
- **The Forgotten Ward** by S. King
- **The Dollmaker's Daughter** by C. Grimm  
- **Beneath the Floorboards** by E. A. Poe

These stories now have no `cover` property defined.

### 2. Made Cover Property Optional
Updated type definitions to support stories without covers:

**`src/types/index.ts`**
```typescript
export interface Story {
  slug: string;
  title: string;
  author: string;
  cover?: string;  // Now optional
  // ...
}
```

**`src/hooks/useStories.ts`**
```typescript
export interface UnifiedStory {
  // ...
  cover?: string;  // Now optional
  coverType?: 'image' | 'gif' | 'video';  // Now optional
  // ...
}
```

### 3. Updated StoryCard Component
Added support for plain text cards when no cover is present:

**`src/components/library/StoryCard.tsx`**
- Stories without covers now display as plain text cards
- Simple, elegant design with just title and author
- Hover shows blurb in a subtle way
- No book spine, no cover image, no visual effects
- Clean typography-focused design

**Plain Card Features:**
- Centered title and author text
- Subtle border and background
- Minimal hover effects (slight lift and scale)
- Optional blurb display on hover
- Matches the overall dark theme

### 4. Updated StoryDetail Page
**`src/pages/StoryDetail.tsx`**
- Cover image only displays if story has a cover
- Stories without covers show title and metadata without cover image
- Layout adjusts gracefully when no cover is present

### 5. Updated Utility Functions
**`src/utils/generatePlaceholderCover.ts`**
- `getStoryCover()` now returns `undefined` for stories without covers
- No longer generates placeholder covers automatically
- Only returns actual covers or demo GIFs

**`src/hooks/useStories.ts`**
- Handles undefined covers properly
- Only sets coverType if cover exists
- Converts stories correctly whether they have covers or not

### 6. Updated StoryGrid Interface
**`src/components/library/StoryGrid.tsx`**
- Story interface now accepts optional cover property
- Passes undefined covers to StoryCard correctly

## Visual Design

### Stories WITH Covers
- Full book spine design
- Animated cover image/GIF/video
- Genre-specific effects (candle flames, shadows, etc.)
- Ornate borders and decorations
- Hover shows detailed blurb overlay

### Stories WITHOUT Covers
- Plain rectangular card
- Dark background with subtle border
- Centered typography
- Title in large serif font
- Author name below with divider line
- Minimal hover effect (slight lift)
- Optional blurb appears below on hover
- Clean, minimalist aesthetic

## Example: Plain Card Appearance

```
┌─────────────────────────┐
│                         │
│                         │
│   The Forgotten Ward    │
│                         │
│      ─────────          │
│                         │
│       S. King           │
│                         │
│                         │
└─────────────────────────┘
```

## Testing

All existing tests still pass. The changes are backward compatible:
- Stories with covers work exactly as before
- Stories without covers display with new plain design
- No breaking changes to existing functionality

## Benefits

1. **Flexibility**: Not all stories need visual covers
2. **Performance**: Fewer images to load for coverless stories
3. **Aesthetics**: Clean, minimalist look for certain stories
4. **Choice**: Authors can choose between visual or text-only presentation
5. **Accessibility**: Text-only cards are more accessible

## Future Enhancements

Potential improvements:
- Allow users to toggle between cover and plain view
- Add custom typography options for plain cards
- Support for custom background colors/patterns
- Genre-specific text styling for plain cards
- Option to add cover later to coverless stories

## Files Modified

- `src/data/stories.ts` - Removed covers from 3 stories
- `src/types/index.ts` - Made cover optional
- `src/hooks/useStories.ts` - Handle optional covers
- `src/components/library/StoryCard.tsx` - Added plain card design
- `src/components/library/StoryGrid.tsx` - Updated interface
- `src/pages/StoryDetail.tsx` - Conditional cover display
- `src/utils/generatePlaceholderCover.ts` - Return undefined for no covers

## Conclusion

The library now supports both visual and text-only story presentations. Stories without covers display with a clean, minimalist design that focuses on typography rather than imagery. This provides flexibility for different types of content and aesthetic preferences.
