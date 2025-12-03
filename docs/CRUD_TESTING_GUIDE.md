# CRUD Functionality Testing Guide

## Quick Test Checklist

### 🔥 Diary Entries - DELETE Feature
**Location:** Dollhouse → Diary Room

1. **Create a new entry:**
   - Click "Write" button
   - Add some content
   - Save the entry

2. **Test delete:**
   - Open the entry
   - Scroll to bottom
   - Click "🔥 Burn This Secret"
   - Confirm deletion
   - ✅ Entry should disappear from list

3. **Test sample entry protection:**
   - Open a sample entry (if any exist)
   - Try to delete
   - ❌ Should show error: "Sample entries cannot be deleted"

### 📸 Scrapbook Memories - EDIT & DELETE
**Location:** Dollhouse → Scrapbook Room

1. **Create a memory:**
   - Click "Capture Memory"
   - Add photos, text, stickers
   - Save

2. **Test delete:**
   - Click on a memory card
   - Scroll to bottom in detail view
   - Click "🔥 Burn This Memory"
   - Confirm deletion
   - ✅ Memory should disappear

3. **Test edit:**
   - Open a memory
   - Scratch off secrets (if any)
   - Changes should persist

### 💬 Forum Replies - NO RELOAD DELETE
**Location:** Gilded Parlour → Any Thread

1. **Create a reply:**
   - Open any forum thread
   - Post a reply
   - Wait for it to appear

2. **Test delete:**
   - Click delete on your reply
   - Confirm deletion
   - ✅ Reply should disappear WITHOUT page reload
   - ✅ Reply count should update

3. **Test nested replies:**
   - Reply to a reply
   - Delete the nested reply
   - ✅ Should work without reload

### 🎨 Artwork - FIREBASE CRUD
**Location:** Dollhouse → Art Studio

**Note:** This requires Firebase migration. Current version uses localStorage.

1. **Create artwork:**
   - Draw something
   - Save with title
   - ✅ Should save to Firebase

2. **View in gallery:**
   - Navigate to gallery
   - ✅ Should see your artwork

3. **Delete artwork:**
   - Open artwork detail
   - Click delete
   - Confirm
   - ✅ Should remove from Firebase

4. **Archive artwork:**
   - Click archive button
   - ✅ Should move to archive

### 📚 User Stories - ALREADY WORKING
**Location:** Library → Your Stories

1. **Create story:**
   - Click "Write" button
   - Add title, content, genre
   - Publish

2. **Edit story:**
   - Click edit on your story
   - Modify content
   - Save changes

3. **Delete story:**
   - Click delete
   - Confirm
   - ✅ Story removed

## Common Issues & Solutions

### Issue: "Sample entries cannot be deleted"
**Solution:** This is intentional. Create your own entries to test deletion.

### Issue: Forum reply delete causes page reload
**Solution:** This should be fixed. If it still reloads, check that `onReplyDeleted` callback is properly wired.

### Issue: Artwork not persisting
**Solution:** Artwork currently uses localStorage. Firebase migration is optional but recommended.

### Issue: Delete button not showing
**Solution:** Make sure you're the author of the content. Delete buttons only show for your own content.

## Security Tests

### Test 1: Can't delete other users' content
1. Try to delete someone else's forum post
2. ❌ Should not see delete button

### Test 2: Sample data protection
1. Try to delete sample diary entries
2. ❌ Should show error message

### Test 3: Confirmation required
1. Click any delete button
2. ✅ Should show confirmation modal
3. ✅ Should have "Keep It" and "Burn Forever" options

### Test 4: Loading states
1. Click delete and confirm
2. ✅ Button should show "Burning..." during deletion
3. ✅ Button should be disabled during deletion

## Performance Tests

### Test 1: No page reloads
- Delete forum reply → ✅ No reload
- Delete diary entry → ✅ No reload
- Delete scrapbook → ✅ No reload

### Test 2: Immediate UI updates
- After deletion, UI should update immediately
- No need to refresh page manually

### Test 3: Cache invalidation
- Delete an item
- Navigate away and back
- ✅ Deleted item should not reappear

## Deployment Checklist

Before deploying to production:

- [ ] Deploy Firestore rules with artwork collection
- [ ] Deploy Firestore indexes
- [ ] Test all CRUD operations in production
- [ ] Verify security rules work correctly
- [ ] Test with multiple users
- [ ] Check mobile responsiveness of delete buttons
- [ ] Verify confirmation modals work on mobile

## Firebase Deployment Commands

```bash
# Deploy Firestore rules
firebase deploy --only firestore:rules

# Deploy Firestore indexes
firebase deploy --only firestore:indexes

# Deploy everything
firebase deploy
```

## Rollback Plan

If issues occur in production:

1. **Revert Firestore rules:**
   ```bash
   firebase deploy --only firestore:rules
   ```

2. **Disable delete buttons:**
   - Comment out delete button rendering
   - Redeploy frontend

3. **Monitor logs:**
   - Check Firebase console for errors
   - Check browser console for client errors

## Success Criteria

✅ All user-generated content has delete functionality
✅ Confirmation modals prevent accidental deletion
✅ No page reloads required
✅ Sample data is protected
✅ Security rules prevent unauthorized deletion
✅ UI updates immediately after deletion
✅ Loading states provide feedback
✅ Mobile-friendly delete buttons

## Next Steps

After successful testing:

1. **Monitor usage:**
   - Track deletion rates
   - Check for abuse
   - Monitor error rates

2. **Gather feedback:**
   - Ask users about delete UX
   - Check if confirmation is too aggressive
   - See if undo feature is needed

3. **Consider enhancements:**
   - Soft delete with trash
   - Undo within 30 seconds
   - Bulk delete operations
   - Export before delete

## Support

If you encounter issues:
1. Check browser console for errors
2. Verify Firebase rules are deployed
3. Check user authentication status
4. Review Firestore security rules
5. Test with different user accounts
