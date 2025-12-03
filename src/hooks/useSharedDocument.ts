/**
 * Hook for managing shared document editing
 */

import { useState, useEffect, useCallback } from 'react';
import { ref, onValue, set } from 'firebase/database';
import { realtimeDb } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { debounce } from '../utils/cursorSync';

export const useSharedDocument = (sessionId: string | undefined) => {
  const { currentUser } = useAuth();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [lastEditedBy, setLastEditedBy] = useState<string | null>(null);

  // Listen to document changes
  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }

    const docRef = ref(realtimeDb, `sessions/${sessionId}/document`);

    const unsubscribe = onValue(docRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setContent(data.content || '');
        setLastEditedBy(data.lastEditedBy || null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [sessionId]);

  // Update document (debounced)
  const updateDocument = useCallback(
    debounce((newContent: string) => {
      if (!sessionId || !currentUser) return;

      const docRef = ref(realtimeDb, `sessions/${sessionId}/document`);
      set(docRef, {
        content: newContent,
        lastEditedBy: currentUser.displayName || 'Anonymous',
        lastEditedAt: Date.now(),
      });
    }, 500),
    [sessionId, currentUser]
  );

  return {
    content,
    loading,
    lastEditedBy,
    updateDocument,
  };
};
