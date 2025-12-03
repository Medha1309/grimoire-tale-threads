# Comprehensive Code Optimization Plan

## Phase 1: Remove Unused Files

### Unused UI Components
- ❌ `src/components/ui/Button.tsx` - Not imported anywhere (use shared/Button.tsx)
- ❌ `src/components/ui/Input.tsx` - Not imported anywhere

### Potentially Unused Data Files (Need verification)
- ⚠️ `src/data/stories.ts` - Only used in constants/index.ts for backward compatibility
- ⚠️ `src/data/mockBookData.ts` - Used in populate/verify utils (admin only)

### Development/Seed Files (Keep for now - useful for setup)
- ✅ `src/pages/AdminPopulate.tsx` - Used in router
- ✅ `src/pages/SeedForum.tsx` - Used in router
- ✅ `public/seed-forum.html` - Utility page
- ✅ `public/create-test-user.html` - Utility page

### Documentation (Consolidate later)
- Keep all docs for now - will consolidate in Phase 4

## Phase 2: Consolidate Duplicate Components

### Button Components
- Keep: `src/components/shared/Button.tsx` (main)
- Remove: `src/components/ui/Button.tsx` (unused)

### Performance Utilities
- Audit: Multiple performance files
  - `src/utils/performance.ts`
  - `src/utils/optimizations.ts`
  - `src/utils/optimizedPerformance.ts`
  - `src/utils/performanceMonitor.ts`
  - Consolidate into single file

### Animation Utilities
- Audit: Multiple animation files
  - `src/utils/animations.ts`
  - `src/utils/animation-system.ts`
  - `src/utils/commonAnimations.ts`
  - Consolidate into single file

## Phase 3: Code Optimization

### Bundle Size Optimization
1. Ensure all heavy components are lazy loaded
2. Add dynamic imports for rarely used features
3. Optimize image loading
4. Tree-shake unused exports

### Performance Improvements
1. Memoize expensive computations
2. Use React.memo for pure components
3. Implement virtual scrolling for long lists
4. Optimize re-renders

### Code Quality
1. Remove console.logs in production
2. Consolidate duplicate logic
3. Improve type safety
4. Add missing error boundaries

## Phase 4: Documentation Cleanup

### Keep Essential Docs
- README.md
- QUICKSTART.md
- ARCHITECTURE.md
- Key feature guides

### Archive/Remove
- Duplicate implementation summaries
- Outdated "COMPLETE" docs
- Step-by-step guides (consolidate)

## Phase 5: Final Verification

1. Run full build
2. Check bundle sizes
3. Test all routes
4. Verify no broken imports
5. Run tests

## Execution Order
1. Remove unused files (safe)
2. Consolidate utilities (careful)
3. Optimize code (test each change)
4. Clean documentation (last)
5. Final verification
