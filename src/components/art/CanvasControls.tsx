/**
 * Canvas Controls Component
 * Brush size, opacity, and canvas actions
 */

import React from 'react';
import { motion } from 'framer-motion';

interface CanvasControlsProps {
  brushSize: number;
  brushOpacity: number;
  onBrushSizeChange: (size: number) => void;
  onBrushOpacityChange: (opacity: number) => void;
  onUndo: () => void;
  onRedo: () => void;
  onClear: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export const CanvasControls: React.FC<CanvasControlsProps> = ({
  brushSize,
  brushOpacity,
  onBrushSizeChange,
  onBrushOpacityChange,
  onUndo,
  onRedo,
  onClear,
  canUndo,
  canRedo,
}) => {
  return (
    <div className="space-y-6">
      {/* Brush Size */}
      <div className="space-y-2">
        <label className="text-sm font-serif text-[#ffb6d9]/80 tracking-wider uppercase flex items-center justify-between">
          <span>Brush Size</span>
          <span className="text-zinc-400">{brushSize}px</span>
        </label>
        <input
          type="range"
          min="1"
          max="50"
          value={brushSize}
          onChange={(e) => onBrushSizeChange(Number(e.target.value))}
          className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer
                     [&::-webkit-slider-thumb]:appearance-none
                     [&::-webkit-slider-thumb]:w-4
                     [&::-webkit-slider-thumb]:h-4
                     [&::-webkit-slider-thumb]:rounded-full
                     [&::-webkit-slider-thumb]:bg-[#ffb6d9]
                     [&::-webkit-slider-thumb]:cursor-pointer
                     [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(255,182,217,0.5)]
                     [&::-webkit-slider-thumb]:transition-all
                     [&::-webkit-slider-thumb]:hover:scale-110"
        />
      </div>

      {/* Brush Opacity */}
      <div className="space-y-2">
        <label className="text-sm font-serif text-[#ffb6d9]/80 tracking-wider uppercase flex items-center justify-between">
          <span>Opacity</span>
          <span className="text-zinc-400">{Math.round(brushOpacity * 100)}%</span>
        </label>
        <input
          type="range"
          min="0.1"
          max="1"
          step="0.1"
          value={brushOpacity}
          onChange={(e) => onBrushOpacityChange(Number(e.target.value))}
          className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer
                     [&::-webkit-slider-thumb]:appearance-none
                     [&::-webkit-slider-thumb]:w-4
                     [&::-webkit-slider-thumb]:h-4
                     [&::-webkit-slider-thumb]:rounded-full
                     [&::-webkit-slider-thumb]:bg-[#ffb6d9]
                     [&::-webkit-slider-thumb]:cursor-pointer
                     [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(255,182,217,0.5)]
                     [&::-webkit-slider-thumb]:transition-all
                     [&::-webkit-slider-thumb]:hover:scale-110"
        />
      </div>

      {/* Action Buttons */}
      <div className="pt-4 border-t border-zinc-800/60 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <motion.button
            onClick={onUndo}
            disabled={!canUndo}
            whileHover={canUndo ? { scale: 1.05 } : {}}
            whileTap={canUndo ? { scale: 0.95 } : {}}
            className={`
              px-4 py-2 rounded-lg font-serif text-sm transition-all duration-200
              ${canUndo
                ? 'bg-zinc-800/60 text-[#ffb6d9] border border-[#ffb6d9]/30 hover:bg-zinc-800 hover:border-[#ffb6d9]/50'
                : 'bg-zinc-900/30 text-zinc-600 border border-zinc-800/30 cursor-not-allowed'
              }
            `}
          >
            ↶ Undo
          </motion.button>

          <motion.button
            onClick={onRedo}
            disabled={!canRedo}
            whileHover={canRedo ? { scale: 1.05 } : {}}
            whileTap={canRedo ? { scale: 0.95 } : {}}
            className={`
              px-4 py-2 rounded-lg font-serif text-sm transition-all duration-200
              ${canRedo
                ? 'bg-zinc-800/60 text-[#ffb6d9] border border-[#ffb6d9]/30 hover:bg-zinc-800 hover:border-[#ffb6d9]/50'
                : 'bg-zinc-900/30 text-zinc-600 border border-zinc-800/30 cursor-not-allowed'
              }
            `}
          >
            ↷ Redo
          </motion.button>
        </div>

        <motion.button
          onClick={onClear}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full px-4 py-2 rounded-lg font-serif text-sm
                     bg-red-900/20 text-red-400 border border-red-800/40
                     hover:bg-red-900/30 hover:border-red-700/60
                     transition-all duration-200"
        >
          Clear Canvas
        </motion.button>
      </div>
    </div>
  );
};
