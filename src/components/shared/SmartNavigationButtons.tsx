/**
 * Smart Navigation Buttons
 * Improved navigation components with predictable behavior
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useAppNavigation } from '../../hooks/useAppNavigation';
import { ROUTES } from '../../config/routes';

interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  variant?: 'default' | 'ghost' | 'prominent';
}

interface SmartBackButtonProps extends BaseButtonProps {
  fallback?: string;
  label?: string;
  onBeforeNavigate?: () => boolean; // Return false to cancel navigation
}

/**
 * Smart Back Button - Goes to previous page or fallback
 */
export const SmartBackButton: React.FC<SmartBackButtonProps> = ({
  fallback = ROUTES.HOME,
  label = 'Back',
  onBeforeNavigate,
  variant = 'ghost',
  className = '',
  disabled = false,
}) => {
  const { goBack, canGoBack } = useAppNavigation();
  
  const handleClick = () => {
    if (disabled) return;
    
    // Check if navigation should proceed
    if (onBeforeNavigate && !onBeforeNavigate()) {
      return;
    }
    
    goBack(fallback);
  };
  
  const baseStyles = 'flex items-center gap-2 text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantStyles = {
    default: 'text-zinc-500 hover:text-zinc-300',
    ghost: 'text-zinc-400 hover:text-zinc-100 hover:gap-3',
    prominent: `px-6 py-3 rounded-lg font-serif tracking-wider
                bg-gradient-to-br from-zinc-900/80 to-black/80 
                border border-zinc-800/50 text-zinc-300
                hover:border-zinc-700/50 hover:text-zinc-100
                hover:shadow-lg hover:shadow-black/50`,
  };
  
  return (
    <motion.button
      onClick={handleClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      whileHover={{ scale: variant === 'prominent' ? 1.02 : 1 }}
      whileTap={{ scale: 0.98 }}
      title={canGoBack ? 'Go back to previous page' : `Go to ${fallback}`}
    >
      <span>←</span>
      <span>{label}</span>
    </motion.button>
  );
};

interface ExitButtonProps extends BaseButtonProps {
  destination?: string;
  label?: string;
  confirmMessage?: string;
  onBeforeNavigate?: () => boolean;
}

/**
 * Exit Button - Goes to specific destination with optional confirmation
 */
export const ExitButton: React.FC<ExitButtonProps> = ({
  destination = ROUTES.HOME,
  label = 'Exit',
  confirmMessage,
  onBeforeNavigate,
  variant = 'default',
  className = '',
  disabled = false,
}) => {
  const { goTo, exitWithConfirmation } = useAppNavigation();
  
  const handleClick = () => {
    if (disabled) return;
    
    // Check if navigation should proceed
    if (onBeforeNavigate && !onBeforeNavigate()) {
      return;
    }
    
    // Show confirmation if message provided
    if (confirmMessage) {
      exitWithConfirmation(confirmMessage, destination);
    } else {
      // Navigate directly based on destination
      if (destination === ROUTES.HOME) goTo.home();
      else if (destination === ROUTES.STORIES) goTo.stories();
      else if (destination === ROUTES.FORUM) goTo.forum();
      else if (destination === ROUTES.DIARY) goTo.diary();
      else goTo.home(); // Fallback
    }
  };
  
  const baseStyles = 'flex items-center gap-2 text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantStyles = {
    default: 'text-zinc-500 hover:text-zinc-300',
    ghost: 'text-zinc-400 hover:text-zinc-100',
    prominent: `px-6 py-3 rounded-lg font-mono tracking-wider
                bg-gradient-to-br from-red-900/20 to-black/80 
                border border-red-900/30 text-red-400
                hover:border-red-900/50 hover:text-red-300
                hover:shadow-lg hover:shadow-red-900/20`,
  };
  
  return (
    <motion.button
      onClick={handleClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      whileHover={{ scale: variant === 'prominent' ? 1.02 : 1 }}
      whileTap={{ scale: 0.98 }}
    >
      <span>✕</span>
      <span>{label}</span>
    </motion.button>
  );
};

interface HomeButtonProps extends BaseButtonProps {
  label?: string;
}

/**
 * Home Button - Always goes to home page
 */
