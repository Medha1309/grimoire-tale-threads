/**
 * Standardized Back Button Component
 * Consistent back navigation across the app
 */

import React from 'react';
import { motion } from 'framer-motion';

interface BackButtonProps {
  onClick: () => void;
  label?: string;
  variant?: 'default' | 'minimal' | 'ghost';
  className?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({
  onClick,
  label,
  variant = 'default',
  className = '',
}) => {
  const baseStyles = 'inline-flex items-center gap-2 font-serif transition-all duration-300';
  
  const variantStyles = {
    default: 'px-4 py-2 rounded-lg bg-zinc-800/50 text-zinc-300 hover:text-white hover:bg-zinc-800 border border-zinc-700/50 hover:border-zinc-600',
    minimal: 'px-3 py-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/30',
    ghost: 'text-zinc-400 hover:text-white',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05, x: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      aria-label="Go back"
    >
      <svg 
        className="w-5 h-5" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M15 19l-7-7 7-7" 
        />
      </svg>
      {label && <span className="text-sm">{label}</span>}
    </motion.button>
  );
};
