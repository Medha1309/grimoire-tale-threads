import { useState, useEffect } from 'react';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  arrayUnion,
  arrayRemove,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Top8Friend } from '../types/myspace';
import { UserProfile } from '../types';

export const useTop8Friends = (userId: string) => {
  const [top8, setTop8] = useState<Top8Friend[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTop8();
  }, [userId]);

  const loadTop8 = async () => {
    try {
      setLoading(true);
      const profileDoc = await getDoc(doc(db, 'myspace_profiles', userId));
      
      if (profileDoc.exists()) {
        const data = profileDoc.data();
        setTop8(data.top8Friends || []);
      } else {
        setTop8([]);
      }
    } catch (err) {
      console.error('Error loading Top 8:', err);
      setError('Failed to load Top 8 friends');
    } finally {
      setLoading(false);
    }
  };

  const addToTop8 = async (friendUserId: string, friendDisplayName: string) => {
    try {
      if (top8.length >= 8) {
        throw new Error('Top 8 is full! Remove someone first.');
      }

      if (top8.some(f => f.userId === friendUserId)) {
        throw new Error('This user is already in your Top 8!');
      }

      const newFriend: Top8Friend = {
        userId: friendUserId,
        displayName: friendDisplayName,
        position: top8.length + 1,
        addedAt: new Date(),
      };

      const profileRef = doc(db, 'myspace_profiles', userId);
      const profileDoc = await getDoc(profileRef);

      if (profileDoc.exists()) {
        await updateDoc(profileRef, {
          top8Friends: arrayUnion(newFriend),
          lastUpdated: Timestamp.now(),
        });
      } else {
        await setDoc(profileRef, {
          userId,
          top8Friends: [newFriend],
          profileViews: 0,
          lastUpdated: Timestamp.now(),
        });
      }

      await loadTop8();
      return { success: true };
    } catch (err: any) {
      console.error('Error adding to Top 8:', err);
      return { success: false, error: err.message };
    }
  };

  const removeFromTop8 = async (friendUserId: string) => {
    try {
      const friendToRemove = top8.find(f => f.userId === friendUserId);
      if (!friendToRemove) {
        throw new Error('Friend not found in Top 8');
      }

      const profileRef = doc(db, 'myspace_profiles', userId);
      await updateDoc(profileRef, {
        top8Friends: arrayRemove(friendToRemove),
        lastUpdated: Timestamp.now(),
      });

      // Reorder remaining friends
      const remaining = top8.filter(f => f.userId !== friendUserId);
      const reordered = remaining.map((f, index) => ({
        ...f,
        position: index + 1,
      }));

      await updateDoc(profileRef, {
        top8Friends: reordered,
      });

      await loadTop8();
      return { success: true };
    } catch (err: any) {
      console.error('Error removing from Top 8:', err);
      return { success: false, error: err.message };
    }
  };

  const reorderTop8 = async (newOrder: Top8Friend[]) => {
    try {
      const reordered = newOrder.map((friend, index) => ({
        ...friend,
        position: index + 1,
      }));

      const profileRef = doc(db, 'myspace_profiles', userId);
      await updateDoc(profileRef, {
        top8Friends: reordered,
        lastUpdated: Timestamp.now(),
      });

      setTop8(reordered);
      return { success: true };
    } catch (err: any) {
      console.error('Error reordering Top 8:', err);
      return { success: false, error: err.message };
    }
  };

  const searchUsers = async (searchTerm: string): Promise<UserProfile[]> => {
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('displayName', '>=', searchTerm), where('displayName', '<=', searchTerm + '\uf8ff'));
      const snapshot = await getDocs(q);
      
      return snapshot.docs
        .map(doc => ({ uid: doc.id, ...doc.data() } as UserProfile))
        .filter(user => user.uid !== userId); // Don't include self
    } catch (err) {
      console.error('Error searching users:', err);
      return [];
    }
  };

  return {
    top8,
    loading,
    error,
    addToTop8,
    removeFromTop8,
    reorderTop8,
    searchUsers,
    refresh: loadTop8,
  };
};
