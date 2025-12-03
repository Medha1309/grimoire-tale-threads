/**
 * ReadingArchiveView Component
 * Displays reading history with pink Matrix aesthetic
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PinkMatrixRainBackground } from './PinkMatrixRainBackground';
import { DollhouseRoomHeader } from './shared/DollhouseRoomHeader';
import { DollhouseContentCard } from './shared/DollhouseContentCard';
import { useReadingHistory, ReadingHistoryEntry } from '../../hooks/useReadingHistory';
import { dollhouseTokens } from '../../design-system/dollhouse-tokens';

interface ReadingArchiveViewProps {
  onBack: () => void;
  onNavigateToLibrary: () => void;
}

export const ReadingArchiveView: React.FC<ReadingArchiveViewProps> = ({
  onBack,
  onNavigateToLibrary,
}) => {
  const { history, updateEntry, removeFromHistory, stats } = useReadingHistory();
  const [selectedEntry, setSelectedEntry] = useState<ReadingHistoryEntry | null>(null);
  const [editingNotes, setEditingNotes] = useState(false);
  const [notes, setNotes] = useState('');
  const [rating, setRating] = useState(0);

  const handleEntryClick = (entry: ReadingHistoryEntry) => {
    setSelectedEntry(entry);
    setNotes(entry.personalNotes || '');
    setRating(entry.rating || 0);
    setEditingNotes(false);
  };

  const handleSaveNotes = () => {
    if (selectedEntry) {
      updateEntry(selectedEntry.id, { personalNotes: notes, rating });
      setSelectedEntry({ ...selectedEntry, personalNotes: notes, rating });
      setEditingNotes(false);
    }
  };

  const handleDelete = () => {
    if (selectedEntry && confirm('Remove this book from your archive?')) {
      removeFromHistory(selectedEntry.id);
      setSelectedEntry(null);
    }
  };

  // Detail view
  if (selectedEntry) {
    return (
      <section className="relative min-h-screen bg-black text-zinc-100 overflow-hidden">
        <PinkMatrixRainBackground />
        
        <div className="relative z-20 max-w-4xl mx-auto px-6 py-16">
          <header className="mb-8 flex items-center justify-between border-b pb-6" style={{ borderColor: dollhouseTokens.colors.pink.border }}>
            <button
              onClick={() => setSelectedEntry(null)}
              className="flex items-center gap-2 text-sm transition-colors font-mono"
              style={{ color: dollhouseTokens.colors.neutral.text.secondary }}
              onMouseEnter={(e) => (e.currentTarget.style.color = dollhouseTokens.colors.pink.primary)}
              onMouseLeave={(e) => (e.currentTarget.style.color = dollhouseTokens.colors.neutral.text.secondary)}
            >
              <span>←</span>
              <span>[BACK]</span>
            </button>
            <h2 className="font-mono text-xl tracking-widest" style={{ color: dollhouseTokens.colors.pink.primary, textShadow: `0 0 10px ${dollhouseTokens.colors.pink.glow}` }}>
              ARCHIVED BOOK
            </h2>
            <div className="w-20" />
          </header>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Book Info */}
            <div className="bg-black/60 border rounded-lg p-6" style={{ borderColor: dollhouseTokens.colors.pink.border }}>
              <h3 className="text-2xl font-serif mb-2" style={{ color: dollhouseTokens.colors.pink.primary }}>
                {selectedEntry.storyTitle}
              </h3>
              <p className="text-sm text-zinc-400 font-serif mb-4">by {selectedEntry.storyAuthor}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm font-mono">
                <div>
                  <span className="text-zinc-500">COMPLETED:</span>
                  <p style={{ color: dollhouseTokens.colors.pink.primary }}>
                    {selectedEntry.completedAt.toLocaleDateString()}
                  </p>
                </div>
                {selectedEntry.readingTime && (
                  <div>
                    <span className="text-zinc-500">READING TIME:</span>
                    <p style={{ color: dollhouseTokens.colors.pink.primary }}>
                      {selectedEntry.readingTime} min
                    </p>
                  </div>
                )}
                {selectedEntry.storyGenre && (
                  <div>
                    <span className="text-zinc-500">GENRE:</span>
                    <p style={{ color: dollhouseTokens.colors.pink.primary }}>
                      {selectedEntry.storyGenre.toUpperCase()}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Rating */}
            <div className="bg-black/60 border rounded-lg p-6" style={{ borderColor: dollhouseTokens.colors.pink.border }}>
              <h4 className="text-sm font-mono text-zinc-500 mb-3">YOUR RATING:</h4>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => {
                      setRating(star);
                      updateEntry(selectedEntry.id, { rating: star });
                    }}
                    className="w-8 h-8 rounded border transition-all font-mono text-xs flex items-center justify-center"
                    style={{
                      borderColor: star <= rating ? dollhouseTokens.colors.pink.primary : '#3f3f46',
                      backgroundColor: star <= rating ? dollhouseTokens.colors.pink.subtle : 'transparent',
                      color: star <= rating ? dollhouseTokens.colors.pink.primary : '#52525b',
                    }}
                  >
                    {star}
                  </button>
                ))}
              </div>
            </div>

            {/* Personal Notes */}
            <div className="bg-black/60 border rounded-lg p-6" style={{ borderColor: dollhouseTokens.colors.pink.border }}>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-mono text-zinc-500">PERSONAL NOTES:</h4>
                {!editingNotes && (
                  <button
                    onClick={() => setEditingNotes(true)}
                    className="text-xs font-mono transition-colors"
                    style={{ color: dollhouseTokens.colors.pink.primary }}
                  >
                    [EDIT]
                  </button>
                )}
              </div>

              {editingNotes ? (
                <div className="space-y-3">
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add your thoughts about this book..."
                    className="w-full min-h-[150px] px-4 py-3 bg-black/40 border rounded font-serif text-sm resize-none focus:outline-none"
                    style={{
                      borderColor: dollhouseTokens.colors.pink.border,
                      color: dollhouseTokens.colors.pink.primary,
                    }}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveNotes}
                      className="px-4 py-2 rounded font-mono text-xs transition-colors"
                      style={{
                        backgroundColor: dollhouseTokens.colors.pink.subtle,
                        borderColor: dollhouseTokens.colors.pink.border,
                        color: dollhouseTokens.colors.pink.primary,
                        border: `1px solid ${dollhouseTokens.colors.pink.border}`,
                      }}
                    >
                      [SAVE]
                    </button>
                    <button
                      onClick={() => {
                        setEditingNotes(false);
                        setNotes(selectedEntry.personalNotes || '');
                      }}
                      className="px-4 py-2 rounded font-mono text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                    >
                      [CANCEL]
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-sm font-serif leading-relaxed" style={{ color: dollhouseTokens.colors.pink.primary }}>
                  {selectedEntry.personalNotes || 'No notes yet. Click [EDIT] to add your thoughts.'}
                </p>
              )}
            </div>

            {/* Delete Button */}
            <div className="flex justify-center pt-4">
              <button
                onClick={handleDelete}
                className="px-6 py-2 rounded font-mono text-xs transition-colors border"
                style={{
                  borderColor: '#991b1b',
                  color: '#ef4444',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(153, 27, 27, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                [DELETE FROM ARCHIVE]
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  // List view
  return (
    <section className="relative min-h-screen bg-black text-zinc-100 overflow-hidden">
      <PinkMatrixRainBackground />
      
      <div className="relative z-20 max-w-7xl mx-auto px-6 py-16">
        <DollhouseRoomHeader
          title="READING ARCHIVE"
          subtitle="stories you've completed"
          onBack={onBack}
          theme="pink"
        />

        {/* Stats */}
        {history.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <div className="bg-black/60 border rounded-lg p-4 text-center" style={{ borderColor: dollhouseTokens.colors.pink.border }}>
              <div className="text-2xl font-mono mb-1" style={{ color: dollhouseTokens.colors.pink.primary }}>
                {stats.totalBooks}
              </div>
              <div className="text-xs font-mono text-zinc-500">BOOKS READ</div>
            </div>
            <div className="bg-black/60 border rounded-lg p-4 text-center" style={{ borderColor: dollhouseTokens.colors.pink.border }}>
              <div className="text-2xl font-mono mb-1" style={{ color: dollhouseTokens.colors.pink.primary }}>
                {Math.round(stats.totalReadingTime / 60)}h
              </div>
              <div className="text-xs font-mono text-zinc-500">READING TIME</div>
            </div>
            <div className="bg-black/60 border rounded-lg p-4 text-center" style={{ borderColor: dollhouseTokens.colors.pink.border }}>
              <div className="text-2xl font-mono mb-1" style={{ color: dollhouseTokens.colors.pink.primary }}>
                {stats.averageRating > 0 ? stats.averageRating.toFixed(1) : 'N/A'}
              </div>
              <div className="text-xs font-mono text-zinc-500">AVG RATING</div>
            </div>
            <div className="bg-black/60 border rounded-lg p-4 text-center" style={{ borderColor: dollhouseTokens.colors.pink.border }}>
              <div className="text-2xl font-mono mb-1" style={{ color: dollhouseTokens.colors.pink.primary }}>
                {Object.keys(stats.genreCounts).length}
              </div>
              <div className="text-xs font-mono text-zinc-500">GENRES</div>
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-2xl font-serif mb-2" style={{ color: dollhouseTokens.colors.neutral.text.secondary }}>
              archive empty
            </p>
            <p className="text-sm font-serif mb-8 text-center max-w-md" style={{ color: dollhouseTokens.colors.neutral.text.tertiary }}>
              Books you finish reading will appear here
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onNavigateToLibrary}
              className="px-6 py-3 rounded-lg font-serif text-sm transition-colors"
              style={{
                border: `1px solid ${dollhouseTokens.colors.pink.border}`,
                color: dollhouseTokens.colors.pink.primary,
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = dollhouseTokens.colors.pink.subtle;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
              }}
            >
              Browse Library
            </motion.button>
          </div>
        ) : (
          /* Book Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {history.map((entry, index) => (
              <DollhouseContentCard
                key={entry.id}
                onClick={() => handleEntryClick(entry)}
                theme="pink"
                index={index}
              >
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <p className="text-xs font-mono mb-2" style={{ color: dollhouseTokens.colors.pink.primary, opacity: 0.6 }}>
                      ARCHIVED_{String(index + 1).padStart(3, '0')}
                    </p>
                    <h3 className="text-lg font-serif mb-2 line-clamp-2" style={{ color: dollhouseTokens.colors.pink.primary }}>
                      {entry.storyTitle}
                    </h3>
                    <p className="text-sm text-zinc-400 font-serif mb-3">
                      by {entry.storyAuthor}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-zinc-500">COMPLETED:</span>
                      <span style={{ color: dollhouseTokens.colors.pink.primary }}>
                        {entry.completedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    {entry.rating && (
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-zinc-500">RATING:</span>
                        <span style={{ color: dollhouseTokens.colors.pink.primary }}>
                          {entry.rating}/5
                        </span>
                      </div>
                    )}
                    {entry.storyGenre && (
                      <div className="text-xs font-mono text-center mt-2 px-2 py-1 rounded" style={{ backgroundColor: dollhouseTokens.colors.pink.subtle, color: dollhouseTokens.colors.pink.primary }}>
                        {entry.storyGenre.toUpperCase()}
                      </div>
                    )}
                  </div>
                </div>
              </DollhouseContentCard>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
