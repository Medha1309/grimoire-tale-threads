# Code Cleanup Plan

## Issues Identified

### 1. Console.log Statements (Production Code)
**Files with debug logs:**
- `src/components/diary/DollhousePageWrapper.tsx` - 2 console.logs
- `src/components/diary/DollhouseTransition.tsx` - 3 console.logs  
- `src/components/diary/DollhouseViewRouter.tsx` - 1 console.log
- `src/components/diary/WritingEditorHeader.tsx` - 3 console.logs
- `src/components/shared/WritingEditor.tsx` - 1 console.log
- `src/hooks/useDiaryState.ts` - 3 console.logs
- `src/pages/Dollhouse.tsx` - 2 console.logs
- `src/pages/GildedParlour.tsx` - 1 console.log

**Action:** Remove all debug console.logs from production code

### 2. Unused Cursor Components
**Files:**
- `src/components/cursors/` - All cursor components (disabled but still in codebase)
- `src/components/shared/CustomCursor.tsx` - Returns null

**Action:** Keep for now (may be reused), but already optimized

### 3. Utility Console.logs (Keep for debugging)
**Files to keep:**
- `src/utils/securityMonitor.ts` - DEV only
- `src/utils/performanceMonitor.ts` - Performance warnings
- `src/utils/deviceDetection.ts` - Debug info
- `src/utils/seedForumData.ts` - Admin utility
- `src/utils/populateMockData.ts` - Admin utility
- `src/utils/verifyMockData.ts` - Admin utility
- `src/utils/adminSetup.ts` - Admin utility

### 4. Performance Optimizations Needed
- Remove console.logs from hot paths (Dollhouse transitions)
- Clean up commented code
- Remove unused imports

## Cleanup Priority

### High Priority (Performance Impact)
1. ✅ Remove console.logs from Dollhouse components (transition lag)
2. ✅ Remove console.logs from WritingEditor (user interaction lag)
3. ✅ Remove console.logs from hooks (re-render performance)

### Medium Priority (Code Quality)
4. Clean up commented code
5. Remove unused imports
6. Consolidate duplicate code

### Low Priority (Nice to Have)
7. Add proper logging system for production
8. Document remaining console.logs
9. Add performance monitoring toggle
