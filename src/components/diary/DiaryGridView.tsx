/**
 * DiaryGridView Component
 * Responsive masonry grid layout for diary entries
 */

import { memo } from 'react';
import { DiaryEntry } from '../../types/diary';
import { DiaryEntryCard } from './DiaryEntryCard';
import { LoadingSkeleton } from '../shared/LoadingSkeleton';

interface DiaryGridViewProps {
  entries: DiaryEntry[];
  loading: boolean;
  onEntryClick: (entry: DiaryEntry) => void;
  onEdit: (entry: DiaryEntry) => void;
  onDelete: (entryId: string) => void;
  onToggleHidden: (entryId: string) => void;
  onToggleFavorite: (entryId: string) => void;
}

export const DiaryGridView = memo<DiaryGridViewProps>(({
  entries,
  loading,
  onEntryClick,
  onEdit,
  onDelete,
  onToggleHidden,
  onToggleFavorite,
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <LoadingSkeleton key={i} className="h-64 rounded-lg" />
        ))}
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">📖</div>
        <h3 className="text-2xl font-serif text-[#d8c4b0] mb-2">
          No entries found
        </h3>
        <p className="text-[#d8c4b0]/60">
          Try adjusting your filters or create a new entry
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
      {entries.map((entry) => (
        <DiaryEntryCard
          key={entry.id}
          entry={entry}
          onClick={onEntryClick}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleHidden={onToggleHidden}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
});

DiaryGridView.displayName = 'DiaryGridView';
