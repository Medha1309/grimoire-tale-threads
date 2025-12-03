/**
 * Diary Module - Type Definitions
 * Production-ready types for the diary feature
 */

export type DiaryMood = 'happy' | 'sad' | 'calm' | 'anxious' | 'excited' | 'thoughtful';

export interface MoodSticker {
  id: string;
  emoji: string;
  label: string;
  category: 'emotion' | 'weather' | 'activity' | 'misc';
}

export interface DiaryEntry {
  id: string;
  userId: string;
  title: string;
  content: string;
  mood: DiaryMood;
  stickers: string[]; // Array of sticker IDs
  headline?: string; // Auto-generated headline
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  isFavorite: boolean;
}

export interface DiaryFilters {
  mood?: DiaryMood;
  searchQuery?: string;
  dateRange?: { start: Date; end: Date };
  tags?: string[];
  isFavorite?: boolean;
}

export interface DiaryStats {
  totalEntries: number;
  entriesThisWeek: number;
  favoriteCount: number;
  moodDistribution: Record<DiaryMood, number>;
}
