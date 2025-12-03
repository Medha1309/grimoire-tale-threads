import { useState, useEffect } from 'react';
import {
  collection,
  doc,
  onSnapshot,
  updateDoc,
  arrayUnion,
  arrayRemove,
  Timestamp,
  serverTimestamp,
  query,
  orderBy,
  addDoc,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { ChainSession, ChainSegment } from '../types/chainSession';

export function useChainSession(sessionId: string | null) {
  const [session, setSession] = useState<ChainSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }

    const sessionRef = doc(db, 'chainSessions', sessionId);

    const unsubscribe = onSnapshot(
      sessionRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setSession({
            id: snapshot.id,
            ...snapshot.data(),
          } as ChainSession);
        } else {
          setSession(null);
        }
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching chain session:', err);
        setError(err as Error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [sessionId]);

  const addSegment = async (segment: Omit<ChainSegment, 'id' | 'createdAt' | 'hash'>) => {
    if (!sessionId || !session) return;

    try {
      const sessionRef = doc(db, 'chainSessions', sessionId);
      
      // Calculate hash
      const hash = djb2Hash(segment.content);
      
      const newSegment: ChainSegment = {
        ...segment,
        id: `s-${Date.now()}`,
        createdAt: Timestamp.now(),
        hash,
      };

      await updateDoc(sessionRef, {
        segments: arrayUnion(newSegment),
        updatedAt: serverTimestamp(),
        lastSegmentAt: serverTimestamp(),
      });
    } catch (err) {
      console.error('Error adding segment:', err);
      throw err;
    }
  };

  const joinSession = async (userId: string, displayName: string) => {
    if (!sessionId || !session) return;

    // Check if user is already a participant
    const isParticipant = session.participants.some(p => p.userId === userId);
    if (isParticipant) return;

    try {
      const sessionRef = doc(db, 'chainSessions', sessionId);
      
      await updateDoc(sessionRef, {
        participants: arrayUnion({
          userId,
          displayName,
          joinedAt: Timestamp.now(),
        }),
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      console.error('Error joining session:', err);
      throw err;
    }
  };

  const deleteSegment = async (segmentId: string) => {
    if (!sessionId || !session) return;

    try {
      const sessionRef = doc(db, 'chainSessions', sessionId);
      const segmentToDelete = session.segments.find(s => s.id === segmentId);
      
      if (!segmentToDelete) return;

      await updateDoc(sessionRef, {
        segments: arrayRemove(segmentToDelete),
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      console.error('Error deleting segment:', err);
      throw err;
    }
  };

  const updateSegment = async (segmentId: string, newContent: string) => {
    if (!sessionId || !session) return;

    try {
      const sessionRef = doc(db, 'chainSessions', sessionId);
      const updatedSegments = session.segments.map(seg => 
        seg.id === segmentId 
          ? { ...seg, content: newContent, hash: djb2Hash(newContent) }
          : seg
      );

      await updateDoc(sessionRef, {
        segments: updatedSegments,
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      console.error('Error updating segment:', err);
      throw err;
    }
  };

  return { session, loading, error, addSegment, joinSession, deleteSegment, updateSegment };
}

export function useChainSessions() {
  const [sessions, setSessions] = useState<ChainSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [seeded, setSeeded] = useState(false);

  useEffect(() => {
    const q = query(
      collection(db, 'chainSessions'),
      orderBy('updatedAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      q,
      async (snapshot) => {
        const sessionsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as ChainSession[];
        
        // Auto-seed if no sessions exist
        if (sessionsData.length === 0 && !seeded) {
          setSeeded(true);
          try {
            const { SAMPLE_CHAIN_SESSIONS } = await import('../data/sampleChainSessions');
            await seedChainSessions(SAMPLE_CHAIN_SESSIONS);
            // Data will come through the listener
          } catch (err) {
            console.error('Error auto-seeding:', err);
          }
        } else {
          setSessions(sessionsData);
          setLoading(false);
        }
      },
      (err) => {
        console.error('Error fetching chain sessions:', err);
        setError(err as Error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [seeded]);

  const createSession = async (
    session: Omit<ChainSession, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<string> => {
    try {
      const now = Timestamp.now();
      const docRef = await addDoc(collection(db, 'chainSessions'), {
        ...session,
        createdAt: now,
        updatedAt: now,
      });
      return docRef.id;
    } catch (err) {
      console.error('Error creating session:', err);
      throw err;
    }
  };

  const updateSession = async (
    sessionId: string,
    updates: Partial<Omit<ChainSession, 'id' | 'createdAt'>>
  ): Promise<void> => {
    try {
      const sessionRef = doc(db, 'chainSessions', sessionId);
      await updateDoc(sessionRef, {
        ...updates,
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      console.error('Error updating session:', err);
      throw err;
    }
  };

  const deleteSession = async (sessionId: string): Promise<void> => {
    try {
      const sessionRef = doc(db, 'chainSessions', sessionId);
      await updateDoc(sessionRef, {
        isDeleted: true,
        deletedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      console.error('Error deleting session:', err);
      throw err;
    }
  };

  return { sessions, loading, error, createSession, updateSession, deleteSession };
}

export async function seedChainSessions(sessions: Omit<ChainSession, 'id'>[]) {
  try {
    for (const session of sessions) {
      const sessionId = `demo-${session.title.toLowerCase().replace(/\s+/g, '-')}`;
      const sessionRef = doc(db, 'chainSessions', sessionId);
      await setDoc(sessionRef, session, { merge: true });
    }
    console.log('Chain sessions seeded successfully');
  } catch (err) {
    console.error('Error seeding chain sessions:', err);
    throw err;
  }
}

function djb2Hash(str: string): string {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return (hash >>> 0).toString(16).padStart(8, '0');
}
