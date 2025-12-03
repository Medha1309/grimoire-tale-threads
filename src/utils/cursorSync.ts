/**
 * Cursor Synchronization Utilities
 * Handles real-time cursor position syncing with throttling and interpolation
 */

import { CursorPosition } from '../types/reflectionSession';

/**
 * Throttle function for cursor updates
 * Limits updates to once per specified interval
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;

  return function (this: any, ...args: Parameters<T>): void {
    if (!inThrottle) {
      inThrottle = true;
      func.apply(this, args);
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Interpolate cursor position for smooth movement
 * Uses linear interpolation between old and new positions
 */
export const interpolateCursorPosition = (
  current: { x: number; y: number },
  target: { x: number; y: number },
  factor: number = 0.2
): { x: number; y: number } => {
  return {
    x: current.x + (target.x - current.x) * factor,
    y: current.y + (target.y - current.y) * factor,
  };
};

/**
 * Clean up stale cursors (not updated in last 30 seconds)
 */
export const cleanupStaleCursors = (
  cursors: Record<string, CursorPosition>,
  maxAge: number = 30000 // 30 seconds
): Record<string, CursorPosition> => {
  const now = Date.now();
  const cleaned: Record<string, CursorPosition> = {};

  Object.entries(cursors).forEach(([userId, cursor]) => {
    if (now - cursor.lastUpdate < maxAge) {
      cleaned[userId] = cursor;
    }
  });

  return cleaned;
};

/**
 * Calculate distance between two cursor positions
 */
export const getCursorDistance = (
  pos1: { x: number; y: number },
  pos2: { x: number; y: number }
): number => {
  const dx = pos2.x - pos1.x;
  const dy = pos2.y - pos1.y;
  return Math.sqrt(dx * dx + dy * dy);
};

/**
 * Check if cursor is within viewport bounds
 */
export const isCursorInViewport = (
  position: { x: number; y: number },
  viewport: { width: number; height: number }
): boolean => {
  return (
    position.x >= 0 &&
    position.x <= viewport.width &&
    position.y >= 0 &&
    position.y <= viewport.height
  );
};

/**
 * Normalize cursor position to percentage (0-1)
 * Useful for syncing across different screen sizes
 */
export const normalizeCursorPosition = (
  position: { x: number; y: number },
  viewport: { width: number; height: number }
): { x: number; y: number } => {
  return {
    x: position.x / viewport.width,
    y: position.y / viewport.height,
  };
};

/**
 * Denormalize cursor position from percentage to pixels
 */
export const denormalizeCursorPosition = (
  normalized: { x: number; y: number },
  viewport: { width: number; height: number }
): { x: number; y: number } => {
  return {
    x: normalized.x * viewport.width,
    y: normalized.y * viewport.height,
  };
};

/**
 * Debounce function for less frequent updates
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;

  return function (this: any, ...args: Parameters<T>): void {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};
