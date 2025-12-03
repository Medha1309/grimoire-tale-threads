# Integration Testing Guide

## Quick Start Testing

### 1. Start the Development Server
```bash
npm run dev
```

### 2. Test Core Navigation Flow
1. Visit `http://localhost:5173`
2. Click through: Landing → Stories → About → Contact
3. Verify no console errors
4. Check that all pages load correctly

### 3. Test Authentication Flow
1. Click "Sign Up" in navigation
2. Create a test account
3. Verify redirect to Stories page
4. Check that protected routes are accessible
5. Log out and verify redirect

### 4. Test Library Features
1. Navigate to Stories page
2. Test search functionality
3. Test genre filters
4. Click on a story card
5. Verify story detail page loads
6. Click "Read" button
7. Test bookmark functionality
8. Test quote selection in reader

### 5. Test Forum Features
1. Navigate to Forum (requires login)
2. Create a new post
3. Test like/candle functionality
4. Add a reply to a post
5. Test filtering and sorting

### 6. Test Dollhouse/Diary Features
1. Navigate to Dollhouse (requires login)
2. Create a new diary entry
3. Test archive doors
4. Test scrapbook functionality
5. Test art studio
6. Verify all rooms are accessible

### 7. Test Social Features
1. Navigate to Profile
2. View user stats
3. Test following system
4. Check notifications
5. Visit another user's profile
6. Test MySpace profile customization

### 8. Test Collaborative Features
1. Navigate to Tale Threads
2. Create a collaborative project
3. Test proposal system
4. Test voting functionality
5. Join a reflection session
6. Test live cursors and presence

### 9. Test Scrapbook System
1. Navigate to Scrapbook
2. Create a new collection
3. Add items to collection
4. Test masonry layout
5. Test item connections
6. Test detail view

### 10. Test Retro Features
1. Navigate to Desktop
2. Test Windows 98 interface
3. Open various windows
4. Test taskbar and start menu
5. Navigate to RetroHub
6. Test retro navigation

## Feature-Specific Tests

### Bookmarks
- [ ] Add bookmark from Stories page
- [ ] Add bookmark from Story Detail page
- [ ] Add bookmark from Reader
- [ ] View bookmarks in Dollhouse
- [ ] Remove bookmark
- [ ] Verify persistence across page reloads

### Reading History
- [ ] Read a story
- [ ] Check reading history in archive
- [ ] Verify progress tracking
- [ ] Test "Continue Reading" functionality

### Saved Quotes
- [ ] Select text in reader
- [ ] Save a quote
- [ ] View saved quotes in library
- [ ] Delete a quote
- [ ] Verify Firestore persistence

### Archive System
- [ ] Create diary entries
- [ ] View diary archive
- [ ] Create scrapbook entries
- [ ] View scrapbook archive
- [ ] Read stories
- [ ] View reading archive

### Custom Cursors
- [ ] Verify cursor on Stories page
- [ ] Verify cursor on Forum page
- [ ] Verify cursor on Dollhouse page
- [ ] Verify cursor on About page
- [ ] Verify cursor on Contact page
- [ ] Verify cursor on Scrapbook page
- [ ] Verify cursor on Tale Threads page

### Performance
- [ ] Check page load times
- [ ] Verify animations are smooth
- [ ] Test on mobile device
- [ ] Check bundle size
- [ ] Verify lazy loading works

### Accessibility
- [ ] Test keyboard navigation (Alt+H, Alt+B, Alt+L, Alt+F, Alt+D)
- [ ] Test skip link (Tab on page load)
- [ ] Test focus management
- [ ] Verify ARIA labels
- [ ] Test with screen reader (optional)

## Automated Testing

### Run All Tests
```bash
npm run test:run
```

### Run Specific Test Suite
```bash
npm run test -- src/__tests__/integration/FullAppIntegration.test.tsx
```

### Run Tests in Watch Mode
```bash
npm run test
```

### Run Tests with UI
```bash
npm run test:ui
```

## Build Testing

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Analyze Bundle
```bash
npm run build:analyze
```

## Common Issues & Solutions

### Issue: Stories page shows "undefined" error
**Solution**: Fixed - null check added for allStories array

### Issue: StickerPicker TypeScript error
**Solution**: Fixed - added label property to STICKER_LIBRARY

### Issue: Firebase not initialized
**Solution**: Check .env file has correct Firebase config

### Issue: Protected routes redirect to login
**Solution**: Ensure user is logged in and auth state is loaded

### Issue: Animations not working
**Solution**: Check that framer-motion is installed and imported

### Issue: Custom cursor not showing
**Solution**: Verify cursor component is imported in page

## Performance Benchmarks

### Target Metrics
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- First Input Delay: < 100ms

### Bundle Size Targets
- Main bundle: < 150 KB
- Total initial load: < 500 KB
- Lazy-loaded chunks: < 200 KB each

## Browser Testing Matrix

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | Latest | ✅ |
| Firefox | Latest | ✅ |
| Safari | Latest | ✅ |
| Edge | Latest | ✅ |
| Mobile Chrome | Latest | ✅ |
| Mobile Safari | Latest | ✅ |

## Deployment Checklist

- [ ] All tests passing
- [ ] TypeScript compilation successful
- [ ] Production build successful
- [ ] Environment variables configured
- [ ] Firebase rules deployed
- [ ] Firestore indexes created
- [ ] Security rules tested
- [ ] Performance optimized
- [ ] Accessibility verified
- [ ] Mobile responsive
- [ ] Cross-browser tested
- [ ] Error tracking configured
- [ ] Analytics configured

## Monitoring After Deployment

### Key Metrics to Track
1. Error rate
2. Page load times
3. User engagement
4. Feature usage
5. Conversion rates
6. API response times
7. Database query performance
8. Storage usage

### Tools
- Firebase Analytics
- Firebase Performance Monitoring
- Firebase Crashlytics
- Google Lighthouse
- WebPageTest
- Chrome DevTools

## Support & Documentation

### Key Documentation Files
- `docs/INTEGRATION_VERIFICATION_COMPLETE.md` - Full integration report
- `docs/QUICK_START.md` - Getting started guide
- `docs/ARCHITECTURE.md` - System architecture
- `docs/SECURITY_QUICK_START.md` - Security implementation
- `docs/PERFORMANCE_QUICK_REFERENCE.md` - Performance optimization

### Getting Help
1. Check documentation in `/docs` folder
2. Review test files in `src/__tests__`
3. Check component comments and JSDoc
4. Review error messages in console
5. Check Firebase console for backend issues

---

**Last Updated**: December 1, 2025
**Status**: ✅ All integrations verified and working
