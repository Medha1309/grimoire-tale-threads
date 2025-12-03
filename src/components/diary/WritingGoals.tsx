/**
 * WritingGoals Component
 * Set and track daily writing goals
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WritingGoalsProps {
  currentWordCount: number;
  onGoalSet?: (goal: number) => void;
}

const PRESET_GOALS = [100, 250, 500, 750, 1000];

export const WritingGoals: React.FC<WritingGoalsProps> = ({
  currentWordCount,
  onGoalSet,
}) => {
  const [goal, setGoal] = useState<number | null>(null);
  const [showGoalPicker, setShowGoalPicker] = useState(false);
  const [customGoal, setCustomGoal] = useState('');

  const progress = goal ? Math.min((currentWordCount / goal) * 100, 100) : 0;
  const isGoalReached = goal && currentWordCount >= goal;

  const handleSetGoal = (newGoal: number) => {
    setGoal(newGoal);
    setShowGoalPicker(false);
    onGoalSet?.(newGoal);
  };

  const handleCustomGoal = () => {
    const value = parseInt(customGoal);
    if (value > 0) {
      handleSetGoal(value);
      setCustomGoal('');
    }
  };

  return (
    <div className="space-y-3">
      {/* Goal Display */}
      {goal ? (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          {/* Progress Bar */}
          <div className="relative h-2 bg-zinc-900 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className={`h-full rounded-full ${
                isGoalReached
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                  : 'bg-gradient-to-r from-[#ffb6d9] to-[#ff69b4]'
              }`}
            />
            
            {/* Sparkle effect when goal reached */}
            {isGoalReached && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                style={{ transform: 'translateX(-100%)' }}
              />
            )}
          </div>

          {/* Goal Stats */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="text-zinc-500 font-mono">
                {currentWordCount} / {goal} words
              </span>
              {isGoalReached && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-green-500"
                >
                  ✓ Goal reached!
                </motion.span>
              )}
            </div>
            <button
              onClick={() => setShowGoalPicker(true)}
              className="text-zinc-600 hover:text-[#ffb6d9] transition-colors font-serif"
            >
              Change goal
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowGoalPicker(true)}
          className="w-full px-4 py-3 rounded-lg border border-zinc-900/60 
                   bg-zinc-900/30 text-sm text-zinc-400 font-serif
                   hover:border-[#ffb6d9]/30 transition-all"
        >
          Set a writing goal for today
        </motion.button>
      )}

      {/* Goal Picker Modal */}
      <AnimatePresence>
        {showGoalPicker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setShowGoalPicker(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 max-w-md w-full mx-4"
            >
              <h3 className="text-xl font-serif text-[#ffb6d9] mb-4">
                Set Your Writing Goal
              </h3>

              {/* Preset Goals */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {PRESET_GOALS.map((presetGoal) => (
                  <motion.button
                    key={presetGoal}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSetGoal(presetGoal)}
                    className="px-4 py-3 rounded-lg border border-zinc-800 
                             bg-zinc-950 text-zinc-300 font-mono text-sm
                             hover:border-[#ffb6d9]/40 hover:bg-[#ffb6d9]/10 transition-all"
                  >
                    {presetGoal}
                  </motion.button>
                ))}
              </div>

              {/* Custom Goal */}
              <div className="space-y-3">
                <div className="h-px bg-zinc-800" />
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={customGoal}
                    onChange={(e) => setCustomGoal(e.target.value)}
                    placeholder="Custom goal..."
                    className="flex-1 px-4 py-2 rounded-lg border border-zinc-800 
                             bg-zinc-950 text-zinc-300 font-mono text-sm
                             focus:outline-none focus:border-[#ffb6d9]/40"
                    min="1"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCustomGoal}
                    disabled={!customGoal || parseInt(customGoal) <= 0}
                    className="px-6 py-2 rounded-lg bg-[#ffb6d9] text-black font-serif text-sm
                             hover:bg-[#ff69b4] transition-colors
                             disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Set
                  </motion.button>
                </div>
              </div>

              {/* Cancel */}
              <button
                onClick={() => setShowGoalPicker(false)}
                className="w-full mt-4 px-4 py-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
