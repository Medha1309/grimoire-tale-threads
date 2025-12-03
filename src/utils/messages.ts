/**
 * Centralized message constants for consistent UX across the app
 * All user-facing messages should use these constants
 */

export const MESSAGES = {
  // Authentication
  AUTH: {
    LOGIN_SUCCESS: "Welcome back",
    LOGIN_ERROR: "Invalid email or password",
    SIGNUP_SUCCESS: "Account created successfully",
    SIGNUP_ERROR: "Failed to create account",
    LOGOUT_SUCCESS: "Logged out successfully",
    PASSWORD_RESET_SENT: "Password reset email sent successfully",
    PASSWORD_RESET_ERROR: "Failed to send password reset email",
    PASSWORD_UPDATED: "Password updated successfully",
    PASSWORD_UPDATE_ERROR: "Failed to update password",
    PASSWORD_MISMATCH: "Passwords do not match",
    PASSWORD_TOO_SHORT: "Password must be at least 6 characters",
    WRONG_PASSWORD: "Incorrect password",
    EMAIL_IN_USE: "This email is already in use",
    INVALID_EMAIL: "Please enter a valid email address",
    WEAK_PASSWORD: "Password is too weak. Use at least 6 characters",
    UNAUTHORIZED: "Please sign in to continue",
  },

  // Profile
  PROFILE: {
    UPDATE_SUCCESS: "Profile updated successfully",
    UPDATE_ERROR: "Failed to update profile",
    LOAD_ERROR: "Failed to load profile",
    LOADING: "Loading profile...",
    SAVING: "Saving profile...",
  },

  // Stories/Library
  STORIES: {
    SAVE_SUCCESS: "Story saved successfully",
    SAVE_ERROR: "Failed to save story",
    DELETE_SUCCESS: "Story deleted successfully",
    DELETE_ERROR: "Failed to delete story",
    PUBLISH_SUCCESS: "Story published successfully",
    PUBLISH_ERROR: "Failed to publish story",
    UPDATE_SUCCESS: "Story updated successfully",
    UPDATE_ERROR: "Failed to update story",
    BOOKMARK_ADDED: "Added to bookmarks",
    BOOKMARK_REMOVED: "Removed from bookmarks",
    BOOKMARK_ERROR: "Failed to update bookmark",
    LIKE_SUCCESS: "Story liked",
    LIKE_ERROR: "Failed to like story",
    LOAD_ERROR: "Failed to load stories",
    LOADING: "Loading stories...",
    SAVING: "Saving...",
  },

  // Forum/Parlour
  FORUM: {
    POST_SUCCESS: "Post created successfully",
    POST_ERROR: "Failed to create post",
    REPLY_SUCCESS: "Reply posted successfully",
    REPLY_ERROR: "Failed to post reply",
    DELETE_SUCCESS: "Post deleted successfully",
    DELETE_ERROR: "Failed to delete post",
    UPDATE_SUCCESS: "Post updated successfully",
    UPDATE_ERROR: "Failed to update post",
    LIKE_SUCCESS: "Post liked successfully",
    LIKE_ERROR: "Failed to like post",
    REPORT_SUCCESS: "Post reported successfully",
    REPORT_ERROR: "Failed to report post",
    LOAD_ERROR: "Failed to load posts",
    LOADING: "Loading posts...",
    SAVING: "Posting...",
  },

  // Diary/Dollhouse
  DIARY: {
    SAVE_SUCCESS: "Entry saved successfully",
    SAVE_ERROR: "Failed to save entry",
    DELETE_SUCCESS: "Entry deleted successfully",
    DELETE_ERROR: "Failed to delete entry",
    UPDATE_SUCCESS: "Entry updated successfully",
    UPDATE_ERROR: "Failed to update entry",
    UNLOCK_SUCCESS: "Entry unlocked",
    UNLOCK_ERROR: "Incorrect password",
    LOCK_SUCCESS: "Entry locked successfully",
    LOCK_ERROR: "Failed to lock entry",
    LOAD_ERROR: "Failed to load entries",
    LOADING: "Loading entries...",
    SAVING: "Saving entry...",
  },

  // Scrapbook
  SCRAPBOOK: {
    SAVE_SUCCESS: "Memory preserved",
    SAVE_ERROR: "Failed to save memory",
    DELETE_SUCCESS: "Memory faded away",
    DELETE_ERROR: "Failed to delete memory",
    UPDATE_SUCCESS: "Memory updated",
    UPDATE_ERROR: "Failed to update memory",
    LOAD_ERROR: "Failed to load memories",
    LOADING: "Loading memories...",
    SAVING: "Preserving memory...",
  },

  // Art Studio
  ART: {
    SAVE_SUCCESS: "Artwork saved to gallery",
    SAVE_ERROR: "Failed to save artwork",
    DELETE_SUCCESS: "Artwork removed",
    DELETE_ERROR: "Failed to delete artwork",
    SHARE_SUCCESS: "Artwork shared successfully",
    SHARE_ERROR: "Failed to share artwork",
    LOAD_ERROR: "Failed to load artwork",
    LOADING: "Loading artwork...",
    SAVING: "Saving artwork...",
  },

  // Contact
  CONTACT: {
    SEND_SUCCESS: "Message sent successfully",
    SEND_ERROR: "Failed to send message",
    INVALID_EMAIL: "Please enter a valid email",
    REQUIRED_FIELDS: "Please fill in all required fields",
    SENDING: "Sending message...",
  },

  // Admin
  ADMIN: {
    ACTION_SUCCESS: "Action completed successfully",
    ACTION_ERROR: "Failed to complete action",
    UPDATE_SUCCESS: "Updated successfully",
    UPDATE_ERROR: "Failed to update",
    DELETE_SUCCESS: "Deleted successfully",
    DELETE_ERROR: "Failed to delete",
    DELETE_CONFIRM: "Are you sure you want to delete this? This action cannot be undone.",
    UNAUTHORIZED: "You do not have permission to perform this action",
    LOAD_ERROR: "Failed to load data",
    LOADING: "Loading...",
    SAVING: "Saving...",
  },

  // Following/Social
  SOCIAL: {
    FOLLOW_SUCCESS: "Now following",
    FOLLOW_ERROR: "Failed to follow user",
    UNFOLLOW_SUCCESS: "Unfollowed successfully",
    UNFOLLOW_ERROR: "Failed to unfollow user",
    NOTIFICATION_READ: "Notification marked as read",
    NOTIFICATION_ERROR: "Failed to update notification",
    LOAD_ERROR: "Failed to load social data",
  },

  // General
  GENERAL: {
    LOADING: "Loading...",
    SAVING: "Saving...",
    DELETING: "Deleting...",
    PROCESSING: "Processing...",
    ERROR: "Something went wrong. Please try again.",
    NETWORK_ERROR: "Network error. Please check your connection.",
    OFFLINE_ERROR: "You appear to be offline",
    SUCCESS: "Success",
    REQUIRED_FIELD: "This field is required",
    INVALID_INPUT: "Invalid input",
    CONFIRM_DELETE: "Are you sure you want to delete this?",
    UNSAVED_CHANGES: "You have unsaved changes. Are you sure you want to leave?",
    PERMISSION_DENIED: "You don't have permission to do that",
    NOT_FOUND: "Content not found",
    ALREADY_EXISTS: "This already exists",
    TIMEOUT: "Request timed out. Please try again.",
  },
} as const;

