/**
 * ArchiveDoor Component
 * Minimal, cohesive archive access button
 */

import React from 'react';
import { motion } from 'framer-motion';
import { ArchiveContentType } from '../../types/archive';

interface ArchiveDoorProps {
  type: ArchiveContentType;
  itemCount: number;
  onClick: () => void;
}

export const ArchiveDoor: React.FC<ArchiveDoorProps> = ({ type, itemCount, onClick }) => {
  const themes = {
    diary: {
      title: 'Archive',
      borderColor: '#ffb6d9',
      textColor: '#ffb6d9',
    },
    reading: {
      title: 'Archive',
      borderColor: '#ffb6d9',
      textColor: '#ffb6d9',
    },
    scrapbook: {
      title: 'Archive',
      borderColor: '#ffb6d9',
      textColor: '#ffb6d9',
    },
    art: {
      title: 'Archive',
      borderColor: '#ffb6d9',
      textColor: '#ffb6d9',
    },
  };

  const theme = themes[type];

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="relative w-full px-6 py-4 rounded-lg border backdrop-blur-sm
                 transition-all duration-200 group"
      style={{
        borderColor: `${theme.borderColor}40`,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${theme.borderColor}80`;
        e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = `${theme.borderColor}40`;
        e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div 
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: theme.borderColor }}
          />
          <div className="text-left">
            <h3 className="text-sm font-serif tracking-wide" style={{ color: theme.textColor }}>
              {theme.title}
            </h3>
            {itemCount > 0 && (
              <p className="text-xs text-zinc-500 font-serif">
                {itemCount} {itemCount === 1 ? 'item' : 'items'}
              </p>
            )}
          </div>
        </div>

        <svg 
          className="w-4 h-4 transition-transform group-hover:translate-x-1" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          style={{ color: theme.textColor }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </motion.button>
  );
};
