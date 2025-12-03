/**
 * AutoSaveIndicator Component
 * Shows auto-save status with visual feedback
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatTimeAgo } from '../../utils/writingStats';

interface AutoSaveIndicatorProps {
  status: 'idle' | 'saving' | 'saved' | 'error';
  lastSaved?: Date;
}

const getStatusText = (status: AutoSaveIndicatorProps['status'], lastSaved?: Date): string => {
  switch (status) {
    case 'saving':
      return 'Saving...';
    case 'saved':
      return lastSaved ? `Saved ${formatTimeAgo(lastSaved)}` : 'All changes saved';
    case 'error':
      return 'Failed to save';
    default:
      return '';
  }
};

export const AutoSaveIndicator: React.FC<AutoSaveIndicatorProps> = ({
  status,
  lastSaved,
}) => {
  const statusText = getStatusText(status, lastSaved);

  return (
    <AnimatePresence>
      {status !== 'idle' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="flex items-center gap-2 text-xs font-mono"
        >
          {/* Status Icon */}
          {status === 'saving' && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-3 h-3 border-2 border-[#ffb6d9] border-t-transparent rounded-full"
            />
          )}
          
          {status === 'saved' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-3 h-3 rounded-full bg-green-500/80"
            >
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 0.3 }}
                className="w-full h-full rounded-full bg-green-400"
              />
            </motion.div>
          )}
          
          {status === 'error' && (
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5, repeat: 2 }}
              className="w-3 h-3 rounded-full bg-red-500/80"
            />
          )}

          {/* Status Text */}
          <span
            className={`
              ${status === 'saving' ? 'text-zinc-500' : ''}
              ${status === 'saved' ? 'text-green-500/80' : ''}
              ${status === 'error' ? 'text-red-500/80' : ''}
            `}
          >
            {statusText}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
