/**
 * Hook for fetching and managing reflection sessions
 */

import { useState, useEffect } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  Timestamp,
  QueryConstraint,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { ReflectionSession, SessionFilter, SessionSort } from '../types/reflectionSession';
import { useAuth } from '../contexts/AuthContext';

export const useReflectionSessions = (
  filter: SessionFilter = 'upcoming',
  sort: SessionSort = 'date'
) => {
  const { currentUser } = useAuth();
  const [sessions, setSessions] = useState<ReflectionSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!currentUser) {
      setSessions([]);
      setLoading(false);
      return;
    }

    const constraints: QueryConstraint[] = [];
    const now = Timestamp.now();

    // Apply filters
    switch (filter) {
      case 'upcoming':
        constraints.push(
          where('status', 'in', ['scheduled', 'active']),
          where('scheduledStart', '>=', now)
        );
        break;
      case 'past':
        constraints.push(
          where('status', '==', 'completed'),
          where('scheduledEnd', '<', now)
        );
        break;
      case 'my-sessions':
        constraints.push(
          where('participants', 'array-contains', {
            userId: currentUser.uid,
            userName: currentUser.displayName || 'Anonymous',
          })
        );
        break;
    }

    // Apply sorting
    switch (sort) {
      case 'date':
        constraints.push(orderBy('scheduledStart', filter === 'past' ? 'desc' : 'asc'));
        break;
      case 'participants':
        constraints.push(orderBy('participants', 'desc'));
        break;
      case 'recent':
        constraints.push(orderBy('createdAt', 'desc'));
        break;
    }

    const q = query(collection(db, 'reflectionSessions'), ...constraints);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const sessionData: ReflectionSession[] = [];
        snapshot.forEach((doc) => {
          sessionData.push({ id: doc.id, ...doc.data() } as ReflectionSession);
        });
        setSessions(sessionData);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error('Error fetching sessions:', err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [currentUser, filter, sort]);

  return { sessions, loading, error };
};

/**
 * Hook for fetching a single session by ID
 */
export const useSession = (sessionId: string | undefined) => {
  const [session, setSession] = useState<ReflectionSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setSession(null);
      setLoading(false);
      return;
    }

    const docRef = doc(db, 'reflectionSessions', sessionId);
    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setSession({ id: docSnap.id, ...docSnap.data() } as ReflectionSession);
        } else {
          setSession(null);
          setError('Session not found');
        }
        setLoading(false);
      },
      (err: any) => {
        console.error('Error fetching session:', err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [sessionId]);

  return { session, loading, error };
};

/**
 * Hook for getting user's active session (if any)
 */
export const useMyActiveSession = () => {
  const { currentUser } = useAuth();
  const [activeSession, setActiveSession] = useState<ReflectionSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      setActiveSession(null);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'reflectionSessions'),
      where('status', '==', 'active'),
      where('participants', 'array-contains', {
        userId: currentUser.uid,
        userName: currentUser.displayName || 'Anonymous',
      })
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        setActiveSession({ id: doc.id, ...doc.data() } as ReflectionSession);
      } else {
        setActiveSession(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  return { activeSession, loading };
};
