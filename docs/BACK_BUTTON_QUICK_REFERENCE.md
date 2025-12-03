# Back Button Quick Reference

## Import
```tsx
import { BackButton } from '../components/shared/NavigationButtons';
```

## Basic Usage

### Go Back One Page
```tsx
<BackButton onClick={() => navigate(-1)} variant="ghost" />
```

### Go to Specific Route
```tsx
<BackButton onClick={() => navigate('/home')} variant="ghost" />
```

### With Navigation Hook
```tsx
<BackButton onClick={goTo.home} variant="ghost" />
```

## Variants

### Ghost (Most Common)
Subtle, increases gap on hover
```tsx
<BackButton onClick={goTo.home} variant="ghost" />
```

### Default
Standard text styling
```tsx
<BackButton onClick={goTo.home} variant="default" />
```

### Prominent
Button-style with background
```tsx
<BackButton onClick={goTo.home} variant="prominent" />
```

## Custom Labels
```tsx
<BackButton 
  onClick={goTo.stories} 
  variant="ghost"
  label="Back to Library"
/>
```

## Custom Styling
```tsx
<BackButton 
  onClick={goTo.home} 
  variant="ghost"
  className="mb-8 text-pink-300"
/>
```

## With Navigation Group
```tsx
import { BackButton, NavigationGroup } from '../components/shared/NavigationButtons';

<NavigationGroup position="between">
  <BackButton onClick={goTo.stories} variant="ghost" />
  <div>Other content</div>
</NavigationGroup>
```

## Common Patterns

### Page Header
```tsx
<div className="mb-8">
  <BackButton onClick={() => navigate(-1)} variant="ghost" />
</div>
```

### Centered Layout
```tsx
<div className="flex items-center justify-between mb-8">
  <BackButton onClick={goTo.home} variant="ghost" />
  <h1>Page Title</h1>
  <div className="w-20" /> {/* Spacer for balance */}
</div>
```

### With Animation
```tsx
<motion.div
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
>
  <BackButton onClick={goTo.home} variant="ghost" />
</motion.div>
```

## Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onClick` | `() => void` | - | Click handler (required) |
| `variant` | `'default' \| 'ghost' \| 'prominent'` | `'default'` | Visual style |
| `label` | `string` | `'Back'` | Button text |
| `className` | `string` | `''` | Additional CSS classes |
| `disabled` | `boolean` | `false` | Disable button |
| `to` | `string` | - | Route path (alternative to onClick) |

## Do's and Don'ts

### ✅ Do
- Use `variant="ghost"` for most pages
- Place back buttons in top-left corner
- Use consistent spacing (mb-8 or mb-6)
- Provide clear navigation paths
- Test on mobile devices

### ❌ Don't
- Mix different back button styles on same page
- Hide back buttons on mobile
- Use confusing labels
- Forget to handle edge cases (no history)
- Override core functionality

## Accessibility

- Buttons are keyboard accessible (Tab, Enter)
- Screen readers announce "Back" + label
- Minimum touch target: 44x44px
- Color contrast meets WCAG AA standards
- Focus states are visible

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Full support

---

**Quick Tip:** When in doubt, use `variant="ghost"` - it's the most commonly used variant across the app.
