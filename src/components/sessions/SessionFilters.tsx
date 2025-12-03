/**
 * SessionFilters - Filter and sort controls for sessions
 */

import React from 'react';
import { SessionFilter, SessionSort } from '../../types/reflectionSession';
import { parlourColors } from '../../design-system/parlour-tokens';

interface SessionFiltersProps {
  filter: SessionFilter;
  sort: SessionSort;
  onFilterChange: (filter: SessionFilter) => void;
  onSortChange: (sort: SessionSort) => void;
}

export const SessionFilters: React.FC<SessionFiltersProps> = ({
  filter,
  sort,
  onFilterChange,
  onSortChange,
}) => {
  const filters: { value: SessionFilter; label: string }[] = [
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'past', label: 'Past' },
    { value: 'my-sessions', label: 'My Sessions' },
  ];

  const sorts: { value: SessionSort; label: string }[] = [
    { value: 'date', label: 'Date' },
    { value: 'participants', label: 'Participants' },
    { value: 'recent', label: 'Recent' },
  ];

  const buttonStyle = (isActive: boolean) => ({
    background: isActive ? `rgba(232, 197, 71, 0.1)` : 'rgba(0, 0, 0, 0.4)',
    borderColor: isActive ? parlourColors.gold[500] : parlourColors.neutral[800],
    color: isActive ? parlourColors.gold[500] : parlourColors.neutral[400],
  });

  return (
    <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
      {/* Filter buttons */}
      <div className="flex items-center gap-2">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => onFilterChange(f.value)}
            className="px-4 py-2 rounded-lg text-sm font-serif capitalize transition-all duration-200 border"
            style={buttonStyle(filter === f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Sort buttons */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-zinc-600 font-serif mr-2">Sort:</span>
        {sorts.map((s) => (
          <button
            key={s.value}
            onClick={() => onSortChange(s.value)}
            className="px-3 py-1.5 rounded text-xs font-serif capitalize transition-all duration-200 border"
            style={buttonStyle(sort === s.value)}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
};
