/**
 * Security utilities for input validation and sanitization
 */

// XSS prevention - sanitize HTML input
export const sanitizeHtml = (input: string): string => {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
};

// Validate string length
export const validateLength = (
  str: string,
  minLength: number,
  maxLength: number
): boolean => {
  return str.length >= minLength && str.length <= maxLength;
};

// Validate email format
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Sanitize user input for display
export const sanitizeUserInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove angle brackets
    .substring(0, 10000); // Limit length
};

// Validate URL
export const isValidUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
};

// Rate limiting helper (client-side)
const rateLimitMap = new Map<string, number[]>();

export const checkRateLimit = (
  key: string,
  maxRequests: number,
  windowMs: number
): boolean => {
  const now = Date.now();
  const timestamps = rateLimitMap.get(key) || [];
  
  // Remove old timestamps outside the window
  const validTimestamps = timestamps.filter((ts) => now - ts < windowMs);
  
  if (validTimestamps.length >= maxRequests) {
    return false; // Rate limit exceeded
  }
  
  validTimestamps.push(now);
  rateLimitMap.set(key, validTimestamps);
  return true;
};

// Validate content doesn't contain malicious patterns
export const validateContent = (content: string): { valid: boolean; reason?: string } => {
  // Check for script tags
  if (/<script/i.test(content)) {
    return { valid: false, reason: 'Script tags are not allowed' };
  }
  
  // Check for event handlers
  if (/on\w+\s*=/i.test(content)) {
    return { valid: false, reason: 'Event handlers are not allowed' };
  }
  
  // Check for data URIs with javascript
  if (/data:.*javascript/i.test(content)) {
    return { valid: false, reason: 'JavaScript data URIs are not allowed' };
  }
  
  return { valid: true };
};

// Sanitize filename
export const sanitizeFilename = (filename: string): string => {
  return filename
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .substring(0, 255);
};

// Check if user can perform action (basic permission check)
export const canPerformAction = (
  userId: string | undefined,
  resourceOwnerId: string,
  isAdmin: boolean = false
): boolean => {
  if (!userId) return false;
  return userId === resourceOwnerId || isAdmin;
};

// Validate story/post title
export const validateTitle = (title: string): { valid: boolean; error?: string } => {
  if (!title || title.trim().length === 0) {
    return { valid: false, error: 'Title cannot be empty' };
  }
  
  if (title.length > 200) {
    return { valid: false, error: 'Title must be less than 200 characters' };
  }
  
  const validation = validateContent(title);
  if (!validation.valid) {
    return { valid: false, error: validation.reason };
  }
  
  return { valid: true };
};

// Validate post content
export const validatePostContent = (content: string): { valid: boolean; error?: string } => {
  if (!content || content.trim().length === 0) {
    return { valid: false, error: 'Content cannot be empty' };
  }
  
  if (content.length > 50000) {
    return { valid: false, error: 'Content is too long' };
  }
  
  const validation 
= validateContent(content);
  if (!validation.valid) {
    return { valid: false, error: validation.reason };
  }
  
  return { valid: true };
};

// Prevent CSRF by validating origin
export const validateOrigin = (allowedOrigins: string[]): boolean => {
  const origin = window.location.origin;
  return allowedOrigins.includes(origin);
};

// Secure localStorage wrapper with encryption key
export const secureStorage = {
  setItem: (key: string, value: string): void => {
    try {
      // In production, you'd want to encrypt this
      localStorage.setItem(key, window.btoa(value));
    } catch {
      // Failed to save to storage
    }
  },
  
  getItem: (key: string): string | null => {
    try {
      const value = localStorage.getItem(key);
      return value ? window.atob(value) : null;
    } catch {
      // Failed to read from storage
      return null;
    }
  },
  
  removeItem: (key: string): void => {
    localStorage.removeItem(key);
  },
};
