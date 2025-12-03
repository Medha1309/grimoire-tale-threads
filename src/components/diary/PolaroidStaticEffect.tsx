/**
 * PolaroidStaticEffect Component
 * TV static interference effect on hover
 */

import React, { useRef, useEffect } from 'react';

interface PolaroidStaticEffectProps {
  isHovered: boolean;
  intensity?: number;
}

export const PolaroidStaticEffect: React.FC<PolaroidStaticEffectProps> = ({ 
  isHovered, 
  intensity = 0.15 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!isHovered || !canvasRef.current) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const drawStatic = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255;
        data[i] = value;     // R
        data[i + 1] = value; // G
        data[i + 2] = value; // B
        data[i + 3] = Math.random() < intensity ? 255 : 0; // A
      }

      ctx.putImageData(imageData, 0, 0);
      animationRef.current = requestAnimationFrame(drawStatic);
    };

    drawStatic();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHovered, intensity]);

  if (!isHovered) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30"
      style={{ imageRendering: 'pixelated' }}
    />
  );
};
