/**
 * LockSeal Component
 * Toggle lock state with wax seal animation
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LockSealProps {
  isLocked: boolean;
  onToggle: () => Promise<boolean>;
  disabled?: boolean;
}

export const LockSeal: React.FC<LockSealProps> = ({ isLocked, onToggle, disabled = false }) => {
  const [animating, setAnimating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleToggle = async () => {
    if (disabled || animating) return;

    setAnimating(true);
    setError(null);

    // Show animation
    await new Promise(resolve => setTimeout(resolve, 1500));

    const success = await onToggle();
    
    if (!success) {
      setError("The seal won't budge. Please try again.");
      setTimeout(() => setError(null), 3000);
    }

    setAnimating(false);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <motion.button
        whileHover={!disabled && !animating ? { 
          scale: 1.15,
          rotate: [0, -10, 10, 0]
        } : {}}
        whileTap={!disabled && !animating ? { scale: 0.9 } : {}}
        onClick={handleToggle}
        disabled={disabled || animating}
        aria-label={isLocked ? "Unlock entry" : "Lock entry"}
        aria-pressed={isLocked}
        className="relative disabled:opacity-50 disabled:cursor-not-allowed group"
      >
        {/* Glow effect */}
        <div className="absolute -inset-4 bg-gradient-to-br from-doll-pink/30 to-doll-lavender/30 
                       rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Lock button */}
        <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-white to-doll-cream
                       border-4 border-doll-pink/40 shadow-lg
                       flex items-center justify-center
                       group-hover:border-doll-accent/60 group-hover:shadow-[0_0_30px_rgba(255,105,180,0.4)]
                       transition-all">
          <AnimatePresence mode="wait">
            {animating ? (
              <motion.div
                key="animating"
                initial={{ scale: 0 }}
                animate={{ 
                  scale: [0, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                exit={{ scale: 0 }}
                transition={{ duration: 1.5 }}
                className="text-5xl"
              >
                ✨
              </motion.div>
            ) : (
              <motion.div
                key={isLocked ? 'locked' : 'unlocked'}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ type: "spring", damping: 15 }}
                className="text-5xl"
              >
                {isLocked ? '🔐' : '💝'}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sparkles */}
        {!animating && (
          <>
            <motion.div
              className="absolute -top-2 -right-2 text-xl"
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              ✨
            </motion.div>
            <motion.div
              className="absolute -bottom-2 -left-2 text-xl"
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [0, -180, -360]
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            >
              ✨
            </motion.div>
          </>
        )}
      </motion.button>

      <div className="text-center">
        <p className="text-sm text-doll-accent font-serif mb-1">
          {animating 
            ? (isLocked ? 'unlocking your heart...' : 'sealing with love...')
            : (isLocked ? 'tap to unlock' : 'tap to lock')}
        </p>
        <p className="text-xs text-doll-shadow/60 font-serif">
          {isLocked ? 'your secret is safe' : 'open for all to see'}
        </p>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 py-2 bg-doll-rose/20 border-2 border-doll-rose/40 rounded-full"
        >
          <p className="text-xs text-doll-rose font-serif">{error}</p>
        </motion.div>
      )}
    </div>
  );
};
