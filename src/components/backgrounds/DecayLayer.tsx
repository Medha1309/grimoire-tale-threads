/**
 * Decay Background Layer
 * Organic rot clusters and wall cracks
 */

import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';

interface DecayLayerProps {
  opacity?: number;
  clusterCount?: number;
  showCracks?: boolean;
  animated?: boolean;
  className?: string;
}

export const DecayLayer = memo<DecayLayerProps>(({ 
  opacity = 0.25,
  clusterCount = 6,
  showCracks = true,
  animated = true,
  className = ''
}) => {
  const clusters = useMemo(() => 
    Array.from({ length: clusterCount }, (_, i) => ({
      id: i,
      left: `${10 + (i * 15) % 80}%`,
      top: `${15 + (i * 17) % 70}%`,
      width: `${90 + (i * 12) % 110}px`,
      height: `${90 + (i * 12) % 110}px`,
      delay: i * 0.6,
      duration: 8 + i * 2,
    })),
    [clusterCount]
  );

  return (
    <div className={`absolute inset-0 ${className}`} style={{ opacity }}>
      {/* Wall cracks */}
      {showCracks && (
        <svg className="absolute inset-0 w-full h-full opacity-[0.08] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100,0 L120,150 M500,50 L520,300 M900,100 L880,400 M1200,0 L1180,200" 
                stroke="#000" strokeWidth="0.5" fill="none" opacity="0.4"/>
          <path d="M300,100 Q320,150 310,200 T330,300" 
                stroke="#000" strokeWidth="0.3" fill="none" opacity="0.3"/>
          <path d="M700,50 Q720,100 710,150" 
                stroke="#000" strokeWidth="0.4" fill="none" opacity="0.35"/>
        </svg>
      )}
      
      {/* Organic rot clusters */}
      {clusters.map((cluster) => (
        <motion.div
          key={cluster.id}
          className="absolute rounded-full"
          style={{
            left: cluster.left,
            top: cluster.top,
            width: cluster.width,
            height: cluster.height,
            background: 'radial-gradient(circle, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 50%, transparent 70%)',
            filter: 'blur(4px)',
            willChange: animated ? 'transform' : 'auto',
          }}
          animate={animated ? {
            scale: [1, 1.06, 1],
          } : {}}
          transition={{
            duration: cluster.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: cluster.delay,
          }}
        />
      ))}
    </div>
  );
});

DecayLayer.displayName = 'DecayLayer';
