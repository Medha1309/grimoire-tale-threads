/**
 * Performance monitoring and optimization utilities
 * Track and improve application performance
 */

import { PERFORMANCE } from '../constants/app';

/**
 * Performance metrics interface
 */
export interface PerformanceMetrics {
  name: string;
  duration: number;
  timestamp: number;
  metadata?: Record<string, unknown>;
}

/**
 * Performance monitor class
 */
class PerformanceMonitor {
  private metrics: PerformanceMetrics[] = [];
  private marks: Map<string, number> = new Map();

  /**
   * Start measuring performance
   */
  start(name: string): void {
    this.marks.set(name, performance.now());
  }

  /**
   * End measuring and record metric
   */
  end(name: string, metadata?: Record<string, unknown>): number {
    const startTime = this.marks.get(name);
    if (!startTime) {
      console.warn(`Performance mark "${name}" not found`);
      return 0;
    }

    const duration = performance.now() - startTime;
    this.marks.delete(name);

    const metric: PerformanceMetrics = {
      name,
      duration,
      timestamp: Date.now(),
      metadata,
    };

    this.metrics.push(metric);

    // Log slow operations in development
    if (import.meta.env.DEV && duration > PERFORMANCE.SLOW_NETWORK_THRESHOLD) {
      console.warn(`Slow operation detected: ${name} took ${duration.toFixed(2)}ms`, metadata);
    }

    return duration;
  }

  /**
   * Get all recorded metrics
   */
  getMetrics(): PerformanceMetrics[] {
    return [...this.metrics];
  }

  /**
   * Get metrics by name
   */
  getMetricsByName(name: string): PerformanceMetrics[] {
    return this.metrics.filter(m => m.name === name);
  }

  /**
   * Get average duration for a metric
   */
  getAverageDuration(name: string): number {
    const metrics = this.getMetricsByName(name);
    if (metrics.length === 0) return 0;
    
    const total = metrics.reduce((sum, m) => sum + m.duration, 0);
    return total / metrics.length;
  }

  /**
   * Clear all metrics
   */
  clear(): void {
    this.metrics = [];
    this.marks.clear();
  }

  /**
   * Export metrics for analysis
   */
  export(): string {
    return JSON.stringify(this.metrics, null, 2);
  }
}

// Singleton instance
export const performanceMonitor = new PerformanceMonitor();

/**
 * Measure function execution time
 */
export function measurePerformance<T extends (...args: unknown[]) => unknown>(
  fn: T,
  name?: string
): T {
  return ((...args: Parameters<T>) => {
    const metricName = name || fn.name || 'anonymous';
    performanceMonitor.start(metricName);
    
    try {
      const result = fn(...args);
      
      // Handle async functions
      if (result instanceof Promise) {
        return result.finally(() => {
          performanceMonitor.end(metricName);
        });
      }
      
      performanceMonitor.end(metricName);
      return result;
    } catch (error) {
      performanceMonitor.end(metricName);
      throw error;
    }
  }) as T;
}

/**
 * Measure async function execution time
 */
export function measureAsync<T extends (...args: unknown[]) => Promise<unknown>>(
  fn: T,
  name?: string
): T {
  return (async (...args: Parameters<T>) => {
    const metricName = name || fn.name || 'anonymous';
    performanceMonitor.start(metricName);
    
    try {
      const result = await fn(...args);
      performanceMonitor.end(metricName);
      return result;
    } catch (error) {
      performanceMonitor.end(metricName);
      throw error;
    }
  }) as T;
}

/**
 * Get Web Vitals metrics
 */
export function getWebVitals(): Promise<{
  FCP?: number;
  LCP?: number;
  FID?: number;
  CLS?: number;
  TTFB?: number;
}> {
  return new Promise((resolve) => {
    const metrics: Record<string, number> = {};

    // First Contentful Paint
    const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0];
    if (fcpEntry) {
      metrics.FCP = fcpEntry.startTime;
    }

    // Largest Contentful Paint
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as PerformanceEntry & { renderTime?: number; loadTime?: number };
      metrics.LCP = lastEntry.renderTime || lastEntry.loadTime || 0;
    });

    try {
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch {
      // LCP not supported
    }

    // Time to First Byte
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigationEntry) {
      metrics.TTFB = navigationEntry.responseStart - navigationEntry.requestStart;
    }

    // Resolve after a short delay to collect metrics
    setTimeout(() => {
      observer.disconnect();
      resolve(metrics);
    }, 3000);
  });
}

/**
 * Check if device is low-end
 */
