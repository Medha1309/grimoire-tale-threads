/**
 * Diary Module - Floating Heart Easter Egg
 * Appears after 30 seconds of idle time
 */

import React, { useEffect, useState } from 'react';

interface FloatingHeartProps {
  show: boolean;
}

export const FloatingHeart: React.FC<FloatingHeartProps> = ({ show }) => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [velocity, setVelocity] = useState({ x: 2, y: 2 });

  useEffect(() => {
    if (!show) return;

    const interval = setInterval(() => {
      setPosition((prev) => {
        let newX = prev.x + velocity.x;
        let newY = prev.y + velocity.y;
        let newVelX = velocity.x;
        let newVelY = velocity.y;

        // Bounce off edges
        if (newX <= 0 || newX >= 95) {
          newVelX = -newVelX;
          newX = newX <= 0 ? 0 : 95;
        }
        if (newY <= 0 || newY >= 95) {
          newVelY = -newVelY;
          newY = newY <= 0 ? 0 : 95;
        }

        setVelocity({ x: newVelX, y: newVelY });
        return { x: newX, y: newY };
      });
    }, 50);

    return () => clearInterval(interval);
  }, [show, velocity]);

  if (!show) return null;

  return (
    <div
      className="fixed pointer-events-none z-50 text-4xl transition-all duration-100"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
        filter: 'drop-shadow(0 0 10px rgba(255, 182, 193, 0.8))',
      }}
    >
      💖
    </div>
  );
};
