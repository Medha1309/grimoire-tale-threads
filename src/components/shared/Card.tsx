/**
 * Card Component System
 * Reusable card components with variants
 */

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { hoverLift } from '../../utils/animation-system';

interface CardProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  variant?: 'default' | 'elevated' | 'outlined' | 'ghost' | 'book';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  children: React.ReactNode;
  className?: string;
}

const variantClasses = {
  default: 'bg-zinc-900/50 border border-zinc-800/50',
  elevated: 'bg-zinc-900/80 border border-zinc-800/50 shadow-xl',
  outlined: 'bg-transparent border-2 border-zinc-800',
  ghost: 'bg-transparent',
  book: 'bg-gradient-to-r from-[#1a1410] via-[#2a2420] to-[#2a2420] border-r-2 border-[#ffb6d9] shadow-2xl',
};

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = 'md',
  hoverable = false,
  children,
  className = '',
  ...props
}) => {
  const hoverProps = hoverable ? hoverLift : {};

  return (
    <motion.div
      className={`rounded-lg ${variantClasses[variant]} ${paddingClasses[padding]} ${className}`}
      {...hoverProps}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * CardHeader Component
 */
export const CardHeader: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <div className={`mb-4 ${className}`}>{children}</div>
);

/**
 * CardTitle Component
 */
export const CardTitle: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <h3 className={`text-xl font-serif text-zinc-200 ${className}`}>{children}</h3>
);

/**
 * CardDescription Component
 */
export const CardDescription: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <p className={`text-sm text-zinc-500 font-serif ${className}`}>{children}</p>
);

/**
 * CardBody Component
 */
export const CardBody: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <div className={`${className}`}>{children}</div>
);

/**
 * CardFooter Component
 */
export const CardFooter: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <div className={`mt-4 pt-4 border-t border-zinc-800/50 ${className}`}>{children}</div>
);

/**
 * BookCard Component - Specialized card for book-like appearance
 */
interface BookCardProps {
  children: React.ReactNode;
  glowColor?: string;
  onClick?: () => void;
  className?: string;
}

export const BookCard: React.FC<BookCardProps> = ({
  children,
  glowColor = '#ffb6d9',
  onClick,
  className = '',
}) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`group relative cursor-pointer ${className}`}
      style={{ perspective: '1000px' }}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute -inset-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
        style={{
          background: `radial-gradient(circle at center, ${glowColor}40 0%, transparent 70%)`,
        }}
      />

      {/* Book card */}
      <div
        className="relative aspect-[2/3] overflow-hidden rounded-r-lg shadow-2xl"
        style={{
          background:
            'linear-gradient(to right, #1a1410 0%, #2a2420 3%, #3a3430 5%, #2a2420 100%)',
          boxShadow: `-8px 0 16px rgba(0,0,0,0.8), inset -2px 0 4px rgba(0,0,0,0.5), 0 0 20px ${glowColor}30`,
          borderRight: `2px solid ${glowColor}`,
        }}
      >
        {/* Book spine */}
        <div className="absolute left-0 top-0 bottom-0 w-[5%] bg-gradient-to-r from-black/60 to-transparent" />

        {/* Content */}
        {children}

        {/* Page edge highlight */}
        <motion.div
          className="absolute right-0 top-2 bottom-2 w-1 bg-gradient-to-b from-amber-100/10 via-amber-50/5 to-amber-100/10"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  );
};
