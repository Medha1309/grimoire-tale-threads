# Saved Books Quick Test Guide

## Test the Complete Flow

### Step 1: Bookmark a Story
1. Navigate to **Stories** page (Library)
2. Click on any story to open detail page
3. Click the **"Bookmark"** button
4. Button should change to **"Bookmarked"** with pink styling
5. Open browser console and run:
   ```javascript
   JSON.parse(localStorage.getItem('bookmarkedStories'))
   ```
6. You should see an array with your bookmarked story

### Step 2: View in Dollhouse
1. Navigate to **Dollhouse** page
2. Click on the **"Bookmarks"** room (should be one of the doors)
3. You should see your bookmarked story in the SavedBooksView
4. The story should display with title, author, genre, and blurb

### Step 3: Test Actions
1. **View**: Click on a bookmarked story → should navigate to story detail
2. **Archive**: Click "Archive" button → story moves to archive
3. **Remove**: Click "Remove" button → story removed from list

### Step 4: Test Filters
1. Add multiple bookmarks (different genres)
2. Use search bar to filter by title/author
3. Use genre dropdown to filter by genre
4. Use sort dropdown to change order
5. Toggle between Grid and List view

## If Something Doesn't Work

### Bookmark Button Not Showing
- Make sure you're logged in (bookmark requires authentication)
- Check if story detail page loads correctly
- Look for errors in browser console

### Bookmarks Not Appearing in Dollhouse
1. Check localStorage:
   ```javascript
   localStorage.getItem('bookmarkedStories')
   ```
2. If null or empty, bookmarks aren't being saved
3. If has data, check Dollhouse is loading it:
   - Look for useEffect in Dollhouse.tsx
   - Check setBookmarkedStories is being called

### Library Page Not Loading
- Check browser console for errors
- Verify useStories hook is working
- Check if Firebase is connected
- Try refreshing the page

## Manual Test Data

If you want to test without going through the full flow:

```javascript
// Add test bookmark directly
const testBookmark = {
  slug: 'test-story-' + Date.now(),
  title: 'Test Horror Story',
  author: 'Test Author',
  genre: 'horror',
  blurb: 'A spooky test story for debugging purposes',
  cover: ''
};

const bookmarks = JSON.parse(localStorage.getItem('bookmarkedStories') || '[]');
bookmarks.push(testBookmark);
localStorage.setItem('bookmarkedStories', JSON.stringify(bookmarks));

// Trigger storage event
window.dispatchEvent(new Event('storage'));

// Now go to Dollhouse → Bookmarks
```

## Expected Behavior

✅ **Working Correctly**:
- Bookmark button toggles on/off
- localStorage updates immediately
- Dollhouse shows bookmarks on load
- Can search, filter, and sort bookmarks
- Can view, archive, and remove bookmarks
- Archive count shows correctly

❌ **Not Working**:
- Bookmark button doesn't respond
- localStorage stays empty
- Dollhouse shows empty state despite bookmarks
- Actions (view/archive/remove) don't work
- Filters don't update the list

## Common Issues & Solutions

### Issue: "Your reading list is empty" but I have bookmarks
**Solution**: Check if bookmarkedStories state is being set in Dollhouse
```javascript
// In Dollhouse component, check if useEffect runs
console.log('Bookmarks loaded:', bookmarkedStories);
```

### Issue: Bookmarks disappear after refresh
**Solution**: localStorage might be disabled or in private mode
- Try normal browser mode (not incognito)
- Check browser settings for localStorage

### Issue: Can't bookmark stories
**Solution**: Make sure you're logged in
- Bookmark feature requires authentication
- Go to Login page first

### Issue: Library page is blank
**Solution**: Stories might not be loading
- Check useStories hook
- Verify Firebase connection
- Check browser console for errors
