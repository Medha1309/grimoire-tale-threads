# Troubleshooting Guide

## ✅ Issue Resolved: Page Not Loading

### What Was the Problem?
After the optimization refactoring, the page wasn't loading due to React.memo syntax issues.

### What Was Fixed?
1. **Proper React.memo pattern**: Changed from inline memo to separate component + memo wrapper
2. **Display names added**: All memoized components now have proper display names
3. **Dev server restarted**: Cleared any cached errors

### Files Fixed:
- `src/components/Navbar.tsx`
- `src/components/Footer.tsx`
- `src/pages/Landing.tsx`

---

## 🚀 Current Status

✅ Dev server running on http://localhost:5173/  
✅ No compilation errors  
✅ All components properly memoized  
✅ Page loading correctly  

---

## Common Issues & Solutions

### 1. Page Not Loading / Blank Screen

**Symptoms:**
- Browser shows blank page
- Console shows React errors
- Components not rendering

**Solutions:**
```bash
# Clear cache and restart
rm -rf node_modules/.vite
npm run dev
```

### 2. Build Errors

**Symptoms:**
- `npm run build` fails
- Terser or Babel errors

**Solutions:**
- Check `vite.config.ts` - should use `esbuild` minification
- Ensure no optional dependencies are missing
- Run `npm install` to ensure all deps are installed

### 3. HMR (Hot Module Replacement) Not Working

**Symptoms:**
- Changes not reflecting in browser
- Need to manually refresh

**Solutions:**
```bash
# Restart dev server
# Stop current process (Ctrl+C)
npm run dev
```

### 4. TypeScript Errors

**Symptoms:**
- Red squiggly lines in IDE
- Type errors in console

**Solutions:**
```bash
# Check for errors
npx tsc --noEmit

# If errors persist, restart TypeScript server in your IDE
```

### 5. React.memo Display Name Warnings

**Symptoms:**
- Console warnings about display names
- React DevTools shows `<Anonymous>` components

**Solution:**
Always add display names to memoized components:
```tsx
const MyComponent: React.FC = () => {
  return <div>Content</div>;
};

export const MyComponent = React.memo(MyComponentInternal);
MyComponent.displayName = 'MyComponent';
```

### 6. Performance Issues

**Symptoms:**
- Slow page load
- Low FPS
- Laggy animations

**Solutions:**
1. Check device capabilities in console
2. Reduce particle counts in `src/config/performance.ts`
3. Disable complex effects for testing
4. Check browser DevTools Performance tab

### 7. Firebase Connection Issues

**Symptoms:**
- Auth not working
- Firestore queries failing
- Console shows Firebase errors

**Solutions:**
1. Check `.env` file has correct Firebase config
2. Verify Firebase project is active
3. Check Firestore rules allow read/write
4. Ensure Firebase SDK is initialized in `src/lib/firebase.ts`

### 8. Router Issues

**Symptoms:**
- 404 errors on refresh
- Routes not working
- Navigation broken

**Solutions:**
1. Check `src/config/routes.ts` for correct paths
2. Verify `src/router/index.tsx` has all routes defined
3. For production, ensure server has proper redirect rules

---

## Quick Fixes

### Clear Everything and Start Fresh
```bash
# Stop dev server (Ctrl+C)

# Clear caches
rm -rf node_modules/.vite
rm -rf dist

# Reinstall (if needed)
rm -rf node_modules
npm install

# Restart
npm run dev
```

### Check for Errors
```bash
# TypeScript errors
npx tsc --noEmit

# ESLint errors (if configured)
npx eslint src/

# Build test
npm run build
```

### Performance Check
```bash
# Build and analyze
npm run build
ls -lh dist/assets/

# Preview production build
npm run preview
```

---

## Development Workflow

### Starting Development
```bash
npm run dev
# Open http://localhost:5173/
```

### Making Changes
1. Edit files in `src/`
2. Save - HMR will update automatically
3. Check browser console for errors
4. Test functionality

### Before Committing
```bash
# Check for errors
npx tsc --noEmit

# Test build
npm run build

# Preview
npm run preview
```

### Deploying
```bash
# Build for production
npm run build

# Test production build locally
npm run preview

# Deploy dist/ folder to your hosting
```

---

## Browser Console Commands

### Check Performance Config
```javascript
// In browser console
import { getCachedPerformanceConfig } from './src/config/performance';
console.log(getCachedPerformanceConfig());
```

### Check Device Capabilities
```javascript
// In browser console
console.log({
  cores: navigator.hardwareConcurrency,
  memory: navigator.deviceMemory,
  connection: navigator.connection?.effectiveType
});
```

### Monitor FPS
```javascript
// In browser console
let lastTime = performance.now();
let frames = 0;

function checkFPS() {
  frames++;
  const now = performance.now();
  if (now >= lastTime + 1000) {
    console.log(`FPS: ${frames}`);
    frames = 0;
    lastTime = now;
  }
  requestAnimationFrame(checkFPS);
}

checkFPS();
```

---

## Getting Help

### Check Documentation
1. `PERFORMANCE_QUICK_START.md` - Quick start guide
2. `OPTIMIZATION_COMPLETE.md` - Complete documentation
3. `BUILD_ANALYSIS.md` - Build analysis

### Debug Steps
1. Check browser console for errors
2. Check terminal for build errors
3. Verify all files are saved
4. Restart dev server
5. Clear browser cache
6. Try incognito/private mode

### Still Having Issues?
1. Check if issue exists in production build (`npm run build && npm run preview`)
2. Test on different browser
3. Check if issue is device-specific
4. Review recent changes in git

---

## ✅ Verification Checklist

After fixing any issue, verify:

- [ ] Dev server starts without errors
- [ ] Page loads in browser
- [ ] No console errors
- [ ] Navigation works
- [ ] Animations are smooth
- [ ] Build completes successfully
- [ ] Production preview works

---

**Last Updated**: November 12, 2025  
**Status**: ✅ All Issues Resolved
