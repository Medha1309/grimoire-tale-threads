/**
 * DollhouseBackgroundEffects Component
 * Unified background effects for all dollhouse rooms
 * Includes: grain, vignette, watching eyes, floating elements
 */

import React from 'react';
import { motion } from 'framer-motion';
import { dollhouseTokens } from '../../../design-system/dollhouse-tokens';

interface DollhouseBackgroundEffectsProps {
  theme?: 'pink' | 'matrix';
  intensity?: 'subtle' | 'medium' | 'strong';
  showFloatingElements?: boolean;
  showWatchingEyes?: boolean;
}

export const DollhouseBackgroundEffects: React.FC<DollhouseBackgroundEffectsProps> = ({
  theme = 'pink',
  intensity = 'medium',
  showFloatingElements = true,
  showWatchingEyes = true,
}) => {
  const colors = theme === 'matrix' ? dollhouseTokens.colors.matrix : dollhouseTokens.colors.pink;
  
  const eyeCount = intensity === 'subtle' ? 2 : intensity === 'medium' ? 4 : 6;
  const floatingCount = intensity === 'subtle' ? 4 : intensity === 'medium' ? 6 : 8;

  return (
    <>
      {/* Grain texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          opacity: dollhouseTokens.effects.grain.opacity,
          backgroundImage: dollhouseTokens.effects.grain.backgroundImage,
        }}
      />

      {/* Vignette */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{ background: dollhouseTokens.effects.vignette.background }}
      />

      {/* Atmospheric glow */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        animate={{
          background: [
            `radial-gradient(circle at 20% 30%, ${colors.glow.replace('0.4', '0.06')} 0%, transparent 50%)`,
            `radial-gradient(circle at 80% 70%, ${colors.glow.replace('0.4', '0.06')} 0%, transparent 50%)`,
            `radial-gradient(circle at 50% 50%, ${colors.glow.replace('0.4', '0.06')} 0%, transparent 50%)`,
          ],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Watching Eyes */}
      {showWatchingEyes && (
        <div className="fixed inset-0 z-[2] pointer-events-none">
          {[...Array(eyeCount)].map((_, i) => (
            <motion.div
              key={`eye-${i}`}
              className="absolute"
              style={{
                left: `${(i * 27 + 10) % 90}%`,
                top: `${(i * 19 + 15) % 80}%`,
              }}
              animate={{
                y: [0, -15, 0],
                opacity: [0.08, 0.18, 0.08],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 8 + (i % 3),
                repeat: Infinity,
                delay: i * 1.5,
                ease: 'easeInOut',
              }}
            >
              <div className="relative">
                {/* Doll eye socket */}
                <div
                  className="w-12 h-8 rounded-full bg-black/40 flex items-center justify-center"
                  style={{
                    border: `1px solid ${colors.border}`,
                    boxShadow: `0 0 15px ${colors.glow}`,
                  }}
                >
                  {/* Glassy doll eye */}
                  <motion.div
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-100 to-pink-50 relative overflow-hidden"
                    style={{ boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)' }}
                    animate={{ scale: [1, 0.95, 1] }}
                    transition={{ duration: 4, repeat: Infinity, delay: i * 0.3 }}
                  >
                    {/* Blood vessels */}
                    <svg className="absolute inset-0" viewBox="0 0 32 32">
                      <path d="M16 16 L8 8" stroke={colors.primary} strokeWidth="0.5" opacity="0.4" />
                      <path d="M16 16 L24 8" stroke={colors.primary} strokeWidth="0.5" opacity="0.4" />
                      <path d="M16 16 L8 24" stroke={colors.primary} strokeWidth="0.5" opacity="0.4" />
                      <path d="M16 16 L24 24" stroke={colors.primary} strokeWidth="0.5" opacity="0.4" />
                    </svg>
                    {/* Iris */}
                    <motion.div
                      className="absolute top-1/2 left-1/2 w-5 h-5 rounded-full"
                      style={{
                        transform: 'translate(-50%, -50%)',
                        background: theme === 'matrix' 
                          ? 'linear-gradient(to bottom right, #0F0, #0A0)'
                          : 'linear-gradient(to bottom right, #ec4899, #be185d)',
                        boxShadow: `0 0 8px ${colors.glow}`,
                      }}
                      animate={{
                        x: [0, 2, -2, 0],
                        y: [0, -2, 2, 0],
                      }}
                      transition={{ duration: 8, repeat: Infinity, delay: i * 0.5 }}
                    >
                      {/* Pupil */}
                      <div
                        className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-black"
                        style={{ transform: 'translate(-50%, -50%)' }}
                      />
                      {/* Highlight */}
                      <div className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-white/80" />
                    </motion.div>
                  </motion.div>
                </div>
                {/* Tear/blood */}
                <motion.div
                  className="absolute -bottom-4 left-1/2 w-1 h-6 bg-gradient-to-b to-transparent"
                  style={{
                    transform: 'translateX(-50%)',
                    filter: `drop-shadow(0 0 4px ${colors.glow})`,
                    background: `linear-gradient(to bottom, ${colors.primary}99, transparent)`,
                  }}
                  animate={{
                    height: [0, 24, 0],
                    opacity: [0, 0.7, 0],
                  }}
                  transition={{ duration: 5, repeat: Infinity, delay: i * 1.2 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Floating Elements */}
      {showFloatingElements && theme === 'pink' && (
        <div className="fixed inset-0 z-[1] pointer-events-none">
          {/* Wilted flowers */}
          {[...Array(floatingCount)].map((_, i) => (
            <motion.div
              key={`decay-${i}`}
              className="absolute text-4xl"
              style={{
                left: `${(i * 19) % 100}%`,
                top: `${(i * 23) % 100}%`,
                filter: `drop-shadow(0 0 12px ${colors.glow})`,
              }}
              animate={{
                y: [0, 12, 0],
                rotate: [0, -10, 10, 0],
                opacity: [0.12, 0.25, 0.12],
              }}
              transition={{
                duration: 12 + (i % 4),
                repeat: Infinity,
                delay: i * 1.2,
              }}
            >
              <span style={{ filter: 'hue-rotate(320deg) saturate(0.6) brightness(0.7)' }}>
                🥀
              </span>
            </motion.div>
          ))}
        </div>
      )}

      {/* Matrix rain effect for Archive */}
      {theme === 'matrix' && showFloatingElements && (
        <div className="fixed inset-0 z-[1] pointer-events-none opacity-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`matrix-${i}`}
              className="absolute text-xs font-mono"
              style={{
                left: `${(i * 5) % 100}%`,
                color: colors.primary,
                textShadow: `0 0 10px ${colors.primary}`,
              }}
              animate={{
                y: ['0vh', '100vh'],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'linear',
              }}
            >
              {String.fromCharCode(0x30A0 + Math.random() * 96)}
            </motion.div>
          ))}
        </div>
      )}

      {/* Subtle vine pattern */}
      {theme === 'pink' && (
        <svg
          className="fixed inset-0 w-full h-full opacity-5 pointer-events-none z-0"
          style={{ mixBlendMode: 'screen' }}
        >
          <defs>
            <pattern id="pink-thorns" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M0,50 Q25,30 50,50 T100,50" stroke={colors.primary} strokeWidth="1" fill="none" opacity="0.3" />
              <circle cx="25" cy="40" r="2" fill={colors.primary} opacity="0.3" />
              <circle cx="75" cy="40" r="2" fill={colors.primary} opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pink-thorns)" />
        </svg>
      )}
    </>
  );
};
