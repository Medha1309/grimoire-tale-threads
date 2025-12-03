/**
 * ErrorState Component
 * Reusable error state with message and retry action
 */

import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, transitions } from '../../utils/animation-system';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
  icon?: string;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message,
  onRetry,
  retryLabel = 'Try Again',
  icon = '⚠️',
  className = '',
}) => {
  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      transition={transitions.smooth}
      className={`flex flex-col items-center justify-center py-20 ${className}`}
    >
      {/* Error icon */}
      <motion.div
        className="mb-6 text-6xl"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {icon}
      </motion.div>

      {/* Title */}
      <h3 className="text-red-400 text-xl font-serif mb-2">{title}</h3>

      {/* Message */}
      <p className="text-zinc-500 text-sm font-serif mb-8 max-w-md text-center">
        {message}
      </p>

      {/* Retry button */}
      {onRetry && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRetry}
          className="px-6 py-3 border border-red-900/40 rounded-lg 
                   text-red-400 font-serif text-sm
                   hover:bg-red-900/10 transition-colors"
        >
          {retryLabel}
        </motion.button>
      )}
    </motion.div>
  );
};

// Preset error states for common scenarios
export const ErrorStates = {
  LoadFailed: (onRetry?: () => void) => (
    <ErrorState
      icon="❌"
      title="Failed to Load"
      message="We couldn't load this content. Check your connection and try again."
      onRetry={onRetry}
    />
  ),

  NotFound: () => (
    <ErrorState
      icon="🔍"
      title="Not Found"
      message="The content you're looking for doesn't exist or has been removed."
    />
  ),

  Unauthorized: () => (
    <ErrorState
      icon="🔒"
      title="Access Denied"
      message="You don't have permission to view this content. Please sign in."
    />
  ),

  NetworkError: (onRetry?: () => void) => (
    <ErrorState
      icon="📡"
      title="Connection Error"
      message="Unable to connect to the server. Check your internet connection."
      onRetry={onRetry}
    />
  ),

  ServerError: (onRetry?: () => void) => (
    <ErrorState
      icon="🔥"
      title="Server Error"
      message="Something went wrong on our end. We're working to fix it."
      onRetry={onRetry}
    />
  ),
};
