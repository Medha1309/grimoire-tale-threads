/**
 * PinkMatrixRainBackground Component
 * Matrix rain effect with pink theme for Archive room
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export const PinkMatrixRainBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [glitchText, setGlitchText] = useState('');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    // Matrix characters
    const chars = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    const archiveMessages = [
      'READING HISTORY',
      'MEMORIES STORED',
      'STORIES ARCHIVED',
      'DATA PRESERVED',
      'NEVER FORGET',
      'REMEMBER'
    ];

    let messageTimer = 0;

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Pink Matrix rain instead of green
        if (Math.random() > 0.975) {
          ctx.fillStyle = '#FFF'; // Bright highlights
        } else {
          ctx.fillStyle = '#ffb6d9'; // Pink!
        }

        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }

      messageTimer++;
      if (messageTimer > 200 && Math.random() > 0.99) {
        const message = archiveMessages[Math.floor(Math.random() * archiveMessages.length)];
        setGlitchText(message);
        setTimeout(() => setGlitchText(''), 1500);
        messageTimer = 0;
      }
    };

    const interval = setInterval(draw, 33);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {glitchText && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
        >
          <motion.h1
            animate={{
              x: [0, -2, 2, -2, 2, 0],
              textShadow: [
                '0 0 10px #ffb6d9',
                '2px 0 10px #ff69b4, -2px 0 10px #ff8fc7',
                '0 0 10px #ffb6d9',
              ],
            }}
            transition={{ duration: 0.2, repeat: 2 }}
            className="text-4xl font-mono font-bold text-[#ffb6d9]"
            style={{
              textShadow: '0 0 20px #ffb6d9',
            }}
          >
            {glitchText}
          </motion.h1>
        </motion.div>
      )}

      {/* Pink scanlines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 182, 217, 0.1) 2px, rgba(255, 182, 217, 0.1) 4px)',
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, transparent 0%, rgba(0, 0, 0, 0.7) 100%)',
        }}
      />
    </>
  );
};
