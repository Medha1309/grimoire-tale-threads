/**
 * Hook for session actions (create, join, leave, etc.)
 */

import { useState } from 'react';
import {
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  Timestamp,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import {
  ReflectionSession,
  SessionParticipant,
  SessionTheme,
} from '../types/reflectionSession';
import { useAuth } from '../contexts/AuthContext';
import {
  generateSessionId,
  assignParticipantColor,
  canJoinSession,
  validateSessionTitle,
  validateCapacity,
} from '../utils/sessionHelpers';
import { useToast } from './useToast';

interface CreateSessionData {
  title: string;
  theme: SessionTheme;
  description?: string;
  scheduledStart: Date;
  duration: number; // minutes
  capacity: number;
  isPublic: boolean;
}

export const useSessionActions = () => {
  const { currentUser } = useAuth();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  /**
   * Create a new reflection session
   */
  const createSession = async (data: CreateSessionData): Promise<string | null> => {
    if (!currentUser) {
      showToast('You must be logged in to create a session', 'error');
      return null;
    }

    // Validate
    const titleValidation = validateSessionTitle(data.title);
    if (!titleValidation.valid) {
      showToast(titleValidation.error!, 'error');
      return null;
    }

    const capacityValidation = validateCapacity(data.capacity);
    if (!capacityValidation.valid) {
      showToast(capacityValidation.error!, 'error');
      return null;
    }

    setLoading(true);

    try {
      const sessionId = generateSessionId();
      const scheduledStart = Timestamp.fromDate(data.scheduledStart);
      const scheduledEnd = Timestamp.fromMillis(
        data.scheduledStart.getTime() + data.duration * 60 * 1000
      );

      const hostParticipant: SessionParticipant = {
        userId: currentUser.uid,
        userName: currentUser.displayName || 'Anonymous',
        joinedAt: Timestamp.now(),
        isActive: false,
        cursorColor: assignParticipantColor(0),
        contributionCount: 0,
      };

      const session: Omit<ReflectionSession, 'id'> = {
        title: data.title,
        theme: data.theme,
        description: data.description,
        hostId: currentUser.uid,
        hostName: currentUser.displayName || 'Anonymous',
        scheduledStart,
        scheduledEnd,
        status: 'scheduled',
        capacity: data.capacity,
        isPublic: data.isPublic,
        participants: [hostParticipant],
        artifact: {
          scrapbook: [],
          writing: {
            text: '',
            contributors: [],
            wordCount: 0,
          },
          metadata: {
            sessionDuration: 0,
            totalElements: 0,
            totalWords: 0,
            participantCount: 1,
            completedAt: Timestamp.now(),
          },
        },
        createdAt: serverTimestamp() as Timestamp,
        updatedAt: serverTimestamp() as Timestamp,
      };

      await setDoc(doc(db, 'reflectionSessions', sessionId), session);

      showToast('Session created successfully!', 'success');
      return sessionId;
    } catch (error: any) {
      console.error('Error creating session:', error);
      showToast(error.message || 'Failed to create session', 'error');
      return null;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Join an existing session
   */
  const joinSession = async (session: ReflectionSession): Promise<boolean> => {
    if (!currentUser) {
      showToast('You must be logged in to join a session', 'error');
      return false;
    }

    const { canJoin, reason } = canJoinSession(session, currentUser.uid);
    if (!canJoin) {
      showToast(reason || 'Cannot join session', 'error');
      return false;
    }

    setLoading(true);

    try {
      const newParticipant: SessionParticipant = {
        userId: currentUser.uid,
        userName: currentUser.displayName || 'Anonymous',
        joinedAt: Timestamp.now(),
        isActive: false,
        cursorColor: assignParticipantColor(session.participants.length),
        contributionCount: 0,
      };

      await updateDoc(doc(db, 'reflectionSessions', session.id), {
        participants: arrayUnion(newParticipant),
        updatedAt: serverTimestamp(),
      });

      showToast('Joined session successfully!', 'success');
      return true;
    } catch (error: any) {
      console.error('Error joining session:', error);
      showToast(error.message || 'Failed to join session', 'error');
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Leave a session
   */
  const leaveSession = async (session: ReflectionSession): Promise<boolean> => {
    if (!currentUser) return false;

    const participant = session.participants.find(p => p.userId === currentUser.uid);
    if (!participant) return false;

    setLoading(true);

    try {
      await updateDoc(doc(db, 'reflectionSessions', session.id), {
        participants: arrayRemove(participant),
        updatedAt: serverTimestamp(),
      });

      showToast('Left session', 'info');
      return true;
    } catch (error: any) {
      console.error('Error leaving session:', error);
      showToast(error.message || 'Failed to leave session', 'error');
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Cancel a session (host only)
   */
  const cancelSession = async (session: ReflectionSession): Promise<boolean> => {
    if (!currentUser || session.hostId !== currentUser.uid) {
      showToast('Only the host can cancel the session', 'error');
      return false;
    }

    setLoading(true);

    try {
      await updateDoc(doc(db, 'reflectionSessions', session.id), {
        status: 'cancelled',
        updatedAt: serverTimestamp(),
      });

      showToast('Session cancelled', 'info');
      return true;
    } catch (error: any) {
      console.error('Error cancelling session:', error);
      showToast(error.message || 'Failed to cancel session', 'error');
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Start a session (host only, when scheduled time arrives)
   */
  const startSession = async (session: ReflectionSession): Promise<boolean> => {
    if (!currentUser || session.hostId !== currentUser.uid) {
      showToast('Only the host can start the session', 'error');
      return false;
    }

    setLoading(true);

    try {
      await updateDoc(doc(db, 'reflectionSessions', session.id), {
        status: 'active',
        actualStart: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      showToast('Session started!', 'success');
      return true;
    } catch (error: any) {
      console.error('Error starting session:', error);
      showToast(error.message || 'Failed to start session', 'error');
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Extend session duration (host only)
   */
  const extendSession = async (
    session: ReflectionSession,
    additionalMinutes: number = 30
  ): Promise<boolean> => {
    if (!currentUser || session.hostId !== currentUser.uid) {
      showToast('Only the host can extend the session', 'error');
      return false;
    }

    setLoading(true);

    try {
      const newEnd = Timestamp.fromMillis(
        session.scheduledEnd.toMillis() + additionalMinutes * 60 * 1000
      );

      await updateDoc(doc(db, 'reflectionSessions', session.id), {
        scheduledEnd: newEnd,
        updatedAt: serverTimestamp(),
      });

      showToast(`Session extended by ${additionalMinutes} minutes`, 'success');
      return true;
    } catch (error: any) {
      console.error('Error extending session:', error);
      showToast(error.message || 'Failed to extend session', 'error');
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Complete a session
   */
  const completeSession = async (session: ReflectionSession): Promise<boolean> => {
    if (!currentUser || session.hostId !== currentUser.uid) {
      showToast('Only the host can complete the session', 'error');
      return false;
    }

    setLoading(true);

    try {
      const actualEnd = Timestamp.now();
      const duration = session.actualStart
        ? actualEnd.toMillis() - session.actualStart.toMillis()
        : 0;

      await updateDoc(doc(db, 'reflectionSessions', session.id), {
        status: 'completed',
        actualEnd,
        'artifact.metadata.sessionDuration': duration,
        'artifact.metadata.completedAt': actualEnd,
        'artifact.metadata.participantCount': session.participants.length,
        updatedAt: serverTimestamp(),
      });

      showToast('Session completed!', 'success');
      return true;
    } catch (error: any) {
      console.error('Error completing session:', error);
      showToast(error.message || 'Failed to complete session', 'error');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    createSession,
    joinSession,
    leaveSession,
    cancelSession,
    startSession,
    extendSession,
    completeSession,
    loading,
  };
};
