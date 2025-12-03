# Scrapbook Simple Test

## Clear Everything and Start Fresh

### Step 1: Clear Browser Cache
1. Open DevTools (F12)
2. Right-click the refresh button
3. Select "Empty Cache and Hard Reload"

OR

1. Press Ctrl+Shift+Delete (Cmd+Shift+Delete on Mac)
2. Clear "Cached images and files"
3. Click "Clear data"

### Step 2: Clear localStorage
1. Open DevTools (F12)
2. Go to "Application" tab
3. Click "Local Storage" → "http://localhost:5173"
4. Right-click → "Clear"

### Step 3: Refresh the Page
Press Ctrl+R (Cmd+R on Mac)

## Test the Scrapbook

1. **Go to Dollhouse**
   - Click "Dollhouse" in navigation

2. **Click Scrapbook Room**
   - Should stay on `/dollhouse` URL
   - Should NOT redirect to `/scrapbook`

3. **Click "Add Memory" Button**
   - Modal should open

4. **Select Layout**
   - Choose "1 Photo", "2 Photos", etc.

5. **Upload Image**
   - Click the upload area OR
   - Drag and drop an image

6. **Fill Form**
   - Title: "Test Memory" (required)
   - Thoughts: "This is a test" (required)
   - Tags, mood, location (optional)

7. **Click "Capture Memory"**
   - Modal should close
   - Entry should appear in grid

## If Upload Still Doesn't Work

### Check Console for Errors
1. Open DevTools (F12)
2. Go to "Console" tab
3. Look for red error messages
4. Share the error message

### Check Which Modal You're Seeing
Look at the modal - does it have:
- ✅ "Capture Memory" button → Correct (diary scrapbook)
- ❌ "Save Memory" button → Wrong (old version)

### Check URL
When you click scrapbook:
- ✅ URL stays `/dollhouse` → Correct
- ❌ URL changes to `/scrapbook` → Wrong (need to clear cache)

## Common Issues

### "Please fill in title and thoughts"
- Make sure BOTH title AND thoughts are filled in
- They're both required fields

### Image doesn't show after selecting
- Check file size (must be < 5MB)
- Check file type (must be image)
- Try a different image

### Modal doesn't close after saving
- Check browser console for errors
- Try refreshing the page

### Nothing saves
- Check localStorage isn't full
- Try clearing localStorage (see Step 2 above)
