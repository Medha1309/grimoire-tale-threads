import { memo } from 'react';
import { motion } from 'framer-motion';
import { MatrixRainBackground } from './MatrixRainBackground';
import { DiaryEntry, MOOD_COLORS } from '../../types/diary';

interface MatrixViewProps {
  entries: DiaryEntry[];
  onBack: () => void;
  onWrite: () => void;
  onSelectEntry: (entry: DiaryEntry) => void;
}

export const MatrixView = memo<MatrixViewProps>(({
  entries,
  onBack,
  onWrite,
  onSelectEntry,
}) => {
  return (
    <section className="relative min-h-screen bg-black text-[#0F0] overflow-hidden">
      <MatrixRainBackground />
      
      <div className="relative z-20 max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <header className="mb-12 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-[#0F0] transition hover:text-white font-mono border border-[#0F0] px-4 py-2"
            style={{ boxShadow: '0 0 10px rgba(0, 255, 0, 0.5)' }}
          >
            <span>←</span>
            <span>[ESC] EXIT</span>
          </button>
          <motion.h2 
            animate={{
              textShadow: ['0 0 10px #0F0', '0 0 20px #0F0', '0 0 10px #0F0'],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="font-mono text-2xl tracking-widest"
          >
            SYSTEM ACCESS
          </motion.h2>
          <div className="w-32" />
        </header>

        {/* System info */}
        <div className="mb-8 font-mono text-xs space-y-1 opacity-60">
          <div>&gt; DOLLHOUSE_OS v6.66</div>
          <div>&gt; STATUS: COMPROMISED</div>
          <div>&gt; REALITY: UNCERTAIN</div>
          <div>&gt; ENTRIES DETECTED: {entries.length}</div>
        </div>

        {/* Entries in Matrix style */}
        {entries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-[#0F0] text-xl font-mono mb-8"
            >
              NO DATA FOUND
            </motion.p>
            <button
              onClick={onWrite}
              className="px-6 py-3 border-2 border-[#0F0] font-mono text-sm hover:bg-[#0F0] hover:text-black transition-all"
              style={{ boxShadow: '0 0 20px rgba(0, 255, 0, 0.5)' }}
            >
              [CREATE NEW ENTRY]
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {entries.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 10, boxShadow: '0 0 30px rgba(0, 255, 0, 0.5)' }}
                onClick={() => onSelectEntry(entry)}
                className="group relative cursor-pointer border border-[#0F0]/30 p-6 bg-black/50 backdrop-blur-sm hover:border-[#0F0] transition-all"
              >
                {/* Entry header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="font-mono text-xs opacity-60">
                    &gt; ENTRY_{String(index + 1).padStart(3, '0')}
                  </div>
                  <div className="font-mono text-xs opacity-60">
                    {new Date(entry.createdAt).toISOString().split('T')[0]}
                  </div>
                </div>

                {/* Entry content preview */}
                <div className="font-mono text-sm leading-relaxed">
                  {entry.content.slice(0, 150)}
                  {entry.content.length > 150 && '...'}
                </div>

                {/* Mood indicator */}
                <div className="mt-4 flex items-center gap-2">
                  <div className="font-mono text-xs opacity-60">MOOD:</div>
                  <div 
                    className="font-mono text-xs px-2 py-1 border border-[#0F0]/50"
                    style={{ 
                      color: MOOD_COLORS[entry.mood],
                      boxShadow: `0 0 10px ${MOOD_COLORS[entry.mood]}40`
                    }}
                  >
                    {entry.mood.toUpperCase()}
                  </div>
                </div>

                {/* Lock indicator */}
                {entry.isLocked && (
                  <div className="absolute top-4 right-4 font-mono text-xs opacity-60">
                    [LOCKED]
                  </div>
                )}

                {/* Hover effect */}
                <motion.div
                  className="absolute inset-0 border-2 border-[#0F0] opacity-0 group-hover:opacity-100 pointer-events-none"
                  animate={{
                    boxShadow: ['0 0 10px #0F0', '0 0 20px #0F0', '0 0 10px #0F0'],
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* Terminal cursor */}
        <motion.div
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="mt-8 w-3 h-6 bg-[#0F0]"
          style={{ boxShadow: '0 0 10px #0F0' }}
        />
      </div>
    </section>
  );
});

MatrixView.displayName = 'MatrixView';
