/**
 * Centralized validation utilities
 * Production-ready input validation with comprehensive error messages
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validate email address
 */
export function validateEmail(email: string): ValidationResult {
  if (!email || typeof email !== 'string' || email.trim().length === 0) {
    return { isValid: false, error: 'Email is required' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }

  if (email.length > 254) {
    return { isValid: false, error: 'Email is too long' };
  }

  return { isValid: true };
}

/**
 * Validate password strength
 */
export function validatePassword(password: string): ValidationResult {
  if (!password || typeof password !== 'string' || password.length === 0) {
    return { isValid: false, error: 'Password is required' };
  }

  if (password.length < 8) {
    return { isValid: false, error: 'Password must be at least 8 characters long' };
  }

  if (password.length > 128) {
    return { isValid: false, error: 'Password is too long' };
  }

  if (!/[a-z]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one lowercase letter' };
  }

  if (!/[A-Z]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one uppercase letter' };
  }

  if (!/[0-9]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one number' };
  }

  return { isValid: true };
}

/**
 * Validate username
 */
export function validateUsername(username: string): ValidationResult {
  if (!username || typeof username !== 'string' || username.trim().length === 0) {
    return { isValid: false, error: 'Username is required' };
  }

  if (username.length < 3) {
    return { isValid: false, error: 'Username must be at least 3 characters long' };
  }

  if (username.length > 30) {
    return { isValid: false, error: 'Username must be less than 30 characters' };
  }

  if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
    return { isValid: false, error: 'Username can only contain letters, numbers, underscores, and hyphens' };
  }

  return { isValid: true };
}

/**
 * Validate display name
 */
export function validateDisplayName(name: string): ValidationResult {
  if (!name || name.trim().length === 0) {
    return { isValid: false, error: 'Display name is required' };
  }

  if (name.trim().length < 2) {
    return { isValid: false, error: 'Display name must be at least 2 characters long' };
  }

  if (name.length > 50) {
    return { isValid: false, error: 'Display name must be less than 50 characters' };
  }

  return { isValid: true };
}

/**
 * Validate URL
 */
export function validateUrl(url: string): ValidationResult {
  if (!url || typeof url !== 'string' || url.trim().length === 0) {
    return { isValid: false, error: 'URL is required' };
  }

  // Check for dangerous protocols
  const lowerUrl = url.toLowerCase();
  if (lowerUrl.startsWith('javascript:') || lowerUrl.startsWith('data:')) {
    return { isValid: false, error: 'Invalid URL protocol' };
  }

  try {
    const parsedUrl = new URL(url);
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return { isValid: false, error: 'Only HTTP and HTTPS URLs are allowed' };
    }
    return { isValid: true };
  } catch {
    return { isValid: false, error: 'Please enter a valid URL' };
  }
}

/**
 * Validate text content (for posts, comments, etc.)
 */
export function validateTextContent(
  content: string,
  options: {
    minLength?: number;
    maxLength?: number;
    fieldName?: string;
  } = {}
): ValidationResult {
  const { minLength = 1, maxLength = 10000, fieldName = 'Content' } = options;

  if (!content || content.trim().length === 0) {
    return { isValid: false, error: `${fieldName} is required` };
  }

  if (content.trim().length < minLength) {
    return { isValid: false, error: `${fieldName} must be at least ${minLength} characters long` };
  }

  if (content.length > maxLength) {
    return { isValid: false, error: `${fieldName} must be less than ${maxLength} characters` };
  }

  return { isValid: true };
}

/**
 * Validate title
 */
export function validateTitle(title: string): ValidationResult {
  return validateTextContent(title, {
    minLength: 3,
    maxLength: 200,
    fieldName: 'Title',
  });
}

/**
 * Validate file upload
 */
export function validateFile(
  file: File,
  options: {
    maxSize?: number; // in bytes
    allowedTypes?: string[];
  } = {}
): ValidationResult {
  const { maxSize = 5 * 1024 * 1024, allowedTypes = [] } = options; // Default 5MB

  if (!file) {
    return { isValid: false, error: 'No file selected' };
  }

  if (file.size > maxSize) {
    const maxSizeMB = Math.round(maxSize / (1024 * 1024));
    return { isValid: false, error: `File size must be less than ${maxSizeMB}MB` };
  }

  if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
    return { isValid: false, error: `File type not allowed. Allowed types: ${allowedTypes.join(', ')}` };
  }

  return { isValid: true };
}

