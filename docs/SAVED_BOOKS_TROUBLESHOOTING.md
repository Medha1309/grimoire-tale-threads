# Saved Books Troubleshooting Guide

## How Saved Books Work

### Flow:
1. **Stories Page** → User clicks bookmark on a story
2. **localStorage** → Story saved to `bookmarkedStories` array
3. **Dollhouse** → Loads bookmarks from localStorage on mount
4. **SavedBooksView** → Displays the saved books

### Storage Location:
- **Key**: `bookmarkedStories`
- **Format**: JSON array of Story objects
- **Example**:
```json
[
  {
    "slug": "story-slug",
    "title": "Story Title",
    "author": "Author Name",
    "genre": "horror",
    "blurb": "Story description",
    "cover": "cover-url"
  }
]
```

## Common Issues

### Issue 1: Saved Books Not Showing
**Symptoms**: Bookmarks saved but don't appear in Dollhouse

**Possible Causes**:
1. localStorage not persisting
2. Different browser/incognito mode
3. localStorage cleared
4. Format mismatch

**Debug Steps**:
1. Open browser console
2. Run: `JSON.parse(localStorage.getItem('bookmarkedStories'))`
3. Check if array has items
4. Verify format matches expected structure

### Issue 2: Library Not Working
**Symptoms**: Can't access Stories page or bookmark stories

**Possible Causes**:
1. Stories hook not loading data
2. Firebase connection issue
3. Component not rendering

**Debug Steps**:
1. Check if Stories page loads
2. Check browser console for errors
3. Verify `useStories` hook is working
4. Check if bookmark button appears on story cards

### Issue 3: Bookmarks Not Persisting
**Symptoms**: Bookmarks disappear after refresh

**Possible Causes**:
1. localStorage disabled
2. Private/incognito mode
3. Browser storage full
4. Storage event not firing

**Debug Steps**:
1. Check browser settings for localStorage
2. Try in normal (non-incognito) mode
3. Clear some browser data
4. Check storage quota

## Quick Fixes

### Fix 1: Clear and Reset
```javascript
// In browser console
localStorage.removeItem('bookmarkedStories');
// Then refresh and try bookmarking again
```

### Fix 2: Manual Add for Testing
```javascript
// In browser console
const testBook = {
  slug: 'test-story',
  title: 'Test Story',
  author: 'Test Author',
  genre: 'horror',
  blurb: 'A test story for debugging'
};
const bookmarks = JSON.parse(localStorage.getItem('bookmarkedStories') || '[]');
bookmarks.push(testBook);
localStorage.setItem('bookmarkedStories', JSON.stringify(bookmarks));
// Then navigate to Dollhouse → Bookmarks
```

### Fix 3: Check Integration
1. Go to Stories page
2. Find any story
3. Click bookmark icon
4. Check console for errors
5. Go to Dollhouse
6. Click "Bookmarks" room
7. Should see the bookmarked story

## Testing Checklist

- [ ] Can access Stories page
- [ ] Stories load and display
- [ ] Bookmark button visible on stories
- [ ] Clicking bookmark shows feedback
- [ ] localStorage updated after bookmark
- [ ] Dollhouse loads bookmarks on mount
- [ ] SavedBooksView displays bookmarks
- [ ] Can remove bookmarks
- [ ] Can archive bookmarks
- [ ] Can view bookmarked stories

## Code Locations

### Bookmark Management:
- `src/hooks/useBookmarks.ts` - Main bookmark hook
- `src/hooks/useBookmarkManager.ts` - Individual story bookmarking
- `src/pages/StoryDetail.tsx` - Story detail with bookmark button

### Display:
- `src/components/library/SavedBooksView.tsx` - Saved books UI
- `src/pages/Dollhouse.tsx` - Integration point

### Storage:
- localStorage key: `bookmarkedStories`
- Format: JSON array of Story objects

## Need More Help?

If the issue persists:
1. Check browser console for errors
2. Verify localStorage is enabled
3. Try in a different browser
4. Clear all site data and start fresh
5. Check if Stories page works independently
