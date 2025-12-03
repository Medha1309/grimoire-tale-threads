/**
 * Diary Module - Timeline Component
 * Shows last 7 entries in a horizontal scroll strip
 */

import React from 'react';
import { DiaryEntry } from '../types';
import { MOOD_CONFIG } from '../constants';

interface TimelineProps {
  entries: DiaryEntry[];
  onEntryClick: (entry: DiaryEntry) => void;
}

export const Timeline: React.FC<TimelineProps> = ({ entries, onEntryClick }) => {
  if (entries.length === 0) return null;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
        Recent Entries
      </h3>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300">
        {entries.slice(0, 7).map((entry) => {
          const moodConfig = MOOD_CONFIG[entry.mood];
          return (
            <button
              key={entry.id}
              onClick={() => onEntryClick(entry)}
              className="flex-shrink-0 w-32 p-3 rounded-lg border-2 hover:shadow-md transition-all text-left"
              style={{
                borderColor: moodConfig.color,
                backgroundColor: moodConfig.bg,
              }}
            >
              <div className="text-xs text-gray-600 mb-1">
                {formatDate(entry.createdAt)}
              </div>
              <div className="text-sm font-medium text-gray-900 truncate">
                {entry.headline || entry.title || 'Untitled'}
              </div>
              <div className="text-lg mt-1">{moodConfig.icon}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
