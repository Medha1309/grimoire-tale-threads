/**
 * Diary Type Definitions
 * Types for The Dollhouse diary feature - Enhanced with full CRUD and hidden entries
 */

export type DiaryMood = "joy" | "sorrow" | "calm" | "unrest" | "secret";

export interface DiaryEntry {
  id: string;
  userId: string;
  content: string;
  encryptedContent?: string; // When locked
  mood: DiaryMood;
  isLocked: boolean;
  isHidden: boolean; // New: Hidden entries feature
  isFavorite: boolean; // New: Favorite entries
  tags: string[]; // New: Custom tags
  stickers?: string[]; // New: Mood stickers
  headline?: string; // New: Auto-generated headline
  aiReflection?: string;
  createdAt: Date;
  updatedAt: Date;
  image?: string; // For scrapbook entries
  isScrapbook?: boolean; // Flag to identify scrapbook entries
}

export interface CreateEntryData {
  content: string;
  mood: DiaryMood;
  isLocked: boolean;
  isHidden?: boolean;
  isFavorite?: boolean;
  tags?: string[];
  enableAI: boolean;
}

export interface UpdateEntryData {
  content?: string;
  mood?: DiaryMood;
  isLocked?: boolean;
  isHidden?: boolean;
  isFavorite?: boolean;
  tags?: string[];
}

export interface DiaryFilters {
  dateRange?: { start: Date; end: Date };
  mood?: DiaryMood;
  isHidden?: boolean;
  isFavorite?: boolean;
  tags?: string[];
  searchQuery?: string;
}

// Mood color mappings for UI - Updated with pink theme
export const MOOD_COLORS: Record<DiaryMood, string> = {
  joy: "#ffd700",      // Gold
  sorrow: "#9ca3af",   // Gray
  calm: "#93c5fd",     // Light blue
  unrest: "#ef4444",   // Red
  secret: "#ffb6d9",   // Pink (matches dollhouse)
};

// Mood icons for display
export const MOOD_ICONS: Record<DiaryMood, string> = {
  joy: "😊",
  sorrow: "😢",
  calm: "😌",
  unrest: "😰",
  secret: "🤫",
};

// Mood labels for display
export const MOOD_LABELS: Record<DiaryMood, string> = {
  joy: "Joy",
  sorrow: "Sorrow",
  calm: "Calm",
  unrest: "Unrest",
  secret: "Secret",
};

// Mood Sticker System
export interface MoodSticker {
  id: string;
  emoji: string;
  label: string;
  category: 'emotion' | 'weather' | 'activity' | 'misc';
}

export const STICKER_LIBRARY: MoodSticker[] = [
  // Emotions
  { id: 'heart', emoji: '❤️', label: 'Heart', category: 'emotion' },
  { id: 'star', emoji: '⭐', label: 'Star', category: 'emotion' },
  { id: 'fire', emoji: '🔥', label: 'Fire', category: 'emotion' },
  { id: 'sparkles', emoji: '✨', label: 'Sparkles', category: 'emotion' },
  { id: 'rainbow', emoji: '🌈', label: 'Rainbow', category: 'emotion' },
  
  // Weather
  { id: 'sun', emoji: '☀️', label: 'Sunny', category: 'weather' },
  { id: 'cloud', emoji: '☁️', label: 'Cloudy', category: 'weather' },
  { id: 'rain', emoji: '🌧️', label: 'Rainy', category: 'weather' },
  { id: 'snow', emoji: '❄️', label: 'Snowy', category: 'weather' },
  { id: 'thunder', emoji: '⚡', label: 'Stormy', category: 'weather' },
  
  // Activities
  { id: 'coffee', emoji: '☕', label: 'Coffee', category: 'activity' },
  { id: 'book', emoji: '📚', label: 'Reading', category: 'activity' },
  { id: 'music', emoji: '🎵', label: 'Music', category: 'activity' },
  { id: 'game', emoji: '🎮', label: 'Gaming', category: 'activity' },
  { id: 'art', emoji: '🎨', label: 'Art', category: 'activity' },
  
  // Misc
  { id: 'pizza', emoji: '🍕', label: 'Pizza', category: 'misc' },
  { id: 'cake', emoji: '🎂', label: 'Cake', category: 'misc' },
  { id: 'plant', emoji: '🌱', label: 'Plant', category: 'misc' },
  { id: 'moon', emoji: '🌙', label: 'Moon', category: 'misc' },
  { id: 'rocket', emoji: '🚀', label: 'Rocket', category: 'misc' },
];
