/**
 * DragDropUpload Component
 * Drag & drop photo upload with camera shutter animation
 */

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DragDropUploadProps {
  onUpload: (files: File[]) => void;
  maxFiles: number;
  currentCount: number;
}

export const DragDropUpload: React.FC<DragDropUploadProps> = ({
  onUpload,
  maxFiles,
  currentCount,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [showShutter, setShowShutter] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files).filter(
      file => file.type.startsWith('image/')
    );
    
    if (files.length > 0) {
      setShowShutter(true);
      setTimeout(() => {
        onUpload(files);
        setShowShutter(false);
      }, 300);
    }
  }, [onUpload]);

  const remainingSlots = maxFiles - currentCount;

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative aspect-square rounded-lg border-2 border-dashed transition-all
        ${isDragging 
          ? 'border-[#ffb6d9]/70 bg-[#ffb6d9]/10 scale-105' 
          : 'border-zinc-700/50 bg-zinc-900/30'
        }
        hover:bg-zinc-800/30 hover:border-[#ffb6d9]/40
        flex flex-col items-center justify-center gap-4 group cursor-pointer`}
    >
      {/* Camera shutter animation */}
      <AnimatePresence>
        {showShutter && (
          <>
            {/* Top shutter blade */}
            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.15, ease: "easeInOut" }}
              className="absolute top-0 left-0 right-0 h-1/2 bg-black z-50"
            />
            {/* Bottom shutter blade */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.15, ease: "easeInOut" }}
              className="absolute bottom-0 left-0 right-0 h-1/2 bg-black z-50"
            />
            {/* Flash */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-white z-40"
            />
          </>
        )}
      </AnimatePresence>

      {/* Camera icon */}
      <motion.div
        animate={{
          scale: isDragging ? 1.2 : 1,
          rotate: isDragging ? [0, -5, 5, 0] : 0,
        }}
        transition={{ duration: 0.3 }}
        className="text-6xl text-zinc-600 group-hover:text-zinc-500 transition-colors"
      >
        📷
      </motion.div>

      {/* Text */}
      <div className="text-center">
        <p className="text-zinc-400 font-serif text-lg mb-1">
          {isDragging ? 'Drop to capture' : 'Drag photo here'}
        </p>
        <p className="text-zinc-600 font-serif text-sm">
          or click to browse
        </p>
        {remainingSlots < maxFiles && (
          <p className="text-zinc-700 font-serif text-xs mt-2">
            {remainingSlots} slot{remainingSlots !== 1 ? 's' : ''} remaining
          </p>
        )}
      </div>

      {/* Ghostly hints - moths and ink swirls */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl"
            style={{
              left: `${20 + i * 30}%`,
              top: `${20 + i * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 0.3, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.8,
            }}
          >
            {i % 2 === 0 ? '🦋' : '✨'}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
