/**
 * Optimized Sparkles Component
 * Reduced count and CSS-based animations
 */

import { memo, useMemo } from 'react';

interface SparklesProps {
  count?: number;
  color?: string;
  size?: number;
}

export const OptimizedSparkles = memo<SparklesProps>(({ 
  count = 6, // Reduced from 10
  color = 'gold',
  size = 14
}) => {
  const sparkles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 6,
      duration: 4 + Math.random() * 2,
    }));
  }, [count]);

  // CSS keyframes for better performance
  const keyframes = useMemo(() => `
    @keyframes sparkle {
      0%, 100% { opacity: 0; transform: scale(0.8); }
      50% { opacity: 0.8; transform: scale(1.2); }
    }
  `, []);

  return (
    <>
      <style>{keyframes}</style>
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute pointer-events-none"
          style={{ 
            left: `${sparkle.x}%`, 
            top: `${sparkle.y}%`,
            animation: `sparkle ${sparkle.duration}s ease-in-out ${sparkle.delay}s infinite`,
            willChange: 'opacity, transform'
          }}
        >
          <svg width={size} height={size} viewBox="0 0 20 20">
            <path
              d="M10 0 L11 9 L20 10 L11 11 L10 20 L9 11 L0 10 L9 9 Z"
              fill={color}
              opacity="0.7"
            />
          </svg>
        </div>
      ))}
    </>
  );
});

OptimizedSparkles.displayName = 'OptimizedSparkles';
