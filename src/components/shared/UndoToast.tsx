/**
 * UndoToast Component
 * Shows after archiving with undo option
 */

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface UndoToastProps {
  show: boolean;
  message: string;
  onUndo: () => void;
  onClose: () => void;
  duration?: number;
}

export const UndoToast: React.FC<UndoToastProps> = ({
  show,
  message,
  onUndo,
  onClose,
  duration = 5000,
}) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-5 py-3 rounded-lg backdrop-blur-md shadow-2xl"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            border: '1px solid rgba(255, 182, 217, 0.3)',
          }}
        >
          <p className="text-sm font-serif" style={{ color: '#ffb6d9' }}>
            {message}
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onUndo}
            className="px-3 py-1 rounded text-xs font-serif transition-all"
            style={{
              backgroundColor: 'rgba(255, 182, 217, 0.2)',
              border: '1px solid rgba(255, 182, 217, 0.5)',
              color: '#ffb6d9',
            }}
          >
            Undo
          </motion.button>

          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
