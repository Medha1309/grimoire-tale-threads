/**
 * GenreAtmosphereBackground Component
 * Renders immersive atmospheric effects based on genre
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Genre, getGenreAtmosphere } from '../../utils/genreAtmospheres';

interface GenreAtmosphereBackgroundProps {
  genre: Genre;
  intensity?: 'low' | 'medium' | 'high';
}

export const GenreAtmosphereBackground: React.FC<GenreAtmosphereBackgroundProps> = ({
  genre,
  intensity = 'medium',
}) => {
  const atmosphere = getGenreAtmosphere(genre);
  const { colors, effects } = atmosphere;

  // Adjust opacity based on intensity
  const opacityMultiplier = intensity === 'low' ? 0.5 : intensity === 'high' ? 1.5 : 1;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, ${colors.primary}08 0%, transparent 70%)`,
        }}
      />

      {/* Effect-specific animations */}
      {effects.type === 'flicker' && (
        <>
          {/* Flickering candlelight */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                `radial-gradient(circle at 50% 85%, ${colors.accent}18 0%, transparent 45%)`,
                `radial-gradient(circle at 50% 85%, ${colors.accent}25 0%, transparent 50%)`,
                `radial-gradient(circle at 50% 85%, ${colors.accent}15 0%, transparent 40%)`,
                `radial-gradient(circle at 50% 85%, ${colors.accent}22 0%, transparent 48%)`,
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{ opacity: 0.3 * opacityMultiplier }}
          />
          {/* Creeping shadows */}
          <motion.div
            className="absolute w-96 h-96 left-1/4 top-1/2"
            style={{
              background: `radial-gradient(ellipse, ${colors.primary}40 0%, transparent 70%)`,
              filter: 'blur(60px)',
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, 30, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}

      {effects.type === 'pulse' && (
        <>
          {/* Electric pulse */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                `radial-gradient(circle at 50% 50%, ${colors.accent}15 0%, transparent 55%)`,
                `radial-gradient(circle at 50% 50%, ${colors.accent}28 0%, transparent 65%)`,
                `radial-gradient(circle at 50% 50%, ${colors.accent}15 0%, transparent 55%)`,
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
            style={{ opacity: 0.4 * opacityMultiplier }}
          />
          {/* Energy waves */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                `radial-gradient(circle at 30% 30%, ${colors.glow} 0%, transparent 40%)`,
                `radial-gradient(circle at 70% 70%, ${colors.glow} 0%, transparent 40%)`,
                `radial-gradient(circle at 30% 30%, ${colors.glow} 0%, transparent 40%)`,
              ],
            }}
            transition={{ duration: 4, repeat: Infinity }}
            style={{ opacity: 0.2 * opacityMultiplier }}
          />
        </>
      )}

      {effects.type === 'fog' && (
        <>
          {/* Rising fog layers */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, ${colors.accent}25 0%, transparent 65%)`,
            }}
            animate={{
              y: ['10%', '0%', '10%'],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, ${colors.primary}20 0%, transparent 50%)`,
            }}
            animate={{
              y: ['5%', '-5%', '5%'],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear', delay: 2 }}
          />
        </>
      )}

      {effects.type === 'glow' && (
        <>
          {/* Warm ambient glow */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                `radial-gradient(circle at 50% 50%, ${colors.accent}15 0%, transparent 50%)`,
                `radial-gradient(circle at 50% 50%, ${colors.accent}22 0%, transparent 58%)`,
                `radial-gradient(circle at 50% 50%, ${colors.accent}15 0%, transparent 50%)`,
              ],
            }}
            transition={{ duration: 4, repeat: Infinity }}
            style={{ opacity: 0.5 * opacityMultiplier }}
          />
          {/* Floating light particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: colors.accent,
                left: `${20 + i * 15}%`,
                top: `${60 + (i % 3) * 10}%`,
                boxShadow: `0 0 20px ${colors.glow}`,
              }}
              animate={{
                y: [0, -60, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                delay: i * 0.8,
              }}
            />
          ))}
        </>
      )}

      {effects.type === 'shimmer' && (
        <>
          {/* Magical shimmer */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${colors.accent}20 0%, transparent 60%)`,
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          {/* Sparkle particles */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: colors.accent,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                boxShadow: `0 0 10px ${colors.glow}`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </>
      )}

      {effects.type === 'static' && (
        <>
          {/* Digital static/scan lines */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                ${colors.accent}08 2px,
                ${colors.accent}08 4px
              )`,
            }}
            animate={{
              y: ['0%', '100%'],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
          {/* Glitch effect */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                `linear-gradient(90deg, transparent 0%, ${colors.glow} 50%, transparent 100%)`,
                `linear-gradient(90deg, transparent 0%, ${colors.glow} 50%, transparent 100%)`,
              ],
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2,
            }}
            style={{ opacity: 0.1 * opacityMultiplier }}
          />
        </>
      )}

      {effects.type === 'drift' && (
        <>
          {/* Drifting ethereal shapes */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${100 + i * 50}px`,
                height: `${100 + i * 50}px`,
                background: `radial-gradient(circle, ${colors.accent}15 0%, transparent 70%)`,
                left: `${10 + i * 20}%`,
                top: `${20 + i * 15}%`,
                filter: 'blur(40px)',
              }}
              animate={{
                y: [0, -100, 0],
                x: [0, 50, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 15 + i * 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 1.5,
              }}
            />
          ))}
        </>
      )}

      {/* Vignette overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, transparent 0%, ${colors.primary}15 100%)`,
        }}
      />

      {/* Subtle texture */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.9" /></filter><rect width="100%" height="100%" filter="url(%23noise)"/></svg>')`,
        }}
      />
    </div>
  );
};
