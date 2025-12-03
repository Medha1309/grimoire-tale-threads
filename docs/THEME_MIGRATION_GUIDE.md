# Theme Migration Guide

## Quick Reference: Color Replacements

### Pink/Purple Accents (Fog Theme)
```tsx
// ❌ Before
className="text-[#ffb6d9]"
className="border-[#ffb6d9]/40"
className="bg-[#ffb6d9]/20"

// ✅ After
className="text-fog-light"
className="border-fog-light/40"
className="bg-fog-light/20"
```

### Beige/Cream Text (Bone Theme)
```tsx
// ❌ Before
className="text-[#d4c4a8]"
className="text-[#c9b896]"
style={{ color: '#8B7355' }}

// ✅ After
className="text-bone-DEFAULT"
className="text-bone-DEFAULT"
className="text-bone-dark"
```

### Red/Crimson Accents (Blood Theme)
```tsx
// ❌ Before
className="text-[#6a0000]"
className="bg-[#4a0000]"
className="border-[#3a0000]"

// ✅ After
className="text-blood-dark"
className="bg-blood-DEFAULT"
className="border-blood-dark"
```

### Golden Highlights (Candlelight)
```tsx
// ❌ Before
className="hover:text-[#d4af37]"
style={{ color: '#d4af37' }}

// ✅ After
className="hover:text-candlelight"
className="text-candlelight"
```

### Dark Backgrounds (Shadow Theme)
```tsx
// ❌ Before
className="bg-[#0a0a0a]"
className="bg-[#1a1a1a]"

// ✅ After
className="bg-shadow-deepest"
className="bg-shadow-deep"
```

## Complete Color Palette

### Fog (Pink/Purple - Ethereal)
- `fog-light` - #ffb6d9 - Primary pink accent
- `fog-DEFAULT` - #e8b4d4 - Medium pink
- `fog-dark` - #d4a2c4 - Darker pink

### Bone (Beige/Cream - Vintage)
- `bone-light` - #e0e0e0 - Light cream
- `bone-DEFAULT` - #d4c4a8 - Warm beige
- `bone-dark` - #8B7355 - Dark tan

### Blood (Red/Crimson - Horror)
- `blood-light` - #8b0000 - Bright blood
- `blood-DEFAULT` - #4a0000 - Deep blood
- `blood-dark` - #6a0000 - Darkest crimson

### Shadow (Black/Gray - Depth)
- `shadow-deepest` - #0a0a0a - Near black
- `shadow-deep` - #1a1a1a - Very dark
- `shadow-DEFAULT` - #2a2a2a - Dark gray

### Candlelight (Gold - Warmth)
- `candlelight` - #d4af37 - Golden yellow

## Usage Patterns

### Interactive Elements
```tsx
// Buttons, links, hover states
className="text-zinc-400 hover:text-candlelight transition-colors"
className="border-zinc-800 hover:border-fog-light/40"
```

### Focus States
```tsx
// Input focus, active states
className={isFocused 
  ? "border-fog-light/40 text-fog-light" 
  : "border-zinc-800 text-zinc-500"
}
```

### Modals & Overlays
```tsx
// Modal borders and accents
className="border border-fog-light/20"
className="shadow-[0_0_60px_-15px_rgba(255,182,217,0.5)]"
```

### Notifications & Badges
```tsx
// Status indicators
className="bg-fog-light/20 border-fog-light/40 text-fog-light"
className="text-bone-DEFAULT/90"
```

### Dramatic Effects
```tsx
// Blood, horror elements
className="bg-blood-DEFAULT rounded-full"
className="text-blood-dark drop-shadow-[0_0_40px_rgba(106,0,0,0.7)]"
```

## Migration Checklist

### For Each Component

- [ ] Search for hex colors: `#[0-9a-fA-F]{6}`
- [ ] Replace with appropriate theme token
- [ ] Check opacity values (e.g., `/40`, `/20`)
- [ ] Test hover and focus states
- [ ] Verify contrast ratios (WCAG AA)
- [ ] Update any inline styles
- [ ] Remove unused color imports

### Common Patterns

#### Pattern 1: Conditional Styling
```tsx
// ❌ Before
className={isActive ? "text-[#ffb6d9]" : "text-zinc-500"}

// ✅ After
className={isActive ? "text-fog-light" : "text-zinc-500"}
```

#### Pattern 2: Inline Styles
```tsx
// ❌ Before
style={{ color: '#d4c4a8', borderColor: '#8B7355' }}

// ✅ After
className="text-bone-DEFAULT border-bone-dark"
```

#### Pattern 3: Opacity Variants
```tsx
// ❌ Before
className="bg-[#ffb6d9]/20 border-[#ffb6d9]/40"

// ✅ After
className="bg-fog-light/20 border-fog-light/40"
```

## Testing After Migration

### Visual Checks
1. **Hover States** - Verify all interactive elements
2. **Focus States** - Tab through forms and inputs
3. **Dark Mode** - Check contrast in dark theme
4. **Animations** - Ensure transitions work smoothly

### Automated Tests
```bash
# Run diagnostics
npm run type-check

# Run tests
npm test

# Visual regression (if available)
npm run test:visual
```

### Browser Testing
- Chrome/Edge (Chromium)
- Firefox
- Safari (if available)
- Mobile browsers

## Common Issues

### Issue 1: Color Not Showing
**Problem**: Token not recognized
**Solution**: Check `tailwind.config.js` has the color defined

### Issue 2: Wrong Opacity
**Problem**: Color too bright/dark
**Solution**: Adjust opacity value (e.g., `/40` → `/30`)

### Issue 3: Contrast Issues
**Problem**: Text hard to read
**Solution**: Use lighter variant or increase opacity

### Issue 4: Hover Not Working
**Problem**: Hover state not visible
**Solution**: Ensure `transition-colors` class is present

## Best Practices

### DO ✅
- Use semantic color names (fog, bone, blood)
- Maintain consistent opacity levels
- Add transition classes for smooth changes
- Test in different lighting conditions
- Document custom color usage

### DON'T ❌
- Mix hex codes with theme tokens
- Use inline styles for colors
- Forget to test hover/focus states
- Ignore WCAG contrast guidelines
- Hardcode opacity in hex (use Tailwind opacity)

## Resources

- **Design System**: `src/design-system/colors.ts`
- **Tailwind Config**: `tailwind.config.js`
- **Theme Classes**: `src/utils/themeClasses.ts`
- **Color Guide**: `docs/COLOR_SYSTEM_GUIDE.md`
- **Quick Reference**: `docs/COLOR_QUICK_REFERENCE.md`

## Support

If you encounter issues during migration:
1. Check this guide first
2. Review existing migrated components
3. Test in isolation
4. Ask for code review
5. Document any new patterns

---

**Last Updated**: Session 2 - Terminal, Modal, and Notification components migrated
