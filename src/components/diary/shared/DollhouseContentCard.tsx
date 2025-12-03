/**
 * DollhouseContentCard Component
 * Unified card design with book spine aesthetic
 */

import React from 'react';
import { motion } from 'framer-motion';
import { dollhouseTokens } from '../../../design-system/dollhouse-tokens';

interface DollhouseContentCardProps {
  children: React.ReactNode;
  onClick?: () => void;
  mood?: 'joy' | 'sorrow' | 'calm' | 'unrest';
  theme?: 'pink' | 'matrix';
  index?: number;
  className?: string;
}

const MOOD_COLORS = {
  joy: '#ffd700',
  sorrow: '#6b7280',
  calm: '#93c5fd',
  unrest: '#a53e3e',
};

export const DollhouseContentCard: React.FC<DollhouseContentCardProps> = ({
  children,
  onClick,
  mood,
  theme = 'pink',
  index = 0,
  className = '',
}) => {
  const colors = theme === 'matrix' ? dollhouseTokens.colors.matrix : dollhouseTokens.colors.pink;
  const moodColor = mood ? MOOD_COLORS[mood] : colors.primary;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -8, scale: 1.02 }}
      onClick={onClick}
      className={`group relative cursor-pointer ${className}`}
      style={{ perspective: '1000px' }}
    >
      {/* Outer glow */}
      <motion.div
        className="absolute -inset-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
        style={{
          background: `radial-gradient(circle at center, ${moodColor}40 0%, transparent 70%)`,
        }}
      />

      {/* Card body - book spine style */}
      <motion.div
        className="relative aspect-[2/3] overflow-hidden rounded-r-lg shadow-2xl"
        style={{
          background: 'linear-gradient(to right, #1a1410 0%, #2a2420 3%, #3a3430 5%, #2a2420 100%)',
          boxShadow: dollhouseTokens.shadows.card.book + `, 0 0 20px ${moodColor}30`,
          borderRight: `2px solid ${moodColor}`,
        }}
      >
        {/* Book spine shadow */}
        <div className="absolute left-0 top-0 bottom-0 w-[5%] bg-gradient-to-r from-black/60 to-transparent" />

        {/* Content overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/85 via-black/80 to-zinc-950/85">
          {/* Mood glow animation */}
          {mood && (
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  `radial-gradient(circle at 50% 50%, ${moodColor}20 0%, transparent 60%)`,
                  `radial-gradient(circle at 50% 50%, ${moodColor}40 0%, transparent 70%)`,
                  `radial-gradient(circle at 50% 50%, ${moodColor}20 0%, transparent 60%)`,
                ],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}

          {/* Inner border */}
          <div
            className="absolute inset-0 border-4 m-4 rounded"
            style={{ borderColor: `${colors.primary}1A` }}
          />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col p-6 overflow-hidden z-10">
            {children}
          </div>
        </div>

        {/* Book spine highlight */}
        <motion.div
          className="absolute right-0 top-2 bottom-2 w-1 bg-gradient-to-b from-amber-100/10 via-amber-50/5 to-amber-100/10"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </motion.article>
  );
};
