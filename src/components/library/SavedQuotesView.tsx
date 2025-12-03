/**
 * Saved Quotes View
 * Display all saved quotes as vintage bookmarks
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SavedQuote } from '../../types/savedQuote';
import { BackButton } from '../shared/NavigationButtons';
import { Button } from '../shared/Button';
import { useSavedQuotes } from '../../hooks/useSavedQuotes';

interface SavedQuotesViewProps {
  onBack: () => void;
  onViewBook: (storyId: string) => void;
}

export const SavedQuotesView: React.FC<SavedQuotesViewProps> = ({
  onBack,
  onViewBook,
}) => {
  const { quotes, loading, deleteQuote, updateQuote } = useSavedQuotes();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStory, setSelectedStory] = useState<string>('all');
  const [editingQuote, setEditingQuote] = useState<string | null>(null);
  const [editNotes, setEditNotes] = useState('');

  // Get unique stories
  const stories = Array.from(
    new Set(quotes.map((q) => JSON.stringify({ id: q.storyId, title: q.storyTitle })))
  ).map((s) => JSON.parse(s));

  // Filter quotes
  const filteredQuotes = quotes.filter((quote) => {
    const matchesSearch =
      quote.quote.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quote.storyTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quote.storyAuthor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStory = selectedStory === 'all' || quote.storyId === selectedStory;
    return matchesSearch && matchesStory;
  });

  const handleEditNotes = (quote: SavedQuote) => {
    setEditingQuote(quote.id);
    setEditNotes(quote.notes || '');
  };

  const handleSaveNotes = async (quoteId: string) => {
    await updateQuote(quoteId, { notes: editNotes });
    setEditingQuote(null);
  };

  if (loading) {
    return (
      <section className="relative min-h-screen bg-black text-zinc-100 px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-zinc-500 font-serif">Loading quotes...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen bg-black text-zinc-100 px-6 py-16">
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8 flex items-center justify-between border-b border-zinc-900/40 pb-6">
          <BackButton onClick={onBack} className="relative" />
          <h2 className="font-serif text-3xl tracking-wider text-[#ffb6d9]/90">
            WHISPERED PASSAGES
          </h2>
          <div className="flex items-center gap-3">
            <span className="text-sm text-zinc-500 font-serif">
              {quotes.length} {quotes.length === 1 ? 'quote' : 'quotes'}
            </span>
          </div>
        </header>

        {/* Controls */}
        <div className="mb-8 space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search quotes..."
              className="flex-1 px-4 py-2 bg-zinc-900/60 border border-zinc-800/60 rounded-lg
                       text-zinc-300 font-serif text-sm placeholder-zinc-600
                       focus:outline-none focus:border-[#ffb6d9]/60 focus:ring-2 focus:ring-[#ffb6d9]/20
                       transition-all duration-200"
            />
            <select
              value={selectedStory}
              onChange={(e) => setSelectedStory(e.target.value)}
              className="px-4 py-2 bg-zinc-900/60 border border-zinc-800/60 rounded-lg
                       text-zinc-300 font-serif text-sm
                       focus:outline-none focus:border-[#ffb6d9]/60 focus:ring-2 focus:ring-[#ffb6d9]/20
                       transition-all duration-200 cursor-pointer"
            >
              <option value="all">All Stories</option>
              {stories.map((story) => (
                <option key={story.id} value={story.id}>
                  {story.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Empty State */}
        {quotes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <p className="text-zinc-400 text-xl font-serif mb-2">
              No quotes saved yet
            </p>
            <p className="text-zinc-600 text-sm font-serif mb-8">
              Select text while reading to save memorable passages
            </p>
          </motion.div>
        ) : filteredQuotes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <p className="text-zinc-400 text-xl font-serif mb-2">
              No quotes match your search
            </p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {filteredQuotes.map((quote, index) => (
                <motion.article
                  key={quote.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative"
                >
                  {/* Bookmark card */}
                  <div
                    className="relative bg-gradient-to-br from-amber-50/5 to-amber-100/5 
                             border-l-4 rounded-r-lg p-6 shadow-xl
                             hover:shadow-2xl transition-all duration-300"
                    style={{
                      borderLeftColor: quote.ribbonColor || '#ffb6d9',
                      background: `linear-gradient(135deg, 
                        rgba(255, 182, 217, 0.03) 0%, 
                        rgba(0, 0, 0, 0.6) 100%)`,
                    }}
                  >
                    {/* Ribbon decoration */}
                    <div
                      className="absolute left-0 top-0 w-1 h-full opacity-60"
                      style={{
                        background: `linear-gradient(to bottom, 
                          ${quote.ribbonColor || '#ffb6d9'}, 
                          transparent)`,
                      }}
                    />

                    {/* Quote text */}
                    <blockquote className="relative mb-4">
                      <span className="absolute -left-2 -top-2 text-4xl text-[#ffb6d9]/20 font-serif">
                        "
                      </span>
                      <p className="font-serif text-lg text-zinc-300 leading-relaxed italic pl-4">
                        {quote.quote}
                      </p>
                      <span className="absolute -bottom-4 right-0 text-4xl text-[#ffb6d9]/20 font-serif">
                        "
                      </span>
                    </blockquote>

                    {/* Source */}
                    <div className="mt-6 pt-4 border-t border-zinc-800/40">
                      <button
                        onClick={() => onViewBook(quote.storyId)}
                        className="text-sm text-[#ffb6d9]/80 hover:text-[#ffb6d9] font-serif
                                 transition-colors duration-200"
                      >
                        — {quote.storyTitle}
                      </button>
                      <p className="text-xs text-zinc-600 font-serif mt-1">
                        by {quote.storyAuthor}
                        {quote.chapterNumber && ` • Chapter ${quote.chapterNumber}`}
                      </p>
                    </div>

                    {/* Notes section */}
                    {editingQuote === quote.id ? (
                      <div className="mt-4 space-y-2">
                        <textarea
                          value={editNotes}
                          onChange={(e) => setEditNotes(e.target.value)}
                          placeholder="Add your thoughts..."
                          className="w-full px-3 py-2 bg-zinc-900/60 border border-zinc-800/60 rounded
                                   text-zinc-300 font-serif text-sm placeholder-zinc-600
                                   focus:outline-none focus:border-[#ffb6d9]/60 focus:ring-2 focus:ring-[#ffb6d9]/20
                                   transition-all duration-200 resize-none"
                          rows={3}
                        />
                        <div className="flex gap-2">
                          <Button
                            variant="secondary"
                            onClick={() => handleSaveNotes(quote.id)}
                            className="text-xs"
                          >
                            Save
                          </Button>
                          <Button
                            variant="ghost"
                            onClick={() => setEditingQuote(null)}
                            className="text-xs"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : quote.notes ? (
                      <div
                        onClick={() => handleEditNotes(quote)}
                        className="mt-4 p-3 bg-zinc-900/30 rounded border border-zinc-800/40 cursor-pointer
                                 hover:border-zinc-700/60 transition-colors duration-200"
                      >
                        <p className="text-sm text-zinc-400 font-serif italic">
                          {quote.notes}
                        </p>
                      </div>
                    ) : null}

                    {/* Actions */}
                    <div className="mt-4 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {!quote.notes && !editingQuote && (
                        <button
                          onClick={() => handleEditNotes(quote)}
                          className="text-xs text-zinc-500 hover:text-[#ffb6d9] font-serif transition-colors"
                        >
                          Add note
                        </button>
                      )}
                      <button
                        onClick={() => {
                          if (confirm('Remove this quote?')) {
                            deleteQuote(quote.id);
                          }
                        }}
                        className="text-xs text-zinc-600 hover:text-red-400 font-serif transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};
