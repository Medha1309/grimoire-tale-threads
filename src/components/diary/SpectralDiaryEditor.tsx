/**
 * Spectral Diary Editor - WOW Factor Writing Interface
 * A haunting, cinematic writing experience
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoodStickerPicker } from './MoodStickerPicker';
import { generateDiaryHeadline } from '../../utils/diaryHeadlineGenerator';

type Mood = 'joy' | 'sorrow' | 'calm' | 'unrest';

interface SpectralDiaryEditorProps {
  entryText: string;
  selectedMood: Mood;
  isLocked: boolean;
  isSaving: boolean;
  selectedStickers: string[];
  onContentChange: (content: string) => void;
  onMoodChange: (mood: Mood) => void;
  onLockToggle: (locked: boolean) => void;
  onStickerToggle: (id: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

const MOOD_THEMES = {
  joy: {
    glow: 'rgba(255, 215, 0, 0.3)',
    border: '#ffd700',
    shadow: '0 0 40px rgba(255, 215, 0, 0.2)',
    text: '#ffd700',
  },
  sorrow: {
    glow: 'rgba(147, 197, 253, 0.3)',
    border: '#93c5fd',
    shadow: '0 0 40px rgba(147, 197, 253, 0.2)',
    text: '#93c5fd',
  },
  calm: {
    glow: 'rgba(52, 211, 153, 0.3)',
    border: '#34d399',
    shadow: '0 0 40px rgba(52, 211, 153, 0.2)',
    text: '#34d399',
  },
  unrest: {
    glow: 'rgba(239, 68, 68, 0.3)',
    border: '#ef4444',
    shadow: '0 0 40px rgba(239, 68, 68, 0.2)',
    text: '#ef4444',
  },
};

export const SpectralDiaryEditor: React.FC<SpectralDiaryEditorProps> = ({
  entryText,
  selectedMood,
  isLocked,
  isSaving,
  selectedStickers,
  onContentChange,
  onMoodChange,
  onLockToggle,
  onStickerToggle,
  onSave,
  onCancel,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [showInkDrop, setShowInkDrop] = useState(false);
  const [inkDropPos, setInkDropPos] = useState({ x: 0, y: 0 });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const theme = MOOD_THEMES[selectedMood];

  // Update word/char count
  useEffect(() => {
    const words = entryText.trim().split(/\s+/).filter(w => w.length > 0);
    setWordCount(words.length);
    setCharCount(entryText.length);
  }, [entryText]);

  // Track cursor for spectral effects
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setCursorPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  }, []);

  // Ink drop effect on typing
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key.length === 1 && textareaRef.current) {
      const rect = textareaRef.current.getBoundingClientRect();
      setInkDropPos({
        x: rect.left + Math.random() * rect.width,
        y: rect.top + Math.random() * 100,
      });
      setShowInkDrop(true);
      setTimeout(() => setShowInkDrop(false), 800);
    }
  }, []);

  // Auto-generate headline preview
  const headlinePreview = entryText.length > 20 
    ? generateDiaryHeadline(entryText, selectedMood)
    : '';

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen bg-black overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Spectral Glow Following Cursor */}
      <motion.div
        className="fixed pointer-events-none rounded-full blur-3xl"
        style={{
          width: 300,
          height: 300,
          background: `radial-gradient(circle, ${theme.glow} 0%, transparent 70%)`,
          left: cursorPos.x - 150,
          top: cursorPos.y - 150,
        }}
        animate={{
          opacity: isFocused ? 0.6 : 0.3,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Ink Drop Effect */}
      <AnimatePresence>
        {showInkDrop && (
          <motion.div
            className="fixed pointer-events-none"
            style={{
              left: inkDropPos.x,
              top: inkDropPos.y,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div 
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: theme.border }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              backgroundColor: theme.border,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        {/* Header with Headline Preview */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <AnimatePresence mode="wait">
            {headlinePreview && (
              <motion.div
                key={headlinePreview}
                initial={{ opacity: 0, filter: 'blur(4px)', y: -10 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                exit={{ opacity: 0, filter: 'blur(4px)' }}
                transition={{ duration: 0.6 }}
                className="text-center mb-6"
              >
                <div className="text-xs font-serif text-zinc-500 uppercase tracking-widest mb-2">
                  Your Confession Whispers
                </div>
                <h2 
                  className="text-3xl font-serif italic"
                  style={{ 
                    color: theme.text,
                    textShadow: `0 0 20px ${theme.glow}`,
                  }}
                >
                  "{headlinePreview}"
                </h2>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mood Selector */}
          <div className="flex justify-center gap-3 mb-6">
            {(Object.keys(MOOD_THEMES) as Mood[]).map((mood) => {
              const isSelected = selectedMood === mood;
              const moodTheme = MOOD_THEMES[mood];
              
              return (
                <motion.button
                  key={mood}
                  onClick={() => onMoodChange(mood)}
                  className="relative px-6 py-3 rounded-lg font-serif font-medium capitalize transition-all"
                  style={{
                    backgroundColor: isSelected ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.4)',
                    border: `2px solid ${isSelected ? moodTheme.border : 'transparent'}`,
                    color: isSelected ? moodTheme.text : '#71717a',
                    boxShadow: isSelected ? moodTheme.shadow : 'none',
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isSelected && (
                    <motion.div
                      className="absolute inset-0 rounded-lg"
                      style={{
                        background: `radial-gradient(circle at center, ${moodTheme.glow} 0%, transparent 70%)`,
                      }}
                      animate={{
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                  )}
                  <span className="relative z-10">{mood}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Writing Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          {/* Breathing Border */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              border: `2px solid ${theme.border}`,
              boxShadow: theme.shadow,
            }}
            animate={{
              opacity: isFocused ? [0.6, 1, 0.6] : 0.4,
              scale: isFocused ? [1, 1.01, 1] : 1,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={entryText}
            onChange={(e) => onContentChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            placeholder="Pour your secrets into the void..."
            className="relative w-full h-96 px-8 py-6 bg-black/60 backdrop-blur-sm rounded-2xl
                     text-zinc-100 text-lg leading-relaxed font-serif
                     placeholder:text-zinc-600 placeholder:italic
                     focus:outline-none resize-none"
            style={{
              textShadow: `0 0 10px ${theme.glow}`,
            }}
          />

          {/* Vignette Effect */}
          <div 
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
            }}
          />
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-between mt-6 px-4"
        >
          <div className="flex gap-6 text-sm font-serif text-zinc-500">
            <span>{wordCount} words</span>
            <span>{charCount} characters</span>
            {isLocked && <span className="text-pink-400">🔒 Locked</span>}
          </div>

          <button
            onClick={() => onLockToggle(!isLocked)}
            className="text-sm font-serif text-zinc-400 hover:text-pink-400 transition-colors"
          >
            {isLocked ? 'Unlock Entry' : 'Lock Entry'}
          </button>
        </motion.div>

        {/* Sticker Picker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <MoodStickerPicker
            selectedStickers={selectedStickers}
            onToggleSticker={onStickerToggle}
          />
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-between mt-12"
        >
          <button
            onClick={onCancel}
            className="px-8 py-3 rounded-lg font-serif bg-zinc-900/50 border border-zinc-800
                     text-zinc-400 hover:text-zinc-300 hover:border-zinc-700
                     transition-all duration-300"
          >
            Abandon
          </button>

          <motion.button
            onClick={onSave}
            disabled={isSaving || entryText.trim().length === 0}
            className="relative px-12 py-4 rounded-lg font-serif font-medium text-lg
                     disabled:opacity-50 disabled:cursor-not-allowed
                     overflow-hidden group"
            style={{
              backgroundColor: 'rgba(0,0,0,0.8)',
              border: `2px solid ${theme.border}`,
              color: theme.text,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Animated Background */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(90deg, transparent, ${theme.glow}, transparent)`,
              }}
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            />

            <span className="relative z-10">
              {isSaving ? 'Sealing...' : 'Seal Confession'}
            </span>
          </motion.button>
        </motion.div>

        {/* Keyboard Hints */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center text-xs font-serif text-zinc-600 space-x-4"
        >
          <span><kbd className="px-2 py-1 bg-zinc-900 rounded font-serif">Ctrl+S</kbd> to save</span>
          <span><kbd className="px-2 py-1 bg-zinc-900 rounded font-serif">Esc</kbd> to abandon</span>
          <span><kbd className="px-2 py-1 bg-zinc-900 rounded font-serif">N</kbd> for noise mode</span>
        </motion.div>
      </div>

      <style>{`
        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        
        textarea::selection {
          background: ${theme.glow};
          color: white;
        }
      `}</style>
    </div>
  );
};
