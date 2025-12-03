/**
 * Scrapbook Detail Modal
 * Full view of a memory entry
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ScrapbookEntry } from '../../types/scrapbook';
import { dollhouseTokens } from '../../design-system/dollhouse-tokens';

interface ScrapbookDetailProps {
  entry: ScrapbookEntry;
  onClose: () => void;
  onUpdate: (updates: Partial<ScrapbookEntry>) => void;
  onDelete: () => void;
}

export const ScrapbookDetail: React.FC<ScrapbookDetailProps> = ({
  entry,
  onClose,
  onDelete,
}) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl border"
        style={{
          backgroundColor: 'rgba(10, 10, 10, 0.95)',
          borderColor: dollhouseTokens.colors.pink.border,
          boxShadow: dollhouseTokens.shadows.card.hover,
        }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b backdrop-blur-md"
             style={{
               backgroundColor: 'rgba(10, 10, 10, 0.9)',
               borderColor: dollhouseTokens.colors.pink.border,
             }}>
          <div>
            <div
              className="text-sm font-serif mb-1"
              style={{ color: dollhouseTokens.colors.pink.primary }}
            >
              {new Date(entry.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </div>
            <h2 className="text-2xl font-serif text-zinc-100">
              {entry.title}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowDeleteConfirm(true)}
              className="p-2 rounded-lg text-red-400 hover:bg-red-400/10 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 rounded-lg text-zinc-400 hover:bg-zinc-800 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Photo Gallery */}
        {entry.photos && entry.photos.length > 0 && (
          <div className="relative">
            <div className="aspect-video bg-zinc-900/50 flex items-center justify-center">
              <img
                src={entry.photos[currentMediaIndex]?.image}
                alt={entry.title || 'Memory'}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Photo navigation */}
            {entry.photos.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setCurrentMediaIndex(
                      (currentMediaIndex - 1 + entry.photos.length) %
                        entry.photos.length
                    )
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 text-white hover:bg-black/90 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() =>
                    setCurrentMediaIndex(
                      (currentMediaIndex + 1) % entry.photos.length
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 text-white hover:bg-black/90 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {entry.photos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentMediaIndex(index)}
                      className="w-2 h-2 rounded-full transition-all"
                      style={{
                        backgroundColor:
                          index === currentMediaIndex
                            ? dollhouseTokens.colors.pink.primary
                            : 'rgba(255, 255, 255, 0.3)',
                      }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Thought */}
          <div>
            <h3
              className="text-sm font-serif mb-2"
              style={{ color: dollhouseTokens.colors.pink.primary }}
            >
              Thoughts
            </h3>
            <p className="text-base font-serif text-zinc-300 leading-relaxed whitespace-pre-wrap">
              {entry.thought}
            </p>
          </div>

          {/* Metadata */}
          {(entry.mood || entry.location) && (
            <div className="flex flex-wrap gap-4">
              {entry.mood && (
                <div>
                  <div className="text-xs font-serif text-zinc-500 mb-1">
                    Mood
                  </div>
                  <div className="text-sm font-serif text-zinc-300">
                    {entry.mood}
                  </div>
                </div>
              )}
              {entry.location && (
                <div>
                  <div className="text-xs font-serif text-zinc-500 mb-1">
                    Location
                  </div>
                  <div className="text-sm font-serif text-zinc-300">
                    {entry.location}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tags */}
          {entry.tags && entry.tags.length > 0 && (
            <div>
              <h3
                className="text-sm font-serif mb-2"
                style={{ color: dollhouseTokens.colors.pink.primary }}
              >
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {entry.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-md text-sm font-serif"
                    style={{
                      backgroundColor: 'rgba(255, 182, 217, 0.1)',
                      color: dollhouseTokens.colors.pink.primary,
                      border: `1px solid ${dollhouseTokens.colors.pink.border}`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Delete Confirmation */}
        {showDeleteConfirm && (
          <div className="p-6 border-t" style={{ borderColor: dollhouseTokens.colors.pink.border }}>
            <p className="text-sm font-serif text-zinc-300 mb-4">
              Are you sure you want to delete this memory? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg font-serif text-sm bg-red-500/20 text-red-400 border border-red-500/40 hover:bg-red-500/30 transition-colors"
              >
                Delete
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 rounded-lg font-serif text-sm bg-zinc-800 text-zinc-300 border border-zinc-700 hover:bg-zinc-700 transition-colors"
              >
                Cancel
              </motion.button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};
