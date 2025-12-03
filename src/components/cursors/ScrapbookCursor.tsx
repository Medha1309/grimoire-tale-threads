import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const ScrapbookCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      setIsVisible(true);
    };

    const hideCursor = () => setIsVisible(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseleave', hideCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseleave', hideCursor);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor - scissors */}
      <motion.div
        className="pointer-events-none fixed z-[9999] mix-blend-difference"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          width: 32,
          height: 32,
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Scissors icon */}
          <circle cx="8" cy="10" r="3" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1" />
          <circle cx="8" cy="22" r="3" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1" />
          <line x1="10" y1="11" x2="20" y2="16" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
          <line x1="10" y1="21" x2="20" y2="16" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
          <line x1="20" y1="16" x2="26" y2="16" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </motion.div>

      {/* Trail effect */}
      <motion.div
        className="pointer-events-none fixed z-[9998]"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          width: 48,
          height: 48,
          marginLeft: -8,
          marginTop: -8,
        }}
      >
        <div
          className="w-full h-full rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(251, 191, 36, 0.4) 0%, transparent 70%)',
          }}
        />
      </motion.div>
    </>
  );
};
