import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  increment,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { dataCache } from '../utils/cache';

export interface Comment {
  id: string;
  storyId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  text: string;
  parentId?: string;
  likes: number;
  likedBy: string[];
  createdAt: Timestamp;
  updatedAt?: Timestamp;
}

export const useComments = (storyId: string) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentUser, userProfile } = useAuth();

  const cacheKey = useMemo(() => `comments-${storyId}`, [storyId]);

  // Subscribe to comments in real-time
  useEffect(() => {
    if (!storyId) return;

    // Check cache first
    const cached = dataCache.get(cacheKey) as Comment[] | null;
    if (cached) {
      setComments(cached);
      setLoading(false);
    }

    const q = query(
      collection(db, 'comments'),
      where('storyId', '==', storyId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const commentsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Comment[];
        setComments(commentsData);
        dataCache.set(cacheKey, commentsData);
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching comments:', err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [storyId, cacheKey]);

  // Add a new comment
  const addComment = async (text: string, parentId?: string) => {
    if (!currentUser || !userProfile) {
      throw new Error('You must be logged in to comment');
    }

    if (!text.trim()) {
      throw new Error('Comment cannot be empty');
    }

    try {
      const commentData: any = {
        storyId,
        userId: currentUser.uid,
        userName: userProfile.displayName,
        text: text.trim(),
        parentId: parentId || null,
        likes: 0,
        likedBy: [],
        createdAt: serverTimestamp(),
      };

      // Only add userAvatar if it exists (Firebase doesn't allow undefined values)
      if (userProfile.photoURL) {
        commentData.userAvatar = userProfile.photoURL;
      }

      await addDoc(collection(db, 'comments'), commentData);
    } catch (err: any) {
      console.error('Error adding comment:', err);
      throw new Error(err.message || 'Failed to add comment');
    }
  };

  // Delete a comment
  const deleteComment = async (commentId: string) => {
    if (!currentUser) {
      throw new Error('You must be logged in to delete comments');
    }

    const comment = comments.find((c) => c.id === commentId);
    if (!comment) {
      throw new Error('Comment not found');
    }

    if (comment.userId !== currentUser.uid) {
      throw new Error('You can only delete your own comments');
    }

    try {
      await deleteDoc(doc(db, 'comments', commentId));
    } catch (err: any) {
      console.error('Error deleting comment:', err);
      throw new Error(err.message || 'Failed to delete comment');
    }
  };

  // Like/unlike a comment
  const toggleLike = async (commentId: string) => {
    if (!currentUser) {
      throw new Error('You must be logged in to like comments');
    }

    const comment = comments.find((c) => c.id === commentId);
    if (!comment) {
      throw new Error('Comment not found');
    }

    const hasLiked = comment.likedBy.includes(currentUser.uid);

    try {
      const commentRef = doc(db, 'comments', commentId);
      
      if (hasLiked) {
        // Unlike
        await updateDoc(commentRef, {
          likes: increment(-1),
          likedBy: comment.likedBy.filter((id) => id !== currentUser.uid),
        });
      } else {
        // Like
        await updateDoc(commentRef, {
          likes: increment(1),
          likedBy: [...comment.likedBy, currentUser.uid],
        });
      }
    } catch (err: any) {
      console.error('Error toggling like:', err);
      throw new Error(err.message || 'Failed to toggle like');
    }
  };

  // Edit a comment
  const editComment = async (commentId: string, newText: string) => {
    if (!currentUser) {
      throw new Error('You must be logged in to edit comments');
    }

    const comment = comments.find((c) => c.id === commentId);
    if (!comment) {
      throw new Error('Comment not found');
    }

    if (comment.userId !== currentUser.uid) {
      throw new Error('You can only edit your own comments');
    }

    if (!newText.trim()) {
      throw new Error('Comment cannot be empty');
    }

    try {
      await updateDoc(doc(db, 'comments', commentId), {
        text: newText.trim(),
        updatedAt: serverTimestamp(),
      });
    } catch (err: any) {
      console.error('Error editing comment:', err);
      throw new Error(err.message || 'Failed to edit comment');
    }
  };

  // Memoized replies and top-level comments
  const getReplies = useCallback((parentId: string) => {
    return comments.filter((c) => c.parentId === parentId);
  }, [comments]);

  const getTopLevelComments = useCallback(() => {
    return comments.filter((c) => !c.parentId);
  }, [comments]);

  return {
    comments,
    loading,
    error,
    addComment,
    deleteComment,
    toggleLike,
    editComment,
    getReplies,
    getTopLevelComments,
  };
};
