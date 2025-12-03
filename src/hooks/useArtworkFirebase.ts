/**
 * useArtworkFirebase Hook
 * Manages artwork with Firebase persistence (migrated from localStorage)
 */

import { useState, useEffect, useCallback } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { Artwork } from '../types/artwork';
import { handleFirestoreError } from '../utils/errorHandler';
import { dataCache } from '../utils/cache';

export const useArtworkFirebase = () => {
  const { currentUser } = useAuth();
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cacheKey = `artworks-${currentUser?.uid || 'guest'}`;

  // Subscribe to user's artworks
  useEffect(() => {
    if (!currentUser) {
      setArtworks([]);
      setLoading(false);
      return;
    }

    // Check cache first
    const cached = dataCache.get(cacheKey) as Artwork[] | null;
    if (cached) {
      setArtworks(cached);
      setLoading(false);
    }

    const q = query(
      collection(db, 'artworks'),
      where('userId', '==', currentUser.uid),
      where('isArchived', '==', false),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const artworksData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: (doc.data().createdAt as Timestamp)?.toDate() || new Date(),
          updatedAt: (doc.data().updatedAt as Timestamp)?.toDate() || new Date(),
        })) as Artwork[];
        
        setArtworks(artworksData);
        dataCache.set(cacheKey, artworksData);
        setLoading(false);
      },
      (err) => {
        const errorMsg = handleFirestoreError(err, 'useArtworkFirebase.subscribe');
        setError(errorMsg);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [currentUser, cacheKey]);

  // Add new artwork
  const addArtwork = useCallback(async (artwork: Omit<Artwork, 'id' | 'createdAt' | 'updatedAt'>): Promise<Artwork | null> => {
    if (!currentUser) {
      setError('Please sign in to save artwork.');
      return null;
    }

    try {
      const artworkData = {
        ...artwork,
        userId: currentUser.uid,
        isArchived: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, 'artworks'), artworkData);
      
      const newArtwork: Artwork = {
        ...artwork,
        id: docRef.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      return newArtwork;
    } catch (err: any) {
      const errorMsg = handleFirestoreError(err, 'useArtworkFirebase.addArtwork');
      setError(errorMsg);
      return null;
    }
  }, [currentUser]);

  // Update artwork
  const updateArtwork = useCallback(async (id: string, updates: Partial<Artwork>): Promise<boolean> => {
    if (!currentUser) {
      setError('Please sign in to update artwork.');
      return false;
    }

    try {
      const artworkRef = doc(db, 'artworks', id);
      await updateDoc(artworkRef, {
        ...updates,
        updatedAt: serverTimestamp(),
      });
      return true;
    } catch (err: any) {
      const errorMsg = handleFirestoreError(err, 'useArtworkFirebase.updateArtwork');
      setError(errorMsg);
      return false;
    }
  }, [currentUser]);

  // Delete artwork
  const deleteArtwork = useCallback(async (id: string): Promise<boolean> => {
    if (!currentUser) {
      setError('Please sign in to delete artwork.');
      return false;
    }

    try {
      await deleteDoc(doc(db, 'artworks', id));
      return true;
    } catch (err: any) {
      const errorMsg = handleFirestoreError(err, 'useArtworkFirebase.deleteArtwork');
      setError(errorMsg);
      return false;
    }
  }, [currentUser]);

  // Archive artwork
  const archiveArtwork = useCallback(async (id: string): Promise<boolean> => {
    if (!currentUser) {
      setError('Please sign in to archive artwork.');
      return false;
    }

    try {
      const artworkRef = doc(db, 'artworks', id);
      await updateDoc(artworkRef, {
        isArchived: true,
        archivedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return true;
    } catch (err: any) {
      const errorMsg = handleFirestoreError(err, 'useArtworkFirebase.archiveArtwork');
      setError(errorMsg);
      return false;
    }
  }, [currentUser]);

  // Get artwork by ID
  const getArtwork = useCallback((id: string) => {
    return artworks.find(art => art.id === id);
  }, [artworks]);

  return {
    artworks,
    loading,
    error,
    addArtwork,
    updateArtwork,
    deleteArtwork,
    archiveArtwork,
    getArtwork,
  };
};
