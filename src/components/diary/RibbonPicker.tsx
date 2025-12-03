/**
 * RibbonPicker Component
 * Mood selector with colored ribbon buttons
 */

import React from 'react';
import { motion } from 'framer-motion';
import { DiaryMood, MOOD_COLORS, MOOD_LABELS } from '../../types/diary';

interface RibbonPickerProps {
  selected: DiaryMood;
  onSelect: (mood: DiaryMood) => void;
  disabled?: boolean;
}

export const RibbonPicker: React.FC<RibbonPickerProps> = ({ 
  selected, 
  onSelect,
  disabled = false
}) => {
  const moods: DiaryMood[] = ['joy', 'sorrow', 'calm', 'unrest'];

  return (
    <div className="space-y-4">
      <div className="text-center">
        <p className="font-serif text-lg text-doll-accent mb-1">
          choose your ribbon
        </p>
        <p className="text-xs text-doll-shadow/60 font-serif">
          every feeling deserves a bow
        </p>
      </div>
      
      <div className="flex gap-4 justify-center flex-wrap">
        {moods.map(mood => (
          <motion.button
            key={mood}
            type="button"
            whileHover={!disabled ? { 
              scale: 1.15,
              rotate: [0, -5, 5, 0]
            } : {}}
            whileTap={!disabled ? { scale: 0.9 } : {}}
            onClick={() => !disabled && onSelect(mood)}
            disabled={disabled}
            className={`relative group ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            aria-label={`Select ${MOOD_LABELS[mood]} mood`}
            aria-pressed={selected === mood}
          >
            {/* Glow effect */}
            {selected === mood && (
              <motion.div
                className="absolute -inset-2 rounded-2xl blur-lg"
                style={{ backgroundColor: MOOD_COLORS[mood] }}
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}

            {/* Ribbon bow */}
            <div className={`relative w-20 h-20 rounded-2xl border-4 transition-all overflow-hidden
                           ${selected === mood 
                             ? 'border-white shadow-[0_0_20px_rgba(255,255,255,0.5)] scale-110' 
                             : 'border-white/50 shadow-lg group-hover:border-white'
                           }`}
                 style={{ backgroundColor: MOOD_COLORS[mood] }}>
              
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Bow decoration */}
              <div className="absolute inset-0 flex items-center justify-center text-3xl opacity-80">
                🎀
              </div>

              {/* Selected sparkle */}
              {selected === mood && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ 
                    scale: 1, 
                    rotate: 0,
                  }}
                  className="absolute -top-2 -right-2 text-2xl"
                >
                  ✨
                </motion.div>
              )}
            </div>

            {/* Mood label */}
            <p className={`mt-2 text-sm font-serif transition-colors
                         ${selected === mood ? 'text-doll-accent font-bold' : 'text-doll-shadow/70'}`}>
              {MOOD_LABELS[mood]}
            </p>
          </motion.button>
        ))}
      </div>
    </div>
  );
};
