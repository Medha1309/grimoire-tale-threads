/**
 * PageHeader Component
 * Reusable page header with consistent styling
 */

import React from 'react';
import { motion } from 'framer-motion';
import { BackButton } from '../shared/BackButton';
import { fadeInDown, transitions } from '../../utils/animation-system';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  backLabel?: string;
  actions?: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  onBack,
  backLabel = 'Back',
  actions,
  className = '',
  animate = true,
}) => {
  const Container = animate ? motion.header : 'header';
  const animationProps = animate
    ? {
        variants: fadeInDown,
        initial: 'initial',
        animate: 'animate',
        transition: transitions.smooth,
      }
    : {};

  return (
    <Container
      className={`mb-8 flex items-center justify-between border-b border-zinc-900/40 pb-6 ${className}`}
      {...animationProps}
    >
      {/* Back button */}
      {onBack && (
        <BackButton 
          onClick={onBack} 
          label={backLabel}
          variant="ghost"
        />
      )}

      {/* Title section */}
      <div className="flex-1 text-center">
        <h2 className="font-serif text-3xl tracking-wider text-[#ffb6d9]/90">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-sm text-zinc-500 font-serif">{subtitle}</p>
        )}
      </div>

      {/* Actions or spacer */}
      <div className="w-20">
        {actions}
      </div>
    </Container>
  );
};
