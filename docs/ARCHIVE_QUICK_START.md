# Archive System - Quick Start

## What's Been Built

### Core System ✅
- Archive types for diary, reading, scrapbooks
- useArchive hook for managing archived items
- 30-day auto-deletion with countdown
- Soft delete (archive) and restore functionality
- Pink matrix background for all archives

### Components ✅
- `ArchiveDoor.tsx` - Themed archive door buttons
- `ArchiveView.tsx` - Unified archive view with pink matrix
- `DiaryArchiveView.tsx` - Diary-specific wrapper
- `ScrapbookArchiveView.tsx` - Scrapbook-specific wrapper  
- `ReadingArchiveView.tsx` - Updated for archive system

## How to Use

### 1. Add Archive Door to a Room

```typescript
import { ArchiveDoor } from '../components/diary/ArchiveDoor';
import { useArchive } from '../hooks/useArchive';

// In your room component
const { items } = useArchive('diary'); // or 'reading' or 'scrapbook'

<ArchiveDoor
  type="diary"
  itemCount={items.length}
  onClick={() => setView('diary-archive')}
/>
```

### 2. Add Archive View to Routing

```typescript
// In Dollhouse.tsx or similar
if (view === 'diary-archive') {
  return (
    <DiaryArchiveView
      onBack={() => setView('diary')}
      onRestore={(entry) => {
        // Add entry back to active entries
        // This will vary based on your data management
      }}
    />
  );
}
```

### 3. Archive an Item (Soft Delete)

```typescript
import { useArchive } from '../hooks/useArchive';

const { archiveItem } = useArchive('diary');

const handleDelete = (entry) => {
  // Archive instead of deleting
  archiveItem({
    id: entry.id,
    type: 'diary',
    content: entry.content,
    mood: entry.mood,
    isLocked: entry.isLocked,
    originalCreatedAt: entry.createdAt,
    userId: entry.userId,
  });
  
  // Remove from active list
  removeFromActiveEntries(entry.id);
};
```

## Integration Points

### Diary Room
- Show ArchiveDoor at bottom of diary list
- Route to DiaryArchiveView
- On restore: add back to diary entries

### Scrapbook Room
- Show ArchiveDoor at bottom of scrapbook grid
- Route to ScrapbookArchiveView
- On restore: add back to scrapbook entries

### Reading/Bookmarks Room
- Show ArchiveDoor at bottom of bookmarks list
- Route to ReadingArchiveView (already updated)
- On restore: add back to reading history

## Visual Design

### Archive Doors (Themed)
- **Diary**: Purple/pink, lock icon 📔
- **Reading**: Amber/yellow, book icon 📚
- **Scrapbook**: Pink/rose, camera icon 📸

### Archive Interior (Unified)
- Pink matrix rain background for ALL types
- Consistent with dollhouse aesthetic
- Days-until-deletion badges
- Restore and permanent delete buttons

## Next Steps for Full Integration

1. **Update Diary Delete**: Change delete button to archive
2. **Update Scrapbook Delete**: Change delete to archive
3. **Update Reading History Delete**: Change delete to archive
4. **Add Archive Doors**: Place in each room view
5. **Wire Up Routing**: Add archive views to Dollhouse routing
6. **Test Flow**: Archive → View → Restore → Permanent Delete

## File Locations

```
src/
├── types/archive.ts
├── hooks/useArchive.ts
└── components/diary/
    ├── ArchiveDoor.tsx
    ├── ArchiveView.tsx
    ├── DiaryArchiveView.tsx
    ├── ScrapbookArchiveView.tsx
    └── ReadingArchiveView.tsx
```
