/**
 * VintagePolaroidEffects Component
 * Hyper-realistic vintage polaroid effects with eerie undertones
 */

import React from 'react';
import { motion } from 'framer-motion';

interface VintagePolaroidEffectsProps {
  seed?: number; // For consistent random patterns
}

export const VintagePolaroidEffects: React.FC<VintagePolaroidEffectsProps> = ({ seed = 0 }) => {
  // Generate consistent random values based on seed
  const random = (min: number, max: number, offset: number = 0) => {
    const x = Math.sin(seed + offset) * 10000;
    return min + (x - Math.floor(x)) * (max - min);
  };

  return (
    <>
      {/* Aged paper texture overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply"
        style={{
          backgroundImage: `
            radial-gradient(circle at ${random(20, 80, 1)}% ${random(20, 80, 2)}%, rgba(139,69,19,0.15) 0%, transparent 50%),
            radial-gradient(circle at ${random(20, 80, 3)}% ${random(20, 80, 4)}%, rgba(101,67,33,0.12) 0%, transparent 40%),
            radial-gradient(circle at ${random(20, 80, 5)}% ${random(20, 80, 6)}%, rgba(160,82,45,0.08) 0%, transparent 35%)
          `,
        }}
      />

      {/* Film dust particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <div
            key={`dust-${i}`}
            className="absolute rounded-full bg-black/30"
            style={{
              left: `${random(0, 100, i * 10)}%`,
              top: `${random(0, 100, i * 10 + 1)}%`,
              width: `${random(0.5, 2, i * 10 + 2)}px`,
              height: `${random(0.5, 2, i * 10 + 3)}px`,
              opacity: random(0.2, 0.6, i * 10 + 4),
            }}
          />
        ))}
      </div>

      {/* Scratches and wear marks */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" style={{ mixBlendMode: 'multiply' }}>
        {[...Array(8)].map((_, i) => (
          <line
            key={`scratch-${i}`}
            x1={`${random(0, 100, i * 20)}%`}
            y1={`${random(0, 100, i * 20 + 1)}%`}
            x2={`${random(0, 100, i * 20 + 2)}%`}
            y2={`${random(0, 100, i * 20 + 3)}%`}
            stroke="rgba(0,0,0,0.4)"
            strokeWidth={random(0.3, 0.8, i * 20 + 4)}
            strokeLinecap="round"
            opacity={random(0.3, 0.7, i * 20 + 5)}
          />
        ))}
      </svg>

      {/* Light leaks - orange/pink tinted */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute"
          style={{
            left: `${random(-20, 80, 100)}%`,
            top: `${random(-20, 80, 101)}%`,
            width: `${random(40, 80, 102)}%`,
            height: `${random(40, 80, 103)}%`,
            background: `radial-gradient(ellipse at center, rgba(255,140,0,0.15) 0%, rgba(255,69,0,0.08) 30%, transparent 70%)`,
            filter: 'blur(40px)',
            opacity: 0.6,
          }}
          animate={{
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute"
          style={{
            right: `${random(-20, 80, 104)}%`,
            bottom: `${random(-20, 80, 105)}%`,
            width: `${random(30, 60, 106)}%`,
            height: `${random(30, 60, 107)}%`,
            background: `radial-gradient(ellipse at center, rgba(255,182,193,0.12) 0%, rgba(255,105,180,0.06) 30%, transparent 70%)`,
            filter: 'blur(35px)',
            opacity: 0.5,
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
      </div>

      {/* Faint fingerprints */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        {[...Array(3)].map((_, i) => (
          <svg
            key={`fingerprint-${i}`}
            className="absolute"
            style={{
              left: `${random(10, 80, i * 30)}%`,
              top: `${random(10, 80, i * 30 + 1)}%`,
              width: '40px',
              height: '50px',
              transform: `rotate(${random(-45, 45, i * 30 + 2)}deg)`,
            }}
            viewBox="0 0 40 50"
          >
            <ellipse cx="20" cy="25" rx="15" ry="20" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="0.5" />
            <ellipse cx="20" cy="25" rx="12" ry="16" fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth="0.5" />
            <ellipse cx="20" cy="25" rx="9" ry="12" fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="0.5" />
            <ellipse cx="20" cy="25" rx="6" ry="8" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="0.5" />
          </svg>
        ))}
      </div>

      {/* Ink smudges */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {[...Array(4)].map((_, i) => (
          <div
            key={`smudge-${i}`}
            className="absolute"
            style={{
              left: `${random(5, 90, i * 40)}%`,
              top: `${random(5, 90, i * 40 + 1)}%`,
              width: `${random(15, 35, i * 40 + 2)}px`,
              height: `${random(10, 25, i * 40 + 3)}px`,
              background: `radial-gradient(ellipse at center, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 40%, transparent 70%)`,
              filter: 'blur(3px)',
              transform: `rotate(${random(-30, 30, i * 40 + 4)}deg)`,
              opacity: random(0.3, 0.6, i * 40 + 5),
            }}
          />
        ))}
      </div>

      {/* Vignette - darker edges */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.3) 100%)',
          mixBlendMode: 'multiply',
        }}
      />

      {/* Slight color shift/fading */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          background: 'linear-gradient(135deg, rgba(255,248,220,0.3) 0%, rgba(245,222,179,0.2) 50%, rgba(210,180,140,0.3) 100%)',
          mixBlendMode: 'overlay',
        }}
      />

      {/* Edge wear - torn/damaged corners */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top left corner damage */}
        <div 
          className="absolute top-0 left-0 w-8 h-8"
          style={{
            background: 'radial-gradient(circle at top left, rgba(0,0,0,0.2) 0%, transparent 70%)',
            clipPath: 'polygon(0 0, 100% 0, 0 100%)',
          }}
        />
        {/* Top right corner damage */}
        <div 
          className="absolute top-0 right-0 w-6 h-6"
          style={{
            background: 'radial-gradient(circle at top right, rgba(0,0,0,0.15) 0%, transparent 70%)',
            clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
          }}
        />
        {/* Bottom corners */}
        <div 
          className="absolute bottom-0 left-0 w-5 h-5"
          style={{
            background: 'radial-gradient(circle at bottom left, rgba(0,0,0,0.18) 0%, transparent 70%)',
            clipPath: 'polygon(0 100%, 100% 100%, 0 0)',
          }}
        />
        <div 
          className="absolute bottom-0 right-0 w-7 h-7"
          style={{
            background: 'radial-gradient(circle at bottom right, rgba(0,0,0,0.22) 0%, transparent 70%)',
            clipPath: 'polygon(100% 100%, 100% 0, 0 100%)',
          }}
        />
      </div>

      {/* Subtle grain texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
          mixBlendMode: 'overlay',
        }}
      />

      {/* Slight misalignment effect - photo not perfectly centered */}
      <div 
        className="absolute inset-0 pointer-events-none border border-black/10"
        style={{
          transform: `translate(${random(-1, 1, 200)}px, ${random(-1, 1, 201)}px) rotate(${random(-0.5, 0.5, 202)}deg)`,
        }}
      />
    </>
  );
};
