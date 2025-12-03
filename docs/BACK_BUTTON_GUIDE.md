# 🔙 Back Button Standardization Guide

## Overview

All back buttons in the app now use a single, standardized component for consistency and maintainability.

## Component: BackButton

**Location**: `src/components/shared/BackButton.tsx`

### Basic Usage

```tsx
import { BackButton } from '../shared/BackButton';

<BackButton onClick={handleBack} />
```

## Variants

### 1. Default (Solid)
```tsx
<BackButton onClick={onBack} />
```

**Appearance**:
```
┌─────────┐
│ ← Back  │  Solid background
└─────────┘  Border visible
             Hover: Lifts & slides left
```

**Use When**:
- Main navigation
- Primary back action
- Needs to stand out

**Examples**:
- MemoryScrapbook
- PostView
- ArtStudioEditor

### 2. Minimal (Subtle)
```tsx
<BackButton onClick={onBack} variant="minimal" />
```

**Appearance**:
```
┌─────────┐
│ ← Back  │  Transparent background
└─────────┘  No border
             Hover: Subtle background appears
```

**Use When**:
- Secondary navigation
- Less emphasis needed
- Cleaner look desired

**Examples**:
- DiaryEntryView
- ThreadView
- SavedBooksView

### 3. Ghost (Transparent)
```tsx
<BackButton onClick={onBack} variant="ghost" />
```

**Appearance**:
```
← Back       No background
             No border
             Hover: Text color changes
```

**Use When**:
- Inline navigation
- Minimal visual weight
- Text-only appearance

**Examples**:
- PageHeader
- Inline navigation
- Compact layouts

## Props

```typescript
interface BackButtonProps {
  onClick: () => void;      // Required: Click handler
  label?: string;           // Optional: Custom text
  variant?: 'default' | 'minimal' | 'ghost';
  className?: string;       // Optional: Additional styles
}
```

## Examples

### With Custom Label
```tsx
<BackButton 
  onClick={onBack} 
  label="Back to Stories" 
/>
```

### With Custom Styling
```tsx
<BackButton 
  onClick={onBack} 
  className="mb-8 text-[#ffb6d9]" 
/>
```

### Different Variants
```tsx
// Solid button
<BackButton onClick={onBack} />

// Subtle button
<BackButton onClick={onBack} variant="minimal" />

// Text-only button
<BackButton onClick={onBack} variant="ghost" />
```

## Animation

All variants include:
- **Hover**: Scale 1.05, slide left 2px
- **Tap**: Scale 0.95
- **Duration**: 300ms smooth transition

```tsx
whileHover={{ scale: 1.05, x: -2 }}
whileTap={{ scale: 0.95 }}
```

## Accessibility

- ✅ `aria-label="Go back"` included
- ✅ Keyboard accessible
- ✅ Focus states
- ✅ Semantic button element

## Visual Comparison

```
┌──────────────────────────────────────────┐
│ DEFAULT VARIANT                          │
│ ┌─────────────┐                         │
│ │ ← Back      │  Solid bg, border       │
│ └─────────────┘                         │
│                                          │
│ MINIMAL VARIANT                          │
│ ┌─────────────┐                         │
│ │ ← Back      │  Subtle, no border      │
│ └─────────────┘                         │
│                                          │
│ GHOST VARIANT                            │
│ ← Back           Transparent, text only │
│                                          │
└──────────────────────────────────────────┘
```

## Color Scheme

### Default
- Background: `zinc-800/50`
- Text: `zinc-300`
- Border: `zinc-700/50`
- Hover bg: `zinc-800`
- Hover text: `white`
- Hover border: `zinc-600`

### Minimal
- Background: `transparent`
- Text: `zinc-400`
- Hover bg: `zinc-800/30`
- Hover text: `white`

### Ghost
- Background: `transparent`
- Text: `zinc-400`
- Hover text: `white`

## Migration Guide

### Before (Custom Button)
```tsx
<button
  onClick={onBack}
  className="flex items-center gap-2 text-sm text-zinc-400 
             hover:text-white transition-colors"
>
  <span>←</span>
  <span>Back</span>
</button>
```

### After (BackButton)
```tsx
<BackButton onClick={onBack} variant="minimal" />
```

**Benefits**:
- 5 lines → 1 line
- Consistent styling
- Built-in animations
- Accessible by default

## Where It's Used

### Already Implemented ✅
1. MemoryScrapbook
2. DiaryEntryView
3. PostView
4. ThreadView
5. PageHeader
6. PolishedArchiveView
7. DiaryListHeader
8. PageLayout
9. SavedBooksView
10. SavedQuotesView
11. ArtworkDetail
12. ArtStudioEditor
13. ArtGallery

### Theme-Specific (Custom) 🎨
- MatrixView (green theme)
- DollhouseRoomHeader (dollhouse theme)
- FigmaStyleEditor (uses Button component)

## Best Practices

### DO ✅
```tsx
// Use appropriate variant
<BackButton onClick={onBack} variant="minimal" />

// Add descriptive labels
<BackButton onClick={onBack} label="Back to Library" />

// Add spacing with className
<BackButton onClick={onBack} className="mb-8" />
```

### DON'T ❌
```tsx
// Don't create custom back buttons
<button onClick={onBack}>←</button>

// Don't override core styles
<BackButton onClick={onBack} className="bg-red-500" />

// Don't use for non-navigation
<BackButton onClick={handleSubmit} label="Submit" />
```

## Troubleshooting

### Button Not Showing
```tsx
// Check import
import { BackButton } from '../shared/BackButton';

// Check onClick is defined
const handleBack = () => navigate(-1);
<BackButton onClick={handleBack} />
```

### Styling Issues
```tsx
// Use className for spacing only
<BackButton onClick={onBack} className="mb-4" />

// Don't override variant styles
// Use variant prop instead
<BackButton onClick={onBack} variant="ghost" />
```

### Animation Not Working
```tsx
// Ensure framer-motion is installed
// BackButton uses motion.button internally
// No additional setup needed
```

## Testing

### Manual Testing
1. Click button → navigates back
2. Hover → scales and slides
3. Keyboard → Tab to focus, Enter to click
4. Mobile → Touch works smoothly

### Visual Testing
1. Check all three variants
2. Verify hover states
3. Test with/without labels
4. Check spacing

## Future Enhancements

### Potential Additions
- Icon customization
- Size variants (sm, md, lg)
- Color themes
- Loading state
- Disabled state

### Not Planned
- Multiple icons
- Complex animations
- Non-navigation uses

## Summary

The BackButton component provides:
- ✅ Consistent design across app
- ✅ 3 variants for different contexts
- ✅ Smooth animations
- ✅ Accessibility built-in
- ✅ Easy to use
- ✅ TypeScript support
- ✅ Customizable with className

Use it everywhere you need a back button! 🎉
