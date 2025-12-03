/**
 * Unified Animation System
 * Single source of truth for all animations in the app
 */

import { Variants, Transition } from 'framer-motion';

// ============================================================================
// TRANSITIONS - Reusable timing configurations
// ============================================================================

export const transitions = {
  fast: { duration: 0.15, ease: 'easeInOut' } as Transition,
  smooth: { duration: 0.3, ease: 'easeInOut' } as Transition,
  slow: { duration: 0.6, ease: 'easeInOut' } as Transition,
  spring: { type: 'spring' as const, stiffness: 300, damping: 30 },
  springBouncy: { type: 'spring' as const, stiffness: 400, damping: 20 },
  springSoft: { type: 'spring' as const, stiffness: 200, damping: 25 },
};

// ============================================================================
// BASIC ANIMATIONS - Simple, composable variants
// ============================================================================

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const fadeInDown: Variants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

export const slideInFromLeft: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

export const slideInFromRight: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

export const slideUp: Variants = {
  initial: { y: '100%', opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: '100%', opacity: 0 },
};

export const slideDown: Variants = {
  initial: { y: '-100%', opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: '-100%', opacity: 0 },
};

// ============================================================================
// PAGE ANIMATIONS - For route transitions
// ============================================================================

export const pageVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

// ============================================================================
// MODAL ANIMATIONS - For overlays and dialogs
// ============================================================================

export const modalBackdrop: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const modalContent: Variants = {
  initial: { opacity: 0, scale: 0.95, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: 20 },
};

// ============================================================================
// STAGGER ANIMATIONS - For lists and grids
// ============================================================================

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

// Configurable stagger
export const createStaggerContainer = (staggerDelay: number = 0.1): Variants => ({
  initial: {},
  animate: {
    transition: {
      staggerChildren: staggerDelay,
    },
  },
});

// ============================================================================
// HOVER ANIMATIONS - For interactive elements
// ============================================================================

export const hoverScale = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
};

export const hoverLift = {
  whileHover: { y: -5, scale: 1.02 },
  whileTap: { scale: 0.98 },
};

export const hoverGlow = (color: string = 'rgba(255, 182, 217, 0.6)') => ({
  whileHover: {
    filter: `drop-shadow(0 0 15px ${color}) drop-shadow(0 0 30px ${color})`,
  },
});

// ============================================================================
// THEME-SPECIFIC ANIMATIONS - Horror/Gothic effects
// ============================================================================

export const waxSealVariants: Variants = {
  sealed: {
    scale: 1,
    rotate: 0,
    filter: 'brightness(1)',
  },
  melting: {
    scale: [1, 1.1, 0.9, 0],
    rotate: [0, 5, -5, 0],
    filter: ['brightness(1)', 'brightness(1.2)', 'brightness(0.8)', 'brightness(0)'],
  },
};

export const candleGlowVariants: Variants = {
  idle: {
    filter: 'brightness(1) drop-shadow(0 0 4px rgba(184,155,62,0.3))',
  },
  active: {
    filter: 'brightness(1.5) drop-shadow(0 0 12px rgba(184,155,62,0.8))',
  },
};

export const flickerAnimation = {
  animate: {
    opacity: [0, 1, 0, 1, 0.7, 0],
  },
  transition: {
    duration: 0.3,
    ease: 'easeInOut',
  },
};

// ============================================================================
// DECORATIVE ANIMATIONS - Background elements
// ============================================================================

export const floatingAnimation = (delay: number = 0, duration: number = 8) => ({
  animate: {
    y: [0, -30, 0],
    x: [0, 15, 0],
  },
  transition: {
    duration,
    repeat: Infinity,
    delay,
    ease: 'easeInOut',
  },
});

export const breathingAnimation = (duration: number = 3) => ({
  animate: {
    opacity: [0.5, 0.8, 0.5],
  },
  transition: {
    duration,
    repeat: Infinity,
    ease: 'easeInOut',
  },
});

export const pulseAnimation = (scale: number = 1.02, duration: number = 2) => ({
  animate: {
    scale: [1, scale, 1],
  },
  transition: {
    duration,
    repeat: Infinity,
    ease: 'easeInOut',
  },
});

export const glowAnimation = (color: string = 'rgba(255, 182, 217, 0.6)', duration: number = 2) => ({
  animate: {
    filter: [
      `drop-shadow(0 0 10px ${color}) drop-shadow(0 0 20px ${color})`,
      `drop-shadow(0 0 15px ${color}) drop-shadow(0 0 30px ${color})`,
      `drop-shadow(0 0 10px ${color}) drop-shadow(0 0 20px ${color})`,
    ],
  },
  transition: {
    duration,
    repeat: Infinity,
    ease: 'easeInOut',
  },
});

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Combine multiple variants into one
 */
export const combineVariants = (...variants: Variants[]): Variants => {
  return variants.reduce((acc, variant) => ({ ...acc, ...variant }), {});
};

/**
 * Create a delayed variant
 */
export const withDelay = (variant: Variants, delay: number): Variants => {
  const result: Variants = {};
  Object.keys(variant).forEach((key) => {
    const value = variant[key];
    if (typeof value === 'object' && value !== null) {
      result[key] = {
        ...value,
        transition: {
          ...(typeof value === 'object' && 'transition' in value ? value.transition : {}),
          delay,
        },
      };
    } else {
      result[key] = value;
    }
  });
  return result;
};

/**
 * Throttled mouse tracking utility
 */
export const createThrottledMouseTracker = (
  callback: (x: number, y: number) => void,
  throttleMs: number = 50
) => {
  let rafId: number;
  let lastUpdate = 0;

  return (e: MouseEvent) => {
    const now = Date.now();
    if (now - lastUpdate < throttleMs) return;

    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      callback(e.clientX, e.clientY);
      lastUpdate = now;
    });
  };
};

/**
 * Cleanup function for throttled mouse tracker
 */
export const cleanupMouseTracker = (rafId?: number) => {
  if (rafId) cancelAnimationFrame(rafId);
};
