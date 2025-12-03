/**
 * CursorShadow Component
 * Subtle shadow that follows the cursor like candlelight
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CursorShadow: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-[9999]"
      style={{
        left: position.x - 20,
        top: position.y - 20,
        width: 40,
        height: 40,
      }}
      animate={{
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <div 
        className="w-full h-full rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(184,155,62,0.3) 0%, transparent 70%)',
        }}
      />
    </motion.div>
  );
};
