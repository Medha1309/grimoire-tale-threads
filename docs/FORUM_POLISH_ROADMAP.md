# Forum Polish & Reliability Roadmap

**Date**: December 2, 2024  
**Status**: Post-Cleanup Action Plan  
**Priority**: UX Polish → Reliability → Admin Tools

---

## ✅ Already Completed (Option A Cleanup)

1. ✅ Sample data toggle now uses environment variable
2. ✅ Edit modal accepts and populates initialValues
3. ✅ Thread hover preview fetches real replies (not mock data)
4. ✅ Deleted 2000+ lines of dead code
5. ✅ Fixed routing: `/tale-threads` and `/chains` redirect to `/forum`

---

## 🎯 Short-Term Tasks (Low Effort, High Impact)

### Task 1: Add Undo for Delete Actions
**Priority**: High  
**Effort**: 2-3 hours  
**Impact**: Critical UX safety net

**Files**:
- `src/components/forum/PostView.tsx`
- `src/components/forum/ReplySection.tsx`
- `src/hooks/useUndoDelete.ts` (create)

**Implementation**:
```typescript
// useUndoDelete.ts
export const useUndoDelete = () => {
  const [deletedItem, setDeletedItem] = useState(null);
  const [undoTimer, setUndoTimer] = useState(null);
  
  const softDelete = (item, onConfirm) => {
    setDeletedItem(item);
    // Show toast with undo button
    const timer = setTimeout(() => {
      onConfirm(); // Actually delete after 5 seconds
      setDeletedItem(null);
    }, 5000);
    setUndoTimer(timer);
  };
  
  const undo = () => {
    clearTimeout(undoTimer);
    setDeletedItem(null);
    // Restore item
  };
  
  return { softDelete, undo, deletedItem };
};
```

**Acceptance Criteria**:
- Clicking delete shows toast: "Thread deleted. Undo?"
- 5-second window to undo
- Undo restores thread/reply
- After 5 seconds, permanent delete

---

### Task 2: Rename/Alias Cleanup (Thread vs Post)
**Priority**: Medium  
**Effort**: 1-2 hours  
**Impact**: Developer clarity

**Files**:
- `src/components/forum/PostView.tsx` → Keep as is (exports both)
- `src/components/forum/ThreadView.tsx` → Already aliased
- `src/types/forum.ts` → Already has aliases

**Action**: Add comments clarifying the naming:
```typescript
// forum.ts
export interface ForumThread { /* ... */ }
export type ForumPost = ForumThread; // Alias for backward compatibility

// PostView.tsx
export const PostView = /* ... */;
export const ThreadView = PostView; // Preferred name going forward
```

**Acceptance Criteria**:
- All exports work
- Comments explain naming
- No breaking changes

---

### Task 3: Throttle Mouse Movement for Candles
**Priority**: Medium  
**Effort**: 2 hours  
**Impact**: Performance improvement

**Files**:
- `src/pages/Forum.tsx` (lines 50-60, mousePosition state)

**Current Problem**:
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
  // Updates on EVERY pixel movement!
}, []);
```

**Solution**:
```typescript
const mouseRef = useRef({ x: 50, y: 50 });
const rafRef = useRef<number | null>(null);

useEffect(() => {
  const handleMouseMove = (e: MouseEvent) => {
    mouseRef.current = {
      x: (e.clientX / window.innerWidth) * 100,
      y: (e.clientY / window.innerHeight) * 100,
    };
    
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(() => {
        // Update candle positions via CSS transforms
        updateCandlePositions(mouseRef.current);
        rafRef.current = null;
      });
    }
  };
  
  window.addEventListener('mousemove', handleMouseMove);
  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  };
}, []);
```

**Acceptance Criteria**:
- Mouse tracking throttled to ~60fps
- No React re-renders on mouse move
- Candles still follow mouse smoothly

---

## 📊 Mid-Term Tasks (Medium Effort)

### Task 4: Add Pagination + Virtualization
**Priority**: High  
**Effort**: 8-12 hours  
**Impact**: Scalability for 100+ threads

**Files**:
- `src/hooks/useForumPosts.ts`
- `src/components/forum/ForumList.tsx`
- Install: `npm install react-window`

**Phase 1: Server-Side Pagination** (4 hours)
```typescript
// useForumPosts.ts
const loadPosts = async (loadMore = false) => {
  let q = query(postsRef, orderBy('createdAt', 'desc'), limit(POSTS_PER_PAGE));
  
  if (loadMore && lastDoc) {
    q = query(q, startAfter(lastDoc));
  }
  
  const snapshot = await getDocs(q);
  setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
  setHasMore(snapshot.docs.length === POSTS_PER_PAGE);
};
```

**Phase 2: Infinite Scroll** (2 hours)
```typescript
// ForumList.tsx
const observerRef = useRef();

useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        loadMore();
      }
    },
    { threshold: 0.5 }
  );
  
  if (observerRef.current) observer.observe(observerRef.current);
  return () => observer.disconnect();
}, [hasMore, loading]);

// Add sentinel element at bottom
<div ref={observerRef} className="h-10" />
```

**Phase 3: Virtualization** (4 hours)
```typescript
import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={800}
  itemCount={posts.length}
  itemSize={200}
  width="100%"
>
  {({ index, style }) => (
    <div style={style}>
      <ThreadCard thread={posts[index]} />
    </div>
  )}
</FixedSizeList>
```

**Acceptance Criteria**:
- Loads 12 threads initially
- Infinite scroll loads more
- Smooth scrolling with 100+ threads
- Memory usage stays bounded

---

### Task 5: Add Focus Trap to Modals
**Priority**: Medium  
**Effort**: 3-4 hours  
**Impact**: Accessibility compliance

**Files**:
- `src/components/shared/UnifiedWritingModal.tsx`
- Install: `npm install focus-trap-react`

**Implementation**:
```typescript
import FocusTrap from 'focus-trap-react';

export const UnifiedWritingModal = ({ isOpen, onClose, ... }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <FocusTrap>
          <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              {/* Modal content */}
            </div>
          </div>
        </FocusTrap>
      )}
    </AnimatePresence>
  );
};
```

**Acceptance Criteria**:
- Tab cycles through modal elements only
- Escape key closes modal
- Focus returns to trigger element on close
- Screen reader announces modal

---

### Task 6: Wire Admin Moderation UI
**Priority**: Medium  
**Effort**: 6-8 hours  
**Impact**: Content moderation capability

**Files**:
- `src/pages/admin/ContentModerationTab.tsx` (already exists)
- `src/hooks/useReports.ts` (create)
- `src/router/index.tsx` (ensure admin route exists)

**Implementation**:
```typescript
// useReports.ts
export const useReports = () => {
  const [reports, setReports] = useState([]);
  
  useEffect(() => {
    const q = query(
      collection(db, 'forum_reports'),
      where('status', '==', 'pending'),
      orderBy('createdAt', 'desc')
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setReports(data);
    });
    
    return unsubscribe;
  }, []);
  
  const dismissReport = async (reportId) => {
    await updateDoc(doc(db, 'forum_reports', reportId), {
      status: 'dismissed',
      reviewedAt: serverTimestamp()
    });
  };
  
  const actionReport = async (reportId, action) => {
    // Delete thread/reply, ban user, etc.
    await updateDoc(doc(db, 'forum_reports', reportId), {
      status: 'actioned',
      action,
      reviewedAt: serverTimestamp()
    });
  };
  
  return { reports, dismissReport, actionReport };
};
```

**Acceptance Criteria**:
- Admin sees list of pending reports
- Can dismiss or take action
- Real-time updates via Firestore listener
- Actions logged to audit trail

---

## 🚀 Long-Term Tasks (Higher Effort)

### Task 7: Improve Reply Nesting
**Priority**: Low  
**Effort**: 4-6 hours  
**Impact**: Better conversation threading

**Current**: Replies flatten after 2 levels  
**Proposed**: Support 3 levels with visual indicators

**Files**:
- `src/components/forum/ReplySection.tsx`
- `src/hooks/useForumPost.ts` (buildReplyTree function)

**Implementation**:
```typescript
// Allow depth up to 3
const MAX_DEPTH = 3;

