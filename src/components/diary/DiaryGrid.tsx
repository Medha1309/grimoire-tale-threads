/**
 * DiaryGrid Component
 * Displays grid of diary entry cards
 */

import React from 'react';
import { motion } from 'framer-motion';
import { DiaryEntry, MOOD_COLORS, MOOD_LABELS } from '../../types/diary';
import { staggerContainer, staggerItem } from '../../utils/animations';

interface DiaryGridProps {
  entries: DiaryEntry[];
  loading: boolean;
  onEntryClick: (entryId: string) => void;
}

export const DiaryGrid: React.FC<DiaryGridProps> = ({ entries, loading, onEntryClick }) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="text-6xl mb-4"
        >
          🎀
        </motion.div>
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="text-doll-pink text-lg font-serif"
        >
          the dolls are whispering...
        </motion.p>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-6xl mb-4">💝</div>
        <p className="text-zinc-300 text-xl font-serif mb-2">
          your dollhouse awaits
        </p>
        <p className="text-zinc-500 text-sm font-serif">
          write your first secret
        </p>
      </div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {entries.map((entry, index) => (
        <motion.article
          key={entry.id}
          variants={staggerItem}
          whileHover={{ y: -8, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onEntryClick(entry.id)}
          className="group relative cursor-pointer"
          style={{ perspective: "1000px" }}
          title="Click to open this diary entry"
        >
          {/* Pink glow effect on hover */}
          <motion.div
            className="absolute -inset-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
            style={{
              background: 'radial-gradient(circle at center, rgba(255,182,217,0.4) 0%, transparent 70%)',
            }}
          />

          {/* Book/Diary container - similar to StoryCard */}
          <motion.div
            className="relative aspect-[2/3] overflow-hidden rounded-r-lg shadow-2xl"
            style={{
              background: "linear-gradient(to right, #2a1820 0%, #3a2830 3%, #4a3840 5%, #3a2830 100%)",
              boxShadow: `-8px 0 16px rgba(0,0,0,0.8), inset -2px 0 4px rgba(0,0,0,0.5), 0 0 20px rgba(255,182,217,0.3)`,
              borderRight: `2px solid rgba(255,182,217,0.5)`,
            }}
          >
            {/* Book spine */}
            <div className="absolute left-0 top-0 bottom-0 w-[5%] bg-gradient-to-r from-black/60 to-transparent" />

            {/* Diary cover design */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Base color with mood */}
              <div 
                className="absolute inset-0 opacity-30"
                style={{ backgroundColor: MOOD_COLORS[entry.mood] }}
              />
              
              <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/85 via-black/80 to-zinc-950/85" />
              
              {/* Animated glow based on mood */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  background: [
                    `radial-gradient(circle at 50% 50%, ${MOOD_COLORS[entry.mood]}20 0%, transparent 60%)`,
                    `radial-gradient(circle at 50% 50%, ${MOOD_COLORS[entry.mood]}40 0%, transparent 70%)`,
                    `radial-gradient(circle at 50% 50%, ${MOOD_COLORS[entry.mood]}20 0%, transparent 60%)`,
                  ],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Decorative elements */}
              <div className="absolute top-4 right-4 text-2xl opacity-40">
                {entry.isLocked ? '🔐' : '💝'}
              </div>
              
              {/* Floating ribbon */}
              <motion.div
                className="absolute top-1/3 left-1/2 -translate-x-1/2 text-4xl opacity-30"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                🎀
              </motion.div>
            </div>

            {/* Ornate border */}
            <div className="absolute inset-0 border-4 border-doll-pink/10 m-4 rounded" />

            {/* Date and content preview */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
              <div className="mb-4">
                <p className="text-xs text-doll-pink/60 font-serif tracking-wider uppercase mb-2">
                  Entry {index + 1}
                </p>
                <p className="text-sm text-zinc-400 font-serif">
                  {formatDate(entry.createdAt)}
                </p>
              </div>
              
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-doll-pink/50 to-transparent mb-4" />
              
              <p className="text-sm text-zinc-300 font-serif line-clamp-4 leading-relaxed px-4">
                {entry.isLocked && !entry.content 
                  ? '💝 A secret locked away...' 
                  : entry.content}
              </p>
              
              <div className="mt-4 text-xs text-doll-pink/40 font-serif">
                {MOOD_LABELS[entry.mood]}
              </div>
            </div>

            {/* Hover effect with "Open" indicator */}
            <motion.div
              className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0"
                style={{
                  background: 'radial-gradient(circle at center, rgba(255,182,217,0.4) 0%, transparent 70%)'
                }}
              />
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="relative bg-doll-pink/90 backdrop-blur-sm px-6 py-3 rounded-full
                         border-2 border-white/50 shadow-lg"
              >
                <span className="text-white font-serif text-lg">Open Entry</span>
              </motion.div>
            </motion.div>

            {/* Page edges */}
            <motion.div
              className="absolute right-0 top-2 bottom-2 w-1 bg-gradient-to-b from-doll-pink/10 via-doll-pink/5 to-doll-pink/10"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.article>
      ))}
    </motion.div>
  );
};

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
