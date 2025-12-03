/**
 * Chain Actions Hook
 * Handles creating, passing, completing, and breaking chains
 */

import { useState } from 'react';
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  serverTimestamp, 
  increment,
  arrayUnion,
  getDoc,
  query,
  where,
  getDocs
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { ChainLetter, ChainChapter, ChainInvitation } from '../types/chainLetter';

const CHAIN_EXPIRY_DAYS = 7;
const INVITATION_EXPIRY_HOURS = 48;

export const useChainActions = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startChain = async (
    title: string,
    genre: 'horror' | 'thriller' | 'mystery' | 'romance',
    firstChapter: string
  ): Promise<string | null> => {
    if (!currentUser) {
      setError('Must be logged in to start a chain');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const wordCount = firstChapter.trim().split(/\s+/).length;
      const now = new Date();
      const expiresAt = new Date(now.getTime() + CHAIN_EXPIRY_DAYS * 24 * 60 * 60 * 1000);

      const chapter: Omit<ChainChapter, 'id' | 'chainId'> = {
        authorId: currentUser.uid,
        authorName: currentUser.displayName || 'Anonymous',
        content: firstChapter,
        chapterNumber: 1,
        wordCount,
        createdAt: serverTimestamp(),
      };

      const chainData: Omit<ChainLetter, 'id'> = {
        title,
        genre,
        originatorId: currentUser.uid,
        originatorName: currentUser.displayName || 'Anonymous',
        currentHolderId: currentUser.uid,
        currentHolderName: currentUser.displayName || 'Anonymous',
        status: 'active',
        chainLength: 1,
        createdAt: serverTimestamp(),
        lastPassedAt: serverTimestamp(),
        expiresAt,
        chapters: [chapter as ChainChapter],
        totalWords: wordCount,
        viewCount: 0,
        likeCount: 0,
        curseLevel: 1,
        cursedBy: [currentUser.uid],
      };

      const docRef = await addDoc(collection(db, 'chainLetters'), chainData);

      // Update user stats
      const statsRef = doc(db, 'chainStats', currentUser.uid);
      const statsDoc = await getDoc(statsRef);
      
      if (statsDoc.exists()) {
        await updateDoc(statsRef, {
          chainsStarted: increment(1),
          totalChaptersWritten: increment(1),
          totalWordsInChains: increment(wordCount),
          updatedAt: serverTimestamp(),
        });
      } else {
        await updateDoc(statsRef, {
          userId: currentUser.uid,
          chainsStarted: 1,
          chainsContributed: 1,
          chainsCompleted: 0,
          chainsBroken: 0,
          totalChaptersWritten: 1,
          totalWordsInChains: wordCount,
          averageChapterLength: wordCount,
          fastestChapter: 0,
          invitationsSent: 0,
          invitationsReceived: 0,
          invitationsAccepted: 0,
          longestChain: 1,
          curseLevel: 1,
          updatedAt: serverTimestamp(),
        });
      }

      setLoading(false);
      return docRef.id;
    } catch (err: any) {
      console.error('Error starting chain:', err);
      setError(err.message);
      setLoading(false);
      return null;
    }
  };

  const addChapter = async (
    chainId: string,
    content: string,
    timeToWrite?: number
  ): Promise<boolean> => {
    if (!currentUser) {
      setError('Must be logged in');
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const chainRef = doc(db, 'chainLetters', chainId);
      const chainDoc = await getDoc(chainRef);

      if (!chainDoc.exists()) {
        setError('Chain not found');
        setLoading(false);
        return false;
      }

      const chain = chainDoc.data() as ChainLetter;

      if (chain.currentHolderId !== currentUser.uid) {
        setError('You are not the current holder of this chain');
        setLoading(false);
        return false;
      }

      const wordCount = content.trim().split(/\s+/).length;
      const newChapter: Omit<ChainChapter, 'id'> = {
        chainId,
        authorId: currentUser.uid,
        authorName: currentUser.displayName || 'Anonymous',
        content,
        chapterNumber: chain.chainLength + 1,
        wordCount,
        createdAt: serverTimestamp(),
        timeToWrite,
      };

      await updateDoc(chainRef, {
        chapters: arrayUnion(newChapter),
        chainLength: increment(1),
        totalWords: increment(wordCount),
        lastPassedAt: serverTimestamp(),
        curseLevel: Math.min(5, Math.floor((chain.chainLength + 1) / 3) + 1),
      });

      // Update user stats
      const statsRef = doc(db, 'chainStats', currentUser.uid);
      await updateDoc(statsRef, {
        totalChaptersWritten: increment(1),
        totalWordsInChains: increment(wordCount),
        updatedAt: serverTimestamp(),
      });

      setLoading(false);
      return true;
    } catch (err: any) {
      console.error('Error adding chapter:', err);
      setError(err.message);
      setLoading(false);
      return false;
    }
  };

  const passChain = async (chainId: string, toUserId: string, toUserName: string): Promise<boolean> => {
    if (!currentUser) {
      setError('Must be logged in');
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const chainRef = doc(db, 'chainLetters', chainId);
      const chainDoc = await getDoc(chainRef);

      if (!chainDoc.exists()) {
        setError('Chain not found');
        setLoading(false);
        return false;
      }

      const chain = chainDoc.data() as ChainLetter;

      if (chain.currentHolderId !== currentUser.uid) {
        setError('You are not the current holder');
        setLoading(false);
        return false;
      }

      const now = new Date();
      const expiresAt = new Date(now.getTime() + CHAIN_EXPIRY_DAYS * 24 * 60 * 60 * 1000);
      const invitationExpiresAt = new Date(now.getTime() + INVITATION_EXPIRY_HOURS * 60 * 60 * 1000);

      // Create invitation
      const invitation: Omit<ChainInvitation, 'id'> = {
        chainId,
        chainTitle: chain.title,
        fromUserId: currentUser.uid,
        fromUserName: currentUser.displayName || 'Anonymous',
        toUserId,
        toUserName,
        status: 'pending',
        createdAt: serverTimestamp(),
        expiresAt: invitationExpiresAt,
        currentChapterCount: chain.chainLength,
        lastChapterPreview: chain.chapters[chain.chapters.length - 1]?.content.substring(0, 200) || '',
      };

      await addDoc(collection(db, 'chainInvitations'), invitation);

      // Update chain
      await updateDoc(chainRef, {
        currentHolderId: toUserId,
        currentHolderName: toUserName,
        expiresAt,
        cursedBy: arrayUnion(toUserId),
      });

      // Update sender stats
      const statsRef = doc(db, 'chainStats', currentUser.uid);
      await updateDoc(statsRef, {
        invitationsSent: increment(1),
        updatedAt: serverTimestamp(),
      });

      setLoading(false);
      return true;
    } catch (err: any) {
      console.error('Error passing chain:', err);
      setError(err.message);
      setLoading(false);
      return false;
    }
  };

  const completeChain = async (chainId: string, finalChapter: string): Promise<boolean> => {
    if (!currentUser) {
      setError('Must be logged in');
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      // Add final chapter
      const success = await addChapter(chainId, finalChapter);
      if (!success) return false;

      // Mark as completed
      const chainRef = doc(db, 'chainLetters', chainId);
      await updateDoc(chainRef, {
        status: 'completed',
        completedAt: serverTimestamp(),
      });

      // Update stats
      const chainDoc = await getDoc(chainRef);
      const chain = chainDoc.data() as ChainLetter;
      
      for (const userId of chain.cursedBy) {
        const statsRef = doc(db, 'chainStats', userId);
        await updateDoc(statsRef, {
          chainsCompleted: increment(1),
          updatedAt: serverTimestamp(),
        });
      }

      setLoading(false);
      return true;
    } catch (err: any) {
      console.error('Error completing chain:', err);
      setError(err.message);
      setLoading(false);
      return false;
    }
  };

  const breakChain = async (chainId: string): Promise<boolean> => {
    if (!currentUser) {
      setError('Must be logged in');
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const chainRef = doc(db, 'chainLetters', chainId);
      await updateDoc(chainRef, {
        status: 'broken',
        completedAt: serverTimestamp(),
      });

      // Update stats - penalize the breaker
      const statsRef = doc(db, 'chainStats', currentUser.uid);
      await updateDoc(statsRef, {
        chainsBroken: increment(1),
        updatedAt: serverTimestamp(),
      });

      setLoading(false);
      return true;
    } catch (err: any) {
      console.error('Error breaking chain:', err);
      setError(err.message);
      setLoading(false);
      return false;
    }
  };

  return {
    startChain,
    addChapter,
    passChain,
    completeChain,
    breakChain,
    loading,
    error,
  };
};

