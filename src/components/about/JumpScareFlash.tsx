/**
 * Jump Scare Flash - Sudden visual and audio shock
 * Triggered at climax of cinematic sequence
 */

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface JumpScareFlashProps {
  isActive: boolean;
  onComplete: () => void;
}

export const JumpScareFlash: React.FC<JumpScareFlashProps> = ({ isActive, onComplete }) => {
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (isActive) {
      // Play jump scare sound
      playScareSound();
      
      // Complete after flash
      const timer = setTimeout(onComplete, 800);
      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete]);

  const playScareSound = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    const ctx = audioContextRef.current;
    
    // Create harsh, dissonant sound
    const oscillator1 = ctx.createOscillator();
    const oscillator2 = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator1.connect(gainNode);
    oscillator2.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    // Dissonant frequencies
    oscillator1.frequency.value = 200;
    oscillator2.frequency.value = 666;
    oscillator1.type = 'sawtooth';
    oscillator2.type = 'square';
    
    // Sharp attack, quick decay
    gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    
    oscillator1.start(ctx.currentTime);
    oscillator2.start(ctx.currentTime);
    oscillator1.stop(ctx.currentTime + 0.3);
    oscillator2.stop(ctx.currentTime + 0.3);
  };

  if (!isActive) return null;

  return (
    <>
      {/* White flash */}
      <motion.div
        className="fixed inset-0 bg-white z-[100]"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.2, times: [0, 0.1, 1] }}
      />

      {/* Red flash overlay */}
      <motion.div
        className="fixed inset-0 bg-red-600 z-[99]"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.8, 0] }}
        transition={{ duration: 0.4, times: [0, 0.3, 1] }}
      />

      {/* Radial burst */}
      <motion.div
        className="fixed inset-0 z-[98]"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)',
        }}
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: 3, opacity: 0 }}
        transition={{ duration: 0.5 }}
      />

      {/* Screen shake effect */}
      <motion.div
        className="fixed inset-0 z-[97]"
        animate={{
          x: [0, -10, 10, -10, 10, -5, 5, 0],
          y: [0, 10, -10, 10, -10, 5, -5, 0],
        }}
        transition={{ duration: 0.4 }}
      />
    </>
  );
};
