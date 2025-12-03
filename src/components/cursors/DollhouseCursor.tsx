import React from 'react';
import { motion } from 'framer-motion';

interface DollhouseCursorProps {
  cursorPos: { x: number; y: number };
  delayedCursor: { x: number; y: number };
}

export const DollhouseCursor: React.FC<DollhouseCursorProps> = ({ cursorPos, delayedCursor }) => {
  return (
    <>
      {/* Main cursor - vintage pink circle */}
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
          {/* Outer ring - vintage pink */}
          <div 
            className="absolute inset-0 rounded-full border-2 opacity-60"
            style={{
              borderColor: '#ffb6c1',
              boxShadow: '0 0 10px rgba(255, 182, 193, 0.4)',
            }}
          />
          {/* Inner dot */}
          <div 
            className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{
              backgroundColor: '#ffb6c1',
              boxShadow: '0 0 6px rgba(255, 182, 193, 0.7)',
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
              borderColor: '#ffc0cb',
              boxShadow: '0 0 6px rgba(255, 192, 203, 0.3)',
            }}
          />
          {/* Inner dot - smaller */}
          <div 
            className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{
              backgroundColor: '#ffc0cb',
              boxShadow: '0 0 4px rgba(255, 192, 203, 0.5)',
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
          stroke="#ffb6c1"
          strokeWidth="1"
          strokeOpacity="0.2"
          strokeDasharray="3,3"
        />
      </svg>
    </>
  );
};
