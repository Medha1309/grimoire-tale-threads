import { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * Error boundary component to catch and display errors gracefully
 */
export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl text-center"
          >
            <h1 className="text-4xl font-serif text-red-500 mb-4">
              Something went wrong
            </h1>
            <p className="text-zinc-400 mb-8">
              The darkness consumed this page. Try refreshing or return home.
            </p>
            {this.state.error && (
              <pre className="text-left text-xs text-zinc-600 bg-zinc-900 p-4 rounded overflow-auto mb-8">
                {this.state.error.message}
              </pre>
            )}
            <button
              onClick={() => window.location.href = '/'}
              className="px-6 py-3 bg-red-900/20 border border-red-900/40 text-red-400 
                       rounded-lg hover:bg-red-900/30 transition-colors"
            >
              Return Home
            </button>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}
