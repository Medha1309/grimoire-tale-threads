/**
 * WritingEnhancements Component
 * Additional features for the diary writing experience
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { countWords, countCharacters, formatTime } from '../../utils/writingStats';

interface WritingEnhancementsProps {
  content: string;
  mood: 'joy' | 'sorrow' | 'calm' | 'unrest';
  onPromptSelect?: (prompt: string) => void;
}

// Mood-based writing prompts
const WRITING_PROMPTS = {
  joy: [
    "What made you smile today?",
    "Describe a moment of pure happiness...",
    "What are you grateful for right now?",
    "Write about someone who brings you joy",
  ],
  sorrow: [
    "What's weighing on your heart?",
    "Sometimes we need to let the tears flow...",
    "What would you tell your younger self?",
    "Write a letter to someone you miss",
  ],
  calm: [
    "Describe the peace you feel right now...",
    "What brings you tranquility?",
    "Write about a place where you feel at ease",
    "Reflect on a quiet moment today",
  ],
  unrest: [
    "What's keeping you awake at night?",
    "Let your anxieties spill onto the page...",
    "What would make you feel better?",
    "Write about what you're afraid of",
  ],
};

export const WritingEnhancements: React.FC<WritingEnhancementsProps> = ({
  content,
  mood,
  onPromptSelect,
}) => {
  const [writingTime, setWritingTime] = useState(0);
  const [showPrompts, setShowPrompts] = useState(false);

  // Calculate stats using memoization
  const wordCount = useMemo(() => countWords(content), [content]);
  const charCount = useMemo(() => countCharacters(content), [content]);
  const prompts = useMemo(() => WRITING_PROMPTS[mood], [mood]);

  // Track writing time
  useEffect(() => {
    const interval = setInterval(() => {
      setWritingTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      {/* Writing Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-6 text-xs text-zinc-500 font-mono"
      >
        <div className="flex items-center gap-2">
          <span className="text-zinc-600">Words:</span>
          <span className="text-zinc-400">{wordCount}</span>
        </div>
        <div className="h-3 w-px bg-zinc-800" />
        <div className="flex items-center gap-2">
          <span className="text-zinc-600">Characters:</span>
          <span className="text-zinc-400">{charCount}</span>
        </div>
        <div className="h-3 w-px bg-zinc-800" />
        <div className="flex items-center gap-2">
          <span className="text-zinc-600">Writing time:</span>
          <span className="text-zinc-400">{formatTime(writingTime)}</span>
        </div>
      </motion.div>

      {/* Writing Prompts Toggle */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setShowPrompts(!showPrompts)}
        className="flex items-center gap-2 text-xs text-zinc-500 hover:text-[#ffb6d9] transition-colors"
      >
        <span>{showPrompts ? '▼' : '▶'}</span>
        <span className="font-serif">Writing Prompts</span>
      </motion.button>

      {/* Prompts List */}
      <AnimatePresence>
        {showPrompts && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2"
          >
            {prompts.map((prompt, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 4, backgroundColor: 'rgba(255, 182, 217, 0.05)' }}
                onClick={() => onPromptSelect?.(prompt)}
                className="w-full text-left px-4 py-3 rounded-lg border border-zinc-900/60 
                         bg-zinc-900/30 text-sm text-zinc-400 font-serif
                         hover:border-[#ffb6d9]/30 transition-all"
              >
                {prompt}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
