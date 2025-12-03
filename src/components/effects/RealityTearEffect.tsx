import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HauntingPhase } from '../../hooks/useIdleHaunting';

interface RealityTearEffectProps {
  phase: HauntingPhase;
}

export const RealityTearEffect: React.FC<RealityTearEffectProps> = ({ phase }) => {
  // Generate floating particles for void phase
  const particles = useMemo(() => 
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 2,
    })),
    []
  );

  if (phase === 'none') return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9998]">
      <AnimatePresence>
        {/* Phase 1: Instability */}
        {phase === 'instability' && (
          <motion.div
            key="instability"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
          >
            {/* Subtle RGB split */}
            <motion.div
              className="absolute inset-0 mix-blend-screen"
              style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(255,0,0,0.03) 0%, transparent 50%)',
              }}
              animate={{
                x: [0, 2, -2, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute inset-0 mix-blend-screen"
              style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(0,255,255,0.03) 0%, transparent 50%)',
              }}
              animate={{
                x: [0, -2, 2, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>
        )}

        {/* Phase 2: Fracture */}
        {phase === 'fracture' && (
          <motion.div
            key="fracture"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Stronger RGB split */}
            <motion.div
              className="absolute inset-0 mix-blend-screen"
              style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(255,0,0,0.08) 0%, transparent 60%)',
              }}
              animate={{
                x: [0, 5, -5, 0],
                y: [0, 2, -2, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute inset-0 mix-blend-screen"
              style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(0,255,255,0.08) 0%, transparent 60%)',
              }}
              animate={{
                x: [0, -5, 5, 0],
                y: [0, -2, 2, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Subtle vignette instead of harsh circle */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ duration: 3 }}
              style={{
                background: 'radial-gradient(circle at 50% 50%, transparent 0%, transparent 40%, rgba(0,0,0,0.15) 80%)',
              }}
            />
          </motion.div>
        )}

        {/* Phase 3: Collapse */}
        {phase === 'collapse' && (
          <motion.div
            key="collapse"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Intense RGB split */}
            <motion.div
              className="absolute inset-0 mix-blend-screen"
              style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(255,0,0,0.15) 0%, transparent 70%)',
              }}
              animate={{
                x: [0, 10, -10, 0],
                y: [0, 5, -5, 0],
                rotate: [0, 2, -2, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute inset-0 mix-blend-screen"
              style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(0,255,255,0.15) 0%, transparent 70%)',
              }}
              animate={{
                x: [0, -10, 10, 0],
                y: [0, -5, 5, 0],
                rotate: [0, -2, 2, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Subtle darkening vignette instead of harsh void */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 5, ease: 'easeIn' }}
              style={{
                background: 'radial-gradient(circle at 50% 50%, transparent 0%, transparent 30%, rgba(0,0,0,0.3) 70%)',
              }}
            />

            {/* Elegant geometric distortions - thinner and more subtle */}
            {[...Array(8)].map((_, i) => {
              const angle = (i * 360) / 8;
              return (
                <motion.div
                  key={i}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    width: 1,
                    height: 150,
                    background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.05), transparent)',
                    transformOrigin: 'top center',
                  }}
                  animate={{
                    rotate: [angle, angle + 360],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                    opacity: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                  }}
                />
              );
            })}
          </motion.div>
        )}

        {/* Phase 4: The Void */}
        {phase === 'void' && (
          <motion.div
            key="void"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
          >
            {/* Elegant dark vignette instead of full black */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.7) 100%)',
              }}
            />

            {/* Floating particles/stars */}
            {particles.map(particle => (
              <motion.div
                key={particle.id}
                className="absolute rounded-full bg-white"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  width: particle.size,
                  height: particle.size,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 0.8, 0],
                  scale: [0, 1, 0],
                  y: [0, -100],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  delay: particle.delay,
                  ease: 'easeOut',
                }}
              />
            ))}

            {/* Subtle cosmic rings - no purple */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
                style={{
                  width: 300 + i * 150,
                  height: 300 + i * 150,
                  borderColor: `rgba(255, 255, 255, ${0.05 - i * 0.01})`,
                  borderWidth: 1,
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.4, 0.2],
                  rotate: i % 2 === 0 ? 360 : -360,
                }}
                transition={{
                  duration: 15 + i * 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            ))}

            {/* Message */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-32"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: [0, 0.6, 0], y: [20, 0, -20] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <p className="text-white/40 text-sm font-serif tracking-widest">
                Still there?
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
