# Comprehensive Cleanup & Refactoring Plan

## Immediate Fix: Dollhouse Cursor Issue

**Problem:** Cursor behaving strangely only on Dollhouse page
**Likely Cause:** Conflicting cursor styles or pointer-events issues
**Solution:** Add explicit cursor reset to Dollhouse page

## Phase 1: Critical Performance Fixes (DONE)
- ✅ Removed console.logs from hot paths
- ✅ Disabled custom cursor system
- ✅ Cleaned up Dollhouse transition logs

## Phase 2: Code Cleanup & Refactoring

### A. Remove Remaining Debug Code
1. **Console.logs in hooks** (5 files)
   - `src/hooks/useDiaryState.ts`
   - `src/components/shared/WritingEditor.tsx`
   - `src/components/diary/DollhouseViewRouter.tsx`
   - `src/pages/Dollhouse.tsx`
   - `src/pages/GildedParlour.tsx`

2. **Unused imports** (scan all files)
3. **Commented code** (remove dead code)

### B. Refactor Duplicate Code
1. **Modal components** - Consolidate similar modals
2. **Background effects** - Share common patterns
3. **Animation utilities** - Centralize repeated animations
4. **Form handling** - Standardize form patterns

### C. Optimize Imports
1. Remove unused imports
2. Group imports logically
3. Use barrel exports where appropriate

### D. Type Safety Improvements
1. Remove `any` types
2. Add proper interfaces
3. Strengthen type checking

### E. Performance Optimizations
1. Memoize expensive computations
2. Add React.memo where needed
3. Optimize re-renders
4. Lazy load heavy components

## Phase 3: Architecture Improvements

### A. File Organization
```
src/
├── components/
│   ├── shared/        # Truly shared components
│   ├── diary/         # Dollhouse-specific
│   ├── forum/         # Forum-specific
│   └── library/       # Library-specific
├── hooks/
│   ├── shared/        # Generic hooks
│   └── feature/       # Feature-specific hooks
├── utils/
│   ├── core/          # Core utilities
│   ├── admin/         # Admin utilities (move here)
│   └── debug/         # Debug utilities (move here)
```

### B. Consolidate Similar Components
1. Background components (10+ files)
2. Effect components (multiple similar)
3. Modal components (many duplicates)

### C. Extract Common Patterns
1. Animation patterns
2. Form patterns
3. Loading states
4. Error handling

## Implementation Priority

### HIGH (Do Now)
1. Fix Dollhouse cursor issue
2. Remove remaining console.logs
3. Remove unused imports
4. Clean up commented code

### MEDIUM (Next)
5. Refactor duplicate modals
6. Consolidate background components
7. Optimize re-renders
8. Add React.memo strategically

### LOW (Later)
9. Reorganize file structure
10. Improve type safety
11. Add barrel exports
12. Document patterns

## Files to Refactor

### High Priority
- `src/pages/Dollhouse.tsx` - Large file, needs splitting
- `src/hooks/useDiaryState.ts` - Complex state management
- `src/components/diary/` - Many similar components

### Medium Priority
- `src/components/forum/` - Multiple background components
- `src/utils/` - Mix of admin and core utilities
- `src/hooks/` - Some hooks could be combined

### Low Priority
- Test files - Already well organized
- Design system - Already clean
- Config files - Already minimal
