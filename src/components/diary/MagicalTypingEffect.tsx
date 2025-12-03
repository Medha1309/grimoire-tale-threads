import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
}

interface MagicalTypingEffectProps {
  isTyping: boolean;
  color: string;
}

export const MagicalTypingEffect: React.FC<MagicalTypingEffectProps> = ({ isTyping, color }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!isTyping) {
      setParticles([]);
      return;
    }

    const interval = setInterval(() => {
      const newParticle: Particle = {
        id: Date.now() + Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        color,
      };

      setParticles(prev => [...prev.slice(-8), newParticle]);
    }, 200);

    return () => clearInterval(interval);
  }, [isTyping, color]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              backgroundColor: particle.color,
              boxShadow: `0 0 10px ${particle.color}, 0 0 20px ${particle.color}`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              y: [0, -50],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
