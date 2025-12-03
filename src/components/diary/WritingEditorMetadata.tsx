/**
 * WritingEditorMetadata Component
 * Metadata controls for mood, lock, and tools toggle
 */

import React from 'react';

interface WritingEditorMetadataProps {
  mood: 'joy' | 'sorrow' | 'calm' | 'unrest';
  isLocked: boolean;
  showEnhancements: boolean;
  onMoodChange: (mood: 'joy' | 'sorrow' | 'calm' | 'unrest') => void;
  onLockChange: (locked: boolean) => void;
  onToggleEnhancements: () => void;
}

const MOODS = ['joy', 'sorrow', 'calm', 'unrest'] as const;

export const WritingEditorMetadata: React.FC<WritingEditorMetadataProps> = ({
  mood,
  isLocked,
  showEnhancements,
  onMoodChange,
  onLockChange,
  onToggleEnhancements,
}) => {
  return (
    <div className="flex items-center gap-6 pb-6 border-b border-zinc-900/40">
      {/* Mood selector */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-zinc-600 font-serif">Mood:</span>
        <div className="flex gap-2">
          {MOODS.map((m) => (
            <button
              key={m}
              onClick={() => onMoodChange(m)}
              className={`px-3 py-1 rounded-full text-xs font-serif transition-all
                ${mood === m
                  ? 'bg-[#ffb6d9]/20 text-[#ffb6d9] border border-[#ffb6d9]/40'
                  : 'bg-zinc-900/50 text-zinc-500 border border-zinc-800/50 hover:border-zinc-700'
                }`}
            >
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Lock toggle */}
      <label className="flex items-center gap-2 text-xs text-zinc-600 font-serif cursor-pointer">
        <input
          type="checkbox"
          checked={isLocked}
          onChange={(e) => onLockChange(e.target.checked)}
          className="rounded border-zinc-700 bg-zinc-900 text-[#ffb6d9] focus:ring-[#ffb6d9]"
        />
        <span>Lock Entry</span>
      </label>

      {/* Toggle enhancements */}
      <button
        onClick={onToggleEnhancements}
        className="ml-auto text-xs text-zinc-600 hover:text-zinc-400 transition-colors font-serif"
      >
        {showEnhancements ? 'Hide' : 'Show'} Tools
      </button>
    </div>
  );
};
