/**
 * GothicLibraryBackground Component
 * Dark gothic library atmosphere with subtle effects
 * Refactored to use reusable components for consistency
 */

import React from 'react';
import { motion } from 'framer-motion';
import { BaseBackground } from '../shared/backgrounds/BaseBackground';
import { AnimatedParticles } from '../shared/effects/AnimatedParticles';
import { GlowingElement } from '../shared/effects/GlowingElement';

// Book spines along the edges
const BookSpines: React.FC = () => {
  const spines = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: i < 6,
    top: `${10 + i * 15}%`,
    height: `${60 + Math.random() * 80}px`,
    opacity: 0.05 + Math.random() * 0.1,
    rotation: -2 + Math.random() * 4,
  }));

  return (
    <>
      {spines.map((spine) => (
        <div
          key={spine.id}
          className="absolute w-8 bg-zinc-800"
          style={{
            [spine.left ? 'left' : 'right']: spine.left ? '10%' : '10%',
            top: spine.top,
            height: spine.height,
            opacity: spine.opacity,
            transform: `rotate(${spine.rotation}deg)`,
          }}
        />
      ))}
    </>
  );
};

// Floating dust particles - now using reusable component
const FloatingDust: React.FC = () => (
  <AnimatedParticles
    count={12}
    color="rgba(161, 161, 161, 0.4)"
    minSize={1}
    maxSize={3}
    minDuration={15}
    maxDuration={25}
    animationType="fall"
  />
);

// Removed - cleaner background for modern gothic look

// Moving shadows for depth
const MovingShadows: React.FC = () => {
  const shadows = [
    { duration: 45, delay: 0, direction: 1 },
    { duration: 55, delay: 10, direction: -1 },
    { duration: 50, delay: 20, direction: 1 },
  ];

  return (
    <>
      {shadows.map((shadow, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          style={{
            background: `linear-gradient(${shadow.direction > 0 ? '90deg' : '-90deg'}, transparent 0%, rgba(0, 0, 0, 0.2) 50%, transparent 100%)`,
            opacity: 0.3,
          }}
          animate={{
            x: shadow.direction > 0 ? ['0%', '100%'] : ['0%', '-100%'],
          }}
          transition={{
            duration: shadow.duration,
            delay: shadow.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </>
  );
};

// Subtle texture for depth - very refined
const SubtleTexture: React.FC = () => {
  return (
    <div 
      className="absolute inset-0 opacity-[0.015] pointer-events-none"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
      }}
    />
  );
};

// Refined damask wallpaper pattern - polished and crisp
const DamaskPattern: React.FC = () => {
  return (
    <div 
      className="absolute inset-0 opacity-[0.08]"
      style={{
        backgroundImage: `
          repeating-linear-gradient(
            45deg,
            transparent,
            transparent 60px,
            rgba(232, 197, 71, 0.12) 60px,
            rgba(232, 197, 71, 0.12) 61px
          ),
          repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 60px,
            rgba(232, 197, 71, 0.12) 60px,
            rgba(232, 197, 71, 0.12) 61px
          )
        `,
        backgroundSize: '60px 60px',
      }}
    />
  );
};

// Ornate corner flourishes - MORE VISIBLE
const CornerFlourishes: React.FC = () => {
  return (
    <>
      {/* Top left */}
      <motion.div
        className="absolute top-8 left-8"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="150" height="150" viewBox="0 0 150 150" fill="none">
          <path
            d="M 10 10 Q 10 10, 50 10 Q 80 10, 80 40 Q 80 70, 50 70 Q 20 70, 10 50 Q 10 30, 10 10"
            stroke="rgba(212, 175, 55, 0.6)"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="10" cy="10" r="3" fill="rgba(212, 175, 55, 0.5)" />
          <circle cx="50" cy="10" r="2" fill="rgba(212, 175, 55, 0.4)" />
          <circle cx="80" cy="40" r="2" fill="rgba(212, 175, 55, 0.4)" />
        </svg>
      </motion.div>

      {/* Top right */}
      <motion.div
        className="absolute top-8 right-8"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 6, delay: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="150" height="150" viewBox="0 0 150 150" fill="none">
          <path
            d="M 140 10 Q 140 10, 100 10 Q 70 10, 70 40 Q 70 70, 100 70 Q 130 70, 140 50 Q 140 30, 140 10"
            stroke="rgba(212, 175, 55, 0.6)"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="140" cy="10" r="3" fill="rgba(212, 175, 55, 0.5)" />
          <circle cx="100" cy="10" r="2" fill="rgba(212, 175, 55, 0.4)" />
          <circle cx="70" cy="40" r="2" fill="rgba(212, 175, 55, 0.4)" />
        </svg>
      </motion.div>

      {/* Bottom left */}
      <motion.div
        className="absolute bottom-8 left-8"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 6, delay: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="150" height="150" viewBox="0 0 150 150" fill="none">
          <path
            d="M 10 140 Q 10 140, 50 140 Q 80 140, 80 110 Q 80 80, 50 80 Q 20 80, 10 100 Q 10 120, 10 140"
            stroke="rgba(212, 175, 55, 0.6)"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="10" cy="140" r="3" fill="rgba(212, 175, 55, 0.5)" />
          <circle cx="50" cy="140" r="2" fill="rgba(212, 175, 55, 0.4)" />
          <circle cx="80" cy="110" r="2" fill="rgba(212, 175, 55, 0.4)" />
        </svg>
      </motion.div>

      {/* Bottom right */}
      <motion.div
        className="absolute bottom-8 right-8"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 6, delay: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="150" height="150" viewBox="0 0 150 150" fill="none">
          <path
            d="M 140 140 Q 140 140, 100 140 Q 70 140, 70 110 Q 70 80, 100 80 Q 130 80, 140 100 Q 140 120, 140 140"
            stroke="rgba(212, 175, 55, 0.6)"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="140" cy="140" r="3" fill="rgba(212, 175, 55, 0.5)" />
          <circle cx="100" cy="140" r="2" fill="rgba(212, 175, 55, 0.4)" />
          <circle cx="70" cy="110" r="2" fill="rgba(212, 175, 55, 0.4)" />
        </svg>
      </motion.div>
    </>
  );
};

// Floating ornamental elements - MORE VISIBLE
const FloatingOrnaments: React.FC = () => {
  const ornaments = [
    { char: '❦', size: '32px', left: '15%', duration: 20, delay: 0 },
    { char: '✦', size: '28px', left: '35%', duration: 22, delay: 4 },
    { char: '❧', size: '30px', left: '55%', duration: 24, delay: 8 },
    { char: '✦', size: '26px', left: '75%', duration: 23, delay: 12 },
    { char: '❦', size: '34px', left: '85%', duration: 21, delay: 16 },
  ];

  return (
    <>
      {ornaments.map((orn, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: orn.left,
            fontSize: orn.size,
            color: '#d4af37',
            filter: 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.6))',
          }}
          initial={{ y: '110vh', opacity: 0, rotate: 0 }}
          animate={{
            y: '-10vh',
            opacity: [0, 0.3, 0.5, 0.3, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: orn.duration,
            delay: orn.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {orn.char}
        </motion.div>
      ))}
    </>
  );
};

// Chandelier crystal reflections with subtle neon accents
const CrystalReflections: React.FC = () => {
  const reflections = React.useMemo(() => Array.from({ length: 10 }, (_, i) => ({
    id: i,
    left: `${8 + i * 9}%`,
    top: `${3 + (i % 4) * 8}%`,
    delay: i * 0.4,
    duration: 2 + (i % 3),
  })), []);

  return (
    <>
      {reflections.map((ref) => (
        <GlowingElement
          key={ref.id}
          position={{ left: ref.left, top: ref.top }}
          size={{ width: '0.5rem', height: '0.5rem' }}
          color="rgba(212, 175, 55, 1)"
          glowColor="rgba(212, 175, 55, 0.3)"
          opacity={[0, 0.8, 0]}
          scale={[0.3, 1.5, 0.3]}
          duration={ref.duration}
          delay={ref.delay}
        />
      ))}
    </>
  );
};

// Subtle neon accent lines - refined and tasteful
const NeonAccents: React.FC = () => {
  return (
    <>
      {/* Vertical neon lines on sides - subtle and slow */}
      <motion.div
        className="absolute left-0 top-1/4 bottom-1/4 w-px"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(212, 175, 55, 0.2) 50%, transparent 100%)',
          boxShadow: '0 0 12px rgba(212, 175, 55, 0.25)',
        }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute right-0 top-1/4 bottom-1/4 w-px"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(212, 175, 55, 0.2) 50%, transparent 100%)',
          boxShadow: '0 0 12px rgba(212, 175, 55, 0.25)',
        }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 6,
          delay: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Subtle neon glow spots - like distant ambient lighting */}
      {[
        { left: '10%', top: '20%', delay: 0 },
        { right: '10%', top: '30%', delay: 2 },
        { left: '12%', top: '60%', delay: 4 },
        { right: '12%', top: '70%', delay: 6 },
      ].map((pos, i) => (
        <motion.div
          key={i}
          className="absolute w-24 h-24 rounded-full pointer-events-none"
          style={{
            ...pos,
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, rgba(212, 175, 55, 0.03) 50%, transparent 70%)',
            filter: 'blur(25px)',
          }}
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{
            duration: 8,
            delay: pos.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
      
      {/* Subtle atmospheric neon glow at top */}
      <motion.div
        className="absolute top-0 left-1/4 right-1/4 h-24 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(212, 175, 55, 0.06) 0%, transparent 70%)',
          filter: 'blur(35px)',
        }}
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </>
  );
};

