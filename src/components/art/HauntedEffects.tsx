/**
 * Haunted Effects for Art Studio
 * Supernatural disturbances and eerie phenomena
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HauntedEffectsProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  isActive: boolean;
}

export const HauntedEffects: React.FC<HauntedEffectsProps> = ({ canvasRef, isActive }) => {
  const [shadowHands, setShadowHands] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const [spectralFace, setSpectralFace] = useState<{ x: number; y: number; opacity: number } | null>(null);
  const [bloodDrips, setBloodDrips] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const [whisperText, setWhisperText] = useState<string | null>(null);

  const WHISPERS = [
    'they are watching...',
    'do you see them too?',
    'the canvas remembers...',
    'your art will never die...',
    'something is wrong here...',
    'can you feel it?',
    'the shadows are moving...',
    'it knows your name...',
    'this place is cursed...',
    'you should not be here...',
  ];

  // Shadow hands reaching across canvas
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      if (Math.random() < 0.15) {
        const hand = {
          x: Math.random() < 0.5 ? -100 : window.innerWidth,
          y: Math.random() * 600,
          id: Date.now(),
        };
        setShadowHands(prev => [...prev, hand]);

        setTimeout(() => {
          setShadowHands(prev => prev.filter(h => h.id !== hand.id));
        }, 3000);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isActive]);

  // Spectral face appearing
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      if (Math.random() < 0.1) {
        setSpectralFace({
          x: Math.random() * 700,
          y: Math.random() * 500,
          opacity: 0.1 + Math.random() * 0.2,
        });

        setTimeout(() => setSpectralFace(null), 4000);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [isActive]);

  // Blood dripping effect
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      if (Math.random() < 0.2) {
        const drip = {
          x: Math.random() * 800,
          y: 0,
          id: Date.now(),
        };
        setBloodDrips(prev => [...prev, drip]);

        setTimeout(() => {
          setBloodDrips(prev => prev.filter(d => d.id !== drip.id));
        }, 5000);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [isActive]);

  // Whispers appearing
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      if (Math.random() < 0.15) {
        const whisper = WHISPERS[Math.floor(Math.random() * WHISPERS.length)];
        setWhisperText(whisper);

        setTimeout(() => setWhisperText(null), 4000);
      }
    }, 12000);

    return () => clearInterval(interval);
  }, [isActive]);

  // Canvas decay effect
  useEffect(() => {
    if (!isActive || !canvasRef.current) return;

    const interval = setInterval(() => {
      if (Math.random() < 0.05) {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Add decay spots
        for (let i = 0; i < 5; i++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          const size = 2 + Math.random() * 4;

          ctx.globalAlpha = 0.05;
          ctx.fillStyle = '#4a5a3a';
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [isActive, canvasRef]);

  if (!isActive) return null;

  return (
    <>
      {/* Shadow Hands */}
      <AnimatePresence>
        {shadowHands.map(hand => (
          <motion.div
            key={hand.id}
            initial={{ x: hand.x, y: hand.y, opacity: 0, scale: 0.5 }}
            animate={{
              x: hand.x < 400 ? hand.x + 300 : hand.x - 300,
              y: hand.y,
              opacity: [0, 0.4, 0.4, 0],
              scale: [0.5, 1, 1, 0.8],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3, ease: 'easeInOut' }}
            className="absolute pointer-events-none z-20"
            style={{
              width: '150px',
              height: '150px',
              filter: 'blur(3px)',
            }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path
                d="M 30 80 Q 25 70 25 60 L 25 40 Q 25 35 30 35 Q 35 35 35 40 L 35 30 Q 35 25 40 25 Q 45 25 45 30 L 45 25 Q 45 20 50 20 Q 55 20 55 25 L 55 30 Q 55 25 60 25 Q 65 25 65 30 L 65 40 Q 65 35 70 35 Q 75 35 75 40 L 75 60 Q 75 70 70 80 Q 65 90 50 90 Q 35 90 30 80 Z"
                fill="rgba(0, 0, 0, 0.7)"
                stroke="rgba(0, 0, 0, 0.9)"
                strokeWidth="1"
              />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Spectral Face */}
      <AnimatePresence>
        {spectralFace && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0, spectralFace.opacity, spectralFace.opacity, 0],
              scale: [0.8, 1, 1, 1.1],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 4, ease: 'easeInOut' }}
            className="absolute pointer-events-none z-20"
            style={{
              left: spectralFace.x,
              top: spectralFace.y,
              width: '100px',
              height: '120px',
              filter: 'blur(2px)',
            }}
          >
            <svg viewBox="0 0 100 120" className="w-full h-full">
              {/* Face outline */}
              <ellipse cx="50" cy="60" rx="40" ry="50" fill="rgba(255, 255, 255, 0.1)" />
              {/* Eyes */}
              <circle cx="35" cy="50" r="8" fill="rgba(0, 0, 0, 0.6)" />
              <circle cx="65" cy="50" r="8" fill="rgba(0, 0, 0, 0.6)" />
              {/* Mouth */}
              <path
                d="M 30 75 Q 50 85 70 75"
                stroke="rgba(0, 0, 0, 0.5)"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Blood Drips */}
      <AnimatePresence>
        {bloodDrips.map(drip => (
          <motion.div
            key={drip.id}
            initial={{ x: drip.x, y: drip.y, opacity: 0 }}
            animate={{
              y: [drip.y, drip.y + 600],
              opacity: [0, 0.6, 0.6, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 5, ease: 'linear' }}
            className="absolute pointer-events-none z-20"
            style={{
              width: '3px',
              height: '40px',
              background: 'linear-gradient(to bottom, transparent, #8B0000, #8B0000)',
              filter: 'blur(0.5px)',
            }}
          />
        ))}
      </AnimatePresence>

      {/* Whispers */}
      <AnimatePresence>
        {whisperText && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: [0, 0.4, 0.4, 0],
              y: [20, 0, 0, -10],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 4, ease: 'easeOut' }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none z-30"
          >
            <p className="font-serif text-sm text-zinc-500 italic tracking-wide">
              {whisperText}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
