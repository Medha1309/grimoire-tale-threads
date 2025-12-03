/**
 * FlashbulbEffect Component
 * Camera flash effect when opening a memory
 */

import React from 'react';
import { motion } from 'framer-motion';

interface FlashbulbEffectProps {
  trigger: boolean;
  onComplete?: () => void;
}

export const FlashbulbEffect: React.FC<FlashbulbEffectProps> = ({ trigger, onComplete }) => {
  if (!trigger) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: [0, 1, 0.8, 0],
        scale: [0.8, 1.2, 1.5, 2],
      }}
      transition={{ 
        duration: 0.6,
        times: [0, 0.1, 0.3, 1],
        ease: "easeOut"
      }}
      onAnimationComplete={onComplete}
      className="fixed inset-0 z-[100] pointer-events-none"
      style={{
        background: 'radial-gradient(circle at center, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 30%, transparent 70%)',
        mixBlendMode: 'screen',
      }}
    />
  );
};
