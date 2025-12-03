/**
 * Diary Module - Entry Card Component
 * Displays a single diary entry in list/grid view
 */

import React from 'react';
import { DiaryEntry } from '../types';
import { MOOD_CONFIG, STICKER_LIBRARY } from '../constants';

interface EntryCardProps {
  entry: DiaryEntry;
  onClick: () => void;
  onDelete: () => void;
  onToggleFavorite: () => void;
}

export const EntryCard: React.FC<EntryCardProps> = ({
  entry,
  onClick,
  onDelete,
  onToggleFavorite,
}) => {
  const moodConfig = MOOD_CONFIG[entry.mood];
  
  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    });
  };

  const truncateContent = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  return (
    <div
      className="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      {/* Mood indicator bar */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ backgroundColor: moodConfig.color }}
      />

      <div className="p-4 space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            {entry.headline && (
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {entry.headline}
              </h3>
            )}
            {entry.title && (
              <p className="text-sm text-gray-600 truncate">{entry.title}</p>
            )}
          </div>
          
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Favorite button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite();
              }}
              className="text-xl hover:scale-110 transition-transform"
              aria-label={entry.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              {entry.isFavorite ? '⭐' : '☆'}
            </button>
            
            {/* Mood icon */}
            <span className="text-xl" title={moodConfig.label}>
              {moodConfig.icon}
            </span>
          </div>
        </div>

        {/* Content preview */}
        <p className="text-sm text-gray-700 line-clamp-3">
          {truncateContent(entry.content)}
        </p>

        {/* Stickers */}
        {entry.stickers.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {entry.stickers.slice(0, 5).map((stickerId) => {
              const sticker = STICKER_LIBRARY.find(s => s.id === stickerId);
              return sticker ? (
                <span key={stickerId} className="text-lg">
                  {sticker.emoji}
                </span>
              ) : null;
            })}
            {entry.stickers.length > 5 && (
              <span className="text-sm text-gray-500">+{entry.stickers.length - 5}</span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t">
          <span>{formatDate(entry.createdAt)}</span>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (confirm('Delete this entry? This cannot be undone.')) {
                onDelete();
              }
            }}
            className="text-red-600 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
