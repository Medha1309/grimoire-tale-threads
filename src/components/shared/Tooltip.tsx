/**
 * Tooltip Component
 * Reusable tooltip for hover hints
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  delay = 500,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    const id = setTimeout(() => setIsVisible(true), delay);
    setTimeoutId(id);
  };

  const handleMouseLeave = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setIsVisible(false);
  };

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={`absolute z-50 px-2 py-1 text-xs text-zinc-100 bg-zinc-900 border border-zinc-700 rounded shadow-lg whitespace-nowrap pointer-events-none ${positionClasses[position]}`}
          >
            {content}
            {/* Arrow */}
            <div
              className={`absolute w-2 h-2 bg-zinc-900 border-zinc-700 transform rotate-45 ${
                position === 'top'
                  ? 'top-full left-1/2 -translate-x-1/2 -mt-1 border-r border-b'
                  : position === 'bottom'
                  ? 'bottom-full left-1/2 -translate-x-1/2 -mb-1 border-l border-t'
                  : position === 'left'
                  ? 'left-full top-1/2 -translate-y-1/2 -ml-1 border-t border-r'
                  : 'right-full top-1/2 -translate-y-1/2 -mr-1 border-b border-l'
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
