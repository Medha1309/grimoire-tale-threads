/**
 * DollhouseEmptyState Component
 * Unified empty state for all dollhouse rooms
 */

import React from 'react';
import { motion } from 'framer-motion';
import { dollhouseTokens } from '../../../design-system/dollhouse-tokens';

interface DollhouseEmptyStateProps {
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
  theme?: 'pink' | 'matrix';
  icon?: string;
}

export const DollhouseEmptyState: React.FC<DollhouseEmptyStateProps> = ({
  title,
  description,
  actionLabel,
  onAction,
  theme = 'pink',
  icon = '🥀',
}) => {
  const colors = theme === 'matrix' ? dollhouseTokens.colors.matrix : dollhouseTokens.colors.pink;
  const fonts = dollhouseTokens.typography.fonts;

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <p className={`${dollhouseTokens.typography.sizes.title.sm} ${fonts.title} mb-2`} style={{ color: dollhouseTokens.colors.neutral.text.secondary }}>
        {title}
      </p>
      <p className={`${dollhouseTokens.typography.sizes.body.sm} ${fonts.body} mb-8 text-center max-w-md`} style={{ color: dollhouseTokens.colors.neutral.text.tertiary }}>
        {description}
      </p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onAction}
        className={`px-6 py-3 rounded-lg ${fonts.body} ${dollhouseTokens.typography.sizes.body.sm} transition-colors`}
        style={{
          border: `1px solid ${colors.border}`,
          color: colors.primary,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = colors.subtle;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
        }}
      >
        {actionLabel}
      </motion.button>

      {/* Decorative elements */}
      <div className="flex gap-4 mt-8">
        {[...Array(5)].map((_, i) => (
          <motion.span
            key={i}
            className="text-3xl opacity-30"
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.3,
            }}
            style={{
              filter: theme === 'pink' 
                ? 'drop-shadow(0 0 10px rgba(255,255,255,0.8))' 
                : `drop-shadow(0 0 10px ${colors.primary})`,
            }}
          >
            {icon}
          </motion.span>
        ))}
      </div>
    </div>
  );
};
