/**
 * useArchiveWithUndo Hook
 * Manages archiving with undo functionality
 */

import { useState, useCallback } from 'react';
import { useArchive } from './useArchive';
import { ArchiveContentType, ArchiveItem } from '../types/archive';

export const useArchiveWithUndo = (type: ArchiveContentType) => {
  const archive = useArchive(type);
  const [showUndo, setShowUndo] = useState(false);
  const [lastArchived, setLastArchived] = useState<ArchiveItem | null>(null);

  const archiveWithUndo = useCallback((item: Omit<ArchiveItem, 'archivedAt'>) => {
    const archivedItem = archive.archiveItem(item);
    setLastArchived(archivedItem);
    setShowUndo(true);
    return archivedItem;
  }, [archive]);

  const undo = useCallback(() => {
    if (lastArchived) {
      archive.restoreItem(lastArchived.id);
      setShowUndo(false);
      setLastArchived(null);
      return lastArchived;
    }
    return null;
  }, [lastArchived, archive]);

  const closeUndo = useCallback(() => {
    setShowUndo(false);
    setLastArchived(null);
  }, []);

  return {
    ...archive,
    archiveWithUndo,
    undo,
    showUndo,
    closeUndo,
    lastArchived,
  };
};
