/**
 * Graveyard Background Component
 * Cinematic graveyard atmosphere with fog, moonlight, and subtle animations
 */

import React from 'react';
import { motion } from 'framer-motion';

export const GraveyardBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Dark graveyard wallpaper base */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(180deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.85) 50%, rgba(0, 0, 0, 0.95) 100%),
            url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grave' x='0' y='0' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Crect x='20' y='40' width='15' height='30' rx='7' fill='%23111111' opacity='0.3'/%3E%3Crect x='65' y='35' width='18' height='35' rx='9' fill='%230a0a0a' opacity='0.25'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23grave)'/%3E%3C/svg%3E")
          `,
          backgroundSize: 'cover, 400px 400px',
          backgroundPosition: 'center, center',
        }}
      />

      {/* Moonlight gradient */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(168, 85, 247, 0.08) 30%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Fog layers */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`fog-${i}`}
          className="absolute inset-0"
          style={{
            background: `linear-gradient(${90 + i * 30}deg, transparent 0%, rgba(113, 113, 122, ${0.05 + i * 0.02}) 50%, transparent 100%)`,
            filter: 'blur(40px)',
          }}
          animate={{
            x: ['-10%', '10%', '-10%'],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 2,
          }}
        />
      ))}

      {/* Floating particles (dust/spirits) */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full bg-purple-400/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: '0 0 8px rgba(139, 92, 246, 0.6)',
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Vignette effect */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.6) 100%)',
        }}
      />

      {/* Ground mist */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-64"
        style={{
          background: 'linear-gradient(to top, rgba(113, 113, 122, 0.2) 0%, transparent 100%)',
          filter: 'blur(30px)',
        }}
        animate={{
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Subtle cross/tombstone silhouettes */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`cross-${i}`}
            className="absolute"
            style={{
              left: `${10 + i * 12}%`,
              bottom: `${5 + Math.random() * 10}%`,
              width: '2px',
              height: `${40 + Math.random() * 30}px`,
              background: 'linear-gradient(to bottom, transparent, rgba(113, 113, 122, 0.6), transparent)',
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            {/* Horizontal bar for cross */}
            <div
              className="absolute top-1/4 left-1/2 -translate-x-1/2 h-px"
              style={{
                width: `${15 + Math.random() * 10}px`,
                background: 'rgba(113, 113, 122, 0.6)',
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Atmospheric glow spots */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`glow-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + Math.random() * 40}%`,
            width: `${100 + Math.random() * 100}px`,
            height: `${100 + Math.random() * 100}px`,
            background: `radial-gradient(circle, rgba(${i % 2 === 0 ? '139, 92, 246' : '168, 85, 247'}, 0.1) 0%, transparent 70%)`,
            filter: 'blur(40px)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 1.5,
          }}
        />
      ))}
    </div>
  );
};