export const useChainInvitations = () => {
  const { currentUser } = useAuth();
  const [invitations, setInvitations] = useState<ChainInvitation[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInvitations = async () => {
    if (!currentUser) {
      setInvitations([]);
      setLoading(false);
      return;
    }

    try {
      const q = query(
        collection(db, 'chainInvitations'),
        where('toUserId', '==', currentUser.uid),
        where('status', '==', 'pending')
      );

      const snapshot = await getDocs(q);
      const invites = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ChainInvitation[];

      setInvitations(invites);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching invitations:', err);
      setLoading(false);
    }
  };

  const acceptInvitation = async (invitationId: string): Promise<boolean> => {
    try {
      const inviteRef = doc(db, 'chainInvitations', invitationId);
      await updateDoc(inviteRef, {
        status: 'accepted',
        respondedAt: serverTimestamp(),
      });

      // Update stats
      if (currentUser) {
        const statsRef = doc(db, 'chainStats', currentUser.uid);
        await updateDoc(statsRef, {
          invitationsAccepted: increment(1),
          chainsContributed: increment(1),
          updatedAt: serverTimestamp(),
        });
      }

      await fetchInvitations();
      return true;
    } catch (err) {
      console.error('Error accepting invitation:', err);
      return false;
    }
  };

  const declineInvitation = async (invitationId: string): Promise<boolean> => {
    try {
      const inviteRef = doc(db, 'chainInvitations', invitationId);
      await updateDoc(inviteRef, {
        status: 'declined',
        respondedAt: serverTimestamp(),
      });

      await fetchInvitations();
      return true;
    } catch (err) {
      console.error('Error declining invitation:', err);
      return false;
    }
  };

  return {
    invitations,
    loading,
    fetchInvitations,
    acceptInvitation,
    declineInvitation,
  };
};
