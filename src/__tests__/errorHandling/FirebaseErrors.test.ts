/**
 * Firebase Error Handling Tests
 * Tests for all Firebase error scenarios
 */

import { describe, it, expect } from 'vitest';
import { parseFirebaseError, ErrorType } from '../../utils/errorHandling';
import { FirebaseError } from 'firebase/app';

describe('Firebase Error Handling', () => {
  const createFirebaseError = (code: string, message?: string): FirebaseError => ({
    code,
    message: message || `Firebase: ${code}`,
    name: 'FirebaseError',
  } as FirebaseError);

  describe('Authentication Errors', () => {
    it('should handle email-already-in-use', () => {
      const error = createFirebaseError('auth/email-already-in-use');
      const result = parseFirebaseError(error);
      expect(result.type).toBe(ErrorType.AUTH);
      expect(result.message).toContain('already registered');
    });

    it('should handle invalid-email', () => {
      const error = createFirebaseError('auth/invalid-email');
      const result = parseFirebaseError(error);
      expect(result.type).toBe(ErrorType.AUTH);
      expect(result.message).toContain('valid email');
    });

    it('should handle weak-password', () => {
      const error = createFirebaseError('auth/weak-password');
      const result = parseFirebaseError(error);
      expect(result.type).toBe(ErrorType.AUTH);
      expect(result.message).toContain('too weak');
    });

    it('should handle user-not-found', () => {
      const error = createFirebaseError('auth/user-not-found');
      const result = parseFirebaseError(error);
      expect(result.type).toBe(ErrorType.AUTH);
      expect(result.message).toContain('No account found');
    });

    it('should handle wrong-password', () => {
      const error = createFirebaseError('auth/wrong-password');
      const result = parseFirebaseError(error);
      expect(result.type).toBe(ErrorType.AUTH);
      expect(result.message).toContain('Incorrect password');
    });

    it('should handle too-many-requests', () => {
      const error = createFirebaseError('auth/too-many-requests');
      const result = parseFirebaseError(error);
      expect(result.type).toBe(ErrorType.AUTH);
      expect(result.message).toContain('Too many');
    });

    it('should handle network-request-failed', () => {
      const error = createFirebaseError('auth/network-request-failed');
      const result = parseFirebaseError(error);
      expect(result.type).toBe(ErrorType.AUTH);
      expect(result.message).toContain('Network error');
    });

    it('should handle invalid-credential', () => {
      const error = createFirebaseError('auth/invalid-credential');
      const result = parseFirebaseError(error);
      expect(result.type).toBe(ErrorType.AUTH);
      expect(result.message).toContain('Invalid credentials');
    });

    it('should handle user-disabled', () => {
      const error = createFirebaseError('auth/user-disabled');
      const result = parseFirebaseError(error);
      expect(result.type).toBe(ErrorType.AUTH);
      expect(result.message).toContain('disabled');
    });

    it('should handle requires-recent-login', () => {
      const error = createFirebaseError('auth/requires-recent-login');
      const result = parseFirebaseError(error);
      expect(result.type).toBe(ErrorType.AUTH);
      expect(result.message).toContain('sign in again');
    });
  });

  describe('Firestore Errors', () => {
    it('should handle permission-denied', () => {
      const error = createFirebaseError('permission-denied');
      const result = parseFirebaseError(error);
      expect(result.type).toBe(ErrorType.PERMISSION);
      expect(result.message).toContain('permission');
    });

    it('should handle not-found', () => {
      const error = createFirebaseError('not-found');
      const result = parseFirebaseError(error);
      expect(result.type).toBe(ErrorType.NOT_FOUND);
      expect(result.message).toContain('not found');
    });

    it('should handle already-exists', () => {
      const error = createFirebaseError('already-exists');
      const result = parseFirebaseError(error);
      expect(result.message).toContain('already exists');
    });

    it('should handle resource-exhausted', () => {
      const error = createFirebaseError('resource-exhausted');
      const result = parseFirebaseError(error);
      expect(result.message).toContain('Too many requests');
    });

    it('should handle failed-precondition', () => {
      const error = createFirebaseError('failed-precondition');
      const result = parseFirebaseError(error);
      expect(result.message).toContain('cannot be completed');
    });

    it('should handle aborted', () => {
      const error = createFirebaseError('aborted');
      const result = parseFirebaseError(error);
      expect(result.message).toContain('aborted');
    });

    it('should handle unavailable', () => {
      const error = createFirebaseError('unavailable');
      const result = parseFirebaseError(error);
      expect(result.type).toBe(ErrorType.NETWORK);
      expect(result.message).toContain('unavailable');
    });

    it('should handle unauthenticated', () => {
      const error = createFirebaseError('unauthenticated');
      const result = parseFirebaseError(error);
      expect(result.type).toBe(ErrorType.PERMISSION);
      expect(result.message).toContain('sign in');
    });

    it('should handle internal', () => {
      const error = createFirebaseError('internal');
      const result = parseFirebaseError(error);
      expect(result.message).toContain('internal error');
    });

    it('should handle data-loss', () => {
      const error = createFirebaseError('data-loss');
      const result = parseFirebaseError(error);
      expect(result.message).toContain('Data loss');
    });
  });

  describe('Storage Errors', () => {
    it('should handle storage/unauthorized', () => {
      const error = createFirebaseError('storage/unauthorized');
      const result = parseFirebaseError(error);
      expect(result.message).toContain('permission');
    });

    it('should handle storage/canceled', () => {
      const error = createFirebaseError('storage/canceled');
      const result = parseFirebaseError(error);
      expect(result.message).toContain('canceled');
    });

    it('should handle storage/object-not-found', () => {
      const error = createFirebaseError('storage/object-not-found');
      const result = parseFirebaseError(error);
      expect(result.message).toContain('not found');
    });

    it('should handle storage/quota-exceeded', () => {
      const error = createFirebaseError('storage/quota-exceeded');
      const result = parseFirebaseError(error);
      expect(result.message).toContain('quota exceeded');
    });

    it('should handle storage/unauthenticated', () => {
      const error = createFirebaseError('storage/unauthenticated');
      const result = parseFirebaseError(error);
      expect(result.message).toContain('sign in');
    });

    it('should handle storage/retry-limit-exceeded', () => {
      const error = createFirebaseError('storage/retry-limit-exceeded');
      const result = parseFirebaseError(error);
      expect(result.message).toContain('multiple attempts');
    });

    it('should handle storage/invalid-checksum', () => {
      const error = createFirebaseError('storage/invalid-checksum');
      const result = parseFirebaseError(error);
      expect(result.message).toContain('failed');
    });
  });

  describe('Network Errors', () => {
    it('should categorize network errors correctly', () => {
      const networkErrors = [
        'auth/network-request-failed',
        'unavailable',
      ];

      networkErrors.forEach(code => {
        const error = createFirebaseError(code);
        const result = parseFirebaseError(error);
        expect(result.type).toBe(ErrorType.NETWORK);
      });
    });
  });

  describe('Error Code Preservation', () => {
    it('should preserve original error code', () => {
      const error = createFirebaseError('auth/invalid-email');
      const result = parseFirebaseError(error);
      expect(result.code).toBe('auth/invalid-email');
    });

    it('should preserve error details', () => {
      const error = createFirebaseError('auth/invalid-email', 'Custom message');
      const result = parseFirebaseError(error);
      expect(result.details).toBe(error);
    });
  });

  describe('Unknown Firebase Errors', () => {
    it('should handle unknown auth error', () => {
      const error = createFirebaseError('auth/unknown-error-code');
      const result = parseFirebaseError(error);
      expect(result.type).toBe(ErrorType.AUTH);
      expect(result.message).toBeTruthy();
    });

    it('should handle unknown storage error', () => {
      const error = createFirebaseError('storage/unknown-error');
      const result = parseFirebaseError(error);
      expect(result.message).toBeTruthy();
    });

    it('should fallback to original message for unknown codes', () => {
      const customMessage = 'Custom error message';
      const error = createFirebaseError('unknown/code', customMessage);
      const result = parseFirebaseError(error);
      expect(result.message).toBe(customMessage);
    });
  });
});
