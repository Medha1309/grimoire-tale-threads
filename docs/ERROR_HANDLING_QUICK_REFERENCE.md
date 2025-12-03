# Error Handling Quick Reference

## Import These

```typescript
import { handleError, logError } from '@/utils/errorHandler';
import { notify } from '@/utils/notifications';
import { MESSAGES } from '@/utils/messages';
```

## Common Patterns

### Save Operation
```typescript
try {
  await save(data);
  notify.success(MESSAGES.STORIES.SAVE_SUCCESS);
} catch (error) {
  const msg = handleError(error, 'save');
  notify.error(msg);
}
```

### Delete Operation
```typescript
try {
  await delete(id);
  notify.deleted('Story');
} catch (error) {
  notify.deleteFailed('Story');
}
```

### Load Data
```typescript
try {
  setLoading(true);
  const data = await fetch();
  setData(data);
} catch (error) {
  notify.loadFailed('stories');
} finally {
  setLoading(false);
}
```

### Form Validation
```typescript
if (!email) {
  notify.error(MESSAGES.CONTACT.REQUIRED_FIELDS);
  return;
}
```

### Toggle/Like
```typescript
try {
  await toggleLike();
  notify.success(MESSAGES.STORIES.LIKE_SUCCESS);
} catch (error) {
  notify.error(MESSAGES.STORIES.LIKE_ERROR);
}
```

## Message Constants

### Auth
```typescript
MESSAGES.AUTH.LOGIN_SUCCESS
MESSAGES.AUTH.LOGIN_ERROR
MESSAGES.AUTH.SIGNUP_SUCCESS
MESSAGES.AUTH.UNAUTHORIZED
```

### Stories
```typescript
MESSAGES.STORIES.SAVE_SUCCESS
MESSAGES.STORIES.DELETE_SUCCESS
MESSAGES.STORIES.BOOKMARK_ADDED
MESSAGES.STORIES.LIKE_SUCCESS
```

### Forum
```typescript
MESSAGES.FORUM.POST_SUCCESS
MESSAGES.FORUM.REPLY_SUCCESS
MESSAGES.FORUM.LIKE_SUCCESS
```

### Diary
```typescript
MESSAGES.DIARY.SAVE_SUCCESS
MESSAGES.DIARY.DELETE_SUCCESS
MESSAGES.DIARY.UNLOCK_SUCCESS
```

### General
```typescript
MESSAGES.GENERAL.ERROR
MESSAGES.GENERAL.NETWORK_ERROR
MESSAGES.GENERAL.PERMISSION_DENIED
MESSAGES.GENERAL.LOADING
MESSAGES.GENERAL.SAVING
```

## Notification Methods

```typescript
// Basic
notify.success('Message')
notify.error('Message')
notify.info('Message')
notify.warning('Message')

// Convenience
notify.saved('Story')
notify.deleted('Entry')
notify.updated('Profile')
notify.saveFailed('Story')
notify.loadFailed('posts')
notify.networkError()
notify.permissionDenied()
notify.unauthorized()
```

## Error Handlers

```typescript
// With user notification
const msg = handleError(error, 'context');
notify.error(msg);

// Silent logging only
logError('context', error);

// With fallback message
const msg = handleError(error, 'context', 'Custom fallback');
```

## DON'T Use

```typescript
❌ console.error('Error:', error)
❌ alert('Failed to save')
❌ throw new Error('Something went wrong')
❌ 'Failed to save story' // hardcoded strings
```

## DO Use

```typescript
✅ logError('context', error)
✅ notify.error(MESSAGES.STORIES.SAVE_ERROR)
✅ const msg = handleError(error, 'context')
✅ MESSAGES.STORIES.SAVE_ERROR // constants
```

## Full Example

```typescript
import { handleError } from '@/utils/errorHandler';
import { notify } from '@/utils/notifications';
import { MESSAGES } from '@/utils/messages';

const MyComponent = () => {
  const handleSave = async () => {
    try {
      setLoading(true);
      await saveStory(data);
      notify.success(MESSAGES.STORIES.SAVE_SUCCESS);
      navigate('/stories');
    } catch (error) {
      const errorMessage = handleError(error, 'MyComponent.handleSave');
      notify.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return <button onClick={handleSave}>Save</button>;
};
```
