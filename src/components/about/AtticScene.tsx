/**
 * Attic Scene Component
 * Hyper-realistic black-and-white attic environment
 * Feels like a still from a cinematic film
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AtticSceneProps {
  children: React.ReactNode;
}

export const AtticScene: React.FC<AtticSceneProps> = ({ children }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax effect - subtle camera dolly
  const cameraOffset = scrollY * 0.05;

  // Pre-calculate dust particle positions and animations
  const dustParticles = React.useMemo(() => 
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: 10 + Math.random() * 40,
      top: 15 + Math.random() * 50,
      yEnd1: -30 - Math.random() * 40,
      yEnd2: -60 - Math.random() * 80,
      xEnd: (Math.random() - 0.5) * 20,
      duration: 8 + Math.random() * 6,
      delay: Math.random() * 8,
    })), 
  []);

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] overflow-hidden">
      {/* Base attic structure - grayscale with warm undertones */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          transform: `translateY(${cameraOffset}px) scale(${1 + scrollY * 0.0001})`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        {/* Wooden floor */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[40%]"
          style={{
            background: `
              linear-gradient(90deg, 
                rgba(45, 40, 35, 0.95) 0%, 
                rgba(50, 45, 40, 0.95) 8%, 
                rgba(45, 40, 35, 0.95) 8.5%,
                rgba(50, 45, 40, 0.95) 16%,
                rgba(45, 40, 35, 0.95) 16.5%,
                rgba(50, 45, 40, 0.95) 24%,
                rgba(45, 40, 35, 0.95) 24.5%,
                rgba(50, 45, 40, 0.95) 32%,
                rgba(45, 40, 35, 0.95) 32.5%,
                rgba(50, 45, 40, 0.95) 40%,
                rgba(45, 40, 35, 0.95) 40.5%,
                rgba(50, 45, 40, 0.95) 48%,
                rgba(45, 40, 35, 0.95) 48.5%,
                rgba(50, 45, 40, 0.95) 56%,
                rgba(45, 40, 35, 0.95) 56.5%,
                rgba(50, 45, 40, 0.95) 64%,
                rgba(45, 40, 35, 0.95) 64.5%,
                rgba(50, 45, 40, 0.95) 72%,
                rgba(45, 40, 35, 0.95) 72.5%,
                rgba(50, 45, 40, 0.95) 80%,
                rgba(45, 40, 35, 0.95) 80.5%,
                rgba(50, 45, 40, 0.95) 88%,
                rgba(45, 40, 35, 0.95) 88.5%,
                rgba(50, 45, 40, 0.95) 96%,
                rgba(45, 40, 35, 0.95) 100%
              )
            `,
            boxShadow: 'inset 0 20px 40px rgba(0,0,0,0.6), inset 0 -10px 20px rgba(0,0,0,0.4)',
          }}
        >
          {/* Wood grain texture overlay */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 2px,
                  rgba(0,0,0,0.1) 2px,
                  rgba(0,0,0,0.1) 3px
                )
              `,
            }}
          />
        </div>

        {/* Sloped roof beams */}
        <div className="absolute top-0 left-0 right-0 h-[60%]">
          {/* Left slope */}
          <div 
            className="absolute top-0 left-0 w-[50%] h-full origin-top-left"
            style={{
              background: 'linear-gradient(135deg, rgba(35, 30, 25, 0.9) 0%, rgba(25, 20, 15, 0.95) 100%)',
              transform: 'skewY(-15deg)',
              boxShadow: 'inset -20px 0 40px rgba(0,0,0,0.7)',
            }}
          />
          {/* Right slope */}
          <div 
            className="absolute top-0 right-0 w-[50%] h-full origin-top-right"
            style={{
              background: 'linear-gradient(225deg, rgba(35, 30, 25, 0.9) 0%, rgba(25, 20, 15, 0.95) 100%)',
              transform: 'skewY(15deg)',
              boxShadow: 'inset 20px 0 40px rgba(0,0,0,0.7)',
            }}
          />
        </div>

        {/* Window on left - source of light */}
        <motion.div 
          className="absolute left-[8%] top-[15%] w-[180px] h-[240px]"
          animate={{
            opacity: [0.85, 0.95, 0.85],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {/* Window frame */}
          <div 
            className="absolute inset-0 border-8 border-[#3a3530]"
            style={{
              boxShadow: 
                'inset 0 0 20px rgba(0,0,0,0.8), ' +
                '0 10px 30px rgba(0,0,0,0.9)',
            }}
          >
            {/* Cross bars */}
            <div className="absolute top-1/2 left-0 right-0 h-2 bg-[#3a3530] -translate-y-1/2" />
            <div className="absolute left-1/2 top-0 bottom-0 w-2 bg-[#3a3530] -translate-x-1/2" />
            
            {/* Foggy glass */}
            <div 
              className="absolute inset-2"
              style={{
                background: 'linear-gradient(180deg, rgba(200, 200, 190, 0.3) 0%, rgba(180, 180, 170, 0.2) 100%)',
                backdropFilter: 'blur(2px)',
              }}
            />
          </div>
        </motion.div>

        {/* Light beams from window */}
        <motion.div
          className="absolute left-[8%] top-[15%] w-[600px] h-[400px] pointer-events-none"
          animate={{
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            background: `
              conic-gradient(
                from 45deg at 10% 30%,
                transparent 0deg,
                rgba(220, 220, 210, 0.15) 30deg,
                rgba(200, 200, 190, 0.25) 45deg,
                rgba(220, 220, 210, 0.15) 60deg,
                transparent 90deg
              )
            `,
            filter: 'blur(20px)',
            mixBlendMode: 'screen',
          }}
        />

        {/* Dust particles in light */}
        {dustParticles.map((particle) => (
          <motion.div
            key={`dust-${particle.id}`}
            className="absolute w-[2px] h-[2px] rounded-full bg-white/40"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [0, particle.yEnd1, particle.yEnd2],
              x: [0, particle.xEnd],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Content layer */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Vignette overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-20"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.8) 100%)',
        }}
      />

      {/* Film grain */}
      <div 
        className="fixed inset-0 pointer-events-none z-20 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />
    </div>
  );
};