export const HomeButton: React.FC<HomeButtonProps> = ({
  label = 'Home',
  variant = 'prominent',
  className = '',
  disabled = false,
}) => {
  const { goTo } = useAppNavigation();
  
  const handleClick = () => {
    if (disabled) return;
    goTo.home();
  };
  
  const baseStyles = 'flex items-center gap-2 text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantStyles = {
    default: 'text-zinc-500 hover:text-zinc-300',
    ghost: 'text-zinc-400 hover:text-zinc-100',
    prominent: `px-6 py-3 rounded-lg font-serif tracking-wider
                bg-gradient-to-br from-zinc-900/80 to-black/80 
                border border-zinc-800/50 text-zinc-300
                hover:border-zinc-700/50 hover:text-zinc-100
                hover:shadow-lg hover:shadow-black/50`,
  };
  
  return (
    <motion.button
      onClick={handleClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      whileHover={{ scale: variant === 'prominent' ? 1.02 : 1 }}
      whileTap={{ scale: 0.98 }}
    >
      <span>🏠</span>
      <span>{label}</span>
    </motion.button>
  );
};

interface CancelButtonProps extends BaseButtonProps {
  onCancel: () => void;
  label?: string;
  confirmMessage?: string;
}

/**
 * Cancel Button - Closes modal/form with optional confirmation
 */
export const CancelButton: React.FC<CancelButtonProps> = ({
  onCancel,
  label = 'Cancel',
  confirmMessage,
  variant = 'default',
  className = '',
  disabled = false,
}) => {
  const handleClick = () => {
    if (disabled) return;
    
    if (confirmMessage) {
      if (window.confirm(confirmMessage)) {
        onCancel();
      }
    } else {
      onCancel();
    }
  };
  
  const baseStyles = 'flex items-center gap-2 text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantStyles = {
    default: 'text-zinc-500 hover:text-zinc-300',
    ghost: 'text-zinc-400 hover:text-zinc-100',
    prominent: `px-6 py-3 rounded-lg font-serif
                bg-zinc-900/50 border border-zinc-800/50 text-zinc-400
                hover:border-zinc-700/50 hover:text-zinc-300`,
  };
  
  return (
    <motion.button
      onClick={handleClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span>{label}</span>
    </motion.button>
  );
};

/**
 * Navigation Group - Container for navigation buttons
 */
interface NavigationGroupProps {
  children: React.ReactNode;
  position?: 'left' | 'center' | 'right' | 'between';
  className?: string;
}

export const NavigationGroup: React.FC<NavigationGroupProps> = ({
  children,
  position = 'between',
  className = '',
}) => {
  const positionStyles = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
    between: 'justify-between',
  };
  
  return (
    <div className={`flex items-center gap-4 ${positionStyles[position]} ${className}`}>
      {children}
    </div>
  );
};

/**
 * Breadcrumbs - Show navigation path
 */
export const Breadcrumbs: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { location } = useAppNavigation();
  
  const crumbs = React.useMemo(() => {
    const paths = location.pathname.split('/').filter(Boolean);
    return paths.map((path, index) => ({
      label: path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' '),
      path: `/${paths.slice(0, index + 1).join('/')}`,
      isLast: index === paths.length - 1,
    }));
  }, [location.pathname]);
  
  if (crumbs.length === 0) return null;
  
  return (
    <nav aria-label="Breadcrumb" className={`text-sm ${className}`}>
      <ol className="flex items-center gap-2">
        <li>
          <a href={ROUTES.HOME} className="text-zinc-500 hover:text-zinc-300 transition-colors">
            Home
          </a>
        </li>
        {crumbs.map((crumb) => (
          <li key={crumb.path} className="flex items-center gap-2">
            <span className="text-zinc-600">/</span>
            {crumb.isLast ? (
              <span className="text-zinc-400" aria-current="page">
                {crumb.label}
              </span>
            ) : (
              <a href={crumb.path} className="text-zinc-500 hover:text-zinc-300 transition-colors">
                {crumb.label}
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default {
  SmartBackButton,
  ExitButton,
  HomeButton,
  CancelButton,
  NavigationGroup,
  Breadcrumbs,
};
