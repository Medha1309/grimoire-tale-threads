/**
 * Centralized error handling system
 * Production-ready error management with logging and user-friendly messages
 */

import { FirebaseError } from 'firebase/app';

export enum ErrorType {
  NETWORK = 'NETWORK',
  AUTH = 'AUTH',
  VALIDATION = 'VALIDATION',
  PERMISSION = 'PERMISSION',
  NOT_FOUND = 'NOT_FOUND',
  SERVER = 'SERVER',
  CLIENT = 'CLIENT',
  UNKNOWN = 'UNKNOWN',
}

export interface AppError {
  type: ErrorType;
  message: string;
  code?: string;
  details?: unknown;
  timestamp: Date;
  stack?: string;
}

/**
 * Create a standardized error object
 */
export function createError(
  type: ErrorType,
  message: string,
  code?: string,
  details?: unknown
): AppError {
  return {
    type,
    message,
    code,
    details,
    timestamp: new Date(),
    stack: new Error().stack,
  };
}

/**
 * Parse Firebase errors into user-friendly messages
 */
export function parseFirebaseError(error: FirebaseError): AppError {
  const errorMessages: Record<string, string> = {
    // Auth errors
    'auth/email-already-in-use': 'This email is already registered. Please sign in instead.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/operation-not-allowed': 'This operation is not allowed. Please contact support.',
    'auth/weak-password': 'Password is too weak. Please use at least 8 characters with letters and numbers.',
    'auth/user-disabled': 'This account has been disabled. Please contact support.',
    'auth/user-not-found': 'No account found with this email. Please sign up first.',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
    'auth/network-request-failed': 'Network error. Please check your connection and try again.',
    'auth/requires-recent-login': 'Please sign in again to complete this action.',
    'auth/invalid-credential': 'Invalid credentials. Please check your email and password.',
    
    // Firestore errors
    'permission-denied': 'You don\'t have permission to perform this action.',
    'not-found': 'The requested resource was not found.',
    'already-exists': 'This resource already exists.',
    'resource-exhausted': 'Too many requests. Please try again later.',
    'failed-precondition': 'Operation cannot be completed. Please try again.',
    'aborted': 'Operation was aborted. Please try again.',
    'out-of-range': 'Invalid value provided.',
    'unimplemented': 'This feature is not yet available.',
    'internal': 'An internal error occurred. Please try again later.',
    'unavailable': 'Service is temporarily unavailable. Please try again later.',
    'data-loss': 'Data loss detected. Please contact support.',
    'unauthenticated': 'Please sign in to continue.',
    
    // Storage errors
    'storage/unauthorized': 'You don\'t have permission to access this file.',
    'storage/canceled': 'Upload was canceled.',
    'storage/unknown': 'An unknown error occurred during upload.',
    'storage/object-not-found': 'File not found.',
    'storage/bucket-not-found': 'Storage bucket not found.',
    'storage/project-not-found': 'Project not found.',
    'storage/quota-exceeded': 'Storage quota exceeded.',
    'storage/unauthenticated': 'Please sign in to upload files.',
    'storage/retry-limit-exceeded': 'Upload failed after multiple attempts.',
    'storage/invalid-checksum': 'File upload failed. Please try again.',
  };

  // Handle null or undefined code
  const code = error.code || '';
  const message = errorMessages[code] || error.message || 'An unexpected error occurred.';
  
  let type = ErrorType.UNKNOWN;
  if (code && typeof code === 'string') {
    // Check for network errors first (before auth check)
    if (code === 'network-request-failed' || code === 'unavailable' || code === 'auth/network-request-failed') {
      type = ErrorType.NETWORK;
    } else if (code.startsWith('auth/')) {
      type = ErrorType.AUTH;
    } else if (code === 'permission-denied' || code === 'unauthenticated') {
      type = ErrorType.PERMISSION;
    } else if (code === 'not-found') {
      type = ErrorType.NOT_FOUND;
    }
  }

  return createError(type, message, code, error);
}

/**
 * Parse generic errors
 */
