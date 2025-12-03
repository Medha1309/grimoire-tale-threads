# Diary Redesign - Implementation Guide

## ✅ Completed

### 1. Type Definitions Updated
- ✅ Added `isHidden`, `isFavorite`, `tags` fields to `DiaryEntry`
- ✅ Added `secret` mood type
- ✅ Created `UpdateEntryData` interface
- ✅ Enhanced `DiaryFilters` with new filter options
- ✅ Added `MOOD_ICONS` for visual display
- ✅ Updated color scheme to match dollhouse pink theme

## 🚧 Next Steps - Core Components Needed

### Phase 1: Update Hooks (Priority 1)
**File**: `src/hooks/useDiaryEntries.ts`

Add these methods:
```typescript
// Update entry
const updateEntry = async (entryId: string, data: UpdateEntryData): Promise<boolean>

// Toggle hidden status
const toggleHidden = async (entryId: string): Promise<boolean>

// Toggle favorite status
const toggleFavorite = async (entryId: string): Promise<boolean>

// Add/remove tags
const updateTags = async (entryId: string, tags: string[]): Promise<boolean>
```

### Phase 2: Create New Components

#### 1. DiaryEntryCard.tsx (Premium Card Design)
**Location**: `src/components/diary/DiaryEntryCard.tsx`

Features:
- Glass-morphism design matching dollhouse doors
- Mood icon display
- Hidden/Favorite indicators
- Quick actions (Edit/Delete/Hide/Favorite)
- Hover animations
- Click to open full view

```typescript
interface DiaryEntryCardProps {
  entry: DiaryEntry;
  onEdit: (entry: DiaryEntry) => void;
  onDelete: (entryId: string) => void;
  onToggleHidden: (entryId: string) => void;
  onToggleFavorite: (entryId: string) => void;
  onClick: (entry: DiaryEntry) => void;
}
```

#### 2. DiaryEntryModal.tsx (Create/Edit Modal)
**Location**: `src/components/diary/DiaryEntryModal.tsx`

Features:
- Rich text editor
- Mood selector with icons
- Lock toggle
- Hidden toggle
- Favorite toggle
- Tags input
- Save/Cancel actions

```typescript
interface DiaryEntryModalProps {
  isOpen: boolean;
  entry?: DiaryEntry; // undefined for create, defined for edit
  onClose: () => void;
  onSave: (data: CreateEntryData | UpdateEntryData) => Promise<void>;
}
```

#### 3. DiaryFilterBar.tsx (Advanced Filtering)
**Location**: `src/components/diary/DiaryFilterBar.tsx`

Features:
- Mood filter chips
- Hidden entries toggle
- Favorites filter
- Search input
- Sort options
- Clear filters button

```typescript
interface DiaryFilterBarProps {
  filters: DiaryFilters;
  onFiltersChange: (filters: DiaryFilters) => void;
  showHidden: boolean;
  onToggleHidden: () => void;
}
```

#### 4. DiaryGridView.tsx (Premium Grid Layout)
**Location**: `src/components/diary/DiaryGridView.tsx`

Features:
- Responsive masonry grid
- Empty state
- Loading skeleton
- Smooth animations
- Infinite scroll (optional)

```typescript
interface DiaryGridViewProps {
  entries: DiaryEntry[];
  loading: boolean;
  onEntryClick: (entry: DiaryEntry) => void;
  onEdit: (entry: DiaryEntry) => void;
  onDelete: (entryId: string) => void;
  onToggleHidden: (entryId: string) => void;
  onToggleFavorite: (entryId: string) => void;
}
```

#### 5. DiaryEntryDetail.tsx (Full Entry View)
**Location**: `src/components/diary/DiaryEntryDetail.tsx`

Features:
- Full content display
- Rich formatting
- Metadata (date, mood, tags)
- Action buttons
- Back navigation

```typescript
interface DiaryEntryDetailProps {
  entry: DiaryEntry;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onToggleHidden: () => void;
  onToggleFavorite: () => void;
}
```

### Phase 3: Update Main Diary View

**File**: `src/components/diary/DiaryView.tsx`

