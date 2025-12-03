# Error Handling & Notification Guide

## Overview

This guide establishes standardized patterns for error handling and user notifications across the entire application. Consistent error handling improves user experience and makes debugging easier.

## Core Principles

1. **Always use standardized messages** from `MESSAGES` constant
2. **Always log errors** using the error handler utilities
3. **Always show user feedback** for user-initiated actions
4. **Never show raw error messages** to users
5. **Be specific** - use context-appropriate messages

## Quick Reference

### Import What You Need

```typescript
// For error handling
import { handleError, withErrorHandling, logError } from '@/utils/errorHandler';

// For notifications
import { notify } from '@/utils/notifications';

// For message constants
import { MESSAGES } from '@/utils/messages';
```

### Common Patterns

#### 1. Save Operation

```typescript
try {
  await saveData(data);
  notify.success(MESSAGES.STORIES.SAVE_SUCCESS);
} catch (error) {
  const errorMessage = handleError(error, 'saveOperation');
  notify.error(errorMessage);
}
```

#### 2. Delete Operation

```typescript
try {
  await deleteItem(id);
  notify.deleted('Story');
} catch (error) {
  const errorMessage = handleError(error, 'deleteOperation');
  notify.error(errorMessage);
}
```

#### 3. Load Data

```typescript
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

#### 4. Form Submission

```typescript
// Validation
if (!formData.email) {
  notify.error(MESSAGES.CONTACT.REQUIRED_FIELDS);
  return;
}

try {
  await submitForm(formData);
  notify.success(MESSAGES.CONTACT.SEND_SUCCESS);
} catch (error) {
  const errorMessage = handleError(error, 'formSubmission');
  notify.error(errorMessage);
}
```

## Message Categories

### Authentication Messages

```typescript
MESSAGES.AUTH.LOGIN_SUCCESS
MESSAGES.AUTH.LOGIN_ERROR
MESSAGES.AUTH.SIGNUP_SUCCESS
MESSAGES.AUTH.LOGOUT_SUCCESS
MESSAGES.AUTH.UNAUTHORIZED
```

### Story/Library Messages

```typescript
MESSAGES.STORIES.SAVE_SUCCESS
MESSAGES.STORIES.SAVE_ERROR
MESSAGES.STORIES.DELETE_SUCCESS
MESSAGES.STORIES.BOOKMARK_ADDED
MESSAGES.STORIES.LIKE_SUCCESS
```

### Forum/Parlour Messages

```typescript
MESSAGES.FORUM.POST_SUCCESS
MESSAGES.FORUM.REPLY_SUCCESS
MESSAGES.FORUM.DELETE_SUCCESS
MESSAGES.FORUM.LIKE_SUCCESS
```

### Diary/Dollhouse Messages

```typescript
MESSAGES.DIARY.SAVE_SUCCESS
MESSAGES.DIARY.DELETE_SUCCESS
MESSAGES.DIARY.UNLOCK_SUCCESS
```

### General Messages

```typescript
MESSAGES.GENERAL.ERROR
MESSAGES.GENERAL.NETWORK_ERROR
MESSAGES.GENERAL.PERMISSION_DENIED
MESSAGES.GENERAL.NOT_FOUND
```

## Notification Methods

### Basic Notifications

```typescript
notify.success('Operation completed');
notify.error('Operation failed');
notify.info('Information message');
notify.warning('Warning message');
```

### Convenience Methods

```typescript
notify.saved('Story');           // "Story saved successfully"
notify.deleted('Entry');         // "Entry deleted successfully"
notify.updated('Profile');       // "Profile updated successfully"
notify.saveFailed('Story');      // "Failed to save story"
notify.loadFailed('posts');      // "Failed to load posts"
notify.networkError();           // Network error message
notify.permissionDenied();       // Permission denied message
notify.unauthorized();           // Unauthorized message
```

### With Action Button

```typescript
notify.success('Story deleted', {
  action: {
    label: 'Undo',
    onClick: () => restoreStory()
  }
});
```

## Error Handler Functions

### handleError

General purpose error handler:

```typescript
const errorMessage = handleError(
  error,
  'contextName',
  'Optional fallback message'
);
```

### withErrorHandling

Async wrapper with automatic error handling:

```typescript
const { data, error } = await withErrorHandling(
  async () => await someOperation(),
  'contextName',
  {
    fallbackMessage: 'Custom error message',
    onError: (err) => {
      // Additional error handling
    },
    rethrow: false // Set to true to re-throw error
  }
);

if (error) {
  notify.error(error);
  return;
}

// Use data
```

### logError

Silent error logging (no user notification):

```typescript
logError('contextName', error, {
  additionalInfo: 'value',
  userId: user.id
});
```

## Component Integration

### Using in Components

```typescript
import { useToast } from '@/hooks/useToast';
import { handleError } from '@/utils/errorHandler';
import { MESSAGES } from '@/utils/messages';

