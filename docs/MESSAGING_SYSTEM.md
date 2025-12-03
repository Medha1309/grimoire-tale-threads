# Centralized Messaging System

## Overview
A consistent, reusable messaging system for all user feedback across the app.

## Components

### 1. Message Constants (`src/utils/messages.ts`)
Centralized message strings organized by feature:

```typescript
import { MESSAGES } from '../utils/messages';

// Use predefined messages
showSuccess(MESSAGES.AUTH.LOGIN_SUCCESS);
showError(MESSAGES.PROFILE.UPDATE_ERROR);
```

**Categories:**
- `AUTH` - Authentication messages
- `PROFILE` - Profile management
- `STORIES` - Story/library operations
- `FORUM` - Forum/parlour posts
- `DIARY` - Diary/dollhouse entries
- `CONTACT` - Contact form
- `ADMIN` - Admin actions
- `GENERAL` - Generic messages

### 2. Toast Component (`src/components/shared/Toast.tsx`)
Reusable notification component with 4 types:

```typescript
<Toast
  message="Profile updated successfully"
  type="success" // success | error | info | warning
  isVisible={isVisible}
  onClose={handleClose}
  duration={4000} // optional, defaults to 4000ms
/>
```

**Styling:**
- Success: Green
- Error: Red
- Info: Blue
- Warning: Amber

### 3. useToast Hook (`src/hooks/useToast.ts`)
Custom hook for managing toast state:

```typescript
const { toast, showSuccess, showError, showInfo, showWarning, hideToast } = useToast();

// Show messages
showSuccess(MESSAGES.PROFILE.UPDATE_SUCCESS);
showError(MESSAGES.AUTH.LOGIN_ERROR);
showInfo("Feature coming soon");
showWarning("Unsaved changes");

// Render toast
<Toast
  message={toast.message}
  type={toast.type}
  isVisible={toast.isVisible}
  onClose={hideToast}
/>
```

## Usage Examples

### Basic Implementation

```typescript
import { useToast } from '../hooks/useToast';
import { Toast } from '../components/shared/Toast';
import { MESSAGES } from '../utils/messages';

const MyComponent = () => {
  const { toast, showSuccess, showError, hideToast } = useToast();

  const handleSave = async () => {
    try {
      await saveData();
      showSuccess(MESSAGES.GENERAL.SUCCESS);
    } catch (error) {
      showError(MESSAGES.GENERAL.ERROR);
    }
  };

  return (
    <>
      <button onClick={handleSave}>Save</button>
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </>
  );
};
```

### Firebase Error Handling

```typescript
import { getFirebaseErrorMessage } from '../utils/messages';

try {
  await signInWithEmailAndPassword(auth, email, password);
  showSuccess(MESSAGES.AUTH.LOGIN_SUCCESS);
} catch (error: any) {
  showError(getFirebaseErrorMessage(error.code));
}
```

### Confirmation Dialogs

```typescript
const handleDelete = () => {
  if (confirm(MESSAGES.ADMIN.DELETE_CONFIRM)) {
    // Proceed with deletion
    deleteItem();
    showSuccess(MESSAGES.GENERAL.SUCCESS);
  }
};
```

## Benefits

### Consistency
- All messages use the same component and styling
- Predictable user experience across features
- Easy to maintain and update

### Reusability
- Single source of truth for messages
- No duplicate message strings
- Easy to update wording globally

### Type Safety
- TypeScript ensures correct message usage
- Autocomplete for message constants
- Compile-time error checking

### Accessibility
- Consistent timing and positioning
- Close button for manual dismissal
- Screen reader friendly

## Migration Guide

### Before (Inconsistent)
```typescript
// Different implementations everywhere
setMessage("Profile updated!");
alert("Error occurred");
console.log("Success");
```

### After (Consistent)
```typescript
// Unified approach
showSuccess(MESSAGES.PROFILE.UPDATE_SUCCESS);
showError(MESSAGES.GENERAL.ERROR);
showInfo(MESSAGES.GENERAL.LOADING);
```

## Adding New Messages

1. Add to `src/utils/messages.ts`:
```typescript
export const MESSAGES = {
  // ...
  MY_FEATURE: {
    ACTION_SUCCESS: "Action completed successfully",
    ACTION_ERROR: "Failed to complete action",
  },
};
```

2. Use in component:
```typescript
showSuccess(MESSAGES.MY_FEATURE.ACTION_SUCCESS);
```

## Customization

### Custom Duration
```typescript
<Toast
  message={toast.message}
  type={toast.type}
  isVisible={toast.isVisible}
  onClose={hideToast}
  duration={6000} // 6 seconds
/>
```

### No Auto-Dismiss
```typescript
<Toast
  message={toast.message}
  type={toast.type}
  isVisible={toast.isVisible}
  onClose={hideToast}
  duration={0} // Won't auto-dismiss
/>
```

## Best Practices

1. **Always use MESSAGES constants** - Never hardcode strings
2. **Use appropriate toast types** - Success for positive actions, error for failures
3. **Keep messages concise** - Short, clear, actionable
4. **Handle Firebase errors** - Use `getFirebaseErrorMessage()` helper
5. **Provide context** - Messages should be specific to the action

## Current Implementation

The Profile page has been updated to use this system. Other pages should follow the same pattern:

- Login/Signup pages
- Contact form
- Forum posts
- Diary entries
- Story management
- Admin actions

All should use the centralized messaging system for consistency.
