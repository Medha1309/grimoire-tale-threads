/**
 * Themed Background - Changes based on costume
 * Provides different atmospheric effects for each theme
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useCostume } from '../../contexts/CostumeContext';
import { getCostumeConfig } from '../../design-system/costume-themes';

export const ThemedBackground: React.FC = () => {
  const { costume } = useCostume();
  const config = getCostumeConfig(costume);

  return (
    <>
      {/* Base Background */}
      <motion.div
        className="fixed inset-0 z-0"
        style={{ background: config.colors.bg }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Film Grain (Gothic Detective, Vintage Sepia, Haunted Mansion) */}
      {config.effects.grain && (
        <div
          className="fixed inset-0 pointer-events-none z-1 opacity-5"
          style={{
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.9" /></filter><rect width="100%" height="100%" filter="url(%23noise)"/></svg>')`,
          }}
        />
      )}

      {/* Scanlines (Neon Cyberpunk) */}
      {config.effects.scanlines && (
        <div
          className="fixed inset-0 pointer-events-none z-1 opacity-10"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 245, 255, 0.1) 2px, rgba(0, 245, 255, 0.1) 4px)',
          }}
        />
      )}

      {/* Vignette */}
      <div
        className="fixed inset-0 pointer-events-none z-2"
        style={{
          background: `radial-gradient(ellipse at center, transparent 0%, ${config.colors.shadow} 100%)`,
        }}
      />

      {/* Theme-Specific Effects */}
      {costume === 'windows-98' && <Windows98Pattern />}
      {costume === 'neon-cyberpunk' && <NeonGrid />}
      {costume === 'vintage-sepia' && <PaperTexture />}
      {costume === 'haunted-mansion' && <CandleFlicker />}
    </>
  );
};

// Windows 98 Desktop Pattern
const Windows98Pattern: React.FC = () => (
  <div
    className="fixed inset-0 pointer-events-none z-1 opacity-30"
    style={{
      backgroundImage: `
        linear-gradient(45deg, #008080 25%, transparent 25%),
        linear-gradient(-45deg, #008080 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, #008080 75%),
        linear-gradient(-45deg, transparent 75%, #008080 75%)
      `,
      backgroundSize: '20px 20px',
      backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
    }}
  />
);

// Neon Cyberpunk Grid
const NeonGrid: React.FC = () => (
  <div
    className="fixed inset-0 pointer-events-none z-1 opacity-20"
    style={{
      backgroundImage: `
        linear-gradient(rgba(0, 245, 255, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 0, 255, 0.1) 1px, transparent 1px)
      `,
      backgroundSize: '50px 50px',
    }}
  />
);

// Vintage Paper Texture
const PaperTexture: React.FC = () => (
  <div
    className="fixed inset-0 pointer-events-none z-1 opacity-40"
    style={{
      backgroundImage: `radial-gradient(circle at 20% 50%, rgba(244, 232, 208, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 80% 80%, rgba(244, 232, 208, 0.1) 0%, transparent 50%)`,
    }}
  />
);

// Haunted Mansion Candle Flicker
const CandleFlicker: React.FC = () => (
  <motion.div
    className="fixed inset-0 pointer-events-none z-1"
    style={{
      background: 'radial-gradient(ellipse at 30% 40%, rgba(157, 78, 221, 0.1) 0%, transparent 50%)',
    }}
    animate={{
      opacity: [0.3, 0.5, 0.4, 0.6, 0.35],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />
);