export function isLowEndDevice(): boolean {
  // Check for reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return true;
  }

  // Check for save-data header
  if ('connection' in navigator) {
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (connection?.saveData) {
      return true;
    }
  }

  // Check device memory (if available)
  if ('deviceMemory' in navigator) {
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    if (memory && memory < 4) {
      return true;
    }
  }

  // Check hardware concurrency
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    return true;
  }

  return false;
}

/**
 * Get network information
 */
export function getNetworkInfo(): {
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
} {
  if (!('connection' in navigator)) {
    return {};
  }

  const connection = (navigator as Navigator & {
    connection?: {
      effectiveType?: string;
      downlink?: number;
      rtt?: number;
      saveData?: boolean;
    };
  }).connection;

  if (!connection) {
    return {};
  }

  return {
    effectiveType: connection.effectiveType,
    downlink: connection.downlink,
    rtt: connection.rtt,
    saveData: connection.saveData,
  };
}

/**
 * Check if connection is slow
 */
export function isSlowConnection(): boolean {
  const networkInfo = getNetworkInfo();
  
  if (networkInfo.saveData) {
    return true;
  }

  if (networkInfo.effectiveType === '2g' || networkInfo.effectiveType === 'slow-2g') {
    return true;
  }

  if (networkInfo.rtt && networkInfo.rtt > 1000) {
    return true;
  }

  return false;
}

/**
 * Prefetch resource
 */
export function prefetch(url: string): void {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = url;
  document.head.appendChild(link);
}

/**
 * Preload resource
 */
export function preload(url: string, as: string): void {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = url;
  link.as = as;
  document.head.appendChild(link);
}

/**
 * Lazy load image
 */
export function lazyLoadImage(img: HTMLImageElement): void {
  if ('loading' in HTMLImageElement.prototype) {
    img.loading = 'lazy';
  } else {
    // Fallback for browsers that don't support lazy loading
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const image = entry.target as HTMLImageElement;
          if (image.dataset.src) {
            image.src = image.dataset.src;
            observer.unobserve(image);
          }
        }
      });
    });
    observer.observe(img);
  }
}

/**
 * Debounce with performance tracking
 */
export function performanceDebounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number,
  name?: string
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  const metricName = name || fn.name || 'debounced';

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    
    timeout = setTimeout(() => {
      performanceMonitor.start(metricName);
      fn(...args);
      performanceMonitor.end(metricName);
    }, delay);
  };
}

/**
 * Throttle with performance tracking
 */
export function performanceThrottle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  limit: number,
  name?: string
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  const metricName = name || fn.name || 'throttled';

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      performanceMonitor.start(metricName);
      fn(...args);
      performanceMonitor.end(metricName);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Request idle callback wrapper
 */
export function runWhenIdle(callback: () => void, timeout = 2000): void {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(callback, { timeout });
  } else {
    setTimeout(callback, 1);
  }
}

/**
 * Batch DOM updates
 */
export function batchDOMUpdates(updates: Array<() => void>): void {
  requestAnimationFrame(() => {
    updates.forEach(update => update());
  });
}

/**
 * Memory usage (if available)
 */
export function getMemoryUsage(): {
  usedJSHeapSize?: number;
  totalJSHeapSize?: number;
  jsHeapSizeLimit?: number;
} {
  if ('memory' in performance) {
    const memory = (performance as Performance & {
      memory?: {
        usedJSHeapSize: number;
        totalJSHeapSize: number;
        jsHeapSizeLimit: number;
      };
    }).memory;

    if (memory) {
      return {
        usedJSHeapSize: memory.usedJSHeapSize,
        totalJSHeapSize: memory.totalJSHeapSize,
        jsHeapSizeLimit: memory.jsHeapSizeLimit,
      };
    }
  }

  return {};
}

/**
 * Log performance summary
 */
export function logPerformanceSummary(): void {
  const metrics = performanceMonitor.getMetrics();
  
  if (metrics.length === 0) {
    console.log('No performance metrics recorded');
    return;
  }

  console.group('Performance Summary');
  
  // Group by name
  const grouped = metrics.reduce((acc, metric) => {
    if (!acc[metric.name]) {
      acc[metric.name] = [];
    }
    acc[metric.name].push(metric.duration);
    return acc;
  }, {} as Record<string, number[]>);

  // Log summary for each metric
  Object.entries(grouped).forEach(([name, durations]) => {
    const avg = durations.reduce((a, b) => a + b, 0) / durations.length;
    const min = Math.min(...durations);
    const max = Math.max(...durations);
    
    console.log(`${name}:`, {
      count: durations.length,
      avg: `${avg.toFixed(2)}ms`,
      min: `${min.toFixed(2)}ms`,
      max: `${max.toFixed(2)}ms`,
    });
  });

  console.groupEnd();
}
