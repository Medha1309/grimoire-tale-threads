/**
 * Attic Window Component
 * "Why It Matters" emotional hook
 * Window with occasional memory flickers
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const memoryFlickers = [
  'Every story deserves to be told...',
  'Horror lives in the details',
  'Your darkest tales matter',
  'Write what scares you',
  'The community awaits',
];

export const AtticWindow: React.FC = () => {
  const [currentFlicker, setCurrentFlicker] = useState<string | null>(null);

  useEffect(() => {
    const showFlicker = () => {
      // Random chance to show a flicker (20% every 8 seconds)
      if (Math.random() < 0.2) {
        const randomFlicker = memoryFlickers[Math.floor(Math.random() * memoryFlickers.length)];
        setCurrentFlicker(randomFlicker);
        
        // Hide after 2 seconds
        setTimeout(() => {
          setCurrentFlicker(null);
        }, 2000);
      }
    };

    const interval = setInterval(showFlicker, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute left-[8%] top-[15%] w-[180px] h-[240px]">
      {/* Window frame (already rendered in AtticScene, this is for content) */}
      <div className="relative w-full h-full">
        {/* Foggy glass with streaks */}
        <div className="absolute inset-2">
          {/* Vertical streaks */}
          {[20, 45, 70].map((left) => (
            <div
              key={left}
              className="absolute top-0 bottom-0 w-[2px] opacity-20"
              style={{
                left: `${left}%`,
                background: 'linear-gradient(180deg, transparent, rgba(200,200,190,0.4), transparent)',
              }}
            />
          ))}

          {/* Fingerprint smudge */}
          <div
            className="absolute top-[30%] right-[25%] w-8 h-8 rounded-full opacity-10"
            style={{
              background: 'radial-gradient(circle, rgba(180,180,170,0.6) 0%, transparent 70%)',
            }}
          />

          {/* Memory flickers */}
          <AnimatePresence>
            {currentFlicker && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.6, 0.6, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2 }}
              >
                <p
                  className="font-serif text-xs text-center leading-relaxed"
                  style={{
                    color: 'rgba(220, 220, 210, 0.8)',
                    textShadow: '0 0 10px rgba(255,255,255,0.5)',
                  }}
                >
                  {currentFlicker}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Occasional BW photo flash */}
          <motion.div
            className="absolute inset-0"
            animate={{
              opacity: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0.15, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              backgroundImage: 'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzMzMyIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iNDAiIGZpbGw9IiM2NjYiLz48L3N2Zz4=)',
              backgroundSize: 'cover',
              filter: 'blur(2px)',
            }}
          />
        </div>
      </div>

      {/* Text plaque under window */}
      <div
        className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[240px] px-4 py-3"
        style={{
          background: `
            linear-gradient(135deg,
              rgba(50, 45, 40, 0.95) 0%,
              rgba(45, 40, 35, 0.95) 100%
            )
          `,
          boxShadow: '0 4px 12px rgba(0,0,0,0.8), inset 0 1px 0 rgba(80,70,60,0.3)',
          border: '1px solid rgba(30,25,20,0.8)',
        }}
      >
        <p
          className="font-serif text-xs leading-relaxed text-center"
          style={{
            color: 'rgba(200, 190, 180, 0.9)',
            textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
          }}
        >
          This platform exists because horror stories deserve a home. A space 
          where writers can craft their darkest tales, readers can discover 
          spine-chilling narratives, and a community can gather to share their 
          love of the macabre. All wrapped in an atmospheric, cinematic experience.
        </p>
      </div>
    </div>
  );
};
