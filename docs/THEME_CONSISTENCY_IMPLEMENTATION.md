# Theme Consistency Implementation Guide

**Quick reference for fixing theme consistency issues**

---

## 🎨 Phase 1: Update Tailwind Config (5 min)

### Add Gothic Theme Colors

Update `tailwind.config.js`:

```javascript
colors: {
  // Gothic Horror Theme (Primary - use by default)
  gothic: {
    blood: '#8B0000',
    'blood-light': '#a31621',
    bone: '#F5F1E8',
    'bone-dim': '#d4d4d8',
    shadow: '#0a0a0a',
    'shadow-light': '#171717',
    fog: '#71717a',
    'fog-light': '#a1a1aa',
    candlelight: '#d4af37',
    'candlelight-dim': '#b89b3e',
    crimson: '#a31621',
    midnight: '#1a1c24',
    parchment: '#e8dcc4',
  },
  
  // Keep existing theme colors...
  dollhouse: { /* ... */ },
  parlour: { /* ... */ },
  chains: { /* ... */ },
}
```

---

## 📝 Phase 2: Create Utility Classes (10 min)

### Typography Utilities

Create `src/utils/themeClasses.ts`:

```typescript
/**
 * Unified theme utility classes
 * Use these instead of inline Tailwind classes for consistency
 */

// ============================================================================
// TYPOGRAPHY
// ============================================================================

export const typography = {
  // Page titles - dramatic and commanding
  pageTitle: 'font-display text-5xl font-bold leading-tight tracking-widest text-gothic-bone uppercase',
  
  // Section headers
  sectionTitle: 'font-display text-3xl font-semibold leading-snug tracking-wide text-gothic-bone',
  
  // Subsection headers
  subsectionTitle: 'font-display text-2xl font-semibold leading-snug text-gothic-bone',
  
  // Card titles
  cardTitle: 'font-body text-xl font-semibold leading-normal text-gothic-bone',
  
  // Body text
  bodyPrimary: 'font-body text-base font-normal leading-relaxed text-gothic-bone',
  bodySecondary: 'font-body text-base font-normal leading-relaxed text-gothic-fog',
  bodySmall: 'font-body text-sm font-normal leading-normal text-gothic-fog',
  
  // UI elements
  button: 'font-ui text-sm font-medium leading-normal tracking-wide uppercase',
  label: 'font-ui text-sm font-medium leading-normal tracking-wide text-gothic-fog-light',
  caption: 'font-body text-xs font-normal leading-normal text-gothic-fog',
  
  // Special
  emphasis: 'font-body text-base font-medium italic text-gothic-bone',
  decorative: 'font-decorative text-2xl font-normal leading-snug text-gothic-candlelight',
};

// ============================================================================
// BACKGROUNDS
// ============================================================================

export const backgrounds = {
  // Page backgrounds
  page: 'bg-gradient-to-b from-gothic-shadow via-gothic-shadow-light to-gothic-shadow',
  pageWithMidnight: 'bg-gradient-to-b from-gothic-shadow via-gothic-midnight to-gothic-shadow',
  
  // Card backgrounds
  card: 'bg-gothic-shadow-light/80 backdrop-blur-sm',
  cardElevated: 'bg-gothic-shadow-light/90 backdrop-blur-md',
  cardGlass: 'bg-gothic-shadow/30 backdrop-blur-xl',
  
  // Surface backgrounds
  surface: 'bg-gothic-midnight/50',
  surfaceHover: 'hover:bg-gothic-midnight/70',
};

// ============================================================================
// BORDERS
// ============================================================================

export const borders = {
  // Standard borders
  default: 'border border-gothic-fog/20',
  hover: 'border border-gothic-fog/30 hover:border-gothic-fog/50',
  focus: 'border-2 border-gothic-candlelight/60 focus:border-gothic-candlelight',
  
  // Themed borders
  dollhouse: 'border border-dollhouse-primary/30 hover:border-dollhouse-primary/50',
  parlour: 'border border-parlour-primary/30 hover:border-parlour-primary/50',
  chains: 'border border-chains-primary/30 hover:border-chains-primary/50',
  
  // Glow borders
  glowGold: 'border border-gothic-candlelight/40 shadow-[0_0_20px_rgba(212,175,55,0.3)]',
  glowPink: 'border border-dollhouse-primary/40 shadow-[0_0_20px_rgba(255,182,217,0.3)]',
  glowPurple: 'border border-chains-primary/40 shadow-[0_0_20px_rgba(139,92,246,0.3)]',
};

// ============================================================================
// BUTTONS
// ============================================================================

export const buttons = {
  // Primary button
  primary: `
    ${typography.button}
    px-6 py-3 rounded-lg
    bg-gothic-candlelight/20 text-gothic-candlelight
    border-2 border-gothic-candlelight/60
    hover:bg-gothic-candlelight/30 hover:border-gothic-candlelight
    shadow-[0_0_20px_rgba(212,175,55,0.3)]
    hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]
    transition-all duration-300
    disabled:opacity-50 disabled:cursor-not-allowed
  `.replace(/\s+/g, ' ').trim(),
  
  // Secondary button
  secondary: `
    ${typography.button}
    px-6 py-3 rounded-lg
    bg-gothic-shadow-light/50 text-gothic-fog-light
    border-2 border-gothic-fog/30
    hover:bg-gothic-shadow-light/70 hover:border-gothic-fog/50 hover:text-gothic-bone
    transition-all duration-300
    disabled:opacity-50 disabled:cursor-not-allowed
  `.replace(/\s+/g, ' ').trim(),
  
  // Ghost button
  ghost: `
    ${typography.button}
    px-6 py-3 rounded-lg
    bg-transparent text-gothic-fog-light
    border-2 border-transparent
    hover:bg-gothic-shadow-light/30 hover:text-gothic-bone
    transition-all duration-300
    disabled:opacity-50 disabled:cursor-not-allowed
  `.replace(/\s+/g, ' ').trim(),
  
  // Danger button
  danger: `
    ${typography.button}
    px-6 py-3 rounded-lg
    bg-gothic-blood/20 text-gothic-blood-light
    border-2 border-gothic-blood/60
    hover:bg-gothic-blood/30 hover:border-gothic-blood-light
    shadow-[0_0_20px_rgba(139,0,0,0.3)]
    hover:shadow-[0_0_30px_rgba(139,0,0,0.5)]
    transition-all duration-300
    disabled:opacity-50 disabled:cursor-not-allowed
  `.replace(/\s+/g, ' ').trim(),
};

// ============================================================================
// CARDS
// ============================================================================

export const cards = {
  // Standard card
  default: `
    ${backgrounds.card}
    ${borders.default}
    rounded-lg p-6
    shadow-lg
    transition-all duration-300
  `.replace(/\s+/g, ' ').trim(),
  
  // Hoverable card
  hoverable: `
    ${backgrounds.card}
    ${borders.hover}
    rounded-lg p-6
    shadow-lg hover:shadow-xl
    hover:scale-[1.02]
    transition-all duration-300
    cursor-pointer
  `.replace(/\s+/g, ' ').trim(),
  
  // Elevated card
  elevated: `
    ${backgrounds.cardElevated}
    ${borders.default}
    rounded-xl p-8
    shadow-2xl
    transition-all duration-300
  `.replace(/\s+/g, ' ').trim(),
  
  // Glass card
  glass: `
    ${backgrounds.cardGlass}
    ${borders.default}
    rounded-lg p-6
    shadow-lg
    transition-all duration-300
  `.replace(/\s+/g, ' ').trim(),
};

// ============================================================================
// INPUTS
// ============================================================================

export const inputs = {
  // Text input
  text: `
    ${typography.bodyPrimary}
    w-full px-4 py-3 rounded-lg
    bg-gothic-midnight/80 text-gothic-bone
    ${borders.default}
    focus:${borders.focus}
    placeholder:text-gothic-fog
    transition-all duration-200
    disabled:opacity-50 disabled:cursor-not-allowed
  `.replace(/\s+/g, ' ').trim(),
  
  // Textarea
  textarea: `
    ${typography.bodyPrimary}
    w-full px-4 py-3 rounded-lg
    bg-gothic-midnight/80 text-gothic-bone
    ${borders.default}
    focus:${borders.focus}
    placeholder:text-gothic-fog
    resize-none
    transition-all duration-200
    disabled:opacity-50 disabled:cursor-not-allowed
  `.replace(/\s+/g, ' ').trim(),
  
  // Select
  select: `
    ${typography.bodyPrimary}
    w-full px-4 py-3 rounded-lg
    bg-gothic-midnight/80 text-gothic-bone
    ${borders.default}
    focus:${borders.focus}
    appearance-none cursor-pointer
    transition-all duration-200
    disabled:opacity-50 disabled:cursor-not-allowed
  `.replace(/\s+/g, ' ').trim(),
};

// ============================================================================
// HELPER FUNCTION
// ============================================================================

/**
 * Combine multiple utility classes
 */
export const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

export default {
  typography,
  backgrounds,
  borders,
  buttons,
  cards,
  inputs,
  cn,
};
```

