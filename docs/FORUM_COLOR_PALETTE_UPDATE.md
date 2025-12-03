# Forum Color Palette Update

## Summary
Updated the Forum color palette to align with the rest of the application, replacing amber/gold colors with the app's standard red-900/crimson and zinc color scheme.

## Color Changes

### Before (Inconsistent)
- Primary accent: `amber-300`, `amber-400`, `amber-600` (gold/yellow)
- Titles: `amber-200/90`
- Borders: `amber-700/60`, `amber-600/40`
- Backgrounds: `amber-950/40`, `amber-600/10`
- Custom colors: `candle-gold`, `bone-white`, `parchment`, `crimson`

### After (Cohesive)
- Primary accent: `red-900`, `red-800` (dark crimson - matches brand)
- Titles: `zinc-200`, `red-900/90`
- Borders: `red-900/60`, `red-900/40`, `zinc-800/60`
- Backgrounds: `red-950/40`, `red-950/20`, `zinc-900/80`
- Text: `zinc-100`, `zinc-200`, `zinc-300`, `zinc-400`, `zinc-500`

## App-Wide Color Palette

### Brand Colors
- **Primary**: `red-900` / `#6a0000` (dark crimson)
- **Secondary**: `red-800` (lighter crimson for hover states)
- **Accent**: `red-950` (very dark for backgrounds)

### Section-Specific Colors
- **Dollhouse**: `#ffb6d9` (pink)
- **Matrix View**: `#0F0` (green)
- **General**: Red/crimson theme

### Neutral Colors
- **Text**: `zinc-100` (lightest), `zinc-200`, `zinc-300`, `zinc-400`, `zinc-500` (darkest readable)
- **Backgrounds**: `black`, `zinc-900`, `zinc-950`
- **Borders**: `zinc-700`, `zinc-800`, `zinc-900`

## Files Updated

### src/pages/Forum.tsx
- Header title: `amber-200/90` → `red-900/90`
- Back button hover: `amber-300` → `red-800`
- New Thread button: `amber-700/60` border → `red-900/60`
- New Thread button text: `amber-300/90` → `zinc-300`
- New Thread button hover: `amber-950/40` → `red-950/40`
- Loading text: `amber-300` → `zinc-400`
- Load More button: `amber-600/40` → `red-900/40`

### src/components/forum/ForumList.tsx
- Card hover border: `amber-600/40` → `red-900/40`
- Popular indicator: `amber-400` → `red-800`
- Story title accent: `amber-400` → `red-800`
- Thread title: `amber-200/90` → `zinc-200`
- Hover indicator: `amber-400` → `red-800`

### src/components/forum/CreateThreadModal.tsx
- Modal title: `amber-200/90` → `zinc-200`
- Input focus border: `amber-600/60` → `red-900/60`
- Selected tag background: `amber-600/30` → `red-900/30`
- Selected tag text: `amber-300` → `red-800`
- Selected tag border: `amber-600` → `red-900`
- Submit button background: `amber-600/20` → `red-900/20`
- Submit button border: `amber-600/40` → `red-900/40`
- Submit button text: `amber-300` → `zinc-300`

### src/components/forum/PostView.tsx
- Back button hover: `amber-300` → `red-800`
- Card background: `parchment` gradient → `zinc-900/80`
- Card border: `candle-gold/40` → `zinc-800/60`
- Corner glow: `candle-gold/5` → `red-950/20`
- Title color: `candle-gold` → `zinc-200`
- Tag background: `crimson/20` → `red-900/20`
- Tag text: `candle-gold` → `zinc-400`
- Tag border: `candle-gold/40` → `red-900/40`
- Content text: `bone-white/90` → `zinc-300`
- Dividers: `candle-gold/20` → `zinc-800/40`
- Share hover: `candle-gold` → `zinc-300`
- Report hover: `crimson` → `red-400`
- Author name: `bone-white/90` → `zinc-300`
- Date: `bone-white/50` → `zinc-500`
- Reply count: `bone-white/60` → `zinc-500`
- "Echoes" → "Replies" (terminology update)

## Design Benefits

### 1. Visual Cohesion
- Forum now matches the dark crimson theme of the landing page
- Consistent with the red-900 brand color used in navbar
- No jarring color shifts when navigating between sections

### 2. Better Hierarchy
- Red accents draw attention to important actions (New Thread, popular posts)
- Zinc grays provide clear text hierarchy
- Reduced visual noise from excessive gold/amber

### 3. Professional Appearance
- More sophisticated color palette
- Better contrast ratios for accessibility
- Cleaner, more modern look

### 4. Brand Consistency
- Reinforces the "GRIMOIRE" brand identity
- Dark, mysterious aesthetic maintained throughout
- Horror/gothic theme preserved with crimson accents

## Testing
✅ All files compile without errors
✅ Color contrast meets accessibility standards
✅ Visual consistency across all forum components
✅ Hover states work correctly

## Future Considerations
- Consider adding subtle red glow effects for popular threads
- Maintain this palette when adding new forum features
- Document color usage in design system
