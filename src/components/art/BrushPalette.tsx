/**
 * Brush Palette Component
 * Gothic-themed brush selector with visual previews
 */

import React from 'react';
import { motion } from 'framer-motion';
import { BrushType } from '../../types/artwork';

interface BrushPaletteProps {
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
    description: 'Dripping crimson strokes',
    color: '#8B0000',
  },
  {
    type: 'charcoal',
    name: 'Charcoal',
    icon: '◆',
    description: 'Rough, textured marks',
    color: '#2a2a2a',
  },
  {
    type: 'ink',
    name: 'Ink',
    icon: '✒',
    description: 'Smooth, dark lines',
    color: '#000000',
  },
  {
    type: 'scratch',
    name: 'Scratch',
    icon: '✦',
    description: 'Jagged, haunting marks',
    color: '#ffffff',
  },
  {
    type: 'decay',
    name: 'Decay',
    icon: '☠',
    description: 'Moldy, aged texture',
    color: '#4a5a3a',
  },
  {
    type: 'ethereal',
    name: 'Ethereal',
    icon: '⚝',
    description: 'Ghostly, glowing strokes',
    color: '#ffb6d9',
  },
];

export const BrushPalette: React.FC<BrushPaletteProps> = ({
  selectedBrush,
  onSelectBrush,
}) => {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-serif text-[#ffb6d9]/80 tracking-wider uppercase">
        Cursed Brushes
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {BRUSHES.map((brush) => {
          const isSelected = selectedBrush === brush.type;
          return (
            <motion.button
              key={brush.type}
              onClick={() => onSelectBrush(brush.type)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`
                relative p-4 rounded-lg border-2 transition-all duration-200
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
              
              <div className="relative z-10 flex flex-col items-center gap-2">
                <span className="text-3xl">{brush.icon}</span>
                <span className="text-xs font-serif text-zinc-300">
                  {brush.name}
                </span>
                <span className="text-[10px] font-serif text-zinc-500 text-center leading-tight">
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
