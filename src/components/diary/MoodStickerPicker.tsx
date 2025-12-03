/**
 * Mood Sticker Picker - Gothic themed
 * Allows users to add stickers to diary entries
 */

import React, { useState } from 'react';
import { STICKER_LIBRARY, MoodSticker } from '../../types/diary';

interface MoodStickerPickerProps {
  selectedStickers: string[];
  onToggleSticker: (stickerId: string) => void;
}

export const MoodStickerPicker: React.FC<MoodStickerPickerProps> = ({
  selectedStickers,
  onToggleSticker,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [activeCategory, setActiveCategory] = useState<MoodSticker['category'] | 'all'>('all');

  const filteredStickers = activeCategory === 'all'
    ? STICKER_LIBRARY
    : STICKER_LIBRARY.filter(s => s.category === activeCategory);

  return (
    <div className="space-y-3">
      {/* Toggle Button */}
      <button
        type="button"
        onClick={() => setShowPicker(!showPicker)}
        className="text-sm text-pink-400 hover:text-pink-300 transition-colors font-medium"
      >
        {showPicker ? '− Hide Stickers' : '+ Add Mood Stickers'}
      </button>

      {/* Sticker Picker */}
      {showPicker && (
        <div className="bg-zinc-900/50 border border-pink-500/20 rounded-lg p-4 space-y-3">
          {/* Category Tabs */}
          <div className="flex gap-2 flex-wrap">
            {(['all', 'emotion', 'weather', 'activity', 'misc'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 text-xs rounded-full transition-all ${
                  activeCategory === cat
                    ? 'bg-pink-500/30 text-pink-300 border border-pink-500/50'
                    : 'bg-zinc-800/50 text-zinc-400 hover:text-zinc-300 border border-zinc-700/50'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {/* Sticker Grid */}
          <div className="grid grid-cols-10 gap-2">
            {filteredStickers.map((sticker) => (
              <button
                key={sticker.id}
                type="button"
                onClick={() => onToggleSticker(sticker.id)}
                className={`text-2xl p-2 rounded-lg transition-all hover:scale-110 ${
                  selectedStickers.includes(sticker.id)
                    ? 'bg-pink-500/20 ring-2 ring-pink-500/50 shadow-lg shadow-pink-500/20'
                    : 'bg-zinc-800/30 hover:bg-zinc-800/50'
                }`}
                title={sticker.label}
              >
                {sticker.emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Selected Stickers Display */}
      {selectedStickers.length > 0 && (
        <div className="flex flex-wrap gap-2 p-3 bg-zinc-900/30 border border-pink-500/10 rounded-lg">
          {selectedStickers.map((id) => {
            const sticker = STICKER_LIBRARY.find(s => s.id === id);
            return sticker ? (
              <span key={id} className="text-xl animate-pulse">
                {sticker.emoji}
              </span>
            ) : null;
          })}
        </div>
      )}
    </div>
  );
};
