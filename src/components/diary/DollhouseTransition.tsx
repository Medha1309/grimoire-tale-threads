/**
 * Creepy transition animation for entering the Dollhouse
 * Haunting sequence: Eyes → Welcome → Static → Pause → Dollhouse
 */

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DollhouseTransitionProps {
  onComplete: () => void;
}

export const DollhouseTransition: React.FC<DollhouseTransitionProps> = ({ onComplete }) => {
  const [phase, setPhase] = React.useState<'eyes' | 'welcome' | 'prePause'>('eyes');

  useEffect(() => {
    // Phase 1: Eyes (0-4s) - eerie appearance
    const welcomeTimer = setTimeout(() => {
      setPhase('welcome');
    }, 4000);

    // Phase 2: Cinematic text (4-20s) - 16s for all 4 lines
    const prePauseTimer = setTimeout(() => {
      setPhase('prePause');
    }, 20000);

    // Phase 3: Brief pause (20-21.5s) - 1.5 seconds before dollhouse
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 21500);

    return () => {
      clearTimeout(welcomeTimer);
      clearTimeout(prePauseTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const handleSkip = () => {
    onComplete();
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ 
        clipPath: 'circle(0% at 50% 50%)',
        opacity: 0
      }}
      transition={{ 
        duration: 1,
        exit: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
      }}
    >
      <AnimatePresence mode="wait">
        {/* Eyes with optional welcome text */}
        {(phase === 'eyes' || phase === 'welcome' || phase === 'prePause') && (
          <motion.div
            key="eyes-phase"
            className="absolute inset-0"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            {/* Multiple pairs of translucent eyes */}
            {[...Array(8)].map((_, i) => {
              const positions = [
                { x: '15%', y: '20%' },
                { x: '80%', y: '15%' },
                { x: '10%', y: '50%' },
                { x: '85%', y: '55%' },
                { x: '45%', y: '30%' },
                { x: '60%', y: '70%' },
                { x: '25%', y: '75%' },
                { x: '70%', y: '40%' },
              ];
              const pos = positions[i];

              return (
                <motion.div
                  key={`eyes-${i}`}
                  className="absolute flex gap-3"
                  style={{ left: pos.x, top: pos.y }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0, 0, 0.3, 0.5, 0.4],
                    scale: [0, 0, 0.8, 1.2, 1],
                  }}
                  transition={{ 
                    duration: 3.5,
                    delay: i * 0.25,
                    times: [0, 0.2, 0.5, 0.8, 1],
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {/* Left eye - just pink pupil */}
                  <motion.div
                    className="relative w-6 h-6 rounded-full bg-[#ffb6d9]/60"
                    animate={{
                      scale: [1, 0.8, 1],
                      opacity: [0.6, 0.9, 0.6],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: 'easeInOut',
                    }}
                    style={{
                      boxShadow: '0 0 20px rgba(255,182,217,0.6)',
                    }}
                  >
                    <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-white/70" />
                  </motion.div>

                  {/* Right eye - just pink pupil */}
                  <motion.div
                    className="relative w-6 h-6 rounded-full bg-[#ffb6d9]/60"
                    animate={{
                      scale: [1, 0.8, 1],
                      opacity: [0.6, 0.9, 0.6],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: 'easeInOut',
                    }}
                    style={{
                      boxShadow: '0 0 20px rgba(255,182,217,0.6)',
                    }}
                  >
                    <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-white/70" />
                  </motion.div>
                </motion.div>
              );
            })}

            {/* Cinematic text overlay - visible during welcome phase only */}
            {phase === 'welcome' && (
              <>
                {/* Darker background overlay when text appears */}
                <motion.div
                  className="absolute inset-0 bg-black pointer-events-none z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2, ease: [0.33, 1, 0.68, 1] }}
                />
                
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                  <div className="relative w-full h-full flex items-center justify-center">
                    {[
                      { text: 'Some memories write themselves in time...', delay: 0, isSignature: false },
                      { text: 'Some flicker through the static\'s grime...', delay: 3.8, isSignature: false },
                      { text: 'Some hide behind the locked-up doors...', delay: 7.6, isSignature: false },
                      { text: 'Some sleep in portraits evermore...', delay: 11.4, isSignature: false },
                      { text: '— GRIMOIRE', delay: 15.2, isSignature: true },
                    ].map((line, i) => (
                      <motion.div
                        key={i}
                        className="absolute inset-0 flex items-center justify-center px-8"
                        initial={{ opacity: 0 }}
                        animate={{ 
                          opacity: [0, 0, 0, 0, 0.1, 0.3, 0.6, 0.8, 0.85, 0.85, 0.85, 0.85, 0.85, 0.85, 0.85, 0.85, 0.85, 0.85, 0.85, 0.85, 0.85, 0.85, 0.82, 0.75, 0.65, 0.52, 0.38, 0.24, 0.12, 0.04, 0],
                        }}
                        transition={{ 
                          delay: line.delay,
                          duration: 4.6,
                          times: [0, 0.02, 0.04, 0.06, 0.08, 0.1, 0.12, 0.15, 0.18, 0.2, 0.22, 0.26, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.84, 0.88, 0.91, 0.94, 0.97, 0.985, 0.995, 1],
                          ease: [0.33, 1, 0.68, 1],
                        }}
                      >
                        <motion.p
                          className={`font-serif leading-relaxed text-center max-w-3xl ${line.isSignature ? 'text-xs italic tracking-wider' : 'text-xl md:text-2xl'}`}
                          style={{
                            color: line.isSignature ? 'rgba(106, 0, 0, 0.5)' : 'rgba(255, 182, 217, 0.7)',
                            textShadow: '0 2px 8px rgba(0,0,0,0.6)',
                            letterSpacing: line.isSignature ? '0.2em' : '0.03em',
                            fontWeight: 300,
                          }}
                          initial={{ y: 40, filter: 'blur(12px)', scale: 0.92 }}
                          animate={{ 
                            y: [40, 40, 40, 40, 35, 26, 16, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -2, -6, -12, -20, -30, -42, -56, -72, -90],
                            filter: [
                              'blur(12px)', 
                              'blur(12px)', 
                              'blur(12px)', 
                              'blur(12px)', 
                              'blur(10px)', 
                              'blur(8px)', 
                              'blur(5px)', 
                              'blur(2px)', 
                              'blur(0px)', 
                              'blur(0px)', 
                              'blur(0px)', 
                              'blur(0px)', 
                              'blur(0px)', 
                              'blur(0px)', 
                              'blur(0px)', 
                              'blur(0px)', 
                              'blur(0px)', 
                              'blur(0px)', 
                              'blur(0px)', 
                              'blur(0px)', 
                              'blur(0px)', 
                              'blur(0px)', 
                              'blur(1px)', 
                              'blur(3px)', 
                              'blur(6px)', 
                              'blur(11px)',
                              'blur(18px)',
                              'blur(28px)',
                              'blur(42px)',
                              'blur(60px)',
                              'blur(85px)'
                            ],
                            scale: [0.92, 0.92, 0.92, 0.92, 0.94, 0.96, 0.98, 0.99, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.002, 1.005, 1.009, 1.014, 1.019, 1.024, 1.029, 1.034, 1.039],
                          }}
                          transition={{ 
                            delay: line.delay,
                            duration: 4.6,
                            times: [0, 0.02, 0.04, 0.06, 0.08, 0.1, 0.12, 0.15, 0.18, 0.2, 0.22, 0.26, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.84, 0.88, 0.91, 0.94, 0.97, 0.985, 0.995, 1],
                            ease: [0.33, 1, 0.68, 1],
                          }}
                        >
                          {line.text}
                        </motion.p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Vignette overlay with breathing effect */}
            <motion.div 
              className="absolute inset-0 pointer-events-none" 
              style={{
                background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.9) 100%)'
              }}
              animate={{
                background: [
                  'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.85) 100%)',
                  'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.95) 100%)',
                  'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.85) 100%)',
                ]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
            
            {/* Subtle scanline effect for vintage horror feel */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-10"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,182,217,0.03) 2px, rgba(255,182,217,0.03) 4px)',
              }}
            />
          </motion.div>
        )}

      </AnimatePresence>

      {/* Skip button - always visible, fades in smoothly */}
      <motion.div 
        className="fixed bottom-12 left-0 right-0 flex justify-center z-[10000] pointer-events-none"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6, ease: 'easeOut' }}
      >
        <motion.button
          onClick={handleSkip}
          className="px-6 py-3 text-sm font-serif text-zinc-400 transition-all duration-300 border border-zinc-800 hover:border-[#ffb6d9]/40 rounded-lg backdrop-blur-sm bg-zinc-900/30 hover:bg-zinc-800/50 pointer-events-auto cursor-pointer"
          style={{
            textShadow: '0 0 0px transparent',
            cursor: 'pointer',
          }}
          whileHover={{ 
            scale: 1.05, 
            y: -2,
            textShadow: '0 0 20px rgba(255, 182, 217, 0.8), 0 0 40px rgba(255, 182, 217, 0.4)',
            color: '#ffb6d9'
          }}
          whileTap={{ scale: 0.95 }}
        >
          Skip to Boudoir
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
