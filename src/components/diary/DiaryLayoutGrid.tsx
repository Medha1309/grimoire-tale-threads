import React from 'react';
import { motion } from 'framer-motion';
import { DiaryEntry } from '../../types/diary';

const LockIcon: React.FC<{ size?: 'sm' | 'md' }> = ({ size = 'sm' }) => {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
  };

  return (
    <div className={`${sizeClasses[size]} flex items-center justify-center rounded border border-[#ffb6d9]/20 bg-[#ffb6d9]/5 text-[#ffb6d9]/40`}>
      <svg viewBox="0 0 12 12" fill="none" className="w-full h-full p-0.5">
        <rect x="3" y="5" width="6" height="5" stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.1" />
        <path d="M4 5 V3 C4 1.5 5 1 6 1 C7 1 8 1.5 8 3 V5" stroke="currentColor" strokeWidth="1" fill="none" />
      </svg>
    </div>
  );
};

interface DiaryLayoutGridProps {
  entries: DiaryEntry[];
  layout: 'book' | 'list' | 'grid';
  savedEntry: DiaryEntry | null;
  onEntryClick: (entry: DiaryEntry) => void;
  onClearHighlight: () => void;
}

export const DiaryLayoutGrid: React.FC<DiaryLayoutGridProps> = ({
  entries,
  layout,
  savedEntry,
  onEntryClick,
  onClearHighlight,
}) => {
  const handleEntryClick = (entry: DiaryEntry) => {
    onEntryClick(entry);
    onClearHighlight();
  };

  if (layout === 'book') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {entries.map((entry, index) => {
          const isNewEntry = savedEntry?.id === entry.id;
          return (
            <motion.article
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                boxShadow: isNewEntry
                  ? ['0 0 0 0 rgba(255,182,217,0.4)', '0 0 0 8px rgba(255,182,217,0)', '0 0 0 0 rgba(255,182,217,0)']
                  : '0 0 0 0 rgba(255,182,217,0)'
              }}
              transition={{
                delay: index * 0.05,
                boxShadow: { duration: 1.5, times: [0, 0.5, 1] }
              }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => handleEntryClick(entry)}
              className="group relative cursor-pointer"
            >
              <div
                className="relative aspect-[2/3] overflow-hidden rounded-r-lg shadow-2xl"
                style={{
                  background: "linear-gradient(to right, #1a1410 0%, #2a2420 3%, #3a3430 5%, #2a2420 100%)",
                  boxShadow: `-8px 0 16px rgba(0,0,0,0.8), inset -2px 0 4px rgba(0,0,0,0.5)`,
                  borderRight: `2px solid #ffb6d9`,
                }}
              >
                <div className="absolute left-0 top-0 bottom-0 w-[5%] bg-gradient-to-r from-black/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/85 via-black/80 to-zinc-950/85">
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                    <p className="text-xs text-[#ffb6d9]/60 font-serif tracking-wider uppercase mb-2">
                      Entry {entries.length - index}
                    </p>
                    <p className="text-sm text-zinc-400 font-serif mb-4">
                      {entry.createdAt.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                    <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#ffb6d9]/50 to-transparent mb-4" />
                    <p className="text-sm text-zinc-300 font-serif line-clamp-4 leading-relaxed px-4">
                      {entry.content}
                    </p>
                    <div className="mt-4 text-xs text-[#ffb6d9]/40 font-serif">
                      {entry.mood}
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    );
  }

  if (layout === 'list') {
    return (
      <div className="max-w-3xl mx-auto space-y-4">
        {entries.map((entry, index) => {
          const isNewEntry = savedEntry?.id === entry.id;
          return (
            <motion.article
              key={entry.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: 1,
                x: 0,
                borderColor: isNewEntry
                  ? ['rgba(255,182,217,0.5)', 'rgba(255,182,217,0.3)', 'rgba(133,133,133,0.3)']
                  : 'rgba(133,133,133,0.3)'
              }}
              transition={{
                delay: index * 0.03,
                borderColor: { duration: 2, times: [0, 0.5, 1] }
              }}
              onClick={() => handleEntryClick(entry)}
              className="group relative cursor-pointer bg-zinc-900/20 border border-zinc-800/30 rounded-lg p-5 hover:bg-zinc-900/40 hover:border-[#ffb6d9]/20 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#ffb6d9]/10 to-transparent border border-[#ffb6d9]/20 flex items-center justify-center">
                  <span className="text-base opacity-40">{entry.mood === 'joy' ? '♡' : entry.mood === 'sorrow' ? '✦' : entry.mood === 'calm' ? '◇' : entry.mood === 'unrest' ? '✧' : '◈'}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="text-xs text-[#ffb6d9]/50 font-serif tracking-wider uppercase">
                      Entry {entries.length - index}
                    </span>
                    <span className="text-xs text-zinc-700">•</span>
                    <span className="text-xs text-zinc-500 font-serif">
                      {entry.createdAt.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    {entry.isLocked && (
                      <>
                        <span className="text-xs text-zinc-700">•</span>
                        <LockIcon size="sm" />
                      </>
                    )}
                  </div>
                  <p className="text-sm text-zinc-400 font-serif line-clamp-2 leading-relaxed">
                    {entry.content}
                  </p>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    );
  }

  // Grid layout
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {entries.map((entry, index) => {
        const isNewEntry = savedEntry?.id === entry.id;
        return (
          <motion.article
            key={entry.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: 1,
              scale: 1,
              borderColor: isNewEntry
                ? ['rgba(255,182,217,0.6)', 'rgba(255,182,217,0.4)', 'rgba(133,133,133,0.3)']
                : 'rgba(133,133,133,0.3)'
            }}
            transition={{
              delay: index * 0.02,
              borderColor: { duration: 2, times: [0, 0.5, 1] }
            }}
            whileHover={{ scale: 1.05 }}
            onClick={() => handleEntryClick(entry)}
            className="group relative cursor-pointer aspect-square"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/60 to-black/80 border border-zinc-800/30 rounded-lg p-4 hover:border-[#ffb6d9]/30 hover:bg-zinc-900/70 transition-all">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#ffb6d9]/10 to-transparent border border-[#ffb6d9]/20 flex items-center justify-center">
                    <span className="text-sm opacity-40">{entry.mood === 'joy' ? '♡' : entry.mood === 'sorrow' ? '✦' : entry.mood === 'calm' ? '◇' : entry.mood === 'unrest' ? '✧' : '◈'}</span>
                  </div>
                  {entry.isLocked && <LockIcon size="sm" />}
                </div>
                <p className="text-[10px] text-zinc-600 font-serif mb-2 uppercase tracking-wider">
                  {entry.createdAt.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
                <p className="text-xs text-zinc-500 font-serif line-clamp-4 leading-relaxed flex-1">
                  {entry.content}
                </p>
              </div>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
};
