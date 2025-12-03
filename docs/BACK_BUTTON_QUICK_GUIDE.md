# Back Button Quick Guide

## TL;DR

All back buttons now have smooth animations and consistent positioning. Use `variant="ghost"` for most pages.

## Quick Usage

### Standard Page
```tsx
import { BackButton } from '../components/shared/NavigationButtons';

<BackButton onClick={() => navigate(-1)} variant="ghost" />
```

### Fixed Position (Hero/Fullscreen)
```tsx
import { FixedBackButton } from '../components/shared/NavigationButtons';

<FixedBackButton onClick={() => navigate('/')} position="top-left" />
```

### Custom Label
```tsx
<BackButton 
  onClick={goBack} 
  variant="ghost"
  label="Back to Library"
/>
```

## Variants

| Variant | Use Case | Example |
|---------|----------|---------|
| `ghost` | Content pages, reading interfaces | Stories, Reader, Forum |
| `default` | General navigation | Forms, standard pages |
| `prominent` | Primary actions, emphasis needed | Landing, CTAs |

## What's New?

✨ **Hover Effects**
- Scales to 1.05x
- Slides left 4px (ghost variant)
- Arrow moves independently
- Subtle glow appears

🎯 **Spring Physics**
- Natural, bouncy animations
- Smooth transitions
- Tactile feedback

📍 **Consistent Positioning**
- Fixed position wrapper
- Automatic entrance animation
- Proper z-index management

## Visual Test

Open `public/test-back-buttons.html` to see all variants and animations in action.

## Full Documentation

See `docs/BACK_BUTTON_ENHANCED.md` for complete details.
