/**
 * DiaryEntryCard Component
 * Premium glass-morphism card for diary entries
 */

import { memo } from 'react';
import { DiaryEntry } from '../../types/diary';
import { MOOD_ICONS, MOOD_LABELS } from '../../types/diary';
import { formatDistanceToNow } from 'date-fns';

interface DiaryEntryCardProps {
  entry: DiaryEntry;
  onEdit: (entry: DiaryEntry) => void;
  onDelete: (entryId: string) => void;
  onToggleHidden: (entryId: string) => void;
  onToggleFavorite: (entryId: string) => void;
  onClick: (entry: DiaryEntry) => void;
}

export const DiaryEntryCard = memo<DiaryEntryCardProps>(({
  entry,
  onEdit,
  onDelete,
  onToggleHidden,
  onToggleFavorite,
  onClick,
}) => {
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(entry);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this entry?')) {
      onDelete(entry.id);
    }
  };

  const handleToggleHidden = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleHidden(entry.id);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(entry.id);
  };

  const previewText = entry.isLocked 
    ? '🔒 Locked Entry' 
    : entry.content.slice(0, 150) + (entry.content.length > 150 ? '...' : '');

  return (
    <div
      onClick={() => onClick(entry)}
      className="group relative cursor-pointer transition-all duration-300"
      style={{
        background: 'linear-gradient(145deg, rgba(10, 10, 10, 0.95) 0%, rgba(5, 5, 5, 0.98) 50%, rgba(10, 10, 10, 0.95) 100%)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(176, 46, 46, 0.2)',
        borderRadius: '4px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.02)',
      }}
    >
      {/* Hover glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(176, 46, 46, 0.08) 0%, transparent 50%)',
          borderRadius: '4px',
          boxShadow: '0 0 20px rgba(176, 46, 46, 0.1)',
        }}
      />

      <div className="relative p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            {/* Mood Icon */}
            <span className="text-xl opacity-80" title={MOOD_LABELS[entry.mood]}>
              {MOOD_ICONS[entry.mood]}
            </span>
            
            {/* Indicators */}
            <div className="flex items-center gap-2">
              {entry.isLocked && (
                <span className="text-xs text-red-400/60" title="Locked">🔒</span>
              )}
              {entry.isFavorite && (
                <span className="text-xs text-amber-400/60" title="Favorite">⭐</span>
              )}
              {entry.isHidden && (
                <span className="text-xs text-zinc-600" title="Hidden">👁️</span>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={handleToggleFavorite}
              className="p-1.5 rounded hover:bg-zinc-800/50 transition-colors text-xs"
              title={entry.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <span className="text-sm">{entry.isFavorite ? '⭐' : '☆'}</span>
            </button>
            <button
              onClick={handleToggleHidden}
              className="px-2 py-1 rounded hover:bg-zinc-800/50 transition-colors text-[10px] font-mono uppercase tracking-wider text-zinc-500 hover:text-zinc-300"
              title={entry.isHidden ? 'Unhide' : 'Hide'}
            >
              {entry.isHidden ? 'Show' : 'Hide'}
            </button>
            <button
              onClick={handleEdit}
              className="px-2 py-1 rounded hover:bg-zinc-800/50 transition-colors text-[10px] font-mono uppercase tracking-wider text-zinc-500 hover:text-zinc-300"
              title="Edit"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-2 py-1 rounded hover:bg-red-900/30 transition-colors text-[10px] font-mono uppercase tracking-wider text-red-500/70 hover:text-red-400"
              title="Delete"
            >
              Delete
            </button>
          </div>
        </div>

        {/* Content Preview */}
        <p className="text-zinc-300 text-sm leading-relaxed mb-3 line-clamp-3 font-serif">
          {previewText}
        </p>

        {/* Tags */}
        {entry.tags && entry.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {entry.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-0.5 text-[10px] rounded font-mono"
                style={{
                  background: 'rgba(176, 46, 46, 0.15)',
                  color: '#b02e2e',
                  border: '1px solid rgba(176, 46, 46, 0.25)',
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between text-[10px] text-zinc-600 font-mono">
          <span>{formatDistanceToNow(entry.createdAt, { addSuffix: true })}</span>
          {entry.updatedAt.getTime() !== entry.createdAt.getTime() && (
            <span className="italic text-zinc-700">edited</span>
          )}
        </div>
      </div>

    </div>
  );
});

DiaryEntryCard.displayName = 'DiaryEntryCard';