---

## 🔄 Phase 3: Replace Hardcoded Colors (30 min)

### Common Replacements

| ❌ Old (Hardcoded) | ✅ New (Design Token) |
|-------------------|----------------------|
| `text-zinc-100` | `text-gothic-bone` |
| `text-zinc-400` | `text-gothic-fog-light` |
| `text-zinc-500` | `text-gothic-fog` |
| `bg-black` | `bg-gothic-shadow` |
| `bg-zinc-950` | `bg-gothic-shadow-light` |
| `bg-zinc-900` | `bg-gothic-midnight` |
| `#d4af37` | `gothic-candlelight` |
| `#ffb6d9` | `dollhouse-primary` |
| `#8B5CF6` | `chains-primary` |

### Find & Replace Commands

```bash
# In VS Code, use Find & Replace (Ctrl+Shift+H):

# Text colors
Find: text-zinc-100
Replace: text-gothic-bone

Find: text-zinc-400
Replace: text-gothic-fog-light

Find: text-zinc-500
Replace: text-gothic-fog

# Background colors
Find: bg-black(?!\/)
Replace: bg-gothic-shadow

Find: bg-zinc-950
Replace: bg-gothic-shadow-light

Find: bg-zinc-900
Replace: bg-gothic-midnight

# Border colors
Find: border-zinc-800
Replace: border-gothic-fog/30

Find: border-zinc-700
Replace: border-gothic-fog/50
```

