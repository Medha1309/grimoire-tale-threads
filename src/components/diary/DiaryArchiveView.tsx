/**
 * DiaryArchiveView Component
 * Archive view specifically for diary entries
 */

import React from 'react';
import { ArchiveView } from './ArchiveView';
import { ArchivedDiaryEntry } from '../../types/archive';
import { DiaryEntry } from '../../types/diary';

interface DiaryArchiveViewProps {
  onBack: () => void;
  onRestore: (entry: DiaryEntry) => void;
}

export const DiaryArchiveView: React.FC<DiaryArchiveViewProps> = ({ onBack, onRestore }) => {
  const handleRestore = (item: any) => {
    const archivedEntry = item as ArchivedDiaryEntry;
    
    // Convert back to DiaryEntry format
    const restoredEntry: DiaryEntry = {
      id: archivedEntry.id,
      userId: archivedEntry.userId || '',
      content: archivedEntry.content,
      encryptedContent: archivedEntry.encryptedContent,
      mood: archivedEntry.mood,
      isLocked: archivedEntry.isLocked,
      isHidden: false,
      isFavorite: false,
      tags: [],
      createdAt: archivedEntry.originalCreatedAt,
      updatedAt: new Date(),
    };

    onRestore(restoredEntry);
  };

  return <ArchiveView type="diary" onBack={onBack} onRestore={handleRestore} />;
};
