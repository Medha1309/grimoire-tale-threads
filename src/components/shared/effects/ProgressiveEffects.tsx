/**
 * ProgressiveEffects - Wrapper for progressive loading of heavy effects
 * Delays rendering until after initial page load for better performance
 */

import React, { useState, useEffect, ReactNode } from 'react';

interface ProgressiveEffectsProps {
  children: ReactNode;
  delay?: number;
  fallback?: ReactNode;
  priority?: 'high' | 'medium' | 'low';
}

export const ProgressiveEffects: React.FC<ProgressiveEffectsProps> = ({
  children,
  delay = 100,
  fallback = null,
  priority = 'medium',
}) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Adjust delay based on priority
    const adjustedDelay = priority === 'high' ? delay : priority === 'medium' ? delay * 1.5 : delay * 2;

    // Use requestIdleCallback if available for low priority
    if (priority === 'low' && 'requestIdleCallback' in window) {
      const id = requestIdleCallback(
        () => setShouldRender(true),
        { timeout: adjustedDelay }
      );
      return () => cancelIdleCallback(id);
    }

    // Use requestAnimationFrame for high priority
    if (priority === 'high') {
      const rafId = requestAnimationFrame(() => {
        setTimeout(() => setShouldRender(true), adjustedDelay);
      });
      return () => cancelAnimationFrame(rafId);
    }

    // Default to setTimeout for medium priority
    const timer = setTimeout(() => setShouldRender(true), adjustedDelay);
    return () => clearTimeout(timer);
  }, [delay, priority]);

  return shouldRender ? <>{children}</> : <>{fallback}</>;
};
