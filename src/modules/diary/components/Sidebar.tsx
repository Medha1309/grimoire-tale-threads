/**
 * Diary Module - Sidebar Component
 * Navigation and filters
 */

import React from 'react';
import { DiaryStats } from '../types';
import { MOOD_CONFIG } from '../constants';

interface SidebarProps {
  stats: DiaryStats;
  onNewEntry: () => void;
  onFilterMood: (mood: string | null) => void;
  onShowFavorites: () => void;
  selectedMood: string | null;
  showingFavorites: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  stats,
  onNewEntry,
  onFilterMood,
  onShowFavorites,
  selectedMood,
  showingFavorites,
}) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4 space-y-6">
      {/* New Entry Button */}
      <button
        onClick={onNewEntry}
        className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        + New Entry
      </button>

      {/* Stats */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
          Statistics
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Total Entries</span>
            <span className="font-medium text-gray-900">{stats.totalEntries}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">This Week</span>
            <span className="font-medium text-gray-900">{stats.entriesThisWeek}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Favorites</span>
            <span className="font-medium text-gray-900">{stats.favoriteCount}</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
          Filters
        </h3>
        
        {/* All Entries */}
        <button
          onClick={() => {
            onFilterMood(null);
            if (showingFavorites) onShowFavorites();
          }}
          className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
            !selectedMood && !showingFavorites
              ? 'bg-gray-100 text-gray-900 font-medium'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          All Entries
        </button>

        {/* Favorites */}
        <button
          onClick={onShowFavorites}
          className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
            showingFavorites
              ? 'bg-gray-100 text-gray-900 font-medium'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          ⭐ Favorites
        </button>

        {/* Mood Filters */}
        <div className="pt-2 space-y-1">
          {Object.entries(MOOD_CONFIG).map(([mood, config]) => {
            const count = stats.moodDistribution[mood as keyof typeof stats.moodDistribution] || 0;
            return (
              <button
                key={mood}
                onClick={() => onFilterMood(mood)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                  selectedMood === mood
                    ? 'font-medium'
                    : 'hover:bg-gray-50'
                }`}
                style={{
                  backgroundColor: selectedMood === mood ? config.bg : undefined,
                  color: selectedMood === mood ? config.color : undefined,
                }}
              >
                <span className="flex items-center gap-2">
                  <span>{config.icon}</span>
                  <span>{config.label}</span>
                </span>
                <span className="text-xs opacity-60">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Keyboard Shortcuts */}
      <div className="pt-6 border-t space-y-2">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Shortcuts
        </h3>
        <div className="text-xs text-gray-600 space-y-1">
          <div><kbd className="px-1.5 py-0.5 bg-gray-100 rounded">Ctrl+S</kbd> Save</div>
          <div><kbd className="px-1.5 py-0.5 bg-gray-100 rounded">Shift+Enter</kbd> New</div>
          <div><kbd className="px-1.5 py-0.5 bg-gray-100 rounded">Esc</kbd> Cancel</div>
        </div>
      </div>
    </div>
  );
};
