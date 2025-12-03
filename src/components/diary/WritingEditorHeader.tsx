/**
 * WritingEditorHeader Component
 * Header bar for the writing editor
 */

import React from 'react';
import { motion } from 'framer-motion';
import { AutoSaveIndicator } from './AutoSaveIndicator';

interface WritingEditorHeaderProps {
  autoSaveStatus: 'idle' | 'saving' | 'saved' | 'error';
  lastSaved?: Date;
  isSaving: boolean;
  hasContent: boolean;
  onCancel: () => void;
  onSave: () => void;
  onFocusMode: () => void;
}

export const WritingEditorHeader: React.FC<WritingEditorHeaderProps> = ({
  autoSaveStatus,
  lastSaved,
  isSaving,
  hasContent,
  onCancel,
  onSave,
  onFocusMode,
}) => {
  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onCancel();
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!hasContent || isSaving) return;
    onSave();
  };

  const handleFocusMode = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onFocusMode();
  };

  return (
    <header className="sticky top-0 z-30 bg-zinc-950/95 backdrop-blur-sm border-b border-zinc-900/40">
      <div className="mx-auto max-w-5xl px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handleCancel}
            className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
          >
            <span>←</span>
            <span className="font-serif">Back to Boudoir</span>
          </button>

          <div className="flex items-center gap-6">
            <AutoSaveIndicator status={autoSaveStatus} lastSaved={lastSaved} />
            
            <div className="h-4 w-px bg-zinc-800" />
            
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleFocusMode}
              className="px-3 py-1.5 text-xs font-serif text-zinc-400 hover:text-zinc-300 
                       border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors cursor-pointer"
              title="Enter focus mode (distraction-free)"
            >
              Focus Mode
            </motion.button>
            
            <div className="h-4 w-px bg-zinc-800" />
            
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCancel}
              className="px-4 py-2 text-sm font-serif text-zinc-400 hover:text-zinc-300 transition-colors cursor-pointer"
            >
              Cancel
            </motion.button>
            
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSave}
              disabled={!hasContent || isSaving}
              className="px-6 py-2 rounded-lg text-sm font-serif
                       bg-[#6a0000] text-zinc-100 border border-[#8B0000]
                       hover:bg-[#8B0000] transition-colors cursor-pointer
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Saving...' : 'Save Entry'}
            </motion.button>
          </div>
        </div>
      </div>
    </header>
  );
};
