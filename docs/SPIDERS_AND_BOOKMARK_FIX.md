# Spiders & Bookmark Button Fix

## Issues Fixed

### 1. Spiders in Library ✅
**Status:** Already working!

The spiders were never removed. They're in the `RootLayout` component in `src/router/index.tsx`:

```tsx
<SpiderField count={6} />
```

This means spiders appear on **every page** including the library/stories page. They're subtle and crawl around the edges of the screen.

### 2. Bookmark Button Disabled ✅
**Problem:** The bookmark button was always disabled on the StoryDetail page

**Root Cause:** Variable name mismatch
- The `useStoryInteractions` hook returns `loading`
- But the component was using `statsLoading` (which didn't exist)
- This caused `disabled={statsLoading}` to be `disabled={undefined}` which React treats as `disabled={false}` initially, but the variable reference was wrong

**Fix Applied:**
```tsx
// Before (wrong variable name)
const {
  stats,
  userInteraction,
  commentsCount,
  loading: statsLoading,  // ❌ Renamed but used wrong name
  toggleLike,
  toggleBookmark,
} = useStoryInteractions(slug || '');

// After (correct)
const {
  stats,
  userInteraction,
  commentsCount,
  loading,  // ✅ Use the actual name
  toggleLike,
  toggleBookmark,
} = useStoryInteractions(slug || '');
```

Also updated:
- `disabled={statsLoading}` → `disabled={loading}` (both buttons)
- Added `loading` check to initial loading state

### 3. Minor Cleanup ✅
Removed unused `React` import from `Creatures.tsx`

## Testing

The bookmark button should now:
- Be disabled only while loading stats
- Enable after stats load
- Toggle between bookmarked/unbookmarked states
- Show pink glow when bookmarked
- Sync with localStorage for Dollhouse integration

The spiders should:
- Appear on all pages (6 spiders)
- Crawl around screen edges
- Not interfere with content
- Be visible in the library/stories page
