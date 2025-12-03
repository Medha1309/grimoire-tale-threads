/**
 * Diary Timeline - Recent Entries Strip
 * Shows last 7 entries in horizontal scroll
 */

import React from 'react';
import { DiaryEntry, MOOD_COLORS, MOOD_ICONS } from '../../types/diary';

interface DiaryTimelineProps {
  entries: DiaryEntry[];
  onEntryClick: (entry: DiaryEntry) => void;
}

export const DiaryTimeline: React.FC<DiaryTimelineProps> = ({ entries, onEntryClick }) => {
  if (entries.length === 0) return null;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const recentEntries = entries.slice(0, 7);

  return (
    <div className="mb-8 p-4 bg-zinc-900/30 border border-pink-500/20 rounded-lg">
      <h3 className="text-xs font-semibold text-pink-400 uppercase tracking-wide mb-3">
        Recent Confessions
      </h3>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-pink-500/30 scrollbar-track-zinc-800/30">
        {recentEntries.map((entry) => {
          const moodColor = MOOD_COLORS[entry.mood];
          const moodIcon = MOOD_ICONS[entry.mood];
          
          return (
            <button
              key={entry.id}
              onClick={() => onEntryClick(entry)}
              className="flex-shrink-0 w-32 p-3 rounded-lg border-2 hover:shadow-lg hover:scale-105 transition-all text-left bg-zinc-900/50"
              style={{
                borderColor: moodColor,
              }}
            >
              <div className="text-xs text-zinc-400 mb-1">
                {formatDate(entry.createdAt)}
              </div>
              <div className="text-sm font-medium text-zinc-100 truncate">
                {entry.headline || 'Untitled'}
              </div>
              <div className="text-lg mt-1">{moodIcon}</div>
              {entry.stickers && entry.stickers.length > 0 && (
                <div className="text-xs mt-1 opacity-70">
                  {entry.stickers.slice(0, 3).map((stickerId) => {
                    const sticker = require('../../types/diary').STICKER_LIBRARY.find((s: any) => s.id === stickerId);
                    return sticker ? sticker.emoji : '';
                  }).join(' ')}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
