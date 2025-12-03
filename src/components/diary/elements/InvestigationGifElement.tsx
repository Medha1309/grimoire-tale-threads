/**
 * Investigation GIF Element
 * Animated GIF with VHS/surveillance effects
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GifElement } from '../../../types/investigationScrapbook';

interface InvestigationGifElementProps {
  element: GifElement;
  isSelected: boolean;
  zoom: number;
  onUpdate: (updates: Partial<GifElement>) => void;
  onSelect: (addToSelection: boolean) => void;
}

export const InvestigationGifElement: React.FC<InvestigationGifElementProps> = ({
  element,
  isSelected,
  onUpdate,
  onSelect,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (element.locked) return;
    e.stopPropagation();
    onSelect(e.shiftKey);
    setIsDragging(true);
    setDragStart({
      x: e.clientX - (element.position.x * window.innerWidth / 100),
      y: e.clientY - (element.position.y * window.innerHeight / 100),
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || element.locked) return;
    const newX = ((e.clientX - dragStart.x) / window.innerWidth) * 100;
    const newY = ((e.clientY - dragStart.y) / window.innerHeight) * 100;
    onUpdate({
      position: {
        x: Math.max(0, Math.min(100, newX)),
        y: Math.max(0, Math.min(100, newY)),
      },
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${element.position.x}%`,
        top: `${element.position.y}%`,
        width: `${element.size.width}%`,
        height: `${element.size.height}%`,
        transform: `rotate(${element.rotation}deg)`,
        zIndex: element.zIndex,
        opacity: element.opacity,
        cursor: element.locked ? 'not-allowed' : isDragging ? 'grabbing' : 'grab',
      }}
      onMouseDown={handleMouseDown}
      whileHover={{ scale: element.locked ? 1 : 1.02 }}
    >
      <div className="relative w-full h-full bg-black border-4 border-zinc-800 shadow-2xl overflow-hidden">
        {/* GIF */}
        <img
          src={element.gifUrl}
          alt="Surveillance"
          className="w-full h-full object-cover"
          draggable={false}
        />

        {/* VHS Effect */}
        {element.hasVHSEffect && (
          <>
            {/* Scanlines */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, transparent 2px, transparent 4px)',
              }}
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 0.1, repeat: Infinity }}
            />
            
            {/* Static Noise */}
            <motion.div
              className="absolute inset-0 pointer-events-none opacity-10"
              style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")',
              }}
              animate={{ opacity: [0.05, 0.15, 0.05] }}
              transition={{ duration: 0.2, repeat: Infinity }}
            />

            {/* Tracking Lines */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{
                backgroundPosition: ['0% 0%', '0% 100%'],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              style={{
                backgroundImage: 'linear-gradient(transparent 50%, rgba(255,255,255,0.05) 50%)',
                backgroundSize: '100% 4px',
              }}
            />
          </>
        )}

        {/* Surveillance Label */}
        {element.surveillanceLabel && (
          <div className="absolute top-2 left-2 bg-red-600/90 px-2 py-1 font-mono text-xs text-white font-bold">
            {element.surveillanceLabel}
          </div>
        )}

        {/* Timestamp */}
        {element.hasTimestamp && (
          <motion.div
            className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 font-mono text-xs text-red-500"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            {new Date().toLocaleTimeString()}
          </motion.div>
        )}

        {/* REC Indicator */}
        <motion.div
          className="absolute top-2 right-2 flex items-center gap-1"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-2 h-2 rounded-full bg-red-600" />
          <span className="text-xs font-mono text-red-600 font-bold">REC</span>
        </motion.div>

        {/* Selection Border */}
        {isSelected && (
          <motion.div
            className="absolute inset-0 border-4 border-[#ff1493] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ boxShadow: '0 0 20px rgba(255,20,147,0.6)' }}
          />
        )}
      </div>
    </motion.div>
  );
};
