/**
 * useForumPosts Hook
 * Optimized forum posts fetching with caching and pagination
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
  addDoc,
  serverTimestamp,
  where,
  DocumentSnapshot,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { ForumPost, ForumFilters, CreatePostData } from '../types/forum';
import { handleFirestoreError } from '../utils/errorHandler';
import { SAMPLE_FORUM_POSTS } from '../data/sampleForumPosts';
import { dataCache } from '../utils/cache';

const POSTS_PER_PAGE = 12;
const USE_SAMPLE_DATA = import.meta.env.VITE_USE_SAMPLE_FORUM_DATA === 'true';

export const useForumPosts = (filters?: ForumFilters) => {
  const { currentUser, userProfile } = useAuth();
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [lastDoc, setLastDoc] = useState<DocumentSnapshot | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Memoize cache key based on filters
  const cacheKey = useMemo(() => 
    `forum-posts-${filters?.sortBy || 'recent'}-${filters?.tags?.join(',') || 'all'}`,
    [filters?.sortBy, filters?.tags]
  );

  const loadPosts = useCallback(async (loadMore = false) => {
    try {
      setLoading(true);
      setError(null);

      // Check cache first (only for initial load)
      if (!loadMore && !USE_SAMPLE_DATA) {
        const cached = dataCache.get(cacheKey) as ForumPost[] | null;
        if (cached) {
          setPosts(cached);
          setHasMore(cached.length >= POSTS_PER_PAGE);
          setLoading(false);
          return;
        }
      }

      // Use sample data if enabled
      if (USE_SAMPLE_DATA) {
        await new Promise(resolve => setTimeout(resolve, 300));
        
        let filteredPosts = [...SAMPLE_FORUM_POSTS];

        // Apply tag filters
        if (filters?.tags && filters.tags.length > 0) {
          filteredPosts = filteredPosts.filter(post =>
            post.tags.some(tag => filters.tags?.includes(tag))
          );
        }

        // Apply sorting
        if (filters?.sortBy === 'popular') {
          filteredPosts.sort((a, b) => b.likeCount - a.likeCount);
        } else if (filters?.sortBy === 'active') {
          filteredPosts.sort((a, b) => b.replyCount - a.replyCount);
        } else {
          filteredPosts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        }

        setPosts(filteredPosts);
        setHasMore(false);
        setLoading(false);
        return;
      }

      // Firebase implementation
      const postsRef = collection(db, 'forum_posts');
      let q = query(postsRef);

      // Apply filters
      if (filters?.tags && filters.tags.length > 0) {
        q = query(q, where('tags', 'array-contains-any', filters.tags));
      }

      // Apply sorting
      if (filters?.sortBy === 'popular') {
        q = query(q, orderBy('likeCount', 'desc'), orderBy('createdAt', 'desc'));
      } else if (filters?.sortBy === 'active') {
        q = query(q, orderBy('replyCount', 'desc'), orderBy('createdAt', 'desc'));
      } else {
        q = query(q, orderBy('createdAt', 'desc'));
      }

      // Pagination
      if (loadMore && lastDoc) {
        q = query(q, startAfter(lastDoc));
      }

      q = query(q, limit(POSTS_PER_PAGE));

      const snapshot = await getDocs(q);
      
      const newPosts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: (doc.data().createdAt as Timestamp)?.toDate() || new Date(),
        updatedAt: (doc.data().updatedAt as Timestamp)?.toDate() || new Date(),
      })) as ForumPost[];

      const updatedPosts = loadMore ? [...posts, ...newPosts] : newPosts;
      setPosts(updatedPosts);

      // Cache the results
      if (!loadMore) {
        dataCache.set(cacheKey, updatedPosts);
      }

      setLastDoc(snapshot.docs[snapshot.docs.length - 1] || null);
      setHasMore(snapshot.docs.length === POSTS_PER_PAGE);
    } catch (err: any) {
      const errorMsg = handleFirestoreError(err, 'useForumPosts.loadPosts');
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  }, [filters, lastDoc, cacheKey, posts]);

  const createPost = async (data: CreatePostData): Promise<ForumPost | null> => {
    if (!currentUser || !userProfile) {
      const errorMsg = 'Please sign in to create a post.';
      setError(errorMsg);
      throw new Error(errorMsg);
    }

    // Ensure displayName exists
    if (!userProfile.displayName || userProfile.displayName.trim() === '') {
      const errorMsg = 'Your profile is incomplete. Please update your display name in settings.';
      setError(errorMsg);
      throw new Error(errorMsg);
    }

    try {
      // Import security middleware
      const { checkActionPermission, validatePostCreation } = await import('../middleware/securityMiddleware');
      
      // Check rate limit
      const rateLimitCheck = checkActionPermission(currentUser.uid, 'POST_CREATE');
      if (!rateLimitCheck.allowed) {
        const errorMsg = rateLimitCheck.error || 'Rate limit exceeded';
        setError(errorMsg);
        throw new Error(errorMsg);
      }

      // Validate content
      const validation = validatePostCreation(data.title, data.content);
      if (!validation.allowed) {
        const errorMsg = validation.error || 'Invalid content';
        setError(errorMsg);
        throw new Error(errorMsg);
      }

      const postData = {
        authorId: currentUser.uid,
        authorName: userProfile.displayName.trim(),
        authorAvatar: userProfile.photoURL || '',
        title: data.title.trim(),
        content: data.content.trim(),
        tags: data.tags || [],
        likeCount: 0,
        replyCount: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        isArchived: false,
      };

      console.log('Creating forum post with data:', postData);

      const docRef = await addDoc(collection(db, 'forum_posts'), postData);
      
      console.log('Forum post created successfully:', docRef.id);

      const newPost: ForumPost = {
        id: docRef.id,
        ...postData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Add to local state
      setPosts(prev => [newPost, ...prev]);

      // Clear any previous errors
      setError(null);

      return newPost;
    } catch (err: any) {
      console.error('Error creating post:', err);
      console.error('Error code:', err.code);
      console.error('Error message:', err.message);
      const errorMsg = handleFirestoreError(err, 'useForumPosts.createPost');
      setError(errorMsg);
      throw new Error(errorMsg);
    }
  };

  const refreshPosts = useCallback(() => {
    dataCache.delete(cacheKey);
    setLastDoc(null);
    loadPosts(false);
  }, [loadPosts, cacheKey]);

  // Debounced effect to prevent excessive refetching
  useEffect(() => {
    const timer = setTimeout(() => {
      loadPosts(false);
    }, 100);
    return () => clearTimeout(timer);
  }, [filters?.tags, filters?.sortBy]);

  return {
    posts,
    loading,
    hasMore,
    error,
    loadMore: () => loadPosts(true),
    createPost,
    refreshPosts,
  };
};
