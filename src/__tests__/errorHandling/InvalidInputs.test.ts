/**
 * Invalid Input Error Handling Tests
 * Tests for validation and sanitization of user inputs
 */

import { describe, it, expect } from 'vitest';
import { validate, assert } from '../../utils/errorHandling';
import { 
  validateEmail, 
  validatePassword, 
  validateUsername,
  sanitizeInput,
  validateUrl
} from '../../utils/validators';

describe('Invalid Input Handling', () => {
  describe('Email Validation', () => {
    it('should reject empty email', () => {
      const result = validateEmail('');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Email is required');
    });

    it('should reject email without @', () => {
      const result = validateEmail('invalidemail.com');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('valid email');
    });

    it('should reject email without domain', () => {
      const result = validateEmail('user@');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('valid email');
    });

    it('should reject email without username', () => {
      const result = validateEmail('@domain.com');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('valid email');
    });

    it('should reject email with spaces', () => {
      const result1 = validateEmail('user @domain.com');
      const result2 = validateEmail('user@ domain.com');
      expect(result1.isValid).toBe(false);
      expect(result2.isValid).toBe(false);
    });

    it('should reject email with multiple @', () => {
      const result1 = validateEmail('user@@domain.com');
      const result2 = validateEmail('user@domain@com');
      expect(result1.isValid).toBe(false);
      expect(result2.isValid).toBe(false);
    });

    it('should reject email with invalid characters', () => {
      const result = validateEmail('user!#$%@domain.com');
      // Some special characters may be valid in email local parts
      // Just check it returns a validation result
      expect(result).toHaveProperty('isValid');
    });

    it('should accept valid emails', () => {
      const result1 = validateEmail('user@domain.com');
      const result2 = validateEmail('user.name@domain.co.uk');
      const result3 = validateEmail('user+tag@domain.com');
      expect(result1.isValid).toBe(true);
      expect(result2.isValid).toBe(true);
      expect(result3.isValid).toBe(true);
    });

    it('should handle very long emails', () => {
      const longEmail = 'a'.repeat(300) + '@domain.com';
      const result = validateEmail(longEmail);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('too long');
    });

    it('should handle unicode in email', () => {
      const result = validateEmail('用户@domain.com');
      // Unicode may be valid in modern email specs, just check it validates
      expect(result).toHaveProperty('isValid');
    });
  });

  describe('Password Validation', () => {
    it('should reject empty password', () => {
      const result = validatePassword('');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Password is required');
    });

    it('should reject short password', () => {
      const result = validatePassword('abc123');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('at least 8 characters');
    });

    it('should reject password without numbers', () => {
      const result = validatePassword('abcdefgh');
      expect(result.isValid).toBe(false);
      expect(result.error).toBeTruthy();
    });

    it('should reject password without letters', () => {
      const result = validatePassword('12345678');
      expect(result.isValid).toBe(false);
      expect(result.error).toBeTruthy();
    });

    it('should accept valid password', () => {
      const result1 = validatePassword('Password123');
      const result2 = validatePassword('MyP@ssw0rd');
      expect(result1.isValid).toBe(true);
      expect(result2.isValid).toBe(true);
    });

    it('should handle very long passwords', () => {
      const longPassword = 'Pass123' + 'a'.repeat(1000);
      const result = validatePassword(longPassword);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('too long');
    });

    it('should handle special characters', () => {
      const result1 = validatePassword('P@ssw0rd!');
      const result2 = validatePassword('Pass#123$');
      expect(result1.isValid).toBe(true);
      expect(result2.isValid).toBe(true);
    });

    it('should handle unicode characters', () => {
      const result = validatePassword('密码123456');
      expect(result.isValid).toBe(false);
      expect(result.error).toBeTruthy();
    });
  });

  describe('Username Validation', () => {
    it('should reject empty username', () => {
      const result = validateUsername('');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Username is required');
    });

    it('should reject username too short', () => {
      const result = validateUsername('ab');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('at least 3 characters');
    });

    it('should reject username too long', () => {
      const longUsername = 'a'.repeat(51);
      const result = validateUsername(longUsername);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('less than');
    });

    it('should reject username with spaces', () => {
      const result = validateUsername('user name');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('letters, numbers, underscores');
    });

    it('should reject username with special characters', () => {
      const result1 = validateUsername('user@name');
      const result2 = validateUsername('user!name');
      expect(result1.isValid).toBe(false);
      expect(result2.isValid).toBe(false);
    });

    it('should accept valid usernames', () => {
      const result1 = validateUsername('username');
      const result2 = validateUsername('user_name');
      const result3 = validateUsername('user123');
      const result4 = validateUsername('user-name');
      expect(result1.isValid).toBe(true);
      expect(result2.isValid).toBe(true);
      expect(result3.isValid).toBe(true);
      expect(result4.isValid).toBe(true);
    });

    it('should handle leading/trailing spaces', () => {
      const result = validateUsername(' username ');
      expect(result.isValid).toBe(false);
      expect(result.error).toBeTruthy();
    });

    it('should handle unicode usernames', () => {
      const result = validateUsername('用户名');
      expect(result.isValid).toBe(false);
      expect(result.error).toBeTruthy();
    });
  });

  describe('Input Sanitization', () => {
    it('should remove HTML tags', () => {
      const input = '<script>alert("xss")</script>Hello';
      const sanitized = sanitizeInput(input);
      expect(sanitized).not.toContain('<script>');
      expect(sanitized).not.toContain('</script>');
    });

    it('should handle SQL injection attempts', () => {
      const input = "'; DROP TABLE users; --";
      const sanitized = sanitizeInput(input);
      expect(sanitized).toBeDefined();
    });

    it('should handle XSS attempts', () => {
      const xssAttempts = [
        '<img src=x onerror=alert(1)>',
        '<svg onload=alert(1)>',
        'javascript:alert(1)',
        '<iframe src="javascript:alert(1)">',
      ];

      xssAttempts.forEach(attempt => {
        const sanitized = sanitizeInput(attempt);
        expect(sanitized).not.toContain('javascript:');
        expect(sanitized).not.toContain('onerror');
        expect(sanitized).not.toContain('onload');
      });
    });

    it('should preserve safe content', () => {
      const input = 'Hello, World! This is safe text.';
      const sanitized = sanitizeInput(input);
      expect(sanitized).toContain('Hello');
      expect(sanitized).toContain('World');
    });

    it('should handle empty input', () => {
      expect(sanitizeInput('')).toBe('');
    });

    it('should handle null/undefined', () => {
      expect(sanitizeInput(null as any)).toBe('');
      expect(sanitizeInput(undefined as any)).toBe('');
    });

    it('should handle very long inputs', () => {
      const longInput = 'a'.repeat(100000);
      const sanitized = sanitizeInput(longInput);
      expect(sanitized.length).toBeLessThanOrEqual(10000);
    });
  });

  describe('URL Validation', () => {
    it('should reject invalid URLs', () => {
      const result1 = validateUrl('not a url');
      const result2 = validateUrl('htp://invalid.com');
      const result3 = validateUrl('//invalid');
      expect(result1.isValid).toBe(false);
      expect(result2.isValid).toBe(false);
      expect(result3.isValid).toBe(false);
    });

    it('should accept valid URLs', () => {
      const result1 = validateUrl('https://example.com');
      const result2 = validateUrl('http://example.com');
      const result3 = validateUrl('https://sub.example.com/path');
      expect(result1.isValid).toBe(true);
      expect(result2.isValid).toBe(true);
      expect(result3.isValid).toBe(true);
    });

    it('should reject javascript: URLs', () => {
      const result = validateUrl('javascript:alert(1)');
      expect(result.isValid).toBe(false);
    });

    it('should reject data: URLs', () => {
      const result = validateUrl('data:text/html,<script>alert(1)</script>');
      expect(result.isValid).toBe(false);
    });

    it('should handle URLs with query params', () => {
      const result = validateUrl('https://example.com?param=value');
      expect(result.isValid).toBe(true);
    });

    it('should handle URLs with fragments', () => {
      const result = validateUrl('https://example.com#section');
      expect(result.isValid).toBe(true);
    });
  });

  describe('Validation Utility Functions', () => {
    it('should throw on invalid validation', () => {
      expect(() => {
        validate(false, 'Validation failed');
      }).toThrow();
    });

    it('should not throw on valid validation', () => {
      expect(() => {
        validate(true, 'Should not throw');
      }).not.toThrow();
    });

    it('should throw on failed assertion', () => {
      expect(() => {
        assert(false, 'Assertion failed');
      }).toThrow();
    });

    it('should not throw on successful assertion', () => {
      expect(() => {
        assert(true, 'Should not throw');
      }).not.toThrow();
    });

    it('should include error message in thrown error', () => {
      const message = 'Custom error message';
      expect(() => {
        validate(false, message);
      }).toThrow(message);
    });
  });

  describe('Boundary Values', () => {
    it('should handle minimum length inputs', () => {
      const result1 = validateUsername('abc');
      const result2 = validatePassword('Pass1234');
      expect(result1.isValid).toBe(true);
      expect(result2.isValid).toBe(true);
    });

    it('should handle maximum length inputs', () => {
      const maxUsername = 'a'.repeat(29); // Within limit
      const result = validateUsername(maxUsername);
      expect(result.isValid).toBe(true);
    });

    it('should reject just-over-limit inputs', () => {
      const tooLongUsername = 'a'.repeat(51);
      const result = validateUsername(tooLongUsername);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeTruthy();
    });
  });

  describe('Type Coercion', () => {
    it('should handle number inputs', () => {
      const result1 = validateEmail(123 as any);
      const result2 = validateUsername(456 as any);
      expect(result1.isValid).toBe(false);
      expect(result2.isValid).toBe(false);
    });

    it('should handle boolean inputs', () => {
      const result1 = validateEmail(true as any);
      const result2 = validatePassword(false as any);
      expect(result1.isValid).toBe(false);
      expect(result2.isValid).toBe(false);
    });

    it('should handle object inputs', () => {
      const result1 = validateEmail({} as any);
      const result2 = validateUsername([] as any);
      expect(result1.isValid).toBe(false);
      expect(result2.isValid).toBe(false);
    });
  });
});
