/**
 * Cinematic Sequence Controller - Orchestrates the entire investigation room experience
 * Manages timing and transitions between all sequences
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TypewriterSequence } from './TypewriterSequence';
import { PolaroidWall } from './PolaroidWall';
import { GlitchEffect } from './GlitchEffect';

type SequencePhase = 'intro' | 'typewriter' | 'glitch1' | 'polaroid' | 'jumpscare' | 'interactive';

export const CinematicSequenceController: React.FC = () => {
  const [phase, setPhase] = useState<SequencePhase>('intro');
  const [hasSeenSequence, setHasSeenSequence] = useState(false);

  useEffect(() => {
    // Check if user has seen the sequence before (localStorage)
    // Check URL param to force replay: ?replay=true
    const urlParams = new URLSearchParams(window.location.search);
    const forceReplay = urlParams.get('replay') === 'true';
    
    // ALWAYS show the animation on first load (comment out localStorage check)
    // const seen = localStorage.getItem('investigation-room-seen');
    // if (seen === 'true' && !forceReplay) {
    //   setHasSeenSequence(true);
    //   setPhase('interactive');
    // } else {
      // Clear the flag if replaying
      if (forceReplay) {
        localStorage.removeItem('investigation-room-seen');
      }
      // Start intro sequence
      const timer = setTimeout(() => {
        setPhase('typewriter');
      }, 2000);
      return () => clearTimeout(timer);
    // }
  }, []);

  const handleTypewriterComplete = () => {
    setPhase('glitch1');
    setTimeout(() => {
      handleComplete();
    }, 2000);
  };

  const handleComplete = () => {
    setPhase('interactive');
    localStorage.setItem('investigation-room-seen', 'true');
    setHasSeenSequence(true);
  };

  const handleSkip = () => {
    handleComplete();
  };

  return (
    <>
      {/* Typewriter sequence */}
      {phase === 'typewriter' && (
        <TypewriterSequence onComplete={handleTypewriterComplete} />
      )}

      {/* Glitch transition */}
      <GlitchEffect 
        isActive={phase === 'glitch1'} 
        intensity="high" 
      />

      {/* Polaroid wall */}
      <PolaroidWall 
        isActive={phase === 'interactive'}
      />

      {/* Replay button (when in interactive phase) */}
      {phase === 'interactive' && (
        <motion.div
          className="fixed bottom-12 right-12 z-[100]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
        >
          <motion.button
            onClick={() => {
              localStorage.removeItem('investigation-room-seen');
              window.location.reload();
            }}
            className="px-4 py-2 text-xs font-serif text-zinc-500 hover:text-zinc-300 transition-all duration-300 border border-zinc-800 hover:border-zinc-600 rounded-lg backdrop-blur-sm bg-zinc-900/30 hover:bg-zinc-800/50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Replay the cinematic sequence"
          >
            ↻ Replay Sequence
          </motion.button>
        </motion.div>
      )}

      {/* Skip button (only during first viewing and typewriter phase) */}
      {!hasSeenSequence && phase === 'typewriter' && (
        <motion.div
          className="fixed bottom-12 left-0 right-0 flex justify-center z-[100]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6, ease: 'easeOut' }}
        >
          <motion.button
            onClick={handleSkip}
            className="px-6 py-3 text-sm font-serif text-zinc-400 transition-all duration-300 border border-zinc-800 hover:border-zinc-700 rounded-lg backdrop-blur-sm bg-zinc-900/30 hover:bg-zinc-800/50"
            style={{
              textShadow: '0 0 0px transparent',
            }}
            whileHover={{ 
              scale: 1.05, 
              y: -2,
              textShadow: '0 0 20px rgba(255, 230, 180, 0.8), 0 0 40px rgba(255, 230, 180, 0.4)',
              color: '#fef3c7',
            }}
            whileTap={{ scale: 0.95 }}
          >
            Skip Sequence
          </motion.button>
        </motion.div>
      )}
    </>
  );
};
