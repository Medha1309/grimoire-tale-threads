/**
 * DollhouseRoomHeader Component
 * Unified header for all dollhouse rooms
 */

import React from 'react';
import { motion } from 'framer-motion';
import { dollhouseTokens } from '../../../design-system/dollhouse-tokens';
import { DollhouseBackButton } from './DollhouseButton';

interface DollhouseRoomHeaderProps {
  title: string;
  subtitle?: string;
  onBack: () => void;
  theme?: 'pink' | 'matrix';
  rightElement?: React.ReactNode;
}

export const DollhouseRoomHeader: React.FC<DollhouseRoomHeaderProps> = ({
  title,
  subtitle,
  onBack,
  theme = 'pink',
  rightElement,
}) => {
  const colors = theme === 'matrix' ? dollhouseTokens.colors.matrix : dollhouseTokens.colors.pink;
  const fonts = dollhouseTokens.typography.fonts;

  return (
    <header className="mb-12 flex items-center justify-between border-b pb-6 relative" style={{ borderColor: colors.border }}>
      {/* Dripping effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(to right, transparent, ${colors.border}, transparent)` }}>
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px"
            style={{
              left: `${(i + 1) * 20}%`,
              background: `linear-gradient(to bottom, ${colors.primary}4D, transparent)`,
            }}
            animate={{
              height: [0, 6, 0],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 1,
            }}
          />
        ))}
      </div>

      {/* Back button */}
      <DollhouseBackButton onClick={onBack} label="Back to Dollhouse" />

      {/* Title */}
      <div className="text-center relative">
        <motion.h2
          className={`${fonts.title} ${dollhouseTokens.typography.sizes.title.xl} tracking-wider mb-2 relative`}
          animate={{
            textShadow: [
              `0 0 15px ${colors.glow}`,
              `0 0 20px ${colors.glow.replace('0.4', '0.5')}`,
              `0 0 15px ${colors.glow}`,
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            color: colors.primary,
            textShadow: `0 0 15px ${colors.glow}`,
          }}
        >
          {title}
        </motion.h2>

        {subtitle && (
          <div className="flex items-center justify-center gap-2">
            <motion.span
              animate={{
                rotate: [0, 8, -8, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 6, repeat: Infinity }}
              className="text-lg opacity-30"
              style={{ filter: theme === 'pink' ? 'hue-rotate(320deg) saturate(0.6)' : 'none' }}
            >
              {theme === 'pink' ? '🥀' : '👁️'}
            </motion.span>
            <p className={`${dollhouseTokens.typography.sizes.body.xs} ${fonts.body} italic`} style={{ color: `${colors.primary}66` }}>
              {subtitle}
            </p>
            <motion.span
              animate={{
                rotate: [0, -8, 8, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 6, repeat: Infinity, delay: 1 }}
              className="text-lg opacity-30"
              style={{ filter: theme === 'pink' ? 'hue-rotate(320deg) saturate(0.6)' : 'none' }}
            >
              {theme === 'pink' ? '🥀' : '👁️'}
            </motion.span>
          </div>
        )}

        {/* Glow behind text */}
        <motion.div
          className="absolute inset-0 -z-10 blur-2xl"
          animate={{
            opacity: [0.15, 0.25, 0.15],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 5, repeat: Infinity }}
          style={{
            background: `radial-gradient(circle, ${colors.glow} 0%, transparent 70%)`,
          }}
        />
      </div>

      {/* Right element or spacer */}
      {rightElement || <div className="w-20" />}
    </header>
  );
};
