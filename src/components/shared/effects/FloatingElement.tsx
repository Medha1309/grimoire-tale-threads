/**
 * FloatingElement - Reusable floating animation component
 * Optimized with memoization and configurable animation
 */

import React from 'react';
import { motion, MotionStyle } from 'framer-motion';

interface FloatingElementProps {
  children: React.ReactNode;
  position: {
    left?: string;
    right?: string;
    top: string;
  };
  opacity?: number;
  filter?: string;
  animation?: {
    y?: number[];
    x?: number[];
    rotate?: number[];
  };
  duration?: number;
  delay?: number;
  className?: string;
  style?: MotionStyle;
}

export const FloatingElement: React.FC<FloatingElementProps> = React.memo(({
  children,
  position,
  opacity = 0.2,
  filter = '',
  animation = { y: [0, -30, 0], rotate: [0, -10, 10, 0] },
  duration = 8,
  delay = 0,
  className = '',
  style = {},
}) => {
  return (
    <motion.div
      className={`absolute ${className}`}
      style={{
        ...position,
        opacity,
        filter,
        willChange: 'transform',
        ...style,
      }}
      animate={animation}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    >
      {children}
    </motion.div>
  );
});

FloatingElement.displayName = 'FloatingElement';