// Visual indicators
const getIndentStyle = (depth) => ({
  marginLeft: depth > 0 ? `${Math.min(depth, 3) * 24}px` : '0',
  borderLeft: depth > 0 ? '2px solid rgba(139, 115, 85, 0.2)' : 'none',
});
```

**Acceptance Criteria**:
- Supports 3 levels of nesting
- Visual indent shows hierarchy
- "Show more replies" for deep threads
- Performance stays good

---

### Task 8: Build Collaborative Projects (Optional)
**Priority**: Very Low  
**Effort**: 80-120 hours  
**Impact**: New feature (not polish)

**Decision**: Only if you need GitHub-style collaborative writing.

**If building**:
- Restore `src/config/taleThreads.ts`
- Build project creation UI
- Implement proposal/voting system
- Add role-based permissions
- Build merge workflow

**Recommendation**: Skip this unless explicitly needed.

---

## 🧪 Testing Checklist

### Unit Tests Needed
- [ ] `useForumPosts` - pagination logic
- [ ] `useForumPost` - reply tree building
- [ ] `UnifiedWritingModal` - initialValues population
- [ ] `useUndoDelete` - undo timer logic

### Integration Tests Needed
- [ ] Create thread → edit → verify changes
- [ ] Reply flow → optimistic render → persistence
- [ ] Delete → undo → verify restoration
- [ ] Pagination → load more → verify data

### Manual QA
- [ ] Keyboard navigation (Tab, Enter, Escape)
- [ ] Screen reader announces modals
- [ ] Mobile layout responsive
- [ ] 100+ threads scroll smoothly
- [ ] Mouse tracking doesn't lag

---

## 📝 Concrete File Changes

### Critical Lines to Change

**1. Mouse Tracking (Forum.tsx, lines 50-60)**
```diff
- const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
+ const mouseRef = useRef({ x: 50, y: 50 });
+ const rafRef = useRef<number | null>(null);
```

**2. Pagination (useForumPosts.ts, line 70)**
```diff
- q = query(q, limit(POSTS_PER_PAGE));
+ if (loadMore && lastDoc) {
+   q = query(q, startAfter(lastDoc));
+ }
+ q = query(q, limit(POSTS_PER_PAGE));
```

**3. Focus Trap (UnifiedWritingModal.tsx, line 100)**
```diff
+ import FocusTrap from 'focus-trap-react';
  
  return (
    <AnimatePresence>
      {isOpen && (
+       <FocusTrap>
          <div className="modal-overlay">
            {/* content */}
          </div>
+       </FocusTrap>
      )}
    </AnimatePresence>
  );
```

---

## 🎯 Priority Order

**Week 1** (Critical UX):
1. Add undo for delete (Task 1)
2. Throttle mouse tracking (Task 3)
3. Fix routing redirects (✅ Done)

**Week 2** (Scalability):
4. Add pagination (Task 4, Phase 1-2)
5. Add focus trap (Task 5)

**Week 3** (Admin Tools):
6. Wire moderation UI (Task 6)
7. Add virtualization (Task 4, Phase 3)

**Future** (Optional):
8. Improve reply nesting (Task 7)
9. Collaborative projects (Task 8) - only if needed

---

## 📦 Dependencies to Install

```bash
npm install react-window focus-trap-react
npm install --save-dev @types/react-window
```

---

## 🐛 Known Issues Fixed

✅ `/tale-threads` route broken → Now redirects to `/forum`  
✅ Edit modal empty → Now pre-fills with initialValues  
✅ Thread preview fake → Now fetches real replies  
✅ Sample data hardcoded → Now uses env variable  

---

## 📊 Success Metrics

**Performance**:
- Mouse tracking: <16ms per frame
- Thread list: Smooth scroll with 100+ items
- Modal open: <100ms

**Accessibility**:
- Keyboard navigation: 100% functional
- Screen reader: All actions announced
- Focus management: Proper trap and return

**Reliability**:
- Undo delete: 100% success rate
- Pagination: No duplicate/missing threads
- Real-time updates: <1s latency

---

## 🚀 Ready-to-Use PR Titles

```
fix(forum): add undo for delete actions with 5s grace period
perf(forum): throttle mouse tracking with requestAnimationFrame
feat(forum): add infinite scroll pagination for thread list
a11y(forum): add focus trap to modals for keyboard navigation
feat(admin): wire moderation UI to forum_reports collection
refactor(forum): clarify Thread vs Post naming with comments
```

---

## Summary

The forum is **functional** but needs **polish**. Focus on:
1. **UX safety** (undo delete)
2. **Performance** (throttle mouse, pagination)
3. **Accessibility** (focus trap)
4. **Admin tools** (moderation UI)

Skip collaborative projects unless explicitly needed.

**Estimated Total Time**: 25-35 hours for all short/mid-term tasks.
