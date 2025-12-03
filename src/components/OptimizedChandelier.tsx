/**
 * Optimized Chandelier Component
 * Reduced re-renders and simplified animations
 */

import { useState, useEffect, memo } from 'react';
import { motion } from 'framer-motion';

interface ChandelierProps {
  position: 'left' | 'center' | 'right';
  delay: number;
  chainLength: number;
}

export const OptimizedChandelier = memo<ChandelierProps>(({ position, delay, chainLength }) => {
  const [lightIntensity, setLightIntensity] = useState(0.7);

  // Simplified flicker - less frequent updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.96) {
        setLightIntensity(0.3 + Math.random() * 0.2);
        setTimeout(() => setLightIntensity(0.6 + Math.random() * 0.2), 100);
      } else {
        setLightIntensity(0.6 + Math.random() * 0.15);
      }
    }, 800); // Reduced frequency from 400-1000ms to 800ms
    
    return () => clearInterval(interval);
  }, []);

  const positionClass = position === 'left' ? 'left-1/4' : position === 'right' ? 'right-1/4' : 'left-1/2';
  const translateClass = position === 'center' ? '-translate-x-1/2' : '';

  return (
    <div className={`pointer-events-none absolute ${positionClass} ${translateClass} top-0 z-0`}>
      {/* Ceiling mount */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2">
        <div className="w-8 h-8 rounded-full border-2 border-zinc-900/80" />
      </div>
      
      <motion.div
        className="absolute left-1/2 top-8 origin-top"
        animate={{ rotate: [-2.5, 2.5, -2.5] }}
        transition={{ duration: 8 + delay, repeat: Infinity, ease: "easeInOut", delay }}
      >
        {/* Chain - simplified */}
        <div 
          className="relative w-0.5 -translate-x-1/2 border-l border-zinc-900/60" 
          style={{ height: `${chainLength * 4}px` }}
        />
        
        {/* Chandelier body - static SVG */}
        <div className="relative -ml-20 mt-0">
          <svg width="160" height="140" viewBox="0 0 160 140" className="drop-shadow-2xl">
            {/* Simplified chandelier structure */}
            <circle cx="80" cy="15" r="8" fill="none" stroke="#18181b" strokeWidth="1.5" opacity="0.9" />
            <path d="M25 25 L135 25 L140 45 L20 45 Z" fill="none" stroke="#18181b" strokeWidth="2" opacity="0.9" />
            <path d="M30 48 L130 48 L135 65 L25 65 Z" fill="none" stroke="#18181b" strokeWidth="2" opacity="0.9" />
            
            {/* Candle arms */}
            {[31, 53, 81, 107, 129].map((x, i) => (
              <g key={i}>
                <ellipse cx={x} cy={87 + (i % 2) * 3} rx="4" ry="2" fill="none" stroke="#18181b" strokeWidth="1" opacity="0.7" />
                <rect x={x - 2} y={77 + (i % 2) * 3} width="4" height="10" fill="none" stroke="#18181b" strokeWidth="0.8" opacity="0.6" />
                {/* Flame - uses lightIntensity */}
                <ellipse 
                  cx={x} 
                  cy={75 + (i % 2) * 3} 
                  rx="4" 
                  ry="6" 
                  fill="#ff8c00" 
                  opacity={lightIntensity * 0.85} 
                />
                <ellipse 
                  cx={x} 
                  cy={73 + (i % 2) * 3} 
                  rx="2" 
                  ry="3" 
                  fill="#fffacd" 
                  opacity={lightIntensity * 0.9} 
                />
              </g>
            ))}
          </svg>
        </div>
      </motion.div>
    </div>
  );
});

OptimizedChandelier.displayName = 'OptimizedChandelier';
