# Typography Guide

## Overview

GRIMOIRE uses a carefully crafted typography system to ensure readability, consistency, and hierarchy across all components.

## Font Families

### Display (Playfair Display)
**Use for:** Page titles, hero sections, dramatic headers

```tsx
<h1 className="font-display text-5xl font-bold tracking-wider">
  THE LIBRARY
</h1>
```

### Body (Cormorant Garamond)
**Use for:** All body text, paragraphs, long-form content

```tsx
<p className="font-body text-base leading-relaxed">
  Welcome to the haunted library...
</p>
```

### UI (Inter)
**Use for:** Buttons, labels, navigation, system messages

```tsx
<button className="font-ui text-sm font-medium tracking-wide uppercase">
  Sign In
</button>
```

### Decorative (Parisienne)
**Use sparingly for:** Special accents, decorative elements

```tsx
<span className="font-decorative text-2xl">
  Grimoire
</span>
```

## Typography Components

### Using the Typography Component

```tsx
import { Heading, Text, PageTitle, BodyText } from '@/components/shared/Typography';

// Page title
<PageTitle>Welcome to Grimoire</PageTitle>

// Section header
<Heading as="h2" variant="h2">Featured Stories</Heading>

// Body text
<BodyText>This is a paragraph of body text...</BodyText>

// Caption
<Caption>Posted 2 hours ago</Caption>
```

## Hierarchy

### Headings

```tsx
// H1 - Page titles (48px)
<h1 className="font-display text-5xl font-bold tracking-wider">
  Page Title
</h1>

// H2 - Section headers (36px)
<h2 className="font-display text-4xl font-semibold tracking-wide">
  Section Header
</h2>

// H3 - Subsection headers (30px)
<h3 className="font-display text-3xl font-semibold">
  Subsection Header
</h3>

// H4 - Card titles (24px)
<h4 className="font-body text-2xl font-semibold">
  Card Title
</h4>

// H5 - Small headers (20px)
<h5 className="font-body text-xl font-medium">
  Small Header
</h5>

// H6 - Labels (18px)
<h6 className="font-body text-lg font-medium">
  Label Header
</h6>
```

### Body Text

```tsx
// Large body (18px)
<p className="font-body text-lg leading-relaxed">
  Large body text for emphasis
</p>

// Normal body (16px) - DEFAULT
<p className="font-body text-base leading-relaxed">
  Standard body text for reading
</p>

// Small body (14px)
<p className="font-body text-sm leading-normal">
  Small body text for captions
</p>

// Extra small (12px)
<p className="font-body text-xs leading-normal">
  Footnotes and fine print
</p>
```

### UI Elements

```tsx
// Button text
<button className="font-ui text-sm font-medium tracking-wide uppercase">
  Click Me
</button>

// Form label
<label className="font-ui text-sm font-medium tracking-wide">
  Email Address
</label>

// Caption
<span className="font-body text-xs">
  Last updated: 2 hours ago
</span>
```

## Responsive Typography

### Mobile-First Approach

```tsx
// Responsive heading
<h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold">
  Responsive Title
</h1>

// Responsive body
<p className="text-sm md:text-base lg:text-lg font-body">
  Responsive paragraph
</p>
```

## Text Utilities

### Truncation

```tsx
// Single line truncate
<p className="truncate">
  This text will be truncated with ellipsis...
</p>

// Multi-line truncate (Tailwind 3.0+)
<p className="line-clamp-3">
  This text will be truncated after 3 lines...
</p>
```

### Alignment

```tsx
<p className="text-left">Left aligned</p>
<p className="text-center">Center aligned</p>
<p className="text-right">Right aligned</p>
<p className="text-justify">Justified text</p>
```

### Text Transform

```tsx
<p className="uppercase">UPPERCASE TEXT</p>
<p className="lowercase">lowercase text</p>
<p className="capitalize">Capitalized Text</p>
<p className="normal-case">Normal Case</p>
```

### Letter Spacing

