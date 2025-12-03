import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface BoudoirAtmosphereProps {
  active?: boolean;
  position?: { x: number; y: number };
}

export const BoudoirAtmosphere: React.FC<BoudoirAtmosphereProps> = ({ 
  active = true, 
  position = { x: 0, y: 0 } 
}) => {
  if (!active) return null;

  return (
    <>
      {/* Main cursor glow */}
      <motion.div
        className="pointer-events-none fixed"
        animate={{
          left: position.x,
          top: position.y,
        }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 200,
          mass: 0.5,
        }}
        style={{
          width: '600px',
          height: '600px',
          marginLeft: '-300px',
          marginTop: '-300px',
        }}
      >
        {/* Outer glow */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 182, 217, 0.25) 0%, rgba(255, 182, 217, 0.15) 30%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        
        {/* Middle glow */}
        <div
          className="absolute inset-[15%] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 182, 217, 0.35) 0%, rgba(255, 182, 217, 0.2) 40%, transparent 70%)',
            filter: 'blur(30px)',
          }}
        />
        
        {/* Inner glow */}
        <div
          className="absolute inset-[30%] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 182, 217, 0.5) 0%, rgba(255, 182, 217, 0.3) 50%, transparent 70%)',
            filter: 'blur(20px)',
          }}
        />

        {/* Core light */}
        <div
          className="absolute inset-[45%] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 182, 217, 0.8) 0%, rgba(255, 182, 217, 0.4) 60%, transparent 100%)',
            filter: 'blur(10px)',
          }}
        />
      </motion.div>

      {/* Floating particles */}
      <FloatingParticles position={position} />
    </>
  );
};

const FloatingParticles: React.FC<{ position: { x: number; y: number } }> = ({ position }) => {
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    delay: i * 0.3,
    duration: 4 + (i % 3),
    offset: (i % 4) * 90,
  }));

  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="pointer-events-none fixed"
          animate={{
            left: position.x + Math.cos((particle.offset * Math.PI) / 180) * 100,
            top: position.y + Math.sin((particle.offset * Math.PI) / 180) * 100,
            opacity: [0.3, 0.6, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            left: { type: 'spring', damping: 20, stiffness: 100 },
            top: { type: 'spring', damping: 20, stiffness: 100 },
            opacity: { duration: particle.duration, repeat: Infinity, ease: 'easeInOut', delay: particle.delay },
            scale: { duration: particle.duration, repeat: Infinity, ease: 'easeInOut', delay: particle.delay },
          }}
          style={{
            width: '4px',
            height: '4px',
            marginLeft: '-2px',
            marginTop: '-2px',
          }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: 'rgba(255, 182, 217, 0.8)',
              boxShadow: '0 0 10px rgba(255, 182, 217, 0.8)',
            }}
          />
        </motion.div>
      ))}
    </>
  );
};

export const useBoudoirAtmosphere = () => {
  const [atmospherePos, setAtmospherePos] = useState({ x: 0, y: 0 });
  const [atmosphereActive, setAtmosphereActive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setAtmospherePos({ x: e.clientX, y: e.clientY });
      if (!atmosphereActive) {
        setAtmosphereActive(true);
      }
    };

    const handleMouseLeave = () => {
      setAtmosphereActive(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [atmosphereActive]);

  return { atmospherePos, atmosphereActive };
};
