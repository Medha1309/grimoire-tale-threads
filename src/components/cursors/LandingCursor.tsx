import React from 'react';
import { motion } from 'framer-motion';

interface CursorProps {
  x: number;
  y: number;
  isHovering: boolean;
  isClicking: boolean;
}

export const LandingCursor: React.FC<CursorProps> = ({ x, y, isHovering, isClicking }) => {
  return (
    <motion.div
      className="fixed pointer-events-none z-[10000]"
      style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
      animate={{ scale: isClicking ? 0.8 : 1 }}
    >
      {/* Ghostly wisp */}
      <motion.div
        className="absolute"
        style={{
          width: isHovering ? 50 : 40,
          height: isHovering ? 50 : 40,
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: isHovering ? [1, 1.2, 1] : [1, 1.05, 1],
          rotate: 360,
        }}
        transition={{
          scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
          rotate: { duration: 10, repeat: Infinity, ease: 'linear' },
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 50 50">
          <defs>
            <radialGradient id="ghostGlow">
              <stop offset="0%" stopColor="rgba(200, 200, 255, 0.6)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <circle cx="25" cy="25" r="20" fill="url(#ghostGlow)" />
          <path
            d="M 25 10 Q 35 15, 35 25 Q 35 35, 30 40 L 28 38 L 26 40 L 24 38 L 22 40 L 20 38 Q 15 35, 15 25 Q 15 15, 25 10 Z"
            fill="rgba(255, 255, 255, 0.3)"
            stroke="rgba(200, 200, 255, 0.5)"
            strokeWidth="1"
          />
          <circle cx="20" cy="22" r="2" fill="rgba(100, 100, 150, 0.8)" />
          <circle cx="30" cy="22" r="2" fill="rgba(100, 100, 150, 0.8)" />
        </svg>
      </motion.div>

      {/* Sparkles when hovering */}
      {isHovering && (
        <>
          {[0, 120, 240].map((angle, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: Math.cos((angle * Math.PI) / 180) * 30,
                top: Math.sin((angle * Math.PI) / 180) * 30,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }}
            >
              <div className="w-2 h-2 bg-white rounded-full" style={{ filter: 'blur(1px)' }} />
            </motion.div>
          ))}
        </>
      )}
    </motion.div>
  );
};
