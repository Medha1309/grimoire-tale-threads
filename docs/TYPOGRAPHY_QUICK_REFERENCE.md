# Typography Quick Reference

## Font Families

| Family | Use Case | Class |
|--------|----------|-------|
| **Display** | Page titles, headers | `font-display` |
| **Body** | Paragraphs, content | `font-body` |
| **UI** | Buttons, labels | `font-ui` |
| **Decorative** | Special accents | `font-decorative` |
| **Mono** | Code | `font-mono` |

## Size Scale

| Size | Pixels | Class | Use Case |
|------|--------|-------|----------|
| xs | 12px | `text-xs` | Footnotes |
| sm | 14px | `text-sm` | Captions, small text |
| base | 16px | `text-base` | Body text (default) |
| lg | 18px | `text-lg` | Large body |
| xl | 20px | `text-xl` | H5 |
| 2xl | 24px | `text-2xl` | H4 |
| 3xl | 30px | `text-3xl` | H3 |
| 4xl | 36px | `text-4xl` | H2 |
| 5xl | 48px | `text-5xl` | H1 |
| 6xl | 60px | `text-6xl` | Hero |

## Heading Hierarchy

```tsx
<h1 className="font-display text-5xl font-bold tracking-wider">H1 - Page Title</h1>
<h2 className="font-display text-4xl font-semibold tracking-wide">H2 - Section</h2>
<h3 className="font-display text-3xl font-semibold">H3 - Subsection</h3>
<h4 className="font-body text-2xl font-semibold">H4 - Card Title</h4>
<h5 className="font-body text-xl font-medium">H5 - Small Header</h5>
<h6 className="font-body text-lg font-medium">H6 - Label</h6>
```

## Common Patterns

### Page Title
```tsx
<h1 className="font-display text-5xl font-bold tracking-wider uppercase">
  THE LIBRARY
</h1>
```

### Body Text
```tsx
<p className="font-body text-base leading-relaxed">
  Your content here...
</p>
```

### Button
```tsx
<button className="font-ui text-sm font-medium tracking-wide uppercase">
  Click Me
</button>
```

### Label
```tsx
<label className="font-ui text-sm font-medium tracking-wide">
  Email Address
</label>
```

### Caption
```tsx
<span className="font-body text-xs text-zinc-500">
  Posted 2 hours ago
</span>
```

## Font Weights

| Weight | Class | Use Case |
|--------|-------|----------|
| 300 | `font-light` | Subtle text |
| 400 | `font-normal` | Body text |
| 500 | `font-medium` | Emphasis |
| 600 | `font-semibold` | Headings |
| 700 | `font-bold` | Strong emphasis |

## Letter Spacing

| Spacing | Class | Use Case |
|---------|-------|----------|
| Tight | `tracking-tight` | Dense text |
| Normal | `tracking-normal` | Default |
| Wide | `tracking-wide` | Buttons, labels |
| Wider | `tracking-wider` | Headers |
| Widest | `tracking-widest` | Dramatic titles |

## Line Height

| Height | Class | Use Case |
|--------|-------|----------|
| Tight | `leading-tight` | Headings |
| Normal | `leading-normal` | UI elements |
| Relaxed | `leading-relaxed` | Body text |
| Loose | `leading-loose` | Spacious text |

## Text Utilities

```tsx
// Truncation
<p className="truncate">Single line...</p>
<p className="line-clamp-3">Three lines...</p>

// Alignment
<p className="text-left">Left</p>
<p className="text-center">Center</p>
<p className="text-right">Right</p>

// Transform
<p className="uppercase">UPPERCASE</p>
<p className="lowercase">lowercase</p>
<p className="capitalize">Capitalized</p>

// Style
<em className="italic">Italic</em>
<strong className="font-semibold">Bold</strong>
<u className="underline">Underline</u>
```

## Responsive Typography

```tsx
// Mobile → Tablet → Desktop
<h1 className="text-3xl md:text-4xl lg:text-5xl">
  Responsive Title
</h1>

<p className="text-sm md:text-base lg:text-lg">
  Responsive body
</p>
```

## Theme Colors

### Dollhouse (Pink)
```tsx
style={{ color: '#ffb6d9' }}
```

### Parlour (Gold)
```tsx
style={{ color: '#e8c547' }}
```

### Chains (Purple)
```tsx
style={{ color: '#8B5CF6' }}
```

### Neutral
```tsx
className="text-zinc-100"  // Light
className="text-zinc-400"  // Medium
className="text-zinc-600"  // Dark
```

## Accessibility Checklist

- ✅ Minimum 16px for body text
- ✅ Line height 1.5+ for readability
- ✅ Contrast ratio 4.5:1 for normal text
- ✅ Contrast ratio 3:1 for large text (18px+)
- ✅ Proper heading hierarchy (h1 → h2 → h3)
- ✅ Semantic HTML elements

## Do's and Don'ts

### ✅ Do
- Use `font-display` for dramatic headers
- Use `font-body` for readable content
- Use `font-ui` for functional elements
- Maintain proper heading hierarchy
- Use line-height 1.75 for body text
- Test on mobile devices

### ❌ Don't
- Mix too many font families
- Use decorative fonts for body text
- Skip heading levels (h1 → h4)
- Use text smaller than 14px
- Ignore contrast ratios
- Use all-caps for long text

## Import Typography Components

```tsx
import {
  Heading,
  Text,
  PageTitle,
  SectionHeader,
  CardTitle,
  BodyText,
  Caption,
  Label,
  ButtonText,
} from '@/components/shared/Typography';
```

## Quick Copy-Paste

### Card Component
```tsx
<div className="p-6">
  <h3 className="font-body text-2xl font-semibold mb-2">
    Title
  </h3>
  <p className="font-body text-base leading-relaxed text-zinc-400">
    Description
  </p>
</div>
```

### Form Field
```tsx
<div className="space-y-2">
  <label className="font-ui text-sm font-medium tracking-wide">
    Label
  </label>
  <input className="font-body text-base" />
  <p className="font-body text-xs text-zinc-500">
    Helper text
  </p>
</div>
```

### Button
```tsx
<button className="font-ui text-sm font-medium tracking-wide uppercase px-6 py-3">
  Button Text
</button>
```
