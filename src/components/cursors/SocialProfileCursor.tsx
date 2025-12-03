import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const SocialProfileCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    document.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    // Hide default cursor on all elements
    const style = document.createElement('style');
    style.innerHTML = `
      * {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Main cursor - sparkle */}
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-screen"
            animate={{
              x: mousePosition.x - 12,
              y: mousePosition.y - 12,
              scale: isHovering ? 1.5 : 1,
            }}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 28,
              mass: 0.5,
            }}
          >
            <div className="relative w-6 h-6">
              {/* Sparkle shape */}
              <motion.div
                animate={{
                  rotate: [0, 180, 360],
                  scale: isHovering ? [1, 1.2, 1] : 1,
                }}
                transition={{
                  rotate: { duration: 3, repeat: Infinity, ease: 'linear' },
                  scale: { duration: 0.5, repeat: Infinity },
                }}
                className="absolute inset-0"
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                  {/* Outline for visibility */}
                  <path
                    d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.5"
                    className="opacity-80"
                  />
                  {/* Main sparkle */}
                  <path
                    d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
                    fill="#ffffff"
                    className="drop-shadow-[0_0_4px_rgba(255,255,255,0.6)]"
                  />
                </svg>
              </motion.div>

              {/* Glow effect */}
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute inset-0 bg-white rounded-full blur-sm opacity-40"
              />
            </div>
          </motion.div>

          {/* Trail effect */}
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9998]"
            animate={{
              x: mousePosition.x - 2,
              y: mousePosition.y - 2,
            }}
            transition={{
              type: 'spring',
              stiffness: 150,
              damping: 15,
              mass: 0.1,
            }}
          >
            <div className="w-1 h-1 bg-white rounded-full opacity-40 blur-[2px]" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