---

## 🎯 Phase 4: Update Components (1-2 hours)

### Example: Before & After

#### ❌ Before (Inconsistent)

```tsx
// StoryDetail.tsx
<section className="relative min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-zinc-100">
  <h1 className="mb-4 font-serif text-4xl text-zinc-100">{story.title}</h1>
  <p className="mb-4 text-lg text-zinc-500">by {story.author}</p>
  
  <button
    className="px-6 py-3 rounded-lg font-serif text-sm transition-all flex items-center gap-2
      bg-[#ffb6d9]/20 text-[#ffb6d9] border-2 border-[#ffb6d9]/60 
      shadow-[0_0_20px_rgba(255,182,217,0.3)]"
  >
    Bookmark
  </button>
</section>
```

#### ✅ After (Consistent)

```tsx
// StoryDetail.tsx
import { typography, backgrounds, buttons } from '@/utils/themeClasses';

<section className={`relative min-h-screen ${backgrounds.page}`}>
  <h1 className={typography.pageTitle}>{story.title}</h1>
  <p className={typography.bodySecondary}>by {story.author}</p>
  
  <button className={buttons.primary}>
    Bookmark
  </button>
</section>
```

### Priority Components to Update

1. **Pages** (highest impact)
   - `src/pages/Stories.tsx`
   - `src/pages/StoryDetail.tsx`
   - `src/pages/Forum.tsx`
   - `src/pages/GildedParlour.tsx`
   - `src/pages/Dollhouse.tsx`

2. **Shared Components**
   - `src/components/shared/Button.tsx`
   - `src/components/shared/Card.tsx`
   - `src/components/shared/Input.tsx`
   - `src/components/shared/Typography.tsx`

3. **Feature Components**
   - `src/components/library/StoryCard.tsx`
   - `src/components/forum/PostView.tsx`
   - `src/components/diary/DiaryEntryView.tsx`

---

## ✅ Phase 5: Verification (15 min)

### Checklist

- [ ] No hardcoded hex colors (`#[0-9a-fA-F]`)
- [ ] No hardcoded rgba values
- [ ] All headings use `font-display`
- [ ] All body text uses `font-body`
- [ ] All buttons use `font-ui`
- [ ] All text meets WCAG AA contrast (4.5:1)
- [ ] Consistent spacing throughout
- [ ] Theme colors used appropriately

