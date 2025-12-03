/**
 * useDiaryEntry Hook
 * Manages single diary entry fetching and updating
 */

import { useState, useEffect, useCallback } from 'react';
import {
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { DiaryEntry } from '../types/diary';
import { handleFirestoreError } from '../utils/errorHandler';
import { encryptContent, decryptContent } from '../utils/encryption';
import { SAMPLE_DIARY_ENTRIES } from '../data/sampleDiaryEntries';

export const useDiaryEntry = (entryId: string | undefined) => {
  const { currentUser } = useAuth();
  const [entry, setEntry] = useState<DiaryEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadEntry = useCallback(async () => {
    if (!entryId || !currentUser) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Check if it's a sample entry first
      const sampleEntry = SAMPLE_DIARY_ENTRIES.find(e => e.id === entryId);
      
      let entryData: DiaryEntry;
      
      if (sampleEntry) {
        // Use sample entry
        entryData = {
          ...sampleEntry,
          userId: currentUser.uid,
        };
      } else {
        // Fetch from Firestore
        const entryRef = doc(db, 'diary_entries', entryId);
        const entrySnap = await getDoc(entryRef);

        if (!entrySnap.exists()) {
          setError('Entry not found.');
          setLoading(false);
          return;
        }

        entryData = {
          id: entrySnap.id,
          ...entrySnap.data(),
          createdAt: (entrySnap.data().createdAt as Timestamp)?.toDate() || new Date(),
          updatedAt: (entrySnap.data().updatedAt as Timestamp)?.toDate() || new Date(),
        } as DiaryEntry;
      }

      // Decrypt if locked
      if (entryData.isLocked && entryData.encryptedContent) {
        try {
          entryData.content = await decryptContent(entryData.encryptedContent, currentUser.uid);
        } catch (decryptError) {
          setError('Failed to decrypt entry. The seal is broken.');
        }
      }

      setEntry(entryData);
    } catch (err: any) {
      const errorMsg = handleFirestoreError(err, 'useDiaryEntry.loadEntry');
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  }, [entryId, currentUser]);

  const toggleLock = async (): Promise<boolean> => {
    if (!entry || !currentUser) {
      setError('Cannot toggle lock.');
      return false;
    }

    // Sample entries can't be modified
    if (entry.id.startsWith('sample-')) {
      setError('Sample entries cannot be modified. Create your own entry!');
      setTimeout(() => setError(null), 3000);
      return false;
    }

    try {
      const entryRef = doc(db, 'diary_entries', entry.id);
      const newLockState = !entry.isLocked;

      let updateData: any = {
        isLocked: newLockState,
        updatedAt: serverTimestamp(),
      };

      if (newLockState) {
        // Locking: encrypt content
        const encrypted = await encryptContent(entry.content, currentUser.uid);
        updateData.encryptedContent = encrypted;
        updateData.content = ''; // Clear plain content
      } else {
        // Unlocking: decrypt content
        if (entry.encryptedContent) {
          const decrypted = await decryptContent(entry.encryptedContent, currentUser.uid);
          updateData.content = decrypted;
          updateData.encryptedContent = null;
        }
      }

      await updateDoc(entryRef, updateData);

      // Update local state
      setEntry(prev => prev ? { ...prev, ...updateData, updatedAt: new Date() } : null);

      return true;
    } catch (err: any) {
      const errorMsg = handleFirestoreError(err, 'useDiaryEntry.toggleLock');
      setError(errorMsg);
      return false;
    }
  };

  const updateEntry = async (content: string): Promise<boolean> => {
    if (!entry || !currentUser) {
      setError('Cannot update entry.');
      return false;
    }

    try {
      const entryRef = doc(db, 'diary_entries', entry.id);
      
      let updateData: any = {
        updatedAt: serverTimestamp(),
      };

      if (entry.isLocked) {
        // If locked, encrypt new content
        updateData.encryptedContent = await encryptContent(content, currentUser.uid);
        updateData.content = '';
      } else {
        updateData.content = content;
      }

      await updateDoc(entryRef, updateData);

      // Update local state
      setEntry(prev => prev ? { 
        ...prev, 
        content: entry.isLocked ? prev.content : content,
        updatedAt: new Date() 
      } : null);

      return true;
    } catch (err: any) {
      const errorMsg = handleFirestoreError(err, 'useDiaryEntry.updateEntry');
      setError(errorMsg);
      return false;
    }
  };

  const deleteEntry = async (): Promise<boolean> => {
    if (!entry || !currentUser) {
      setError('Cannot delete entry.');
      return false;
    }

    // Sample entries can't be deleted
    if (entry.id.startsWith('sample-')) {
      setError('Sample entries cannot be deleted. Create your own entry!');
      setTimeout(() => setError(null), 3000);
      return false;
    }

    try {
      await deleteDoc(doc(db, 'diary_entries', entry.id));
      return true;
    } catch (err: any) {
      const errorMsg = handleFirestoreError(err, 'useDiaryEntry.deleteEntry');
      setError(errorMsg);
      return false;
    }
  };

  useEffect(() => {
    loadEntry();
  }, [loadEntry]);

  return {
    entry,
    loading,
    error,
    toggleLock,
    updateEntry,
    deleteEntry,
    refreshEntry: loadEntry,
  };
};
