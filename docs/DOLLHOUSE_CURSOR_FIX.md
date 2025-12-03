# Dollhouse Cursor & Skip Animation Fix

## Issue
Users couldn't properly position the cursor to click the "Skip Animation" button in the Dollhouse page. The cursor appeared as default instead of pointer, making it unclear that buttons were clickable.

## Root Cause
1. **Body cursor override**: The Dollhouse page was setting `document.body.style.cursor = 'default'` which prevented buttons from showing the pointer cursor
2. **Z-index conflicts**: The skip button had z-index 100, but the flickering overlay had z-index 100 as well
3. **Missing explicit cursor styles**: Buttons didn't have explicit `cursor: pointer` styles

## Fixes Applied

### 1. Changed Body Cursor Style
**File**: `src/pages/Dollhouse.tsx`

```typescript
// BEFORE
document.body.style.cursor = 'default';

// AFTER
document.body.style.cursor = 'auto';
```

This allows buttons and interactive elements to show their natural cursor states (pointer for buttons, text for inputs, etc.)

### 2. Increased Z-Index for Skip Button
**File**: `src/pages/Dollhouse.tsx`

```typescript
// BEFORE
className="... z-[100] ..."

// AFTER
className="... z-[101] ... cursor-pointer"
style={{ cursor: 'pointer' }}
```

- Increased z-index from 100 to 101 to ensure it's above the flickering overlay
- Added explicit `cursor-pointer` class and inline style

### 3. Fixed Transition Skip Button
**File**: `src/components/diary/DollhouseTransition.tsx`

```typescript
// BEFORE
<motion.div className="... z-[100]">
  <motion.button onClick={handleSkip} className="...">

// AFTER
<motion.div className="... z-[10000] pointer-events-none">
  <motion.button 
    onClick={handleSkip} 
    className="... pointer-events-auto cursor-pointer"
    style={{ cursor: 'pointer' }}
  >
```

- Increased z-index to 10000 to be above all transition elements
- Added `pointer-events-none` to container and `pointer-events-auto` to button
- Added explicit cursor pointer styles

## Testing

### Manual Testing Steps:
1. Navigate to the Dollhouse page
2. Observe the "Skip Animation" button in the top-right corner
3. Hover over the button - cursor should change to pointer
4. Click the button - should skip to diary view
5. During the entrance transition, hover over "Skip to Dollhouse" button at bottom
6. Cursor should change to pointer
7. Click should skip the transition

### Expected Behavior:
- ✅ Cursor changes to pointer when hovering over skip buttons
- ✅ Buttons are clearly clickable
- ✅ Clicking works immediately without positioning issues
- ✅ No z-index conflicts with other elements
- ✅ Smooth hover effects work properly

## Additional Notes

### Why `cursor: auto` instead of `default`?
- `auto`: Allows elements to define their own cursor (buttons show pointer, text shows text cursor, etc.)
- `default`: Forces all elements to show the default arrow cursor, overriding button pointer cursors

### Z-Index Hierarchy:
- Transition overlay: 9999
- Transition skip button: 10000
- Dollhouse flickering overlay: 100
- Dollhouse skip button: 101
- Custom cursors: 9997-9999 (with pointer-events-none)

### Pointer Events Strategy:
- Container: `pointer-events-none` (allows clicks to pass through)
- Button: `pointer-events-auto` (captures clicks)
- This prevents the container from blocking clicks while allowing the button to be interactive

## Related Files
- `src/pages/Dollhouse.tsx` - Main dollhouse page with skip button
- `src/components/diary/DollhouseTransition.tsx` - Entrance transition with skip button
- `src/components/cursors/DollhouseCursor.tsx` - Custom cursor (already has pointer-events-none)

## Status
✅ **FIXED** - Cursor positioning and skip button functionality now work correctly
