/**
 * DiaryFilterBar Component
 * Advanced filtering for diary entries
 */

import { memo } from 'react';
import { DiaryFilters, DiaryMood, MOOD_ICONS, MOOD_LABELS } from '../../types/diary';

interface DiaryFilterBarProps {
  filters: DiaryFilters;
  onFiltersChange: (filters: DiaryFilters) => void;
  showHidden: boolean;
  onToggleHidden: () => void;
}

const MOODS: DiaryMood[] = ['joy', 'sorrow', 'calm', 'unrest', 'secret'];

export const DiaryFilterBar = memo<DiaryFilterBarProps>(({
  filters,
  onFiltersChange,
  showHidden,
  onToggleHidden,
}) => {
  const handleMoodFilter = (mood: DiaryMood) => {
    onFiltersChange({
      ...filters,
      mood: filters.mood === mood ? undefined : mood,
    });
  };

  const handleFavoriteFilter = () => {
    onFiltersChange({
      ...filters,
      isFavorite: !filters.isFavorite,
    });
  };

  const handleSearchChange = (query: string) => {
    onFiltersChange({
      ...filters,
      searchQuery: query || undefined,
    });
  };

  const handleClearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = filters.mood || filters.isFavorite || filters.searchQuery;

  return (
    <div className="space-y-4 mb-8">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          value={filters.searchQuery || ''}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search your entries..."
          className="w-full px-4 py-3 pl-12 rounded-lg bg-black/40 border border-[#ffb6d9]/30 text-[#d8c4b0] placeholder-[#d8c4b0]/40 focus:outline-none focus:border-[#ffb6d9] focus:ring-2 focus:ring-[#ffb6d9]/20 transition-all"
        />
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#d8c4b0]/40">
          🔍
        </span>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Mood Filters */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#d8c4b0]/60">Mood:</span>
          {MOODS.map((mood) => (
            <button
              key={mood}
              onClick={() => handleMoodFilter(mood)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all ${
                filters.mood === mood
                  ? 'bg-[#ffb6d9]/30 border-[#ffb6d9] text-[#ffb6d9]'
                  : 'bg-black/20 border-[#ffb6d9]/20 text-[#d8c4b0] hover:border-[#ffb6d9]/40'
              } border`}
              title={MOOD_LABELS[mood]}
            >
              <span>{MOOD_ICONS[mood]}</span>
              <span className="hidden sm:inline">{MOOD_LABELS[mood]}</span>
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-[#ffb6d9]/20" />

        {/* Favorite Filter */}
        <button
          onClick={handleFavoriteFilter}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all ${
            filters.isFavorite
              ? 'bg-[#ffb6d9]/30 border-[#ffb6d9] text-[#ffb6d9]'
              : 'bg-black/20 border-[#ffb6d9]/20 text-[#d8c4b0] hover:border-[#ffb6d9]/40'
          } border`}
        >
          <span>{filters.isFavorite ? '⭐' : '☆'}</span>
          <span>Favorites</span>
        </button>

        {/* Hidden Toggle */}
        <button
          onClick={onToggleHidden}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-serif uppercase tracking-wider transition-all ${
            showHidden
              ? 'bg-[#ffb6d9]/30 border-[#ffb6d9] text-[#ffb6d9]'
              : 'bg-black/20 border-[#ffb6d9]/20 text-[#d8c4b0] hover:border-[#ffb6d9]/40'
          } border`}
        >
          <span>{showHidden ? 'Show' : 'Hide'} Hidden</span>
        </button>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <>
            <div className="h-6 w-px bg-[#ffb6d9]/20" />
            <button
              onClick={handleClearFilters}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 transition-all"
            >
              <span>×</span>
              <span>Clear Filters</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
});

DiaryFilterBar.displayName = 'DiaryFilterBar';
