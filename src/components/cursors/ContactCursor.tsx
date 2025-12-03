import React from 'react';
import { motion } from 'framer-motion';

interface CursorProps {
  x: number;
  y: number;
  isHovering: boolean;
  isClicking: boolean;
}

export const ContactCursor: React.FC<CursorProps> = ({ x, y, isHovering, isClicking }) => {
  return (
    <motion.div
      className="fixed pointer-events-none z-[10000]"
      style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
      animate={{ scale: isClicking ? 0.85 : 1 }}
      transition={{ duration: 0.15 }}
    >
      {/* Outer ring with subtle glow */}
      <motion.div
        className="absolute"
        style={{
          width: isHovering ? 48 : 38,
          height: isHovering ? 48 : 38,
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          rotate: -360,
          scale: isHovering ? [1, 1.05, 1] : 1,
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
          scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 50 50">
          <defs>
            <radialGradient id="inkGlow">
              <stop offset="0%" stopColor="rgba(70, 70, 100, 0.3)" />
              <stop offset="100%" stopColor="rgba(70, 70, 100, 0.05)" />
            </radialGradient>
          </defs>
          
          {/* Outer glow */}
          <circle cx="25" cy="25" r="22" fill="url(#inkGlow)" />
          
          {/* Main ring - translucent */}
          <circle
            cx="25"
            cy="25"
            r="17"
            fill="rgba(70, 70, 100, 0.06)"
            stroke="rgba(70, 70, 100, 0.35)"
            strokeWidth="1.5"
          />
          
          {/* Decorative arcs */}
          <path
            d="M 25 8 A 17 17 0 0 1 42 25"
            fill="none"
            stroke="rgba(70, 70, 100, 0.25)"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
          <path
            d="M 25 42 A 17 17 0 0 1 8 25"
            fill="none"
            stroke="rgba(70, 70, 100, 0.25)"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
          
          {/* Corner accents */}
          {[45, 135, 225, 315].map((angle, i) => {
            const x = 25 + Math.cos((angle * Math.PI) / 180) * 17;
            const y = 25 + Math.sin((angle * Math.PI) / 180) * 17;
            return (
              <motion.circle
                key={i}
                cx={x}
                cy={y}
                r="1.2"
                fill="rgba(70, 70, 100, 0.5)"
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />
            );
          })}
        </svg>
      </motion.div>

      {/* Center crosshair */}
      <motion.div
        className="absolute"
        style={{
          width: 12,
          height: 12,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 12 12">
          {/* Horizontal line */}
          <line
            x1="2"
            y1="6"
            x2="10"
            y2="6"
            stroke="rgba(70, 70, 100, 0.6)"
            strokeWidth="1"
          />
          {/* Vertical line */}
          <line
            x1="6"
            y1="2"
            x2="6"
            y2="10"
            stroke="rgba(70, 70, 100, 0.6)"
            strokeWidth="1"
          />
          {/* Center dot */}
          <motion.circle
            cx="6"
            cy="6"
            r="1.5"
            fill="rgba(70, 70, 100, 0.7)"
            animate={{
              scale: isHovering ? [1, 1.4, 1] : 1,
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </svg>
      </motion.div>

      {/* Subtle ink ripple when hovering */}
      {isHovering && (
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 60,
            height: 60,
            border: '1px solid rgba(70, 70, 100, 0.3)',
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{
            scale: [0.5, 1.5],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      )}

      {/* Floating ink particles when hovering */}
      {isHovering && (
        <>
          {[...Array(3)].map((_, i) => {
            const angle = (i * 360) / 3;
            return (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  background: 'rgba(70, 70, 100, 0.5)',
                  left: Math.cos((angle * Math.PI) / 180) * 20,
                  top: Math.sin((angle * Math.PI) / 180) * 20,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 0.7, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.6,
                }}
              />
            );
          })}
        </>
      )}
    </motion.div>
  );
};
