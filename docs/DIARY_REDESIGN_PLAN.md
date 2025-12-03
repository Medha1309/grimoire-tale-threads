# Diary Section Complete Redesign

## Overview
Complete overhaul of the diary section with full CRUD functionality, hidden entries feature, and premium UI matching the new dollhouse aesthetic.

## Core Features

### 1. Full CRUD Operations
- ✅ **Create**: Write new diary entries with rich editor
- ✅ **Read**: View entries in multiple layouts (grid/list/book)
- ✅ **Update**: Edit existing entries inline or in modal
- ✅ **Delete**: Remove entries with confirmation

### 2. Hidden Entries System
- **Concept**: Entries can be marked as "hidden" (like a secret compartment)
- **Access**: Toggle to reveal/hide hidden entries
- **Visual**: Hidden entries have distinct styling (faded, locked icon)
- **Privacy**: Hidden entries are still encrypted if locked

### 3. Enhanced Entry Features
- **Moods**: joy, sorrow, calm, unrest, secret (new)
- **Lock/Unlock**: Encrypted entries with password
- **Tags**: Custom tags for organization
- **Favorites**: Star important entries
- **Search**: Full-text search across entries
- **Filter**: By mood, date, tags, hidden status

### 4. Premium UI Design
- **Glass-morphism cards** matching dollhouse doors
- **Smooth animations** with spring easing
- **Multi-layer shadows** for depth
- **Elegant typography** with proper hierarchy
- **Responsive grid** with masonry layout option
- **Empty states** with helpful prompts

## User Flow

### Main Diary View
```
[Back Button] [Title: "My Diary"] [+ New Entry]

[Filter Bar: All | Joy | Sorrow | Calm | Unrest | Hidden]
[Search Box] [Layout Toggle: Grid/List/Book] [Sort: Newest/Oldest]

[Entry Cards in Grid/List/Book Layout]
- Each card shows: date, mood icon, preview, locked status
- Hover: Edit/Delete/Hide/Favorite actions
- Click: Open full entry view

[Archive Door at bottom]
```

### Entry Card (Grid View)
```
┌─────────────────────────┐
│ 🌙 [Mood Icon]  [⭐]   │
│                         │
│ "Entry preview text..." │
│                         │
│ Dec 1, 2025            │
│ [🔒] [👁️] [Edit] [Del] │
└─────────────────────────┘
```

### Create/Edit Entry Modal
```
┌──────────────────────────────────┐
│ [X Close]  New Diary Entry       │
├──────────────────────────────────┤
│                                  │
│ [Rich Text Editor]               │
│                                  │
│ Mood: [😊 Joy] [😢 Sorrow]      │
│       [😌 Calm] [😰 Unrest]     │
│       [🤫 Secret]                │
│                                  │
│ □ Lock this entry                │
│ □ Mark as hidden                 │
│ □ Add to favorites               │
│                                  │
│ Tags: [+Add Tag]                 │
│                                  │
│ [Cancel] [Save Entry]            │
└──────────────────────────────────┘
```

### Full Entry View
```
┌──────────────────────────────────┐
│ [← Back]              [Edit] [⋮] │
├──────────────────────────────────┤
│                                  │
│ 🌙 Calm • Dec 1, 2025 • 10:30 PM│
│                                  │
│ [Full entry content with         │
│  rich formatting, line breaks,   │
│  and proper typography]          │
│                                  │
│ Tags: #reflection #thoughts      │
│                                  │
│ [⭐ Favorite] [👁️ Hide] [🗑️ Del]│
└──────────────────────────────────┘
```

## Technical Implementation

### New Types
```typescript
interface DiaryEntry {
  id: string;
  userId: string;
  content: string;
  mood: 'joy' | 'sorrow' | 'calm' | 'unrest' | 'secret';
  isLocked: boolean;
  isHidden: boolean;
  isFavorite: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  encryptedContent?: string;
}

interface DiaryFilters {
  mood?: string;
  isHidden?: boolean;
  isFavorite?: boolean;
  tags?: string[];
  searchQuery?: string;
  dateRange?: { start: Date; end: Date };
}
```

### New Components
1. `DiaryGridView.tsx` - Premium grid layout
2. `DiaryEntryCard.tsx` - Polished entry card
3. `DiaryEntryModal.tsx` - Create/edit modal
4. `DiaryEntryDetail.tsx` - Full entry view
5. `DiaryFilterBar.tsx` - Advanced filtering
6. `DiarySearchBar.tsx` - Search functionality
7. `HiddenEntriesToggle.tsx` - Show/hide hidden entries
8. `DiaryEmptyState.tsx` - Beautiful empty state

### Updated Hooks
1. `useDiaryEntries.ts` - Add update, hide, favorite methods
2. `useDiaryFilters.ts` - Handle all filtering logic
3. `useDiarySearch.ts` - Full-text search

### Firestore Structure
```
diary_entries/
  {entryId}/
    userId: string
    content: string
    encryptedContent?: string
    mood: string
    isLocked: boolean
    isHidden: boolean
    isFavorite: boolean
    tags: string[]
    createdAt: timestamp
    updatedAt: timestamp
```

## Visual Design

### Color Palette (matching dollhouse)
- **Primary**: #ffb6d9 (pink)
- **Background**: rgba(30, 24, 20, 0.95)
- **Text**: #d8c4b0 (warm beige)
- **Accent**: #f5e8dc (cream)
- **Border**: rgba(255, 182, 217, 0.4)

### Card Styling
```css
- backdrop-filter: blur(20px) saturate(180%)
- border: 1.5px solid rgba(255, 182, 217, 0.4)
- border-radius: 12px
- box-shadow: 6-layer system
- transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)
```

### Typography
```css
- Title: font-serif, text-2xl, font-light, tracking-wide
- Body: font-serif, text-base, leading-relaxed
- Meta: font-serif, text-sm, opacity-70
```

## Implementation Steps

### Phase 1: Core CRUD (Priority 1)
1. Update DiaryEntry type with new fields
2. Create DiaryEntryModal for create/edit
3. Add update method to useDiaryEntries
4. Implement delete with confirmation
5. Test all CRUD operations

### Phase 2: Hidden Entries (Priority 2)
1. Add isHidden field to entries
2. Create HiddenEntriesToggle component
3. Update filtering logic
4. Add visual indicators for hidden entries
5. Test hide/unhide functionality

### Phase 3: Premium UI (Priority 3)
1. Redesign DiaryEntryCard with glass-morphism
2. Create DiaryGridView with masonry layout
3. Add smooth animations and transitions
4. Implement hover states and interactions
5. Polish typography and spacing

### Phase 4: Advanced Features (Priority 4)
1. Add tags system
2. Implement favorites
3. Add full-text search
4. Create advanced filters
5. Add sorting options

## Success Criteria
- ✅ All CRUD operations work smoothly
- ✅ Hidden entries toggle works correctly
- ✅ UI matches dollhouse aesthetic
- ✅ Smooth animations and transitions
- ✅ Responsive on all screen sizes
- ✅ Data persists correctly in Firestore
- ✅ No console errors or warnings
- ✅ Accessible keyboard navigation

## Timeline
- Phase 1: 30 minutes
- Phase 2: 15 minutes
- Phase 3: 20 minutes
- Phase 4: 25 minutes
- **Total**: ~90 minutes

---

**Status**: 📋 Planning Complete - Ready for Implementation
**Priority**: High - Core feature redesign
**Impact**: Significant UX improvement
