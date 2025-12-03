# Archive System Implementation Guide

## Overview
Complete archive system for Grimr with soft delete, restore, and auto-deletion after 30 days.

## Architecture

### Content Types
- **Diary Entries**: Confessions with mood, lock status
- **Reading History**: Books completed from Library
- **Scrapbooks**: Memory scrapbooks with photos and stickers

### Archive Behavior
- **Soft Delete**: Items move to archive (not permanently deleted)
- **30-Day Auto-Delete**: Items permanently deleted after 30 days
- **Warning Display**: Shows days remaining before deletion
- **Full CRUD**: Create (archive), Read, Update (restore), Delete (permanent)

### Visual Design
- **Archive Doors**: Themed per content type (vintage diary, library reading, polaroid scrapbook)
- **Archive Interior**: Pink matrix background for ALL archive types (unified aesthetic)
- **Separate Archives**: Each content type has its own archive door in respective dollhouse room

## Implementation Status

### ✅ Completed
1. **Core Types** (`src/types/archive.ts`)
   - BaseArchiveItem, ArchivedDiaryEntry, ArchivedReadingEntry, ArchivedScrapbookEntry
   - Helper functions: getDaysUntilDeletion, shouldAutoDelete

2. **Archive Hook** (`src/hooks/useArchive.ts`)
   - Unified archive management for all content types
   - localStorage persistence
   - Auto-cleanup on load
   - Archive, restore, permanent delete operations

3. **Archive Door Component** (`src/components/diary/ArchiveDoor.tsx`)
   - Themed designs per content type
   - Item count display
   - Hover effects and animations

4. **Unified Archive View** (`src/components/diary/ArchiveView.tsx`)
   - Pink matrix background
   - Days until deletion badges
   - Restore and permanent delete actions
   - Content-specific rendering

5. **Specific Archive Views**
   - `DiaryArchiveView.tsx`: Diary-specific archive
   - `ScrapbookArchiveView.tsx`: Scrapbook-specific archive
   - `ReadingArchiveView.tsx`: Updated for archive system

## Next Steps

### 1. Update Dollhouse Routing
- Add archive sub-views: `diary-archive`, `scrapbook-archive`, `reading-archive`
- Update DollhouseHomeView to show archive doors in each room
- Wire up navigation between rooms and their archives

### 2. Integrate Archive Actions
- Update diary delete to use archive
- Update scrapbook delete to use archive
- Update reading history delete to use archive

### 3. Add Archive Doors to Rooms
- Diary room: Show diary archive door
- Scrapbook room: Show scrapbook archive door
- Reading/Bookmarks room: Show reading archive door

### 4. Update Types
- Ensure DiaryEntry type includes all necessary fields
- Ensure ScrapbookEntry type is properly defined
- Update ReadingHistoryEntry if needed

## Usage Examples

### Archiving an Item
```typescript
const { archiveItem } = useArchive('diary');

// Archive a diary entry
archiveItem({
  id: entry.id,
  type: 'diary',
  content: entry.content,
  mood: entry.mood,
  isLocked: entry.isLocked,
  originalCreatedAt: entry.createdAt,
  userId: entry.userId,
});
```

### Restoring an Item
```typescript
const { restoreItem } = useArchive('diary');

const restored = restoreItem(itemId);
if (restored) {
  // Add back to active entries
  addDiaryEntry(restored);
}
```

### Viewing Archive
```typescript
<DiaryArchiveView
  onBack={() => setView('diary')}
  onRestore={(entry) => {
    // Handle restored entry
    addToActiveEntries(entry);
  }}
/>
```

## File Structure
```
src/
├── types/
│   └── archive.ts                    # Archive types
├── hooks/
│   └── useArchive.ts                 # Archive management hook
├── components/
│   └── diary/
│       ├── ArchiveDoor.tsx           # Themed archive door buttons
│       ├── ArchiveView.tsx           # Unified archive view
│       ├── DiaryArchiveView.tsx      # Diary-specific archive
│       ├── ScrapbookArchiveView.tsx  # Scrapbook-specific archive
│       └── ReadingArchiveView.tsx    # Reading-specific archive
└── pages/
    └── Dollhouse.tsx                 # Main routing (needs update)
```

## Design Tokens

### Archive Door Themes
- **Diary**: Purple/pink gradient, lock icon, vintage aesthetic
- **Reading**: Amber/yellow gradient, book icon, library aesthetic
- **Scrapbook**: Pink/rose gradient, camera icon, polaroid aesthetic

### Pink Matrix Background
- Used for ALL archive interiors
- Consistent with existing dollhouse aesthetic
- Creates unified "archived" feeling

## Testing Checklist
- [ ] Archive diary entry
- [ ] Archive scrapbook entry
- [ ] Archive reading history entry
- [ ] Restore each content type
- [ ] Permanent delete with confirmation
- [ ] Auto-deletion after 30 days
- [ ] Days remaining display
- [ ] Empty state handling
- [ ] Navigation between rooms and archives
