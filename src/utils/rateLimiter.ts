/**
 * Advanced Rate Limiting System
 * Prevents API abuse with multiple strategies
 */

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
  blockDurationMs?: number;
}

interface RateLimitEntry {
  count: number;
  resetTime: number;
  blocked: boolean;
  blockUntil?: number;
}

class RateLimiter {
  private limits: Map<string, RateLimitEntry> = new Map();
  private cleanupInterval: NodeJS.Timeout;

  constructor() {
    // Cleanup expired entries every 5 minutes
    this.cleanupInterval = setInterval(() => this.cleanup(), 5 * 60 * 1000);
  }

  /**
   * Check if action is allowed under rate limit
   */
  checkLimit(key: string, config: RateLimitConfig): {
    allowed: boolean;
    remaining: number;
    resetIn: number;
    blocked?: boolean;
  } {
    const now = Date.now();
    const entry = this.limits.get(key);

    // Check if blocked
    if (entry?.blocked && entry.blockUntil && now < entry.blockUntil) {
      return {
        allowed: false,
        remaining: 0,
        resetIn: entry.blockUntil - now,
        blocked: true,
      };
    }

    // Initialize or reset if window expired
    if (!entry || now >= entry.resetTime) {
      this.limits.set(key, {
        count: 1,
        resetTime: now + config.windowMs,
        blocked: false,
      });
      return {
        allowed: true,
        remaining: config.maxRequests - 1,
        resetIn: config.windowMs,
      };
    }

    // Increment count
    entry.count++;

    // Check if limit exceeded
    if (entry.count > config.maxRequests) {
      // Block if configured
      if (config.blockDurationMs) {
        entry.blocked = true;
        entry.blockUntil = now + config.blockDurationMs;
      }

      return {
        allowed: false,
        remaining: 0,
        resetIn: entry.resetTime - now,
        blocked: entry.blocked,
      };
    }

    return {
      allowed: true,
      remaining: config.maxRequests - entry.count,
      resetIn: entry.resetTime - now,
    };
  }

  /**
   * Record a successful action
   */
  recordAction(key: string, config: RateLimitConfig): void {
    this.checkLimit(key, config);
  }

  /**
   * Reset rate limit for a key
   */
  reset(key: string): void {
    this.limits.delete(key);
  }

  /**
   * Block a key for a duration
   */
  block(key: string, durationMs: number): void {
    const now = Date.now();
    this.limits.set(key, {
      count: 0,
      resetTime: now + durationMs,
      blocked: true,
      blockUntil: now + durationMs,
    });
  }

  /**
   * Cleanup expired entries
   */
  private cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.limits.entries()) {
      if (now >= entry.resetTime && (!entry.blocked || (entry.blockUntil && now >= entry.blockUntil))) {
        this.limits.delete(key);
      }
    }
  }

  /**
   * Destroy the rate limiter
   */
  destroy(): void {
    clearInterval(this.cleanupInterval);
    this.limits.clear();
  }
}

// Singleton instance
export const rateLimiter = new RateLimiter();

// Predefined rate limit configurations
export const RATE_LIMITS = {
  // Authentication
  LOGIN_ATTEMPT: { maxRequests: 5, windowMs: 15 * 60 * 1000, blockDurationMs: 30 * 60 * 1000 }, // 5 per 15min, block 30min
  SIGNUP: { maxRequests: 3, windowMs: 60 * 60 * 1000, blockDurationMs: 60 * 60 * 1000 }, // 3 per hour, block 1hr
  PASSWORD_RESET: { maxRequests: 3, windowMs: 60 * 60 * 1000 }, // 3 per hour

  // Content creation
  POST_CREATE: { maxRequests: 10, windowMs: 60 * 60 * 1000 }, // 10 per hour
  COMMENT_CREATE: { maxRequests: 30, windowMs: 60 * 60 * 1000 }, // 30 per hour
  STORY_CREATE: { maxRequests: 5, windowMs: 60 * 60 * 1000 }, // 5 per hour
  DIARY_CREATE: { maxRequests: 20, windowMs: 60 * 60 * 1000 }, // 20 per hour

  // Interactions
  LIKE_ACTION: { maxRequests: 100, windowMs: 60 * 60 * 1000 }, // 100 per hour
  FOLLOW_ACTION: { maxRequests: 50, windowMs: 60 * 60 * 1000 }, // 50 per hour
  BOOKMARK_ACTION: { maxRequests: 100, windowMs: 60 * 60 * 1000 }, // 100 per hour

  // Reads (more lenient)
  QUERY_READ: { maxRequests: 200, windowMs: 60 * 60 * 1000 }, // 200 per hour
  PROFILE_VIEW: { maxRequests: 100, windowMs: 60 * 60 * 1000 }, // 100 per hour

  // Admin actions
  ADMIN_ACTION: { maxRequests: 100, windowMs: 60 * 60 * 1000 }, // 100 per hour

  // Contact form
  CONTACT_SUBMIT: { maxRequests: 3, windowMs: 24 * 60 * 60 * 1000 }, // 3 per day
} as const;

/**
 * Generate rate limit key for user action
 */
export const getRateLimitKey = (userId: string | undefined, action: string): string => {
  const identifier = userId || 'anonymous';
  return `${identifier}:${action}`;
};

/**
 * Check rate limit with automatic key generation
 */
export const checkRateLimit = (
  userId: string | undefined,
  action: keyof typeof RATE_LIMITS
): ReturnType<RateLimiter['checkLimit']> => {
  const key = getRateLimitKey(userId, action);
  return rateLimiter.checkLimit(key, RATE_LIMITS[action]);
};

/**
 * Record action with automatic key generation
 */
export const recordAction = (userId: string | undefined, action: keyof typeof RATE_LIMITS): void => {
  const key = getRateLimitKey(userId, action);
  rateLimiter.recordAction(key, RATE_LIMITS[action]);
};
