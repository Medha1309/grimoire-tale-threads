/**
 * Quote Selection Popup
 * Appears when user selects text in the reader
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../shared/Button';

interface QuoteSelectionPopupProps {
  selectedText: string;
  position: { x: number; y: number };
  onSave: (notes?: string) => void;
  onCancel: () => void;
}

export const QuoteSelectionPopup: React.FC<QuoteSelectionPopupProps> = ({
  selectedText,
  position,
  onSave,
  onCancel,
}) => {
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState('');

  // Reset when selection changes
  useEffect(() => {
    setShowNotes(false);
    setNotes('');
  }, [selectedText]);

  const handleQuickSave = () => {
    onSave();
  };

  const handleSaveWithNotes = () => {
    onSave(notes);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 10 }}
        transition={{ duration: 0.2 }}
        className="fixed z-50"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -100%)',
          marginTop: '-12px',
        }}
      >
        <div
          className="relative bg-zinc-900/95 backdrop-blur-sm border border-[#ffb6d9]/40 
                     rounded-lg shadow-2xl overflow-hidden"
          style={{
            boxShadow: '0 8px 32px rgba(255, 182, 217, 0.2)',
          }}
        >
          {!showNotes ? (
            <div className="p-4 space-y-3">
              {/* Preview */}
              <div className="max-w-xs">
                <p className="text-xs text-zinc-400 font-serif line-clamp-2 italic">
                  "{selectedText.substring(0, 100)}
                  {selectedText.length > 100 ? '...' : ''}"
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button
                  variant="primary"
                  onClick={handleQuickSave}
                  className="text-xs flex-1"
                >
                  Save Quote
                </Button>
                <button
                  onClick={() => setShowNotes(true)}
                  className="px-3 py-2 text-xs text-zinc-400 hover:text-[#ffb6d9] 
                           font-serif transition-colors duration-200"
                >
                  + Note
                </button>
                <button
                  onClick={onCancel}
                  className="px-3 py-2 text-xs text-zinc-600 hover:text-zinc-400 
                           font-serif transition-colors duration-200"
                >
                  ✕
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 space-y-3 w-80">
              {/* Quote preview */}
              <div className="pb-3 border-b border-zinc-800/60">
                <p className="text-xs text-zinc-500 font-serif line-clamp-2 italic">
                  "{selectedText.substring(0, 80)}
                  {selectedText.length > 80 ? '...' : ''}"
                </p>
              </div>

              {/* Notes input */}
              <div>
                <label className="block text-xs text-zinc-500 font-serif mb-2">
                  Add your thoughts
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Why does this passage resonate with you?"
                  className="w-full px-3 py-2 bg-zinc-950/60 border border-zinc-800/60 rounded
                           text-zinc-300 font-serif text-sm placeholder-zinc-700
                           focus:outline-none focus:border-[#ffb6d9]/60 focus:ring-2 focus:ring-[#ffb6d9]/20
                           transition-all duration-200 resize-none"
                  rows={3}
                  autoFocus
                />
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button
                  variant="primary"
                  onClick={handleSaveWithNotes}
                  className="text-xs flex-1"
                >
                  Save with Note
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setShowNotes(false)}
                  className="text-xs"
                >
                  Back
                </Button>
              </div>
            </div>
          )}

          {/* Arrow pointer */}
          <div
            className="absolute left-1/2 bottom-0 w-3 h-3 bg-zinc-900/95 border-r border-b 
                       border-[#ffb6d9]/40 transform rotate-45 translate-y-1/2 -translate-x-1/2"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
