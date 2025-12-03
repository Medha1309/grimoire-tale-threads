/**
 * LiveCursor - Displays other users' cursors in real-time
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CursorPosition } from '../../types/reflectionSession';
import { interpolateCursorPosition } from '../../utils/cursorSync';

interface LiveCursorProps {
  cursor: CursorPosition;
  isCurrentUser: boolean;
}

export const LiveCursor: React.FC<LiveCursorProps> = ({ cursor, isCurrentUser }) => {
  const [position, setPosition] = useState({ x: cursor.x, y: cursor.y });

  // Smooth cursor movement with interpolation
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => interpolateCursorPosition(prev, { x: cursor.x, y: cursor.y }, 0.3));
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [cursor.x, cursor.y]);

  if (isCurrentUser) {
    return null; // Don't show current user's cursor
  }

  return (
    <motion.div
      className="fixed pointer-events-none z-50"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
    >
      {/* Cursor icon */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          filter: `drop-shadow(0 2px 4px rgba(0,0,0,0.5))`,
        }}
      >
        <path
          d="M5 3L19 12L12 13L9 20L5 3Z"
          fill={cursor.color}
          stroke="#000"
          strokeWidth="1"
        />
      </svg>

      {/* Username label */}
      <div
        className="absolute top-6 left-2 px-2 py-1 rounded text-xs font-serif whitespace-nowrap"
        style={{
          backgroundColor: cursor.color,
          color: '#000',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        }}
      >
        {cursor.userName}
      </div>
    </motion.div>
  );
};
