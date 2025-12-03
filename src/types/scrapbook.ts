/**
 * Scrapbook Type Definitions
 * Contains types for BOTH:
 * 1. New collections system (ScrapbookCollection, ScrapbookItem)
 * 2. Old diary scrapbook (ScrapbookEntry, ScrapbookPhoto, etc.)
 */

// ===== NEW SCRAPBOOK SYSTEM (Collections) =====
export interface ScrapbookCollection {
  id: string;
  userId: string;
  title: string;
  description?: string;
  coverImage?: string;
  itemCount: number;
  createdAt: Date;
  updatedAt: Date;
  isPrivate: boolean;
}

export interface ScrapbookItem {
  id: string;
  collectionId: string;
  userId: string;
  imageUrl: string;
  title: string;
  caption?: string;
  notes?: string;
  position: number;
  createdAt: Date;
  updatedAt: Date;
  connections?: string[];
}

export interface ItemConnection {
  id: string;
  collectionId: string;
  fromItemId: string;
  toItemId: string;
  label?: string;
  createdAt: Date;
}

export type ViewMode = 'masonry' | 'list';

export interface ScrapbookFilters {
  searchQuery: string;
  sortBy: 'recent' | 'oldest' | 'title';
}

// ===== OLD DIARY SCRAPBOOK SYSTEM (Legacy) =====
export interface ScrapbookEntry {
  id: string;
  date: Date;
  thought?: string;
  photos: ScrapbookPhoto[];
  stickers: ScrapbookSticker[];
  scratchOffAreas?: ScratchOffArea[];
  // Additional properties used by old system
  title?: string;
  media?: any[];
  tags?: string[];
  mood?: string;
  location?: string;
  scratchOffs?: any[];
  layout?: string;
  fullContent?: string;
  isLocked?: boolean;
  isHaunted?: boolean;
  hauntedText?: string;
  isPublished?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ScrapbookPhoto {
  id: string;
  image: string;
  filter?: string;
  rotation?: number;
  scale?: number;
  type?: string;
  caption?: string;
}

export interface ScrapbookSticker {
  id: string;
  emoji: string;
  x: number;
  y: number;
  rotation?: number;
  scale?: number;
  type?: string;
}

export interface ScratchOffArea {
  id: string;
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isRevealed?: boolean;
}

// Old system filter type
export type ScrapbookFilter = any;

// Old system media type
export type MediaType = 'photo' | 'gif' | 'video';

// Old system sticker library
export const STICKER_LIBRARY = [
  { type: 'heart', emoji: '❤️', label: 'Heart' },
  { type: 'star', emoji: '⭐', label: 'Star' },
  { type: 'sparkles', emoji: '✨', label: 'Sparkles' },
  { type: 'moon', emoji: '🌙', label: 'Moon' },
  { type: 'sun', emoji: '☀️', label: 'Sun' },
  { type: 'flower', emoji: '🌸', label: 'Flower' },
  { type: 'butterfly', emoji: '🦋', label: 'Butterfly' },
  { type: 'rainbow', emoji: '🌈', label: 'Rainbow' },
  { type: 'cloud', emoji: '☁️', label: 'Cloud' },
  { type: 'fire', emoji: '🔥', label: 'Fire' },
  { type: 'snowflake', emoji: '❄️', label: 'Snowflake' },
  { type: 'leaf', emoji: '🍃', label: 'Leaf' },
];
