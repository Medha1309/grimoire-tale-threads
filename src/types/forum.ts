/**
 * Forum Type Definitions
 * Types for the Story Forum / Discussions feature
 */

/**
 * ForumThread - Main discussion thread type
 * Represents a top-level discussion post in the forum
 * 
 * Note: Also exported as "ForumPost" for backward compatibility.
 * Prefer using "ForumThread" in new code for consistency.
 */
export interface ForumThread {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  title: string;
  content: string;
  storySlug?: string; // Optional: link to a specific story
  storyTitle?: string; // Optional: story title for display
  tags: string[];
  likeCount: number;
  replyCount: number;
  createdAt: Date;
  updatedAt: Date;
  isArchived: boolean;
  isPinned?: boolean; // For important discussions
}

/**
 * @deprecated Use ForumThread instead
 * Alias maintained for backward compatibility with existing code
 */
export type ForumPost = ForumThread;

export interface ForumReply {
  id: string;
  threadId: string; // Changed from postId for clarity
  parentReplyId?: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  likeCount: number;
  createdAt: Date;
  depth: number; // 0-2 for max 3 levels
}

export interface ForumLike {
  id: string;
  userId: string;
  targetId: string; // threadId or replyId
  targetType: "thread" | "reply";
  createdAt: Date;
}

export interface ForumFilters {
  tags?: string[];
  storySlug?: string; // Filter by specific story
  sortBy?: "recent" | "popular" | "active"; // Changed "replies" to "active"
  searchQuery?: string;
}

export interface CreateThreadData {
  title: string;
  content: string;
  tags: string[];
  storySlug?: string; // Optional: associate with a story
}

// Alias for backward compatibility
export type CreatePostData = CreateThreadData;

export interface CreateReplyData {
  threadId: string; // Changed from postId
  parentReplyId?: string;
  content: string;
}

// Available genre/topic tags for forum threads
export const FORUM_TAGS = [
  "General Discussion",
  "Story Analysis",
  "Character Discussion",
  "Plot Theories",
  "Writing Feedback",
  "Romance",
  "Mystery",
  "Horror",
  "Gothic",
  "Thriller",
  "Fantasy",
  "Historical",
  "Folklore"
] as const;

export type ForumTag = typeof FORUM_TAGS[number];
