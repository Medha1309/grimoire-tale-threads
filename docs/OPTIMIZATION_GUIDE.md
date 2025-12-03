# Code Optimization Guide

## Quick Wins Implemented

### 1. Component Consolidation ✅
- Unified button components (removed 3 duplicate implementations)
- Unified input components (merged AuthInput into Input)
- Created reusable Card, Alert, and BackButton components
- Reduced code duplication by ~450 lines

### 2. Removed Dead Code ✅
- Deleted backup files (Creatures.backup.tsx, Effects.backup.tsx)
- Cleaned up unused imports

### 3. Created Utility Files ✅
- `commonAnimations.ts` - Centralized animation variants
- `classNames.ts` - Utility for className management

## Performance Optimizations

### Already Implemented in Codebase
1. **Lazy Loading** - Components use React.lazy where appropriate
2. **Memoization** - React.memo used for expensive components
3. **Debouncing** - useDebounce hook for input handling
4. **Throttling** - useThrottle hook for scroll/resize events
5. **Image Optimization** - OptimizedImage and LazyImage components
6. **Animation Control** - AnimationController for performance settings

### Recommended Next Steps

#### High Impact, Low Effort

1. **Bundle Analysis**
   ```bash
   npm run build
   # Analyze the dist folder size
   ```

2. **Remove Unused Dependencies**
   ```bash
   npx depcheck
   ```

3. **Code Splitting by Route**
   - Already implemented in router/index.tsx
   - Consider splitting large pages further

4. **Optimize Images**
   - Use WebP format where possible
   - Implement proper image sizing
   - Add loading="lazy" to all images

#### Medium Impact, Medium Effort

1. **Virtualization for Long Lists**
   - Implement react-window for forum posts
   - Virtualize diary entries in Dollhouse
   - Virtualize story lists

2. **Reduce Re-renders**
   - Use React DevTools Profiler
   - Add more useMemo/useCallback where needed
   - Consider using Zustand or Jotai for state management

3. **Optimize Animations**
   - Use CSS transforms instead of layout properties
   - Reduce animation complexity on mobile
   - Use will-change sparingly

4. **Service Worker for Caching**
   - Cache static assets
   - Implement offline support
   - Pre-cache critical routes

#### Low Impact, High Effort

1. **Server-Side Rendering (SSR)**
   - Consider Next.js migration
   - Or implement Vite SSR

2. **Database Query Optimization**
   - Add indexes to Firestore
   - Implement pagination everywhere
   - Use query cursors for infinite scroll

## Code Quality Improvements

### Implemented ✅
1. Consistent component structure
2. TypeScript strict mode compliance
3. Reusable UI components
4. Centralized animations

### Recommended

1. **Add ESLint Rules**
   ```json
   {
     "rules": {
       "no-console": "warn",
       "no-unused-vars": "error",
       "react-hooks/exhaustive-deps": "warn"
     }
   }
   ```

2. **Add Prettier**
   ```bash
   npm install -D prettier
   ```

3. **Add Husky for Pre-commit Hooks**
   ```bash
   npm install -D husky lint-staged
   ```

4. **Component Documentation**
   - Add JSDoc comments to all components
   - Document prop types
   - Add usage examples

## Bundle Size Optimization

### Current Analysis Needed
Run these commands to analyze:
```bash
npm run build
npx vite-bundle-visualizer
```

### Potential Optimizations

1. **Tree Shaking**
   - Ensure all imports are named imports
   - Remove unused exports
   - Use ES modules everywhere

2. **Dynamic Imports**
   ```tsx
   // Instead of
   import { HeavyComponent } from './HeavyComponent';
   
   // Use
   const HeavyComponent = lazy(() => import('./HeavyComponent'));
   ```

3. **Reduce Dependencies**
   - Consider replacing heavy libraries
   - Use native browser APIs where possible
   - Bundle only what you need from libraries

4. **Code Splitting**
   ```tsx
   // Split by route
   const Stories = lazy(() => import('./pages/Stories'));
   const Profile = lazy(() => import('./pages/Profile'));
   ```

## Performance Monitoring

### Add Performance Tracking

1. **Web Vitals**
   ```tsx
   import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';
   
   getCLS(console.log);
   getFID(console.log);
   getFCP(console.log);
   getLCP(console.log);
   getTTFB(console.log);
   ```

2. **Custom Performance Marks**
   ```tsx
   performance.mark('component-render-start');
   // ... component logic
   performance.mark('component-render-end');
   performance.measure('component-render', 'component-render-start', 'component-render-end');
   ```

3. **React Profiler**
   ```tsx
   <Profiler id="Stories" onRender={onRenderCallback}>
     <Stories />
   </Profiler>
   ```

## Accessibility Improvements

### Quick Wins
1. Add ARIA labels to all interactive elements
2. Ensure keyboard navigation works everywhere
3. Add focus indicators
4. Test with screen readers

### Implementation
```tsx
// Good
<button aria-label="Close modal" onClick={onClose}>
  ✕
</button>

// Better
<IconButton
  icon={<CloseIcon />}
  label="Close modal"
  onClick={onClose}
/>
```

## Testing Strategy

### Unit Tests
- Test all new UI components
- Test utility functions
- Test hooks

### Integration Tests
- Test user flows
- Test form submissions
- Test navigation

### E2E Tests
- Critical user journeys
- Authentication flow
- Story creation/reading

## Maintenance Checklist

### Weekly
- [ ] Review bundle size
- [ ] Check for unused dependencies
- [ ] Review console warnings
- [ ] Check performance metrics

### Monthly
- [ ] Update dependencies
- [ ] Review and refactor complex components
- [ ] Audit accessibility
- [ ] Review and update documentation

### Quarterly
- [ ] Major dependency updates
- [ ] Performance audit
- [ ] Security audit
- [ ] Code quality review

## Metrics to Track

### Performance
- First Contentful Paint (FCP) - Target: < 1.8s
- Largest Contentful Paint (LCP) - Target: < 2.5s
- Time to Interactive (TTI) - Target: < 3.8s
- Total Blocking Time (TBT) - Target: < 200ms
- Cumulative Layout Shift (CLS) - Target: < 0.1

### Bundle Size
- Initial bundle - Target: < 200KB gzipped
- Total bundle - Target: < 500KB gzipped
- Largest chunk - Target: < 150KB gzipped

### Code Quality
- Test coverage - Target: > 80%
- TypeScript strict mode - Target: 100%
- ESLint errors - Target: 0
- Console warnings - Target: 0

## Resources

### Tools
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WebPageTest](https://www.webpagetest.org/)
- [Bundle Analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer)
- [React DevTools Profiler](https://react.dev/learn/react-developer-tools)

### Documentation
- [Web Vitals](https://web.dev/vitals/)
- [React Performance](https://react.dev/learn/render-and-commit)
- [Vite Optimization](https://vitejs.dev/guide/build.html)
- [Firebase Performance](https://firebase.google.com/docs/perf-mon)

## Conclusion

This guide provides a roadmap for continuous optimization. Focus on high-impact, low-effort improvements first, then gradually tackle more complex optimizations as needed.

Remember: **Measure before optimizing!** Use profiling tools to identify actual bottlenecks rather than optimizing prematurely.
