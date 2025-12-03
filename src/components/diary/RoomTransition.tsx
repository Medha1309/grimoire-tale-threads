/**
 * Quick creepy transition for navigating between dollhouse rooms
 */

import React from 'react';
import { motion } from 'framer-motion';

interface RoomTransitionProps {
  onComplete: () => void;
}

export const RoomTransition: React.FC<RoomTransitionProps> = ({ onComplete }) => {
  React.useEffect(() => {
    const timer = setTimeout(onComplete, 3500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      {/* Flickering lantern effect - dim */}
      <motion.div
        className="relative"
        animate={{
          scale: [1, 1.05, 0.95, 1.02, 0.98, 1],
          opacity: [0.4, 0.5, 0.3, 0.45, 0.35, 0.4],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Lantern SVG */}
        <motion.svg
          width="120"
          height="120"
          viewBox="0 0 32 32"
          animate={{
            opacity: [0.5, 0.7, 0.4, 0.6, 0.45, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Lantern body */}
          <path
            d="M12 6 L20 6 L22 10 L22 22 L10 22 L10 10 Z"
            fill="#2a2420"
            stroke="#8B7355"
            strokeWidth="0.5"
            opacity="0.6"
          />
          {/* Top cap */}
          <rect x="11" y="4" width="10" height="2" fill="#8B7355" opacity="0.6" />
          {/* Handle */}
          <path
            d="M12 4 Q16 0 20 4"
            fill="none"
            stroke="#8B7355"
            strokeWidth="0.5"
            opacity="0.6"
          />
          {/* Glass panels */}
          <rect x="11" y="10" width="4" height="10" fill="#1a1410" opacity="0.2" />
          <rect x="17" y="10" width="4" height="10" fill="#1a1410" opacity="0.2" />
          {/* Flame - animated and dim */}
          <motion.g
            animate={{
              y: [0, -1.5, 0, -1, 0],
              scaleY: [1, 1.15, 1, 1.08, 1],
              opacity: [0.5, 0.7, 0.4, 0.6, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ellipse cx="16" cy="16" rx="3" ry="5" fill="#ff6b00" opacity="0.4" />
            <ellipse cx="16" cy="16" rx="2" ry="4" fill="#ffaa00" opacity="0.5" />
            <ellipse cx="16" cy="16" rx="1" ry="2.5" fill="#ffdd00" opacity="0.6" />
          </motion.g>
          {/* Glow - very dim */}
          <motion.circle
            cx="16"
            cy="16"
            r="10"
            fill="#ff6b00"
            opacity="0.05"
            animate={{
              opacity: [0.05, 0.12, 0.05, 0.09, 0.05],
              scale: [1, 1.15, 1, 1.08, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          {/* Bottom */}
          <rect x="11" y="22" width="10" height="2" fill="#8B7355" opacity="0.6" />
        </motion.svg>
        
        {/* Ambient glow effect - very dim */}
        <motion.div
          className="absolute inset-0 blur-3xl"
          animate={{
            opacity: [0.2, 0.4, 0.15, 0.35, 0.2],
            scale: [1, 1.3, 1.1, 1.25, 1],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background: 'radial-gradient(circle, rgba(255,150,50,0.4) 0%, rgba(255,182,217,0.15) 50%, transparent 70%)',
          }}
        />
      </motion.div>

      {/* Shadow figure passing by */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 w-48 h-80 bg-gradient-to-b from-black/95 to-transparent blur-2xl"
        initial={{ left: '-20%', opacity: 0 }}
        animate={{ 
          left: '120%',
          opacity: [0, 0.9, 0.9, 0.9, 0],
        }}
        transition={{ 
          duration: 3.5,
          ease: [0.43, 0.13, 0.23, 0.96],
        }}
        style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)' }}
      />

      {/* Whisper text */}
      <motion.p
        className="absolute bottom-20 font-serif text-4xl text-[#ffb6d9]/90"
        initial={{ opacity: 0, y: 15 }}
        animate={{ 
          opacity: [0, 0.95, 0.95, 0.95, 0], 
          y: [15, 0, 0, 0, -15],
          textShadow: [
            '0 0 15px rgba(255,182,217,0.5)',
            '0 0 30px rgba(255,182,217,0.8)',
            '0 0 30px rgba(255,182,217,0.8)',
            '0 0 30px rgba(255,182,217,0.8)',
            '0 0 15px rgba(255,182,217,0.5)',
          ],
        }}
        transition={{ duration: 3.5, ease: "easeInOut" }}
      >
        entering...
      </motion.p>
    </motion.div>
  );
};
