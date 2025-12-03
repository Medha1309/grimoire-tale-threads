/**
 * FocusMode Component
 * Distraction-free full-screen writing mode
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FocusModeProps {
  isActive: boolean;
  content: string;
  onContentChange: (content: string) => void;
  onExit: () => void;
}

export const FocusMode: React.FC<FocusModeProps> = ({
  isActive,
  content,
  onContentChange,
  onExit,
}) => {
  const [showHint, setShowHint] = useState(true);

  // Hide hint after 3 seconds
  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => setShowHint(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  // Handle Escape key to exit
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isActive) {
        onExit();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive, onExit]);

  if (!isActive) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black"
      >
        {/* Subtle ambient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-zinc-950" />
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#ffb6d9]/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        {/* Exit hint */}
        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-8 left-1/2 -translate-x-1/2 z-10
                       px-6 py-3 rounded-full bg-zinc-900/50 backdrop-blur-sm
                       border border-zinc-800/50 text-sm text-zinc-500 font-serif"
            >
              Press <kbd className="px-2 py-1 bg-zinc-800 rounded text-xs mx-1">Esc</kbd> to exit focus mode
            </motion.div>
          )}
        </AnimatePresence>

        {/* Exit button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: showHint ? 0 : 0.3 }}
          whileHover={{ opacity: 1, scale: 1.1 }}
          onClick={onExit}
          className="absolute top-8 right-8 z-10 w-10 h-10 rounded-full
                   bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50
                   flex items-center justify-center text-zinc-500 hover:text-[#ffb6d9]
                   transition-colors"
        >
          ✕
        </motion.button>

        {/* Writing area */}
        <div className="relative h-full flex items-center justify-center px-8">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full max-w-4xl"
          >
            <textarea
              value={content}
              onChange={(e) => onContentChange(e.target.value)}
              placeholder="Let your thoughts flow..."
              autoFocus
              className="w-full h-[70vh] px-0 py-0 bg-transparent border-none
                       text-2xl leading-relaxed font-serif text-zinc-200 placeholder-zinc-800
                       focus:outline-none focus:ring-0 resize-none"
              style={{
                lineHeight: '2',
                letterSpacing: '0.02em',
              }}
            />

            {/* Subtle cursor line */}
            <motion.div
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-px w-full bg-gradient-to-r from-transparent via-[#ffb6d9]/20 to-transparent mt-4"
            />
          </motion.div>
        </div>

        {/* Word count - bottom center */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.5, y: 0 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2
                   text-xs text-zinc-600 font-mono"
        >
          {content.trim().split(/\s+/).filter((w) => w).length} words
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
