# Archive System - Complete Redesign & Polish Plan

## Implementation Checklist

### 1. Fix Broken Archive Page ✅
- Fix type issues in archive wrappers
- Ensure proper data flow
- Add loading states

### 2. Delete → Archive Flow (Soft Delete)
**Where to add:**
- Diary entry detail view: "Burn Secret" button → Archive
- Scrapbook detail view: Delete button → Archive  
- Bookmark cards: Remove button → Archive

**UX Flow:**
1. User clicks delete/remove
2. Item moves to archive (soft delete)
3. Toast appears: "Item archived. [Undo]" (5 seconds)
4. Click Undo → Immediately restore

### 3. Archive View Polish
**Current Issues:**
- Buttons don't match app aesthetic
- No decorative elements
- Missing intelligent design

**Redesign:**
- Use dollhouse design tokens
- Add subtle animations
- Easter egg: Items fade/decay as they approach 30 days
- Hover effects show "time remaining" glow

### 4. Bulk Operations
**Add to archive view header:**
- "Restore All" button (with confirmation)
- "Empty Archive" button (with scary confirmation)
- Select mode toggle

### 5. Intelligent Design Elements

**Easter Eggs:**
- Items closer to deletion have more "decay" effects
- Hovering shows ghostly preview
- Restore animation: Item "rewinds" back to life
- Delete forever: Item "burns away" with particle effect

**Smart UX:**
- Auto-sort by days remaining (urgent first)
- Color-code by urgency: 
  - 20-30 days: Normal
  - 10-19 days: Yellow tint
  - 1-9 days: Red tint, pulsing
- Show "Last chance!" badge on items <3 days

### 6. Consistent Design System

**Button Hierarchy:**
- Primary: Restore (pink, prominent)
- Secondary: View details
- Danger: Delete forever (red, subtle)

**Typography:**
- Use existing font-serif
- Consistent with dollhouse aesthetic
- Proper hierarchy

**Colors:**
- Match dollhouse tokens (#ffb6d9)
- Use existing color system
- Maintain horror aesthetic

### 7. Animations & Transitions

**Restore Animation:**
```
Archive → Fade out with particles
Active list → Fade in from top
Toast: "Restored successfully"
```

**Delete Animation:**
```
Confirmation modal with shake
Item burns/fades with embers
Toast: "Permanently deleted"
```

**Archive Animation:**
```
Item fades with downward motion
Toast with undo appears
```

## Technical Implementation

### Files to Modify:
1. `ArchiveView.tsx` - Complete redesign
2. `ArchiveDoor.tsx` - Already done ✅
3. `Dollhouse.tsx` - Add delete handlers
4. `MemoryScrapbook.tsx` - Add archive on delete
5. `DiaryEntryView.tsx` - Add archive on delete

### New Files to Create:
1. `ArchiveCard.tsx` - Polished archive item card
2. `ArchiveEmptyState.tsx` - Beautiful empty state
3. `RestoreToast.tsx` - Undo toast component
4. `BulkArchiveActions.tsx` - Bulk operation controls

### Hooks to Enhance:
1. `useArchive.ts` - Add bulk operations
2. Add `useArchiveToast.ts` - Undo functionality

## Design Tokens

```typescript
export const archiveTokens = {
  urgency: {
    safe: { color: '#ffb6d9', opacity: 0.6 },
    warning: { color: '#fbbf24', opacity: 0.8 },
    danger: { color: '#ef4444', opacity: 1.0 },
  },
  animations: {
    restore: 'fadeInUp',
    delete: 'burnAway',
    archive: 'sinkDown',
  },
  timing: {
    toast: 5000,
    undo: 5000,
    animation: 300,
  },
};
```

## User Experience Flow

### Happy Path:
1. User creates diary entry
2. Later decides to delete
3. Clicks "Burn Secret"
4. Toast: "Archived. [Undo]"
5. Can restore from archive within 30 days
6. Or let it auto-delete

### Power User Path:
1. User has many old items
2. Goes to archive
3. Selects multiple items
4. Clicks "Restore All"
5. All items return to active

### Cleanup Path:
1. User wants fresh start
2. Goes to archive
3. Clicks "Empty Archive"
4. Scary confirmation: "This will permanently delete X items"
5. Confirms
6. Archive cleared with animation

## Next Steps

1. Fix broken archive page (type issues)
2. Redesign ArchiveView with polish
3. Add delete → archive integration
4. Implement undo toast
5. Add bulk operations
6. Add intelligent design elements
7. Test complete flow
