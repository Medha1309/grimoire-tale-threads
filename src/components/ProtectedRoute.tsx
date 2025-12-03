import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ROUTES } from '../config/routes';
import { motion } from 'framer-motion';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * ProtectedRoute component that redirects to login if user is not authenticated
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { currentUser, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <section className="relative min-h-screen bg-black text-zinc-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="animate-pulse text-zinc-500">Checking authentication...</div>
        </motion.div>
      </section>
    );
  }

  // Redirect to login if not authenticated
  if (!currentUser) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  // Render children if authenticated
  return <>{children}</>;
};