function MyComponent() {
  const { showSuccess, showError } = useToast();

  const handleSave = async () => {
    try {
      await saveData();
      showSuccess(MESSAGES.STORIES.SAVE_SUCCESS);
    } catch (error) {
      const errorMessage = handleError(error, 'MyComponent.handleSave');
      showError(errorMessage);
    }
  };

  return <button onClick={handleSave}>Save</button>;
}
```

### Using Global Notifications

```typescript
import { notify } from '@/utils/notifications';
import { MESSAGES } from '@/utils/messages';

// Can be called from anywhere, even outside components
async function saveStory(story: Story) {
  try {
    await api.saveStory(story);
    notify.success(MESSAGES.STORIES.SAVE_SUCCESS);
  } catch (error) {
    notify.error(MESSAGES.STORIES.SAVE_ERROR);
  }
}
```

## Best Practices

### ✅ DO

- Use message constants from `MESSAGES`
- Log all errors with context
- Show user feedback for all user actions
- Use specific error messages when possible
- Handle loading and error states in UI
- Use try-catch-finally for cleanup

### ❌ DON'T

- Show raw error messages to users
- Use `console.error` directly (use `logError` instead)
- Ignore errors silently (unless intentional)
- Use generic "Error" messages when specific ones exist
- Forget to set loading states back to false
- Use `alert()` for error messages

## Migration Checklist

When updating existing code:

1. Replace `console.error` with `logError` or `handleError`
2. Replace hardcoded error messages with `MESSAGES` constants
3. Replace `alert()` with `notify` methods
4. Add proper error handling to all async operations
5. Ensure all user actions have success/error feedback
6. Add loading states where missing
7. Test error scenarios

## Examples by Feature

### Authentication

```typescript
// Login
try {
  await signIn(email, password);
  notify.success(MESSAGES.AUTH.LOGIN_SUCCESS);
  navigate('/stories');
} catch (error) {
  const errorMessage = handleError(error, 'login');
  notify.error(errorMessage);
}
```

### Forum Posts

```typescript
// Create post
try {
  await createPost(postData);
  notify.success(MESSAGES.FORUM.POST_SUCCESS);
} catch (error) {
  const errorMessage = handleError(error, 'createPost');
  notify.error(errorMessage);
}

// Like post
try {
  await toggleLike(postId);
  notify.success(MESSAGES.FORUM.LIKE_SUCCESS);
} catch (error) {
  notify.error(MESSAGES.FORUM.LIKE_ERROR);
}
```

### Diary Entries

```typescript
// Save entry
try {
  await saveDiaryEntry(entry);
  notify.success(MESSAGES.DIARY.SAVE_SUCCESS);
} catch (error) {
  const errorMessage = handleError(error, 'saveDiaryEntry');
  notify.error(errorMessage);
}

// Unlock entry
try {
  const unlocked = await unlockEntry(entryId, password);
  if (unlocked) {
    notify.success(MESSAGES.DIARY.UNLOCK_SUCCESS);
  } else {
    notify.error(MESSAGES.DIARY.UNLOCK_ERROR);
  }
} catch (error) {
  notify.error(MESSAGES.DIARY.UNLOCK_ERROR);
}
```

### Bookmarks

```typescript
// Toggle bookmark
try {
  const isBookmarked = await toggleBookmark(storyId);
  notify.success(
    isBookmarked 
      ? MESSAGES.STORIES.BOOKMARK_ADDED 
      : MESSAGES.STORIES.BOOKMARK_REMOVED
  );
} catch (error) {
  notify.error(MESSAGES.STORIES.BOOKMARK_ERROR);
}
```

## Testing Error Handling

### Test Error Scenarios

```typescript
// Test network error
it('handles network errors', async () => {
  // Mock network failure
  jest.spyOn(api, 'saveStory').mockRejectedValue(new Error('Network error'));
  
  await saveStory(mockStory);
  
  expect(notify.error).toHaveBeenCalledWith(MESSAGES.GENERAL.NETWORK_ERROR);
});

// Test permission error
it('handles permission errors', async () => {
  const error = { code: 'permission-denied' };
  jest.spyOn(api, 'deletePost').mockRejectedValue(error);
  
  await deletePost(postId);
  
  expect(notify.error).toHaveBeenCalledWith(MESSAGES.GENERAL.PERMISSION_DENIED);
});
```

## Summary

- **Always** use `MESSAGES` constants for user-facing text
- **Always** use `handleError` or `withErrorHandling` for error handling
- **Always** use `notify` for user notifications
- **Always** provide context when logging errors
- **Never** show raw error messages to users
- **Test** error scenarios in your components

For more examples, see `src/utils/errorHandlingExamples.ts`.
