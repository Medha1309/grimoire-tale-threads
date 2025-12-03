/**
 * Saved Books View
 * Redesigned reading list with full CRUD functionality
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Story } from '../../types';
import { BackButton } from '../shared/NavigationButtons';
import { Button } from '../shared/Button';
import { useSavedQuotes } from '../../hooks/useSavedQuotes';

interface SavedBooksViewProps {
  savedBooks: Story[];
  onBack: () => void;
  onRemoveBook: (slug: string) => void;
  onArchiveBook: (slug: string) => void;
  onViewBook: (slug: string) => void;
  onBrowseLibrary: () => void;
  archivedCount: number;
  onViewArchive: () => void;
  onViewQuotes?: () => void;
}

type SortOption = 'recent' | 'title' | 'author' | 'genre';
type ViewMode = 'grid' | 'list';

export const SavedBooksView: React.FC<SavedBooksViewProps> = ({
  savedBooks,
  onBack,
  onRemoveBook,
  onArchiveBook,
  onViewBook,
  onBrowseLibrary,
  archivedCount,
  onViewArchive,
  onViewQuotes,
}) => {
  const [sortBy, setSortBy] = useState<SortOption>('recent');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const { getQuoteCount } = useSavedQuotes();

  // Get unique genres
  const genres = ['all', ...Array.from(new Set(savedBooks.map(book => book.genre)))];

  // Filter and sort books
  const filteredBooks = savedBooks
    .filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           book.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = selectedGenre === 'all' || book.genre === selectedGenre;
      return matchesSearch && matchesGenre;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'author':
          return a.author.localeCompare(b.author);
        case 'genre':
          return (a.genre || '').localeCompare(b.genre || '');
        case 'recent':
        default:
          return 0; // Keep original order (most recent first)
      }
    });

  return (
    <section className="relative min-h-screen bg-black text-zinc-100 px-6 py-16">
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8 flex items-center justify-between border-b border-zinc-900/40 pb-6">
          <BackButton onClick={onBack} className="relative" />
          <h2 className="font-serif text-3xl tracking-wider text-[#ffb6d9]/90">
            READING LIST
          </h2>
          <div className="flex items-center gap-3">
            <span className="text-sm text-zinc-500 font-serif">
              {savedBooks.length} {savedBooks.length === 1 ? 'book' : 'books'}
            </span>
          </div>
        </header>

        {/* Controls */}
        <div className="mb-8 space-y-4">
          {/* Search and View Toggle */}
          <div className="flex gap-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title or author..."
              className="flex-1 px-4 py-2 bg-zinc-900/60 border border-zinc-800/60 rounded-lg
                       text-zinc-300 font-serif text-sm placeholder-zinc-600
                       focus:outline-none focus:border-[#ffb6d9]/60 focus:ring-2 focus:ring-[#ffb6d9]/20
                       transition-all duration-200"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-lg font-serif text-sm transition-all duration-200
                  ${viewMode === 'grid'
                    ? 'bg-[#ffb6d9]/10 text-[#ffb6d9] border border-[#ffb6d9]/40'
                    : 'bg-zinc-900/60 text-zinc-400 border border-zinc-800/60 hover:border-[#ffb6d9]/30'
                  }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-lg font-serif text-sm transition-all duration-200
                  ${viewMode === 'list'
                    ? 'bg-[#ffb6d9]/10 text-[#ffb6d9] border border-[#ffb6d9]/40'
                    : 'bg-zinc-900/60 text-zinc-400 border border-zinc-800/60 hover:border-[#ffb6d9]/30'
                  }`}
              >
                List
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-4 py-2 bg-zinc-900/60 border border-zinc-800/60 rounded-lg
                       text-zinc-300 font-serif text-sm
                       focus:outline-none focus:border-[#ffb6d9]/60 focus:ring-2 focus:ring-[#ffb6d9]/20
                       transition-all duration-200 cursor-pointer"
            >
              <option value="recent">Recently Added</option>
              <option value="title">Title (A-Z)</option>
              <option value="author">Author (A-Z)</option>
              <option value="genre">Genre</option>
            </select>

            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="px-4 py-2 bg-zinc-900/60 border border-zinc-800/60 rounded-lg
                       text-zinc-300 font-serif text-sm
                       focus:outline-none focus:border-[#ffb6d9]/60 focus:ring-2 focus:ring-[#ffb6d9]/20
                       transition-all duration-200 cursor-pointer"
            >
              {genres.map(genre => (
                <option key={genre} value={genre}>
                  {genre === 'all' ? 'All Genres' : genre}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Empty State */}
        {savedBooks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <p className="text-zinc-400 text-xl font-serif mb-2">
              Your reading list is empty
            </p>
            <p className="text-zinc-600 text-sm font-serif mb-8">
              Save books from the library to read later
            </p>
            <Button variant="primary" onClick={onBrowseLibrary}>
              Browse Library
            </Button>
          </motion.div>
        ) : filteredBooks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <p className="text-zinc-400 text-xl font-serif mb-2">
              No books match your search
            </p>
            <p className="text-zinc-600 text-sm font-serif">
              Try different keywords or filters
            </p>
          </motion.div>
        ) : (
          <>
            {/* Grid View */}
            {viewMode === 'grid' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {filteredBooks.map((book, index) => (
                  <motion.article
                    key={book.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group relative"
                  >
                    <motion.div
                      whileHover={{ y: -8, scale: 1.02 }}
                      onClick={() => onViewBook(book.slug)}
                      className="relative aspect-[2/3] overflow-hidden rounded-r-lg shadow-2xl cursor-pointer"
                      style={{
                        background: 'linear-gradient(to right, #1a1410 0%, #2a2420 3%, #3a3430 5%, #2a2420 100%)',
                        boxShadow: '-8px 0 16px rgba(0,0,0,0.8), inset -2px 0 4px rgba(0,0,0,0.5)',
                        borderRight: '2px solid #ffb6d9',
                      }}
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-[5%] bg-gradient-to-r from-black/60 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/85 via-black/80 to-zinc-950/85" />
                      <div className="absolute inset-0 border-4 border-amber-900/20 m-4 rounded" />
                      
                      {/* Content */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                        <p className="text-lg text-zinc-200 font-serif mb-2">{book.title}</p>
                        <p className="text-sm text-zinc-500 font-serif mb-4">by {book.author}</p>
                        <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#ffb6d9]/50 to-transparent mb-4" />
                        <p className="text-xs text-zinc-400 font-serif line-clamp-3 leading-relaxed px-4">
                          {book.blurb}
                        </p>
                        <div className="mt-4 flex items-center gap-3 text-xs">
                          <span className="text-[#ffb6d9]/40 font-serif">{book.genre}</span>
                          {getQuoteCount(book.slug) > 0 && (
                            <>
                              <span className="text-zinc-700">•</span>
                              <span className="text-[#ffb6d9]/60 font-serif">
                                {getQuoteCount(book.slug)} {getQuoteCount(book.slug) === 1 ? 'quote' : 'quotes'}
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Actions on hover */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 bg-black/80 flex items-center justify-center gap-3 z-20"
                      >
                        <Button
                          variant="secondary"
                          onClick={(e) => {
                            e.stopPropagation();
                            onArchiveBook(book.slug);
                          }}
                          className="text-xs"
                        >
                          Archive
                        </Button>
                        <Button
                          variant="danger"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm(`Remove "${book.title}" from your reading list?`)) {
                              onRemoveBook(book.slug);
                            }
                          }}
                          className="text-xs"
                        >
                          Remove
                        </Button>
                      </motion.div>
                    </motion.div>
                  </motion.article>
                ))}
              </div>
            )}

            {/* List View */}
            {viewMode === 'list' && (
              <div className="space-y-4 mb-16">
                {filteredBooks.map((book, index) => (
                  <motion.div
                    key={book.slug}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="group relative bg-zinc-900/30 border border-zinc-800/60 rounded-lg p-6
                             hover:border-[#ffb6d9]/40 hover:bg-zinc-900/50 transition-all duration-200"
                  >
                    <div className="flex items-start gap-6">
                      <div
                        onClick={() => onViewBook(book.slug)}
                        className="flex-shrink-0 w-24 h-36 rounded bg-gradient-to-br from-zinc-800 to-zinc-900
                                 border-2 border-[#ffb6d9]/20 cursor-pointer hover:border-[#ffb6d9]/40
                                 transition-all duration-200"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <h3
                          onClick={() => onViewBook(book.slug)}
                          className="text-xl font-serif text-[#ffb6d9] mb-2 cursor-pointer hover:text-[#ffb6d9]/80
                                   transition-colors duration-200"
                        >
                          {book.title}
                        </h3>
                        <p className="text-sm text-zinc-400 font-serif mb-3">by {book.author}</p>
                        <p className="text-sm text-zinc-500 font-serif mb-4 line-clamp-2">
                          {book.blurb}
                        </p>
                        <div className="flex items-center gap-4">
                          <span className="text-xs text-[#ffb6d9]/60 font-serif">{book.genre}</span>
                        </div>
                      </div>

                      <div className="flex-shrink-0 flex flex-col gap-2">
                        <Button
                          variant="secondary"
                          onClick={() => onViewBook(book.slug)}
                          className="text-xs"
                        >
                          Read
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => onArchiveBook(book.slug)}
                          className="text-xs"
                        >
                          Archive
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => {
                            if (confirm(`Remove "${book.title}" from your reading list?`)) {
                              onRemoveBook(book.slug);
                            }
                          }}
                          className="text-xs"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Quick Access Cards */}
            <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Quotes Access */}
              {onViewQuotes && getQuoteCount() > 0 && (
                <motion.button
                  onClick={onViewQuotes}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-6 rounded-lg bg-zinc-900/30 border-2 border-zinc-800/60
                           hover:border-[#ffb6d9]/40 hover:bg-zinc-900/50
                           transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <p className="font-serif text-lg text-[#ffb6d9] mb-1">
                        Saved Quotes
                      </p>
                      <p className="text-sm text-zinc-500 font-serif">
                        {getQuoteCount()} whispered {getQuoteCount() === 1 ? 'passage' : 'passages'}
                      </p>
                    </div>
                    <div className="text-3xl text-[#ffb6d9]/60 group-hover:text-[#ffb6d9] transition-colors">
                      "
                    </div>
                  </div>
                </motion.button>
              )}

              {/* Archive Access */}
              {archivedCount > 0 && (
                <motion.button
                  onClick={onViewArchive}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-6 rounded-lg bg-zinc-900/30 border-2 border-zinc-800/60
                           hover:border-[#ffb6d9]/40 hover:bg-zinc-900/50
                           transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <p className="font-serif text-lg text-[#ffb6d9] mb-1">
                        Archived Books
                      </p>
                      <p className="text-sm text-zinc-500 font-serif">
                        {archivedCount} {archivedCount === 1 ? 'book' : 'books'} archived
                      </p>
                    </div>
                    <div className="text-3xl text-[#ffb6d9]/60 group-hover:text-[#ffb6d9] transition-colors">
                      →
                    </div>
                  </div>
                </motion.button>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};