/**
 * Validate image file
 */
export function validateImage(file: File, maxSizeMB = 5): ValidationResult {
  return validateFile(file, {
    maxSize: maxSizeMB * 1024 * 1024,
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  });
}

/**
 * Validate date
 */
export function validateDate(date: string | Date): ValidationResult {
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    return { isValid: false, error: 'Invalid date' };
  }
  return { isValid: true };
}

/**
 * Validate date range
 */
export function validateDateRange(startDate: string | Date, endDate: string | Date): ValidationResult {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime())) {
    return { isValid: false, error: 'Invalid start date' };
  }

  if (isNaN(end.getTime())) {
    return { isValid: false, error: 'Invalid end date' };
  }

  if (start > end) {
    return { isValid: false, error: 'Start date must be before end date' };
  }

  return { isValid: true };
}

/**
 * Validate number
 */
export function validateNumber(
  value: number | string,
  options: {
    min?: number;
    max?: number;
    integer?: boolean;
    fieldName?: string;
  } = {}
): ValidationResult {
  const { min, max, integer = false, fieldName = 'Value' } = options;

  const num = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(num)) {
    return { isValid: false, error: `${fieldName} must be a valid number` };
  }

  if (integer && !Number.isInteger(num)) {
    return { isValid: false, error: `${fieldName} must be a whole number` };
  }

  if (min !== undefined && num < min) {
    return { isValid: false, error: `${fieldName} must be at least ${min}` };
  }

  if (max !== undefined && num > max) {
    return { isValid: false, error: `${fieldName} must be at most ${max}` };
  }

  return { isValid: true };
}

/**
 * Validate array
 */
export function validateArray<T>(
  array: T[],
  options: {
    minLength?: number;
    maxLength?: number;
    fieldName?: string;
  } = {}
): ValidationResult {
  const { minLength = 0, maxLength = Infinity, fieldName = 'Array' } = options;

  if (!Array.isArray(array)) {
    return { isValid: false, error: `${fieldName} must be an array` };
  }

  if (array.length < minLength) {
    return { isValid: false, error: `${fieldName} must have at least ${minLength} items` };
  }

  if (array.length > maxLength) {
    return { isValid: false, error: `${fieldName} must have at most ${maxLength} items` };
  }

  return { isValid: true };
}

/**
 * Sanitize HTML to prevent XSS
 */
export function sanitizeHtml(html: string): string {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
}

/**
 * Validate and sanitize user input
 */
export function sanitizeInput(input: string | null | undefined): string {
  if (!input || typeof input !== 'string') {
    return '';
  }
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .slice(0, 10000); // Limit length
}

/**
 * Validate hex color
 */
export function validateHexColor(color: string): ValidationResult {
  if (!color) {
    return { isValid: false, error: 'Color is required' };
  }

  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  if (!hexRegex.test(color)) {
    return { isValid: false, error: 'Please enter a valid hex color (e.g., #FF0000)' };
  }

  return { isValid: true };
}

/**
 * Validate phone number (basic)
 */
export function validatePhone(phone: string): ValidationResult {
  if (!phone || phone.trim().length === 0) {
    return { isValid: false, error: 'Phone number is required' };
  }

  const phoneRegex = /^[\d\s\-+()]+$/;
  if (!phoneRegex.test(phone)) {
    return { isValid: false, error: 'Please enter a valid phone number' };
  }

  const digitsOnly = phone.replace(/\D/g, '');
  if (digitsOnly.length < 10 || digitsOnly.length > 15) {
    return { isValid: false, error: 'Phone number must be between 10 and 15 digits' };
  }

  return { isValid: true };
}

/**
 * Batch validate multiple fields
 */
export function validateFields(
  fields: Record<string, unknown>,
  validators: Record<string, (value: unknown) => ValidationResult>
): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  let isValid = true;

  for (const [fieldName, value] of Object.entries(fields)) {
    const validator = validators[fieldName];
    if (validator) {
      const result = validator(value);
      if (!result.isValid) {
        errors[fieldName] = result.error || 'Invalid value';
        isValid = false;
      }
    }
  }

  return { isValid, errors };
}
