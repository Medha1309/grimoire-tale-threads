/**
 * Optimized Component Wrapper
 * Provides performance optimizations for React components
 */

import React, { memo, lazy, Suspense } from 'react';

/**
 * Higher-order component for memoization with custom comparison
 */
export function withMemo<P extends object>(
  Component: React.ComponentType<P>,
  propsAreEqual?: (prevProps: Readonly<P>, nextProps: Readonly<P>) => boolean
): React.MemoExoticComponent<React.ComponentType<P>> {
  return memo(Component, propsAreEqual);
}

/**
 * Lazy load component with retry logic
 */
export function lazyWithRetry<T extends React.ComponentType<any>>(
  componentImport: () => Promise<{ default: T }>,
  retries = 3
): React.LazyExoticComponent<T> {
  return lazy(() => {
    return new Promise<{ default: T }>((resolve, reject) => {
      const attemptImport = (retriesLeft: number) => {
        componentImport()
          .then(resolve)
          .catch((error) => {
            if (retriesLeft === 0) {
              reject(error);
              return;
            }
            setTimeout(() => attemptImport(retriesLeft - 1), 1000);
          });
      };
      attemptImport(retries);
    });
  });
}

/**
 * Suspense wrapper with error boundary
 */
interface SuspenseWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const SuspenseWrapper: React.FC<SuspenseWrapperProps> = ({ 
  children, 
  fallback = <div className="min-h-screen bg-black" /> 
}) => {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
};

/**
 * Conditional render wrapper - only renders when condition is met
 */
interface ConditionalRenderProps {
  condition: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const ConditionalRender: React.FC<ConditionalRenderProps> = memo(({ 
  condition, 
  children, 
  fallback = null 
}) => {
  return condition ? <>{children}</> : <>{fallback}</>;
});

ConditionalRender.displayName = 'ConditionalRender';

/**
 * Viewport-based lazy rendering
 */
interface ViewportRenderProps {
  children: React.ReactNode;
  rootMargin?: string;
  threshold?: number;
  fallback?: React.ReactNode;
}

export const ViewportRender: React.FC<ViewportRenderProps> = ({ 
  children, 
  rootMargin = '100px',
  threshold = 0.01,
  fallback = null 
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return (
    <div ref={ref}>
      {isVisible ? children : fallback}
    </div>
  );
};
