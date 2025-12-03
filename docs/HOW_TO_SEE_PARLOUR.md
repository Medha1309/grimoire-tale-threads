# How to See the Gilded Parlour Wow Factor

## Quick Steps:

1. **Make sure dev server is running** ✅ (It is!)
   - You should see `npm run dev` running in your terminal

2. **Open your browser** and go to:
   ```
   http://localhost:5173/forum
   ```
   OR
   ```
   http://localhost:5173
   ```
   Then click "Forum" or "Parlour" in the navigation

3. **What You Should See:**

   ### On Page Load:
   - 🎭 **Dramatic curtain reveal** - Two black curtains sweep open from center
   - 🕯️ **Candle icon** with "Enter the parlour..." text
   - Fades to the main parlour after 2 seconds

   ### Once Inside:
   - 🩸 **Blood dripping** from the ceiling (5 drips at different positions)
   - 🦅 **Ravens flying** across the screen slowly
   - 🕯️ **Flickering candles** along the left and right edges
   - ❤️ **Pulsing blood red vignette** around the edges
   - ✨ **Massive dramatic title** "THE GILDED PARLOUR" with:
     - Blood red glow effect
     - Animated entrance (slides down)
     - Animated underline that draws in
     - Pulsing glow on hover
   - ✒️ **Premium "NEW POST" button** with:
     - Quill pen icon
     - Gradient background
     - Shimmer sweep effect
     - Enhanced glow on hover

## Troubleshooting:

### If you don't see it:
1. **Hard refresh** your browser: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
2. **Clear cache** and reload
3. **Check the URL** - make sure you're at `/forum`
4. **Check console** for any errors (F12 → Console tab)

### If curtain doesn't show:
- The curtain only shows once per page load
- Refresh the page to see it again
- It's controlled by `showCurtain` state

### If animations are laggy:
- Close other browser tabs
- Check if hardware acceleration is enabled in browser
- The animations are optimized but need decent GPU

## What Changed:

**Before:** Plain gothic library with subtle effects
**After:** Cinematic entrance + living environment with:
- Curtain reveal
- Blood drips
- Flying ravens
- Flickering candles
- Pulsing vignette
- Dramatic title treatment
- Premium button design

## Routes:

- Main forum list: `/forum`
- Specific thread: `/forum/{threadId}`
- From landing page: Click "Forum" or "Parlour" in nav

## Browser Compatibility:

Works best in:
- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari
- ⚠️ May have reduced effects on mobile

## Performance:

All animations are optimized:
- CSS transforms & opacity only
- Staggered delays
- Limited particle counts
- 60fps target
- GPU accelerated

Enjoy the wow factor! 🕯️🦅🩸