### Test Pages

Visit each page and verify:

1. **Typography is consistent**
   - Headers are bold and dramatic
   - Body text is readable
   - Buttons are clear

2. **Colors are cohesive**
   - Gothic theme dominates
   - Theme-specific colors used appropriately
   - No jarring color clashes

3. **Contrast is sufficient**
   - All text is readable
   - No strain on eyes
   - Works in different lighting

---

## 📚 Usage Examples

### Example 1: Story Card

```tsx
import { typography, cards, borders } from '@/utils/themeClasses';

export const StoryCard = ({ story }) => {
  return (
    <div className={cards.hoverable}>
      <h3 className={typography.cardTitle}>{story.title}</h3>
      <p className={typography.bodySecondary}>{story.description}</p>
      <button className={buttons.primary}>Read Now</button>
    </div>
  );
};
```

### Example 2: Form Input

```tsx
import { inputs, typography } from '@/utils/themeClasses';

export const ContactForm = () => {
  return (
    <form>
      <label className={typography.label}>Your Name</label>
      <input 
        type="text" 
        className={inputs.text}
        placeholder="Enter your name..."
      />
      
      <label className={typography.label}>Message</label>
      <textarea 
        className={inputs.textarea}
        placeholder="Write your message..."
        rows={5}
      />
      
      <button type="submit" className={buttons.primary}>
        Send Message
      </button>
    </form>
  );
};
```

### Example 3: Page Layout

```tsx
import { backgrounds, typography } from '@/utils/themeClasses';

export const AboutPage = () => {
  return (
    <section className={`min-h-screen ${backgrounds.page} px-6 py-16`}>
      <div className="max-w-4xl mx-auto">
        <h1 className={typography.pageTitle}>About GRIMOIRE</h1>
        <p className={typography.bodyPrimary}>
          Welcome to GRIMOIRE, where stories come alive...
        </p>
      </div>
    </section>
  );
};
```

---

## 🎨 Theme-Specific Usage

### When to Use Each Theme

**Gothic (Default):**
- Use everywhere by default
- General pages, navigation, footers
- Neutral content areas

**Dollhouse (Pink):**
- Diary/journal features
- Personal/intimate content
- Romantic horror stories

**Parlour (Gold):**
- Forum/discussion areas
- Elegant/sophisticated features
- Classic horror stories

**Chains (Purple):**
- Collaborative features
- Modern/tech features
- Psychological horror stories

**Archive (Green):**
- Reading history
- Saved content
- Retro/nostalgic features

### Example: Theme-Specific Button

```tsx
import { buttons, borders } from '@/utils/themeClasses';

// Dollhouse-themed button
<button className={`${buttons.primary} ${borders.dollhouse}`}>
  Save to Diary
</button>

// Parlour-themed button
<button className={`${buttons.primary} ${borders.parlour}`}>
  Post to Forum
</button>

// Chains-themed button
<button className={`${buttons.primary} ${borders.chains}`}>
  Start Collaboration
</button>
```

---

## 🚀 Quick Start

1. **Copy utility file:**
   ```bash
   # Create the file
   touch src/utils/themeClasses.ts
   # Copy content from above
   ```

2. **Update one component:**
   ```tsx
   import { typography, buttons } from '@/utils/themeClasses';
   // Replace inline classes with utilities
   ```

3. **Test the change:**
   ```bash
   npm run dev
   # Visit the page and verify
   ```

4. **Repeat for all components**

---

## 📊 Expected Results

After implementation:

- **Consistency:** All pages look cohesive
- **Maintainability:** Easy to update colors/fonts globally
- **Accessibility:** All text meets WCAG standards
- **Performance:** No impact (same CSS output)
- **Developer Experience:** Faster development with reusable classes

---

## 🆘 Troubleshooting

**Issue:** Colors not showing up
- **Fix:** Run `npm run dev` to rebuild Tailwind

**Issue:** Classes too long
- **Fix:** Use the `cn()` helper to combine classes

**Issue:** Conflicts with existing styles
- **Fix:** Use `!important` or increase specificity

**Issue:** Theme not applying
- **Fix:** Check import path and class names

---

## 📝 Notes

- Keep legacy color names for backward compatibility
- Gradually migrate components (no need to do all at once)
- Document any custom theme usage
- Test on multiple devices/browsers
- Get feedback from users on readability

