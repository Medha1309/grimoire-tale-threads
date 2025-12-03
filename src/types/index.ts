export type Page = 
  | "landing" | "stories" | "reader" | "contact" | "about" 
  | "storyDetail" | "signup" | "login" | "profile" | "compose"
  | "forum" | "forumPost" | "diary" | "diaryEntry";

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  bio?: string;
  createdAt: any;
  isAuthor: boolean;
  isAdmin?: boolean;
  // Extended fields for new features
  forumPostCount?: number;
  diaryEntryCount?: number;
  totalLikesReceived?: number;
  // Admin management fields
  accountStatus?: 'active' | 'suspended' | 'deleted';
  suspensionReason?: string;
  suspendedUntil?: any;
  suspendedBy?: string;
  suspendedAt?: any;
  reactivatedBy?: string;
  reactivatedAt?: any;
  deletedAt?: any;
  deletedBy?: string;
  deletionReason?: string;
  updatedAt?: any;
}

export interface DiaryEntry {
  id: string;
  userId: string;
  content: string;
  mood: 'joy' | 'sorrow' | 'calm' | 'unrest';
  isLocked: boolean;
  createdAt: Date;
  updatedAt: Date;
  isPublished: boolean;
}

export interface StoryPage {
  page: number;
  text: string;
}

export interface Story {
  slug: string;
  title: string;
  author: string;
  cover?: string;
  content: StoryPage[];
  genre?: string; // Now supports all Genre types from genreAtmospheres
  blurb?: string;
  
  // Collaboration fields
  collaborationEnabled?: boolean;
  chainProjectId?: string; // Link to Chain project
  coAuthorIds?: string[]; // Populated when published
  status?: 'draft' | 'collaborative' | 'published';
}

// Re-export Genre type for convenience
export type { Genre } from '../utils/genreAtmospheres';

export interface NavigationProps {
  go: (p: Page, slug?: string) => void;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: any;
  read: boolean;
}

// Admin-specific types
export interface AdminLog {
  id: string;
  adminId: string;
  adminEmail: string;
  action: string;
  targetType: 'user' | 'content' | 'system' | 'data';
  targetId: string;
  details: Record<string, any>;
  ipAddress?: string;
  timestamp: any;
}

export interface DataExportRequest {
  id: string;
  userId: string;
  requestedBy: string;
  requestedByEmail: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  exportUrl?: string;
  exportType: 'user_data' | 'all_data' | 'content_only';
  createdAt: any;
  completedAt?: any;
  error?: string;
}

export interface ContentReport {
  id: string;
  reporterId: string;
  reporterEmail: string;
  contentType: 'forum_post' | 'diary_entry' | 'comment' | 'story';
  contentId: string;
  reason: string;
  description?: string;
  status: 'pending' | 'reviewed' | 'actioned' | 'dismissed';
  reviewedBy?: string;
  reviewedAt?: any;
  action?: string;
  actionDetails?: string;
  createdAt: any;
}

export interface UserActivity {
  userId: string;
  lastLogin: any;
  loginCount: number;
  storiesCreated: number;
  forumPosts: number;
  diaryEntries: number;
  commentsPosted: number;
  likesGiven: number;
  likesReceived: number;
  accountStatus: 'active' | 'suspended' | 'deleted';
  suspensionReason?: string;
  suspendedUntil?: any;
}

export interface SystemSettings {
  dataRetentionDays: number;
  requireEmailVerification: boolean;
  allowGoogleAuth: boolean;
  maintenanceMode: boolean;
  privacyPolicyVersion: string;
  termsVersion: string;
  maxStoriesPerUser: number;
  maxDiaryEntriesPerUser: number;
  contentModerationEnabled: boolean;
}

// Following System Types
export interface Follow {
  id: string;
  followerId: string;
  followerName: string;
  followingId: string;
  followingName: string;
  createdAt: any;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'new_story' | 'new_follower' | 'story_like' | 'story_comment' | 'forum_reply';
  title: string;
  message: string;
  link?: string;
  read: boolean;
  createdAt: any;
  actorId?: string;
  actorName?: string;
  actorPhotoURL?: string;
}

export interface FollowStats {
  userId: string;
  followersCount: number;
  followingCount: number;
  updatedAt: any;
}
