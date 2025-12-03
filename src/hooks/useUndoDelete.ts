/**
 * useUndoDelete Hook
 * Provides soft-delete functionality with undo capability
 */

import { useState, useCallback, useRef, useEffect } from 'react';

interface DeletedItem {
  id: string;
  type: 'thread' | 'reply';
  data: any;
}

export const useUndoDelete = () => {
  const [deletedItem, setDeletedItem] = useState<DeletedItem | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const softDelete = useCallback((item: DeletedItem, onConfirm: () => Promise<void>) => {
    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setDeletedItem(item);
    
    // Set timer for permanent deletion
    timerRef.current = setTimeout(async () => {
      await onConfirm();
      setDeletedItem(null);
      timerRef.current = null;
    }, 5000);
  }, []);

  const undo = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setDeletedItem(null);
  }, []);

  return { softDelete, undo, deletedItem };
};
