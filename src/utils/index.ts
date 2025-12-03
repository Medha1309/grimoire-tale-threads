/**
 * Centralized Utility Exports
 * Single entry point for all utility functions
 */

// Utilities
export * from './cache';
export * from './firebaseOptimizations';
export * from './stateManager';
export * from './animations';
export * from './classNames';
export * from './errorHandler';
export * from './encryption';

// Re-export commonly used functions
export {
  queryCache,
  imageCache,
  dataCache,
} from './cache';

export {
  QueryBuilder,
  BatchWriter,
  firestoreCache,
  executeOptimizedQuery,
  connectionPool,
} from './firebaseOptimizations';

export {
  StateManager,
  useStateManager,
  appState,
} from './stateManager';
