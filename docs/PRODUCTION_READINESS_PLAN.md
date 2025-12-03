# Production Readiness Action Plan

**Goal:** Make Grimoire production-ready in 3-4 weeks  
**Status:** Phase 1 in progress  
**Last Updated:** December 1, 2025

---

## Quick Status Dashboard

```
✅ Type Safety:        PASSING (0 errors)
⚠️  Tests:             63% passing (270/427)
⚠️  Linting:           25+ errors, 100+ warnings
⚠️  Security:          3 vulnerabilities
✅ Build:              Working
⚠️  Performance:       Needs optimization
```

---

## Phase 1: Critical Fixes (Week 1) 🔴

**Goal:** Fix blocking issues for production deployment  
**Time Estimate:** 40-60 hours

### 1.1 Security Vulnerabilities ⚠️

**Priority:** CRITICAL  
**Time:** 8 hours

```bash
# Current vulnerabilities:
# - glob: HIGH (command injection)
# - esbuild: MODERATE (dev server)
# - vite: MODERATE (via esbuild)

# Action items:
1. Update glob to 10.5.0+
2. Evaluate Vite 7 upgrade (breaking changes)
3. Test after upgrades
4. Re-run npm audit
```

**Tasks:**
- [ ] Run `npm audit fix`
- [ ] Manually update packages if needed
- [ ] Test build process
- [ ] Test dev server
- [ ] Verify no regressions
- [ ] Document any breaking changes

**Files to Check:**
- package.json
- vite.config.ts
- Any glob usage in scripts

---

### 1.2 Test Failures ⚠️

**Priority:** CRITICAL  
**Time:** 20 hours

**Current Status:** 157 failing tests (37% failure rate)

#### 1.2.1 Stories.tsx Iteration Error ✅
```
Status: FIXED
Fix Applied: Added Array.isArray() check
Verification: Pending test run
```

#### 1.2.2 React Act Warnings (50+ instances)
```typescript
// Problem: State updates not wrapped in act()
// Example fix:
import { act, waitFor } from '@testing-library/react';

// Before:
fireEvent.click(button);
expect(result).toBe(expected);

// After:
await act(async () => {
  fireEvent.click(button);
});
await waitFor(() => {
  expect(result).toBe(expected);
});
```

**Tasks:**
- [ ] Fix useRoomLighting.test.ts
- [ ] Fix BookmarkSystem.test.tsx
- [ ] Fix ArchiveSystem.test.tsx
- [ ] Fix AuthFlow.test.tsx
- [ ] Update test utilities with act() helpers
- [ ] Run full test suite
- [ ] Achieve >80% pass rate

**Files to Fix:**
- src/hooks/__tests__/useRoomLighting.test.ts
- src/__tests__/integration/BookmarkSystem.test.tsx
- src/__tests__/integration/ArchiveSystem.test.tsx
- src/__tests__/integration/AuthFlow.test.tsx
- src/test/testUtils.tsx (add helpers)

---

### 1.3 ESLint Errors ⚠️

**Priority:** HIGH  
**Time:** 8 hours

#### 1.3.1 React Hooks Purity Violations (15 instances)

**Problem:** Math.random() called during render

```typescript
// ❌ WRONG - Impure function in render
const Spider = () => {
  const config = useMemo(() => {
    const delay = Math.random() * 8 + 1; // ❌ Impure!
    return { delay };
  }, []);
};

// ✅ CORRECT - Move to useState with initializer
const Spider = () => {
  const [config] = useState(() => ({
    delay: Math.random() * 8 + 1, // ✅ Only runs once
  }));
};
```

**Tasks:**
- [ ] Fix Creatures.tsx (5 violations)
- [ ] Fix CrawlingSnakesScene.tsx (3 violations)
- [ ] Fix other components with Math.random()
- [ ] Add ESLint rule documentation
- [ ] Run lint and verify 0 errors

**Files to Fix:**
- src/components/Creatures.tsx
- src/components/CrawlingSnakesScene.tsx

#### 1.3.2 Undefined Globals (3 instances)

```typescript
// ❌ WRONG
if (confirm('Are you sure?')) { // ❌ 'confirm' not defined

// ✅ CORRECT
if (window.confirm('Are you sure?')) { // ✅ Explicit global
```

**Tasks:**
- [ ] Fix CommentsSection.tsx
- [ ] Add window. prefix or create custom modal
- [ ] Update ESLint config if needed

**Files to Fix:**
- src/components/CommentsSection.tsx

#### 1.3.3 Three.js Property Warnings (12 instances)

