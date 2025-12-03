/**
 * Enhanced Security Utilities
 * Comprehensive protection against common attacks
 */

import DOMPurify from 'dompurify';

/**
 * Sanitize HTML content to prevent XSS
 */
export const sanitizeHtml = (dirty: string): string => {
  if (typeof window === 'undefined') {
    // Fallback: basic HTML escaping if not in browser
    return escapeHtml(dirty);
  }
  
  const purifyConfig = {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br', 'ul', 'ol', 'li', 'a'],
    ALLOWED_ATTR: ['href', 'title'],
    ALLOW_DATA_ATTR: false,
    ALLOW_UNKNOWN_PROTOCOLS: false,
  };
  return DOMPurify.sanitize(dirty, purifyConfig);
};

/**
 * Escape HTML entities
 */
export const escapeHtml = (text: string): string => {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  return text.replace(/[&<>"'/]/g, (char) => map[char]);
};

/**
 * Validate and sanitize user input
 */
export const sanitizeInput = (input: string, maxLength: number = 10000): string => {
  return input
    .trim()
    .slice(0, maxLength)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, ''); // Remove control characters
};

/**
 * Validate email with strict regex
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email) && email.length <= 254;
};

/**
 * Validate password strength
 */
export const validatePassword = (password: string): {
  valid: boolean;
  errors: string[];
  strength: 'weak' | 'medium' | 'strong';
} => {
  const errors: string[] = [];
  let strength: 'weak' | 'medium' | 'strong' = 'weak';

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain lowercase letters');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain uppercase letters');
  }

  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain numbers');
  }

  if (!/[^a-zA-Z0-9]/.test(password)) {
    errors.push('Password must contain special characters');
  }

  // Calculate strength
  if (errors.length === 0 && password.length >= 12) {
    strength = 'strong';
  } else if (errors.length <= 2) {
    strength = 'medium';
  }

  return {
    valid: errors.length === 0,
    errors,
    strength,
  };
};

/**
 * Detect SQL injection patterns
 */
export const detectSqlInjection = (input: string): boolean => {
  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE)\b)/i,
    /(--|#|\/\*|\*\/)/,
    /(\bOR\b.*=.*)/i,
    /(\bAND\b.*=.*)/i,
    /('|")\s*(OR|AND)\s*('|")/i,
  ];

  return sqlPatterns.some((pattern) => pattern.test(input));
};

/**
 * Detect NoSQL injection patterns
 */
export const detectNoSqlInjection = (input: string): boolean => {
  const noSqlPatterns = [
    /\$where/i,
    /\$ne/i,
    /\$gt/i,
    /\$lt/i,
    /\$regex/i,
    /\{\s*\$.*\}/,
  ];

  return noSqlPatterns.some((pattern) => pattern.test(input));
};

/**
 * Validate URL and prevent open redirect
 */
export const validateUrl = (url: string, allowedDomains?: string[]): boolean => {
  try {
    const urlObj = new URL(url);
    
    // Only allow http and https
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return false;
    }

    // Check allowed domains if provided
    if (allowedDomains && allowedDomains.length > 0) {
      return allowedDomains.some((domain) => urlObj.hostname.endsWith(domain));
    }

    return true;
  } catch {
    return false;
  }
};

/**
 * Sanitize filename to prevent path traversal
 */
export const sanitizeFilename = (filename: string): string => {
  return filename
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/\.{2,}/g, '_') // Prevent ..
    .replace(/^\.+/, '') // Remove leading dots
    .slice(0, 255);
};

/**
 * Validate file type
 */
export const validateFileType = (file: File, allowedTypes: string[]): boolean => {
  return allowedTypes.includes(file.type);
};

/**
 * Validate file size
 */
export const validateFileSize = (file: File, maxSizeBytes: number): boolean => {
  return file.size <= maxSizeBytes;
};

/**
 * Generate secure random string
 */
export const generateSecureToken = (length: number = 32): string => {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
};

/**
 * Hash string using SubtleCrypto
 */
export const hashString = async (input: string): Promise<string> => {
  if (typeof window === 'undefined' || !window.crypto) {
    throw new Error('Crypto API not available');
  }
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('');
};

/**
 * Validate content length
 */
export const validateLength = (
  content: string,
  minLength: number,
  maxLength: number
): { valid: boolean; error?: string } => {
  if (content.length < minLength) {
    return { valid: false, error: `Content must be at least ${minLength} characters` };
  }
  if (content.length > maxLength) {
    return { valid: false, error: `Content must be less than ${maxLength} characters` };
  }
  return { valid: true };
};

/**
 * Comprehensive content validation
 */
export const validateContent = (content: string): {
  valid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];

  // Check for XSS patterns
  if (/<script|javascript:|onerror=|onload=/i.test(content)) {
    errors.push('Content contains potentially malicious code');
  }

  // Check for SQL injection
  if (detectSqlInjection(content)) {
    errors.push('Content contains SQL injection patterns');
  }

  // Check for NoSQL injection
  if (detectNoSqlInjection(content)) {
    errors.push('Content contains NoSQL injection patterns');
  }

  // Check for excessive special characters (potential obfuscation)
  const specialCharRatio = (content.match(/[^a-zA-Z0-9\s]/g) || []).length / content.length;
  if (specialCharRatio > 0.3) {
    errors.push('Content contains too many special characters');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Prevent timing attacks on string comparison
 */
export const secureCompare = (a: string, b: string): boolean => {
  if (a.length !== b.length) {
    return false;
  }

  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return result === 0;
};

/**
 * CSRF token management
 */
class CsrfTokenManager {
  private token: string | null = null;

  generateToken(): string {
    this.token = generateSecureToken(32);
    sessionStorage.setItem('csrf_token', this.token);
    return this.token;
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = sessionStorage.getItem('csrf_token');
    }
    return this.token;
  }

  validateToken(token: string): boolean {
    const storedToken = this.getToken();
    return storedToken !== null && secureCompare(storedToken, token);
  }

  clearToken(): void {
    this.token = null;
    sessionStorage.removeItem('csrf_token');
  }
}

export const csrfTokenManager = new CsrfTokenManager();

/**
 * Secure session storage wrapper
 */
export const secureSessionStorage = {
  setItem: (key: string, value: string): void => {
    try {
      const encrypted = window.btoa(encodeURIComponent(value));
      sessionStorage.setItem(key, encrypted);
    } catch {
      // Failed to save to session storage
    }
  },

  getItem: (key: string): string | null => {
    try {
      const encrypted = sessionStorage.getItem(key);
      if (!encrypted) return null;
      return decodeURIComponent(window.atob(encrypted));
    } catch {
      // Failed to read from session storage
      return null;
    }
  },

  removeItem: (key: string): void => {
    sessionStorage.removeItem(key);
  },

  clear: (): void => {
    sessionStorage.clear();
  },
};
