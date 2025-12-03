import { Variants } from "framer-motion";

/**
 * Common animation variants to reduce duplication
 */

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

/**
 * Common transition configurations
 */
export const transitions = {
  smooth: { duration: 0.3, ease: "easeInOut" },
  slow: { duration: 0.6, ease: "easeInOut" },
  fast: { duration: 0.15, ease: "easeInOut" },
  spring: { type: "spring", stiffness: 300, damping: 30 },
};

/**
 * Stagger children animation
 */
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

/**
 * Navigation button animations
 */
export const backButtonSlide: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

export const backButtonHover = {
  scale: 1.05,
  x: -4,
  transition: { type: 'spring', stiffness: 400, damping: 17 }
};

export const backButtonTap = {
  scale: 0.95,
  transition: { type: 'spring', stiffness: 400, damping: 17 }
};

/**
 * Glow effect animation for interactive elements
 */
export const glowPulse: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: [0, 0.5, 0],
    scale: [0.8, 1.2, 0.8],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};
