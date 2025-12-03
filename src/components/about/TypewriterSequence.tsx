/**
 * Typewriter Sequence - Self-typing investigation notes
 * Realistic mechanical typewriter with sound and paper movement
 */

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface TypewriterSequenceProps {
  onComplete: () => void;
}

const TYPEWRITER_TEXT = `CASE FILE #2847

Subject: GRIMOIRE Platform
Status: ACTIVE INVESTIGATION

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

LOCATIONS IDENTIFIED:

THE LIBRARY
Horror fiction archive. Reading history
tracked. Torch-lit corridors.

THE DOLLHOUSE  
Private rooms. Something about diaries,
photographs, and logs. Encrypted.
Subjects report unusual attachment.

THE TEA ROOM
Discussion space. Victorian aesthetic.
Readers gather. Anonymous exchanges.
Candlelight. Something watches.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TECHNICAL PROFILE:

React 18 • TypeScript • Firebase
Framer Motion • Tailwind CSS
Performance: 60fps target

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ASSESSMENT:

Engagement: Above average
Retention: Concerning
Behavior: Repeated visits

Recommend immediate—

[CONNECTION TERMINATED]`;

export const TypewriterSequence: React.FC<TypewriterSequenceProps> = ({ onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Typewriter sound effect
  const playTypeSound = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.value = 100 + Math.random() * 50;
    oscillator.type = 'square';
    
    gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.05);
  };

  useEffect(() => {
    if (currentIndex < TYPEWRITER_TEXT.length) {
      const char = TYPEWRITER_TEXT[currentIndex];
      const baseDelay = char === '\n' ? 200 : char === ' ' ? 50 : 60 + Math.random() * 40;
      
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + char);
        setCurrentIndex(prev => prev + 1);
        
        // Play sound for visible characters
        if (char !== '\n' && char !== ' ') {
          playTypeSound();
        }
      }, baseDelay);

      return () => clearTimeout(timer);
    } else {
      // Complete after typing finishes
      const completeTimer = setTimeout(onComplete, 1000);
      return () => clearTimeout(completeTimer);
    }
  }, [currentIndex, onComplete]);

  return (
    <motion.div
      className="fixed z-50"
      style={{
        top: '15%',
        left: '25%',
        transform: 'translateX(-50%)',
        width: '90vw',
        maxWidth: '700px',
        maxHeight: '65vh',
        overflowY: 'auto',
      }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 1 }}
    >
      {/* Typewriter body */}
      <div className="relative">
        {/* Paper */}
        <motion.div
          className="relative bg-amber-50/95 p-12 shadow-2xl"
          style={{
            boxShadow: '0 20px 60px rgba(0,0,0,0.9), inset 0 0 30px rgba(0,0,0,0.1)',
          }}
        >
          {/* Paper texture */}
          <div 
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              backgroundImage: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 25px,
                rgba(0,0,0,0.03) 25px,
                rgba(0,0,0,0.03) 26px
              )`,
            }}
          />

          {/* Typed text */}
          <pre 
            className="relative font-mono text-base md:text-lg leading-relaxed whitespace-pre-wrap font-bold"
            style={{
              color: '#1a1a1a',
              fontFamily: '"Courier Prime", "Courier New", monospace',
              fontWeight: 700,
            }}
          >
            {displayedText}
          </pre>
        </motion.div>

        {/* Typewriter base shadow */}
        <div 
          className="absolute -bottom-2 left-0 right-0 h-8 bg-black/40 blur-xl"
          style={{ transform: 'perspective(100px) rotateX(5deg)' }}
        />
      </div>
    </motion.div>
  );
};
