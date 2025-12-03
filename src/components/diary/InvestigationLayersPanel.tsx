/**
 * Investigation Layers Panel
 * Figma-style layers panel showing all elements
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InvestigationElement, ElementGroup } from '../../types/investigationScrapbook';

interface InvestigationLayersPanelProps {
  elements: InvestigationElement[];
  groups: ElementGroup[];
  selectedIds: string[];
  onSelectElement: (id: string, addToSelection: boolean) => void;
  onDeleteElement: (id: string) => void;
  onToggleVisibility: (id: string) => void;
  onToggleLock: (id: string) => void;
}

export const InvestigationLayersPanel: React.FC<InvestigationLayersPanelProps> = ({
  elements,
  selectedIds,
  onSelectElement,
  onDeleteElement,
  onToggleVisibility,
  onToggleLock,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Sort by z-index (top to bottom)
  const sortedElements = [...elements].sort((a, b) => b.zIndex - a.zIndex);

  // Filter by search
  const filteredElements = sortedElements.filter(el => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      el.type.toLowerCase().includes(query) ||
      el.id.toLowerCase().includes(query) ||
      ('content' in el && el.content?.toLowerCase().includes(query))
    );
  });

  const getElementIcon = (type: string) => {
    switch (type) {
      case 'photo': return '📷';
      case 'gif': return '🎬';
      case 'note': return '📝';
      case 'annotation': return '✏️';
      case 'connection': return '🔴';
      default: return '📄';
    }
  };

  const getElementLabel = (element: InvestigationElement) => {
    if (element.type === 'photo') return 'Photo';
    if (element.type === 'gif') return 'GIF';
    if (element.type === 'note') return 'Note';
    if (element.type === 'annotation') return 'Annotation';
    if (element.type === 'connection') return 'Connection';
    return 'Element';
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-zinc-800">
        <h3 className="text-sm font-semibold text-zinc-200 mb-3">Layers</h3>
        
        {/* Search */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search layers..."
          className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg
                     text-sm text-zinc-200 placeholder-zinc-500
                     focus:outline-none focus:border-[#ff1493] transition-colors"
        />
      </div>

      {/* Layers List */}
      <div className="flex-1 overflow-y-auto p-2">
        <AnimatePresence>
          {filteredElements.map((element, index) => {
            const isSelected = selectedIds.includes(element.id);
            
            return (
              <motion.div
                key={element.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.02 }}
                onClick={(e) => onSelectElement(element.id, e.shiftKey)}
                className={`
                  group relative flex items-center gap-2 px-3 py-2 rounded-lg mb-1
                  cursor-pointer transition-all
                  ${isSelected 
                    ? 'bg-[#ff1493]/20 border border-[#ff1493]/50' 
                    : 'hover:bg-zinc-800 border border-transparent'
                  }
                `}
              >
                {/* Icon */}
                <span className="text-lg">{getElementIcon(element.type)}</span>

                {/* Label */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-zinc-200 truncate">
                    {getElementLabel(element)}
                  </p>
                  <p className="text-xs text-zinc-500 truncate">
                    {element.id.slice(0, 12)}...
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {/* Visibility Toggle */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleVisibility(element.id);
                    }}
                    className="p-1 hover:bg-zinc-700 rounded transition-colors"
                    title={element.visible ? 'Hide' : 'Show'}
                  >
                    <span className="text-xs">
                      {element.visible ? '👁️' : '🚫'}
                    </span>
                  </button>

                  {/* Lock Toggle */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleLock(element.id);
                    }}
                    className="p-1 hover:bg-zinc-700 rounded transition-colors"
                    title={element.locked ? 'Unlock' : 'Lock'}
                  >
                    <span className="text-xs">
                      {element.locked ? '🔒' : '🔓'}
                    </span>
                  </button>

                  {/* Delete */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm('Delete this element?')) {
                        onDeleteElement(element.id);
                      }
                    }}
                    className="p-1 hover:bg-red-900/50 rounded transition-colors text-xs font-serif uppercase tracking-wider"
                    title="Delete"
                  >
                    Del
                  </button>
                </div>

                {/* Locked/Hidden Indicators */}
                <div className="flex items-center gap-1">
                  {element.locked && (
                    <span className="text-xs opacity-50">🔒</span>
                  )}
                  {!element.visible && (
                    <span className="text-xs opacity-50">🚫</span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {filteredElements.length === 0 && (
          <div className="text-center py-12">
            <p className="text-zinc-500 text-sm">
              {searchQuery ? 'No layers found' : 'No elements yet'}
            </p>
            <p className="text-zinc-600 text-xs mt-2">
              {searchQuery ? 'Try a different search' : 'Add photos, notes, or connections'}
            </p>
          </div>
        )}
      </div>

      {/* Footer Stats */}
      <div className="p-4 border-t border-zinc-800">
        <div className="flex items-center justify-between text-xs text-zinc-500">
          <span>{elements.length} total</span>
          <span>{selectedIds.length} selected</span>
        </div>
      </div>
    </div>
  );
};
