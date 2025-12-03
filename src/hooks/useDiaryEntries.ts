/**
 * useDiaryEntries Hook
 * Optimized diary entries fetching with caching
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { DiaryEntry, CreateEntryData, UpdateEntryData, DiaryFilters } from '../types/diary';
import { handleFirestoreError } from '../utils/errorHandler';
import { encryptContent } from '../utils/encryption';
import { SAMPLE_DIARY_ENTRIES } from '../data/sampleDiaryEntries';
import { dataCache } from '../utils/cache';

const ENTRIES_PER_BATCH = 20;

export const useDiaryEntries = (filters?: DiaryFilters) => {
  const { currentUser } = useAuth();
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cacheKey = useMemo(() => 
    `diary-${currentUser?.uid || 'guest'}-${filters?.mood || 'all'}`,
    [currentUser?.uid, filters?.mood]
  );

  const loadEntries = useCallback(async () => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Check cache first
      const cached = dataCache.get(cacheKey) as DiaryEntry[] | null;
      if (cached) {
        setEntries(cached);
        setLoading(false);
        return;
      }

      const entriesRef = collection(db, 'diary_entries');
      let q = query(
        entriesRef,
        where('userId', '==', currentUser.uid),
        orderBy('createdAt', 'desc'),
        limit(ENTRIES_PER_BATCH)
      );

      // Apply mood filter
      if (filters?.mood) {
        q = query(q, where('mood', '==', filters.mood));
      }

      const snapshot = await getDocs(q);
      
      const entriesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: (doc.data().createdAt as Timestamp)?.toDate() || new Date(),
        updatedAt: (doc.data().updatedAt as Timestamp)?.toDate() || new Date(),
      })) as DiaryEntry[];

      // If no user entries, show sample entries
      const finalEntries = entriesData.length === 0
        ? SAMPLE_DIARY_ENTRIES.map(entry => ({ ...entry, userId: currentUser.uid }))
        : entriesData;

      setEntries(finalEntries);
      dataCache.set(cacheKey, finalEntries);
    } catch (err: any) {
      const errorMsg = handleFirestoreError(err, 'useDiaryEntries.loadEntries');
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  }, [currentUser, filters?.mood, cacheKey]);

  const createEntry = async (data: CreateEntryData): Promise<DiaryEntry | null> => {
    if (!currentUser) {
      console.error('❌ createEntry: No current user');
      const errorMsg = '🔒 Please sign in to create an entry.';
      setError(errorMsg);
      alert(errorMsg);
      return null;
    }

    console.log('📝 createEntry: Starting...', { userId: currentUser.uid, contentLength: data.content.length });

    try {
      // Import security middleware
      const { checkActionPermission } = await import('../middleware/securityMiddleware');
      const { validateLength } = await import('../utils/securityEnhanced');
      
      // Check rate limit
      console.log('🔒 Checking rate limit...');
      const rateLimitCheck = checkActionPermission(currentUser.uid, 'DIARY_CREATE', data.content);
      console.log('🔒 Rate limit check result:', rateLimitCheck);
      
      if (!rateLimitCheck.allowed) {
        console.error('❌ Rate limit check failed:', rateLimitCheck.error);
        const errorMsg = `🚫 ${rateLimitCheck.error || 'Rate limit exceeded'}`;
        setError(errorMsg);
        alert(errorMsg);
        return null;
      }

      // Validate content length
      console.log('📏 Validating content length...');
      const lengthValidation = validateLength(data.content, 1, 50000);
      console.log('📏 Length validation result:', lengthValidation);
      
      if (!lengthValidation.valid) {
        console.error('❌ Length validation failed:', lengthValidation.error);
        const errorMsg = `📏 ${lengthValidation.error || 'Invalid content length'}`;
        setError(errorMsg);
        alert(errorMsg);
        return null;
      }

      let contentToStore = data.content;
      let encryptedContent: string | null = null;

      // Encrypt if locked
      if (data.isLocked) {
        encryptedContent = await encryptContent(data.content, currentUser.uid);
        contentToStore = ''; // Clear plain content
      }

      const entryData: any = {
        userId: currentUser.uid,
        content: contentToStore,
        mood: data.mood,
        isLocked: data.isLocked,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      // Only add encryptedContent if it exists
      if (encryptedContent) {
        entryData.encryptedContent = encryptedContent;
      }

      console.log('💾 Saving to Firestore...', entryData);
      const docRef = await addDoc(collection(db, 'diary_entries'), entryData);
      console.log('✅ Saved to Firestore with ID:', docRef.id);
      
      const newEntry: DiaryEntry = {
        id: docRef.id,
        ...entryData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Add to local state and invalidate cache
      const updatedEntries = [newEntry, ...entries];
      setEntries(updatedEntries);
      dataCache.set(cacheKey, updatedEntries);

      console.log('✅ Entry created successfully:', newEntry.id);
      return newEntry;
    } catch (err: any) {
      console.error('❌ createEntry error:', err);
      console.error('❌ Error code:', err.code);
      console.error('❌ Error message:', err.message);
      const errorMsg = handleFirestoreError(err, 'useDiaryEntries.createEntry');
      setError(errorMsg);
      
      // Show detailed error in alert
      const detailedError = `
❌ Failed to save diary entry

Error: ${err.message || 'Unknown error'}
Code: ${err.code || 'N/A'}

This might be:
• Firebase permission issue
• Network connection problem  
• Security validation failure

Full error: ${errorMsg}
      `.trim();
      
      alert(detailedError);
      return null;
    }
  };

  const updateEntry = async (entryId: string, data: UpdateEntryData): Promise<boolean> => {
    if (!currentUser) {
      setError('Please sign in to update an entry.');
      return false;
    }

    // Prevent updating sample entries
    if (entryId.startsWith('sample-')) {
      setError('Sample entries cannot be updated. Create your own entry!');
      setTimeout(() => setError(null), 3000);
      return false;
    }

    try {
      const { updateDoc } = await import('firebase/firestore');
      const entryRef = doc(db, 'diary_entries', entryId);
      
      const updateData: any = {
        ...data,
        updatedAt: serverTimestamp(),
      };

      // Handle encryption if locking
      if (data.isLocked !== undefined && data.isLocked && data.content) {
        const encryptedContent = await encryptContent(data.content, currentUser.uid);
        updateData.encryptedContent = encryptedContent;
        updateData.content = '';
      }

      await updateDoc(entryRef, updateData);
      
      // Update local state
      const updatedEntries = entries.map(e => 
        e.id === entryId 
          ? { ...e, ...data, updatedAt: new Date() }
          : e
      );
      setEntries(updatedEntries);
      dataCache.set(cacheKey, updatedEntries);

      return true;
    } catch (err: any) {
      const errorMsg = handleFirestoreError(err, 'useDiaryEntries.updateEntry');
      setError(errorMsg);
      return false;
    }
  };

  const toggleHidden = async (entryId: string): Promise<boolean> => {
    if (!currentUser) {
      setError('Please sign in to hide/unhide entries.');
      return false;
    }

    if (entryId.startsWith('sample-')) {
      setError('Sample entries cannot be modified.');
      setTimeout(() => setError(null), 3000);
      return false;
    }

    try {
      const { updateDoc } = await import('firebase/firestore');
      const entry = entries.find(e => e.id === entryId);
      if (!entry) return false;

      const newHiddenState = !entry.isHidden;
      const entryRef = doc(db, 'diary_entries', entryId);
      
      await updateDoc(entryRef, {
        isHidden: newHiddenState,
        updatedAt: serverTimestamp(),
      });
      
      // Update local state
      const updatedEntries = entries.map(e => 
        e.id === entryId 
          ? { ...e, isHidden: newHiddenState, updatedAt: new Date() }
          : e
      );
      setEntries(updatedEntries);
      dataCache.set(cacheKey, updatedEntries);

      return true;
    } catch (err: any) {
      const errorMsg = handleFirestoreError(err, 'useDiaryEntries.toggleHidden');
      setError(errorMsg);
      return false;
    }
  };

  const toggleFavorite = async (entryId: string): Promise<boolean> => {
    if (!currentUser) {
      setError('Please sign in to favorite entries.');
      return false;
    }

    if (entryId.startsWith('sample-')) {
      setError('Sample entries cannot be modified.');
      setTimeout(() => setError(null), 3000);
      return false;
    }

    try {
      const { updateDoc } = await import('firebase/firestore');
      const entry = entries.find(e => e.id === entryId);
      if (!entry) return false;

      const newFavoriteState = !entry.isFavorite;
      const entryRef = doc(db, 'diary_entries', entryId);
      
      await updateDoc(entryRef, {
        isFavorite: newFavoriteState,
        updatedAt: serverTimestamp(),
      });
      
      // Update local state
      const updatedEntries = entries.map(e => 
        e.id === entryId 
          ? { ...e, isFavorite: newFavoriteState, updatedAt: new Date() }
          : e
      );
      setEntries(updatedEntries);
      dataCache.set(cacheKey, updatedEntries);

      return true;
    } catch (err: any) {
      const errorMsg = handleFirestoreError(err, 'useDiaryEntries.toggleFavorite');
      setError(errorMsg);
      return false;
    }
  };

  const updateTags = async (entryId: string, tags: string[]): Promise<boolean> => {
    if (!currentUser) {
      setError('Please sign in to update tags.');
      return false;
    }

    if (entryId.startsWith('sample-')) {
      setError('Sample entries cannot be modified.');
      setTimeout(() => setError(null), 3000);
      return false;
    }

    try {
      const { updateDoc } = await import('firebase/firestore');
      const entryRef = doc(db, 'diary_entries', entryId);
      
      await updateDoc(entryRef, {
        tags,
        updatedAt: serverTimestamp(),
      });
      
      // Update local state
      const updatedEntries = entries.map(e => 
        e.id === entryId 
          ? { ...e, tags, updatedAt: new Date() }
          : e
      );
      setEntries(updatedEntries);
      dataCache.set(cacheKey, updatedEntries);

      return true;
    } catch (err: any) {
      const errorMsg = handleFirestoreError(err, 'useDiaryEntries.updateTags');
      setError(errorMsg);
      return false;
    }
  };

  const deleteEntry = async (entryId: string): Promise<boolean> => {
    if (!currentUser) {
      setError('Please sign in to delete an entry.');
      return false;
    }

    // Prevent deleting sample entries
    if (entryId.startsWith('sample-')) {
      setError('Sample entries cannot be deleted. Create your own entry!');
      setTimeout(() => setError(null), 3000);
      return false;
    }

    try {
      await deleteDoc(doc(db, 'diary_entries', entryId));
      
      // Remove from local state and invalidate cache
      const updatedEntries = entries.filter(e => e.id !== entryId);
      setEntries(updatedEntries);
      dataCache.set(cacheKey, updatedEntries);

      return true;
    } catch (err: any) {
      const errorMsg = handleFirestoreError(err, 'useDiaryEntries.deleteEntry');
      setError(errorMsg);
      return false;
    }
  };

  useEffect(() => {
    loadEntries();
  }, [loadEntries]);

  return {
    entries,
    loading,
    error,
    createEntry,
    updateEntry,
    deleteEntry,
    toggleHidden,
    toggleFavorite,
    updateTags,
    refreshEntries: useCallback(() => {
      dataCache.delete(cacheKey);
      loadEntries();
    }, [cacheKey, loadEntries]),
  };
};
