/**
 * Hook for tracking live cursor positions in a session
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { ref, onValue, set } from 'firebase/database';
import { realtimeDb } from '../lib/firebase';
import { CursorPosition } from '../types/reflectionSession';
import { useAuth } from '../contexts/AuthContext';
import { throttle, cleanupStaleCursors } from '../utils/cursorSync';

export const useLiveCursors = (sessionId: string | undefined, cursorColor: string) => {
  const { currentUser } = useAuth();
  const [cursors, setCursors] = useState<Record<string, CursorPosition>>({});
  const [loading, setLoading] = useState(true);
  const throttledUpdateRef = useRef<((x: number, y: number) => void) | null>(null);

  // Initialize throttled update function
  useEffect(() => {
    if (!sessionId || !currentUser) return;

    const cursorRef = ref(realtimeDb, `sessions/${sessionId}/cursors/${currentUser.uid}`);

    throttledUpdateRef.current = throttle((x: number, y: number) => {
      set(cursorRef, {
        userId: currentUser.uid,
        userName: currentUser.displayName || 'Anonymous',
        x,
        y,
        color: cursorColor,
        lastUpdate: Date.now(),
      });
    }, 50); // Update max every 50ms
  }, [sessionId, currentUser, cursorColor]);

  // Update cursor position
  const updateCursor = useCallback(
    (x: number, y: number) => {
      if (throttledUpdateRef.current) {
        throttledUpdateRef.current(x, y);
      }
    },
    []
  );

  // Listen to all cursors
  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }

    const cursorsRef = ref(realtimeDb, `sessions/${sessionId}/cursors`);

    const unsubscribe = onValue(cursorsRef, (snapshot) => {
      const data = snapshot.val();
      const cleaned = data ? cleanupStaleCursors(data) : {};
      setCursors(cleaned);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [sessionId]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (sessionId && currentUser) {
        const cursorRef = ref(realtimeDb, `sessions/${sessionId}/cursors/${currentUser.uid}`);
        set(cursorRef, null);
      }
    };
  }, [sessionId, currentUser]);

  return {
    cursors,
    loading,
    updateCursor,
  };
};
