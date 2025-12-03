/**
 * Haunted Cursor - Custom animated cursor for gothic mode
 */

import { motion } from 'framer-motion';
import { Tool } from './types';

interface HauntedCursorProps {
  position: { x: number; y: number };
  tool: Tool;
  enabled?: boolean;
}

const cursorIcons: Record<Tool, string> = {
  brush: '🖌️',
  eraser: '🧹',
  line: '📏',
  rect: '▭',
  ellipse: '⬭',
  bucket: '🪣',
  text: '𝐓',
  picker: '💧',
  select: '⬚'
};

export function HauntedCursor({ position, tool, enabled = true }: HauntedCursorProps) {
  if (!enabled) return null;

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed pointer-events-none z-50 mix-blend-screen"
        animate={{
          x: position.x - 16,
          y: position.y - 16
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.5
        }}
      >
        <div className="relative">
          {/* Glow effect */}
          <div 
            className="absolute inset-0 blur-xl opacity-50"
            style={{
              background: 'radial-gradient(circle, rgba(255, 182, 217, 0.6) 0%, transparent 70%)'
            }}
          />
          
          {/* Tool icon */}
          <div className="relative text-2xl drop-shadow-lg">
            {cursorIcons[tool]}
          </div>
        </div>
      </motion.div>

      {/* Trail particles */}
      <motion.div
        className="fixed pointer-events-none z-40"
        animate={{
          x: position.x - 8,
          y: position.y - 8
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
          mass: 0.8
        }}
      >
        <div 
          className="w-4 h-4 rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(255, 182, 217, 0.8) 0%, transparent 70%)',
            filter: 'blur(4px)'
          }}
        />
      </motion.div>

      <motion.div
        className="fixed pointer-events-none z-30"
        animate={{
          x: position.x - 6,
          y: position.y - 6
        }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 15,
          mass: 1
        }}
      >
        <div 
          className="w-3 h-3 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(255, 182, 217, 0.6) 0%, transparent 70%)',
            filter: 'blur(6px)'
          }}
        />
      </motion.div>
    </>
  );
}
