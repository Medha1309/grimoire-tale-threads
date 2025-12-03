# Forum - Next Steps (Priority Tasks)

**Date**: December 2, 2024  
**Status**: Ready for Implementation  
**Time Estimate**: 5-7 hours for all priority tasks

---

## ✅ Already Done

1. ✅ Deleted dead code (2000+ lines)
2. ✅ Fixed edit modal (initialValues)
3. ✅ Fixed thread preview (real data)
4. ✅ Fixed sample data toggle (env variable)
5. ✅ Fixed routing (`/tale-threads` → `/forum`)
6. ✅ No TypeScript errors
7. ✅ No runtime errors

---

## 🎯 Priority Tasks (Do These First)

### Task 1: Add Undo for Delete (2-3 hours)
**Why**: Critical UX safety net  
**Impact**: Prevents accidental data loss

**Step 1**: Create the hook
```typescript
// src/hooks/useUndoDelete.ts
import { useState, useCallback } from 'react';

interface DeletedItem {
  id: string;
  type: 'thread' | 'reply';
  data: any;
}

export const useUndoDelete = () => {
  const [deletedItem, setDeletedItem] = useState<DeletedItem | null>(null);
  const [undoTimer, setUndoTimer] = useState<NodeJS.Timeout | null>(null);

  const softDelete = useCallback((item: DeletedItem, onConfirm: () => Promise<void>) => {
    setDeletedItem(item);
    
    const timer = setTimeout(async () => {
      await onConfirm();
      setDeletedItem(null);
    }, 5000);
    
    setUndoTimer(timer);
  }, []);

  const undo = useCallback(() => {
    if (undoTimer) {
      clearTimeout(undoTimer);
      setUndoTimer(null);
    }
    setDeletedItem(null);
  }, [undoTimer]);

  return { softDelete, undo, deletedItem };
};
```

**Step 2**: Update PostView.tsx
```typescript
// Add to imports
import { useUndoDelete } from '../../hooks/useUndoDelete';
import { useToast } from '../../hooks/useToast';

// In component
const { softDelete, undo, deletedItem } = useUndoDelete();
const { showToast } = useToast();

const handleDelete = async () => {
  if (!isAuthor) return;
  
  softDelete(
    { id: post.id, type: 'thread', data: post },
    async () => {
      // Actually delete
      await deleteDoc(doc(db, 'forum_posts', post.id));
      onDeleted?.();
      onBack?.();
    }
  );
  
  showToast({
    message: 'Thread deleted',
    action: { label: 'Undo', onClick: undo },
    duration: 5000,
  });
  
  setShowDeleteConfirm(false);
};
```

**Step 3**: Update ReplySection.tsx (same pattern)

**Test**:
- Delete thread → See toast with "Undo" button
- Click undo → Thread restored
- Wait 5 seconds → Thread permanently deleted

---

### Task 2: Throttle Mouse Tracking (2 hours)
**Why**: Performance improvement  
**Impact**: Reduces re-renders from 1000s/sec to 60/sec

**File**: `src/pages/Forum.tsx`

**Find** (around line 50):
```typescript
const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

useEffect(() => {
  const handleMouseMove = (e: MouseEvent) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth) * 100,
      y: (e.clientY / window.innerHeight) * 100,
    });
  };
  window.addEventListener('mousemove', handleMouseMove);
  return () => window.removeEventListener('mousemove', handleMouseMove);
}, []);
```

**Replace with**:
```typescript
const mouseRef = useRef({ x: 50, y: 50 });
const rafRef = useRef<number | null>(null);
const [, forceUpdate] = useState({});

useEffect(() => {
  const handleMouseMove = (e: MouseEvent) => {
    mouseRef.current = {
      x: (e.clientX / window.innerWidth) * 100,
      y: (e.clientY / window.innerHeight) * 100,
    };
    
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(() => {
        forceUpdate({}); // Trigger re-render at 60fps max
        rafRef.current = null;
      });
    }
  };
  
  window.addEventListener('mousemove', handleMouseMove);
  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
  };
}, []);
```

**Update FloatingCandle component** (around line 20):
```typescript
// Change from
const offsetX = (mouseX - 50) * 0.02 * (index % 2 === 0 ? 1 : -1);

// To
const offsetX = (mouseRef.current.x - 50) * 0.02 * (index % 2 === 0 ? 1 : -1);
```

**Test**:
- Open DevTools → Performance tab
- Record while moving mouse
- Verify: ~60 updates/sec (not 1000s)

