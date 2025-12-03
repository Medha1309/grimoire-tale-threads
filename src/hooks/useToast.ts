import { useState, useCallback, useEffect } from 'react';
import { notify, NotificationType, NotificationOptions } from '../utils/notifications';

export type ToastType = NotificationType;

interface ToastState {
  message: string;
  type: ToastType;
  isVisible: boolean;
  options?: NotificationOptions;
}

/**
 * Custom hook for managing toast notifications
 * Provides a consistent way to show messages across the app
 * Integrates with the centralized notification system
 */
export const useToast = () => {
  const [toast, setToast] = useState<ToastState>({
    message: '',
    type: 'success',
    isVisible: false,
  });

  // Subscribe to global notifications
  useEffect(() => {
    const unsubscribe = notify.subscribe(({ message, type, options }) => {
      setToast({
        message,
        type,
        isVisible: true,
        options,
      });
    });

    return unsubscribe;
  }, []);

  const showToast = useCallback((message: string, type: ToastType = 'success', options?: NotificationOptions) => {
    setToast({
      message,
      type,
      isVisible: true,
      options,
    });
  }, []);

  const hideToast = useCallback(() => {
    setToast(prev => ({ ...prev, isVisible: false }));
  }, []);

  const showSuccess = useCallback((message: string, options?: NotificationOptions) => {
    showToast(message, 'success', options);
  }, [showToast]);

  const showError = useCallback((message: string, options?: NotificationOptions) => {
    showToast(message, 'error', options);
  }, [showToast]);

  const showInfo = useCallback((message: string, options?: NotificationOptions) => {
    showToast(message, 'info', options);
  }, [showToast]);

  const showWarning = useCallback((message: string, options?: NotificationOptions) => {
    showToast(message, 'warning', options);
  }, [showToast]);

  return {
    toast,
    showToast,
    hideToast,
    showSuccess,
    showError,
    showInfo,
    showWarning,
  };
};
