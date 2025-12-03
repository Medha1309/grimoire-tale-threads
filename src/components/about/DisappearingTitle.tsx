/**
 * Disappearing Title Component
 * "The Dollhouse Diary" title that fades away
 * Consistent with Contact page "we are watching" timing
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const DisappearingTitle: React.FC = () => {
  const [showTitle, setShowTitle] = useState(true);

  useEffect(() => {
    // Show for 5 seconds then fade away (same as Contact page)
    const timer = setTimeout(() => {
      setShowTitle(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {showTitle && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 1.5, exit: { duration: 2 } }}
          className="fixed top-[12%] left-1/2 -translate-x-1/2 z-30 text-center"
        >
          <h1 
            className="font-serif text-5xl md:text-6xl tracking-wider"
            style={{
              color: '#d4d4d0',
              textShadow: `
                0 2px 4px rgba(0,0,0,0.8),
                0 0 20px rgba(200,200,190,0.3),
                2px 2px 0 rgba(0,0,0,0.3)
              `,
              fontWeight: 400,
              letterSpacing: '0.15em',
            }}
          >
            The Dollhouse Diary
          </h1>
          <motion.div
            className="mt-2 h-[1px] bg-gradient-to-r from-transparent via-zinc-600 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
