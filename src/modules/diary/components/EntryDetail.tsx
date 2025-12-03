/**
 * Diary Module - Entry Detail Component
 * Full view of a single diary entry
 */

import React from 'react';
import { DiaryEntry } from '../types';
import { MOOD_CONFIG, STICKER_LIBRARY } from '../constants';

interface EntryDetailProps {
  entry: DiaryEntry;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onToggleFavorite: () => void;
}

export const EntryDetail: React.FC<EntryDetailProps> = ({
  entry,
  onClose,
  onEdit,
  onDelete,
  onToggleFavorite,
}) => {
  const moodConfig = MOOD_CONFIG[entry.mood];

  const formatFullDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-lg shadow-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div
          className="px-6 py-4 border-b"
          style={{ backgroundColor: moodConfig.bg }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              {entry.headline && (
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  {entry.headline}
                </h2>
              )}
              {entry.title && (
                <p className="text-lg text-gray-700">{entry.title}</p>
              )}
              <p className="text-sm text-gray-600 mt-2">
                {formatFullDate(entry.createdAt)}
              </p>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={onToggleFavorite}
                className="text-2xl hover:scale-110 transition-transform"
                aria-label={entry.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                {entry.isFavorite ? '⭐' : '☆'}
              </button>
              <span className="text-2xl" title={moodConfig.label}>
                {moodConfig.icon}
              </span>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-2xl"
                aria-label="Close"
              >
                ×
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="prose max-w-none">
            <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
              {entry.content}
            </p>
          </div>

          {/* Stickers */}
          {entry.stickers.length > 0 && (
            <div className="mt-6 pt-6 border-t">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Stickers</h3>
              <div className="flex flex-wrap gap-2">
                {entry.stickers.map((stickerId) => {
                  const sticker = STICKER_LIBRARY.find(s => s.id === stickerId);
                  return sticker ? (
                    <div
                      key={stickerId}
                      className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg"
                    >
                      <span className="text-2xl">{sticker.emoji}</span>
                      <span className="text-sm text-gray-600">{sticker.label}</span>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          )}

          {/* Tags */}
          {entry.tags.length > 0 && (
            <div className="mt-6 pt-6 border-t">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {entry.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t bg-gray-50 flex items-center justify-between">
          <button
            onClick={() => {
              if (confirm('Delete this entry? This cannot be undone.')) {
                onDelete();
                onClose();
              }
            }}
            className="px-4 py-2 text-red-600 hover:text-red-700 font-medium"
          >
            Delete Entry
          </button>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
            <button
              onClick={onEdit}
              className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Edit Entry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
