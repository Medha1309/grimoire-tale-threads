/**
 * Parallax Mouse Effect - Polaroids subtly follow cursor after sequence
 * Creates unsettling "watching" feeling
 */

import React, { useEffect, useState } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

export const useParallaxMouse = (intensity: number = 0.02) => {
  const [mousePos, setMousePos] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * intensity;
      const y = (e.clientY / window.innerHeight - 0.5) * intensity;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [intensity]);

  return mousePos;
};

interface ParallaxLayerProps {
  children: React.ReactNode;
  intensity?: number;
  className?: string;
}

export const ParallaxLayer: React.FC<ParallaxLayerProps> = ({ 
  children, 
  intensity = 1,
  className = '',
}) => {
  const mousePos = useParallaxMouse(20 * intensity);

  return (
    <div
      className={className}
      style={{
        transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
        transition: 'transform 0.3s ease-out',
      }}
    >
      {children}
    </div>
  );
};
