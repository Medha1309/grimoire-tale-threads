# Error Handling Migration Plan

## Files Created

### Core Utilities
- ✅ `src/utils/messages.ts` - Enhanced with comprehensive message constants
- ✅ `src/utils/errorHandler.ts` - Enhanced with logging and error handling functions
- ✅ `src/utils/notifications.ts` - New centralized notification system
- ✅ `src/hooks/useToast.ts` - Updated to integrate with notification system

### Documentation
- ✅ `docs/ERROR_HANDLING_GUIDE.md` - Comprehensive guide
- ✅ `src/utils/errorHandlingExamples.ts` - Code examples

## Migration Steps

### Phase 1: Update Imports (All Files)

Replace:
```typescript
// Old
console.error('Error:', error);
```

With:
```typescript
// New
import { handleError, logError } from '@/utils/errorHandler';
import { notify } from '@/utils/notifications';
import { MESSAGES } from '@/utils/messages';

logError('contextName', error);
// or
const errorMessage = handleError(error, 'contextName');
notify.error(errorMessage);
```

### Phase 2: Files to Update

#### High Priority (User-Facing)

1. **Authentication Pages**
   - `src/pages/Login.tsx`
   - `src/pages/SignUp.tsx`
   - `src/contexts/AuthContext.tsx`
   - Replace: `console.error` → `handleError` + `notify`
   - Use: `MESSAGES.AUTH.*`

2. **Contact Page**
   - ✅ `src/pages/Contact.tsx` - UPDATED
   - Replace: `alert()` → `notify.error()`
   - Use: `MESSAGES.CONTACT.*`

3. **Forum/Parlour**
   - ✅ `src/pages/Forum.tsx` - UPDATED (partial)
   - `src/components/forum/ThreadView.tsx`
   - `src/components/forum/PostView.tsx`
   - `src/components/forum/ReplySection.tsx`
   - `src/hooks/useForumPosts.ts`
   - `src/hooks/useForumPost.ts`
   - `src/hooks/useForumLikes.ts`
   - Use: `MESSAGES.FORUM.*`

4. **Stories/Library**
   - `src/pages/Stories.tsx`
   - `src/pages/StoryDetail.tsx`
   - `src/components/library/StoryCard.tsx`
   - `src/components/library/NovelWritingEditor.tsx`
   - `src/components/library/EnhancedNovelEditor.tsx`
   - `src/hooks/useStories.ts`
   - `src/hooks/useUserStories.ts`
   - `src/hooks/useStoryInteractions.ts`
   - `src/hooks/useBookmarkManager.ts`
   - Use: `MESSAGES.STORIES.*`

5. **Diary/Dollhouse**
   - `src/pages/Dollhouse.tsx`
   - `src/components/diary/DiaryEntryView.tsx`
   - `src/components/diary/EnhancedDiaryEditor.tsx`
   - `src/components/diary/CreateConfessionModal.tsx`
   - `src/components/diary/MemoryScrapbook.tsx`
   - `src/hooks/useDiaryEntry.ts`
   - `src/hooks/useDiaryEntries.ts`
   - `src/hooks/useArchive.ts`
   - Use: `MESSAGES.DIARY.*` and `MESSAGES.SCRAPBOOK.*`

6. **Art Studio**
   - `src/components/art/ArtStudioEditor.tsx`
   - `src/components/art/ShareArtworkModal.tsx`
   - `src/hooks/useArtwork.ts`
   - Use: `MESSAGES.ART.*`

7. **Profile**
   - `src/pages/Profile.tsx`
   - `src/pages/UserProfile.tsx`
   - Use: `MESSAGES.PROFILE.*`

8. **Social Features**
   - `src/hooks/useFollowing.ts`
   - `src/hooks/useNotifications.ts`
   - `src/components/social/FollowButton.tsx`
   - Use: `MESSAGES.SOCIAL.*`

#### Medium Priority (Admin)

