# Color System Guide

## Overview

GRIMOIRE uses a carefully crafted color system that ensures high contrast, accessibility, and thematic consistency across all sections of the app.

## Theme Colors

### Dollhouse (Pink/Romantic)
```typescript
Primary: #ffb6d9 (Pink)
Background: #000000 (Black)
Text: #e4e4e7 (Light Gray)
Accent: #ff69b4 (Hot Pink)
```

**Use for**: Diary, Scrapbook, Personal spaces

### Parlour (Gold/Elegant)
```typescript
Primary: #e8c547 (Gold)
Background: #0f0b08 (Dark Brown)
Text: #ffffff (White)
Accent: #a31621 (Crimson)
```

**Use for**: Forum, Tea Room, Social spaces

### Chains (Purple/Modern)
```typescript
Primary: #8B5CF6 (Purple)
Background: #050508 (Near Black)
Text: #e4e4e7 (Light Gray)
Accent: #6366F1 (Indigo)
```

**Use for**: Collaborative writing, Tale Threads

### Archive (Matrix Green)
```typescript
Primary: #00FF00 (Bright Green)
Background: #000000 (Black)
Text: #00FF00 (Green)
```

**Use for**: Reading history, Archive room

### About (Neutral/Vintage)
```typescript
Primary: #a1a1aa (Gray)
Background: #0a0a0a (Black)
Text: #e0e0e0 (Light Gray)
Accent: #d4a574 (Sepia)
```

**Use for**: About page, Landing page

## Semantic Colors

These colors are **consistent across all themes** for user familiarity:

```typescript
// Success - Green
success: #22c55e
successLight: #86efac
successDark: #166534

// Error - Red
error: #ef4444
errorLight: #fca5a5
errorDark: #991b1b

// Warning - Amber
warning: #f59e0b
warningLight: #fcd34d
warningDark: #92400e

// Info - Blue
info: #3b82f6
infoLight: #93c5fd
infoDark: #1e40af
```

## Neutral Scale

Consistent gray scale for all themes:

```typescript
white: #ffffff
50: #fafafa
100: #f5f5f5
200: #e5e5e5
300: #d4d4d4
400: #a1a1a1
500: #737373
600: #525252
700: #404040
800: #262626
900: #171717
950: #0a0a0a
black: #000000
```

## Text Colors

### Dark Mode (Current)
```typescript
Primary: #e4e4e7   // 16:1 contrast - Main content
Secondary: #a1a1aa // 8.9:1 contrast - Supporting text
Tertiary: #71717a  // 5.8:1 contrast - Subtle text
Disabled: #52525b  // 4.6:1 contrast - Disabled state
```

### Light Mode (Future)
```typescript
Primary: #171717   // 16:1 contrast
Secondary: #525252 // 8.9:1 contrast
Tertiary: #737373  // 5.8:1 contrast
Disabled: #a1a1a1  // 4.6:1 contrast
```

## Usage Examples

### Import Colors

```typescript
import { 
  themeColors, 
  semanticColors, 
  neutralColors,
  textColors,
  getThemeColors,
  getContrastRatio,
  meetsWCAG 
} from '@/design-system/colors';
```

### Using Theme Colors

```tsx
// Get theme colors
const dollhouse = getThemeColors('dollhouse');

// Apply to component
<div 
  style={{
    background: dollhouse.background,
    color: textColors.dark.primary,
    borderColor: dollhouse.border,
  }}
>
  Content
</div>
```

### Using Semantic Colors

```tsx
// Success message
<div className="bg-green-500/10 border border-green-500/30 text-green-400">
  ✓ Successfully saved!
</div>

// Error message
<div className="bg-red-500/10 border border-red-500/30 text-red-400">
  ✗ An error occurred
</div>

// Warning message
<div className="bg-amber-500/10 border border-amber-500/30 text-amber-400">
  ⚠ Please review
</div>

// Info message
<div className="bg-blue-500/10 border border-blue-500/30 text-blue-400">
  ℹ Did you know?
</div>
```

### Checking Contrast

```typescript
import { getContrastRatio, meetsWCAG } from '@/design-system/colors';

// Check contrast ratio
const ratio = getContrastRatio('#ffb6d9', '#000000');
console.log(ratio); // 11.2:1

// Check WCAG compliance
const passesAA = meetsWCAG('#ffb6d9', '#000000', 'AA');
const passesAAA = meetsWCAG('#ffb6d9', '#000000', 'AAA');
```

### Adding Opacity

```typescript
import { withOpacity } from '@/design-system/colors';

const semiTransparent = withOpacity('#ffb6d9', 0.5);
// Returns: 'rgba(255, 182, 217, 0.5)'
```

### Glow Effects

```tsx
import { getGlowEffect } from '@/design-system/colors';

<h1 
  style={{
    color: '#ffb6d9',
    textShadow: getGlowEffect('dollhouse', 'medium'),
  }}
>
  Glowing Title
</h1>
```

