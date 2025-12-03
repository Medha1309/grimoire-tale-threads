/**
 * Memory Scrapbook Component
 * Pinterest-inspired memory collection with masonry layout
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrapbook } from '../../hooks/useScrapbook';
import { ScrapbookEntry } from '../../types/scrapbook';
import { DollhouseBackButton } from './shared/DollhouseButton';
import { ScrapbookCard } from './ScrapbookCard';
import { ScrapbookDetail } from './ScrapbookDetail';
import { ScrapbookAddModal } from './ScrapbookAddModal';

interface MemoryScrapbookProps {
  onBack: () => void;
  scrapbooks?: any[];
  onAddNew?: () => void;
}

export const MemoryScrapbook: React.FC<MemoryScrapbookProps> = ({
  onBack,
}) => {
  const {
    entries,
    allTags,
    isLoading,
    addEntry,
    updateEntry,
    deleteEntry,
  } = useScrapbook();

  const [selectedEntry, setSelectedEntry] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedEntryData = entries.find((e) => e.id === selectedEntry);

  // Filter entries by search
  const filteredEntries = entries.filter((entry) => {
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
      <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-black flex items-center justify-center">
        <div className="text-[#ffb6d9] font-serif text-xl">Loading memories...</div>
      </div>
    );
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-black text-zinc-100">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #ffb6d9 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-8 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          {/* Back Button */}
          <div className="mb-6">
            <DollhouseBackButton onClick={onBack} label="Back to Dollhouse" />
          </div>

          {/* Title and Add Button */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-4xl font-serif text-[#ffb6d9] tracking-[0.2em] uppercase">
                Memory Scrapbook
              </h1>
              <p className="text-zinc-400 font-serif text-sm mt-1">
                {filteredEntries.length} {filteredEntries.length === 1 ? 'memory' : 'memories'} preserved
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAddModalOpen(true)}
              aria-label="Capture new memory"
              className="px-6 py-3 rounded-lg font-serif text-sm
                       bg-[#ffb6d9]/20 text-[#ffb6d9] border-2 border-[#ffb6d9]/50
                       hover:bg-[#ffb6d9]/30 hover:border-[#ffb6d9]
                       transition-all duration-300 shadow-lg shadow-[#ffb6d9]/20"
            >
              + Add Memory
            </motion.button>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Search your memories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-3.5 pl-12 rounded-xl font-serif text-base
                         bg-zinc-800/50 backdrop-blur-sm
                         text-zinc-100 placeholder-zinc-500
                         border-2 border-zinc-700/50 focus:border-[#ffb6d9]/50
                         focus:outline-none focus:ring-2 focus:ring-[#ffb6d9]/20
                         transition-all duration-300"
              />
              <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" 
                   fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Tags */}
          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {allTags.map((tag) => (
                <motion.button
                  key={tag}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSearchQuery(tag)}
                  className="px-3 py-1.5 rounded-full font-serif text-xs
                           bg-zinc-800/50 text-zinc-300 border border-zinc-700/50
                           hover:bg-[#ffb6d9]/10 hover:text-[#ffb6d9] hover:border-[#ffb6d9]/30
                           transition-all duration-300"
                >
                  #{tag}
                </motion.button>
              ))}
            </div>
          )}
        </div>

        {/* Empty State */}
        {filteredEntries.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="text-center max-w-md p-12 rounded-2xl border-2 border-dashed border-zinc-700/50
                          bg-zinc-800/30 backdrop-blur-sm">
              <div className="text-6xl mb-4">📸</div>
              <h3 className="text-2xl font-serif mb-3 text-[#ffb6d9]">
                {searchQuery ? 'No matches found' : 'No memories yet'}
              </h3>
              <p className="text-zinc-400 font-serif text-sm mb-6">
                {searchQuery 
                  ? 'Try a different search term' 
                  : 'Start capturing your favorite moments'}
              </p>
              {!searchQuery && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsAddModalOpen(true)}
                  className="px-6 py-3 rounded-lg font-serif text-sm
                           bg-[#ffb6d9]/20 text-[#ffb6d9] border-2 border-[#ffb6d9]/50
                           hover:bg-[#ffb6d9]/30 transition-all duration-300"
                >
                  Create First Memory
                </motion.button>
              )}
            </div>
          </motion.div>
        )}

        {/* Pinterest-style Masonry Grid */}
        {filteredEntries.length > 0 && (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5 gap-4">
            {filteredEntries.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.03, duration: 0.3 }}
                className="break-inside-avoid mb-4"
              >
                <ScrapbookCard
                  entry={entry}
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
            onUpdate={(updates: Partial<ScrapbookEntry>) => updateEntry(selectedEntry, updates)}
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
            onSave={(entry: Omit<ScrapbookEntry, 'id' | 'createdAt' | 'updatedAt'>) => {
              addEntry(entry);
              setIsAddModalOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
