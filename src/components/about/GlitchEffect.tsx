/**
 * Glitch Effect - Reality-breaking visual corruption
 * Triggered during transition between sequences
 */

import React from 'react';
import { motion } from 'framer-motion';

interface GlitchEffectProps {
  isActive: boolean;
  intensity?: 'low' | 'medium' | 'high';
}

export const GlitchEffect: React.FC<GlitchEffectProps> = ({ 
  isActive, 
  intensity = 'medium' 
}) => {
  if (!isActive) return null;

  const glitchIntensity = {
    low: { offset: 2, blur: 1, count: 3 },
    medium: { offset: 5, blur: 2, count: 5 },
    high: { offset: 10, blur: 4, count: 8 },
  }[intensity];

  // Pre-calculate glitch bar positions
  const glitchBars = React.useMemo(() => 
    Array.from({ length: glitchIntensity.count }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      height: 2 + Math.random() * 8,
    })), 
  [glitchIntensity.count]);

  return (
    <>
      {/* RGB split effect */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-50 mix-blend-screen"
        animate={{
          x: [0, -glitchIntensity.offset, glitchIntensity.offset, -glitchIntensity.offset, 0],
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatType: 'mirror',
        }}
        style={{
          background: 'rgba(255, 0, 0, 0.1)',
          filter: `blur(${glitchIntensity.blur}px)`,
        }}
      />
      
      <motion.div
        className="fixed inset-0 pointer-events-none z-50 mix-blend-screen"
        animate={{
          x: [0, glitchIntensity.offset, -glitchIntensity.offset, glitchIntensity.offset, 0],
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatType: 'mirror',
          delay: 0.05,
        }}
        style={{
          background: 'rgba(0, 255, 255, 0.1)',
          filter: `blur(${glitchIntensity.blur}px)`,
        }}
      />

      {/* Scan lines */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-50"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.15),
            rgba(0, 0, 0, 0.15) 1px,
            transparent 1px,
            transparent 2px
          )`,
        }}
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 0.1,
          repeat: Infinity,
        }}
      />

      {/* Random horizontal glitch bars */}
      {glitchBars.map((bar) => (
        <motion.div
          key={bar.id}
          className="fixed left-0 right-0 pointer-events-none z-50"
          style={{
            top: `${bar.top}%`,
            height: `${bar.height}px`,
            background: 'rgba(255, 255, 255, 0.1)',
            mixBlendMode: 'difference',
          }}
          animate={{
            x: [0, -100, 100, -50, 0],
            opacity: [0, 1, 0.5, 1, 0],
          }}
          transition={{
            duration: 0.3,
            repeat: Infinity,
            delay: bar.id * 0.1,
          }}
        />
      ))}

      {/* Digital noise overlay */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-50 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
        animate={{
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 0.1,
          repeat: Infinity,
        }}
      />

      {/* Screen tear effect */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-50"
        animate={{
          clipPath: [
            'inset(0% 0% 0% 0%)',
            'inset(20% 0% 30% 0%)',
            'inset(0% 0% 0% 0%)',
            'inset(40% 0% 10% 0%)',
            'inset(0% 0% 0% 0%)',
          ],
        }}
        transition={{
          duration: 0.4,
          repeat: Infinity,
        }}
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
        }}
      />
    </>
  );
};
