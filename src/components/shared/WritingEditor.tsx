/**
 * WritingEditor Component
 * Reusable distraction-free writing interface for stories, diary entries, etc.
 */

import React from 'react';
import { motion } from 'framer-motion';

interface WritingEditorProps {
  // Content
  title: string;
  content: string;
  onTitleChange: (title: string) => void;
  onContentChange: (content: string) => void;

  // Metadata (optional)
  metadata?: React.ReactNode;

  // Actions
  onCancel: () => void;
  onSave: () => void | Promise<void>;
  
  // State
  isSaving?: boolean;
  error?: string | null;

  // Customization
  titlePlaceholder?: string;
  contentPlaceholder?: string;
  saveButtonText?: string;
  savingButtonText?: string;
  pageTitle?: string;

  // Tips (optional)
  showTips?: boolean;
  tips?: string[];

  // Validation
  minContentLength?: number;
}

// Flickering Lantern Component
const FlickeringLantern: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    className="flex-shrink-0"
    animate={{
      opacity: [1, 0.7, 1, 0.8, 1],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  >
    {/* Lantern body */}
    <path
      d="M12 6 L20 6 L22 10 L22 22 L10 22 L10 10 Z"
      fill="#2a2420"
      stroke="#8B7355"
      strokeWidth="0.5"
    />
    {/* Top cap */}
    <rect x="11" y="4" width="10" height="2" fill="#8B7355" />
    {/* Handle */}
    <path d="M12 4 Q16 0 20 4" fill="none" stroke="#8B7355" strokeWidth="0.5" />
    {/* Glass panels */}
    <rect x="11" y="10" width="4" height="10" fill="#1a1410" opacity="0.3" />
    <rect x="17" y="10" width="4" height="10" fill="#1a1410" opacity="0.3" />
    {/* Flame - animated */}
    <motion.g
      animate={{
        y: [0, -1, 0, -0.5, 0],
        scaleY: [1, 1.1, 1, 1.05, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <ellipse cx="16" cy="16" rx="3" ry="5" fill="#ff6b00" opacity="0.8" />
      <ellipse cx="16" cy="16" rx="2" ry="4" fill="#ffaa00" opacity="0.9" />
      <ellipse cx="16" cy="16" rx="1" ry="2.5" fill="#ffdd00" />
    </motion.g>
    {/* Glow */}
    <motion.circle
      cx="16"
      cy="16"
      r="8"
      fill="#ff6b00"
      opacity="0.1"
      animate={{
        opacity: [0.1, 0.2, 0.1, 0.15, 0.1],
        scale: [1, 1.1, 1, 1.05, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
    {/* Bottom */}
    <rect x="11" y="22" width="10" height="2" fill="#8B7355" />
  </motion.svg>
);

export const WritingEditor: React.FC<WritingEditorProps> = ({
  title,
  content,
  onTitleChange,
  onContentChange,
  metadata,
  onCancel,
  onSave,
  isSaving = false,
  error = null,
  titlePlaceholder = 'Untitled',
  contentPlaceholder = 'Begin your tale... The cursor blinks, waiting for your words to breathe life into the darkness.',
  saveButtonText = 'Publish',
  savingButtonText = 'Publishing...',
  pageTitle,
  showTips = true,
  tips = [
    'Start with a hook that grabs attention in the first paragraph',
    'Show, don\'t tell - use vivid descriptions and sensory details',
    'Build tension gradually and create atmosphere',
    'End chapters on cliffhangers to keep readers engaged',
  ],
  minContentLength = 50,
}) => {
  const wordCount = content.trim().split(/\s+/).filter((w) => w).length;
  const charCount = content.length;

  return (
    <section className="relative min-h-screen bg-zinc-950 text-zinc-100">
      {/* Subtle parchment texture background */}
      <div
        className="fixed inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.9" /></filter><rect width="100%" height="100%" filter="url(%23noise)"/></svg>')`,
        }}
      />

      <div className="relative">
        {/* Sticky header with actions */}
        <header className="sticky top-0 z-30 bg-zinc-950/95 backdrop-blur-sm border-b border-zinc-900/40">
          <div className="mx-auto max-w-5xl px-6 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={onCancel}
                className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
              >
                <span>←</span>
                <span className="font-serif">{pageTitle || 'Back'}</span>
              </button>

              {/* Word count & status */}
              <div className="flex items-center gap-6">
                <div className="text-xs text-zinc-600 font-mono">{wordCount} words</div>
                <div className="h-4 w-px bg-zinc-800" />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onCancel}
                  className="px-4 py-2 text-sm font-serif text-zinc-400 hover:text-zinc-300 transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onSave}
                  disabled={!title.trim() || !content.trim() || isSaving}
                  className="px-6 py-2 rounded-lg text-sm font-serif
                           bg-[#6a0000] text-zinc-100 border border-[#8B0000]
                           hover:bg-[#8B0000] transition-colors
                           disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? savingButtonText : saveButtonText}
                </motion.button>
              </div>
            </div>
          </div>
        </header>

        {/* Main writing area */}
        <div className="mx-auto max-w-5xl px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Title input - large and prominent */}
            <div>
              <input
                type="text"
                value={title}
                onChange={(e) => onTitleChange(e.target.value)}
                placeholder={titlePlaceholder}
                className="w-full px-0 py-3 bg-transparent border-none
                         text-4xl md:text-5xl font-serif text-zinc-200 placeholder-zinc-700
                         focus:outline-none focus:ring-0"
                autoFocus
              />
            </div>

            {/* Metadata row (genre, tags, etc.) */}
            {metadata && (
              <div className="flex items-center gap-6 pb-6 border-b border-zinc-900/40">
                {metadata}
                {/* Character count */}
                <div className="text-xs text-zinc-600 font-mono ml-auto">
                  {charCount.toLocaleString()} characters
                </div>
              </div>
            )}

            {/* Writing tips - collapsible */}
            {showTips && tips.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="rounded-lg border border-zinc-900/60 bg-zinc-900/30 p-4"
              >
                <div className="flex items-start gap-3">
                  <FlickeringLantern size={32} />
                  <div className="flex-1">
                    <h3 className="text-sm font-serif text-zinc-400 mb-2">Writing Tips</h3>
                    <ul className="text-xs text-zinc-600 space-y-1 font-serif">
                      {tips.map((tip, index) => (
                        <li key={index}>• {tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Main content editor - distraction-free */}
            <div className="relative">
              <textarea
                value={content}
                onChange={(e) => onContentChange(e.target.value)}
                placeholder={contentPlaceholder}
                className="w-full min-h-[600px] px-0 py-4 bg-transparent border-none
                         text-lg leading-relaxed font-serif text-zinc-300 placeholder-zinc-700
                         focus:outline-none focus:ring-0 resize-none"
                style={{
                  lineHeight: '1.8',
                  letterSpacing: '0.01em',
                }}
              />

              {/* Subtle line numbers */}
              {content && (
                <div className="absolute top-4 -left-12 text-xs text-zinc-800 font-mono space-y-[1.8em]">
                  {content.split('\n').map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>
              )}
            </div>

            {/* Error message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg border border-red-800/40 bg-red-900/10 p-4"
              >
                <div className="flex items-start gap-3">
                  <span className="text-red-400">⚠️</span>
                  <p className="text-red-300 text-sm font-serif">{error}</p>
                </div>
              </motion.div>
            )}

            {/* Bottom spacer for comfortable writing */}
            <div className="h-64" />
          </motion.div>
        </div>

        {/* Floating save reminder */}
        {content.length > minContentLength && !isSaving && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-8 right-8 px-4 py-3 rounded-lg
                     bg-zinc-900/90 backdrop-blur-sm border border-zinc-800
                     shadow-xl flex items-center gap-3"
          >
            <FlickeringLantern size={20} />
            <span className="text-xs text-zinc-500 font-serif">
              Remember to {saveButtonText.toLowerCase()} your work when ready
            </span>
          </motion.div>
        )}
      </div>
    </section>
  );
};
