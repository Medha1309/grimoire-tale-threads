/**
 * Haunting Fog Effect - Subtle, eerie atmosphere
 * Gentle fog layers that create a ghostly, unsettling mood
 */

import React from 'react';
import { motion } from 'framer-motion';

export const VintageSignalEffect: React.FC = () => {
  return (
    <motion.div 
      className="absolute inset-0 pointer-events-none overflow-hidden bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      {/* Slow drifting fog layers - pink tinted */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`fog-${i}`}
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at ${30 + i * 15}% ${40 + i * 10}%, rgba(255,182,217,0.08) 0%, transparent 60%)`,
            filter: 'blur(60px)',
          }}
          animate={{
            x: ['-10%', '10%', '-10%'],
            y: ['-5%', '5%', '-5%'],
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 2,
          }}
        />
      ))}

      {/* Subtle grain texture for atmosphere */}
      <motion.div
        className="absolute inset-0 opacity-5 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '300px 300px',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Gentle vignette overlay */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.6) 100%)',
        }}
        animate={{
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Subtle breathing darkness - very slow pulse */}
      <motion.div
        className="absolute inset-0 bg-black"
        animate={{
          opacity: [0.1, 0.25, 0.1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  );
};
