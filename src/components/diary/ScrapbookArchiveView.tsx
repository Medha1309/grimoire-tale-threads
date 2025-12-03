/**
 * ScrapbookArchiveView Component
 * Archive view specifically for scrapbook entries
 */

import React from 'react';
import { ArchiveView } from './ArchiveView';
import { ArchivedScrapbookEntry } from '../../types/archive';
import { ScrapbookEntry } from '../../types/scrapbook';

interface ScrapbookArchiveViewProps {
  onBack: () => void;
  onRestore: (entry: ScrapbookEntry) => void;
}

export const ScrapbookArchiveView: React.FC<ScrapbookArchiveViewProps> = ({ onBack, onRestore }) => {
  const handleRestore = (item: any) => {
    const archivedEntry = item as ArchivedScrapbookEntry;
    
    // Convert back to ScrapbookEntry format
    const restoredEntry: ScrapbookEntry = {
      id: archivedEntry.id,
      date: archivedEntry.date,
      thought: archivedEntry.thought,
      photos: archivedEntry.photos,
      stickers: archivedEntry.stickers,
      scratchOffs: archivedEntry.scratchOffs,
      layout: archivedEntry.layout,
      mood: archivedEntry.mood,
      fullContent: archivedEntry.fullContent,
      isLocked: archivedEntry.isLocked,
      isHaunted: archivedEntry.isHaunted,
    };

    onRestore(restoredEntry);
  };

  return <ArchiveView type="scrapbook" onBack={onBack} onRestore={handleRestore} />;
};