```typescript
// These are false positives from @react-three/fiber
// Solution: Add ESLint override
```

**Tasks:**
- [ ] Add ESLint override for Three.js components
- [ ] Document in eslint.config.js

**File to Update:**
- eslint.config.js

---

### 1.4 Error Boundaries ⚠️

**Priority:** HIGH  
**Time:** 4 hours

**Current:** One global ErrorBoundary  
**Needed:** Feature-level boundaries

```typescript
// Add error boundaries for:
1. Story reading (prevent crash if story fails to load)
2. Forum (prevent crash if post fails to load)
3. Diary (prevent crash if entry fails to load)
4. Art Studio (prevent crash if canvas fails)
5. Collaborative features (prevent crash if sync fails)
```

**Tasks:**
- [ ] Create FeatureErrorBoundary component
- [ ] Wrap critical features
- [ ] Add error logging
- [ ] Add user-friendly error messages
- [ ] Test error scenarios

**Files to Create/Update:**
- src/components/shared/FeatureErrorBoundary.tsx
- src/pages/Stories.tsx
- src/pages/Forum.tsx
- src/pages/Dollhouse.tsx
- src/components/diary/ArtStudioView.tsx

---

### 1.5 Error Monitoring ⚠️

**Priority:** HIGH  
**Time:** 8 hours

**Options:**
1. Sentry (recommended)
2. LogRocket
3. Firebase Crashlytics

**Tasks:**
- [ ] Choose monitoring service
- [ ] Set up account
- [ ] Install SDK
- [ ] Configure error tracking
- [ ] Add source maps
- [ ] Test error reporting
- [ ] Set up alerts
- [ ] Document for team

**Files to Create/Update:**
- src/utils/monitoring.ts
- src/main.tsx (initialize)
- vite.config.ts (source maps)
- .env.example (add keys)

---

## Phase 2: Performance Optimization (Week 2) 🟡

**Goal:** Improve load time and runtime performance  
**Time Estimate:** 40 hours

### 2.1 Code Splitting

**Current:** Single bundle  
**Target:** Route-based + component-based splitting

```typescript
// Implement lazy loading
const Stories = lazy(() => import('./pages/Stories'));
const Forum = lazy(() => import('./pages/Forum'));
const Dollhouse = lazy(() => import('./pages/Dollhouse'));
const ArtStudio = lazy(() => import('./components/diary/ArtStudioView'));
```

**Tasks:**
- [ ] Implement route-based splitting
- [ ] Lazy load Three.js components
- [ ] Lazy load heavy features
- [ ] Add loading fallbacks
- [ ] Measure bundle sizes
- [ ] Target <500KB initial bundle

