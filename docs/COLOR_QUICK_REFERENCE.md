# Color System Quick Reference

## Theme Colors

| Theme | Primary | Background | Text | Contrast |
|-------|---------|------------|------|----------|
| **Dollhouse** | `#ffb6d9` | `#000000` | `#e4e4e7` | 11.2:1 ✅ |
| **Parlour** | `#e8c547` | `#0f0b08` | `#ffffff` | 12.4:1 ✅ |
| **Chains** | `#8B5CF6` | `#050508` | `#e4e4e7` | 6.8:1 ✅ |
| **Archive** | `#00FF00` | `#000000` | `#00FF00` | 15.3:1 ✅ |
| **About** | `#a1a1aa` | `#0a0a0a` | `#e0e0e0` | 8.8:1 ✅ |

## Semantic Colors

```typescript
Success: #22c55e  // Green
Error:   #ef4444  // Red
Warning: #f59e0b  // Amber
Info:    #3b82f6  // Blue
```

## Text Colors (Dark Mode)

```typescript
Primary:   #e4e4e7  // 16:1 contrast
Secondary: #a1a1aa  // 8.9:1 contrast
Tertiary:  #71717a  // 5.8:1 contrast
Disabled:  #52525b  // 4.6:1 contrast
```

## Neutral Scale

```typescript
white: #ffffff
100:   #f5f5f5
200:   #e5e5e5
300:   #d4d4d4
400:   #a1a1a1
500:   #737373
600:   #525252
700:   #404040
800:   #262626
900:   #171717
black: #000000
```

## Quick Usage

### Dollhouse Theme
```tsx
<div className="text-[#ffb6d9] bg-black border-[#ffb6d9]/20">
  Dollhouse content
</div>
```

### Parlour Theme
```tsx
<div className="text-[#e8c547] bg-[#0f0b08] border-[#e8c547]/30">
  Parlour content
</div>
```

### Chains Theme
```tsx
<div className="text-[#8B5CF6] bg-[#050508] border-[#8B5CF6]/30">
  Chains content
</div>
```

### Success Message
```tsx
<div className="text-green-400 bg-green-500/10 border-green-500/30">
  ✓ Success!
</div>
```

### Error Message
```tsx
<div className="text-red-400 bg-red-500/10 border-red-500/30">
  ✗ Error!
</div>
```

## Glow Effects

```typescript
// Dollhouse
textShadow: '0 0 20px rgba(255, 182, 217, 0.4)'

// Parlour
textShadow: '0 0 20px rgba(232, 197, 71, 0.4)'

// Chains
textShadow: '0 0 20px rgba(139, 92, 246, 0.4)'

// Archive
textShadow: '0 0 20px rgba(0, 255, 0, 0.5)'
```

## Contrast Checker

```typescript
import { getContrastRatio, meetsWCAG } from '@/design-system/colors';

// Check ratio
const ratio = getContrastRatio('#ffb6d9', '#000000');

// Check WCAG
const passes = meetsWCAG('#ffb6d9', '#000000', 'AA');
```

## WCAG Standards

| Level | Normal Text | Large Text |
|-------|-------------|------------|
| **AA** | 4.5:1 | 3:1 |
| **AAA** | 7:1 | 4.5:1 |

Large text = 18px+ or 14px+ bold

## Common Patterns

### Card
```tsx
<div className="p-6 bg-zinc-900/30 border border-zinc-800 rounded-lg">
  <h3 className="text-zinc-100 text-xl mb-2">Title</h3>
  <p className="text-zinc-400">Content</p>
</div>
```

### Button
```tsx
<button className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 
                   text-zinc-100 rounded-lg transition-colors">
  Click Me
</button>
```

### Input
```tsx
<input className="px-4 py-2 bg-zinc-900 border border-zinc-700
                  text-zinc-100 rounded-lg focus:border-zinc-500" />
```

### Badge
```tsx
<span className="px-3 py-1 bg-zinc-800 text-zinc-300 
                 text-xs rounded-full">
  Badge
</span>
```

## Accessibility Checklist

- ✅ Contrast ratio ≥ 4.5:1 for normal text
- ✅ Contrast ratio ≥ 3:1 for large text
- ✅ Don't rely on color alone
- ✅ Use icons with colors
- ✅ Test with color blindness simulator
- ✅ Provide text alternatives

## Import

```typescript
import {
  themeColors,
  semanticColors,
  neutralColors,
  textColors,
  getThemeColors,
  getContrastRatio,
  meetsWCAG,
  withOpacity,
} from '@/design-system/colors';
```

## Utilities

```typescript
// Get theme
const theme = getThemeColors('dollhouse');

// Add opacity
const color = withOpacity('#ffb6d9', 0.5);
// Returns: 'rgba(255, 182, 217, 0.5)'

// Check contrast
const ratio = getContrastRatio('#ffb6d9', '#000000');
// Returns: 11.2

// Check WCAG
const passes = meetsWCAG('#ffb6d9', '#000000', 'AA');
// Returns: true
```

## Do's and Don'ts

### ✅ Do
- Use theme colors for branding
- Use semantic colors for feedback
- Check contrast ratios
- Test with assistive technologies
- Provide multiple indicators (color + icon)

### ❌ Don't
- Use color as only indicator
- Ignore contrast requirements
- Mix too many theme colors
- Use low contrast for important text
- Forget to test accessibility
