import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot, addDoc, updateDoc, deleteDoc, doc, Timestamp, writeBatch } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { ScrapbookItem } from '../types/scrapbook';

export const useScrapbookItems = (collectionId: string | null) => {
  const { currentUser } = useAuth();
  const [items, setItems] = useState<ScrapbookItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!currentUser || !collectionId) {
      setItems([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'scrapbookItems'),
      where('collectionId', '==', collectionId),
      where('userId', '==', currentUser.uid),
      orderBy('position', 'asc')
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const itemsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          updatedAt: doc.data().updatedAt?.toDate() || new Date(),
        })) as ScrapbookItem[];
        
        setItems(itemsData);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error('Error fetching items:', err);
        setError('Failed to load items');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [currentUser, collectionId]);

  const addItem = async (
    collectionId: string,
    imageUrl: string,
    title: string,
    caption?: string,
    notes?: string
  ) => {
    if (!currentUser) throw new Error('Must be logged in');

    const position = items.length;
    
    const newItem = {
      collectionId,
      userId: currentUser.uid,
      imageUrl,
      title,
      caption: caption || '',
      notes: notes || '',
      position,
      connections: [],
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    const docRef = await addDoc(collection(db, 'scrapbookItems'), newItem);
    
    // Update collection item count
    const collectionRef = doc(db, 'scrapbookCollections', collectionId);
    await updateDoc(collectionRef, {
      itemCount: items.length + 1,
      updatedAt: Timestamp.now(),
    });
    
    return docRef.id;
  };

  const updateItem = async (itemId: string, updates: Partial<ScrapbookItem>) => {
    const docRef = doc(db, 'scrapbookItems', itemId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    });
  };

  const deleteItem = async (itemId: string, collectionId: string) => {
    const docRef = doc(db, 'scrapbookItems', itemId);
    await deleteDoc(docRef);
    
    // Update collection item count
    const collectionRef = doc(db, 'scrapbookCollections', collectionId);
    await updateDoc(collectionRef, {
      itemCount: Math.max(0, items.length - 1),
      updatedAt: Timestamp.now(),
    });
  };

  const reorderItems = async (reorderedItems: ScrapbookItem[]) => {
    const batch = writeBatch(db);
    
    reorderedItems.forEach((item, index) => {
      const docRef = doc(db, 'scrapbookItems', item.id);
      batch.update(docRef, { position: index });
    });
    
    await batch.commit();
  };

  const addConnection = async (itemId: string, targetItemId: string) => {
    const item = items.find(i => i.id === itemId);
    if (!item) return;
    
    const connections = item.connections || [];
    if (!connections.includes(targetItemId)) {
      await updateItem(itemId, {
        connections: [...connections, targetItemId],
      });
    }
  };

  const removeConnection = async (itemId: string, targetItemId: string) => {
    const item = items.find(i => i.id === itemId);
    if (!item) return;
    
    const connections = item.connections || [];
    await updateItem(itemId, {
      connections: connections.filter(id => id !== targetItemId),
    });
  };

  return {
    items,
    loading,
    error,
    addItem,
    updateItem,
    deleteItem,
    reorderItems,
    addConnection,
    removeConnection,
  };
};
