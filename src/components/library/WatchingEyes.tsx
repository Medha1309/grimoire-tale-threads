/**
 * WatchingEyes Component
 * Red eyes that appear near the torch
 */

import React from 'react';
import { motion } from 'framer-motion';

interface EyePosition {
  x: number;
  y: number;
  blinkDelay: number;
}

interface WatchingEyesProps {
  eyePositions: EyePosition[];
  torchPos: { x: number; y: number };
  torchActive: boolean;
}

const EyePair: React.FC<{ eye: EyePosition; isNearTorch: boolean }> = React.memo(({ eye, isNearTorch }) => (
  <motion.div
    className="absolute pointer-events-none z-10"
    style={{
      left: `${eye.x}%`,
      top: `${eye.y}%`,
    }}
    initial={{ opacity: 0 }}
    animate={{ 
      opacity: isNearTorch ? [0.6, 0, 0.6] : 0,
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      delay: eye.blinkDelay,
    }}
  >
    <div className="flex gap-2">
      <div className="w-2 h-2 rounded-full bg-red-900 shadow-[0_0_10px_rgba(139,0,0,0.8)]" />
      <div className="w-2 h-2 rounded-full bg-red-900 shadow-[0_0_10px_rgba(139,0,0,0.8)]" />
    </div>
  </motion.div>
));

export const WatchingEyes: React.FC<WatchingEyesProps> = React.memo(({ eyePositions, torchPos, torchActive }) => {
  if (!torchActive) return null;

  // Throttle distance calculations
  const eyesWithDistance = React.useMemo(() => {
    return eyePositions.map((eye) => {
      const distanceFromTorch = Math.sqrt(
        Math.pow((eye.x / 100 * window.innerWidth) - torchPos.x, 2) + 
        Math.pow((eye.y / 100 * window.innerHeight) - torchPos.y, 2)
      );
      return {
        eye,
        isNearTorch: distanceFromTorch < 400,
      };
    });
  }, [eyePositions, Math.floor(torchPos.x / 50), Math.floor(torchPos.y / 50)]); // Throttle by rounding position

  return (
    <>
      {eyesWithDistance.map(({ eye, isNearTorch }, i) => (
        <EyePair key={i} eye={eye} isNearTorch={isNearTorch} />
      ))}
    </>
  );
});
