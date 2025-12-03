# Diary Module - Architecture Overview

## 📐 Component Hierarchy

```
DiaryPage (Main Container)
├── NoiseMode (CRT Effect Overlay)
├── FloatingHeart (Easter Egg)
├── Sidebar
│   ├── New Entry Button
│   ├── Statistics Display
│   ├── Filter Buttons
│   └── Keyboard Shortcuts Help
├── Header
│   ├── Title
│   ├── Search Input
│   └── Noise Mode Toggle
├── Timeline (Recent Entries Strip)
└── Content Area
    ├── List View
    │   └── EntryCard[] (Grid of entries)
    ├── Editor View
    │   └── DiaryEditor
    │       ├── Title Input
    │       ├── Mood Selector
    │       ├── Content Textarea
    │       ├── Sticker Picker
    │       └── Action Buttons
    └── Detail View
        └── EntryDetail
            ├── Header (Title, Date, Mood)
            ├── Content Display
            ├── Stickers Display
            ├── Tags Display
            └── Action Buttons
```

## 🔄 Data Flow

```
User Action
    ↓
Component Event Handler
    ↓
useDiary Hook
    ↓
Storage Layer (IndexedDB/LocalStorage)
    ↓
State Update
    ↓
Component Re-render
```

### Example: Creating an Entry

```typescript
1. User clicks "New Entry"
   → DiaryPage.handleNewEntry()
   → setViewMode('editor')

2. User types content
   → DiaryEditor onChange
   → Auto-save timer starts (3s)

3. User clicks "Save Entry"
   → DiaryEditor.handleSubmit()
   → useDiary.createEntry()
   → saveEntryToDB()
   → IndexedDB.put()
   → setEntries([newEntry, ...entries])
   → DiaryPage re-renders with new entry
```

## 🗄️ Storage Architecture

```
Browser Storage
├── IndexedDB (Primary)
│   ├── Database: "GrimrDiaryDB"
│   ├── Version: 1
│   └── Object Store: "entries"
│       ├── Key: id (string)
│       ├── Index: userId
│       ├── Index: createdAt
│       └── Index: mood
│
└── LocalStorage (Fallback)
    └── Key: "grimr_diary_entries"
        └── Value: JSON array of entries
```

### Storage Decision Flow

```
Try IndexedDB
    ↓
Success? → Use IndexedDB
    ↓
Failure? → Fall back to LocalStorage
    ↓
Log warning → Continue normally
```

## 🎣 Hook Architecture

### useDiary Hook

```typescript
useDiary(userId)
├── State
│   ├── entries: DiaryEntry[]
│   ├── loading: boolean
│   ├── error: string | null
│   └── isSaving: boolean
│
├── Effects
│   ├── loadEntries() on mount
│   └── cleanup auto-save timer
│
├── Methods
│   ├── createEntry()
│   ├── updateEntry()
│   ├── deleteEntry()
│   ├── toggleFavorite()
│   ├── scheduleAutoSave()
│   ├── filterEntries()
│   ├── getStats()
│   └── refreshEntries()
│
└── Returns
    └── { entries, loading, error, ...methods }
```

## 🎨 Feature Implementation

### 1. Mood Sticker System

```
Constants (STICKER_LIBRARY)
    ↓
DiaryEditor (Sticker Picker UI)
    ↓
selectedStickers: string[]
    ↓
Save to entry.stickers
    ↓
Display in EntryCard & EntryDetail
```

### 2. Auto-generated Headlines

```
User types content
    ↓
generateHeadline(content, mood)
    ↓
Extract key phrases
    ↓
Combine with mood prefix
    ↓
Save to entry.headline
    ↓
Display in EntryCard
```

### 3. Noise Mode

```
User clicks toggle
    ↓
setNoiseModeEnabled(!enabled)
    ↓
NoiseMode component renders
    ↓
CSS overlays applied
    ↓
CRT grain + scanlines visible
```

### 4. Keyboard Shortcuts

```
Window keydown event
    ↓
Check key combination
    ↓
Ctrl+S → Save entry
Shift+Enter → New entry
Esc → Cancel
```

### 5. Timeline View

```
Get entries.slice(0, 7)
    ↓
Map to timeline cards
    ↓
Horizontal scroll container
    ↓
Click card → Open detail view
```

### 6. Floating Heart Easter Egg

```
Track last activity time
    ↓
Check idle > 30 seconds
    ↓
setShowFloatingHeart(true)
    ↓
Render heart with physics
    ↓
Bounce animation loop
    ↓
Any activity → Hide heart
```