**Files to Update:**
- src/router/index.tsx
- src/pages/*.tsx
- src/components/diary/ArtStudioView.tsx

---

### 2.2 Animation Optimization

**Current:** Multiple concurrent animations  
**Target:** Adaptive rendering based on device

```typescript
// Implement performance tiers
const performanceLevel = detectPerformanceLevel();

if (performanceLevel === 'low') {
  // Disable heavy animations
  disableSpiders();
  disableParticles();
  reduceAnimationFrameRate();
}
```

**Tasks:**
- [ ] Implement performance detection
- [ ] Create animation tiers (low/medium/high)
- [ ] Add user preference toggle
- [ ] Reduce animation count on mobile
- [ ] Use CSS animations where possible
- [ ] Implement requestIdleCallback for non-critical animations

**Files to Update:**
- src/utils/deviceDetection.ts
- src/utils/AnimationController.ts
- src/components/Creatures.tsx
- src/components/Effects.tsx

---

### 2.3 List Virtualization

**Current:** All items rendered  
**Target:** Virtual scrolling for large lists

```typescript
// Use react-window or react-virtual
import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={600}
  itemCount={stories.length}
  itemSize={200}
>
  {StoryCard}
</FixedSizeList>
```

**Tasks:**
- [ ] Install react-window
- [ ] Virtualize story list
- [ ] Virtualize forum posts
- [ ] Virtualize diary entries
- [ ] Test scroll performance

**Files to Update:**
- src/components/library/StoryGrid.tsx
- src/components/forum/ForumList.tsx
- src/components/diary/DiaryGrid.tsx

---

### 2.4 Image Optimization

**Tasks:**
- [ ] Compress existing images
- [ ] Convert to WebP
- [ ] Add responsive images
- [ ] Implement lazy loading
- [ ] Add blur placeholders
- [ ] Use CDN for images

**Files to Update:**
- src/components/shared/OptimizedImage.tsx
- public/* (compress images)

---

## Phase 3: Testing & Quality (Week 3) 🟡

**Goal:** Achieve 80%+ test coverage and fix all failures  
**Time Estimate:** 30 hours

### 3.1 Fix All Test Failures

**Tasks:**
- [ ] Run tests and document all failures
- [ ] Fix integration test failures
- [ ] Fix component test failures
- [ ] Fix hook test failures
- [ ] Achieve 0 failing tests

### 3.2 Add Missing Tests

**Priority Areas:**
- [ ] Error scenarios
- [ ] Edge cases
- [ ] User flows
- [ ] Accessibility

### 3.3 E2E Tests

**Tasks:**
- [ ] Set up Playwright or Cypress
- [ ] Write smoke tests
- [ ] Test critical user flows
- [ ] Add to CI/CD

---

## Phase 4: Mobile & Accessibility (Week 3-4) 🟡

**Goal:** Ensure mobile usability and accessibility  
**Time Estimate:** 30 hours

### 4.1 Mobile Testing

**Tasks:**
- [ ] Test on iOS Safari
- [ ] Test on Android Chrome
- [ ] Fix responsive issues
- [ ] Optimize touch interactions
- [ ] Reduce mobile bundle
- [ ] Test offline behavior

### 4.2 Accessibility Audit

**Tasks:**
- [ ] Run Lighthouse audit
- [ ] Fix color contrast issues
- [ ] Add ARIA labels
- [ ] Test keyboard navigation
- [ ] Test screen reader
- [ ] Achieve WCAG 2.1 AA

---

## Phase 5: Documentation & DevOps (Week 4) 🟢

**Goal:** Complete deployment setup and documentation  
**Time Estimate:** 20 hours

### 5.1 Deployment Setup

**Tasks:**
- [ ] Set up CI/CD pipeline
- [ ] Configure staging environment
- [ ] Set up CDN
- [ ] Configure Firebase hosting
- [ ] Set up automated backups
- [ ] Create deployment checklist

### 5.2 Documentation

**Tasks:**
- [ ] Update README
- [ ] Create deployment guide
- [ ] Document environment variables
- [ ] Create troubleshooting guide
- [ ] Add architecture diagrams

---

## Daily Checklist

### Every Day:
- [ ] Run `npm run type-check`
- [ ] Run `npm run lint`
- [ ] Run `npm test`
- [ ] Check for new security vulnerabilities
- [ ] Review error logs
- [ ] Update this document

### Before Each Commit:
- [ ] Tests pass
- [ ] No lint errors
- [ ] No type errors
- [ ] Code reviewed

### Before Deployment:
- [ ] All tests pass
- [ ] No security vulnerabilities
- [ ] Performance benchmarks met
- [ ] Accessibility audit passed
- [ ] Mobile tested
- [ ] Staging tested
- [ ] Backup created

---

## Success Metrics

### Week 1 Targets:
- ✅ 0 security vulnerabilities
- ✅ 0 ESLint errors
- ✅ 80%+ tests passing
- ✅ Error monitoring active

### Week 2 Targets:
- ✅ <500KB initial bundle
- ✅ <3s load time
- ✅ 60fps animations
- ✅ Lighthouse score >80

### Week 3 Targets:
- ✅ 100% tests passing
- ✅ Mobile responsive
- ✅ WCAG 2.1 AA compliant

### Week 4 Targets:
- ✅ CI/CD pipeline active
- ✅ Staging environment live
- ✅ Documentation complete
- ✅ Ready for production

---

## Resources

### Tools:
- ESLint: Code quality
- TypeScript: Type safety
- Vitest: Testing
- Lighthouse: Performance & accessibility
- Sentry: Error monitoring
- Bundlephobia: Bundle size analysis

### Documentation:
- React Best Practices: https://react.dev/learn
- Firebase Security: https://firebase.google.com/docs/rules
- Web Vitals: https://web.dev/vitals/
- WCAG Guidelines: https://www.w3.org/WAI/WCAG21/quickref/

---

## Notes

### Completed:
- ✅ Created centralized utilities
- ✅ Standardized error handling
- ✅ Firebase service layer
- ✅ Test utilities
- ✅ Design system tokens
- ✅ Costume switcher for Kiroween
- ✅ About page redesign
- ✅ Fixed Stories.tsx iteration error

### In Progress:
- ⏳ Fixing test failures
- ⏳ Fixing ESLint errors
- ⏳ Security vulnerability fixes

### Blocked:
- None currently

---

**Last Updated:** December 1, 2025  
**Next Review:** After Phase 1 completion
