/**
 * Optimized Watching Eyes Component
 * Reduced count and simplified tracking
 */

import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';

interface WatchingEyesProps {
  mousePos: { x: number; y: number };
  count?: number;
  color?: string;
  glowColor?: string;
}

export const OptimizedWatchingEyes = memo<WatchingEyesProps>(({ 
  mousePos, 
  count = 3,
  color = 'rgb(217, 119, 6)',
  glowColor = 'rgb(217, 119, 6)'
}) => {
  // Memoize positions to prevent recalculation
  const positions = useMemo(() => {
    const pos = [];
    for (let i = 0; i < count; i++) {
      pos.push({
        x: 10 + (i * 40) % 80,
        y: 20 + (i * 30) % 60,
      });
    }
    return pos;
  }, [count]);

  return (
    <>
      {positions.map((pos, i) => {
        const dx = mousePos.x - (window.innerWidth * pos.x) / 100;
        const dy = mousePos.y - (window.innerHeight * pos.y) / 100;
        const angle = Math.atan2(dy, dx);
        const distance = Math.min(Math.sqrt(dx * dx + dy * dy) / 100, 3);
        
        return (
          <motion.div
            key={`eye-${i}`}
            className="pointer-events-none fixed"
            style={{ 
              left: `${pos.x}%`, 
              top: `${pos.y}%`,
              willChange: 'opacity'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0.6, 0] }}
            transition={{ duration: 12, repeat: Infinity, delay: i * 3 }}
          >
            <div className="flex gap-3">
              {[0, 1].map((eye) => (
                <div key={eye} className="relative h-7 w-7 rounded-full bg-black border-2 border-amber-900/40">
                  <div
                    className="absolute h-3.5 w-3.5 rounded-full"
                    style={{
                      top: "50%",
                      left: "50%",
                      transform: `translate(-50%, -50%) translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`,
                      backgroundColor: color,
                      boxShadow: `0 0 12px ${glowColor}`,
                    }}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        );
      })}
    </>
  );
});

OptimizedWatchingEyes.displayName = 'OptimizedWatchingEyes';