```tsx
<p className="tracking-tight">Tight spacing</p>
<p className="tracking-normal">Normal spacing</p>
<p className="tracking-wide">Wide spacing</p>
<p className="tracking-wider">Wider spacing</p>
<p className="tracking-widest">Widest spacing</p>
```

## Theme-Specific Typography

### Dollhouse (Pink/Romantic)

```tsx
<h1 className="font-display text-5xl tracking-widest uppercase"
    style={{ color: '#ffb6d9', textShadow: '0 0 20px rgba(255, 182, 217, 0.5)' }}>
  THE BOUDOIR
</h1>
```

### Parlour (Gold/Elegant)

```tsx
<h1 className="font-display text-5xl tracking-wider uppercase"
    style={{ color: '#e8c547', textShadow: '0 0 40px rgba(232, 197, 71, 0.9)' }}>
  THE TEA ROOM
</h1>
```

### Chains (Purple/Modern)

```tsx
<h1 className="font-ui text-5xl tracking-wide uppercase"
    style={{ color: '#8B5CF6', textShadow: '0 0 30px rgba(139, 92, 246, 0.6)' }}>
  TALE THREADS
</h1>
```

## Accessibility

### Minimum Sizes
- Body text: **16px minimum** (14px acceptable for captions)
- Touch targets: **44px minimum** for interactive elements
- Line height: **1.5 minimum** for body text (1.75 optimal)

### Contrast
- Normal text: **4.5:1 minimum** (WCAG AA)
- Large text (18px+): **3:1 minimum** (WCAG AA)

### Best Practices

```tsx
// ✅ Good - Readable and accessible
<p className="font-body text-base leading-relaxed text-zinc-100">
  This text is easy to read
</p>

// ❌ Bad - Too small and tight
<p className="font-body text-xs leading-tight text-zinc-600">
  This text is hard to read
</p>

// ✅ Good - Proper heading hierarchy
<h1>Main Title</h1>
<h2>Section</h2>
<h3>Subsection</h3>

// ❌ Bad - Skipping levels
<h1>Main Title</h1>
<h4>Section</h4> {/* Skipped h2 and h3 */}
```

## Common Patterns

### Card with Title and Description

```tsx
<div className="p-6">
  <h3 className="font-body text-2xl font-semibold mb-2 text-zinc-100">
    Card Title
  </h3>
  <p className="font-body text-base leading-relaxed text-zinc-400">
    Card description with readable body text.
  </p>
</div>
```

### Form Field

```tsx
<div className="space-y-2">
  <label className="font-ui text-sm font-medium tracking-wide text-zinc-300">
    Email Address
  </label>
  <input 
    type="email"
    className="font-body text-base"
    placeholder="you@example.com"
  />
  <p className="font-body text-xs text-zinc-500">
    We'll never share your email
  </p>
</div>
```

### Button

```tsx
<button className="font-ui text-sm font-medium tracking-wide uppercase
                   px-6 py-3 rounded-lg transition-all">
  Sign Up Now
</button>
```

### Navigation Link

```tsx
<a href="/stories" 
   className="font-ui text-sm font-medium text-zinc-400 
              hover:text-zinc-100 transition-colors">
  Library
</a>
```

## Performance Tips

1. **Preload fonts** in `index.html`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

2. **Use font-display: swap** to prevent FOIT (Flash of Invisible Text)

3. **Subset fonts** to include only needed characters

4. **Limit font weights** - Only load weights you actually use

## Migration Checklist

When updating existing components:

- [ ] Replace inline font styles with utility classes
- [ ] Use semantic HTML (h1-h6, p, label, etc.)
- [ ] Ensure proper heading hierarchy
- [ ] Check text contrast ratios
- [ ] Test on mobile devices
- [ ] Verify line heights for readability
- [ ] Remove unused font families

## Examples

See these components for reference:
- `src/pages/Forum.tsx` - Parlour typography
- `src/pages/Stories.tsx` - Library typography
- `src/pages/About.tsx` - About page typography
- `src/components/Navbar.tsx` - Navigation typography
