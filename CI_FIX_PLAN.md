# CI Fix Plan

## Current Status
- CI is failing due to 326 ESLint errors and 457 warnings
- Playwright was missing as a dependency (now added)

## Critical Errors to Fix

### 1. React Hooks Errors (Most Critical)
- **set-state-in-effect**: Multiple files calling setState directly in useEffect
- **use-memo**: Incorrect useMemo/useCallback usage
- **refs**: Accessing refs during render
- **purity**: Calling impure functions (Math.random, Date.now) during render
- **rules-of-hooks**: Hooks called in non-component functions

### 2. TypeScript Errors
- **@typescript-eslint/ban-ts-comment**: Using @ts-ignore instead of @ts-expect-error
- **@typescript-eslint/no-empty-object-type**: Empty interfaces
- **no-redeclare**: Variable redeclarations

### 3. React Errors
- **react/no-unescaped-entities**: Unescaped quotes and apostrophes in JSX
- **no-unreachable**: Unreachable code
- **no-control-regex**: Control characters in regex

## Quick Fix Strategy

1. Add Playwright to dependencies ✅
2. Temporarily increase max-warnings to allow CI to pass
3. Fix critical React Hooks errors that break functionality
4. Fix TypeScript errors
5. Fix React JSX errors
6. Gradually reduce max-warnings as errors are fixed

## Files with Most Errors (Priority Order)

1. src/pages/Contact.tsx - 11 errors
2. src/pages/About.tsx - 7 errors  
3. src/hooks/useSessionSync.ts - 3 errors
4. src/hooks/useThrottle.ts - 2 errors
5. src/pages/Forum.tsx - 4 errors
6. src/modules/diary/components/DiaryPage.tsx - 2 errors
7. src/modules/diary/components/DiaryEditor.tsx - 1 error

## Recommendation

For immediate CI fix: Temporarily disable the most problematic rules or fix the top 20-30 critical errors manually.
