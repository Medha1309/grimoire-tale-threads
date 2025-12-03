import React from 'react';
import { ProjectStatus } from '../../types/collaborativeStory';

// Simple icon components
const Search = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const X = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

interface ProjectFiltersProps {
  status?: ProjectStatus;
  genre?: string;
  searchTerm?: string;
  onStatusChange: (status?: ProjectStatus) => void;
  onGenreChange: (genre?: string) => void;
  onSearchChange: (search: string) => void;
  onClear: () => void;
}

import { GENRE_CONFIG, PROJECT_CONFIG } from '../../config/taleThreads';

const GENRES = GENRE_CONFIG.genres;
const STATUSES = PROJECT_CONFIG.statuses;

export const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  status,
  genre,
  searchTerm,
  onStatusChange,
  onGenreChange,
  onSearchChange,
  onClear,
}) => {
  const hasActiveFilters = status || genre || searchTerm;

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
        <input
          type="text"
          placeholder="Search projects by title or author..."
          value={searchTerm || ''}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-black/30 border border-lime-500/30 
                   rounded-lg text-lime-100 placeholder-stone-500
                   focus:outline-none focus:ring-2 focus:ring-lime-500/50
                   transition-all"
        />
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap gap-3 items-center">
        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-stone-400">Status:</span>
          <select
            value={status || ''}
            onChange={(e) => onStatusChange((e.target.value as ProjectStatus) || undefined)}
            className="px-3 py-2 bg-black/30 border border-lime-500/30 rounded
                     text-lime-100 text-sm focus:outline-none focus:ring-2 
                     focus:ring-lime-500/50 cursor-pointer"
          >
            <option value="">All</option>
            {STATUSES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        {/* Genre Filter */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-stone-400">Genre:</span>
          <select
            value={genre || ''}
            onChange={(e) => onGenreChange(e.target.value || undefined)}
            className="px-3 py-2 bg-black/30 border border-lime-500/30 rounded
                     text-lime-100 text-sm focus:outline-none focus:ring-2 
                     focus:ring-lime-500/50 cursor-pointer"
          >
            <option value="">All</option>
            {GENRES.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={onClear}
            className="flex items-center gap-1 px-3 py-2 text-sm text-stone-400 
                     hover:text-lime-400 transition-colors"
          >
            <X className="w-4 h-4" />
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
};
