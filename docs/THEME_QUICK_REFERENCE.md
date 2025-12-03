# Theme Consistency Quick Reference

**One-page cheat sheet for consistent Gothic/Halloween theming**

---

## 🎨 Color Usage

### Text Colors

```tsx
// ✅ Use these
text-gothic-bone          // Primary text (white-ish) - 16:1 contrast
text-gothic-fog-light     // Secondary text (light gray) - 8.9:1 contrast
text-gothic-fog           // Tertiary text (gray) - 5.8:1 contrast
text-gothic-candlelight   // Accent text (gold)

// ❌ Avoid these
text-zinc-100, text-zinc-400, text-zinc-500  // Use gothic.* instead
text-white, text-gray-400                    // Use gothic.* instead
```

### Background Colors

```tsx
// ✅ Use these
bg-gothic-shadow          // Pure black (#0a0a0a)
bg-gothic-shadow-light    // Near black (#171717)
bg-gothic-midnight        // Dark blue-black (#1a1c24)

// ❌ Avoid these
bg-black, bg-zinc-950, bg-zinc-900  // Use gothic.* instead
```

### Accent Colors

```tsx
// Gothic (default)
text-gothic-candlelight   // Gold accent
text-gothic-blood         // Red accent
text-gothic-crimson       // Crimson accent

// Theme-specific
text-dollhouse-primary    // Pink (for diary/personal)
text-parlour-primary      // Gold (for forum/elegant)
text-chains-primary       // Purple (for collaborative)
text-archive-primary      // Green (for history/retro)
```

---

## 📝 Typography

### Import

```tsx
import { typography } from '@/utils/themeClasses';
```

### Usage

```tsx
// Page titles
<h1 className={typography.pageTitle}>GRIMOIRE</h1>

// Section headers
<h2 className={typography.sectionTitle}>Featured Stories</h2>

// Card titles
<h3 className={typography.cardTitle}>Story Title</h3>

// Body text
<p className={typography.bodyPrimary}>Primary content...</p>
<p className={typography.bodySecondary}>Secondary content...</p>

// Small text
<span className={typography.caption}>Posted 2 hours ago</span>

// Buttons
<button className={typography.button}>Click Me</button>

// Labels
<label className={typography.label}>Your Name</label>
```

---

## 🔘 Buttons

### Import

```tsx
import { buttons } from '@/utils/themeClasses';
```

### Usage

```tsx
// Primary action (gold glow)
<button className={buttons.primary}>Save Story</button>

// Secondary action (neutral)
<button className={buttons.secondary}>Cancel</button>

// Ghost button (transparent)
<button className={buttons.ghost}>Learn More</button>

// Danger action (red glow)
<button className={buttons.danger}>Delete</button>

// Theme-specific
<button className={buttons.dollhouse}>Save to Diary</button>
<button className={buttons.parlour}>Post to Forum</button>
<button className={buttons.chains}>Start Collaboration</button>

// Small variants
<button className={buttons.primarySmall}>Edit</button>
<button className={buttons.secondarySmall}>Cancel</button>
```

---

## 🃏 Cards

### Import

```tsx
import { cards } from '@/utils/themeClasses';
```

### Usage

```tsx
// Standard card
<div className={cards.default}>
  <h3>Card Title</h3>
  <p>Card content...</p>
</div>

// Hoverable card (for clickable items)
<div className={cards.hoverable}>
  <h3>Story Card</h3>
</div>

// Elevated card (for important content)
<div className={cards.elevated}>
  <h3>Featured Content</h3>
</div>

// Glass card (for overlays)
<div className={cards.glass}>
  <h3>Modal Content</h3>
</div>

// Interactive card (with gold glow on hover)
<div className={cards.interactive}>
  <h3>Click to explore</h3>
</div>
```

---

## 📥 Form Inputs

### Import

```tsx
import { inputs } from '@/utils/themeClasses';
```

### Usage

