/**
 * Art Studio Custom Cursor
 * Paintbrush cursor for the art studio
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const ArtStudioCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsDrawing(true);
    const handleMouseUp = () => setIsDrawing(false);

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      animate={{
        x: position.x - 4,
        y: position.y - 4,
        scale: isDrawing ? 0.8 : 1,
      }}
      transition={{ type: 'spring', damping: 30, stiffness: 400 }}
    >
      {/* Crosshair cursor for drawing */}
      <svg width="24" height="24" viewBox="0 0 24 24">
        <circle
          cx="12"
          cy="12"
          r="8"
          fill="none"
          stroke="#ffb6d9"
          strokeWidth="1"
          opacity="0.6"
        />
        <line
          x1="12"
          y1="4"
          x2="12"
          y2="20"
          stroke="#ffb6d9"
          strokeWidth="1"
          opacity="0.4"
        />
        <line
          x1="4"
          y1="12"
          x2="20"
          y2="12"
          stroke="#ffb6d9"
          strokeWidth="1"
          opacity="0.4"
        />
        <circle
          cx="12"
          cy="12"
          r="2"
          fill="#ffb6d9"
          opacity="0.8"
        />
      </svg>
    </motion.div>
  );
};
