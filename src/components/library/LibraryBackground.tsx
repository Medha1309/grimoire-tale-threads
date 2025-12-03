/**
 * LibraryBackground Component
 * Atmospheric bookshelf effects (blood, dust, scratches)
 */

import React from 'react';

const SHELF_STYLE = {
  background: "linear-gradient(to bottom, #2a1810 0%, #1a0f08 50%, #2a1810 100%)",
  backgroundImage: `
    linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.3) 50%, transparent 100%),
    repeating-linear-gradient(90deg, #3a2820 0px, #2a1810 2px, #3a2820 4px),
    url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" /></filter><rect width="100%" height="100%" filter="url(%23noise)" opacity="0.3"/></svg>')
  `,
  boxShadow: "inset 0 0 100px rgba(0,0,0,0.8)",
};

const BloodSplatter: React.FC<{ index: number }> = React.memo(({ index: _index }) => (
  <div
    className="absolute rounded-full blur-sm"
    style={{
      background: "radial-gradient(circle, #4a0000 0%, #2a0000 50%, transparent 70%)",
      width: `${20 + Math.random() * 60}px`,
      height: `${20 + Math.random() * 60}px`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      opacity: 0.3 + Math.random() * 0.3,
    }}
  />
));

const DustParticle: React.FC<{ index: number }> = React.memo(({ index }) => {
  const style = React.useMemo(() => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 2}s`,
    animationDuration: `${3 + Math.random() * 2}s`,
  }), [index]);

  return (
    <div
      className="absolute w-1 h-1 bg-zinc-600 rounded-full opacity-20 animate-pulse"
      style={style}
    />
  );
});

const ScratchMark: React.FC<{ index: number }> = React.memo(({ index: _index }) => (
  <div
    className="absolute h-px bg-zinc-700"
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      width: `${50 + Math.random() * 100}px`,
      transform: `rotate(${Math.random() * 180}deg)`,
    }}
  />
));

export const LibraryBackground: React.FC = React.memo(() => {
  const bloodSplatters = React.useMemo(() => Array.from({ length: 2 }, (_, i) => i), []);
  const dustParticles = React.useMemo(() => Array.from({ length: 3 }, (_, i) => i), []);
  const scratchMarks = React.useMemo(() => Array.from({ length: 2 }, (_, i) => i), []);

  return (
    <>
      {/* Shelf texture */}
      <div className="absolute inset-0 -z-10 rounded-lg opacity-40" style={SHELF_STYLE} />
      
      {/* Blood splatters */}
      {bloodSplatters.map((i) => <BloodSplatter key={`blood-${i}`} index={i} />)}
      
      {/* Dust particles - reduced count */}
      {dustParticles.map((i) => <DustParticle key={`dust-${i}`} index={i} />)}
      
      {/* Scratch marks */}
      <div className="absolute inset-0 opacity-20">
        {scratchMarks.map((i) => <ScratchMark key={`scratch-${i}`} index={i} />)}
      </div>
    </>
  );
});
