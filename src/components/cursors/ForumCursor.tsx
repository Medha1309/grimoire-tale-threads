import React from 'react';
import { motion } from 'framer-motion';

interface CursorProps {
  x: number;
  y: number;
  isHovering: boolean;
  isClicking: boolean;
}

export const ForumCursor: React.FC<CursorProps> = ({ x, y, isHovering, isClicking }) => {
  return (
    <motion.div
      className="fixed pointer-events-none z-[10000]"
      style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
      animate={{ scale: isClicking ? 0.8 : 1 }}
    >
      {/* Gilded ornate cursor */}
      <motion.div
        className="absolute"
        style={{
          width: isHovering ? 45 : 36,
          height: isHovering ? 45 : 36,
          transform: 'translate(-50%, -50%)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <svg width="100%" height="100%" viewBox="0 0 40 40">
          <defs>
            <radialGradient id="goldGlow">
              <stop offset="0%" stopColor="rgba(184, 155, 62, 0.8)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <linearGradient id="goldShine" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 215, 100, 0.9)" />
              <stop offset="50%" stopColor="rgba(184, 155, 62, 0.9)" />
              <stop offset="100%" stopColor="rgba(150, 120, 40, 0.9)" />
            </linearGradient>
          </defs>
          
          {/* Glow */}
          <circle cx="20" cy="20" r="18" fill="url(#goldGlow)" />
          
          {/* Ornate frame */}
          <circle cx="20" cy="20" r="16" fill="none" stroke="url(#goldShine)" strokeWidth="2" />
          <circle cx="20" cy="20" r="12" fill="none" stroke="url(#goldShine)" strokeWidth="1" opacity="0.6" />
          
          {/* Decorative points */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
            const x = 20 + Math.cos((angle * Math.PI) / 180) * 16;
            const y = 20 + Math.sin((angle * Math.PI) / 180) * 16;
            return (
              <motion.circle
                key={i}
                cx={x}
                cy={y}
                r="2"
                fill="url(#goldShine)"
                animate={{ r: [2, 3, 2], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              />
            );
          })}
          
          {/* Center jewel */}
          <circle cx="20" cy="20" r="5" fill="rgba(139, 0, 0, 0.8)" />
          <circle cx="20" cy="20" r="3" fill="rgba(200, 0, 0, 0.9)" />
          <motion.circle
            cx="19"
            cy="19"
            r="1.5"
            fill="rgba(255, 100, 100, 0.9)"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </svg>
      </motion.div>

      {/* Sparkle particles when hovering */}
      {isHovering && (
        <>
          {[...Array(8)].map((_, i) => {
            const angle = (i * 360) / 8;
            return (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: Math.cos((angle * Math.PI) / 180) * 25,
                  top: Math.sin((angle * Math.PI) / 180) * 25,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.15,
                }}
              >
                <svg width="8" height="8" viewBox="0 0 8 8">
                  <path d="M 4 0 L 5 3 L 8 4 L 5 5 L 4 8 L 3 5 L 0 4 L 3 3 Z" fill="rgba(184, 155, 62, 0.9)" />
                </svg>
              </motion.div>
            );
          })}
        </>
      )}
    </motion.div>
  );
};
