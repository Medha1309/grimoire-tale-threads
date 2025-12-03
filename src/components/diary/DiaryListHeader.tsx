import React from 'react';
import { DollhouseBackButton, DollhouseButton } from './shared/DollhouseButton';

type LayoutType = 'book' | 'list' | 'grid';

interface DiaryListHeaderProps {
  onBack: () => void;
  onWrite: () => void;
  layout: LayoutType;
  onLayoutChange: (layout: LayoutType) => void;
  hasEntries: boolean;
}

export const DiaryListHeader: React.FC<DiaryListHeaderProps> = ({
  onBack,
  onWrite,
  layout,
  onLayoutChange,
  hasEntries,
}) => {
  return (
    <header className="mb-12 border-b border-[#ffb6d9]/20 pb-6">
      <div className="flex items-center justify-between mb-4">
        <DollhouseBackButton onClick={onBack} label="Back to Dollhouse" />
        <h2 className="font-serif text-3xl tracking-[0.2em] uppercase text-[#ffb6d9]/90">My Diary</h2>
        <DollhouseButton onClick={onWrite} variant="primary" size="sm">
          Write
        </DollhouseButton>
      </div>

      {/* Layout switcher */}
      {hasEntries && (
        <div className="flex items-center justify-center gap-2">
          <span className="text-xs text-zinc-600 font-serif mr-2">View:</span>
          <button
            onClick={() => onLayoutChange('book')}
            className={`px-3 py-1.5 rounded text-xs font-serif uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
              layout === 'book'
                ? 'bg-[#ffb6d9]/20 text-[#ffb6d9] border border-[#ffb6d9]/40'
                : 'bg-zinc-900/50 text-zinc-500 border border-zinc-800 hover:text-zinc-300'
            }`}
          >
            <svg viewBox="0 0 16 16" className="w-3 h-3" fill="none">
              <rect
                x="3"
                y="2"
                width="10"
                height="12"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="currentColor"
                fillOpacity="0.1"
                rx="1"
              />
              <line x1="3" y1="5" x2="13" y2="5" stroke="currentColor" strokeWidth="1" />
            </svg>
            Book
          </button>
          <button
            onClick={() => onLayoutChange('list')}
            className={`px-3 py-1.5 rounded text-xs font-serif uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
              layout === 'list'
                ? 'bg-[#ffb6d9]/20 text-[#ffb6d9] border border-[#ffb6d9]/40'
                : 'bg-zinc-900/50 text-zinc-500 border border-zinc-800 hover:text-zinc-300'
            }`}
          >
            <svg viewBox="0 0 16 16" className="w-3 h-3" fill="none">
              <line x1="2" y1="4" x2="14" y2="4" stroke="currentColor" strokeWidth="1.5" />
              <line x1="2" y1="8" x2="14" y2="8" stroke="currentColor" strokeWidth="1.5" />
              <line x1="2" y1="12" x2="14" y2="12" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            List
          </button>
          <button
            onClick={() => onLayoutChange('grid')}
            className={`px-3 py-1.5 rounded text-xs font-serif uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
              layout === 'grid'
                ? 'bg-[#ffb6d9]/20 text-[#ffb6d9] border border-[#ffb6d9]/40'
                : 'bg-zinc-900/50 text-zinc-500 border border-zinc-800 hover:text-zinc-300'
            }`}
          >
            <svg viewBox="0 0 16 16" className="w-3 h-3" fill="none">
              <rect
                x="2"
                y="2"
                width="5"
                height="5"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="currentColor"
                fillOpacity="0.1"
              />
              <rect
                x="9"
                y="2"
                width="5"
                height="5"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="currentColor"
                fillOpacity="0.1"
              />
              <rect
                x="2"
                y="9"
                width="5"
                height="5"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="currentColor"
                fillOpacity="0.1"
              />
              <rect
                x="9"
                y="9"
                width="5"
                height="5"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="currentColor"
                fillOpacity="0.1"
              />
            </svg>
            Grid
          </button>
        </div>
      )}
    </header>
  );
};