9. **Admin Pages**
   - `src/pages/Admin.tsx`
   - `src/pages/AdminDashboard.tsx`
   - `src/pages/admin/UserManagementTab.tsx`
   - `src/pages/admin/ContentModerationTab.tsx`
   - `src/pages/admin/MessagesTab.tsx`
   - `src/pages/admin/AuditLogsTab.tsx`
   - `src/hooks/useAdminActions.ts`
   - Use: `MESSAGES.ADMIN.*`

#### Low Priority (Utilities)

10. **Utility Files**
    - `src/utils/dataExport.ts`
    - `src/utils/seedForumData.ts`
    - `src/utils/populateMockData.ts`
    - `src/utils/verifyMockData.ts`
    - `src/utils/scrapbookHelpers.ts`
    - `src/utils/adminLogger.ts`
    - `src/utils/adminSetup.ts`
    - Replace: `console.error` → `logError`

### Phase 3: Pattern Replacements

#### Pattern 1: Basic Error Logging
```typescript
// Before
catch (error) {
  console.error('Error doing something:', error);
}

// After
catch (error) {
  logError('ComponentName.functionName', error);
}
```

#### Pattern 2: Error with User Notification
```typescript
// Before
catch (error) {
  console.error('Error saving:', error);
  alert('Failed to save');
}

// After
catch (error) {
  const errorMessage = handleError(error, 'ComponentName.save');
  notify.error(errorMessage);
}
```

#### Pattern 3: Success + Error Handling
```typescript
// Before
try {
  await saveData();
  alert('Saved!');
} catch (error) {
  console.error('Error:', error);
  alert('Failed');
}

// After
try {
  await saveData();
  notify.success(MESSAGES.STORIES.SAVE_SUCCESS);
} catch (error) {
  const errorMessage = handleError(error, 'save');
  notify.error(errorMessage);
}
```

#### Pattern 4: Loading States
```typescript
// Before
try {
  setLoading(true);
  const data = await fetchData();
  setData(data);
} catch (error) {
  console.error('Error:', error);
} finally {
  setLoading(false);
}

// After
try {
  setLoading(true);
  const data = await fetchData();
  setData(data);
} catch (error) {
  const errorMessage = handleError(error, 'loadData');
  notify.error(errorMessage);
} finally {
  setLoading(false);
}
```

### Phase 4: Testing

After updating each file:

1. Test success scenarios
2. Test error scenarios (network errors, permission errors, etc.)
3. Verify toast notifications appear correctly
4. Check console for proper error logging
5. Ensure no `alert()` or raw `console.error` remain

### Phase 5: Cleanup

1. Search for remaining `console.error` in src/
2. Search for remaining `alert(` in src/
3. Search for hardcoded error messages
4. Update tests to use new patterns

## Quick Find & Replace

### VS Code Regex Searches

1. Find `console.error` calls:
   ```
   console\.error\(
   ```

2. Find `alert` calls:
   ```
   alert\(
   ```

3. Find hardcoded error messages:
   ```
   ['"]Failed to.*['"]
   ```

4. Find hardcoded success messages:
   ```
   ['"].*successfully['"]
   ```

## Verification Checklist

- [ ] No `console.error` in user-facing code
- [ ] No `alert()` calls
- [ ] All error messages use `MESSAGES` constants
- [ ] All async operations have try-catch
- [ ] All user actions show success/error feedback
- [ ] Loading states properly managed
- [ ] Error logging includes context
- [ ] Tests updated for new patterns

## Benefits After Migration

1. **Consistency** - All errors handled the same way
2. **User Experience** - Better error messages
3. **Debugging** - Structured error logging
4. **Maintenance** - Easy to update messages
5. **Testing** - Easier to test error scenarios
6. **Monitoring** - Ready for error tracking services

## Next Steps

1. Start with high-priority files
2. Update one feature area at a time
3. Test thoroughly after each update
4. Document any issues or edge cases
5. Update this document as you progress
