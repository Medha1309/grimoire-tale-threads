/**
 * Chains Page Custom Cursor
 * Clinical, sophisticated cursor for the Chain Lab
 */

import React, { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const ChainsCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const moveCursor = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
    if (!isVisible) setIsVisible(true);
  }, [cursorX, cursorY, isVisible]);

  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const isInteractive = 
      target.tagName === 'BUTTON' ||
      target.tagName === 'A' ||
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.closest('button') ||
      target.closest('a') ||
      target.classList.contains('cursor-pointer') ||
      target.getAttribute('role') === 'button';
    
    setIsHovering(!!isInteractive);
  }, []);

  useEffect(() => {
    // Initialize cursor position
    const initCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseenter', initCursor, { once: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseenter', initCursor);
    };
  }, [moveCursor, handleMouseOver, cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor - clinical crosshair */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          willChange: 'transform',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.15 }}
      >
        <motion.div
          animate={{
            scale: isHovering ? 1.3 : 1,
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative"
        >
          {/* Clinical crosshair */}
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            {/* Horizontal line */}
            <motion.line
              x1="6"
              y1="16"
              x2="26"
              y2="16"
              stroke="rgba(190, 242, 100, 0.9)"
              strokeWidth="1.5"
              strokeLinecap="round"
              animate={{
                strokeOpacity: [0.7, 1, 0.7],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Vertical line */}
            <motion.line
              x1="16"
              y1="6"
              x2="16"
              y2="26"
              stroke="rgba(190, 242, 100, 0.9)"
              strokeWidth="1.5"
              strokeLinecap="round"
              animate={{
                strokeOpacity: [1, 0.7, 1],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Center dot */}
            <motion.circle
              cx="16"
              cy="16"
              r="2"
              fill="rgba(190, 242, 100, 0.95)"
              animate={{
                opacity: [0.8, 1, 0.8],
                scale: [0.9, 1.1, 0.9],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            {/* Corner brackets */}
            <motion.path
              d="M 8 8 L 8 10 M 8 8 L 10 8"
              stroke="rgba(132, 204, 22, 0.6)"
              strokeWidth="1.2"
              strokeLinecap="round"
              animate={{
                strokeOpacity: [0.4, 0.7, 0.4],
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
            <motion.path
              d="M 24 8 L 24 10 M 24 8 L 22 8"
              stroke="rgba(132, 204, 22, 0.6)"
              strokeWidth="1.2"
              strokeLinecap="round"
              animate={{
                strokeOpacity: [0.7, 0.4, 0.7],
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
            <motion.path
              d="M 8 24 L 8 22 M 8 24 L 10 24"
              stroke="rgba(132, 204, 22, 0.6)"
              strokeWidth="1.2"
              strokeLinecap="round"
              animate={{
                strokeOpacity: [0.4, 0.7, 0.4],
              }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            />
            <motion.path
              d="M 24 24 L 24 22 M 24 24 L 22 24"
              stroke="rgba(132, 204, 22, 0.6)"
              strokeWidth="1.2"
              strokeLinecap="round"
              animate={{
                strokeOpacity: [0.7, 0.4, 0.7],
              }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            />
          </svg>

          {/* Subtle glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(190, 242, 100, 0.4) 0%, rgba(132, 204, 22, 0.2) 40%, transparent 70%)',
              filter: 'blur(10px)',
            }}
            animate={{
              scale: isHovering ? [1.1, 1.3, 1.1] : [1, 1.1, 1],
              opacity: isHovering ? [0.4, 0.6, 0.4] : [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>

      {/* Hover ring effect */}
      {isHovering && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9997]"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            translateX: '-50%',
            translateY: '-50%',
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
        >
          <motion.div
            className="w-12 h-12 rounded-full border"
            style={{
              borderColor: 'rgba(190, 242, 100, 0.5)',
              boxShadow: '0 0 15px rgba(190, 242, 100, 0.3)',
            }}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
        </motion.div>
      )}
    </>
  );
};
