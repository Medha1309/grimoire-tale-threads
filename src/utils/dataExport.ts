import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { UserProfile } from '../types';

/**
 * Data export utilities for FIPPA compliance
 * Allows exporting user data in various formats
 */

export interface UserDataExport {
  profile: UserProfile;
  stories: any[];
  forumPosts: any[];
  forumReplies: any[];
  diaryEntries: any[];
  comments: any[];
  interactions: any;
  bookmarks: any[];
  exportDate: string;
  exportVersion: string;
}

/**
 * Export all data for a specific user
 */
export async function exportUserData(userId: string): Promise<UserDataExport> {
  try {
    // Get user profile
    const userDoc = await getDoc(doc(db, 'users', userId));
    const profile = userDoc.exists() ? { uid: userDoc.id, ...userDoc.data() } as UserProfile : null;

    if (!profile) {
      throw new Error('User not found');
    }

    // Get user stories
    const storiesQuery = query(collection(db, 'userStories'), where('authorId', '==', userId));
    const storiesSnap = await getDocs(storiesQuery);
    const stories = storiesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Get forum posts
    const postsQuery = query(collection(db, 'forum_posts'), where('authorId', '==', userId));
    const postsSnap = await getDocs(postsQuery);
    const forumPosts = postsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Get forum replies
    const repliesQuery = query(collection(db, 'forum_replies'), where('authorId', '==', userId));
    const repliesSnap = await getDocs(repliesQuery);
    const forumReplies = repliesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Get diary entries
    const diaryQuery = query(collection(db, 'diary_entries'), where('userId', '==', userId));
    const diarySnap = await getDocs(diaryQuery);
    const diaryEntries = diarySnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Get comments
    const commentsQuery = query(collection(db, 'comments'), where('userId', '==', userId));
    const commentsSnap = await getDocs(commentsQuery);
    const comments = commentsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Get user interactions
    const interactionsDoc = await getDoc(doc(db, 'userInteractions', userId));
    const interactions = interactionsDoc.exists() ? interactionsDoc.data() : {};

    // Get bookmarks (from interactions)
    const bookmarks = interactions.bookmarkedStories || [];

    return {
      profile,
      stories,
      forumPosts,
      forumReplies,
      diaryEntries,
      comments,
      interactions,
      bookmarks,
      exportDate: new Date().toISOString(),
      exportVersion: '1.0',
    };
  } catch (error) {
    console.error('Error exporting user data:', error);
    throw error;
  }
}

/**
 * Convert user data to JSON string
 */
export function exportToJSON(data: UserDataExport): string {
  return JSON.stringify(data, null, 2);
}

/**
 * Convert user data to CSV format
 */
export function exportToCSV(data: UserDataExport): string {
  const lines: string[] = [];
  
  // Profile section
  lines.push('=== USER PROFILE ===');
  lines.push('Field,Value');
  lines.push(`User ID,${data.profile.uid}`);
  lines.push(`Email,${data.profile.email}`);
  lines.push(`Display Name,${data.profile.displayName}`);
  lines.push(`Is Author,${data.profile.isAuthor}`);
  lines.push(`Is Admin,${data.profile.isAdmin || false}`);
  lines.push(`Created At,${data.profile.createdAt?.toDate?.()?.toISOString() || 'N/A'}`);
  lines.push('');

  // Stories section
  lines.push('=== STORIES ===');
  lines.push(`Total Stories: ${data.stories.length}`);
  if (data.stories.length > 0) {
    lines.push('Story ID,Title,Genre,Created At,Published');
    data.stories.forEach(story => {
      lines.push(`${story.id},"${story.title}",${story.genre},${story.createdAt?.toDate?.()?.toISOString() || 'N/A'},${story.isPublished}`);
    });
  }
  lines.push('');

  // Forum posts section
  lines.push('=== FORUM POSTS ===');
  lines.push(`Total Posts: ${data.forumPosts.length}`);
  if (data.forumPosts.length > 0) {
    lines.push('Post ID,Title,Category,Created At,Likes');
    data.forumPosts.forEach(post => {
      lines.push(`${post.id},"${post.title}",${post.category},${post.createdAt?.toDate?.()?.toISOString() || 'N/A'},${post.likeCount || 0}`);
    });
  }
  lines.push('');

  // Diary entries section
  lines.push('=== DIARY ENTRIES ===');
  lines.push(`Total Entries: ${data.diaryEntries.length}`);
  if (data.diaryEntries.length > 0) {
    lines.push('Entry ID,Mood,Created At,Is Locked');
    data.diaryEntries.forEach(entry => {
      lines.push(`${entry.id},${entry.mood},${entry.createdAt?.toDate?.()?.toISOString() || 'N/A'},${entry.isLocked}`);
    });
  }
  lines.push('');

  // Summary
  lines.push('=== SUMMARY ===');
  lines.push(`Export Date,${data.exportDate}`);
  lines.push(`Export Version,${data.exportVersion}`);
  lines.push(`Total Stories,${data.stories.length}`);
  lines.push(`Total Forum Posts,${data.forumPosts.length}`);
  lines.push(`Total Forum Replies,${data.forumReplies.length}`);
  lines.push(`Total Diary Entries,${data.diaryEntries.length}`);
  lines.push(`Total Comments,${data.comments.length}`);
  lines.push(`Total Bookmarks,${data.bookmarks.length}`);

  return lines.join('\n');
}

/**
 * Download data as a file
 */
export function downloadData(data: string, filename: string, mimeType: string): void {
  const blob = new Blob([data], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Export user data and download as JSON
 */
export async function exportAndDownloadJSON(userId: string, userName: string): Promise<void> {
  const data = await exportUserData(userId);
  const json = exportToJSON(data);
  const filename = `${userName.replace(/\s+/g, '_')}_data_${Date.now()}.json`;
  downloadData(json, filename, 'application/json');
}

/**
 * Export user data and download as CSV
 */
export async function exportAndDownloadCSV(userId: string, userName: string): Promise<void> {
  const data = await exportUserData(userId);
  const csv = exportToCSV(data);
  const filename = `${userName.replace(/\s+/g, '_')}_data_${Date.now()}.csv`;
  downloadData(csv, filename, 'text/csv');
}
