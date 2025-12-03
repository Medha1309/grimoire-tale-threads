/**
 * Security Monitoring and Logging
 * Track security events and potential threats
 */

interface SecurityEvent {
  timestamp: number;
  userId?: string;
  eventType: SecurityEventType;
  action: string;
  result: 'allowed' | 'blocked' | 'error';
  reason?: string;
  metadata?: Record<string, any>;
}

type SecurityEventType =
  | 'rate_limit'
  | 'validation_failed'
  | 'xss_attempt'
  | 'injection_attempt'
  | 'unauthorized_access'
  | 'suspicious_activity'
  | 'authentication_failed';

class SecurityMonitor {
  private events: SecurityEvent[] = [];
  private maxEvents = 1000;
  private alertThresholds = {
    rate_limit: 10, // Alert after 10 rate limit violations
    validation_failed: 20,
    xss_attempt: 1, // Alert immediately
    injection_attempt: 1,
    unauthorized_access: 5,
  };

  /**
   * Log a security event
   */
  logEvent(event: Omit<SecurityEvent, 'timestamp'>): void {
    const fullEvent: SecurityEvent = {
      ...event,
      timestamp: Date.now(),
    };

    this.events.push(fullEvent);

    // Keep only recent events
    if (this.events.length > this.maxEvents) {
      this.events = this.events.slice(-this.maxEvents);
    }

    // Check if alert threshold reached
    this.checkAlertThreshold(event.eventType, event.userId);

    // Log security events in development
    if (import.meta.env.DEV) {
      // Security event logged
    }

    // Send to analytics/monitoring service in production
    if (import.meta.env.PROD && event.result === 'blocked') {
      this.sendToMonitoring(fullEvent);
    }
  }

  /**
   * Check if alert threshold is reached
   */
  private checkAlertThreshold(eventType: SecurityEventType, userId?: string): void {
    const threshold = this.alertThresholds[eventType as keyof typeof this.alertThresholds];
    if (!threshold) return;

    const recentEvents = this.getRecentEvents(eventType, 60 * 60 * 1000, userId); // Last hour
    if (recentEvents.length >= threshold) {
      this.triggerAlert(eventType, recentEvents.length, userId);
    }
  }

  /**
   * Get recent events
   */
  private getRecentEvents(
    eventType: SecurityEventType,
    timeWindowMs: number = 60 * 60 * 1000,
    userId?: string
  ): SecurityEvent[] {
    const cutoff = Date.now() - timeWindowMs;
    return this.events.filter(
      (event) =>
        event.timestamp >= cutoff &&
        event.eventType === eventType &&
        (!userId || event.userId === userId)
    );
  }

  /**
   * Trigger security alert
   */
  private triggerAlert(eventType: SecurityEventType, count: number, userId?: string): void {
    // Security alert triggered
    // In production, send to monitoring service
    if (import.meta.env.PROD) {
      // TODO: Integrate with monitoring service (e.g., Sentry, LogRocket)
      console.warn('Security alert:', {
        eventType,
        userId,
        count,
        threshold: this.alertThresholds[eventType as keyof typeof this.alertThresholds],
      });
    }
  }

  /**
   * Send event to monitoring service
   */
  private sendToMonitoring(_event: SecurityEvent): void {
    // TODO: Integrate with monitoring service
    // Example: Sentry, LogRocket, Firebase Analytics
  }

  /**
   * Get security statistics
   */
  getStats(timeWindowMs: number = 24 * 60 * 60 * 1000): {
    total: number;
    blocked: number;
    byType: Record<string, number>;
    topUsers: Array<{ userId: string; count: number }>;
  } {
    const cutoff = Date.now() - timeWindowMs;
    const recentEvents = this.events.filter((event) => event.timestamp >= cutoff);

    const byType: Record<string, number> = {};
    const userCounts: Record<string, number> = {};

    let blocked = 0;

    recentEvents.forEach((event) => {
      // Count by type
      byType[event.eventType] = (byType[event.eventType] || 0) + 1;

      // Count blocked
      if (event.result === 'blocked') {
        blocked++;
      }

      // Count by user
      if (event.userId) {
        userCounts[event.userId] = (userCounts[event.userId] || 0) + 1;
      }
    });

    // Get top users
    const topUsers = Object.entries(userCounts)
      .map(([userId, count]) => ({ userId, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return {
      total: recentEvents.length,
      blocked,
      byType,
      topUsers,
    };
  }

  /**
   * Get events for a specific user
   */
  getUserEvents(userId: string, limit: number = 50): SecurityEvent[] {
    return this.events
      .filter((event) => event.userId === userId)
      .slice(-limit)
      .reverse();
  }

  /**
   * Clear all events
   */
  clear(): void {
    this.events = [];
  }

  /**
   * Export events for analysis
   */
  exportEvents(): SecurityEvent[] {
    return [...this.events];
  }
}

// Singleton instance
export const securityMonitor = new SecurityMonitor();

/**
 * Helper functions for common security logging
 */

export const logRateLimitViolation = (
  userId: string | undefined,
  action: string,
  remaining: number
): void => {
  securityMonitor.logEvent({
    userId,
    eventType: 'rate_limit',
    action,
    result: 'blocked',
    reason: 'Rate limit exceeded',
    metadata: { remaining },
  });
};

export const logValidationFailure = (
  userId: string | undefined,
  action: string,
  errors: string[]
): void => {
  securityMonitor.logEvent({
    userId,
    eventType: 'validation_failed',
    action,
    result: 'blocked',
    reason: errors.join(', '),
    metadata: { errors },
  });
};

export const logXssAttempt = (userId: string | undefined, content: string): void => {
  securityMonitor.logEvent({
    userId,
    eventType: 'xss_attempt',
    action: 'content_submission',
    result: 'blocked',
    reason: 'XSS pattern detected',
    metadata: { contentLength: content.length },
  });
};

export const logInjectionAttempt = (
  userId: string | undefined,
  type: 'sql' | 'nosql',
  content: string
): void => {
  securityMonitor.logEvent({
    userId,
    eventType: 'injection_attempt',
    action: 'content_submission',
    result: 'blocked',
    reason: `${type.toUpperCase()} injection pattern detected`,
    metadata: { type, contentLength: content.length },
  });
};

export const logUnauthorizedAccess = (
  userId: string | undefined,
  resource: string,
  action: string
): void => {
  securityMonitor.logEvent({
    userId,
    eventType: 'unauthorized_access',
    action,
    result: 'blocked',
    reason: 'Insufficient permissions',
    metadata: { resource },
  });
};

export const logAuthenticationFailure = (email: string, reason: string): void => {
  securityMonitor.logEvent({
    eventType: 'authentication_failed',
    action: 'login',
    result: 'blocked',
    reason,
    metadata: { email },
  });
};

export const logSuspiciousActivity = (
  userId: string | undefined,
  activity: string,
  details: Record<string, any>
): void => {
  securityMonitor.logEvent({
    userId,
    eventType: 'suspicious_activity',
    action: activity,
    result: 'blocked',
    reason: 'Suspicious pattern detected',
    metadata: details,
  });
};