export function parseError(error: unknown): AppError {
  // Firebase error (has code property and is object)
  if (error && typeof error === 'object' && 'code' in error && error.code !== undefined) {
    return parseFirebaseError(error as FirebaseError);
  }

  // Standard Error object
  if (error instanceof Error) {
    return createError(ErrorType.CLIENT, error.message, undefined, error);
  }

  // String error
  if (typeof error === 'string') {
    return createError(ErrorType.CLIENT, error);
  }

  // Unknown error
  return createError(ErrorType.UNKNOWN, 'An unexpected error occurred.');
}

/**
 * Log error to console (in development) or external service (in production)
 */
export function logError(error: AppError): void {
  if (import.meta.env.DEV) {
    console.error('[Error]', {
      type: error.type,
      message: error.message,
      code: error.code,
      timestamp: error.timestamp,
      details: error.details,
      stack: error.stack,
    });
  } else {
    // In production, send to error tracking service (e.g., Sentry)
    // For now, just log to console
    console.error('[Production Error]', error.message, error.code);
  }
}

/**
 * Handle error with logging and optional callback
 */
export function handleError(
  error: unknown,
  onError?: (error: AppError) => void
): AppError {
  const appError = parseError(error);
  logError(appError);
  
  if (onError) {
    onError(appError);
  }
  
  return appError;
}

/**
 * Async error handler wrapper
 */
export function withErrorHandling<T extends (...args: unknown[]) => Promise<unknown>>(
  fn: T,
  onError?: (error: AppError) => void
): T {
  return (async (...args: Parameters<T>) => {
    try {
      return await fn(...args);
    } catch (error) {
      const appError = handleError(error, onError);
      throw appError;
    }
  }) as T;
}

/**
 * Retry function with error handling
 */
export async function retryWithErrorHandling<T>(
  fn: () => Promise<T>,
  options: {
    maxAttempts?: number;
    delay?: number;
    backoff?: number;
    onError?: (error: AppError, attempt: number) => void;
  } = {}
): Promise<T> {
  const { maxAttempts = 3, delay = 1000, backoff = 2, onError } = options;
  
  let lastError: AppError;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = parseError(error);
      logError(lastError);
      
      if (onError) {
        onError(lastError, attempt);
      }
      
      if (attempt < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(backoff, attempt - 1)));
      }
    }
  }
  
  throw lastError!;
}

/**
 * Get user-friendly error message
 */
export function getUserMessage(error: unknown): string {
  const appError = parseError(error);
  return appError.message;
}

/**
 * Check if error is of specific type
 */
export function isErrorType(error: unknown, type: ErrorType): boolean {
  const appError = parseError(error);
  return appError.type === type;
}

/**
 * Check if error is network-related
 */
export function isNetworkError(error: unknown): boolean {
  return isErrorType(error, ErrorType.NETWORK);
}

/**
 * Check if error is auth-related
 */
export function isAuthError(error: unknown): boolean {
  return isErrorType(error, ErrorType.AUTH);
}

/**
 * Check if error is permission-related
 */
export function isPermissionError(error: unknown): boolean {
  return isErrorType(error, ErrorType.PERMISSION);
}

/**
 * Create a safe async function that never throws
 */
export function safe<T extends (...args: unknown[]) => Promise<unknown>>(
  fn: T
): (...args: Parameters<T>) => Promise<{ data?: Awaited<ReturnType<T>>; error?: AppError }> {
  return async (...args: Parameters<T>) => {
    try {
      const data = await fn(...args);
      return { data: data as Awaited<ReturnType<T>> };
    } catch (error) {
      const appError = handleError(error);
      return { error: appError };
    }
  };
}

/**
 * Assert condition and throw error if false
 */
export function assert(condition: boolean, message: string, type = ErrorType.CLIENT): asserts condition {
  if (!condition) {
    throw createError(type, message);
  }
}

/**
 * Validate and throw if invalid
 */
export function validate(isValid: boolean, message: string): void {
  if (!isValid) {
    throw createError(ErrorType.VALIDATION, message);
  }
}
