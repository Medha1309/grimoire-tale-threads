/**
 * Archive System Types
 * Unified archive types for diary, reading history, and scrapbooks
 */

export type ArchiveContentType = 'diary' | 'reading' | 'scrapbook' | 'art';

export interface BaseArchiveItem {
  id: string;
  archivedAt: Date;
  originalCreatedAt: Date;
  userId?: string;
}

export interface ArchivedDiaryEntry extends BaseArchiveItem {
  type: 'diary';
  content: string;
  encryptedContent?: string;
  mood: 'joy' | 'sorrow' | 'calm' | 'unrest';
  isLocked: boolean;
}

export interface ArchivedReadingEntry extends BaseArchiveItem {
  type: 'reading';
  storySlug: string;
  storyTitle: string;
  storyAuthor: string;
  storyCover?: string;
  storyGenre?: 'horror' | 'mystery' | 'romance' | 'thriller';
  readingTime?: number;
  personalNotes?: string;
  rating?: number;
}

export interface ArchivedScrapbookEntry extends BaseArchiveItem {
  type: 'scrapbook';
  date: Date;
  thought: string;
  photos: Array<{
    id: string;
    image: string;
    caption?: string;
    filter?: 'none' | 'sepia' | 'desaturated' | 'vintage' | 'horror';
  }>;
  stickers: Array<{
    id: string;
    type: 'flower' | 'lace' | 'blood' | 'eye' | 'butterfly' | 'heart' | 'star';
    emoji: string;
    x: number;
    y: number;
    rotation: number;
    scale: number;
  }>;
  scratchOffs: Array<{
    id: string;
    text: string;
    x: number;
    y: number;
    isRevealed: boolean;
  }>;
  layout: 'single' | 'double' | 'triple' | 'quad';
  mood?: 'joy' | 'sorrow' | 'calm' | 'unrest';
  fullContent?: string;
  isLocked?: boolean;
  isHaunted?: boolean;
  hauntedText?: string;
  isPublished?: boolean;
}

export interface ArchivedArtwork extends BaseArchiveItem {
  type: 'art';
  title: string;
  dataUrl: string;
  thumbnail?: string;
  brushType: 'blood' | 'charcoal' | 'ink' | 'scratch' | 'decay' | 'ethereal';
  description?: string;
}

export interface ArchivedGameSession extends BaseArchiveItem {
  type: 'game';
  gameName: 'ouroboros' | 'haunted-pacman';
  result: 'won' | 'lost';
  score: number;
  duration: number; // in seconds
  crypticMessage?: string;
  attempts?: number;
}

export type ArchiveItem = ArchivedDiaryEntry | ArchivedReadingEntry | ArchivedScrapbookEntry | ArchivedArtwork | ArchivedGameSession;

export interface ArchiveStats {
  totalItems: number;
  diaryCount: number;
  readingCount: number;
  scrapbookCount: number;
  artCount: number;
  gameCount: number;
  oldestItem?: Date;
  newestItem?: Date;
}

// Helper to calculate days until auto-deletion
export const getDaysUntilDeletion = (archivedAt: Date): number => {
  const now = new Date();
  const daysSinceArchived = Math.floor((now.getTime() - archivedAt.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(0, 30 - daysSinceArchived);
};

// Helper to check if item should be auto-deleted
export const shouldAutoDelete = (archivedAt: Date): boolean => {
  return getDaysUntilDeletion(archivedAt) === 0;
};
