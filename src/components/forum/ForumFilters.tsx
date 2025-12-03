/**
 * ForumFilters Component
 * Genre tag filters and sort options for forum posts
 */

import React from 'react';
import { motion } from 'framer-motion';
import { FORUM_TAGS } from '../../types/forum';
import { ForumFilters as ForumFiltersType } from '../../types/forum';

interface ForumFiltersProps {
  filters: ForumFiltersType;
  onFiltersChange: (filters: ForumFiltersType) => void;
}

export const ForumFilters: React.FC<ForumFiltersProps> = ({ 
  filters, 
  onFiltersChange 
}) => {
  const toggleTag = (tag: string) => {
    const currentTags = filters.tags || [];
    const newTags = currentTags.includes(tag)
      ? currentTags.filter(t => t !== tag)
      : [...currentTags, tag];
    
    onFiltersChange({ ...filters, tags: newTags });
  };

  const setSortBy = (sortBy: 'recent' | 'popular' | 'active') => {
    onFiltersChange({ ...filters, sortBy });
  };

  const clearFilters = () => {
    onFiltersChange({ tags: [], sortBy: 'recent' });
  };

  const hasActiveFilters = (filters.tags && filters.tags.length > 0) || filters.sortBy !== 'recent';

  return (
    <div className="bg-zinc-900/40 border border-zinc-800 rounded-lg p-4 sm:p-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Sort Options */}
        <div className="flex items-center gap-3">
          <span className="text-zinc-400 font-inter text-xs uppercase tracking-widest">
            Sort by
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setSortBy('recent')}
              className={`px-4 py-2 rounded text-xs font-inter transition-all duration-300
                ${filters.sortBy === 'recent'
                  ? 'bg-[#6a0000] text-zinc-100 border-2 border-[#8B0000] shadow-[0_0_12px_-4px_rgba(106,0,0,0.5)]'
                  : 'text-zinc-400 border-2 border-transparent hover:text-zinc-100 hover:border-zinc-700'
                }`}
            >
              Newest
            </button>
            <button
              onClick={() => setSortBy('popular')}
              className={`px-4 py-2 rounded text-xs font-inter transition-all duration-300
                ${filters.sortBy === 'popular'
                  ? 'bg-[#6a0000] text-zinc-100 border-2 border-[#8B0000] shadow-[0_0_12px_-4px_rgba(106,0,0,0.5)]'
                  : 'text-zinc-400 border-2 border-transparent hover:text-zinc-100 hover:border-zinc-700'
                }`}
            >
              Trending
            </button>
          </div>
        </div>

        {/* Genre Tags */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-zinc-400 font-inter text-xs uppercase tracking-widest">
            Genre
          </span>
          {FORUM_TAGS.slice(0, 5).map(tag => {
            const isActive = filters.tags?.includes(tag);
            return (
              <motion.button
                key={tag}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1.5 rounded-full text-xs font-lora transition-all duration-300
                  relative
                  ${isActive
                    ? 'bg-[#6a0000]/30 text-zinc-100 border-2 border-[#8B0000] shadow-[0_0_15px_-5px_rgba(106,0,0,0.6)]'
                    : 'bg-zinc-800/30 text-zinc-400 border border-zinc-700 hover:border-zinc-600 hover:text-zinc-100'
                  }`}
                title={`Filter by ${tag}`}
              >
                {tag}
              </motion.button>
            );
          })}
          
          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-xs text-zinc-400 hover:text-[#8B0000] 
                         font-inter transition-colors ml-1 px-2"
              title="Clear all filters"
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
