# Parlour UI Refinement Plan

## Overview
Refine the ForumList (post cards) and PostView (post detail) to be more polished, sophisticated, and parlour-ish with enhanced functionality.

## Current State Analysis

### ForumList (Post Cards)
**Good**:
- Clean layout
- Hover effects
- Basic metadata

**Needs Refinement**:
- Generic rounded corners → Sharp, elegant corners with gold accents
- Plain borders → Ornate borders with corner decorations
- Emojis (💬, 💜, 👤) → Replace with elegant icons or text
- Basic hover → More sophisticated interaction
- Missing: Bookmark, Share, Quick actions

### PostView (Post Detail)
**Needs**:
- Elegant header with ornate styling
- Better action buttons (Edit, Delete, Share, Bookmark)
- Refined typography
- Parlour-appropriate spacing and borders
- Enhanced reply section

## Refinement Goals

### 1. Post Cards (ForumList)
- **Ornate Corners**: Gold corner brackets like the NEW POST button
- **Refined Borders**: Subtle gold/blood-red accents
- **Better Icons**: Replace emojis with elegant symbols
- **Quick Actions**: Hover to reveal bookmark/share
- **Sophisticated Hover**: Subtle glow, not just color change
- **Better Typography**: More elegant spacing and hierarchy

### 2. Post Detail View (PostView)
- **Elegant Header**: Ornate title treatment
- **Action Bar**: Refined buttons (Back, Edit, Delete, Share, Bookmark)
- **Better Metadata**: Author, date, stats in elegant format
- **Enhanced Content**: Better typography and spacing
- **Refined Reply Section**: Parlour-appropriate styling
- **Dividers**: Ornate separators between sections

## Design Tokens

### Colors
```typescript
parlour = {
  gold: '#d4af37',
  goldDim: 'rgba(212, 175, 55, 0.3)',
  bloodRed: '#6a0000',
  bloodRedHover: '#8B0000',
  darkBg: 'rgba(0, 0, 0, 0.6)',
  cardBg: 'rgba(10, 10, 10, 0.8)',
  border: 'rgba(139, 0, 0, 0.3)',
  borderHover: 'rgba(212, 175, 55, 0.5)',
}
```

### Typography
- **Title**: Playfair Display / Cinzel (serif, elegant)
- **Body**: Crimson Text / Lora (readable serif)
- **Meta**: Inter (clean sans-serif)

### Spacing
- **Card Padding**: 24px (more generous)
- **Section Gaps**: 16px
- **Element Gaps**: 8px

## Implementation Plan

### Phase 1: Post Cards
1. Add ornate corner brackets
2. Replace emojis with elegant text/icons
3. Add subtle gold glow on hover
4. Add quick action buttons (bookmark, share)
5. Refine typography and spacing
6. Add "Popular" badge styling

### Phase 2: Post Detail
1. Create elegant header with back button
2. Add ornate title treatment
3. Create refined action bar
4. Enhance metadata display
5. Add elegant dividers
6. Style reply section

### Phase 3: Interactions
1. Smooth transitions
2. Hover states
3. Click feedback
4. Loading states

## Key Features to Add

### Post Cards:
- [ ] Ornate corner brackets (gold)
- [ ] Bookmark button (top-right)
- [ ] Share button (hover reveal)
- [ ] Better "Popular" badge
- [ ] Elegant hover glow
- [ ] Replace emoji icons

### Post Detail:
- [ ] Ornate back button
- [ ] Edit button (author only)
- [ ] Delete button (author only)
- [ ] Share button
- [ ] Bookmark button
- [ ] Elegant dividers
- [ ] Better author display
- [ ] Refined stats display

## Visual Inspiration

Think:
- Victorian calling cards
- Ornate picture frames
- Elegant invitations
- Gothic manuscripts
- Antique letterpress

## Success Criteria

- Feels cohesive with NEW POST button
- Sophisticated and refined
- Easy to scan and use
- Parlour-appropriate aesthetic
- Smooth interactions
- No emojis (use elegant alternatives)
- Gold accents throughout
- Sharp, elegant corners (not rounded)

## Next Steps

1. Refine ForumList component
2. Refine PostView component
3. Test interactions
4. Ensure consistency
5. Polish animations

This will make the Parlour feel truly elegant and cohesive! 🎭
