/**
 * Diary Module - Noise Mode Component
 * CRT grain overlay for 2000s nostalgia
 */

import React from 'react';

interface NoiseModeProps {
  enabled: boolean;
}

export const NoiseMode: React.FC<NoiseModeProps> = ({ enabled }) => {
  if (!enabled) return null;

  return (
    <>
      {/* CRT Grain */}
      <div
        className="fixed inset-0 pointer-events-none z-50 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          animation: 'grain 0.5s steps(10) infinite',
        }}
      />

      {/* Scanlines */}
      <div
        className="fixed inset-0 pointer-events-none z-50 opacity-5"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
        }}
      />

      <style>{`
        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -10%); }
          20% { transform: translate(-15%, 5%); }
          30% { transform: translate(7%, -25%); }
          40% { transform: translate(-5%, 25%); }
          50% { transform: translate(-15%, 10%); }
          60% { transform: translate(15%, 0%); }
          70% { transform: translate(0%, 15%); }
          80% { transform: translate(3%, 35%); }
          90% { transform: translate(-10%, 10%); }
        }
      `}</style>
    </>
  );
};
