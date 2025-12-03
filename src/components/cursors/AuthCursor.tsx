import React from 'react';
import { motion } from 'framer-motion';

interface AuthCursorProps {
  cursorPos: { x: number; y: number };
  delayedCursor: { x: number; y: number };
}

export const AuthCursor: React.FC<AuthCursorProps> = ({ cursorPos, delayedCursor }) => {
  return (
    <>
      {/* Main cursor - larger vintage circle */}
      <motion.div
        className="fixed pointer-events-none z-[9999] mix-blend-screen"
        style={{
          left: cursorPos.x,
          top: cursorPos.y,
          transform: 'translate(-50%, -50%)',
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative w-8 h-8">
          {/* Outer ring */}
          <div 
            className="absolute inset-0 rounded-full border-2 opacity-60"
            style={{
              borderColor: '#d4c4a8',
              boxShadow: '0 0 10px rgba(212, 196, 168, 0.3)',
            }}
          />
          {/* Inner dot */}
          <div 
            className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{
              backgroundColor: '#d4c4a8',
              boxShadow: '0 0 6px rgba(212, 196, 168, 0.6)',
            }}
          />
        </div>
      </motion.div>

      {/* Chasing cursor - smaller, follows with delay */}
      <motion.div
        className="fixed pointer-events-none z-[9998] mix-blend-screen"
        style={{
          left: delayedCursor.x,
          top: delayedCursor.y,
          transform: 'translate(-50%, -50%)',
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="relative w-5 h-5">
          {/* Outer ring - smaller and more subtle */}
          <div 
            className="absolute inset-0 rounded-full border opacity-40"
            style={{
              borderColor: '#d4c4a8',
              boxShadow: '0 0 6px rgba(212, 196, 168, 0.2)',
            }}
          />
          {/* Inner dot - smaller */}
          <div 
            className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{
              backgroundColor: '#d4c4a8',
              boxShadow: '0 0 4px rgba(212, 196, 168, 0.4)',
            }}
          />
        </div>
      </motion.div>

      {/* Connecting line between cursors - subtle trail effect */}
      <svg
        className="fixed pointer-events-none z-[9997] mix-blend-screen"
        style={{
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <line
          x1={delayedCursor.x}
          y1={delayedCursor.y}
          x2={cursorPos.x}
          y2={cursorPos.y}
          stroke="#d4c4a8"
          strokeWidth="1"
          strokeOpacity="0.15"
          strokeDasharray="3,3"
        />
      </svg>
    </>
  );
};