/**
 * Get user-friendly error message from Firebase error code
 */
export const getFirebaseErrorMessage = (errorCode: string): string => {
  const errorMessages: Record<string, string> = {
    // Auth errors
    'auth/email-already-in-use': MESSAGES.AUTH.EMAIL_IN_USE,
    'auth/invalid-email': MESSAGES.AUTH.INVALID_EMAIL,
    'auth/weak-password': MESSAGES.AUTH.WEAK_PASSWORD,
    'auth/user-not-found': MESSAGES.AUTH.LOGIN_ERROR,
    'auth/wrong-password': MESSAGES.AUTH.WRONG_PASSWORD,
    'auth/too-many-requests': 'Too many attempts. Please try again later.',
    'auth/network-request-failed': MESSAGES.GENERAL.NETWORK_ERROR,
    'auth/requires-recent-login': 'Please log in again to continue.',
    'auth/user-disabled': 'This account has been disabled.',
    
    // Firestore errors
    'permission-denied': MESSAGES.ADMIN.UNAUTHORIZED,
    'not-found': MESSAGES.GENERAL.NOT_FOUND,
    'already-exists': MESSAGES.GENERAL.ALREADY_EXISTS,
    'unauthenticated': MESSAGES.AUTH.UNAUTHORIZED,
    'unavailable': 'Service temporarily unavailable. Please try again.',
    'deadline-exceeded': MESSAGES.GENERAL.TIMEOUT,
    'resource-exhausted': 'Too many requests. Please try again later.',
    'cancelled': 'Operation cancelled.',
    'data-loss': 'Data corruption detected. Please contact support.',
    'failed-precondition': 'Operation cannot be completed in current state.',
    'aborted': 'Operation aborted. Please try again.',
    'out-of-range': 'Invalid value provided.',
    'unimplemented': 'This feature is not yet available.',
    'internal': 'Internal error occurred. Please try again.',
    'unknown': MESSAGES.GENERAL.ERROR,
  };

  return errorMessages[errorCode] || MESSAGES.GENERAL.ERROR;
};

/**
 * Get user-friendly error message from any error object
 */
export const getErrorMessage = (error: any): string => {
  // Check if it's a Firebase error
  if (error?.code) {
    return getFirebaseErrorMessage(error.code);
  }
  
  // Check if it's a network error
  if (!navigator.onLine) {
    return MESSAGES.GENERAL.OFFLINE_ERROR;
  }
  
  // Check for specific error messages
  if (error?.message) {
    // Return custom error messages as-is
    if (error.message.includes('Failed to') || 
        error.message.includes('Invalid') ||
        error.message.includes('required')) {
      return error.message;
    }
  }
  
  // Default error message
  return MESSAGES.GENERAL.ERROR;
};
