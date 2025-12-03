/**
 * GlowingElement - Reusable glowing/pulsing effect
 * Optimized for performance with GPU-accelerated properties
 */

import React from 'react';
import { motion } from 'framer-motion';

interface GlowingElementProps {
  children?: React.ReactNode;
  position: {
    left?: string;
    right?: string;
    top?: string;
    bottom?: string;
  };
  size?: {
    width: string | number;
    height: string | number;
  };
  color: string;
  glowColor: string;
  opacity?: [number, number, number];
  scale?: [number, number, number];
  duration?: number;
  delay?: number;
  className?: string;
}

export const GlowingElement: React.FC<GlowingElementProps> = React.memo(({
  children,
  position,
  size = { width: '0.5rem', height: '0.5rem' },
  color,
  glowColor,
  opacity = [0, 0.8, 0],
  scale = [0.5, 1.5, 0.5],
  duration = 2,
  delay = 0,
  className = '',
}) => {
  return (
    <motion.div
      className={`absolute rounded-full ${className}`}
      style={{
        ...position,
        ...size,
        background: `radial-gradient(circle, ${color} 0%, ${glowColor} 70%)`,
        boxShadow: `0 0 12px ${glowColor}, 0 0 20px ${glowColor}`,
        willChange: 'transform, opacity',
      }}
      animate={{
        opacity,
        scale,
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
});

GlowingElement.displayName = 'GlowingElement';
