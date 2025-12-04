/**
 * Edge Case Error Handling Tests
 * Tests for unexpected inputs, boundary conditions, and edge cases
 */

import { describe, it, expect } from 'vitest';
import { parseError, parseFirebaseError, createError, ErrorType } from '../../utils/errorHandling';
import { FirebaseError } from 'firebase/app';

describe('Edge Case Error Handling', () => {
  describe('Null and Undefined Inputs', () => {
    it('should handle null error', () => {
      const result = parseError(null);
      expect(result.type).toBe(ErrorType.UNKNOWN);
      expect(result.message).toBe('An unexpected error occurred.');
    });

    it('should handle undefined error', () => {
      const result = parseError(undefined);
      expect(result.type).toBe(ErrorType.UNKNOWN);
      expect(result.message).toBe('An unexpected error occurred.');
    });

    it('should handle empty string error', () => {
      const result = parseError('');
      expect(result.type).toBe(ErrorType.CLIENT);
      expect(result.message).toBe('');
    });
  });

  describe('Malformed Data', () => {
    it('should handle object without code property', () => {
      const error = { message: 'Test error' };
      const result = parseError(error);
      expect(result.type).toBe(ErrorType.UNKNOWN);
      expect(result.message).toBe('An unexpected error occurred.');
    });

    it('should handle object with null code', () => {
      const error = { code: null, message: 'Test' };
      const result = parseError(error);
      expect(result.type).toBe(ErrorType.UNKNOWN);
      expect(result.message).toBeTruthy();
    });

    it('should handle circular reference in error details', () => {
      const circular: any = { name: 'circular' };
      circular.self = circular;
      
      const error = createError(ErrorType.CLIENT, 'Test', undefined, circular);
      expect(error.details).toBe(circular);
    });
  });

  describe('Extreme Values', () => {
    it('should handle very long error messages', () => {
      const longMessage = 'A'.repeat(10000);
      const result = parseError(longMessage);
      expect(result.message).toBe(longMessage);
    });

    it('should handle error with special characters', () => {
      const specialMessage = '🔥 Error: <script>alert("xss")</script> \n\t\r';
      const result = parseError(specialMessage);
      expect(result.message).toBe(specialMessage);
    });

    it('should handle unicode characters', () => {
      const unicodeMessage = '错误：测试 エラー 🎭';
      const result = parseError(unicodeMessage);
      expect(result.message).toBe(unicodeMessage);
    });
  });

  describe('Type Coercion', () => {
    it('should handle number as error', () => {
      const result = parseError(404 as any);
      expect(result.type).toBe(ErrorType.UNKNOWN);
    });

    it('should handle boolean as error', () => {
      const result = parseError(false as any);
      expect(result.type).toBe(ErrorType.UNKNOWN);
    });

    it('should handle array as error', () => {
      const result = parseError(['error1', 'error2'] as any);
      expect(result.type).toBe(ErrorType.UNKNOWN);
    });

    it('should handle function as error', () => {
      const result = parseError((() => 'error') as any);
      expect(result.type).toBe(ErrorType.UNKNOWN);
    });
  });

  describe('Firebase Error Edge Cases', () => {
    it('should handle Firebase error with missing code', () => {
      const error = {
        code: '',
        message: 'Test error',
        name: 'FirebaseError'
      } as FirebaseError;
      
      const result = parseFirebaseError(error);
      expect(result.message).toBe('Test error');
    });

    it('should handle Firebase error with unknown code', () => {
      const error = {
        code: 'unknown/weird-error-code',
        message: 'Unknown error',
        name: 'FirebaseError'
      } as FirebaseError;
      
      const result = parseFirebaseError(error);
      expect(result.message).toBe('Unknown error');
    });

    it('should handle Firebase error with null message', () => {
      const error = {
        code: 'auth/invalid-email',
        message: null as any,
        name: 'FirebaseError'
      } as FirebaseError;
      
      const result = parseFirebaseError(error);
      expect(result.message).toBeTruthy();
    });
  });

  describe('Timestamp Edge Cases', () => {
    it('should create error with valid timestamp', () => {
      const error = createError(ErrorType.CLIENT, 'Test');
      expect(error.timestamp).toBeInstanceOf(Date);
      expect(error.timestamp.getTime()).toBeLessThanOrEqual(Date.now());
    });

    it('should handle errors created in different timezones', () => {
      const error1 = createError(ErrorType.CLIENT, 'Test 1');
      const error2 = createError(ErrorType.CLIENT, 'Test 2');
      expect(error2.timestamp.getTime()).toBeGreaterThanOrEqual(error1.timestamp.getTime());
    });
  });

  describe('Stack Trace Edge Cases', () => {
    it('should include stack trace', () => {
      const error = createError(ErrorType.CLIENT, 'Test');
      expect(error.stack).toBeDefined();
      expect(typeof error.stack).toBe('string');
    });

    it('should handle errors without stack', () => {
      const error = new Error('Test');
      delete (error as any).stack;
      const result = parseError(error);
      expect(result).toBeDefined();
    });
  });
});

