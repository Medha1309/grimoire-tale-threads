/**
 * Sparkles Effect Component
 * Reusable sparkle/glitter effect
 */

import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';

interface SparklesProps {
  count?: number;
  size?: number;
  color?: string;
  opacity?: [number, number];
  duration?: [number, number];
  className?: string;
}

export const Sparkles = memo<SparklesProps>(({ 
  count = 10,
  size = 14,
  color = 'gold',
  opacity = [0, 0.8],
  duration = [4, 6],
  className = ''
}) => {
  const sparkles = useMemo(() => 
    Array.from({ length: count }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 6,
      duration: duration[0] + Math.random() * (duration[1] - duration[0]),
    })),
    [count, duration]
  );

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {sparkles.map((sparkle, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ 
            left: `${sparkle.x}%`, 
            top: `${sparkle.y}%`,
            willChange: 'opacity',
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [opacity[0], opacity[1], opacity[1], opacity[0]],
          }}
          transition={{
            duration: sparkle.duration,
            repeat: Infinity,
            delay: sparkle.delay,
            ease: "easeInOut",
          }}
        >
          <svg width={size} height={size} viewBox="0 0 20 20">
            <path
              d="M10 0 L11 9 L20 10 L11 11 L10 20 L9 11 L0 10 L9 9 Z"
              fill={color}
              opacity="0.7"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
});

Sparkles.displayName = 'Sparkles';