export const GothicLibraryBackground: React.FC = React.memo(() => {
  const staticLayers = (
    <>
      {/* Refined damask wallpaper pattern */}
      <DamaskPattern />
      
      {/* Subtle texture for depth */}
      <SubtleTexture />
      
      {/* Ornate corner flourishes */}
      <CornerFlourishes />
      
      {/* Book spines along edges */}
      <BookSpines />
      
      {/* Polished vignette - cleaner and more defined */}
      <div 
        className="absolute inset-0" 
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 30%, rgba(0, 0, 0, 0.6) 70%, rgba(0, 0, 0, 0.85) 100%)',
        }}
      />
      
      {/* Subtle directional lighting from top */}
      <div 
        className="absolute inset-0" 
        style={{
          background: 'linear-gradient(180deg, rgba(232, 197, 71, 0.03) 0%, transparent 30%)',
        }}
      />
    </>
  );

  const animatedLayers = (
    <>
      {/* Subtle neon accents */}
      <NeonAccents />
      
      {/* Chandelier crystal reflections */}
      <CrystalReflections />
      
      {/* Floating dust particles */}
      <FloatingDust />
      
      {/* Floating ornamental elements */}
      <FloatingOrnaments />
      
      {/* Moving shadows for depth */}
      <MovingShadows />
    </>
  );

  return (
    <BaseBackground
      staticLayers={staticLayers}
      animatedLayers={animatedLayers}
      animationDelay={100}
      animationPriority="medium"
    />
  );
});

GothicLibraryBackground.displayName = 'GothicLibraryBackground';
