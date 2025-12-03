/**
 * useForumLikes Hook
 * Manages like/unlike actions with optimistic updates
 */

import { useState, useEffect, useCallback } from 'react';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  increment,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { handleFirestoreError } from '../utils/errorHandler';

export const useForumLikes = (targetId: string, targetType: 'post' | 'reply') => {
  const { currentUser } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user has liked this item
  useEffect(() => {
    if (!currentUser || !targetId) {
      setLoading(false);
      return;
    }

    const checkLikeStatus = async () => {
      try {
        const likesRef = collection(db, 'forum_likes');
        const q = query(
          likesRef,
          where('userId', '==', currentUser.uid),
          where('targetId', '==', targetId),
          where('targetType', '==', targetType)
        );

        const snapshot = await getDocs(q);
        setIsLiked(!snapshot.empty);
      } catch (err: any) {
        console.error('Error checking like status:', err);
      } finally {
        setLoading(false);
      }
    };

    checkLikeStatus();
  }, [currentUser, targetId, targetType]);

  const toggleLike = useCallback(async () => {
    if (!currentUser) {
      setError('Please sign in to like posts.');
      return;
    }

    // Optimistic update
    const previousIsLiked = isLiked;
    const previousCount = likeCount;
    setIsLiked(!isLiked);
    setLikeCount(prev => prev + (isLiked ? -1 : 1));

    try {
      const likesRef = collection(db, 'forum_likes');
      const collectionName = targetType === 'post' ? 'forum_posts' : 'forum_replies';
      const targetRef = doc(db, collectionName, targetId);

      if (isLiked) {
        // Unlike
        const q = query(
          likesRef,
          where('userId', '==', currentUser.uid),
          where('targetId', '==', targetId),
          where('targetType', '==', targetType)
        );
        const snapshot = await getDocs(q);
        
        if (!snapshot.empty) {
          await deleteDoc(doc(db, 'forum_likes', snapshot.docs[0].id));
          await updateDoc(targetRef, {
            likeCount: increment(-1)
          });
        }
      } else {
        // Like
        await addDoc(likesRef, {
          userId: currentUser.uid,
          targetId,
          targetType,
          createdAt: serverTimestamp(),
        });
        await updateDoc(targetRef, {
          likeCount: increment(1)
        });
      }
    } catch (err: any) {
      // Rollback on error
      setIsLiked(previousIsLiked);
      setLikeCount(previousCount);
      
      const errorMsg = handleFirestoreError(err, 'useForumLikes.toggleLike');
      setError(errorMsg);
      
      // Clear error after 3 seconds
      setTimeout(() => setError(null), 3000);
    }
  }, [currentUser, targetId, targetType, isLiked, likeCount]);

  return {
    isLiked,
    likeCount,
    loading,
    error,
    toggleLike,
    setLikeCount, // For external updates
  };
};
