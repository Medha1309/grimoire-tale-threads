/**
 * WritingFeaturesTour Component
 * Interactive tour of new writing features
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WritingFeaturesTourProps {
  onComplete: () => void;
}

const TOUR_STEPS = [
  {
    title: 'Welcome to Enhanced Writing! ✨',
    description: 'Your diary now has powerful tools to help you write better. Let\'s take a quick tour!',
    highlight: 'none',
  },
  {
    title: 'Auto-Save 💾',
    description: 'Your work is automatically saved every 3 seconds. Never lose your thoughts again! Look for the save indicator in the header.',
    highlight: 'autosave',
  },
  {
    title: 'Writing Goals 🎯',
    description: 'Set daily word count goals to stay motivated. Watch your progress with a visual bar that fills as you write!',
    highlight: 'goals',
  },
  {
    title: 'Writing Prompts 💡',
    description: 'Stuck? Click to see mood-based prompts that inspire you. Each mood has unique suggestions to get you started.',
    highlight: 'prompts',
  },
  {
    title: 'Focus Mode 🎨',
    description: 'Need to concentrate? Enter full-screen focus mode for a distraction-free writing experience. Press Esc to exit anytime.',
    highlight: 'focus',
  },
  {
    title: 'Real-Time Stats 📊',
    description: 'Track your word count, character count, and writing session duration as you type.',
    highlight: 'stats',
  },
  {
    title: 'You\'re All Set! 🎉',
    description: 'Start writing with your new tools. Remember: you can hide the tools panel anytime by clicking "Hide Tools".',
    highlight: 'none',
  },
];

export const WritingFeaturesTour: React.FC<WritingFeaturesTourProps> = ({
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showTour, setShowTour] = useState(true);

  const handleNext = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    setShowTour(false);
    localStorage.setItem('diary-tour-completed', 'true');
    onComplete();
  };

  const step = TOUR_STEPS[currentStep];
  const progress = ((currentStep + 1) / TOUR_STEPS.length) * 100;

  return (
    <AnimatePresence>
      {showTour && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
        >
          {/* Tour Card */}
          <motion.div
            key={currentStep}
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: -20, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="relative max-w-2xl w-full mx-4 bg-zinc-900 border border-[#ffb6d9]/30 
                     rounded-xl shadow-2xl overflow-hidden"
          >
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-zinc-800">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
                className="h-full bg-gradient-to-r from-[#ffb6d9] to-[#ff69b4]"
              />
            </div>

            {/* Content */}
            <div className="p-8 pt-10">
              {/* Step Counter */}
              <div className="text-xs text-zinc-500 font-mono mb-4">
                Step {currentStep + 1} of {TOUR_STEPS.length}
              </div>

              {/* Title */}
              <h2 className="text-3xl font-serif text-[#ffb6d9] mb-4">
                {step.title}
              </h2>

              {/* Description */}
              <p className="text-lg text-zinc-300 font-serif leading-relaxed mb-8">
                {step.description}
              </p>

              {/* Feature Illustration */}
              <div className="mb-8 p-6 rounded-lg bg-zinc-950 border border-zinc-800">
                {step.highlight === 'autosave' && (
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-[#ffb6d9] border-t-transparent rounded-full"
                    />
                    <span className="text-sm text-zinc-500 font-mono">Saving...</span>
                    <div className="ml-auto text-xs text-green-500">✓ Saved 2s ago</div>
                  </div>
                )}

                {step.highlight === 'goals' && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-zinc-500 font-mono mb-1">
                      <span>250 / 500 words</span>
                      <span>50%</span>
                    </div>
                    <div className="h-2 bg-zinc-900 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '50%' }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="h-full bg-gradient-to-r from-[#ffb6d9] to-[#ff69b4]"
                      />
                    </div>
                  </div>
                )}

                {step.highlight === 'prompts' && (
                  <div className="space-y-2">
                    <div className="text-xs text-zinc-600 mb-2">💡 Writing Prompts</div>
                    {['What made you smile today?', 'Describe a moment of pure happiness...'].map((prompt, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.2 }}
                        className="px-4 py-2 rounded border border-zinc-800 bg-zinc-900/50 
                                 text-sm text-zinc-400 font-serif"
                      >
                        {prompt}
                      </motion.div>
                    ))}
                  </div>
                )}

                {step.highlight === 'focus' && (
                  <div className="text-center py-8">
                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-6xl mb-4"
                    >
                      🎨
                    </motion.div>
                    <p className="text-sm text-zinc-500 font-serif">
                      Full-screen distraction-free writing
                    </p>
                  </div>
                )}

                {step.highlight === 'stats' && (
                  <div className="flex items-center gap-6 text-xs text-zinc-500 font-mono">
                    <div>Words: <span className="text-zinc-400">247</span></div>
                    <div className="h-3 w-px bg-zinc-800" />
                    <div>Characters: <span className="text-zinc-400">1,234</span></div>
                    <div className="h-3 w-px bg-zinc-800" />
                    <div>Writing: <span className="text-zinc-400">5:23</span></div>
                  </div>
                )}

                {step.highlight === 'none' && (
                  <div className="text-center py-4">
                    <motion.div
                      animate={{
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{ duration: 0.5 }}
                      className="text-5xl mb-2"
                    >
                      {currentStep === 0 ? '👋' : '🎉'}
                    </motion.div>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <button
                  onClick={handleSkip}
                  className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors font-serif"
                >
                  Skip Tour
                </button>

                <div className="flex gap-3">
                  {currentStep > 0 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handlePrevious}
                      className="px-6 py-2 rounded-lg border border-zinc-800 
                               text-zinc-400 font-serif text-sm
                               hover:border-zinc-700 transition-colors"
                    >
                      Previous
                    </motion.button>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNext}
                    className="px-6 py-2 rounded-lg bg-[#ffb6d9] text-black font-serif text-sm
                             hover:bg-[#ff69b4] transition-colors"
                  >
                    {currentStep === TOUR_STEPS.length - 1 ? 'Start Writing' : 'Next'}
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-4 right-4 text-4xl opacity-20">
              {currentStep === 0 && '✨'}
              {currentStep === 1 && '💾'}
              {currentStep === 2 && '🎯'}
              {currentStep === 3 && '💡'}
              {currentStep === 4 && '🎨'}
              {currentStep === 5 && '📊'}
              {currentStep === 6 && '🎉'}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
