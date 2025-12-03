/**
 * Watching Eyes Effect Component
 * Eyes that follow the mouse cursor
 */

import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';

interface WatchingEyesProps {
  count?: number;
  size?: number;
  pupilSize?: number;
  glowColor?: string;
  mousePos: { x: number; y: number };
  className?: string;
}

export const WatchingEyes = memo<WatchingEyesProps>(({ 
  count = 3,
  size = 28,
  pupilSize = 14,
  glowColor = 'rgb(217, 119, 6)',
  mousePos,
  className = ''
}) => {
  const eyePositions = useMemo(() => 
    Array.from({ length: count }, (_, i) => ({
      x: 10 + (i * 40) % 80,
      y: 20 + (i * 25) % 60,
      delay: i * 3,
    })),
    [count]
  );

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {eyePositions.map((pos, i) => {
        const dx = mousePos.x - (window.innerWidth * pos.x) / 100;
        const dy = mousePos.y - (window.innerHeight * pos.y) / 100;
        const angle = Math.atan2(dy, dx);
        const distance = Math.min(Math.sqrt(dx * dx + dy * dy) / 100, 3);
        
        return (
          <motion.div
            key={i}
            className="fixed"
            style={{ 
              left: `${pos.x}%`, 
              top: `${pos.y}%`,
              willChange: 'opacity',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0.6, 0] }}
            transition={{ duration: 12, repeat: Infinity, delay: pos.delay }}
          >
            <div className="flex gap-3">
              {[0, 1].map((eye) => (
                <div 
                  key={eye} 
                  className="relative rounded-full bg-black border-2 border-amber-900/40"
                  style={{ width: size, height: size }}
                >
                  <motion.div
                    className="absolute rounded-full"
                    style={{
                      width: pupilSize,
                      height: pupilSize,
                      top: "50%",
                      left: "50%",
                      x: Math.cos(angle) * distance,
                      y: Math.sin(angle) * distance,
                      translateX: "-50%",
                      translateY: "-50%",
                      backgroundColor: glowColor,
                      boxShadow: `0 0 12px ${glowColor}`,
                      willChange: 'transform',
                    }}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
});

WatchingEyes.displayName = 'WatchingEyes';
