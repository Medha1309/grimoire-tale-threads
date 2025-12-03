/**
 * Hook for managing session presence (who's online/active)
 */

import { useState, useEffect, useCallback } from 'react';
import { ref, onValue, set, onDisconnect, serverTimestamp } from 'firebase/database';
import { realtimeDb } from '../lib/firebase';
import { SessionPresence } from '../types/reflectionSession';
import { useAuth } from '../contexts/AuthContext';

export const useSessionPresence = (sessionId: string | undefined) => {
  const { currentUser } = useAuth();
  const [participants, setParticipants] = useState<Record<string, SessionPresence>>({});
  const [loading, setLoading] = useState(true);

  // Set user as present in session
  const setPresent = useCallback(() => {
    if (!sessionId || !currentUser) return;

    const presenceRef = ref(realtimeDb, `sessions/${sessionId}/presence/${currentUser.uid}`);
    const connectedRef = ref(realtimeDb, '.info/connected');

    onValue(connectedRef, (snapshot) => {
      if (snapshot.val() === true) {
        // Set up disconnect handler
        onDisconnect(presenceRef).remove();

        // Set user as present
        set(presenceRef, {
          userId: currentUser.uid,
          userName: currentUser.displayName || 'Anonymous',
          isActive: true,
          lastSeen: serverTimestamp(),
        });
      }
    });
  }, [sessionId, currentUser]);

  // Update active status
  const updateActive = useCallback(
    (isActive: boolean) => {
      if (!sessionId || !currentUser) return;

      const presenceRef = ref(realtimeDb, `sessions/${sessionId}/presence/${currentUser.uid}`);
      set(presenceRef, {
        userId: currentUser.uid,
        userName: currentUser.displayName || 'Anonymous',
        isActive,
        lastSeen: serverTimestamp(),
      });
    },
    [sessionId, currentUser]
  );

  // Leave session
  const leave = useCallback(() => {
    if (!sessionId || !currentUser) return;

    const presenceRef = ref(realtimeDb, `sessions/${sessionId}/presence/${currentUser.uid}`);
    set(presenceRef, null);
  }, [sessionId, currentUser]);

  // Listen to all participants
  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }

    const presenceRef = ref(realtimeDb, `sessions/${sessionId}/presence`);

    const unsubscribe = onValue(presenceRef, (snapshot) => {
      const data = snapshot.val();
      setParticipants(data || {});
      setLoading(false);
    });

    return () => unsubscribe();
  }, [sessionId]);

  // Set present on mount
  useEffect(() => {
    setPresent();
    return () => leave();
  }, [setPresent, leave]);

  // Track activity (mouse movement, keyboard)
  useEffect(() => {
    if (!sessionId || !currentUser) return;

    let activityTimeout: NodeJS.Timeout;

    const handleActivity = () => {
      updateActive(true);

      // Set inactive after 30 seconds of no activity
      clearTimeout(activityTimeout);
      activityTimeout = setTimeout(() => {
        updateActive(false);
      }, 30000);
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('click', handleActivity);

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('click', handleActivity);
      clearTimeout(activityTimeout);
    };
  }, [sessionId, currentUser, updateActive]);

  return {
    participants,
    loading,
    setPresent,
    updateActive,
    leave,
  };
};
