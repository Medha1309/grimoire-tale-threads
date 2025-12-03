/**
 * Investigation Photo Element
 * Draggable photo with thumbtack, evidence tag, and filters
 */

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { PhotoElement } from '../../../types/investigationScrapbook';

interface InvestigationPhotoElementProps {
  element: PhotoElement;
  isSelected: boolean;
  zoom: number;
  onUpdate: (updates: Partial<PhotoElement>) => void;
  onSelect: (addToSelection: boolean) => void;
}

export const InvestigationPhotoElement: React.FC<InvestigationPhotoElementProps> = ({
  element,
  isSelected,
  onUpdate,
  onSelect,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const elementRef = useRef<HTMLDivElement>(null);

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

  const handleMouseUp = () => {
    setIsDragging(false);
  };

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

  const getFilterStyle = () => {
    switch (element.filter) {
      case 'sepia':
        return { filter: 'sepia(0.8) contrast(1.1)' };
      case 'desaturated':
        return { filter: 'saturate(0.3) brightness(0.9) hue-rotate(200deg)' };
      case 'vintage':
        return { filter: 'sepia(0.4) contrast(0.9) brightness(1.1)' };
      case 'horror':
        return { filter: 'saturate(1.5) contrast(1.3) brightness(0.7) hue-rotate(340deg)' };
      case 'vhs':
        return { filter: 'contrast(1.2) saturate(1.3) brightness(0.9)' };
      default:
        return {};
    }
  };

  return (
    <motion.div
      ref={elementRef}
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
      animate={{
        scale: isSelected ? 1.05 : 1,
      }}
    >
      {/* Thumbtack */}
      {element.hasThumbTack && (
        <motion.div
          className="absolute -top-4 left-1/2 -translate-x-1/2 z-10"
          animate={{
            y: [0, -2, 0],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="relative">
            {/* Thumbtack head */}
            <div
              className="w-4 h-4 rounded-full shadow-lg"
              style={{
                background: element.thumbTackColor,
                boxShadow: `0 2px 8px ${element.thumbTackColor}80`,
              }}
            />
            {/* Thumbtack pin */}
            <div
              className="absolute top-3 left-1/2 -translate-x-1/2 w-0.5 h-3"
              style={{
                background: 'linear-gradient(to bottom, #888, #444)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.5)',
              }}
            />
          </div>
        </motion.div>
      )}

      {/* Photo Container */}
      <div className="relative w-full h-full">
        {/* Polaroid Frame */}
        <div className="w-full h-full bg-white p-3 pb-12 shadow-2xl">
          {/* Photo */}
          <div className="w-full h-full bg-black overflow-hidden relative">
            <img
              src={element.imageUrl}
              alt="Evidence"
              className="w-full h-full object-cover"
              style={getFilterStyle()}
              draggable={false}
            />

            {/* VHS Scanlines for GIF-like effect */}
            {element.filter === 'vhs' && (
              <div className="absolute inset-0 pointer-events-none">
                <motion.div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, transparent 2px, transparent 4px)',
                  }}
                  animate={{
                    y: [0, 4, 0],
                  }}
                  transition={{ duration: 0.1, repeat: Infinity }}
                />
              </div>
            )}

            {/* Timestamp (if has timestamp) */}
            {element.timestamp && (
              <div className="absolute top-2 left-2 bg-black/80 px-2 py-1 font-mono text-xs text-red-500">
                {new Date(element.timestamp).toLocaleString()}
              </div>
            )}
          </div>

          {/* Caption */}
          {element.caption && (
            <div className="absolute bottom-2 left-3 right-3 text-center">
              <p className="text-xs text-zinc-800 font-handwriting">
                {element.caption}
              </p>
            </div>
          )}
        </div>

        {/* Evidence Tag */}
        {element.evidenceTag && (
          <motion.div
            className="absolute -bottom-2 -right-2 bg-red-600 text-white px-3 py-1 
                       text-xs font-bold uppercase tracking-wider shadow-lg
                       border-2 border-white"
            style={{
              transform: 'rotate(5deg)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
            }}
            animate={{
              rotate: [5, 7, 5],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {element.evidenceTag}
          </motion.div>
        )}

        {/* Selection Border */}
        {isSelected && (
          <motion.div
            className="absolute inset-0 border-4 border-[#ff1493] rounded-sm pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              boxShadow: '0 0 20px rgba(255,20,147,0.6)',
            }}
          />
        )}

        {/* Locked Indicator */}
        {element.locked && (
          <div className="absolute top-2 right-2 bg-black/80 p-1 rounded">
            <span className="text-xs">🔒</span>
          </div>
        )}
      </div>

      {/* Shadow */}
      <div
        className="absolute inset-0 bg-black/40 blur-xl -z-10"
        style={{
          transform: 'translate(8px, 8px)',
        }}
      />
    </motion.div>
  );
};
