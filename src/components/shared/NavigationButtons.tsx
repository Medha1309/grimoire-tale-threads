/**
 * Reusable Navigation Buttons
 * Consistent back/next/home buttons across the app with enhanced visual flair
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../config/routes';

interface NavigationButtonProps {
  onClick?: () => void;
  to?: string;
  children: React.ReactNode;
  variant?: 'default' | 'ghost' | 'prominent';
  className?: string;
  disabled?: boolean;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  onClick,
  to,
  children,
  variant = 'default',
  className = '',
  disabled = false,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (disabled) return;
    if (onClick) {
      onClick();
    } else if (to) {
      navigate(to);
    }
  };

  const baseStyles = 'relative flex items-center gap-2 text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group';
  
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
      whileHover={{ scale: variant === 'prominent' ? 1.02 : 1.05, x: variant === 'ghost' ? -4 : 0 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {/* Subtle glow effect on hover */}
      {variant !== 'prominent' && (
        <motion.div
          className="absolute inset-0 rounded-lg bg-gradient-to-r from-zinc-800/0 via-zinc-700/20 to-zinc-800/0 opacity-0 group-hover:opacity-100 blur-sm"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};

// Pre-configured navigation buttons with enhanced animations
export const BackButton: React.FC<Omit<NavigationButtonProps, 'children'> & { label?: string }> = ({ 
  label = 'Back', 
  variant = 'ghost',
  ...props 
}) => (
  <NavigationButton variant={variant} {...props}>
    <motion.span
      className="inline-block"
      initial={{ x: 0 }}
      whileHover={{ x: -3 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      ←
    </motion.span>
    <span className="font-medium">{label}</span>
  </NavigationButton>
);

export const NextButton: React.FC<Omit<NavigationButtonProps, 'children'> & { label?: string }> = ({ 
  label = 'Next', 
  ...props 
}) => (
  <NavigationButton {...props}>
    <span>{label}</span>
    <span>→</span>
  </NavigationButton>
);

export const HomeButton: React.FC<Omit<NavigationButtonProps, 'children' | 'to'> & { label?: string }> = ({ 
  label = 'Home', 
  variant = 'prominent',
  ...props 
}) => (
  <NavigationButton to={ROUTES.HOME} variant={variant} {...props}>
    <span>🏠</span>
    <span>{label}</span>
  </NavigationButton>
);

export const ExitButton: React.FC<Omit<NavigationButtonProps, 'children' | 'to'> & { label?: string }> = ({ 
  label = 'EXIT', 
  ...props 
}) => (
  <NavigationButton to={ROUTES.HOME} {...props}>
    <span>←</span>
    <span className="font-mono tracking-wider">{label}</span>
  </NavigationButton>
);

// Navigation button group for consistent layouts
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

// Fixed position back button wrapper for consistent placement
interface FixedBackButtonProps {
  onClick?: () => void;
  to?: string;
  label?: string;
  variant?: 'default' | 'ghost' | 'prominent';
  position?: 'top-left' | 'top-right';
}

export const FixedBackButton: React.FC<FixedBackButtonProps> = ({
  position = 'top-left',
  ...props
}) => {
  const positionStyles = {
    'top-left': 'fixed top-6 left-6 z-50',
    'top-right': 'fixed top-6 right-6 z-50',
  };

  return (
    <motion.div
      className={positionStyles[position]}
      initial={{ opacity: 0, x: position === 'top-left' ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 20 }}
    >
      <BackButton {...props} />
    </motion.div>
  );
};
