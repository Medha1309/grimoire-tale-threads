# Gilded Parlour - Complete Redesign Specification

## Executive Summary
A comprehensive redesign of the Gilded Parlour (forum) to create a truly luxurious, functional discussion platform with proper CRUD operations, reusable components, and an opulent Victorian aesthetic.

## Design Philosophy
**"Versailles meets Reddit"** - Combine the functionality of modern forums (Reddit, Discourse) with the visual opulence of Victorian luxury.

---

## 1. Visual Design System

### Color Palette
- **Primary Gold**: `#d4af37` (Metallic gold)
- **Deep Burgundy**: `#4a0e0e` (Rich velvet)
- **Warm Cream**: `#f4e4c1` (Aged paper)
- **Dark Mahogany**: `#2d1810` (Wood paneling)
- **Accent Copper**: `#b87333` (Ornate details)

### Typography
- **Headers**: Playfair Display / Cinzel (Serif, elegant)
- **Body**: Crimson Text / Lora (Readable serif)
- **UI Elements**: Inter (Clean sans-serif for functionality)

### Visual Elements
1. **Rich Velvet Texture** - Deep burgundy background with fabric-like depth
2. **Gold Filigree Borders** - Ornate frames around content cards
3. **Candlelight Animation** - Warm, flickering ambient light
4. **Floating Dust Particles** - Subtle movement in light beams
5. **Damask Wallpaper Pattern** - Subtle repeating Victorian motifs
6. **Crystal Chandelier Effect** - Overhead lighting with prismatic sparkles

---

## 2. Component Architecture

### Reusable Components (from existing app)
- `Card` - Base for post cards
- `Modal` - For create/edit dialogs
- `Button` - Styled buttons
- `LoadingState` - Loading indicators
- `ErrorState` - Error displays
- `WritingEditor` - Rich text editing (from diary)

### New Components Needed
1. **ParlourPostCard** - Luxurious post display
2. **ParlourHeader** - Ornate page header with chandelier
3. **CreatePostModal** - Full-featured post creation
4. **EditPostModal** - Post editing interface
5. **DeleteConfirmModal** - Elegant deletion confirmation
6. **PostDetailView** - Expanded post view
7. **CommentThread** - Nested comment system
8. **UserAvatar** - Ornate user display
9. **LikeButton** - Candle-based reaction (keep this!)
10. **FilterBar** - Elegant filtering options

---

## 3. CRUD Functionality

### CREATE
- **New Post Modal**
  - Title input (required, max 200 chars)
  - Rich text editor for content
  - Tag selection (multi-select)
  - Category dropdown
  - Anonymous toggle
  - Preview mode
  - Draft saving
  
### READ
- **Post List View**
  - Infinite scroll / pagination
  - Sort by: Recent, Popular, Trending, Unanswered
  - Filter by: Tags, Category, Date range
  - Search functionality
  - View count tracking
  
- **Post Detail View**
  - Full post content
  - Author info (or Anonymous)
  - Timestamp
  - Like/reaction count
  - Comment count
  - Share options
  - Nested comments (3 levels deep)

### UPDATE
- **Edit Post**
  - Only author can edit (within 24 hours)
  - Edit history tracking
  - "Edited" indicator
  - Same interface as create
  
- **Edit Comment**
  - Inline editing
  - Quick save
  - Edit indicator

### DELETE
- **Soft Delete**
  - Author can delete own posts
  - Confirmation modal
  - "Deleted by author" placeholder
  - Admin can hard delete
  
---

## 4. User Experience Flow

### Entry Experience
```
Landing → Gilded Parlour
  ↓
Luxurious fade-in (no long intro - user requested)
  ↓
Post grid with ornate cards
```

### Creating a Post
```
Click "New Discussion" button
  ↓
Modal opens with rich editor
  ↓
Fill title, content, tags
  ↓
Preview (optional)
  ↓
Submit → Elegant success animation
  ↓
Navigate to new post
```

### Reading & Engaging
```
Browse posts in grid/list
  ↓
Click post card
  ↓
Expand to full view (smooth transition)
  ↓
Read, like, comment
  ↓
Back to list (maintains scroll position)
```

---

## 5. Layout Structure

### Main View (List)
```
┌─────────────────────────────────────┐
│  [Ornate Header with Chandelier]    │
│  THE GILDED PARLOUR                 │
├─────────────────────────────────────┤
│  [Search Bar] [Filters] [New Post]  │
├─────────────────────────────────────┤
│  ┌───────────────────────────────┐  │
│  │  Post Card (Ornate Border)    │  │
│  │  Title | Author | Likes       │  │
│  │  Preview text...              │  │
│  │  [Tags] [Comments: 5]         │  │
│  └───────────────────────────────┘  │
│  ┌───────────────────────────────┐  │
│  │  Post Card                    │  │
│  └───────────────────────────────┘  │
│  ...                                │
└─────────────────────────────────────┘
```

### Detail View
```
┌─────────────────────────────────────┐
│  [← Back] [Edit] [Delete] [Share]   │
├─────────────────────────────────────┤
│  Post Title (Large, Ornate)         │
│  By @username | 2 hours ago         │
├─────────────────────────────────────┤
│  Full post content with rich text   │
│  formatting, images, etc.           │
│                                     │
│  [🕯️ 24 Likes] [💬 8 Comments]      │
├─────────────────────────────────────┤
│  Comments Section                   │
│  ┌─────────────────────────────┐   │
│  │ @user1: Great post!         │   │
│  │   └─ @user2: I agree!       │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

---

## 6. Technical Implementation Plan

### Phase 1: Foundation (Session 1)
- [ ] Update terminology throughout
- [ ] Create luxurious background component
- [ ] Design post card component
- [ ] Implement basic list view

### Phase 2: CRUD Operations (Session 2)
- [ ] Create post modal with rich editor
- [ ] Edit functionality
- [ ] Delete with confirmation
- [ ] Update hooks for full CRUD

### Phase 3: Enhanced Features (Session 3)
- [ ] Comment system
- [ ] Like/reaction system
- [ ] Search & filters
- [ ] Sort options

### Phase 4: Polish (Session 4)
- [ ] Animations & transitions
- [ ] Loading states
- [ ] Error handling
- [ ] Performance optimization

---

## 7. Key Improvements Over Current

### Current Issues
- ❌ Terminology is confusing ("whispers")
- ❌ Visual design lacks true opulence
- ❌ Limited CRUD (no edit/delete)
- ❌ Components not reused from app
- ❌ UX flow is unclear

### Proposed Solutions
- ✅ Standard forum terminology
- ✅ Truly luxurious Victorian aesthetic
- ✅ Full CRUD with proper permissions
- ✅ Reuse Card, Modal, Button, Editor
- ✅ Clear, intuitive user flow

---

## 8. Success Metrics

### Visual Quality
- Feels as polished as the About page
- Clearly luxurious and opulent
- Cohesive with app aesthetic

### Functionality
- All CRUD operations work smoothly
- Intuitive for new users
- Fast and responsive

### Code Quality
- Reuses existing components
- Well-organized structure
- Properly typed TypeScript
- Good performance

---

## Next Steps

1. **Review this spec** - Does this match your vision?
2. **Prioritize features** - What's most important?
3. **Begin implementation** - Start with Phase 1
4. **Iterate** - Refine based on feedback

This is a proper, comprehensive redesign that will take multiple focused sessions to implement correctly. Ready to begin when you are!
