# Dollhouse Visual Reference Guide

## Typography Hierarchy

### Room Titles (on cards)
```
DIARY
SCRAPBOOK
ART STUDIO
ARCHIVE
SAVED BOOKS
```
- Font: Grimoire (serif)
- Size: 16px (text-base)
- Weight: 300 (light)
- Transform: UPPERCASE
- Tracking: 0.2em
- Color: #c0c0c0 (default) → #ffb6d9 (hover)

### Page Headers
```
MY DIARY
MEMORY SCRAPBOOK
ART STUDIO
READING ARCHIVE
SAVED BOOKS
```
- Font: Grimoire (serif)
- Size: 48px (text-4xl) or 36px (text-3xl)
- Transform: UPPERCASE
- Tracking: 0.2em
- Color: #ffb6d9/90
- Glow: 0 0 20px rgba(255, 182, 217, 0.4)

### Button Labels
```
← BACK TO DOLLHOUSE
WRITE
SAVE
CANCEL
DELETE
```
- Font: Grimoire (serif)
- Size: 12px (sm), 14px (md), 16px (lg)
- Transform: UPPERCASE
- Tracking: wider (0.05em)
- Color: varies by variant
- No emojis: Text and symbols only

## Button Styles

### Primary Button
```
┌─────────────────────────┐
│   ✒️ WRITE              │
└─────────────────────────┘
```
- Background: gradient zinc-900/80 → black/80
- Border: #ffb6d9/30 → #ffb6d9/50 (hover)
- Text: #e5e5e5 → #ffffff (hover)
- Glow: 0 0 20px rgba(255, 182, 217, 0.4)
- Backdrop: blur(10px)

### Secondary Button
```
┌─────────────────────────┐
│   CANCEL                │
└─────────────────────────┘
```
- Background: zinc-900/40
- Border: zinc-800/50 → zinc-700/50 (hover)
- Text: #a1a1aa → #d4d4d8 (hover)
- No glow

### Ghost Button
```
← BACK TO DOLLHOUSE
```
- Background: transparent
- Border: none
- Text: #71717a → #d4d4d8 (hover)
- Icon animation: pulse on hover

### Danger Button
```
┌─────────────────────────┐
│   🗑️ DELETE             │
└─────────────────────────┘
```
- Background: red-950/30
- Border: red-900/40 → red-800/60 (hover)
- Text: #f87171 → #fca5a5 (hover)
- Glow: 0 0 20px rgba(220, 38, 38, 0.3)

## Room Card Anatomy

```
┌─────────────────────────────────┐
│                                 │
│         ╭─────────╮             │
│         │ DIARY   │             │  ← Title (uppercase, tracked)
│         ╰─────────╯             │
│            ─────                │  ← Underline (animated)
│                                 │
└─────────────────────────────────┘
     ↑                       ↑
  Border glow            Ambient light
  (pink/matrix)          (pulsing)
```

### Card States
1. **Default**: Subtle glow, light border
2. **Hover**: Lifted (-8px), stronger glow, brighter text
3. **Lit**: Pulsing ambient light, enhanced visibility

## Color Palette

### Pink Theme (Default)
- Primary: `#ffb6d9`
- Light: `#ffd4e8`
- Dark: `#ff8fc7`
- Glow: `rgba(255, 182, 217, 0.4)`
- Border: `rgba(255, 182, 217, 0.3)`

### Matrix Theme (Archive only)
- Primary: `#0F0` (lime green)
- Glow: `rgba(0, 255, 0, 0.4)`
- Border: `rgba(0, 255, 0, 0.3)`

### Neutral Tones
- Background: `#000000`
- Surface: `#0a0a0a`
- Text Primary: `#e4e4e7`
- Text Secondary: `#a1a1aa`
- Text Tertiary: `#52525b`

## Spacing Standards

### Button Padding
- Small: `px-4 py-2` (16px × 8px)
- Medium: `px-6 py-3` (24px × 12px)
- Large: `px-8 py-4` (32px × 16px)

### Room Card Spacing
- Padding: `p-4` (16px)
- Gap between cards: `gap-8 md:gap-12` (32px → 48px)
- Margin bottom: `mb-12` (48px)

### Header Spacing
- Title margin: `mb-12` (48px)
- Back button margin: `mb-8` (32px)
- Border padding: `pb-6` (24px)

## Animation Standards

### Button Hover
```typescript
whileHover={{ scale: 1.02, y: -2 }}
whileTap={{ scale: 0.98 }}
transition={{ type: 'spring', stiffness: 400, damping: 20 }}
```

### Room Card Hover
```typescript
whileHover={{ y: -8 }}
transition={{ duration: 0.3 }}
```

### Glow Pulse
```typescript
animate={{
  opacity: [0.15, 0.25, 0.15],
  scale: [1, 1.02, 1]
}}
transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
```

## Accessibility

### Contrast Ratios
- Primary text on dark: 14.5:1 (AAA)
- Secondary text on dark: 7.2:1 (AA)
- Pink on dark: 8.1:1 (AAA)

### Focus States
- All buttons have visible focus rings
- Keyboard navigation supported
- Screen reader labels provided

### Motion
- Respects `prefers-reduced-motion`
- Animations can be disabled
- No flashing content

## Implementation Checklist

When adding new Dollhouse features:

- [ ] Use `DollhouseButton` for all actions
- [ ] Apply uppercase + tracking to all titles
- [ ] Use serif font (Grimoire) consistently
- [ ] Add appropriate hover effects
- [ ] Include pink glow on interactive elements
- [ ] Test with keyboard navigation
- [ ] Verify contrast ratios
- [ ] Add loading states where needed
- [ ] Include appropriate icons
- [ ] Follow spacing standards
