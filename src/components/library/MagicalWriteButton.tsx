/**
 * MagicalWriteButton Component
 * Vintage typewriter-inspired button with mechanical charm
 */

import React from 'react';
import { motion } from 'framer-motion';

interface MagicalWriteButtonProps {
  onClick: () => void;
}

export const MagicalWriteButton: React.FC<MagicalWriteButtonProps> = ({ onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="relative group"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Vintage paper texture background */}
      <motion.div
        className="absolute -inset-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(135deg, rgba(212,196,168,0.15) 0%, rgba(139,115,85,0.15) 100%)',
          boxShadow: '0 0 30px rgba(212,196,168,0.2)',
        }}
      />

      {/* Main button with typewriter key aesthetic */}
      <div
        className="relative px-8 py-3.5 rounded font-mono text-sm uppercase tracking-widest
                   bg-gradient-to-b from-zinc-800 to-zinc-900
                   text-amber-200/90 border-2 border-amber-900/40
                   shadow-[0_4px_0_0_rgba(0,0,0,0.3),inset_0_1px_0_0_rgba(255,255,255,0.1)]
                   group-hover:from-zinc-700 group-hover:to-zinc-800
                   group-hover:text-amber-100
                   group-hover:border-amber-800/60
                   group-hover:shadow-[0_4px_0_0_rgba(0,0,0,0.4),inset_0_1px_0_0_rgba(255,255,255,0.15),0_0_20px_rgba(212,196,168,0.3)]
                   transition-all duration-200
                   active:shadow-[0_2px_0_0_rgba(0,0,0,0.3),inset_0_1px_0_0_rgba(255,255,255,0.1)]
                   active:translate-y-[2px]"
      >
        {/* Typewriter key shine */}
        <div className="absolute inset-0 rounded bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
        
        {/* Vintage corner decorations */}
        <span className="absolute top-1 left-2 text-[8px] text-amber-900/40 font-serif">⌜</span>
        <span className="absolute top-1 right-2 text-[8px] text-amber-900/40 font-serif">⌝</span>
        <span className="absolute bottom-1 left-2 text-[8px] text-amber-900/40 font-serif">⌞</span>
        <span className="absolute bottom-1 right-2 text-[8px] text-amber-900/40 font-serif">⌟</span>

        <span className="relative z-10 flex items-center gap-2">
          <span className="text-xs">✎</span>
          <span>Write Your Tale</span>
        </span>
      </div>

      {/* Subtle ink splatter effect on hover */}
      <motion.div
        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full opacity-0 group-hover:opacity-30 blur-sm"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(139,115,85,0.6) 0%, transparent 70%)',
        }}
        animate={{
          scaleX: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.button>
  );
};
