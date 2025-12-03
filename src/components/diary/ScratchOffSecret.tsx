/**
 * ScratchOffSecret Component
 * Interactive scratch-off effect to reveal hidden text
 */

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ScratchOffSecretProps {
  text: string;
  isRevealed: boolean;
  onReveal: () => void;
}

export const ScratchOffSecret: React.FC<ScratchOffSecretProps> = ({
  text,
  isRevealed,
  onReveal,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [scratchPercentage, setScratchPercentage] = useState(0);

  useEffect(() => {
    if (!canvasRef.current || isRevealed) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);

    // Draw scratch-off layer
    ctx.fillStyle = '#3a3a3a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add texture
    for (let i = 0; i < 100; i++) {
      ctx.fillStyle = `rgba(${Math.random() * 50 + 30}, ${Math.random() * 50 + 30}, ${Math.random() * 50 + 30}, 0.3)`;
      ctx.fillRect(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        2,
        2
      );
    }

    // Add "SCRATCH HERE" text
    ctx.fillStyle = 'rgba(255, 182, 217, 0.6)';
    ctx.font = '16px serif';
    ctx.textAlign = 'center';
    ctx.fillText('SCRATCH TO REVEAL', canvas.width / 4, canvas.height / 4);
  }, [isRevealed]);

  const scratch = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || isRevealed) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let x, y;

    if ('touches' in e) {
      x = (e.touches[0].clientX - rect.left) * 2;
      y = (e.touches[0].clientY - rect.top) * 2;
    } else {
      x = (e.clientX - rect.left) * 2;
      y = (e.clientY - rect.top) * 2;
    }

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, Math.PI * 2);
    ctx.fill();

    // Calculate scratch percentage
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparent = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparent++;
    }

    const percentage = (transparent / (pixels.length / 4)) * 100;
    setScratchPercentage(percentage);

    if (percentage > 50) {
      onReveal();
    }
  };

  if (isRevealed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative p-4 bg-black/30 backdrop-blur-sm rounded-lg 
                   border-2 border-[#ffb6d9]/30"
      >
        <p className="text-zinc-200 font-serif text-lg leading-relaxed text-center">
          {text}
        </p>
        <div className="absolute -top-2 -right-2 bg-[#ffb6d9] text-white 
                        text-xs px-2 py-1 rounded-full font-serif">
          Revealed
        </div>
      </motion.div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute inset-0 p-4 flex items-center justify-center">
        <p className="text-zinc-200 font-serif text-lg leading-relaxed text-center opacity-0">
          {text}
        </p>
      </div>
      <canvas
        ref={canvasRef}
        onMouseDown={() => setIsScratching(true)}
        onMouseUp={() => setIsScratching(false)}
        onMouseMove={(e) => isScratching && scratch(e)}
        onTouchStart={() => setIsScratching(true)}
        onTouchEnd={() => setIsScratching(false)}
        onTouchMove={(e) => scratch(e)}
        className="w-full h-32 cursor-pointer rounded-lg"
        style={{ touchAction: 'none' }}
      />
      {scratchPercentage > 0 && scratchPercentage < 50 && (
        <div className="mt-2 text-xs text-zinc-500 text-center font-serif">
          {Math.round(scratchPercentage)}% revealed...
        </div>
      )}
    </div>
  );
};
