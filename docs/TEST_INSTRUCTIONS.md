# Testing GRIMR

## Quick Test

1. **Open your browser** to: http://localhost:5173/

2. **You should see:**
   - Black background
   - Flickering red "GRIMR" text in the center
   - "ENTER" button below
   - Very subtle spiders crawling slowly (wait 10-20 seconds)
   - Blood splatter when you click anywhere

3. **Click ENTER** to go to Stories page:
   - Book spines standing vertically
   - Hover over books to see titles
   - Flickering candle in bottom-right (desktop only)
   - Flies moving slowly in background
   - Click a book to open Reader

4. **Reader page:**
   - Open book with two pages
   - Candles on left and right (desktop only)
   - Wax drip timer at bottom
   - Text with occasional glitches

5. **Navigation:**
   - Use header buttons: Stories, About, Contact
   - Or "Back" buttons on each page

## If Page is Blank

### Option 1: Check Browser Console
1. Press F12 to open DevTools
2. Click "Console" tab
3. Look for red error messages
4. Share the error message

### Option 2: Verify Server is Running
```bash
# In terminal, you should see:
VITE v5.x.x  ready in XXX ms
➜  Local:   http://localhost:5173/
```

If not running:
```bash
npm run dev
```

### Option 3: Hard Refresh
- Windows: Ctrl + Shift + R
- Mac: Cmd + Shift + R

### Option 4: Check Network Tab
1. Open DevTools (F12)
2. Click "Network" tab
3. Refresh page
4. Look for any failed requests (red)

## Common Issues

### "Cannot GET /"
- Server not running
- Run: `npm run dev`

### White/Blank Screen
- JavaScript error (check console)
- Try hard refresh (Ctrl+Shift+R)

### Nothing Happens When Clicking
- Blood effect is very dark (#4a0000)
- Look closely near your cursor
- Try clicking on lighter areas

### Spiders Not Visible
- They're VERY slow (35-60 second cycles)
- Very subtle (opacity 0.4-0.5)
- Only 4-6 total
- Wait 20-30 seconds

### Candle Not Visible on Stories
- Only shows on desktop (lg: breakpoint)
- In bottom-right corner
- Try making window wider

## What to Expect

**Landing Page:**
- Almost completely black
- Red flickering "GRIMR" logo
- Small "ENTER" button
- 4 tiny slow-moving spiders
- Blood splatter on click

**Stories Page:**
- Dark shelf with 4 book spines
- Hover shows book info
- Candle flickering (bottom-right, desktop)
- 6 flies moving slowly
- Blood splatter on click

**Reader Page:**
- Open book appearance
- Two text columns
- Candles on sides (desktop)
- Wax timer below
- Blood splatter on click

**Contact Page:**
- Dark form on left
- CRT screen on right
- Girl silhouette in screen
- Blood splatter on click

**About Page:**
- Dark content cards
- 5 slow spiders
- 12 flies
- Blood splatter on click
- (3D skull disabled until model added)

## Everything is VERY DARK

This is intentional! The aesthetic is:
- Almost black backgrounds
- Subtle effects
- Slow movements
- Eerie atmosphere
- Realistic horror

If you can barely see things, that's correct!
