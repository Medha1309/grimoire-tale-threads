/**
 * AnimatedParticles - Reusable particle system
 * Optimized for performance with memoization and progressive loading
 */

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export interface Particle {
  id: number;
  size: number;
  left: string;
  top?: string;
  opacity: number;
  duration: number;
  delay: number;
}

interface AnimatedParticlesProps {
  count: number;
  color?: string;
  minSize?: number;
  maxSize?: number;
  minDuration?: number;
  maxDuration?: number;
  className?: string;
  animationType?: 'float' | 'fall' | 'drift';
}

export const AnimatedParticles: React.FC<AnimatedParticlesProps> = React.memo(({
  count,
  color = 'rgba(255, 255, 255, 0.3)',
  minSize = 1,
  maxSize = 3,
  minDuration = 15,
  maxDuration = 25,
  className = '',
  animationType = 'float',
}) => {
  const particles = useMemo<Particle[]>(() => 
    Array.from({ length: count }, (_, i) => ({
      id: i,
      size: minSize + Math.random() * (maxSize - minSize),
      left: `${Math.random() * 100}%`,
      top: animationType === 'fall' ? undefined : `${Math.random() * 100}%`,
      opacity: 0.2 + Math.random() * 0.3,
      duration: minDuration + Math.random() * (maxDuration - minDuration),
      delay: Math.random() * 5,
    })), 
  [count, minSize, maxSize, minDuration, maxDuration, animationType]);

  const getAnimation = () => {
    switch (animationType) {
      case 'fall':
        return {
          initial: { y: '-10vh', x: 0 },
          animate: {
            y: '110vh',
            x: [0, 20, -20, 0],
          },
        };
      case 'drift':
        return {
          initial: { x: '-10vw' },
          animate: {
            x: '110vw',
            y: [0, -20, 20, 0],
          },
        };
      case 'float':
      default:
        return {
          animate: {
            y: [0, -30, 0],
            x: [0, 15, -15, 0],
          },
        };
    }
  };

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            left: particle.left,
            top: particle.top,
            backgroundColor: color,
            opacity: particle.opacity,
            willChange: 'transform',
          }}
          {...getAnimation()}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
});

AnimatedParticles.displayName = 'AnimatedParticles';