---

### Task 3: Add Naming Comments (30 minutes)
**Why**: Developer clarity  
**Impact**: Reduces confusion

**File**: `src/types/forum.ts`

**Add comments**:
```typescript
/**
 * ForumThread - Main discussion thread type
 * Note: Also exported as ForumPost for backward compatibility
 */
export interface ForumThread {
  // ... existing fields
}

/**
 * @deprecated Use ForumThread instead
 * Alias maintained for backward compatibility
 */
export type ForumPost = ForumThread;
```

**File**: `src/components/forum/PostView.tsx`

**Add comment at bottom**:
```typescript
/**
 * ThreadView - Preferred name going forward
 * Alias of PostView for consistency with ForumThread naming
 */
export const ThreadView = PostView;
```

**Test**: No functional changes, just documentation

---

## 📦 Dependencies Needed

```bash
# For future tasks (not needed yet)
npm install react-window focus-trap-react
npm install --save-dev @types/react-window
```

---

## 🧪 Testing Checklist

After implementing priority tasks:

### Manual Testing
- [ ] Delete thread → See undo toast
- [ ] Click undo → Thread restored
- [ ] Wait 5 seconds → Thread deleted
- [ ] Delete reply → Same undo behavior
- [ ] Move mouse → Smooth candle movement
- [ ] Open DevTools → Check re-render count
- [ ] All routes still work
- [ ] No console errors

### Performance Testing
- [ ] Mouse tracking: <16ms per frame
- [ ] Candle animation: Smooth at 60fps
- [ ] No lag when moving mouse quickly

---

## 📝 Commit Messages

```bash
git commit -m "feat(forum): add undo for delete with 5s grace period"
git commit -m "perf(forum): throttle mouse tracking with requestAnimationFrame"
git commit -m "docs(forum): clarify Thread vs Post naming conventions"
```

---

## 🚀 After Priority Tasks

Once these are done, move to mid-term tasks:
1. Add pagination (8-12 hours)
2. Add focus trap (3-4 hours)
3. Wire admin moderation (6-8 hours)

See `FORUM_POLISH_ROADMAP.md` for details.

---

## 📊 Progress Tracker

### Completed ✅
- [x] Delete dead code
- [x] Fix edit modal
- [x] Fix thread preview
- [x] Fix sample data toggle
- [x] Fix routing
- [x] Create documentation

### In Progress 🔄
- [ ] Add undo for delete
- [ ] Throttle mouse tracking
- [ ] Add naming comments

### Planned 📋
- [ ] Add pagination
- [ ] Add focus trap
- [ ] Wire admin moderation

---

## 💡 Quick Tips

### For Undo Delete
- Use existing `useToast` hook
- 5-second window is standard
- Show clear "Undo" button
- Restore optimistically

### For Mouse Throttling
- Use `requestAnimationFrame`
- Store position in ref (not state)
- Force update at 60fps max
- Cancel RAF on unmount

### For Naming
- Add JSDoc comments
- Mark deprecated items
- Explain aliases
- No breaking changes

---

## 🎯 Success Criteria

### Undo Delete
- ✅ Toast appears on delete
- ✅ Undo button visible
- ✅ Clicking undo restores item
- ✅ After 5s, item deleted permanently
- ✅ Works for threads and replies

### Mouse Throttling
- ✅ Candles still follow mouse
- ✅ Animation smooth
- ✅ <60 updates per second
- ✅ No performance lag

### Naming Comments
- ✅ Clear documentation
- ✅ Explains aliases
- ✅ No breaking changes
- ✅ Helps future developers

---

## 📞 Need Help?

### Documentation
- `docs/FORUM_QUICK_START.md` - User guide
- `FORUM_POLISH_ROADMAP.md` - Full roadmap
- `TALE_THREADS_TECHNICAL_AUDIT.md` - Technical details

### Code Examples
- `src/hooks/useToast.ts` - Toast implementation
- `src/components/shared/Toast.tsx` - Toast UI
- `src/hooks/useDebounce.ts` - Throttling example

---

## Summary

**Priority tasks** (5-7 hours):
1. Add undo for delete (2-3 hours)
2. Throttle mouse tracking (2 hours)
3. Add naming comments (30 minutes)

**After these**, the forum will have:
- ✅ Critical UX safety (undo)
- ✅ Better performance (throttling)
- ✅ Clearer code (comments)

Then move to **mid-term tasks** for scalability and accessibility.

---

**Ready to implement!** 🚀
