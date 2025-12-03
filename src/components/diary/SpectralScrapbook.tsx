/**
 * Spectral Scrapbook - Haunting Memory Collection
 * A cinematic, gothic scrapbook experience
 */

import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrapbook } from '../../hooks/useScrapbook';
import { ScrapbookEntry } from '../../types/scrapbook';
import { DollhouseBackButton } from './shared/DollhouseButton';
import { ScrapbookDetail } from './ScrapbookDetail';
import { ScrapbookAddModal } from './ScrapbookAddModal';

interface SpectralScrapbookProps {
  onBack: () => void;
}

const FILTER_THEMES = {
  all: { color: '#a855f7', glow: 'rgba(168, 85, 247, 0.3)' },
  photo: { color: '#ec4899', glow: 'rgba(236, 72, 153, 0.3)' },
  note: { color: '#3b82f6', glow: 'rgba(59, 130, 246, 0.3)' },
  quote: { color: '#10b981', glow: 'rgba(16, 185, 129, 0.3)' },
};

export const SpectralScrapbook: React.FC<SpectralScrapbookProps> = ({ onBack }) => {
  const { entries, allTags, isLoading, addEntry, updateEntry, deleteEntry } = useScrapbook();
  
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'photo' | 'note' | 'quote'>('all');
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedEntryData = entries.find((e) => e.id === selectedEntry);
  const theme = FILTER_THEMES[filterType];

  // Track cursor for spectral effects
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setCursorPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  }, []);

  // Filter entries
  const filteredEntries = entries.filter((entry) => {
    // Type filtering based on content
    if (filterType !== 'all') {
      if (filterType === 'photo' && (!entry.photos || entry.photos.length === 0)) return false;
      if (filterType === 'note' && !entry.thought) return false;
      if (filterType === 'quote' && !entry.fullContent) return false;
    }
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      entry.title?.toLowerCase().includes(query) ||
      entry.thought?.toLowerCase().includes(query) ||
      entry.tags?.some((tag) => tag.toLowerCase().includes(query))
    );
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-purple-400 font-serif text-2xl"
        >
          Summoning memories...
        </motion.div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-black overflow-hidden"
    >
      {/* Spectral Cursor Glow */}
      <motion.div
        className="fixed pointer-events-none rounded-full blur-3xl z-0"
        style={{
          width: 400,
          height: 400,
          background: `radial-gradient(circle, ${theme.glow} 0%, transparent 70%)`,
          left: cursorPos.x - 200,
          top: cursorPos.y - 200,
        }}
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              backgroundColor: theme.color,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.1, 0.5, 0.1],
              scale: [1, 1.8, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-6 py-12 max-w-[1800px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          {/* Back Button */}
          <div className="mb-8">
            <DollhouseBackButton onClick={onBack} label="Return to Dollhouse" />
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <motion.h1
              className="text-6xl font-serif italic mb-3"
              style={{
                color: theme.color,
                textShadow: `0 0 30px ${theme.glow}, 0 0 60px ${theme.glow}`,
              }}
              animate={{
                textShadow: [
                  `0 0 30px ${theme.glow}, 0 0 60px ${theme.glow}`,
                  `0 0 40px ${theme.glow}, 0 0 80px ${theme.glow}`,
                  `0 0 30px ${theme.glow}, 0 0 60px ${theme.glow}`,
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Memory Vault
            </motion.h1>
            <p className="text-zinc-500 font-serif text-sm tracking-widest uppercase">
              {filteredEntries.length} {filteredEntries.length === 1 ? 'Memory' : 'Memories'} Preserved
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex justify-center gap-3 mb-8">
            {(Object.keys(FILTER_THEMES) as Array<keyof typeof FILTER_THEMES>).map((type) => {
              const isSelected = filterType === type;
              const typeTheme = FILTER_THEMES[type];

              return (
                <motion.button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className="relative px-6 py-3 rounded-lg font-serif font-medium capitalize transition-all"
                  style={{
                    backgroundColor: isSelected ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.4)',
                    border: `2px solid ${isSelected ? typeTheme.color : 'transparent'}`,
                    color: isSelected ? typeTheme.color : '#71717a',
                    boxShadow: isSelected ? `0 0 20px ${typeTheme.glow}` : 'none',
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isSelected && (
                    <motion.div
                      className="absolute inset-0 rounded-lg"
                      style={{
                        background: `radial-gradient(circle at center, ${typeTheme.glow} 0%, transparent 70%)`,
                      }}
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                  <span className="relative z-10">{type}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-6">
            <motion.div
              className="relative"
              whileFocus={{ scale: 1.02 }}
            >
              <input
                type="text"
                placeholder="Search the void..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pl-14 rounded-xl font-serif text-lg
                         bg-black/60 backdrop-blur-sm
                         text-zinc-100 placeholder-zinc-600 placeholder-italic
                         border-2 border-zinc-800 focus:border-purple-500/50
                         focus:outline-none
                         transition-all duration-300"
                style={{
                  boxShadow: `0 0 20px ${theme.glow}`,
                }}
              />
              <svg
                className="w-6 h-6 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </motion.div>
          </div>

          {/* Tags */}
          {allTags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {allTags.slice(0, 10).map((tag) => (
                <motion.button
                  key={tag}
                  onClick={() => setSearchQuery(tag)}
                  className="px-4 py-2 rounded-full font-serif text-xs
                           bg-zinc-900/50 text-zinc-400 border border-zinc-800
                           hover:border-purple-500/50 hover:text-purple-400
                           transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  #{tag}
                </motion.button>
              ))}
            </div>
          )}

          {/* Add Memory Button */}
          <div className="flex justify-center">
            <motion.button
              onClick={() => setIsAddModalOpen(true)}
              className="relative px-10 py-4 rounded-lg font-serif text-lg overflow-hidden group"
              style={{
                backgroundColor: 'rgba(0,0,0,0.8)',
                border: `2px solid ${theme.color}`,
                color: theme.color,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(90deg, transparent, ${theme.glow}, transparent)`,
                }}
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
              <span className="relative z-10">+ Capture Memory</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Empty State */}
        {filteredEntries.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <motion.div
              className="text-center max-w-md p-16 rounded-2xl border-2 border-dashed
                        bg-black/40 backdrop-blur-sm"
              style={{
                borderColor: theme.color,
                boxShadow: `0 0 40px ${theme.glow}`,
              }}
              animate={{
                boxShadow: [
                  `0 0 40px ${theme.glow}`,
                  `0 0 60px ${theme.glow}`,
                  `0 0 40px ${theme.glow}`,
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <motion.div
                className="text-8xl mb-6"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                👻
              </motion.div>
              <h3 className="text-3xl font-serif italic mb-4" style={{ color: theme.color }}>
                {searchQuery ? 'Nothing Found' : 'The Void Awaits'}
              </h3>
              <p className="text-zinc-500 font-serif text-sm mb-8">
                {searchQuery ? 'Try searching for something else' : 'Begin collecting your haunted memories'}
              </p>
            </motion.div>
          </motion.div>
        )}

        {/* Masonry Grid */}
        {filteredEntries.length > 0 && (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5 gap-6">
            {filteredEntries.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className="break-inside-avoid mb-6"
                onMouseEnter={() => setHoveredCard(entry.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <SpectralMemoryCard
                  entry={entry}
                  isHovered={hoveredCard === entry.id}
                  theme={theme}
                  onClick={() => setSelectedEntry(entry.id)}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedEntry && selectedEntryData && (
          <ScrapbookDetail
            entry={selectedEntryData}
            onClose={() => setSelectedEntry(null)}
            onUpdate={(updates) => updateEntry(selectedEntry, updates)}
            onDelete={() => {
              deleteEntry(selectedEntry);
              setSelectedEntry(null);
            }}
          />
        )}
      </AnimatePresence>

      {/* Add Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <ScrapbookAddModal
            onClose={() => setIsAddModalOpen(false)}
            onSave={(entry) => {
              addEntry(entry);
              setIsAddModalOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Spectral Memory Card Component
interface SpectralMemoryCardProps {
  entry: ScrapbookEntry;
  isHovered: boolean;
  theme: { color: string; glow: string };
  onClick: () => void;
}

const SpectralMemoryCard: React.FC<SpectralMemoryCardProps> = ({
  entry,
  isHovered,
  theme,
  onClick,
}) => {
  return (
    <motion.div
      onClick={onClick}
      className="relative cursor-pointer group"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      {/* Breathing Border */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          border: `2px solid ${theme.color}`,
          boxShadow: `0 0 20px ${theme.glow}`,
        }}
        animate={{
          opacity: isHovered ? [0.6, 1, 0.6] : 0.4,
          boxShadow: isHovered
            ? [`0 0 20px ${theme.glow}`, `0 0 40px ${theme.glow}`, `0 0 20px ${theme.glow}`]
            : `0 0 20px ${theme.glow}`,
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Card Content */}
      <div className="relative bg-black/80 backdrop-blur-sm rounded-xl overflow-hidden">
        {/* Image */}
        {entry.photos && entry.photos.length > 0 && entry.photos[0].image && (
          <div className="relative overflow-hidden">
            <motion.img
              src={entry.photos[0].image}
              alt={entry.title || 'Memory'}
              className="w-full h-auto object-cover"
              animate={{
                scale: isHovered ? 1.05 : 1,
                filter: isHovered ? 'brightness(1.1)' : 'brightness(1)',
              }}
              transition={{ duration: 0.4 }}
            />
            {/* Vignette */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
              }}
            />
          </div>
        )}

        {/* Text Content */}
        <div className="p-5">
          {entry.title && (
            <h3
              className="font-serif text-xl mb-2"
              style={{ color: theme.color }}
            >
              {entry.title}
            </h3>
          )}
          {entry.thought && (
            <p className="text-zinc-400 font-serif text-sm leading-relaxed mb-3 line-clamp-3">
              {entry.thought}
            </p>
          )}
          {entry.tags && entry.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {entry.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 rounded-full text-xs font-serif
                           bg-zinc-900/50 text-zinc-500 border border-zinc-800"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Hover Glow Effect */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{
              background: `radial-gradient(circle at center, ${theme.glow} 0%, transparent 70%)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};
