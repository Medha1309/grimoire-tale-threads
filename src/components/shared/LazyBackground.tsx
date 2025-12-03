/**
 * LazyBackground Component
 * Delays rendering of heavy background effects until after initial page load
 */

import React, { useState, useEffect, ReactNode } from 'react';

interface LazyBackgroundProps {
  children: ReactNode;
  delay?: number;
  fallback?: ReactNode;
}

export const LazyBackground: React.FC<LazyBackgroundProps> = ({ 
  children, 
  delay = 100,
  fallback = null 
}) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Use requestIdleCallback if available, otherwise setTimeout
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(() => setShouldRender(true), { timeout: delay });
      return () => cancelIdleCallback(id);
    } else {
      const timer = setTimeout(() => setShouldRender(true), delay);
      return () => clearTimeout(timer);
    }
  }, [delay]);

  return shouldRender ? <>{children}</> : <>{fallback}</>;
};
