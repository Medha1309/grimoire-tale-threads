/**
 * DollhouseButton Component
 * Unified button styling for all Dollhouse interactions
 * Consistent with the gothic-romantic aesthetic
 */

import React from 'react';
import { motion } from 'framer-motion';
import { dollhouseTokens } from '../../../design-system/dollhouse-tokens';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface DollhouseButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

export const DollhouseButton: React.FC<DollhouseButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  className = '',
  fullWidth = false,
}) => {
  // Size configurations
  const sizeStyles = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  // Variant configurations
  const variantStyles = {
    primary: {
      bg: 'bg-gradient-to-br from-zinc-900/80 to-black/80',
      border: `border border-[${dollhouseTokens.colors.pink.primary}]/30`,
      text: 'text-zinc-200',
      hover: `hover:border-[${dollhouseTokens.colors.pink.primary}]/50 hover:text-zinc-100`,
      glow: dollhouseTokens.colors.pink.glow,
    },
    secondary: {
      bg: 'bg-zinc-900/40',
      border: 'border border-zinc-800/50',
      text: 'text-zinc-400',
      hover: 'hover:border-zinc-700/50 hover:text-zinc-300',
      glow: 'rgba(255, 255, 255, 0.1)',
    },
    ghost: {
      bg: 'bg-transparent',
      border: 'border-none',
      text: 'text-zinc-500',
      hover: 'hover:text-zinc-300',
      glow: 'transparent',
    },
    danger: {
      bg: 'bg-red-950/30',
      border: 'border border-red-900/40',
      text: 'text-red-400',
      hover: 'hover:border-red-800/60 hover:text-red-300',
      glow: 'rgba(220, 38, 38, 0.3)',
    },
  };

  const style = variantStyles[variant];

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        relative
        ${sizeStyles[size]}
        ${style.bg}
        ${style.border}
        ${style.text}
        ${style.hover}
        ${fullWidth ? 'w-full' : ''}
        rounded-lg
        font-serif
        tracking-wider
        uppercase
        transition-all
        duration-300
        disabled:opacity-50
        disabled:cursor-not-allowed
        backdrop-blur-sm
        overflow-hidden
        group
        ${className}
      `}
      whileHover={!disabled && !loading ? { scale: 1.02, y: -2 } : undefined}
      whileTap={!disabled && !loading ? { scale: 0.98 } : undefined}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${style.glow} 0%, transparent 70%)`,
          filter: 'blur(20px)',
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-60 transition-opacity duration-300"
        style={{
          background: `linear-gradient(to right, transparent, ${dollhouseTokens.colors.pink.primary}, transparent)`,
        }}
      />

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {loading && (
          <motion.span
            className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        )}
        {icon && <span>{icon}</span>}
        <span>{children}</span>
      </span>
    </motion.button>
  );
};

// Pre-configured button variants for common actions
export const DollhouseBackButton: React.FC<{
  onClick?: () => void;
  label?: string;
  className?: string;
}> = ({ onClick, label = 'Back', className = '' }) => (
  <DollhouseButton
    onClick={onClick}
    variant="ghost"
    size="sm"
    className={className}
  >
    ← {label}
  </DollhouseButton>
);

export const DollhouseSaveButton: React.FC<{
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  label?: string;
}> = ({ onClick, loading, disabled, label = 'Save' }) => (
  <DollhouseButton
    onClick={onClick}
    variant="primary"
    size="md"
    loading={loading}
    disabled={disabled}
  >
    {label}
  </DollhouseButton>
);

export const DollhouseCancelButton: React.FC<{
  onClick?: () => void;
  label?: string;
}> = ({ onClick, label = 'Cancel' }) => (
  <DollhouseButton onClick={onClick} variant="secondary" size="md">
    {label}
  </DollhouseButton>
);

export const DollhouseDeleteButton: React.FC<{
  onClick?: () => void;
  loading?: boolean;
  label?: string;
}> = ({ onClick, loading, label = 'Delete' }) => (
  <DollhouseButton
    onClick={onClick}
    variant="danger"
    size="md"
    loading={loading}
  >
    {label}
  </DollhouseButton>
);
