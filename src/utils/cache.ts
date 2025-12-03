/**
 * Cache Utility
 * Provides memory-efficient caching with TTL and size limits
 */

interface CacheEntry<T> {
  value: T;
  timestamp: number;
  size: number;
}

interface CacheOptions {
  maxSize?: number; // Max cache size in MB
  ttl?: number; // Time to live in ms
  onEvict?: (key: string, value: any) => void;
}

export class Cache<T = any> {
  private cache = new Map<string, CacheEntry<T>>();
  private maxSize: number;
  private ttl: number;
  private currentSize = 0;
  private onEvict?: (key: string, value: T) => void;

  constructor(options: CacheOptions = {}) {
    this.maxSize = (options.maxSize || 10) * 1024 * 1024; // Convert MB to bytes
    this.ttl = options.ttl || 5 * 60 * 1000; // Default 5 minutes
    this.onEvict = options.onEvict;
  }

  set(key: string, value: T): void {
    const size = this.estimateSize(value);
    
    // Evict if needed
    while (this.currentSize + size > this.maxSize && this.cache.size > 0) {
      this.evictOldest();
    }

    // Remove old entry if exists
    if (this.cache.has(key)) {
      const old = this.cache.get(key)!;
      this.currentSize -= old.size;
    }

    this.cache.set(key, {
      value,
      timestamp: Date.now(),
      size,
    });
    this.currentSize += size;
  }

  get(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    // Check TTL
    if (Date.now() - entry.timestamp > this.ttl) {
      this.delete(key);
      return null;
    }

    return entry.value;
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  delete(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) return false;

    this.currentSize -= entry.size;
    this.onEvict?.(key, entry.value);
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.forEach((entry, key) => {
      this.onEvict?.(key, entry.value);
    });
    this.cache.clear();
    this.currentSize = 0;
  }

  private evictOldest(): void {
    let oldest: string | null = null;
    let oldestTime = Infinity;

    this.cache.forEach((entry, key) => {
      if (entry.timestamp < oldestTime) {
        oldestTime = entry.timestamp;
        oldest = key;
      }
    });

    if (oldest) this.delete(oldest);
  }

  private estimateSize(value: T): number {
    try {
      return JSON.stringify(value).length * 2; // Rough estimate
    } catch {
      return 1024; // Default 1KB
    }
  }

  getStats() {
    return {
      size: this.cache.size,
      memoryUsage: Math.round(this.currentSize / 1024 / 1024 * 100) / 100,
      maxSize: Math.round(this.maxSize / 1024 / 1024),
    };
  }
}

// Singleton instances for common use cases
export const queryCache = new Cache({ maxSize: 5, ttl: 5 * 60 * 1000 });
export const imageCache = new Cache({ maxSize: 20, ttl: 30 * 60 * 1000 });
export const dataCache = new Cache({ maxSize: 10, ttl: 10 * 60 * 1000 });
