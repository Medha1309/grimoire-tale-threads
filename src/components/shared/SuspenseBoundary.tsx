/**
 * Optimized Suspense Boundary with error handling
 */

import React, { Suspense, Component, ReactNode } from 'react';
import { PageLoader } from '../PageLoader';
import { ErrorState } from './ErrorState';

interface SuspenseBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  errorFallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: ReactNode; fallback?: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Suspense Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <ErrorState
          message="Failed to load component"
          onRetry={() => {
            this.setState({ hasError: false });
            window.location.reload();
          }}
        />
      );
    }

    return this.props.children;
  }
}

/**
 * Combined Suspense + Error Boundary
 */
export const SuspenseBoundary: React.FC<SuspenseBoundaryProps> = ({
  children,
  fallback,
  errorFallback,
}) => {
  return (
    <ErrorBoundary fallback={errorFallback}>
      <Suspense fallback={fallback || <PageLoader />}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
};

/**
 * Minimal suspense for small components
 */
export const MinimalSuspense: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Suspense fallback={<div className="animate-pulse bg-zinc-800 h-20 rounded" />}>
      {children}
    </Suspense>
  );
};
