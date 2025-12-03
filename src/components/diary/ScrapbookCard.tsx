/**
 * Scrapbook Card Component
 * Pinterest-style card for memory entries
 */

import React from 'react';
import { motion } from 'framer-motion';
import { ScrapbookEntry } from '../../types/scrapbook';

interface ScrapbookCardProps {
  entry: ScrapbookEntry;
  onClick: () => void;
}

export const ScrapbookCard: React.FC<ScrapbookCardProps> = ({
  entry,
  onClick,
}) => {
  const primaryPhoto = entry.photos?.[0];
  const hasMultiplePhotos = entry.photos && entry.photos.length > 1;

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="cursor-pointer rounded-2xl overflow-hidden bg-zinc-800/80 backdrop-blur-sm
                 border border-zinc-700/50 hover:border-[#ffb6d9]/50
                 shadow-lg hover:shadow-2xl hover:shadow-[#ffb6d9]/20
                 transition-all duration-300 group"
    >
      {/* Photo */}
      {primaryPhoto && (
        <div className="relative w-full overflow-hidden bg-zinc-900">
          <img
            src={primaryPhoto.image}
            alt={entry.title || 'Memory'}
            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Photo count badge */}
          {hasMultiplePhotos && (
            <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full text-xs font-serif
                          bg-black/70 backdrop-blur-md text-white border border-white/20">
              📷 {entry.photos.length}
            </div>
          )}

          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        {/* Date */}
        <div className="text-xs font-serif mb-2 text-[#ffb6d9]/80">
          {new Date(entry.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </div>

        {/* Title */}
        {entry.title && (
          <h3 className="text-base font-serif text-zinc-100 mb-2 line-clamp-2 font-semibold">
            {entry.title}
          </h3>
        )}

        {/* Thought */}
        {entry.thought && (
          <p className="text-sm font-serif text-zinc-300 line-clamp-3 mb-3 leading-relaxed">
            {entry.thought}
          </p>
        )}

        {/* Tags */}
        {entry.tags && entry.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {entry.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full text-xs font-serif
                         bg-[#ffb6d9]/10 text-[#ffb6d9] border border-[#ffb6d9]/30"
              >
                #{tag}
              </span>
            ))}
            {entry.tags.length > 3 && (
              <span className="px-2 py-0.5 rounded-full text-xs font-serif text-zinc-500">
                +{entry.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Metadata */}
        {(entry.mood || entry.location) && (
          <div className="flex items-center gap-3 pt-3 border-t border-zinc-700/50 text-xs font-serif text-zinc-500">
            {entry.mood && <span>💭 {entry.mood}</span>}
            {entry.location && <span>📍 {entry.location}</span>}
          </div>
        )}
      </div>
    </motion.div>
  );
};