```tsx
// Text input
<input 
  type="text" 
  className={inputs.text}
  placeholder="Enter text..."
/>

// Textarea
<textarea 
  className={inputs.textarea}
  placeholder="Write your story..."
  rows={5}
/>

// Select dropdown
<select className={inputs.select}>
  <option>Option 1</option>
  <option>Option 2</option>
</select>

// Checkbox
<input 
  type="checkbox" 
  className={inputs.checkbox}
/>

// Search input
<input 
  type="search" 
  className={inputs.search}
  placeholder="Search stories..."
/>
```

---

## 🏷️ Badges & Tags

### Import

```tsx
import { badges } from '@/utils/themeClasses';
```

### Usage

```tsx
// Default badge
<span className={badges.default}>Draft</span>

// Primary badge (gold)
<span className={badges.primary}>Featured</span>

// Status badges
<span className={badges.success}>Published</span>
<span className={badges.warning}>Pending</span>
<span className={badges.danger}>Deleted</span>

// Theme badges
<span className={badges.dollhouse}>Personal</span>
<span className={badges.parlour}>Discussion</span>
<span className={badges.chains}>Collaborative</span>
```

---

## 🎭 Backgrounds

### Import

```tsx
import { backgrounds } from '@/utils/themeClasses';
```

### Usage

```tsx
// Page background (gradient)
<section className={backgrounds.page}>
  {/* Page content */}
</section>

// Page with midnight tone
<section className={backgrounds.pageWithMidnight}>
  {/* Page content */}
</section>

// Solid black background
<section className={backgrounds.pageBlack}>
  {/* Page content */}
</section>

// Card backgrounds
<div className={backgrounds.card}>Card content</div>
<div className={backgrounds.cardElevated}>Elevated card</div>
<div className={backgrounds.cardGlass}>Glass card</div>

// Surface backgrounds
<div className={backgrounds.surface}>Surface</div>
<div className={backgrounds.surfaceHover}>Hoverable surface</div>

// Overlay backgrounds
<div className={backgrounds.overlay}>Modal overlay</div>
<div className={backgrounds.overlayDark}>Dark overlay</div>
```

---

## 🔲 Borders

### Import

```tsx
import { borders } from '@/utils/themeClasses';
```

### Usage

```tsx
// Standard borders
<div className={borders.default}>Default border</div>
<div className={borders.hover}>Hover border</div>
<div className={borders.focus}>Focus border</div>

// Theme borders
<div className={borders.dollhouse}>Pink border</div>
<div className={borders.parlour}>Gold border</div>
<div className={borders.chains}>Purple border</div>

// Glow borders
<div className={borders.glowGold}>Gold glow</div>
<div className={borders.glowPink}>Pink glow</div>
<div className={borders.glowPurple}>Purple glow</div>
<div className={borders.glowRed}>Red glow</div>
```

---

## ⏱️ Loading States

### Import

```tsx
import { loading } from '@/utils/themeClasses';
```

### Usage

```tsx
// Spinner
<div className={loading.spinner} />
<div className={loading.spinnerSmall} />

// Skeleton loader
<div className={`${loading.skeleton} h-20 w-full`} />

// Shimmer effect
<div className={loading.shimmer}>
  <div className="h-20 w-full bg-gothic-fog/10" />
</div>
```

---

## 🔄 Transitions

### Import

```tsx
import { transitions } from '@/utils/themeClasses';
```

### Usage

```tsx
// Standard transitions
<div className={transitions.fast}>Fast transition</div>
<div className={transitions.normal}>Normal transition</div>
<div className={transitions.slow}>Slow transition</div>

// Specific transitions
<div className={transitions.colors}>Color transition</div>
<div className={transitions.transform}>Transform transition</div>
<div className={transitions.opacity}>Opacity transition</div>
```

---

## 🛠️ Helper Function

### Combining Classes

```tsx
import { cn } from '@/utils/themeClasses';

// Combine multiple classes
<div className={cn(
  cards.default,
  isActive && borders.glowGold,
  'custom-class'
)}>
  Content
</div>

// With conditional classes
<button className={cn(
  buttons.primary,
  isLoading && 'opacity-50 cursor-not-allowed',
  isLarge && 'px-8 py-4 text-base'
)}>
  {isLoading ? 'Loading...' : 'Submit'}
</button>
```

