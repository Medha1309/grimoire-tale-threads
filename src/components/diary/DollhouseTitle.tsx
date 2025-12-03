/**
 * Dollhouse Title Component
 * Neon glitchy title with pink ribbons
 */

import React from 'react';
import { motion } from 'framer-motion';

export const DollhouseTitle: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0 }}
      className="text-center mb-12"
    >
      <div className="flex items-center justify-center gap-8 md:gap-12 mb-6">
        {/* Left Ribbon */}
        <motion.div
          animate={{
            rotate: [0, -5, 5, 0],
            y: [0, -8, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-4xl md:text-5xl"
          style={{
            filter: 'hue-rotate(-30deg) saturate(0.8) brightness(1.3) drop-shadow(0 0 20px rgba(255, 182, 217, 0.8))',
          }}
        >
          🎀
        </motion.div>

        {/* Elegant Title with soft glow */}
        <div className="relative">
          {/* Soft shadow for depth */}
          <motion.h1
            animate={{
              opacity: [0.3, 0.4, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 font-serif text-5xl md:text-7xl text-pink-900/50 blur-md"
            style={{
              textShadow: '0 4px 20px rgba(255, 105, 180, 0.6)',
            }}
          >
            The Boudoir
          </motion.h1>

          {/* Main elegant title with gentle glow */}
          <motion.h1
            animate={{
              textShadow: [
                '0 0 20px #ffb6d9, 0 0 40px #ffb6d9, 0 0 60px rgba(255, 182, 217, 0.4)',
                '0 0 25px #ffb6d9, 0 0 50px #ffb6d9, 0 0 70px rgba(255, 182, 217, 0.5)',
                '0 0 20px #ffb6d9, 0 0 40px #ffb6d9, 0 0 60px rgba(255, 182, 217, 0.4)',
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative font-serif text-5xl md:text-7xl text-[#ffb6d9] tracking-wide"
            style={{
              textShadow: '0 0 20px #ffb6d9, 0 0 40px #ffb6d9, 0 0 60px rgba(255, 182, 217, 0.4)',
              WebkitTextStroke: '0.5px rgba(255, 182, 217, 0.3)',
            }}
          >
            The Boudoir
          </motion.h1>
        </div>

        {/* Right Ribbon */}
        <motion.div
          animate={{
            rotate: [0, 5, -5, 0],
            y: [0, -8, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="text-4xl md:text-5xl"
          style={{
            filter: 'hue-rotate(-30deg) saturate(0.8) brightness(1.3) drop-shadow(0 0 20px rgba(255, 182, 217, 0.8))',
          }}
        >
          🎀
        </motion.div>
      </div>

      {/* Helpful instruction */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{
          delay: 0.5,
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="text-[#ffb6d9]/80 font-serif text-base tracking-wide"
        style={{
          textShadow: '0 0 10px rgba(255, 182, 217, 0.4)',
        }}
      >
        Hover over a room to explore • Click to enter
      </motion.p>
    </motion.div>
  );
};