## Tailwind Classes

### Theme Colors

```tsx
// Dollhouse
<div className="text-[#ffb6d9] bg-black border-[#ffb6d9]/20">

// Parlour
<div className="text-[#e8c547] bg-[#0f0b08] border-[#e8c547]/30">

// Chains
<div className="text-[#8B5CF6] bg-[#050508] border-[#8B5CF6]/30">
```

### Semantic Colors

```tsx
// Success
<div className="text-green-400 bg-green-500/10 border-green-500/30">

// Error
<div className="text-red-400 bg-red-500/10 border-red-500/30">

// Warning
<div className="text-amber-400 bg-amber-500/10 border-amber-500/30">

// Info
<div className="text-blue-400 bg-blue-500/10 border-blue-500/30">
```

### Neutral Colors

```tsx
// Text
<p className="text-zinc-100">Primary text</p>
<p className="text-zinc-400">Secondary text</p>
<p className="text-zinc-600">Tertiary text</p>

// Backgrounds
<div className="bg-zinc-950">Darkest</div>
<div className="bg-zinc-900">Dark</div>
<div className="bg-zinc-800">Medium</div>

// Borders
<div className="border border-zinc-800">
<div className="border border-zinc-700">
<div className="border border-zinc-600">
```

## Accessibility Guidelines

### Contrast Requirements

| Text Size | WCAG AA | WCAG AAA |
|-----------|---------|----------|
| Normal (< 18px) | 4.5:1 | 7:1 |
| Large (≥ 18px or ≥ 14px bold) | 3:1 | 4.5:1 |

### Best Practices

1. **Always check contrast** before using custom colors
2. **Use semantic colors** for feedback messages
3. **Don't rely on color alone** - use icons, labels, patterns
4. **Test with color blindness simulators**
5. **Provide text alternatives** for color-coded information

### Testing Tools

```typescript
// Check if combination is accessible
const isAccessible = meetsWCAG(
  '#ffb6d9',  // foreground
  '#000000',  // background
  'AA',       // level
  false       // large text?
);

// Get accessible text color for background
const textColor = getAccessibleTextColor('#ffb6d9');
```

## Common Patterns

### Card with Theme Color

```tsx
<div 
  className="p-6 rounded-lg border backdrop-blur-md"
  style={{
    background: 'rgba(0, 0, 0, 0.6)',
    borderColor: 'rgba(255, 182, 217, 0.2)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5), 0 0 30px rgba(255, 182, 217, 0.15)',
  }}
>
  <h3 className="text-[#ffb6d9] text-2xl mb-2">Card Title</h3>
  <p className="text-zinc-400">Card content</p>
</div>
```

### Button with Theme Color

```tsx
<button
  className="px-6 py-3 rounded-lg font-medium transition-all"
  style={{
    background: 'linear-gradient(135deg, rgba(255, 182, 217, 0.2), rgba(255, 182, 217, 0.1))',
    border: '1px solid rgba(255, 182, 217, 0.4)',
    color: '#ffb6d9',
    boxShadow: '0 0 20px rgba(255, 182, 217, 0.2)',
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.boxShadow = '0 0 30px rgba(255, 182, 217, 0.3)';
  }}
>
  Click Me
</button>
```

### Status Badge

```tsx
// Success
<span className="px-3 py-1 rounded-full text-xs font-medium
               bg-green-500/10 border border-green-500/30 text-green-400">
  Active
</span>

// Error
<span className="px-3 py-1 rounded-full text-xs font-medium
               bg-red-500/10 border border-red-500/30 text-red-400">
  Failed
</span>

// Warning
<span className="px-3 py-1 rounded-full text-xs font-medium
               bg-amber-500/10 border border-amber-500/30 text-amber-400">
  Pending
</span>
```

## Color Blindness Considerations

### Protanopia (Red-Blind)
- ✅ Use pink instead of red
- ✅ Combine with icons/labels
- ⚠️ Avoid red-green combinations

### Deuteranopia (Green-Blind)
- ✅ Use blue or purple alternatives
- ✅ Add patterns or textures
- ⚠️ Avoid green-only indicators

### Tritanopia (Blue-Blind)
- ✅ Use red or green alternatives
- ✅ Increase contrast
- ⚠️ Avoid blue-yellow combinations

## Migration Checklist

When updating colors in existing components:

- [ ] Check contrast ratios
- [ ] Use theme colors from design system
- [ ] Apply semantic colors for feedback
- [ ] Test with color blindness simulator
- [ ] Verify on different displays
- [ ] Test with browser zoom (200%)
- [ ] Check hover/focus states
- [ ] Validate with screen reader

## Resources

- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Color Blind Simulator](https://www.color-blindness.com/coblis-color-blindness-simulator/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
