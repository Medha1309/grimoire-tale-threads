/**
 * Standardized notification system
 * Provides consistent toast notifications across the app
 */

import { MESSAGES } from './messages';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface NotificationOptions {
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

/**
 * Notification manager for consistent toast messages
 * This should be used with a toast library or custom toast component
 */
class NotificationManager {
  private listeners: Set<(notification: {
    message: string;
    type: NotificationType;
    options?: NotificationOptions;
  }) => void> = new Set();

  /**
   * Subscribe to notification events
   */
  subscribe(listener: (notification: {
    message: string;
    type: NotificationType;
    options?: NotificationOptions;
  }) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /**
   * Show a notification
   */
  private notify(message: string, type: NotificationType, options?: NotificationOptions): void {
    this.listeners.forEach(listener => listener({ message, type, options }));
  }

  /**
   * Show success notification
   */
  success(message: string, options?: NotificationOptions): void {
    this.notify(message, 'success', options);
  }

  /**
   * Show error notification
   */
  error(message: string, options?: NotificationOptions): void {
    this.notify(message, 'error', options);
  }

  /**
   * Show info notification
   */
  info(message: string, options?: NotificationOptions): void {
    this.notify(message, 'info', options);
  }

  /**
   * Show warning notification
   */
  warning(message: string, options?: NotificationOptions): void {
    this.notify(message, 'warning', options);
  }

  // Convenience methods for common operations
  
  saved(itemType: string = 'Item'): void {
    this.success(`${itemType} saved successfully`);
  }

  deleted(itemType: string = 'Item'): void {
    this.success(`${itemType} deleted successfully`);
  }

  updated(itemType: string = 'Item'): void {
    this.success(`${itemType} updated successfully`);
  }

  saveFailed(itemType: string = 'Item'): void {
    this.error(`Failed to save ${itemType.toLowerCase()}`);
  }

  deleteFailed(itemType: string = 'Item'): void {
    this.error(`Failed to delete ${itemType.toLowerCase()}`);
  }

  updateFailed(itemType: string = 'Item'): void {
    this.error(`Failed to update ${itemType.toLowerCase()}`);
  }

  loadFailed(itemType: string = 'content'): void {
    this.error(`Failed to load ${itemType}`);
  }

  networkError(): void {
    this.error(MESSAGES.GENERAL.NETWORK_ERROR);
  }

  permissionDenied(): void {
    this.error(MESSAGES.GENERAL.PERMISSION_DENIED);
  }

  notFound(itemType: string = 'Content'): void {
    this.error(`${itemType} not found`);
  }

  unauthorized(): void {
    this.error(MESSAGES.AUTH.UNAUTHORIZED);
  }
}

// Export singleton instance
export const notify = new NotificationManager();

// Export convenience functions
export const showSuccess = (message: string, options?: NotificationOptions) => 
  notify.success(message, options);

export const showError = (message: string, options?: NotificationOptions) => 
  notify.error(message, options);

export const showInfo = (message: string, options?: NotificationOptions) => 
  notify.info(message, options);

export const showWarning = (message: string, options?: NotificationOptions) => 
  notify.warning(message, options);

// Alias for backward compatibility
export const showToast = showSuccess;
