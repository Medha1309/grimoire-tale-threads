/**
 * Enhanced lazy loading utilities for optimal performance
 */

import { lazy, ComponentType } from 'react';

interface LazyOptions {
  retries?: number;
  retryDelay?: number;
  preload?: boolean;
}

/**
 * Enhanced lazy loading with retry logic and preloading
 */
export function lazyWithPreload<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
  options: LazyOptions = {}
): T & { preload: () => Promise<{ default: T }> } {
  const { retries = 3, retryDelay = 1000 } = options;
  
  let modulePromise: Promise<{ default: T }> | null = null;
  
  const load = async (): Promise<{ default: T }> => {
    if (modulePromise) return modulePromise;
    
    modulePromise = retry(factory, retries, retryDelay);
    return modulePromise;
  };
  
  const LazyComponent = lazy(load) as any;
  LazyComponent.preload = load;
  
  return LazyComponent as T & { preload: () => Promise<{ default: T }> };
}

/**
 * Retry logic for failed imports
 */
async function retry<T>(
  fn: () => Promise<T>,
  retriesLeft: number,
  delay: number
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retriesLeft === 0) {
      throw error;
    }
    
    await new Promise(resolve => setTimeout(resolve, delay));
    return retry(fn, retriesLeft - 1, delay * 1.5);
  }
}

/**
 * Preload multiple components
 */
export function preloadComponents(
  components: Array<{ preload: () => Promise<any> }>
): void {
  components.forEach(component => {
    if (component.preload) {
      component.preload().catch(() => {
        // Silently fail preloading
      });
    }
  });
}

/**
 * Preload on hover
 */
export function preloadOnHover(
  component: { preload: () => Promise<any> }
): { onMouseEnter: () => void; onTouchStart: () => void } {
  let preloaded = false;
  
  const preload = () => {
    if (!preloaded && component.preload) {
      preloaded = true;
      component.preload().catch(() => {});
    }
  };
  
  return {
    onMouseEnter: preload,
    onTouchStart: preload,
  };
}

/**
 * Preload on viewport intersection
 */
export function preloadOnVisible(
  component: { preload: () => Promise<any> },
  element: HTMLElement | null
): void {
  if (!element || !('IntersectionObserver' in window)) return;
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && component.preload) {
          component.preload().catch(() => {});
          observer.disconnect();
        }
      });
    },
    { rootMargin: '50px' }
  );
  
  observer.observe(element);
}

/**
 * Preload after idle
 */
export function preloadOnIdle(
  components: Array<{ preload: () => Promise<any> }>,
  timeout = 2000
): void {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(
      () => preloadComponents(components),
      { timeout }
    );
  } else {
    setTimeout(() => preloadComponents(components), timeout);
  }
}
