# Archive System - Quick Reference

## 🚀 Quick Start

### Test the Archive (3 steps)

1. **Start dev server**:
   ```bash
   npm run dev
   ```

2. **Open browser console** (F12) and run:
   ```javascript
   window.testArchive.test()
   ```

3. **Navigate to Dollhouse** → Click any archive door

---

## 🎯 Key Files

### Core Components
- `src/components/diary/PolishedArchiveView.tsx` - Main archive UI
- `src/components/diary/ArchiveDoor.tsx` - Archive door button
- `src/hooks/useArchive.ts` - Archive management logic
- `src/types/archive.ts` - Type definitions

### Testing Utilities
- `src/utils/sampleArchiveData.ts` - Sample data generator
- `src/utils/testArchive.ts` - Browser console test tools

### Integration
- `src/pages/Dollhouse.tsx` - Archive routes and views

---

## 🎨 Features

### Urgency Color System
- 🟢 **Safe** (20-30 days): Pink (#ffb6d9)
- 🟡 **Warning** (10-19 days): Amber (#f59e0b)
- 🔴 **Danger** (1-9 days): Red (#ef4444)

### User Actions
- ✅ **Restore** - Bring item back from archive
- 🗑️ **Delete** - Permanently remove item
- 🔄 **Restore All** - Restore all archived items
- 🧹 **Empty Archive** - Delete all archived items

### Auto-Deletion
- Items auto-delete after **30 days**
- Countdown badge shows days remaining
- Urgent items (<3 days) have pulsing animation

---

## 🧪 Testing Commands

### Browser Console
```javascript
// Run full test (clears + adds sample data)
window.testArchive.test()

// Just add sample data
window.testArchive.populate()

// Clear all archive data
window.testArchive.clear()
```

### Sample Data Includes
- 3 diary entries (various urgency levels)
- 2 reading entries (with ratings)
- 1 scrapbook entry (with photos)

---

## 🐛 Bug Fixes Applied

### "require is not defined" Error
**Fixed**: Converted CommonJS `require()` to ES6 imports
- ✅ `src/pages/Dollhouse.tsx` - Added proper imports
- ✅ `src/components/diary/ArchiveView.tsx` - Fixed imports
- ✅ Build now succeeds with no errors

### Missing Imports
- ✅ Added `DollhouseRoomHeader` import
- ✅ Added `DiaryEmptyState` import
- ✅ Cleaned up unused imports

---

## 📊 Build Status

```bash
npm run build
✓ 895 modules transformed
✓ built in 7.56s
✅ NO ERRORS
```

---

## 🎯 User Flow

1. User navigates to Dollhouse
2. User clicks archive door in any room
3. Archive view opens with:
   - List of archived items
   - Color-coded urgency badges
   - Days remaining countdown
4. User can:
   - Restore individual items
   - Delete items permanently
   - Restore all items
   - Empty entire archive
5. Confirmation modals prevent accidents
6. Smooth animations provide feedback

---

## 💡 Tips

- **Test with sample data first** - Use `window.testArchive.test()`
- **Check urgency colors** - Hover to see glow effects
- **Watch animations** - Restore/delete have smooth transitions
- **Empty state** - Archive shows sparkle when empty
- **Bulk operations** - Use header buttons for multiple items

---

## ✅ Status: COMPLETE

All features working, no errors, ready to use! 🎉
