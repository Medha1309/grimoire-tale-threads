import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot, addDoc, updateDoc, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { ScrapbookCollection } from '../types/scrapbook';

export const useScrapbookCollections = () => {
  const { currentUser } = useAuth();
  const [collections, setCollections] = useState<ScrapbookCollection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!currentUser) {
      setCollections([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'scrapbookCollections'),
      where('userId', '==', currentUser.uid),
      orderBy('updatedAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const collectionsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          updatedAt: doc.data().updatedAt?.toDate() || new Date(),
        })) as ScrapbookCollection[];
        
        setCollections(collectionsData);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error('Error fetching collections:', err);
        setError('Failed to load collections');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  const createCollection = async (title: string, description?: string) => {
    if (!currentUser) throw new Error('Must be logged in');

    const newCollection = {
      userId: currentUser.uid,
      title,
      description: description || '',
      itemCount: 0,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      isPrivate: true,
    };

    const docRef = await addDoc(collection(db, 'scrapbookCollections'), newCollection);
    return docRef.id;
  };

  const updateCollection = async (collectionId: string, updates: Partial<ScrapbookCollection>) => {
    const docRef = doc(db, 'scrapbookCollections', collectionId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    });
  };

  const deleteCollection = async (collectionId: string) => {
    const docRef = doc(db, 'scrapbookCollections', collectionId);
    await deleteDoc(docRef);
  };

  return {
    collections,
    loading,
    error,
    createCollection,
    updateCollection,
    deleteCollection,
  };
};
