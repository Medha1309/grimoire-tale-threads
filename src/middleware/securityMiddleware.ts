/**
 * Security Middleware
 * Centralized security checks for all operations
 */

import { checkRateLimit, RATE_LIMITS } from '../utils/rateLimiter';
import { validateContent, sanitizeInput, validateEmail } from '../utils/securityEnhanced';
import {
  logRateLimitViolation,
  logValidationFailure,
  logXssAttempt,
  logInjectionAttempt,
} from '../utils/securityMonitor';

export interface SecurityCheckResult {
  allowed: boolean;
  error?: string;
  rateLimitInfo?: {
    remaining: number;
    resetIn: number;
  };
}

/**
 * Check if user can perform action
 */
export const checkActionPermission = (
  userId: string | undefined,
  action: keyof typeof RATE_LIMITS,
  content?: string
): SecurityCheckResult => {
  // Check rate limit
  const rateLimit = checkRateLimit(userId, action);
  
  if (!rateLimit.allowed) {
    logRateLimitViolation(userId, action, rateLimit.remaining);
    return {
      allowed: false,
      error: rateLimit.blocked 
        ? 'You have been temporarily blocked due to excessive requests'
        : 'Rate limit exceeded. Please try again later.',
      rateLimitInfo: {
        remaining: rateLimit.remaining,
        resetIn: rateLimit.resetIn,
      },
    };
  }

  // Validate content if provided
  if (content) {
    const contentValidation = validateContent(content);
    if (!contentValidation.valid) {
      logValidationFailure(userId, action, contentValidation.errors);
      
      // Log specific attack types
      if (contentValidation.errors.some(e => e.includes('malicious code'))) {
        logXssAttempt(userId, content);
      }
      if (contentValidation.errors.some(e => e.includes('injection'))) {
        const type = contentValidation.errors.some(e => e.includes('SQL')) ? 'sql' : 'nosql';
        logInjectionAttempt(userId, type, content);
      }
      
      return {
        allowed: false,
        error: contentValidation.errors.join(', '),
      };
    }
  }

  return {
    allowed: true,
    rateLimitInfo: {
      remaining: rateLimit.remaining,
      resetIn: rateLimit.resetIn,
    },
  };
};

/**
 * Validate post creation
 */
export const validatePostCreation = (
  title: string,
  content: string
): SecurityCheckResult => {
  // Sanitize inputs
  const sanitizedTitle = sanitizeInput(title, 200);
  const sanitizedContent = sanitizeInput(content, 10000);

  // Validate lengths
  if (sanitizedTitle.length < 1 || sanitizedTitle.length > 200) {
    return { allowed: false, error: 'Title must be between 1 and 200 characters' };
  }

  if (sanitizedContent.length < 1 || sanitizedContent.length > 10000) {
    return { allowed: false, error: 'Content must be between 1 and 10000 characters' };
  }

  // Validate content
  const titleValidation = validateContent(sanitizedTitle);
  if (!titleValidation.valid) {
    return { allowed: false, error: `Title: ${titleValidation.errors.join(', ')}` };
  }

  const contentValidation = validateContent(sanitizedContent);
  if (!contentValidation.valid) {
    return { allowed: false, error: `Content: ${contentValidation.errors.join(', ')}` };
  }

  return { allowed: true };
};

/**
 * Validate contact form submission
 */
export const validateContactForm = (
  name: string,
  email: string,
  message: string
): SecurityCheckResult => {
  // Sanitize inputs
  const sanitizedName = sanitizeInput(name, 100);
  const sanitizedEmail = sanitizeInput(email, 254);
  const sanitizedMessage = sanitizeInput(message, 5000);

  // Validate name
  if (sanitizedName.length < 1 || sanitizedName.length > 100) {
    return { allowed: false, error: 'Name must be between 1 and 100 characters' };
  }

  // Validate email
  if (!validateEmail(sanitizedEmail)) {
    return { allowed: false, error: 'Invalid email address' };
  }

  // Validate message
  if (sanitizedMessage.length < 10 || sanitizedMessage.length > 5000) {
    return { allowed: false, error: 'Message must be between 10 and 5000 characters' };
  }

  const messageValidation = validateContent(sanitizedMessage);
  if (!messageValidation.valid) {
    return { allowed: false, error: messageValidation.errors.join(', ') };
  }

  return { allowed: true };
};

/**
 * Validate user profile update
 */
export const validateProfileUpdate = (
  displayName?: string,
  bio?: string
): SecurityCheckResult => {
  if (displayName) {
    const sanitized = sanitizeInput(displayName, 50);
    if (sanitized.length < 1 || sanitized.length > 50) {
      return { allowed: false, error: 'Display name must be between 1 and 50 characters' };
    }

    const validation = validateContent(sanitized);
    if (!validation.valid) {
      return { allowed: false, error: validation.errors.join(', ') };
    }
  }

  if (bio) {
    const sanitized = sanitizeInput(bio, 500);
    if (sanitized.length > 500) {
      return { allowed: false, error: 'Bio must be less than 500 characters' };
    }

    const validation = validateContent(sanitized);
    if (!validation.valid) {
      return { allowed: false, error: validation.errors.join(', ') };
    }
  }

  return { allowed: true };
};
