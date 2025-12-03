/**
 * Error Handler Utility
 * Centralized error handling and logging for the entire app
 */

import { getErrorMessage, MESSAGES } from './messages';

/**
 * Log error to console in development, and to monitoring service in production
 */
export const logError = (context: string, error: any, additionalInfo?: Record<string, any>): void => {
  const errorInfo = {
    context,
    message: error?.message || 'Unknown error',
    code: error?.code,
    stack: error?.stack,
    timestamp: new Date().toISOString(),
    ...additionalInfo,
  };

  // Always log to console in development
  if (import.meta.env.DEV) {
    console.error(`[${context}]`, errorInfo);
  }

  // In production, you could send to a monitoring service like Sentry
  // Example: Sentry.captureException(error, { contexts: { custom: errorInfo } });
};

/**
 * Handle Firestore errors with consistent messaging
 */
export const handleFirestoreError = (error: any, context: string): string => {
  logError(context, error);
  return getErrorMessage(error);
};

/**
 * Handle network errors
 */
export const handleNetworkError = (error: any, context: string): string => {
  logError(context, error);
  
  if (!navigator.onLine) {
    return MESSAGES.GENERAL.OFFLINE_ERROR;
  }
  
  return MESSAGES.GENERAL.NETWORK_ERROR;
};

/**
 * Handle authentication errors
 */
export const handleAuthError = (error: any, context: string): string => {
  logError(context, error);
  return getErrorMessage(error);
};

/**
 * Generic error handler for any operation
 */
export const handleError = (error: any, context: string, fallbackMessage?: string): string => {
  logError(context, error);
  
  const message = getErrorMessage(error);
  return message === MESSAGES.GENERAL.ERROR && fallbackMessage 
    ? fallbackMessage 
    : message;
};

/**
 * Async wrapper that handles errors consistently
 */
export const withErrorHandling = async <T>(
  operation: () => Promise<T>,
  context: string,
  options?: {
    onError?: (error: any) => void;
    fallbackMessage?: string;
    rethrow?: boolean;
  }
): Promise<{ data?: T; error?: string }> => {
  try {
    const data = await operation();
    return { data };
  } catch (error) {
    const errorMessage = handleError(error, context, options?.fallbackMessage);
    
    if (options?.onError) {
      options.onError(error);
    }
    
    if (options?.rethrow) {
      throw error;
    }
    
    return { error: errorMessage };
  }
};
