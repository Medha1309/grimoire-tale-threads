/**
 * useForumPost Hook
 * Fetches a single forum post with its replies
 */

import { useState, useEffect } from 'react';
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  orderBy,
  getDocs,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { ForumPost, ForumReply } from '../types/forum';
import { handleFirestoreError } from '../utils/errorHandler';
import { SAMPLE_FORUM_POSTS } from '../data/sampleForumPosts';

const USE_SAMPLE_DATA = import.meta.env.VITE_USE_SAMPLE_FORUM_DATA === 'true';

interface ReplyNode {
  reply: ForumReply;
  children: ReplyNode[];
}

export const useForumPost = (postId: string | undefined) => {
  const [post, setPost] = useState<ForumPost | null>(null);
  const [replies, setReplies] = useState<ReplyNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!postId) {
      setLoading(false);
      return;
    }

    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);

        // Use sample data if enabled
        if (USE_SAMPLE_DATA) {
          await new Promise(resolve => setTimeout(resolve, 300)); // Simulate loading
          
          const foundPost = SAMPLE_FORUM_POSTS.find(p => p.id === postId);
          
          if (!foundPost) {
            setError('This Whisper has dimmed.');
            setLoading(false);
            return;
          }

          setPost(foundPost);
          setReplies([]); // No sample replies for now
          setLoading(false);
          return;
        }

        // Firebase implementation
        const postRef = doc(db, 'forum_posts', postId);
        const postSnap = await getDoc(postRef);

        if (!postSnap.exists()) {
          setError('This Whisper has dimmed.');
          setLoading(false);
          return;
        }

        const postData = {
          id: postSnap.id,
          ...postSnap.data(),
          createdAt: (postSnap.data().createdAt as Timestamp)?.toDate() || new Date(),
          updatedAt: (postSnap.data().updatedAt as Timestamp)?.toDate() || new Date(),
        } as ForumPost;

        setPost(postData);

        // Fetch replies
        const repliesRef = collection(db, 'forum_replies');
        const repliesQuery = query(
          repliesRef,
          where('postId', '==', postId),
          orderBy('createdAt', 'asc')
        );

        const repliesSnap = await getDocs(repliesQuery);
        const repliesData = repliesSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: (doc.data().createdAt as Timestamp)?.toDate() || new Date(),
        })) as ForumReply[];

        // Build nested reply tree
        const replyTree = buildReplyTree(repliesData);
        setReplies(replyTree);
      } catch (err: any) {
        const errorMsg = handleFirestoreError(err, 'useForumPost.fetchPost');
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  return { post, replies, loading, error };
};

/**
 * Build nested reply tree from flat array
 */
function buildReplyTree(replies: ForumReply[]): ReplyNode[] {
  const replyMap = new Map<string, ReplyNode>();
  const rootReplies: ReplyNode[] = [];

  // Create nodes
  replies.forEach(reply => {
    replyMap.set(reply.id, { reply, children: [] });
  });

  // Build tree
  replies.forEach(reply => {
    const node = replyMap.get(reply.id)!;
    
    if (reply.parentReplyId) {
      const parent = replyMap.get(reply.parentReplyId);
      if (parent) {
        parent.children.push(node);
      } else {
        rootReplies.push(node);
      }
    } else {
      rootReplies.push(node);
    }
  });

  return rootReplies;
}
