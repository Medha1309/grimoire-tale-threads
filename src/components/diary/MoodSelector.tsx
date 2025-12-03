import { memo } from 'react';

type Mood = 'joy' | 'sorrow' | 'calm' | 'unrest';

interface MoodSelectorProps {
  selectedMood: Mood;
  onMoodChange: (mood: Mood) => void;
  isLocked: boolean;
  onLockToggle: (locked: boolean) => void;
}

export const MoodSelector = memo<MoodSelectorProps>(({
  selectedMood,
  onMoodChange,
  isLocked,
  onLockToggle,
}) => {
  const moods: Mood[] = ['joy', 'sorrow', 'calm', 'unrest'];

  return (
    <>
      {/* Mood selector */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-zinc-600 font-serif">Mood:</span>
        <div className="flex gap-2">
          {moods.map((mood) => (
            <button
              key={mood}
              onClick={() => onMoodChange(mood)}
              className={`px-3 py-1 rounded-full text-xs font-serif transition-all
                ${selectedMood === mood
                  ? 'bg-[#ffb6d9]/20 text-[#ffb6d9] border border-[#ffb6d9]/40'
                  : 'bg-zinc-900/50 text-zinc-500 border border-zinc-800/50 hover:border-zinc-700'
                }`}
            >
              {mood.charAt(0).toUpperCase() + mood.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      {/* Lock toggle */}
      <label className="flex items-center gap-2 text-xs text-zinc-600 font-serif cursor-pointer">
        <input
          type="checkbox"
          checked={isLocked}
          onChange={(e) => onLockToggle(e.target.checked)}
          className="rounded border-zinc-700 bg-zinc-900 text-[#ffb6d9] focus:ring-[#ffb6d9]"
        />
        <span>Lock Entry</span>
      </label>
    </>
  );
});

MoodSelector.displayName = 'MoodSelector';
