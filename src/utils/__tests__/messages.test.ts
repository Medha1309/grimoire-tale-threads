import { describe, it, expect } from 'vitest';
import { MESSAGES, getFirebaseErrorMessage } from '../messages';

describe('Messages Utility', () => {
  describe('MESSAGES constant', () => {
    it('contains AUTH messages', () => {
      expect(MESSAGES.AUTH.LOGIN_SUCCESS).toBe('Welcome back');
      expect(MESSAGES.AUTH.LOGIN_ERROR).toBe('Invalid email or password');
      expect(MESSAGES.AUTH.PASSWORD_MISMATCH).toBe('Passwords do not match');
    });

    it('contains PROFILE messages', () => {
      expect(MESSAGES.PROFILE.UPDATE_SUCCESS).toBe('Profile updated successfully');
      expect(MESSAGES.PROFILE.UPDATE_ERROR).toBe('Failed to update profile');
    });

    it('contains STORIES messages', () => {
      expect(MESSAGES.STORIES.SAVE_SUCCESS).toBe('Story saved successfully');
      expect(MESSAGES.STORIES.BOOKMARK_ADDED).toBe('Added to bookmarks');
    });

    it('contains FORUM messages', () => {
      expect(MESSAGES.FORUM.POST_SUCCESS).toBe('Post created successfully');
      expect(MESSAGES.FORUM.REPLY_SUCCESS).toBe('Reply posted successfully');
    });

    it('contains DIARY messages', () => {
      expect(MESSAGES.DIARY.SAVE_SUCCESS).toBe('Entry saved successfully');
      expect(MESSAGES.DIARY.UNLOCK_ERROR).toBe('Incorrect password');
    });

    it('contains CONTACT messages', () => {
      expect(MESSAGES.CONTACT.SEND_SUCCESS).toBe('Message sent successfully');
      expect(MESSAGES.CONTACT.INVALID_EMAIL).toBe('Please enter a valid email');
    });

    it('contains ADMIN messages', () => {
      expect(MESSAGES.ADMIN.ACTION_SUCCESS).toBe('Action completed successfully');
      expect(MESSAGES.ADMIN.UNAUTHORIZED).toBe('You do not have permission to perform this action');
    });

    it('contains GENERAL messages', () => {
      expect(MESSAGES.GENERAL.LOADING).toBe('Loading...');
      expect(MESSAGES.GENERAL.ERROR).toBe('Something went wrong. Please try again.');
    });
  });

  describe('getFirebaseErrorMessage', () => {
    it('returns correct message for email-already-in-use', () => {
      expect(getFirebaseErrorMessage('auth/email-already-in-use')).toBe(MESSAGES.AUTH.EMAIL_IN_USE);
    });

    it('returns correct message for invalid-email', () => {
      expect(getFirebaseErrorMessage('auth/invalid-email')).toBe(MESSAGES.AUTH.INVALID_EMAIL);
    });

    it('returns correct message for weak-password', () => {
      expect(getFirebaseErrorMessage('auth/weak-password')).toBe(MESSAGES.AUTH.WEAK_PASSWORD);
    });

    it('returns correct message for user-not-found', () => {
      expect(getFirebaseErrorMessage('auth/user-not-found')).toBe(MESSAGES.AUTH.LOGIN_ERROR);
    });

    it('returns correct message for wrong-password', () => {
      expect(getFirebaseErrorMessage('auth/wrong-password')).toBe(MESSAGES.AUTH.WRONG_PASSWORD);
    });

    it('returns correct message for too-many-requests', () => {
      expect(getFirebaseErrorMessage('auth/too-many-requests')).toBe('Too many attempts. Please try again later.');
    });

    it('returns correct message for network-request-failed', () => {
      expect(getFirebaseErrorMessage('auth/network-request-failed')).toBe(MESSAGES.GENERAL.NETWORK_ERROR);
    });

    it('returns correct message for permission-denied', () => {
      expect(getFirebaseErrorMessage('permission-denied')).toBe(MESSAGES.ADMIN.UNAUTHORIZED);
    });

    it('returns generic error message for unknown error codes', () => {
      expect(getFirebaseErrorMessage('unknown/error-code')).toBe(MESSAGES.GENERAL.ERROR);
      expect(getFirebaseErrorMessage('random-error')).toBe(MESSAGES.GENERAL.ERROR);
    });

    it('handles empty string', () => {
      expect(getFirebaseErrorMessage('')).toBe(MESSAGES.GENERAL.ERROR);
    });
  });

  describe('Message consistency', () => {
    it('all success messages end with "successfully"', () => {
      const successMessages = [
        MESSAGES.AUTH.LOGIN_SUCCESS,
        MESSAGES.AUTH.SIGNUP_SUCCESS,
        MESSAGES.AUTH.LOGOUT_SUCCESS,
        MESSAGES.AUTH.PASSWORD_UPDATED,
        MESSAGES.PROFILE.UPDATE_SUCCESS,
        MESSAGES.STORIES.SAVE_SUCCESS,
        MESSAGES.STORIES.DELETE_SUCCESS,
        MESSAGES.STORIES.PUBLISH_SUCCESS,
        MESSAGES.FORUM.POST_SUCCESS,
        MESSAGES.FORUM.REPLY_SUCCESS,
        MESSAGES.FORUM.DELETE_SUCCESS,
        MESSAGES.FORUM.REPORT_SUCCESS,
        MESSAGES.DIARY.SAVE_SUCCESS,
        MESSAGES.DIARY.DELETE_SUCCESS,
        MESSAGES.CONTACT.SEND_SUCCESS,
        MESSAGES.ADMIN.ACTION_SUCCESS,
      ];

      successMessages.forEach(message => {
        expect(
          message.endsWith('successfully') || message === 'Welcome back' || message === 'Entry unlocked'
        ).toBe(true);
      });
    });

    it('all error messages start with "Failed" or contain error context', () => {
      const errorMessages = [
        MESSAGES.AUTH.LOGIN_ERROR,
        MESSAGES.AUTH.SIGNUP_ERROR,
        MESSAGES.AUTH.PASSWORD_RESET_ERROR,
        MESSAGES.AUTH.PASSWORD_UPDATE_ERROR,
        MESSAGES.PROFILE.UPDATE_ERROR,
        MESSAGES.STORIES.SAVE_ERROR,
        MESSAGES.STORIES.DELETE_ERROR,
        MESSAGES.STORIES.PUBLISH_ERROR,
        MESSAGES.FORUM.POST_ERROR,
        MESSAGES.FORUM.REPLY_ERROR,
        MESSAGES.FORUM.DELETE_ERROR,
        MESSAGES.DIARY.SAVE_ERROR,
        MESSAGES.DIARY.DELETE_ERROR,
        MESSAGES.CONTACT.SEND_ERROR,
        MESSAGES.ADMIN.ACTION_ERROR,
      ];

      errorMessages.forEach(message => {
        expect(
          message.startsWith('Failed') || 
          message.includes('Invalid') || 
          message.includes('error') ||
          message.includes('incorrect')
        ).toBe(true);
      });
    });
  });
});

