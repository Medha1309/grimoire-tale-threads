/**
 * Animation Utilities
 * Framer Motion variants for consistent animations across the app
 */

import { Variants } from 'framer-motion';

/**
 * Page transition animations
 */
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.4 } 
  },
  exit: { 
    opacity: 0, 
    y: -20, 
    transition: { duration: 0.3 } 
  }
};

/**
 * Modal animations with spring effect
 */
export const modalVariants: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.95, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { 
      type: "spring", 
      damping: 25, 
      stiffness: 300 
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    y: 20,
    transition: { duration: 0.2 }
  }
};

/**
 * Wax seal animation for post submission and diary locking
 */
export const waxSealVariants: Variants = {
  sealed: { 
    scale: 1, 
    rotate: 0,
    filter: "brightness(1)"
  },
  melting: { 
    scale: [1, 1.1, 0.9, 0],
    rotate: [0, 5, -5, 0],
    filter: [
      "brightness(1)", 
      "brightness(1.2)", 
      "brightness(0.8)", 
      "brightness(0)"
    ],
    transition: { 
      duration: 1.5, 
      times: [0, 0.3, 0.7, 1] 
    }
  }
};

/**
 * Candle glow animation for like buttons
 */
export const candleGlowVariants: Variants = {
  idle: { 
    filter: "brightness(1) drop-shadow(0 0 4px rgba(184,155,62,0.3))",
    transition: { 
      duration: 2, 
      repeat: Infinity, 
      repeatType: "reverse" as const
    }
  },
  active: { 
    filter: "brightness(1.5) drop-shadow(0 0 12px rgba(184,155,62,0.8))",
    transition: { duration: 0.3 }
  }
};

/**
 * Stagger container for animating lists of items
 */
export const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

/**
 * Stagger item for individual items in a list
 */
export const staggerItem: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

/**
 * Fade in animation
 */
export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1, 
    transition: { duration: 0.4 } 
  },
  exit: { 
    opacity: 0, 
    transition: { duration: 0.3 } 
  }
};

/**
 * Scale animation for hover effects
 */
export const scaleOnHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 }
};

/**
 * Slide up animation for modals and drawers
 */
export const slideUp: Variants = {
  initial: { y: "100%", opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: "spring",
      damping: 30,
      stiffness: 300
    }
  },
  exit: { 
    y: "100%", 
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

/**
 * Performance-optimized flicker animation
 * Uses GPU-accelerated properties only
 */
export const flickerAnimation = {
  animate: {
    opacity: [0, 1, 0, 1, 0.7, 0],
  },
  transition: {
    duration: 0.3,
    ease: "easeInOut"
  }
};

/**
 * Optimized floating animation for decorative elements
 * Reduced motion for better performance
 */
export const floatingAnimation = (delay: number = 0, duration: number = 8) => ({
  animate: {
    y: [0, -30, 0],
    x: [0, 15, 0],
  },
  transition: {
    duration,
    repeat: Infinity,
    delay,
    ease: "easeInOut",
  }
});

/**
 * Optimized glow animation for neon effects
 * Uses filter property for GPU acceleration
 */
export const glowAnimation = (color: string = "rgba(255, 182, 217, 0.6)") => ({
  animate: {
    filter: [
      `drop-shadow(0 0 10px ${color}) drop-shadow(0 0 20px ${color})`,
      `drop-shadow(0 0 15px ${color}) drop-shadow(0 0 30px ${color})`,
      `drop-shadow(0 0 10px ${color}) drop-shadow(0 0 20px ${color})`,
    ],
  },
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
  }
});

/**
 * Throttled mouse tracking utility
 * Prevents excessive re-renders
 */
export const createThrottledMouseTracker = (callback: (x: number, y: number) => void, throttleMs: number = 50) => {
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
