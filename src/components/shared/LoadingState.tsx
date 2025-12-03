/**
 * LoadingState Component
 * Reusable loading state with spinner and message
 */

import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn, transitions } from '../../utils/animation-system';

interface LoadingStateProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-6 h-6',
  md: 'w-10 h-10',
  lg: 'w-16 h-16',
};

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading...',
  size = 'md',
  className = '',
}) => {
  return (
    <motion.div
      variants={fadeIn}
      initial="initial"
      animate="animate"
      transition={transitions.smooth}
      className={`flex flex-col items-center justify-center py-20 ${className}`}
    >
      {/* Spinner */}
      <motion.div
        className={`${sizeClasses[size]} border-4 border-fog-light/20 border-t-fog-light rounded-full`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Message */}
      {message && (
        <p className="mt-6 text-zinc-400 text-sm font-serif">{message}</p>
      )}
    </motion.div>
  );
};