## 🔐 Type System

```typescript
DiaryMood
├── 'happy'
├── 'sad'
├── 'calm'
├── 'anxious'
├── 'excited'
└── 'thoughtful'

DiaryEntry
├── id: string
├── userId: string
├── title: string
├── content: string
├── mood: DiaryMood
├── stickers: string[]
├── headline?: string
├── createdAt: Date
├── updatedAt: Date
├── tags: string[]
└── isFavorite: boolean

MoodSticker
├── id: string
├── emoji: string
├── label: string
└── category: 'emotion' | 'weather' | 'activity' | 'misc'
```

## 🎯 State Management

### Local State (Component-level)

```typescript
DiaryPage
├── viewMode: 'list' | 'editor' | 'detail'
├── selectedEntry: DiaryEntry | null
├── editingEntry: DiaryEntry | null
├── selectedMood: string | null
├── showingFavorites: boolean
├── searchQuery: string
├── noiseModeEnabled: boolean
├── showFloatingHeart: boolean
└── lastActivity: number
```

### Persistent State (Storage)

```typescript
IndexedDB/LocalStorage
└── entries: DiaryEntry[]
    └── Filtered/sorted in memory
```

## 🚀 Performance Optimizations

### 1. Debounced Auto-save
```typescript
useEffect(() => {
  const timer = setTimeout(() => {
    onAutoSave(...);
  }, 3000);
  return () => clearTimeout(timer);
}, [dependencies]);
```

### 2. Memoized Filtering
```typescript
const filteredEntries = useMemo(() => {
  return filterEntries(filters);
}, [entries, filters]);
```

### 3. Lazy Rendering
```typescript
// Only render visible view
{viewMode === 'list' && <ListView />}
{viewMode === 'editor' && <EditorView />}
{viewMode === 'detail' && <DetailView />}
```

### 4. Optimized Re-renders
```typescript
// Use React.memo for expensive components
export const EntryCard = React.memo(({ entry, ...props }) => {
  // Component logic
});
```

## 🔄 Lifecycle

### Mount
```
1. DiaryPage mounts
2. useDiary initializes
3. loadEntries() called
4. IndexedDB opened
5. Entries loaded
6. State updated
7. UI renders
```

### Update
```
1. User action
2. State change
3. Re-render affected components
4. Storage updated (if needed)
5. UI reflects changes
```

### Unmount
```
1. Cleanup auto-save timer
2. Close IndexedDB connection
3. Remove event listeners
4. Component unmounts
```

## 📊 Error Handling Flow

```
Try Operation
    ↓
Success? → Update state → Render
    ↓
Failure? → Catch error
    ↓
Log to console
    ↓
Show user-friendly message
    ↓
Attempt fallback (if applicable)
    ↓
Continue operation
```

## 🎨 Styling Strategy

### Tailwind Classes
- Utility-first approach
- Responsive modifiers (sm:, md:, lg:)
- State variants (hover:, focus:, group-hover:)
- Custom colors from MOOD_CONFIG

### Dynamic Styles
```typescript
style={{
  backgroundColor: moodConfig.bg,
  color: moodConfig.color,
}}
```

### Animations
- CSS transitions for smooth changes
- Framer Motion for page transitions (if integrated)
- Custom keyframes for noise effect

## 🔌 Integration Points

### Required Dependencies
```typescript
// From existing app
import { useAuth } from '../../../contexts/AuthContext';

// Standard React
import React, { useState, useEffect, useCallback } from 'react';
```

### Optional Integrations
- Router (React Router)
- Auth Context (for userId)
- Protected Route wrapper
- Animated Page wrapper

## 📦 Module Exports

```typescript
// Public API (src/modules/diary/index.ts)
export { DiaryPage }           // Main component
export { DiaryEditor }         // Editor component
export { EntryCard }           // Card component
export { EntryDetail }         // Detail component
export { useDiary }            // Main hook
export type { DiaryEntry }     // Types
export { MOOD_CONFIG }         // Constants
// ... other exports
```

## 🎯 Design Principles

1. **Self-contained**: No external dependencies
2. **Type-safe**: Full TypeScript coverage
3. **Error-resilient**: Try-catch on all async ops
4. **User-friendly**: Clear feedback and error messages
5. **Performant**: Optimized renders and storage
6. **Accessible**: Keyboard navigation and ARIA labels
7. **Responsive**: Mobile-first design
8. **Maintainable**: Clean code with comments

---

This architecture ensures the diary module is:
- Easy to understand
- Easy to maintain
- Easy to extend
- Production-ready
