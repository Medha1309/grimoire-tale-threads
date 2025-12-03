/**
 * Centralized Component Exports
 * Single entry point for commonly used components
 */

// Layout components
export { ErrorBoundary } from './ErrorBoundary';
export { PageLoader } from './PageLoader';
export { Navbar } from './Navbar';
export { Footer } from './Footer';
export { PageWrapper } from './PageWrapper';
export { ProtectedRoute } from './ProtectedRoute';

// Shared components
export { Card } from './shared/Card';
export { Modal } from './shared/Modal';
export { LoadingState } from './shared/LoadingState';
export { ErrorState } from './shared/ErrorState';
export { WritingEditor } from './shared/WritingEditor';
export { OptimizedImageComponent } from './shared/OptimizedImageComponent';
export { Toast } from './shared/Toast';

// Optimized components
export { 
  withMemo, 
  lazyWithRetry, 
  SuspenseWrapper, 
  ConditionalRender, 
  ViewportRender 
} from './OptimizedComponent';

// Effects
export { TitleBarScare, BloodCursor, PageTearOverlay } from './Effects';
export { SpiderField, DirtyFlies, SpiderSVG } from './Creatures';

// UI components (using shared components)
export { Button } from './shared/Button';
export { Input, Textarea } from './shared/Input';
