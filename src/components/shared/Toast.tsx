import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  message: string;
  type?: ToastType;
  isVisible: boolean;
  onClose?: () => void;
  duration?: number;
}

/**
 * Reusable Toast component for consistent notifications across the app
 */
export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'success',
  isVisible,
  onClose,
  duration = 4000,
}) => {
  React.useEffect(() => {
    if (isVisible && onClose && duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, duration]);

  const styles = {
    success: {
      bg: 'bg-green-950/90',
      border: 'border-green-900/50',
      text: 'text-green-300',
    },
    error: {
      bg: 'bg-red-950/90',
      border: 'border-red-900/50',
      text: 'text-red-300',
    },
    info: {
      bg: 'bg-blue-950/90',
      border: 'border-blue-900/50',
      text: 'text-blue-300',
    },
    warning: {
      bg: 'bg-amber-950/90',
      border: 'border-amber-900/50',
      text: 'text-amber-300',
    },
  };

  const style = styles[type];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className={`fixed top-24 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-2xl backdrop-blur-md border ${style.bg} ${style.border} ${style.text} max-w-md`}
        >
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">{message}</span>
            {onClose && (
              <button
                onClick={onClose}
                className="ml-2 text-zinc-400 hover:text-zinc-200 transition"
                aria-label="Close notification"
              >
                ×
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
