/**
 * Chain Letter Card Component - Tombstone Redesign
 * Displays a chain letter as an elegant tombstone
 */

import React from 'react';
import { motion } from 'framer-motion';
import { ChainLetter } from '../../types/chainLetter';

interface ChainLetterCardProps {
  chain: ChainLetter;
  onClick: () => void;
  isOwned?: boolean;
}

const CURSE_COLORS = {
  1: { main: '#71717a', glow: '113, 113, 122' },
  2: { main: '#8b5cf6', glow: '139, 92, 246' },
  3: { main: '#ec4899', glow: '236, 72, 153' },
  4: { main: '#ef4444', glow: '239, 68, 68' },
  5: { main: '#dc2626', glow: '220, 38, 38' },
};

const CURSE_LABELS = {
  1: 'Whispered',
  2: 'Haunted',
  3: 'Cursed',
  4: 'Damned',
  5: 'Forsaken',
};

const CURSE_ICONS = {
  1: '🕯',
  2: '👻',
  3: '💀',
  4: '⚰',
  5: '☠',
};

export const ChainLetterCard: React.FC<ChainLetterCardProps> = ({ chain, onClick, isOwned }) => {
  const curseColor = CURSE_COLORS[chain.curseLevel];
  const curseLabel = CURSE_LABELS[chain.curseLevel];
  const curseIcon = CURSE_ICONS[chain.curseLevel];
  
  const daysRemaining = chain.status === 'active' 
    ? Math.ceil((chain.expiresAt.toDate().getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : 0;

  const isUrgent = daysRemaining <= 2 && chain.status === 'active';

  return (
    <motion.article
      onClick={onClick}
      className="group relative cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Ethereal glow effect */}
      <motion.div
        className="absolute -inset-4 rounded-t-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
        style={{ 
          background: `radial-gradient(ellipse at center, rgba(${curseColor.glow}, 0.4) 0%, transparent 70%)`,
        }}
      />

      {/* Tombstone structure */}
      <div className="relative">
        {/* Main tombstone body */}
        <div
          className="relative overflow-hidden rounded-t-[100px] shadow-2xl backdrop-blur-sm"
          style={{
            background: `linear-gradient(180deg, rgba(39, 39, 42, 0.95) 0%, rgba(24, 24, 27, 0.98) 100%)`,
            border: `3px solid rgba(${curseColor.glow}, 0.3)`,
            boxShadow: `
              0 20px 60px rgba(0, 0, 0, 0.9),
              inset 0 2px 8px rgba(255, 255, 255, 0.03),
              0 0 40px rgba(${curseColor.glow}, 0.2)
            `,
          }}
        >
          {/* Stone texture overlay */}
          <div 
            className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width="200" height="200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" /%3E%3C/filter%3E%3Crect width="200" height="200" filter="url(%23noise)" opacity="0.4"/%3E%3C/svg%3E")',
            }}
          />

          {/* Crack effect */}
          <motion.div
            className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-zinc-700/40 to-transparent"
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 5, repeat: Infinity }}
          />

          {/* Status badge */}
          <div className="absolute top-4 right-4 z-10">
            {chain.status === 'active' && isOwned && (
              <motion.div 
                className="px-4 py-2 rounded-lg text-xs font-serif backdrop-blur-sm"
                style={{
                  background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(168, 85, 247, 0.2))',
                  border: '2px solid rgba(139, 92, 246, 0.5)',
                  color: '#c4b5fd',
                  boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)',
                }}
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                YOUR TURN
              </motion.div>
            )}
            {chain.status === 'completed' && (
              <div className="px-4 py-2 rounded-lg text-xs font-serif backdrop-blur-sm"
                style={{
                  background: 'rgba(16, 185, 129, 0.2)',
                  border: '2px solid rgba(16, 185, 129, 0.4)',
                  color: '#6ee7b7',
                }}
              >
                COMPLETED
              </div>
            )}
            {(chain.status === 'broken' || chain.status === 'expired') && (
              <div className="px-4 py-2 rounded-lg text-xs font-serif backdrop-blur-sm"
                style={{
                  background: 'rgba(239, 68, 68, 0.2)',
                  border: '2px solid rgba(239, 68, 68, 0.4)',
                  color: '#fca5a5',
                }}
              >
                BROKEN
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-8 relative z-10">
            {/* Curse icon at top */}
            <div className="text-center mb-4">
              <motion.div 
                className="text-5xl inline-block"
                animate={{ 
                  rotate: [0, -5, 5, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                {curseIcon}
              </motion.div>
            </div>

            {/* Title - Engraved style */}
            <h3 
              className="font-serif text-2xl text-center mb-4 leading-tight"
              style={{
                color: '#e5e7eb',
                textShadow: `
                  0 2px 4px rgba(0, 0, 0, 0.9),
                  0 0 20px rgba(${curseColor.glow}, 0.3)
                `,
              }}
            >
              {chain.title}
            </h3>

            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-zinc-600" />
              <div className="text-zinc-600 text-xs">✝</div>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-zinc-600" />
            </div>

            {/* Curse level badge */}
            <div className="flex justify-center mb-4">
              <div
                className="px-4 py-2 rounded-lg text-xs font-serif uppercase tracking-wider"
                style={{
                  backgroundColor: `rgba(${curseColor.glow}, 0.15)`,
                  color: curseColor.main,
                  border: `1px solid rgba(${curseColor.glow}, 0.3)`,
                  boxShadow: `0 0 15px rgba(${curseColor.glow}, 0.2)`,
                }}
              >
                {curseLabel} • Level {chain.curseLevel}
              </div>
            </div>

            {/* Metadata */}
            <div className="flex items-center justify-center gap-3 text-xs text-zinc-500 mb-5 font-serif">
              <span className="capitalize">{chain.genre}</span>
              <span>•</span>
              <span>{chain.chainLength} links</span>
              <span>•</span>
              <span>{chain.totalWords.toLocaleString()} words</span>
            </div>

            {/* Preview text */}
            <p className="text-sm text-zinc-400 line-clamp-4 mb-5 leading-relaxed text-center font-serif italic px-2">
              "{chain.chapters[chain.chapters.length - 1]?.content.substring(0, 150)}..."
            </p>

            {/* Footer info */}
            <div className="pt-5 border-t border-zinc-800/50 space-y-2">
              <div className="text-xs text-zinc-500 text-center font-serif">
                <div>Started by <span className="text-zinc-400">{chain.originatorName}</span></div>
                <div className="mt-1">Currently with <span className="text-zinc-400">{chain.currentHolderName}</span></div>
              </div>

              {chain.status === 'active' && (
                <motion.div 
                  className={`text-xs font-serif text-center pt-2 ${isUrgent ? 'text-red-400' : 'text-zinc-500'}`}
                  animate={isUrgent ? { opacity: [0.6, 1, 0.6] } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {isUrgent && '⚠️ '}
                  {daysRemaining} day{daysRemaining !== 1 ? 's' : ''} left
                </motion.div>
              )}
            </div>
          </div>

          {/* Pulsing border for owned chains */}
          {chain.status === 'active' && isOwned && (
            <motion.div
              className="absolute inset-0 rounded-t-[100px] pointer-events-none"
              style={{ border: `3px solid ${curseColor.main}` }}
              animate={{ opacity: [0.3, 0.9, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </div>

        {/* Tombstone base */}
        <div 
          className="h-4 rounded-b-lg"
          style={{
            background: 'linear-gradient(180deg, rgba(24, 24, 27, 0.98) 0%, rgba(9, 9, 11, 1) 100%)',
            borderLeft: `3px solid rgba(${curseColor.glow}, 0.3)`,
            borderRight: `3px solid rgba(${curseColor.glow}, 0.3)`,
            borderBottom: `3px solid rgba(${curseColor.glow}, 0.3)`,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.9)',
          }}
        />
      </div>
    </motion.article>
  );
};
