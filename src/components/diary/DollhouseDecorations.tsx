import { memo } from 'react';
import { motion } from 'framer-motion';

export const DollhouseDecorations = memo(() => {
  return (
    <>
      {/* Floating toys - DIM FILL WITH STRONG GLOW */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => {
          const isLeft = i % 2 === 0;
          const leftPos = isLeft ? `${5 + (i * 2)}%` : `${88 + (i * 2)}%`;
          const topPos = `${10 + (i * 15)}%`;
          
          const brightness = 1.2 - (i * 0.05);
          const saturation = 1.2 - (i * 0.08);
          const grayscale = 0.1;
          const opacity = 0.16 - (i * 0.015);
          
          return (
            <motion.div
              key={`toy-${i}`}
              className="absolute text-5xl"
              style={{
                left: leftPos,
                top: topPos,
                opacity,
                filter: `hue-rotate(-30deg) saturate(${saturation}) brightness(${brightness}) grayscale(${grayscale}) drop-shadow(0 0 20px rgba(255, 182, 217, 0.8)) drop-shadow(0 0 12px rgba(255, 182, 217, 0.6))`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 15, 0],
                rotate: [0, 10 - i * 2, -10 + i * 2, 0],
              }}
              transition={{
                duration: 8 + (i % 4),
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
            >
              {i < 2 ? '🧸' : i < 4 ? '🎀' : '🪆'}
            </motion.div>
          );
        })}
      </div>

      {/* Shadow Figures in Corners */}
      {[...Array(4)].map((_, i) => {
        const corners = [
          { x: '5%', y: '10%' },
          { x: '90%', y: '15%' },
          { x: '8%', y: '80%' },
          { x: '88%', y: '75%' },
        ];
        const corner = corners[i];
        
        return (
          <motion.div
            key={`shadow-${i}`}
            className="fixed z-[1] pointer-events-none"
            style={{ left: corner.x, top: corner.y }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0, 0.18, 0.18, 0],
              scale: [0.8, 1, 1, 0.8],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              delay: i * 2.5,
              ease: "easeInOut",
            }}
          >
            <div className="w-32 h-48 bg-gradient-to-b from-black/80 to-transparent blur-2xl" 
                 style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)' }} />
          </motion.div>
        );
      })}
    </>
  );
});

DollhouseDecorations.displayName = 'DollhouseDecorations';
