/**
 * Enhanced Brush Palette Component
 * Extended brush collection with new types
 */

import React from 'react';
import { motion } from 'framer-motion';
import { BrushType } from '../../types/artwork';

interface EnhancedBrushPaletteProps {
  selectedBrush: BrushType;
  onSelectBrush: (brush: BrushType) => void;
}

const BRUSHES: Array<{
  type: BrushType;
  name: string;
  icon: string;
  description: string;
  color: string;
}> = [
  {
    type: 'blood',
    name: 'Blood',
    icon: '†',
    description: 'Drips & splatters',
    color: '#8B0000',
  },
  {
    type: 'charcoal',
    name: 'Charcoal',
    icon: '◆',
    description: 'Grainy texture',
    color: '#2a2a2a',
  },
  {
    type: 'ink',
    name: 'Ink',
    icon: '✒',
    description: 'Precise lines',
    color: '#000000',
  },
  {
    type: 'scratch',
    name: 'Scratch',
    icon: '✦',
    description: 'Inverts colors',
    color: '#ffffff',
  },
  {
    type: 'decay',
    name: 'Decay',
    icon: '☠',
    description: 'Organic spread',
    color: '#4a5a3a',
  },
  {
    type: 'ethereal',
    name: 'Ethereal',
    icon: '⚝',
    description: 'Soft glow',
    color: '#ffb6d9',
  },
  {
    type: 'watercolor',
    name: 'Watercolor',
    icon: '~',
    description: 'Bleeds & flows',
    color: '#4682B4',
  },
  {
    type: 'oil',
    name: 'Oil',
    icon: '▓',
    description: 'Thick impasto',
    color: '#8B4513',
  },
  {
    type: 'neon',
    name: 'Neon',
    icon: '◉',
    description: 'Bright glow',
    color: '#00FF00',
  },
  {
    type: 'smoke',
    name: 'Smoke',
    icon: '≋',
    description: 'Fades away',
    color: '#696969',
  },
];

export const EnhancedBrushPalette: React.FC<EnhancedBrushPaletteProps> = ({
  selectedBrush,
  onSelectBrush,
}) => {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-serif text-[#ffb6d9]/80 tracking-wider uppercase">
        Brushes
      </h3>
      <div className="grid grid-cols-2 gap-2 max-h-[600px] overflow-y-auto pr-2
                      scrollbar-thin scrollbar-thumb-[#ffb6d9]/20 scrollbar-track-zinc-900/50">
        {BRUSHES.map((brush) => {
          const isSelected = selectedBrush === brush.type;
          return (
            <motion.button
              key={brush.type}
              onClick={() => onSelectBrush(brush.type)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`
                relative p-3 rounded-lg border-2 transition-all duration-200
                ${isSelected
                  ? 'border-[#ffb6d9]/60 bg-[#ffb6d9]/10'
                  : 'border-zinc-800/60 bg-zinc-900/30 hover:border-[#ffb6d9]/30'
                }
              `}
              style={{
                boxShadow: isSelected
                  ? `0 0 20px ${brush.color}40, inset 0 0 10px ${brush.color}20`
                  : 'none',
              }}
            >
              {isSelected && (
                <motion.div
                  layoutId="brush-selected"
                  className="absolute inset-0 rounded-lg"
                  style={{
                    background: `radial-gradient(circle at center, ${brush.color}20 0%, transparent 70%)`,
                  }}
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              
              <div className="relative z-10 flex flex-col items-center gap-1">
                <span className="text-2xl">{brush.icon}</span>
                <span className="text-xs font-serif text-zinc-300">
                  {brush.name}
                </span>
                <span className="text-[9px] font-serif text-zinc-500 text-center leading-tight">
                  {brush.description}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
