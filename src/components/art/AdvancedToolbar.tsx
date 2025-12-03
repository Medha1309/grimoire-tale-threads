/**
 * Advanced Toolbar Component
 * Sophisticated drawing tools with gothic aesthetic
 */

import React from 'react';
import { motion } from 'framer-motion';
import { ToolType, BlendMode } from '../../types/artwork';

interface AdvancedToolbarProps {
  currentTool: ToolType;
  onToolChange: (tool: ToolType) => void;
  blendMode: BlendMode;
  onBlendModeChange: (mode: BlendMode) => void;
  smoothing: number;
  onSmoothingChange: (value: number) => void;
  scatter: number;
  onScatterChange: (value: number) => void;
  flow: number;
  onFlowChange: (value: number) => void;
  showGrid: boolean;
  onToggleGrid: () => void;
  showSymmetry: boolean;
  onToggleSymmetry: () => void;
}

const TOOLS: Array<{ type: ToolType; icon: string; name: string }> = [
  { type: 'brush', icon: '◆', name: 'Brush' },
  { type: 'eraser', icon: '○', name: 'Eraser' },
  { type: 'fill', icon: '■', name: 'Fill' },
  { type: 'eyedropper', icon: '◉', name: 'Eyedropper' },
  { type: 'smudge', icon: '~', name: 'Smudge' },
  { type: 'blur', icon: '≋', name: 'Blur' },
];

const BLEND_MODES: BlendMode[] = ['normal', 'multiply', 'screen', 'overlay', 'difference', 'lighten', 'darken'];

export const AdvancedToolbar: React.FC<AdvancedToolbarProps> = ({
  currentTool,
  onToolChange,
  blendMode,
  onBlendModeChange,
  smoothing,
  onSmoothingChange,
  scatter,
  onScatterChange,
  flow,
  onFlowChange,
  showGrid,
  onToggleGrid,
  showSymmetry,
  onToggleSymmetry,
}) => {
  return (
    <div className="space-y-6">
      {/* Tools */}
      <div className="space-y-3">
        <h3 className="text-sm font-serif text-[#ffb6d9]/80 tracking-wider uppercase">
          Tools
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {TOOLS.map((tool) => (
            <motion.button
              key={tool.type}
              onClick={() => onToolChange(tool.type)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                p-3 rounded-lg border transition-all duration-200 font-serif text-xs
                ${currentTool === tool.type
                  ? 'border-[#ffb6d9]/60 bg-[#ffb6d9]/10 text-[#ffb6d9]'
                  : 'border-zinc-800/60 bg-zinc-900/30 text-zinc-400 hover:border-[#ffb6d9]/30'
                }
              `}
            >
              <div className="text-lg mb-1">{tool.icon}</div>
              <div>{tool.name}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Blend Mode */}
      <div className="space-y-2">
        <label className="text-sm font-serif text-[#ffb6d9]/80 tracking-wider uppercase">
          Blend Mode
        </label>
        <select
          value={blendMode}
          onChange={(e) => onBlendModeChange(e.target.value as BlendMode)}
          className="w-full px-3 py-2 bg-zinc-900/60 border border-zinc-800/60 rounded-lg
                     text-zinc-300 font-serif text-sm
                     focus:outline-none focus:border-[#ffb6d9]/60 focus:ring-2 focus:ring-[#ffb6d9]/20
                     transition-all duration-200 cursor-pointer"
        >
          {BLEND_MODES.map((mode) => (
            <option key={mode} value={mode} className="bg-zinc-900">
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Smoothing */}
      <div className="space-y-2">
        <label className="text-sm font-serif text-[#ffb6d9]/80 tracking-wider uppercase flex items-center justify-between">
          <span>Smoothing</span>
          <span className="text-zinc-400">{smoothing}%</span>
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={smoothing}
          onChange={(e) => onSmoothingChange(Number(e.target.value))}
          className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer
                     [&::-webkit-slider-thumb]:appearance-none
                     [&::-webkit-slider-thumb]:w-4
                     [&::-webkit-slider-thumb]:h-4
                     [&::-webkit-slider-thumb]:rounded-full
                     [&::-webkit-slider-thumb]:bg-[#ffb6d9]
                     [&::-webkit-slider-thumb]:cursor-pointer
                     [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(255,182,217,0.5)]"
        />
      </div>

      {/* Scatter */}
      <div className="space-y-2">
        <label className="text-sm font-serif text-[#ffb6d9]/80 tracking-wider uppercase flex items-center justify-between">
          <span>Scatter</span>
          <span className="text-zinc-400">{scatter}%</span>
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={scatter}
          onChange={(e) => onScatterChange(Number(e.target.value))}
          className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer
                     [&::-webkit-slider-thumb]:appearance-none
                     [&::-webkit-slider-thumb]:w-4
                     [&::-webkit-slider-thumb]:h-4
                     [&::-webkit-slider-thumb]:rounded-full
                     [&::-webkit-slider-thumb]:bg-[#ffb6d9]
                     [&::-webkit-slider-thumb]:cursor-pointer
                     [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(255,182,217,0.5)]"
        />
      </div>

      {/* Flow */}
      <div className="space-y-2">
        <label className="text-sm font-serif text-[#ffb6d9]/80 tracking-wider uppercase flex items-center justify-between">
          <span>Flow</span>
          <span className="text-zinc-400">{flow}%</span>
        </label>
        <input
          type="range"
          min="1"
          max="100"
          value={flow}
          onChange={(e) => onFlowChange(Number(e.target.value))}
          className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer
                     [&::-webkit-slider-thumb]:appearance-none
                     [&::-webkit-slider-thumb]:w-4
                     [&::-webkit-slider-thumb]:h-4
                     [&::-webkit-slider-thumb]:rounded-full
                     [&::-webkit-slider-thumb]:bg-[#ffb6d9]
                     [&::-webkit-slider-thumb]:cursor-pointer
                     [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(255,182,217,0.5)]"
        />
      </div>

      {/* Toggles & Features */}
      <div className="pt-4 border-t border-zinc-800/60 space-y-2">
        <motion.button
          onClick={onToggleGrid}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`
            w-full px-4 py-2 rounded-lg font-serif text-sm transition-all duration-200 flex items-center justify-between
            ${showGrid
              ? 'bg-[#ffb6d9]/10 text-[#ffb6d9] border border-[#ffb6d9]/40'
              : 'bg-zinc-800/60 text-zinc-400 border border-zinc-800/60 hover:border-[#ffb6d9]/30'
            }
          `}
        >
          <span>Grid Overlay</span>
          <span>{showGrid ? '[ON]' : '[OFF]'}</span>
        </motion.button>

        <motion.button
          onClick={onToggleSymmetry}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`
            w-full px-4 py-2 rounded-lg font-serif text-sm transition-all duration-200 flex items-center justify-between
            ${showSymmetry
              ? 'bg-[#ffb6d9]/10 text-[#ffb6d9] border border-[#ffb6d9]/40'
              : 'bg-zinc-800/60 text-zinc-400 border border-zinc-800/60 hover:border-[#ffb6d9]/30'
            }
          `}
        >
          <span>Symmetry</span>
          <span>{showSymmetry ? '[ON]' : '[OFF]'}</span>
        </motion.button>
      </div>

      {/* Quick Tips */}
      <div className="pt-4 border-t border-zinc-800/60">
        <p className="text-xs font-serif text-zinc-500 leading-relaxed">
          <span className="text-[#ffb6d9]/60">Tip:</span> Each brush has unique behavior. Blood drips, Watercolor bleeds, Neon glows.
        </p>
      </div>
    </div>
  );
};
