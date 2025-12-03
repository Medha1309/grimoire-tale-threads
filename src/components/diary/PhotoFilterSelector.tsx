/**
 * PhotoFilterSelector Component
 * Allows users to apply mood-based filters to photos
 */

import React from 'react';
import { motion } from 'framer-motion';

export type PhotoFilter = 'none' | 'sepia' | 'desaturated' | 'vintage' | 'horror';

interface PhotoFilterSelectorProps {
  currentFilter: PhotoFilter;
  onFilterChange: (filter: PhotoFilter) => void;
  previewImage?: string;
}

const FILTERS: { value: PhotoFilter; label: string; description: string }[] = [
  { value: 'none', label: 'Original', description: 'No filter' },
  { value: 'sepia', label: 'Joy', description: 'Warm sepia glow' },
  { value: 'desaturated', label: 'Sorrow', description: 'Desaturated blues' },
  { value: 'vintage', label: 'Calm', description: 'Soft vintage' },
  { value: 'horror', label: 'Unrest', description: 'Dark horror' },
];

export const getFilterStyle = (filter: PhotoFilter): React.CSSProperties => {
  switch (filter) {
    case 'sepia':
      return {
        filter: 'sepia(0.6) brightness(1.1) contrast(1.1) saturate(1.2)',
      };
    case 'desaturated':
      return {
        filter: 'saturate(0.3) brightness(0.9) contrast(1.1) hue-rotate(200deg)',
      };
    case 'vintage':
      return {
        filter: 'contrast(0.9) brightness(1.05) saturate(0.8) sepia(0.2)',
      };
    case 'horror':
        return {
        filter: 'contrast(1.3) brightness(0.7) saturate(0.6) hue-rotate(340deg)',
      };
    default:
      return {};
  }
};

export const PhotoFilterSelector: React.FC<PhotoFilterSelectorProps> = ({
  currentFilter,
  onFilterChange,
  previewImage,
}) => {
  return (
    <div className="space-y-3">
      <label className="block text-sm text-zinc-700 font-serif">
        Photo Filter
      </label>
      <div className="grid grid-cols-5 gap-2">
        {FILTERS.map((filter) => (
          <motion.button
            key={filter.value}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onFilterChange(filter.value)}
            className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all
              ${currentFilter === filter.value
                ? 'border-[#ffb6d9] shadow-lg shadow-[#ffb6d9]/30'
                : 'border-zinc-300 hover:border-zinc-400'
              }`}
          >
            {previewImage ? (
              <img
                src={previewImage}
                alt={filter.label}
                className="w-full h-full object-cover"
                style={getFilterStyle(filter.value)}
              />
            ) : (
              <div
                className="w-full h-full bg-gradient-to-br from-zinc-300 to-zinc-400"
                style={getFilterStyle(filter.value)}
              />
            )}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="text-white text-xs font-serif text-center px-1">
                {filter.label}
              </span>
            </div>
            {currentFilter === filter.value && (
              <div className="absolute top-1 right-1 w-4 h-4 bg-[#ffb6d9] rounded-full 
                              flex items-center justify-center text-white text-xs">
                ✓
              </div>
            )}
          </motion.button>
        ))}
      </div>
      <p className="text-xs text-zinc-600 text-center font-serif">
        {FILTERS.find(f => f.value === currentFilter)?.description}
      </p>
    </div>
  );
};
