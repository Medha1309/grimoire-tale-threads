/**
 * FilterChips Component
 * Visual filter chips with smooth transitions
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ForumFilters } from '../../types/forum';
import { FORUM_TAGS } from '../../types/forum';

interface FilterChipsProps {
  filters: ForumFilters;
  onFiltersChange: (filters: ForumFilters) => void;
}

export const FilterChips: React.FC<FilterChipsProps> = ({ filters, onFiltersChange }) => {
  const [_savedFilters, setSavedFilters] = useState<ForumFilters | null>(null);

  // Load saved filters from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('forumFilters');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSavedFilters(parsed);
      } catch (e) {
        // Ignore parse errors
      }
    }
  }, []);

  // Save filters to localStorage
  useEffect(() => {
    localStorage.setItem('forumFilters', JSON.stringify(filters));
  }, [filters]);

  const handleTagToggle = (tag: string) => {
    const currentTags = filters.tags || [];
    const newTags = currentTags.includes(tag)
      ? currentTags.filter(t => t !== tag)
      : [...currentTags, tag];
    
    onFiltersChange({ ...filters, tags: newTags.length > 0 ? newTags : undefined });
  };

  const handleSortChange = (sortBy: 'recent' | 'popular' | 'active') => {
    onFiltersChange({ ...filters, sortBy });
  };

  const clearFilters = () => {
    onFiltersChange({ sortBy: 'recent' });
  };

  const hasActiveFilters = (filters.tags && filters.tags.length > 0) || filters.sortBy !== 'recent';

  return (
    <div className="space-y-4">
      {/* Sort Options */}
      <div className="flex flex-wrap gap-2">
        <span className="text-xs text-zinc-500 font-serif self-center mr-2">Sort:</span>
        {(['recent', 'popular', 'active'] as const).map(sort => (
          <motion.button
            key={sort}
            onClick={() => handleSortChange(sort)}
            className="px-4 py-2 text-sm font-medium rounded transition-all"
            style={{
              background: filters.sortBy === sort 
                ? 'rgba(201, 184, 150, 0.15)' 
                : 'rgba(30, 20, 15, 0.4)',
              border: filters.sortBy === sort
                ? '1px solid rgba(201, 184, 150, 0.4)'
                : '1px solid rgba(139, 115, 85, 0.2)',
              color: filters.sortBy === sort ? '#c9b896' : '#8B7355',
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {sort.charAt(0).toUpperCase() + sort.slice(1)}
          </motion.button>
        ))}
      </div>

      {/* Tag Filters */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-zinc-500 font-serif">Filter by genre:</span>
          {hasActiveFilters && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={clearFilters}
              className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
            >
              Clear all
            </motion.button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <AnimatePresence mode="popLayout">
            {FORUM_TAGS.map(tag => {
              const isActive = filters.tags?.includes(tag);
              
              return (
                <motion.button
                  key={tag}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => handleTagToggle(tag)}
                  className="px-3 py-1.5 text-xs font-medium rounded transition-all"
                  style={{
                    background: isActive 
                      ? 'rgba(201, 184, 150, 0.2)' 
                      : 'rgba(30, 20, 15, 0.3)',
                    border: isActive
                      ? '1px solid rgba(201, 184, 150, 0.5)'
                      : '1px solid rgba(139, 115, 85, 0.15)',
                    color: isActive ? '#e8dcc8' : '#8B7355',
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    borderColor: 'rgba(201, 184, 150, 0.4)',
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isActive && <span className="mr-1">✓</span>}
                  {tag}
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Active Filters Summary */}
      <AnimatePresence>
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="pt-3 border-t border-zinc-800/30"
          >
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <span>Active filters:</span>
              <span className="text-zinc-400">
                {filters.sortBy !== 'recent' && `${filters.sortBy}`}
                {filters.tags && filters.tags.length > 0 && 
                  ` · ${filters.tags.length} genre${filters.tags.length > 1 ? 's' : ''}`
                }
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
