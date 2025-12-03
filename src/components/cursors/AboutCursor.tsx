import React from 'react';
import { motion } from 'framer-motion';

interface CursorProps {
  x: number;
  y: number;
  isHovering: boolean;
  isClicking: boolean;
}

export const AboutCursor: React.FC<CursorProps> = ({ x, y, isHovering, isClicking }) => {
  return (
    <motion.div
      className="fixed pointer-events-none z-[10000]"
      style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
      animate={{ scale: isClicking ? 0.8 : 1 }}
    >
      {/* Candle flame - slightly different color for About page */}
      <motion.div
        className="absolute"
        style={{
          width: isHovering ? 35 : 28,
          height: isHovering ? 45 : 38,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 30 40">
          <defs>
            <radialGradient id="candleGlow">
              <stop offset="0%" stopColor="rgba(255, 200, 150, 0.8)" />
              <stop offset="50%" stopColor="rgba(255, 180, 100, 0.4)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          {/* Glow */}
          <ellipse cx="15" cy="20" rx="20" ry="25" fill="url(#candleGlow)" />
          {/* Flame */}
          <motion.path
            d="M 15 5 Q 20 10, 20 18 Q 20 25, 15 30 Q 10 25, 10 18 Q 10 10, 15 5 Z"
            fill="rgba(255, 200, 150, 0.9)"
            animate={{
              d: [
                'M 15 5 Q 20 10, 20 18 Q 20 25, 15 30 Q 10 25, 10 18 Q 10 10, 15 5 Z',
                'M 15 3 Q 22 12, 21 18 Q 21 24, 15 30 Q 9 24, 9 18 Q 8 12, 15 3 Z',
                'M 15 5 Q 20 10, 20 18 Q 20 25, 15 30 Q 10 25, 10 18 Q 10 10, 15 5 Z',
              ],
            }}
            transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Inner flame */}
          <motion.path
            d="M 15 10 Q 17 13, 17 18 Q 17 22, 15 25 Q 13 22, 13 18 Q 13 13, 15 10 Z"
            fill="rgba(255, 240, 200, 0.9)"
            animate={{
              d: [
                'M 15 10 Q 17 13, 17 18 Q 17 22, 15 25 Q 13 22, 13 18 Q 13 13, 15 10 Z',
                'M 15 8 Q 18 14, 17.5 18 Q 17.5 21, 15 25 Q 12.5 21, 12.5 18 Q 12 14, 15 8 Z',
                'M 15 10 Q 17 13, 17 18 Q 17 22, 15 25 Q 13 22, 13 18 Q 13 13, 15 10 Z',
              ],
            }}
            transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      </motion.div>

      {/* Embers when hovering */}
      {isHovering && (
        <>
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-orange-400 rounded-full"
              style={{
                left: (Math.random() - 0.5) * 20,
                top: 20,
              }}
              animate={{
                y: [-20, -40, -60],
                x: [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 20],
                opacity: [1, 0.5, 0],
                scale: [1, 0.5, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeOut',
              }}
            />
          ))}
        </>
      )}
    </motion.div>
  );
};
