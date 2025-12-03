# Dollhouse Cursor - Final Fix

## Problem

The cursor was disappearing in the Dollhouse page, making it invisible but still clickable. Users could interact with elements but couldn't see where their cursor was.

## Root Cause

The issue was in `src/index.css` with this global CSS rule:

```css
/* Hide cursor on all interactive elements (except auth/landing/library/forum) */
body:not(.auth-page):not(.library-page):not(.forum-page) button,
body:not(.auth-page):not(.library-page):not(.forum-page) a,
/* ... other selectors ... */
{
  cursor: none !important;
}
```

The Dollhouse page (`/diary`) was **not** classified as `auth-page`, `library-page`, or `forum-page`, so it was getting `cursor: none !important` applied to all interactive elements.

## Solution

### 1. Added `dollhouse-page` Class

**File**: `src/router/index.tsx`

Added detection for Dollhouse pages and applied the `dollhouse-page` class to the body:

```typescript
const isDollhousePage = location.pathname.startsWith('/diary');

useEffect(() => {
  document.body.classList.remove('auth-page', 'library-page', 'forum-page', 'dollhouse-page');
  
  if (isAuthPage || isLandingPage || isAboutPage) {
    document.body.classList.add('auth-page');
  } else if (isLibraryPage) {
    document.body.classList.add('library-page');
  } else if (isForumPage) {
    document.body.classList.add('forum-page');
  } else if (isDollhousePage) {
    document.body.classList.add('dollhouse-page');  // NEW
  }
  
  return () => {
    document.body.classList.remove('auth-page', 'library-page', 'forum-page', 'dollhouse-page');
  };
}, [isAuthPage, isLandingPage, isLibraryPage, isAboutPage, isForumPage, isDollhousePage]);
```

### 2. Updated CSS to Exclude Dollhouse

**File**: `src/index.css`

Updated the global cursor rule to exclude `dollhouse-page`:

```css
/* BEFORE */
body:not(.auth-page):not(.library-page):not(.forum-page) button {
  cursor: none !important;
}

/* AFTER */
body:not(.auth-page):not(.library-page):not(.forum-page):not(.dollhouse-page) button {
  cursor: none !important;
}
```

### 3. Added Explicit Pointer Cursor for Dollhouse

**File**: `src/index.css`

Added explicit `cursor: pointer` rules for Dollhouse interactive elements:

```css
body.dollhouse-page button,
body.dollhouse-page a,
body.dollhouse-page input,
body.dollhouse-page textarea,
body.dollhouse-page select,
body.dollhouse-page [role="button"],
body.dollhouse-page .cursor-pointer {
  cursor: pointer !important;
}
```

## Files Modified

1. `src/router/index.tsx`
   - Added `isDollhousePage` detection
   - Added `dollhouse-page` class to body
   - Updated cleanup to remove `dollhouse-page` class

2. `src/index.css`
   - Updated cursor: none rule to exclude `.dollhouse-page`
   - Added cursor: pointer rules for `.dollhouse-page`

## Testing Checklist

- [x] Cursor visible on Dollhouse home page
- [x] Cursor visible when hovering over rooms
- [x] Cursor changes to pointer on buttons
- [x] Cursor visible in diary view
- [x] Cursor visible in scrapbook view
- [x] Cursor visible in art studio
- [x] Cursor visible in gallery
- [x] Cursor visible in archive views
- [x] Skip animation button shows pointer cursor
- [x] All navigation buttons show pointer cursor

## Why This Happened

The original cursor system was designed to hide the default cursor on certain pages (About, Contact, etc.) to show custom cursors. However, the Dollhouse was added later and wasn't included in the exception list, causing the cursor to be hidden globally.

## Result

✅ Cursor now visible throughout the entire Dollhouse
✅ Buttons show pointer cursor on hover
✅ No interference with custom cursors in Art Studio
✅ Consistent behavior across all Dollhouse views

---

**The Dollhouse cursor is now fully functional and visible!**
