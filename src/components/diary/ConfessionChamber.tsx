/**
 * Confession Chamber - Right Panel
 * Active editor with unstable ink, mood selector, lock encryption, and commit sequence
 */

import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, AlertCircle } from 'lucide-react';

type Mood = 'joy' | 'sorrow' | 'calm' | 'unrest';

interface ConfessionChamberProps {
  content: string;
  selectedMood: Mood;
  isLocked: boolean;
  isTyping: boolean;
  isCommitting: boolean;
  showSuccess: boolean;
  isEditMode: boolean;
  onContentChange: (content: string) => void;
  onMoodChange: (mood: Mood) => void;
  onLockToggle: (locked: boolean) => void;
  onCommit: () => void;
  onAbandon: () => void;
}

export const ConfessionChamber: React.FC<ConfessionChamberProps> = ({
  content,
  selectedMood,
  isLocked,
  isTyping,
  isCommitting,
  showSuccess,
  isEditMode,
  onContentChange,
  onMoodChange,
  onLockToggle,
  onCommit,
  onAbandon,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [content]);

  // Word and character count
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const charCount = content.length;

  // Mood configurations
  const moodConfig: Record<Mood, { icon: string; label: string; color: string }> = {
    joy: { icon: '✧', label: 'Joy', color: 'text-yellow-400' },
    sorrow: { icon: '💧', label: 'Sorrow', color: 'text-blue-400' },
    calm: { icon: '◯', label: 'Calm', color: 'text-green-400' },
    unrest: { icon: '⚡', label: 'Unrest', color: 'text-red-400' },
  };

  // Cipher text transformation for lock preview
  const getCipherPreview = (): string => {
    if (!content) return '';
    const lines = content.split('\n').slice(0, 10);
    return lines.map(line => {
      return '█'.repeat(Math.min(line.length, 60));
    }).join('\n');
  };

  return (
    <motion.div
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="flex-1 flex flex-col bg-black relative overflow-hidden"
    >
      {/* Commit Success Overlay */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              className="text-center"
            >
              <div className="text-cyan-400 text-2xl font-mono mb-2">
                ENTRY SEALED
              </div>
              <div className="text-zinc-600 text-sm font-mono">
                Memory committed to archive
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Commit Fade Overlay */}
      <AnimatePresence>
        {isCommitting && !showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black z-40"
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="p-6 border-b border-zinc-800/50 bg-zinc-950/50">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-mono text-cyan-400 mb-1 tracking-wider">
              {isEditMode ? 'EDIT MODE' : 'CONFESSION CHAMBER'}
            </h2>
            <p className="text-xs text-zinc-500 font-mono">
              {isEditMode ? 'Modify existing entry' : 'Dedicated interface for creating and sealing new entries'}
            </p>
          </div>
          {isEditMode && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-3 py-1 bg-cyan-950/30 border border-cyan-800/50 rounded text-xs font-mono text-cyan-400"
            >
              EDITING
            </motion.div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Writing Area */}
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => onContentChange(e.target.value)}
              placeholder="Begin your confession..."
              className={`w-full min-h-[400px] bg-zinc-950/50 border border-zinc-800/50 rounded-lg p-6 text-zinc-100 placeholder-zinc-700 focus:outline-none focus:border-cyan-800/50 transition-all resize-none font-mono text-base leading-relaxed ${
                isTyping ? 'unstable-ink' : ''
              }`}
              style={{
                textShadow: isTyping ? '0.5px 0 0 rgba(255, 0, 0, 0.3), -0.5px 0 0 rgba(0, 255, 255, 0.3)' : 'none',
              }}
            />

            {/* Integrated Status Bar */}
            <div className="absolute bottom-3 right-3 flex items-center gap-4 text-xs font-mono text-zinc-600 bg-black/50 px-3 py-1.5 rounded backdrop-blur-sm">
              <span>{wordCount} words</span>
              <span className="text-zinc-800">|</span>
              <span>{charCount} characters</span>
            </div>

            {/* Mood Icon Indicator */}
            <AnimatePresence>
              {selectedMood && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute top-3 right-3 text-2xl"
                >
                  <span className={moodConfig[selectedMood].color}>
                    {moodConfig[selectedMood].icon}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mood Selector - Radio Buttons */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider text-zinc-500 font-mono flex items-center gap-2">
              <span>Binding Sigil</span>
              <span className="text-cyan-600">●</span>
            </h3>
            <div className="grid grid-cols-4 gap-3">
              {(Object.keys(moodConfig) as Mood[]).map((mood) => (
                <motion.button
                  key={mood}
                  onClick={() => onMoodChange(mood)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative p-4 rounded-lg border transition-all ${
                    selectedMood === mood
                      ? 'bg-cyan-950/30 border-cyan-800/50 shadow-lg shadow-cyan-500/10'
                      : 'bg-zinc-900/30 border-zinc-800/50 hover:border-zinc-700/50'
                  }`}
                >
                  {/* Radio indicator */}
                  <div className="absolute top-2 right-2">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      selectedMood === mood
                        ? 'border-cyan-400'
                        : 'border-zinc-700'
                    }`}>
                      {selectedMood === mood && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2 h-2 rounded-full bg-cyan-400"
                        />
                      )}
                    </div>
                  </div>

                  <div className="text-center">
                    <div className={`text-2xl mb-2 ${moodConfig[mood].color}`}>
                      {moodConfig[mood].icon}
                    </div>
                    <div className={`text-sm font-mono ${
                      selectedMood === mood ? 'text-cyan-300' : 'text-zinc-500'
                    }`}>
                      {moodConfig[mood].label}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Security Lock */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider text-zinc-500 font-mono flex items-center gap-2">
              <span>Security Protocol</span>
              <span className="text-red-600">●</span>
            </h3>
            <motion.button
              onClick={() => onLockToggle(!isLocked)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`w-full p-4 rounded-lg border transition-all ${
                isLocked
                  ? 'bg-red-950/30 border-red-800/50'
                  : 'bg-zinc-900/30 border-zinc-800/50 hover:border-zinc-700/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {isLocked ? (
                    <Lock className="w-5 h-5 text-red-400" />
                  ) : (
                    <Unlock className="w-5 h-5 text-zinc-500" />
                  )}
                  <div className="text-left">
                    <div className={`text-sm font-mono ${
                      isLocked ? 'text-red-300' : 'text-zinc-400'
                    }`}>
                      {isLocked ? 'ENCRYPTED' : 'UNENCRYPTED'}
                    </div>
                    <div className="text-xs text-zinc-600 font-mono">
                      {isLocked ? 'Content will be ciphered' : 'Content stored as plain text'}
                    </div>
                  </div>
                </div>
                <div className={`text-xs font-mono px-3 py-1 rounded ${
                  isLocked ? 'bg-red-900/30 text-red-400' : 'bg-zinc-800/30 text-zinc-600'
                }`}>
                  {isLocked ? 'ON' : 'OFF'}
                </div>
              </div>
            </motion.button>

            {/* Cipher Preview */}
            <AnimatePresence>
              {isLocked && content && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 bg-red-950/10 border border-red-900/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span className="text-xs font-mono text-red-400">CIPHER PREVIEW</span>
                    </div>
                    <pre className="text-xs font-mono text-red-500/50 whitespace-pre-wrap break-all">
                      {getCipherPreview()}
                    </pre>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="p-6 border-t border-zinc-800/50 bg-zinc-950/50">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          {/* Abandon Button - Low Contrast */}
          <motion.button
            onClick={onAbandon}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 text-sm font-mono text-zinc-700 hover:text-zinc-500 transition-colors"
          >
            Abandon
          </motion.button>

          {/* Commit & Seal Button - High Impact */}
          <motion.button
            onClick={onCommit}
            disabled={!content.trim() || isCommitting}
            whileHover={content.trim() ? { scale: 1.02 } : {}}
            whileTap={content.trim() ? { scale: 0.98 } : {}}
            className={`px-8 py-3 rounded-lg font-mono text-sm tracking-wider transition-all ${
              content.trim()
                ? 'bg-cyan-600 hover:bg-cyan-500 text-black shadow-lg shadow-cyan-500/30'
                : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
            }`}
          >
            {isCommitting ? (isEditMode ? 'UPDATING...' : 'COMMITTING...') : (isEditMode ? 'UPDATE & SEAL' : 'COMMIT & SEAL')}
          </motion.button>
        </div>
      </div>

      <style>{`
        /* Unstable Ink Effect - Chromatic Aberration */
        @keyframes unstable-ink {
          0%, 100% {
            text-shadow: 0.5px 0 0 rgba(255, 0, 0, 0.3), -0.5px 0 0 rgba(0, 255, 255, 0.3);
          }
          50% {
            text-shadow: -0.5px 0 0 rgba(255, 0, 0, 0.3), 0.5px 0 0 rgba(0, 255, 255, 0.3);
          }
        }

        .unstable-ink {
          animation: unstable-ink 0.1s infinite;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(34, 211, 238, 0.2);
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 211, 238, 0.4);
        }
      `}</style>
    </motion.div>
  );
};
