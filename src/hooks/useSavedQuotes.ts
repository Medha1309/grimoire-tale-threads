/**
 * Hook for managing saved quotes from stories
 */

import { useState, useEffect } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { SavedQuote } from '../types/savedQuote';
import { showSuccess, showError } from '../utils/notifications';

export const useSavedQuotes = (storyId?: string) => {
  const { currentUser } = useAuth();
  const [quotes, setQuotes] = useState<SavedQuote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!currentUser) {
      setQuotes([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const quotesRef = collection(db, 'savedQuotes');
      let q = query(
        quotesRef,
        where('userId', '==', currentUser.uid),
        orderBy('savedAt', 'desc')
      );

      // Filter by story if provided
      if (storyId) {
        q = query(
          quotesRef,
          where('userId', '==', currentUser.uid),
          where('storyId', '==', storyId),
          orderBy('savedAt', 'desc')
        );
      }

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const quotesData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as SavedQuote[];
          setQuotes(quotesData);
          setLoading(false);
        },
        (err) => {
          console.error('Error fetching quotes:', err);
          setError('Failed to load quotes');
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error('Error setting up quotes listener:', err);
      setError('Failed to initialize quotes');
      setLoading(false);
    }
  }, [currentUser, storyId]);

  const saveQuote = async (
    quote: string,
    storyId: string,
    storyTitle: string,
    storyAuthor: string,
    options?: {
      context?: string;
      chapterNumber?: number;
      tags?: string[];
      ribbonColor?: string;
      notes?: string;
    }
  ): Promise<string | null> => {
    if (!currentUser) {
      showError('Please sign in to save quotes');
      return null;
    }

    try {
      const quoteData: any = {
        userId: currentUser.uid,
        storyId,
        storyTitle,
        storyAuthor,
        quote: quote.trim(),
        tags: options?.tags || [],
        ribbonColor: options?.ribbonColor || '#ffb6d9',
        isPrivate: true,
        notes: options?.notes || '',
        savedAt: serverTimestamp(),
      };

      // Only add optional fields if they exist (Firebase doesn't allow undefined)
      if (options?.context) {
        quoteData.context = options.context;
      }
      if (options?.chapterNumber !== undefined) {
        quoteData.chapterNumber = options.chapterNumber;
      }

      const docRef = await addDoc(collection(db, 'savedQuotes'), quoteData);
      showSuccess('Quote saved');
      return docRef.id;
    } catch (err) {
      console.error('Error saving quote:', err);
      showError('Failed to save quote');
      return null;
    }
  };

  const deleteQuote = async (quoteId: string): Promise<boolean> => {
    if (!currentUser) return false;

    try {
      await deleteDoc(doc(db, 'savedQuotes', quoteId));
      showSuccess('Quote removed');
      return true;
    } catch (err) {
      console.error('Error deleting quote:', err);
      showError('Failed to remove quote');
      return false;
    }
  };

  const updateQuote = async (
    quoteId: string,
    updates: Partial<SavedQuote>
  ): Promise<boolean> => {
    if (!currentUser) return false;

    try {
      await updateDoc(doc(db, 'savedQuotes', quoteId), updates);
      showSuccess('Quote updated');
      return true;
    } catch (err) {
      console.error('Error updating quote:', err);
      showError('Failed to update quote');
      return false;
    }
  };

  const getQuotesByStory = (storyId: string): SavedQuote[] => {
    return quotes.filter((q) => q.storyId === storyId);
  };

  const getQuoteCount = (storyId?: string): number => {
    if (storyId) {
      return quotes.filter((q) => q.storyId === storyId).length;
    }
    return quotes.length;
  };

  return {
    quotes,
    loading,
    error,
    saveQuote,
    deleteQuote,
    updateQuote,
    getQuotesByStory,
    getQuoteCount,
  };
};