---

## 📋 Complete Example

```tsx
import { 
  typography, 
  backgrounds, 
  cards, 
  buttons, 
  inputs,
  badges,
  cn 
} from '@/utils/themeClasses';

export const StoryCard = ({ story, onRead, featured }) => {
  return (
    <div className={cn(
      cards.hoverable,
      featured && borders.glowGold
    )}>
      {/* Title */}
      <h3 className={typography.cardTitle}>
        {story.title}
      </h3>
      
      {/* Author */}
      <p className={typography.bodySecondary}>
        by {story.author}
      </p>
      
      {/* Description */}
      <p className={typography.bodySmall}>
        {story.description}
      </p>
      
      {/* Tags */}
      <div className="flex gap-2 mt-4">
        <span className={badges.primary}>Horror</span>
        <span className={badges.default}>Complete</span>
      </div>
      
      {/* Action button */}
      <button 
        onClick={onRead}
        className={buttons.primary}
      >
        Read Now
      </button>
    </div>
  );
};
```

---

## 🎯 When to Use Each Theme

| Theme | Use For | Colors |
|-------|---------|--------|
| **Gothic** (default) | General pages, navigation, neutral content | Gold, bone, shadow |
| **Dollhouse** | Diary, journal, personal content | Pink, lavender, cream |
| **Parlour** | Forum, discussions, elegant features | Gold, bronze, crimson |
| **Chains** | Collaborative features, modern tech | Purple, indigo |
| **Archive** | Reading history, saved content, retro | Green, matrix |

---

## ✅ Do's and Don'ts

### ✅ Do

- Use `typography.*` for all text
- Use `buttons.*` for all buttons
- Use `cards.*` for all containers
- Use `backgrounds.*` for page/section backgrounds
- Use `cn()` to combine classes
- Use theme-specific colors appropriately

### ❌ Don't

- Don't use hardcoded colors (`#fff`, `rgba(...)`)
- Don't use generic Tailwind colors (`text-zinc-100`)
- Don't mix font families randomly
- Don't use inline styles for colors
- Don't forget contrast requirements (4.5:1 minimum)
- Don't use `text-white` or `bg-black` directly

---

## 🔍 Find & Replace Guide

Use VS Code Find & Replace (Ctrl+Shift+H):

```
Find: text-zinc-100
Replace: text-gothic-bone

Find: text-zinc-400
Replace: text-gothic-fog-light

Find: text-zinc-500
Replace: text-gothic-fog

Find: bg-black(?!\/)
Replace: bg-gothic-shadow

Find: bg-zinc-950
Replace: bg-gothic-shadow-light

Find: bg-zinc-900
Replace: bg-gothic-midnight
```

---

## 📊 Contrast Ratios

All colors meet WCAG AA standards (4.5:1 minimum):

| Color | On Black | Rating |
|-------|----------|--------|
| `text-gothic-bone` | 16:1 | ✅ AAA |
| `text-gothic-fog-light` | 8.9:1 | ✅ AAA |
| `text-gothic-fog` | 5.8:1 | ✅ AA |
| `text-gothic-candlelight` | 9.2:1 | ✅ AAA |

---

## 🚀 Quick Start

1. **Import utilities:**
   ```tsx
   import { typography, buttons, cards } from '@/utils/themeClasses';
   ```

2. **Replace inline classes:**
   ```tsx
   // Before
   <h1 className="font-serif text-4xl text-zinc-100">Title</h1>
   
   // After
   <h1 className={typography.pageTitle}>Title</h1>
   ```

3. **Test the change:**
   ```bash
   npm run dev
   ```

4. **Repeat for all components**

---

## 📚 Additional Resources

- Full audit: `docs/THEME_CONSISTENCY_AUDIT.md`
- Implementation guide: `docs/THEME_CONSISTENCY_IMPLEMENTATION.md`
- Design system: `src/design-system/colors.ts`
- Typography system: `src/design-system/typography.ts`

