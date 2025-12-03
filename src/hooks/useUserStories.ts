import { useState, useEffect, useMemo } from 'react';
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
import { dataCache } from '../utils/cache';

export interface UserStory {
  id: string;
  slug: string;
  title: string;
  author: string;
  authorId: string;
  content: string;
  genre: 'horror' | 'thriller' | 'mystery' | 'romance';
  cover?: string;
  coverType?: 'image' | 'gif' | 'video';
  blurb?: string;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
  published: boolean;
}

export interface CreateStoryData {
  title: string;
  content: string;
  genre: 'horror' | 'thriller' | 'mystery' | 'romance';
  published?: boolean;
  cover?: string;
  coverType?: 'image' | 'gif' | 'video';
  blurb?: string;
}

export const useUserStories = () => {
  const { currentUser, userProfile } = useAuth();
  const [stories, setStories] = useState<UserStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cacheKey = useMemo(() => `user-stories-${currentUser?.uid || 'guest'}`, [currentUser?.uid]);

  // Subscribe to user's stories
  useEffect(() => {
    if (!currentUser) {
      setStories([]);
      setLoading(false);
      return;
    }

    // Check cache first
    const cached = dataCache.get(cacheKey) as UserStory[] | null;
    if (cached) {
      setStories(cached);
      setLoading(false);
    }

    const q = query(
      collection(db, 'userStories'),
      where('authorId', '==', currentUser.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const storiesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as UserStory[];
        setStories(storiesData);
        dataCache.set(cacheKey, storiesData);
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching user stories:', err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [currentUser, cacheKey]);

  // Create a new story
  const createStory = async (data: CreateStoryData): Promise<UserStory | null> => {
    if (!currentUser || !userProfile) {
      setError('You must be logged in to create a story');
      return null;
    }

    if (!data.title.trim() || !data.content.trim()) {
      setError('Title and content are required');
      return null;
    }

    try {
      // Import security middleware
      const { checkActionPermission, validatePostCreation } = await import('../middleware/securityMiddleware');
      const { validateLength } = await import('../utils/securityEnhanced');
      
      // Check rate limit
      const rateLimitCheck = checkActionPermission(currentUser.uid, 'STORY_CREATE');
      if (!rateLimitCheck.allowed) {
        setError(rateLimitCheck.error || 'Rate limit exceeded');
        return null;
      }

      // Validate title
      const titleValidation = validatePostCreation(data.title, data.title);
      if (!titleValidation.allowed) {
        setError(titleValidation.error || 'Invalid title');
        return null;
      }

      // Validate content length (stories can be longer)
      const contentValidation = validateLength(data.content, 1, 500000);
      if (!contentValidation.valid) {
        setError(contentValidation.error || 'Invalid content length');
        return null;
      }

      const slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      const storyData = {
        slug,
        title: data.title.trim(),
        author: userProfile.displayName,
        authorId: currentUser.uid,
        content: data.content.trim(),
        genre: data.genre,
        blurb: data.content.substring(0, 150) + '...',
        published: data.published ?? true,
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, 'userStories'), storyData);
      
      return {
        id: docRef.id,
        ...storyData,
        createdAt: Timestamp.now(),
      } as UserStory;
    } catch (err: any) {
      console.error('Error creating story:', err);
      setError(err.message || 'Failed to create story');
      return null;
    }
  };

  // Update a story
  const updateStory = async (storyId: string, data: Partial<CreateStoryData>): Promise<boolean> => {
    if (!currentUser) {
      setError('You must be logged in to update a story');
      return false;
    }

    try {
      const storyRef = doc(db, 'userStories', storyId);
      const updateData: any = {
        updatedAt: serverTimestamp(),
      };

      if (data.title) {
        updateData.title = data.title.trim();
        updateData.slug = data.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
      }
      if (data.content) {
        updateData.content = data.content.trim();
        updateData.blurb = data.blurb || data.content.substring(0, 150) + '...';
      }
      if (data.genre) {
        updateData.genre = data.genre;
      }
      if (data.published !== undefined) {
        updateData.published = data.published;
      }
      if (data.cover !== undefined) {
        updateData.cover = data.cover;
      }
      if (data.coverType !== undefined) {
        updateData.coverType = data.coverType;
      }
      if (data.blurb !== undefined) {
        updateData.blurb = data.blurb;
      }

      await updateDoc(storyRef, updateData);
      return true;
    } catch (err: any) {
      console.error('Error updating story:', err);
      setError(err.message || 'Failed to update story');
      return false;
    }
  };

  // Delete a story
  const deleteStory = async (storyId: string): Promise<boolean> => {
    if (!currentUser) {
      setError('You must be logged in to delete a story');
      return false;
    }

    try {
      await deleteDoc(doc(db, 'userStories', storyId));
      return true;
    } catch (err: any) {
      console.error('Error deleting story:', err);
      setError(err.message || 'Failed to delete story');
      return false;
    }
  };

  return {
    stories,
    loading,
    error,
    createStory,
    updateStory,
    deleteStory,
  };
};
