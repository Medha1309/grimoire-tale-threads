# Dollhouse Cursor - Complete Cleanup

## Problem
The Dollhouse cursor kept disappearing despite multiple fixes. The issue was caused by conflicting cursor rules and custom cursor components interfering with normal cursor behavior.

## Root Causes
1. **Complex CSS rules** - Multiple overlapping cursor rules fighting each other
2. **Custom cursor component** - ArtStudioCursor was hiding the default cursor
3. **Inline styles** - `document.body.style.cursor` and inline `style={{ cursor }}` overriding CSS
4. **Conflicting selectors** - CSS specificity issues

## Complete Solution

### 1. Simplified CSS Rules (`src/index.css`)

**Removed complex selectors, added clear hierarchy:**

```css
/* Hide cursor on non-standard pages */
body:not(.auth-page):not(.library-page):not(.forum-page):not(.dollhouse-page) button:not(.dollhouse-page *) {
  cursor: none !important;
}

/* Ensure dollhouse ALWAYS has normal cursors */
body.dollhouse-page,
body.dollhouse-page * {
  cursor: auto !important;
}

body.dollhouse-page button,
body.dollhouse-page a,
body.dollhouse-page [role="button"],
body.dollhouse-page .cursor-pointer {
  cursor: pointer !important;
}
```

### 2. Removed Custom Cursor Component

**File**: `src/components/art/ArtStudioEditor.tsx`

- Removed `ArtStudioCursor` import
- Removed `<ArtStudioCursor />` component
- Let browser handle cursor naturally

### 3. Removed Cursor Manipulation

**File**: `src/pages/Dollhouse.tsx`

- Removed `useEffect` that was setting `document.body.style.cursor`
- Removed inline `style={{ cursor: 'pointer' }}` from skip button
- Let CSS handle all cursor styling

### 4. Fixed Canvas Cursor

**File**: `src/components/art/GothicCanvas.tsx`

- Changed from `cursor: 'none'` to `cursor-crosshair` class
- Removed inline style cursor override
- Uses standard CSS cursor

## Files Modified

1. **src/index.css**
   - Simplified cursor rules
   - Added explicit dollhouse cursor styles
   - Removed conflicting selectors

2. **src/pages/Dollhouse.tsx**
   - Removed cursor useEffect
   - Removed inline cursor styles
   - Cleaned up skip button

3. **src/components/art/ArtStudioEditor.tsx**
   - Removed ArtStudioCursor component
   - Simplified to standard cursors

4. **src/components/art/GothicCanvas.tsx**
   - Changed to cursor-crosshair class
   - Removed cursor: none

## Result

✅ **Cursor always visible in Dollhouse**
✅ **Buttons show pointer cursor**
✅ **Canvas shows crosshair cursor**
✅ **No JavaScript cursor manipulation**
✅ **Pure CSS solution**
✅ **No conflicts or race conditions**
✅ **Works across all Dollhouse views**

## Why This Works

1. **CSS Specificity**: `body.dollhouse-page *` has higher specificity than generic rules
2. **!important on dollhouse**: Overrides all other cursor rules
3. **No JS interference**: Removed all `document.body.style.cursor` manipulation
4. **Standard cursors**: Uses browser-native cursor rendering
5. **Simple hierarchy**: Clear, predictable cursor behavior

## Testing Checklist

- [x] Cursor visible on Dollhouse home
- [x] Cursor visible on all rooms
- [x] Buttons show pointer
- [x] Canvas shows crosshair
- [x] Skip button shows pointer
- [x] Diary view cursor works
- [x] Scrapbook view cursor works
- [x] Art gallery cursor works
- [x] Archive views cursor works
- [x] No cursor flickering
- [x] No cursor disappearing

---

**The Dollhouse cursor is now permanently fixed with a simple, maintainable CSS solution.**
