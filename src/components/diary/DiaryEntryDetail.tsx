/**
 * DiaryEntryDetail Component
 * Full view of a diary entry
 */

import { memo } from 'react';
import { DiaryEntry } from '../../types/diary';
import { MOOD_ICONS, MOOD_LABELS } from '../../types/diary';
import { format } from 'date-fns';
import { Button } from '../shared/Button';

interface DiaryEntryDetailProps {
  entry: DiaryEntry;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onToggleHidden: () => void;
  onToggleFavorite: () => void;
}

export const DiaryEntryDetail = memo<DiaryEntryDetailProps>(({
  entry,
  onBack,
  onEdit,
  onDelete,
  onToggleHidden,
  onToggleFavorite,
}) => {
  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this entry?')) {
      onDelete();
    }
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 px-6 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            onClick={onBack}
            variant="secondary"
            size="md"
            className="mb-6"
          >
            ← Back to Diary
          </Button>

          <div
            className="p-8 rounded-lg"
            style={{
              background: 'linear-gradient(145deg, rgba(30, 24, 20, 0.95) 0%, rgba(20, 16, 14, 0.98) 50%, rgba(30, 24, 20, 0.95) 100%)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 182, 217, 0.25)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
            }}
          >
            {/* Metadata */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl" title={MOOD_LABELS[entry.mood]}>
                  {MOOD_ICONS[entry.mood]}
                </span>
                <div>
                  <h2 className="text-xl font-serif text-[#f5e8dc] mb-1">
                    {MOOD_LABELS[entry.mood]} Entry
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-[#d8c4b0]/60">
                    <span>{format(entry.createdAt, 'MMMM d, yyyy')}</span>
                    <span>•</span>
                    <span>{format(entry.createdAt, 'h:mm a')}</span>
                    {entry.updatedAt.getTime() !== entry.createdAt.getTime() && (
                      <>
                        <span>•</span>
                        <span className="italic">edited</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Indicators */}
              <div className="flex items-center gap-1.5 text-base">
                {entry.isLocked && <span title="Locked" className="opacity-70">🔒</span>}
                {entry.isFavorite && <span title="Favorite" className="opacity-70">⭐</span>}
                {entry.isHidden && <span title="Hidden" className="opacity-40">👁️</span>}
              </div>
            </div>

            {/* Tags */}
            {entry.tags && entry.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-6">
                {entry.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 text-xs rounded"
                    style={{
                      background: 'rgba(255, 182, 217, 0.12)',
                      color: '#ffb6d9',
                      border: '1px solid rgba(255, 182, 217, 0.2)',
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Content */}
            <div className="prose prose-invert max-w-none">
              <div className="text-[#d8c4b0] leading-relaxed whitespace-pre-wrap">
                {entry.isLocked ? (
                  <div className="text-center py-12">
                    <div className="text-4xl mb-3 opacity-60">🔒</div>
                    <p className="text-[#d8c4b0]/50">
                      This entry is locked
                    </p>
                  </div>
                ) : (
                  entry.content
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-[#ffb6d9]/20">
              <Button
                onClick={onToggleFavorite}
                variant="secondary"
                size="md"
              >
                {entry.isFavorite ? '⭐ Remove from Favorites' : '☆ Add to Favorites'}
              </Button>
              <Button
                onClick={onToggleHidden}
                variant="secondary"
                size="md"
              >
                {entry.isHidden ? '👁️ Unhide' : '🙈 Hide'}
              </Button>
              <Button
                onClick={onEdit}
                variant="secondary"
                size="md"
              >
                ✏️ Edit
              </Button>
              <Button
                onClick={handleDelete}
                variant="secondary"
                size="md"
                className="ml-auto hover:bg-red-500/20 hover:border-red-500/30 hover:text-red-400"
              >
                🗑️ Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

DiaryEntryDetail.displayName = 'DiaryEntryDetail';
