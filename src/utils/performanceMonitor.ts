/**
 * Performance monitoring and optimization utilities
 */

interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
}

class PerformanceMonitor {
  private metrics: Partial<PerformanceMetrics> = {};
  private observers: PerformanceObserver[] = [];

  constructor() {
    if (typeof window === 'undefined') return;
    this.initObservers();
  }

  private initObservers() {
    // Largest Contentful Paint
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        this.metrics.lcp = lastEntry.renderTime || lastEntry.loadTime;
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.push(lcpObserver);
    } catch (e) {
      // LCP not supported
    }

    // First Input Delay
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          this.metrics.fid = entry.processingStart - entry.startTime;
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
      this.observers.push(fidObserver);
    } catch (e) {
      // FID not supported
    }

    // Cumulative Layout Shift
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as any[]) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            this.metrics.cls = clsValue;
          }
        }
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      this.observers.push(clsObserver);
    } catch (e) {
      // CLS not supported
    }

    // Navigation Timing
    if (window.performance && window.performance.timing) {
      window.addEventListener('load', () => {
        const timing = window.performance.timing;
        this.metrics.ttfb = timing.responseStart - timing.requestStart;
        this.metrics.fcp = timing.domContentLoadedEventEnd - timing.navigationStart;
      });
    }
  }

  getMetrics(): Partial<PerformanceMetrics> {
    return { ...this.metrics };
  }

  logMetrics(): void {
    if (import.meta.env.DEV) {
      console.table(this.metrics);
    }
  }

  disconnect(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

export const performanceMonitor = new PerformanceMonitor();

/**
 * Measure component render time
 */
export function measureRender(componentName: string) {
  if (import.meta.env.DEV && window.performance) {
    const startMark = `${componentName}-start`;
    const endMark = `${componentName}-end`;
    const measureName = `${componentName}-render`;

    return {
      start: () => performance.mark(startMark),
      end: () => {
        performance.mark(endMark);
        try {
          performance.measure(measureName, startMark, endMark);
          const measure = performance.getEntriesByName(measureName)[0];
          console.log(`${componentName} render time:`, measure.duration.toFixed(2), 'ms');
          performance.clearMarks(startMark);
          performance.clearMarks(endMark);
          performance.clearMeasures(measureName);
        } catch (e) {
          // Measurement failed
        }
      },
    };
  }

  return {
    start: () => {},
    end: () => {},
  };
}

/**
 * Debounce for performance
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle for performance
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Request animation frame throttle
 */
export function rafThrottle<T extends (...args: any[]) => any>(
  func: T
): (...args: Parameters<T>) => void {
  let rafId: number | null = null;

  return function executedFunction(...args: Parameters<T>) {
    if (rafId !== null) return;

    rafId = requestAnimationFrame(() => {
      func(...args);
      rafId = null;
    });
  };
}

/**
 * Check if device is low-end
 */
export function isLowEndDevice(): boolean {
  if (typeof navigator === 'undefined') return false;

  // Check hardware concurrency
  const cores = navigator.hardwareConcurrency || 4;
  if (cores < 4) return true;

  // Check device memory (if available)
  const memory = (navigator as any).deviceMemory;
  if (memory && memory < 4) return true;

  // Check connection (if available)
  const connection = (navigator as any).connection;
  if (connection) {
    const effectiveType = connection.effectiveType;
    if (effectiveType === 'slow-2g' || effectiveType === '2g' || effectiveType === '3g') {
      return true;
    }
  }

  return false;
}

/**
 * Optimize animations for device
 */
export function getOptimizedAnimationConfig() {
  const isLowEnd = isLowEndDevice();
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return {
    enabled: !prefersReducedMotion,
    duration: isLowEnd ? 0.2 : 0.3,
    stagger: isLowEnd ? 0.05 : 0.1,
    particles: isLowEnd ? 10 : 30,
    quality: isLowEnd ? 'low' : 'high',
  };
}