Changes needed:
1. Add filter state management
2. Add modal state (create/edit)
3. Add detail view state
4. Integrate new components
5. Handle all CRUD operations
6. Add hidden entries toggle

### Phase 4: Firestore Updates

Update `useDiaryEntries.ts` to handle new fields:
```typescript
// When creating entry
const entryData = {
  userId: currentUser.uid,
  content: contentToStore,
  mood: data.mood,
  isLocked: data.isLocked,
  isHidden: data.isHidden || false,
  isFavorite: data.isFavorite || false,
  tags: data.tags || [],
  createdAt: serverTimestamp(),
  updatedAt: serverTimestamp(),
};
```

## 🎨 Design System Integration

### Colors (from dollhouse-tokens.ts)
```typescript
const diaryColors = {
  primary: '#ffb6d9',
  background: 'rgba(30, 24, 20, 0.95)',
  text: '#d8c4b0',
  textLight: '#f5e8dc',
  border: 'rgba(255, 182, 217, 0.4)',
  glow: 'rgba(255, 182, 217, 0.3)',
};
```

### Card Styling Template
```css
.diary-card {
  background: linear-gradient(145deg, 
    rgba(30, 24, 20, 0.95) 0%, 
    rgba(20, 16, 14, 0.98) 50%, 
    rgba(30, 24, 20, 0.95) 100%
  );
  backdrop-filter: blur(20px) saturate(180%);
  border: 1.5px solid rgba(255, 182, 217, 0.4);
  border-radius: 12px;
  box-shadow: 
    0 12px 40px rgba(0, 0, 0, 0.7),
    0 6px 20px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    0 0 40px rgba(255, 182, 217, 0.25);
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.diary-card:hover {
  transform: translateY(-6px) scale(1.01);
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.8),
    0 10px 30px rgba(0, 0, 0, 0.6),
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    0 0 60px rgba(255, 182, 217, 0.4);
}
```

## 📝 Implementation Checklist

### Immediate (Can do now)
- [x] Update DiaryEntry type
- [x] Add new mood type and icons
- [x] Update color scheme
- [ ] Update useDiaryEntries hook with CRUD methods
- [ ] Create DiaryEntryCard component
- [ ] Create DiaryEntryModal component
- [ ] Create DiaryFilterBar component

### Short-term (Next session)
- [ ] Create DiaryGridView component
- [ ] Create DiaryEntryDetail component
- [ ] Update main DiaryView
- [ ] Test all CRUD operations
- [ ] Add animations and transitions

### Polish (Final touches)
- [ ] Add loading states
- [ ] Add error handling
- [ ] Add success toasts
- [ ] Add keyboard shortcuts
- [ ] Add accessibility features
- [ ] Mobile responsive testing

## 🚀 Quick Start for Next Session

To continue implementation:

1. **Start with the hook**:
   ```bash
   # Open and update
   src/hooks/useDiaryEntries.ts
   ```

2. **Create the card component**:
   ```bash
   # Create new file
   src/components/diary/DiaryEntryCard.tsx
   ```

3. **Create the modal**:
   ```bash
   # Create new file
   src/components/diary/DiaryEntryModal.tsx
   ```

4. **Test incrementally**:
   - Test each component in isolation
   - Integrate one at a time
   - Verify Firestore operations

## 📚 Reference Files

Key files to reference:
- `src/components/diary/DollhouseRoom.tsx` - For card styling
- `src/design-system/dollhouse-tokens.ts` - For colors/styles
- `src/hooks/useDiaryEntries.ts` - Current implementation
- `src/components/diary/DiaryView.tsx` - Main view to update

## 🎯 Success Metrics

When complete, you should have:
- ✅ Full CRUD working (Create, Read, Update, Delete)
- ✅ Hidden entries toggle functional
- ✅ Favorites system working
- ✅ Tags system implemented
- ✅ Premium UI matching dollhouse
- ✅ Smooth animations
- ✅ Mobile responsive
- ✅ No console errors

---

**Status**: 🎯 Types Updated - Ready for Component Implementation
**Next**: Update `useDiaryEntries.ts` hook with CRUD methods
**Priority**: High - Core feature
