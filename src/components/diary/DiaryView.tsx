import { memo } from 'react';
import { motion } from 'framer-motion';
import { DiaryEntry } from '../../types/diary';
import { DiaryLayoutGrid } from './DiaryLayoutGrid';
import { useArchive } from '../../hooks/useArchive';
import { BackButton } from '../shared/NavigationButtons';

interface DiaryViewProps {
  entries: DiaryEntry[];
  diaryLayout: 'book' | 'list' | 'grid';
  savedEntry: DiaryEntry | null;
  onBack: () => void;
  onWrite: () => void;
  onLayoutChange: (layout: 'book' | 'list' | 'grid') => void;
  onEntryClick: (entry: DiaryEntry) => void;
  onClearHighlight: () => void;
  onNavigateToArchive?: () => void;
}

export const DiaryView = memo<DiaryViewProps>(({
  entries,
  diaryLayout,
  savedEntry,
  onBack,
  onWrite,
  onLayoutChange,
  onEntryClick,
  onClearHighlight,
  onNavigateToArchive,
}) => {
  const { items: archivedItems } = useArchive('diary');

  return (
    <section className="relative min-h-screen overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, #0a0a0a 0%, #000000 100%)',
      }}
    >
      {/* Ambient fog */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 1200px 800px at 50% 50%, rgba(139, 0, 0, 0.15) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <header className="mb-8 flex items-center justify-between pb-6 border-b border-zinc-800/30">
          <BackButton onClick={onBack} variant="ghost" />
          
          <div className="relative group">
            <motion.h2 
              className="font-serif text-3xl sm:text-4xl tracking-[0.3em] relative z-10"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              style={{
                color: '#b02e2e',
                textShadow: '0 0 30px rgba(176, 46, 46, 0.8), 0 0 60px rgba(176, 46, 46, 0.4)',
              }}
            >
              CONFESSIONS
            </motion.h2>
            
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-px"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 1 }}
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(176, 46, 46, 0.6) 50%, transparent 100%)',
                boxShadow: '0 0 10px rgba(176, 46, 46, 0.3)',
              }}
            />
          </div>
          
          {/* New Entry Button */}
          <motion.button
            onClick={onWrite}
            className="relative px-8 py-3 font-serif text-sm tracking-wider backdrop-blur-md
                       transition-all duration-300 overflow-hidden group"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            style={{
              background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(20, 10, 10, 0.3) 100%)',
              border: '1px solid rgba(176, 46, 46, 0.3)',
              borderRadius: '2px',
              color: '#b02e2e',
              boxShadow: '0 2px 12px rgba(0, 0, 0, 0.3), 0 0 15px rgba(176, 46, 46, 0.1)',
              textShadow: '0 0 15px rgba(176, 46, 46, 0.5)',
            }}
            whileHover={{ 
              scale: 1.03,
              borderColor: 'rgba(176, 46, 46, 0.7)',
              boxShadow: '0 4px 20px rgba(106, 0, 0, 0.4), 0 0 30px rgba(176, 46, 46, 0.4)',
              textShadow: '0 0 20px rgba(176, 46, 46, 0.8)',
            }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l opacity-40 group-hover:opacity-70 transition-opacity"
                 style={{ borderColor: '#b02e2e', filter: 'drop-shadow(0 0 3px rgba(176, 46, 46, 0.5))' }} />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r opacity-40 group-hover:opacity-70 transition-opacity"
                 style={{ borderColor: '#b02e2e', filter: 'drop-shadow(0 0 3px rgba(176, 46, 46, 0.5))' }} />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l opacity-40 group-hover:opacity-70 transition-opacity"
                 style={{ borderColor: '#b02e2e', filter: 'drop-shadow(0 0 3px rgba(176, 46, 46, 0.5))' }} />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r opacity-40 group-hover:opacity-70 transition-opacity"
                 style={{ borderColor: '#b02e2e', filter: 'drop-shadow(0 0 3px rgba(176, 46, 46, 0.5))' }} />
            
            <span className="relative z-10">New Entry</span>
          </motion.button>
        </header>

        {/* Layout Switcher */}
        {entries.length > 0 && (
          <div className="flex items-center justify-center gap-2 mb-8">
            <span className="text-xs text-zinc-600 font-mono mr-3 uppercase tracking-wider">View:</span>
            {(['list', 'grid'] as const).map((layoutType) => (
              <button
                key={layoutType}
                onClick={() => onLayoutChange(layoutType)}
                className={`px-4 py-2 rounded text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                  diaryLayout === layoutType
                    ? 'bg-zinc-900/80 text-red-400 border border-red-400/40 shadow-[0_0_15px_rgba(176,46,46,0.2)]'
                    : 'bg-zinc-900/40 text-zinc-500 border border-zinc-800 hover:text-zinc-300 hover:border-zinc-700'
                }`}
              >
                {layoutType}
              </button>
            ))}
          </div>
        )}

        {/* Empty State */}
        {entries.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <p className="text-zinc-500 font-serif text-lg mb-6 italic">
              Your confessions await...
            </p>
            <button
              onClick={onWrite}
              className="px-8 py-3 bg-zinc-900/60 border border-red-400/30 rounded text-red-400 
                         hover:bg-zinc-900/80 hover:border-red-400/50 transition-all duration-300
                         font-serif tracking-wider"
            >
              Write Your First Entry
            </button>
          </motion.div>
        ) : (
          <DiaryLayoutGrid
            entries={entries}
            layout={diaryLayout}
            savedEntry={savedEntry}
            onEntryClick={onEntryClick}
            onClearHighlight={onClearHighlight}
          />
        )}

        {/* Archive Link */}
        {onNavigateToArchive && archivedItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-center"
          >
            <button
              onClick={onNavigateToArchive}
              className="group relative px-6 py-3 font-mono text-sm text-zinc-500 
                         hover:text-red-400 transition-all duration-300"
            >
              <span className="relative z-10">
                View Archive ({archivedItems.length} {archivedItems.length === 1 ? 'entry' : 'entries'})
              </span>
              <div className="absolute inset-0 border border-zinc-800 group-hover:border-red-400/30 
                              rounded transition-all duration-300" />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
});

DiaryView.displayName = 'DiaryView';
