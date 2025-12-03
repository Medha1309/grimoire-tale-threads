/**
 * StickerPicker Component
 * Allows users to add decorative stickers to scrapbook entries
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { STICKER_LIBRARY, ScrapbookSticker } from '../../types/scrapbook';

interface StickerPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSticker: (sticker: Omit<ScrapbookSticker, 'id'>) => void;
}

export const StickerPicker: React.FC<StickerPickerProps> = ({
  isOpen,
  onClose,
  onAddSticker,
}) => {
  const handleStickerClick = (emoji: string, type: ScrapbookSticker['type']) => {
    onAddSticker({
      type,
      emoji,
      x: 50 + (Math.random() - 0.5) * 20, // Random position near center
      y: 50 + (Math.random() - 0.5) * 20,
      rotation: (Math.random() - 0.5) * 30,
      scale: 0.8 + Math.random() * 0.4,
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm"
      >
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl bg-gradient-to-br from-zinc-100 to-zinc-200 
                     rounded-t-3xl shadow-2xl border-t-4 border-[#ffb6d9] p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-2xl text-zinc-800">
              Add Stickers
            </h3>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-zinc-300 hover:bg-zinc-400 
                         text-zinc-700 transition-colors flex items-center justify-center"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-6 gap-3 max-h-64 overflow-y-auto">
            {STICKER_LIBRARY.map((sticker, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleStickerClick(sticker.emoji, sticker.type)}
                className="aspect-square rounded-lg bg-white border-2 border-zinc-300
                           hover:border-[#ffb6d9] transition-colors flex items-center 
                           justify-center text-3xl shadow-sm hover:shadow-md"
                title={sticker.label}
              >
                {sticker.emoji}
              </motion.button>
            ))}
          </div>

          <p className="mt-4 text-xs text-zinc-600 text-center font-serif">
            Tap a sticker to add it to your scrapbook
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
