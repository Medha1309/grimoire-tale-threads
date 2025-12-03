/**
 * Color Palette Component
 * Gothic horror color schemes
 */

import React from 'react';
import { motion } from 'framer-motion';

interface ColorPaletteProps {
  selectedColor: string;
  onSelectColor: (color: string) => void;
}

const GOTHIC_COLORS = [
  // Reds & Pinks
  { name: 'Blood Red', hex: '#8B0000' },
  { name: 'Crimson', hex: '#DC143C' },
  { name: 'Rose Blood', hex: '#C41E3A' },
  { name: 'Ethereal Pink', hex: '#ffb6d9' },
  { name: 'Flesh', hex: '#FFCBA4' },
  { name: 'Rust', hex: '#B7410E' },
  
  // Purples & Blues
  { name: 'Deep Purple', hex: '#4B0082' },
  { name: 'Violet', hex: '#8B00FF' },
  { name: 'Midnight', hex: '#191970' },
  { name: 'Abyss Blue', hex: '#000080' },
  { name: 'Teal Shadow', hex: '#008080' },
  { name: 'Ice Blue', hex: '#87CEEB' },
  
  // Greens
  { name: 'Decay Green', hex: '#4a5a3a' },
  { name: 'Mold', hex: '#6B8E23' },
  { name: 'Poison', hex: '#00FF00' },
  { name: 'Forest', hex: '#228B22' },
  
  // Grays & Blacks
  { name: 'Pure Black', hex: '#000000' },
  { name: 'Charcoal', hex: '#36454F' },
  { name: 'Slate', hex: '#708090' },
  { name: 'Ash', hex: '#B2BEB5' },
  { name: 'Silver', hex: '#C0C0C0' },
  
  // Whites & Creams
  { name: 'Bone', hex: '#E3DAC9' },
  { name: 'Ivory', hex: '#FFFFF0' },
  { name: 'Ghost White', hex: '#F8F8FF' },
  
  // Golds & Oranges
  { name: 'Gold', hex: '#d4af37' },
  { name: 'Amber', hex: '#FFBF00' },
  { name: 'Copper', hex: '#B87333' },
  { name: 'Burnt Orange', hex: '#CC5500' },
  
  // Browns
  { name: 'Sepia', hex: '#704214' },
  { name: 'Umber', hex: '#635147' },
  { name: 'Mahogany', hex: '#C04000' },
];

export const ColorPalette: React.FC<ColorPaletteProps> = ({
  selectedColor,
  onSelectColor,
}) => {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-serif text-[#ffb6d9]/80 tracking-wider uppercase">
        Color Palette
      </h3>
      <div className="grid grid-cols-6 gap-2 max-h-[400px] overflow-y-auto pr-2
                      scrollbar-thin scrollbar-thumb-[#ffb6d9]/20 scrollbar-track-zinc-900/50">
        {GOTHIC_COLORS.map((color) => {
          const isSelected = selectedColor === color.hex;
          return (
            <motion.button
              key={color.hex}
              onClick={() => onSelectColor(color.hex)}
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className={`
                relative w-10 h-10 rounded-lg border-2 transition-all duration-200
                ${isSelected
                  ? 'border-[#ffb6d9] ring-2 ring-[#ffb6d9]/30'
                  : 'border-zinc-700/60 hover:border-[#ffb6d9]/50'
                }
              `}
              style={{
                backgroundColor: color.hex,
                boxShadow: isSelected
                  ? `0 0 15px ${color.hex}60, 0 4px 10px rgba(0,0,0,0.5)`
                  : '0 2px 5px rgba(0,0,0,0.3)',
              }}
              title={color.name}
            >
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <span className="text-white text-xs drop-shadow-lg">✓</span>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
