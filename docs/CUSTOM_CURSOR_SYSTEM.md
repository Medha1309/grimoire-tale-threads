# Page-Specific Custom Cursor System

## Overview
Each page in the app features a unique custom cursor design tailored to match its theme and aesthetic, while preserving the original cursor on authentication pages.

## Cursor Themes by Page

### 🏠 Landing Page
- Uses default cursor (same as auth pages)
- Clean and professional
- No custom cursor to keep focus on content

### 📚 Stories/Library Pages
- Uses default cursor with enhanced torch effect
- Beautiful multi-layered torch flame follows mouse
- Animated embers and smoke wisps
- Realistic flickering with warm glow
- No custom cursor - torch effect provides the magic

### ✨ Forum - Gilded Ornament
- Luxurious golden ornate frame
- Rotating decorative points
- Ruby jewel center that pulses
- Sparkle particles when hovering
- Matches the gilded parlour aesthetic

### 🔑 Dollhouse/Diary - Vintage Key
- Pink vintage skeleton key
- Decorative ribbon that sways
- Floating hearts when hovering
- Vintage dust particles
- Matches the pink horror aesthetic

### 🔮 About Page - Ouija Planchette
- Wooden planchette with mystical eye
- Subtle rocking motion
- Purple mystical energy trails when hovering
- Floating question marks
- Perfect for the investigation room theme

### 🖋️ Contact Page - Quill Pen
- Elegant feather quill
- Ink drops fall when hovering
- Writing trail effect
- Silver/grey color scheme
- Matches the correspondence theme

### 🔐 Auth Pages (Login/Signup) & Landing
- Default cursor (no custom cursor)
- Clean and professional
- Auth pages have their own atmospheric background effects
- Landing page keeps focus on hero content

## Technical Implementation

### File Structure
```
src/
├── components/
│   ├── shared/
│   │   └── CustomCursor.tsx          # Main cursor manager
│   ├── cursors/
│   │   ├── ForumCursor.tsx           # Gilded ornament
│   │   ├── DollhouseCursor.tsx       # Vintage key
│   │   ├── AboutCursor.tsx           # Mystical ring
│   │   └── ContactCursor.tsx         # Crosshair
│   └── library/
│       └── TorchEffect.tsx           # Enhanced torch for library
├── index.css                          # Global cursor styles
└── router/index.tsx                   # Cursor integration
```

### How It Works
1. Global CSS hides default cursor (`cursor: none`)
2. Auth pages, landing page, and library pages get special classes to restore default cursor
3. `CustomCursor` component detects current route
4. Appropriate themed cursor component is rendered for specific pages
5. Each cursor responds to hover and click states

### Route Detection
```typescript
const getCursorTheme = (): CursorTheme | null => {
  const path = location.pathname;
  // No cursor for landing page (uses default like auth pages)
  if (path === '/' || path === '/landing') return null;
  // No cursor for library/stories pages (torch effect instead)
  if (path.startsWith('/stories') || path.startsWith('/story')) return null;
  if (path.startsWith('/forum')) return 'forum';
  if (path.startsWith('/diary')) return 'dollhouse';
  if (path === '/about') return 'about';
  if (path === '/contact') return 'contact';
  return 'default';
};
```

## Interactive States

All cursors respond to:
- **Hovering**: Special effects activate (sparkles, embers, particles, etc.)
- **Clicking**: Scale down animation for tactile feedback
- **Movement**: Smooth following with slight lag for natural feel

## Performance
- Uses Framer Motion for GPU-accelerated animations
- SVG-based for crisp rendering at any scale
- Conditional rendering - only active cursor is mounted
- Optimized animation loops
- No performance impact on page interactions

## Customization

To modify a specific cursor, edit its file in `src/components/cursors/`:

```typescript
// Example: Adjust hover size in ForumCursor.tsx
style={{
  width: isHovering ? 45 : 36,  // Change these values
  height: isHovering ? 45 : 36,
}}
```

To add a new cursor theme:
1. Create new cursor component in `src/components/cursors/`
2. Import it in `CustomCursor.tsx`
3. Add route detection logic
4. Add case in switch statement

## Browser Compatibility
- Works in all modern browsers
- Gracefully degrades if JavaScript is disabled
- Mobile devices use default touch cursor
- No impact on accessibility
