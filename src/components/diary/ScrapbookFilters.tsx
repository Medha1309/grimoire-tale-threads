/**
 * Scrapbook Filters Component
 * Search and filter controls
 */

import React from 'react';
import { motion } from 'framer-motion';
import { ScrapbookFilter, MediaType } from '../../types/scrapbook';
import { dollhouseTokens } from '../../design-system/dollhouse-tokens';

interface ScrapbookFiltersProps {
  filter: ScrapbookFilter;
  setFilter: (filter: ScrapbookFilter) => void;
  allTags: string[];
  totalCount: number;
}

export const ScrapbookFilters: React.FC<ScrapbookFiltersProps> = ({
  filter,
  setFilter,
  allTags,
  totalCount,
}) => {
  const mediaTypes: { value: MediaType | undefined; label: string }[] = [
    { value: undefined, label: 'All' },
    { value: 'photo', label: 'Photos' },
    { value: 'gif', label: 'GIFs' },
    { value: 'video', label: 'Videos' },
  ];

  return (
    <div className="mb-8 space-y-4">
      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search memories..."
          value={filter.searchQuery}
          onChange={(e) =>
            setFilter({ ...filter, searchQuery: e.target.value })
          }
          className="w-full px-4 py-3 rounded-lg font-serif text-sm
                   bg-zinc-900/60 backdrop-blur-sm
                   text-zinc-100 placeholder-zinc-500
                   border focus:outline-none
                   transition-all duration-300"
          style={{
            borderColor: dollhouseTokens.colors.pink.border,
          }}
        />
        <div
          className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-serif"
          style={{ color: dollhouseTokens.colors.neutral.text.tertiary }}
        >
          {totalCount} {totalCount === 1 ? 'memory' : 'memories'}
        </div>
      </div>

      {/* Media Type Filter */}
      <div className="flex flex-wrap gap-2">
        {mediaTypes.map((type) => (
          <motion.button
            key={type.label}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter({ ...filter, mediaType: type.value })}
            className="px-4 py-2 rounded-lg font-serif text-sm transition-all duration-300"
            style={{
              backgroundColor:
                filter.mediaType === type.value
                  ? 'rgba(255, 182, 217, 0.2)'
                  : 'rgba(10, 10, 10, 0.6)',
              color:
                filter.mediaType === type.value
                  ? dollhouseTokens.colors.pink.primary
                  : dollhouseTokens.colors.neutral.text.secondary,
              border: `1px solid ${
                filter.mediaType === type.value
                  ? dollhouseTokens.colors.pink.border
                  : 'rgba(255, 182, 217, 0.1)'
              }`,
            }}
          >
            {type.label}
          </motion.button>
        ))}
      </div>

      {/* Tags */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => {
            const isSelected = filter.selectedTags.includes(tag);
            return (
              <motion.button
                key={tag}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const newTags = isSelected
                    ? filter.selectedTags.filter((t: string) => t !== tag)
                    : [...filter.selectedTags, tag];
                  setFilter({ ...filter, selectedTags: newTags });
                }}
                className="px-3 py-1.5 rounded-md font-serif text-xs transition-all duration-300"
                style={{
                  backgroundColor: isSelected
                    ? 'rgba(255, 182, 217, 0.2)'
                    : 'rgba(10, 10, 10, 0.4)',
                  color: isSelected
                    ? dollhouseTokens.colors.pink.primary
                    : dollhouseTokens.colors.neutral.text.secondary,
                  border: `1px solid ${
                    isSelected
                      ? dollhouseTokens.colors.pink.border
                      : 'rgba(255, 182, 217, 0.1)'
                  }`,
                }}
              >
                {tag}
              </motion.button>
            );
          })}
        </div>
      )}

      {/* Active filters indicator */}
      {(filter.searchQuery ||
        filter.selectedTags.length > 0 ||
        filter.mediaType) && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() =>
            setFilter({
              searchQuery: '',
              selectedTags: [],
              mediaType: undefined,
            })
          }
          className="text-sm font-serif px-4 py-2 rounded-lg transition-all duration-300"
          style={{
            color: dollhouseTokens.colors.pink.primary,
            backgroundColor: 'rgba(255, 182, 217, 0.1)',
            border: `1px solid ${dollhouseTokens.colors.pink.border}`,
          }}
        >
          Clear filters
        </motion.button>
      )}
    </div>
  );
};
