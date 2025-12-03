/**
 * Spotlight Beams Effect Component
 * Atmospheric light beams
 */

import { memo } from 'react';
import { motion } from 'framer-motion';

interface SpotlightBeamsProps {
  count?: number;
  opacity?: number;
  color?: string;
  width?: number;
  className?: string;
}

export const SpotlightBeams = memo<SpotlightBeamsProps>(({ 
  count = 2,
  opacity = 0.6,
  color = 'rgba(255,250,205,0.06)',
  width = 1,
  className = ''
}) => {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} style={{ opacity }}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-0 h-full origin-top"
          style={{
            left: `${30 + i * 40}%`,
            width: `${width}px`,
            background: `linear-gradient(to bottom, ${color} 0%, ${color.replace('0.06', '0.02')} 50%, transparent 100%)`,
            transform: `rotate(${-3 + i * 6}deg)`,
            willChange: 'opacity',
          }}
          animate={{
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 3,
          }}
        />
      ))}
    </div>
  );
});

SpotlightBeams.displayName = 'SpotlightBeams';
