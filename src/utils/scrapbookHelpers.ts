/**
 * Scrapbook Helper Functions
 * Ensures data integrity and provides safe defaults
 */

import { ScrapbookEntry } from '../types/scrapbook';

/**
 * Ensures a scrapbook entry has all required arrays initialized
 */
export function normalizeScrapbookEntry(entry: Partial<ScrapbookEntry>): ScrapbookEntry {
  return {
    id: entry.id || Date.now().toString(),
    date: entry.date || new Date(),
    thought: entry.thought || '',
    photos: Array.isArray(entry.photos) ? entry.photos : [],
    stickers: Array.isArray(entry.stickers) ? entry.stickers : [],
    scratchOffs: Array.isArray(entry.scratchOffs) ? entry.scratchOffs : [],
    layout: entry.layout || 'single',
    mood: entry.mood,
    fullContent: entry.fullContent,
    isLocked: entry.isLocked || false,
    isHaunted: entry.isHaunted || false,
    hauntedText: entry.hauntedText,
    isPublished: entry.isPublished,
  };
}

/**
 * Validates that a scrapbook entry has at least one photo
 */
export function isValidScrapbookEntry(entry: Partial<ScrapbookEntry>): boolean {
  return Boolean(
    entry.photos &&
    Array.isArray(entry.photos) &&
    entry.photos.length > 0 &&
    entry.thought &&
    entry.thought.trim().length > 0
  );
}

/**
 * Safely loads scrapbook entries from localStorage
 */
export function loadScrapbookEntries(storageKey: string): ScrapbookEntry[] {
  try {
    const stored = localStorage.getItem(storageKey);
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];

    return parsed.map((entry: any) => normalizeScrapbookEntry({
      ...entry,
      date: new Date(entry.date),
    }));
  } catch (error) {
    // Failed to load scrapbook entries
    return [];
  }
}

/**
 * Safely saves scrapbook entries to localStorage
 */
export function saveScrapbookEntries(storageKey: string, entries: ScrapbookEntry[]): boolean {
  try {
    if (!Array.isArray(entries)) {
      // Invalid entries array
      return false;
    }

    const normalized = entries.map(normalizeScrapbookEntry);
    localStorage.setItem(storageKey, JSON.stringify(normalized));
    return true;
  } catch (error) {
    // Failed to save scrapbook entries
    return false;
  }
}

/**
 * Gets a safe count of items in an array
 */
export function safeLength<T>(arr: T[] | undefined | null): number {
  return Array.isArray(arr) ? arr.length : 0;
}

/**
 * Safely gets the first item from an array
 */
export function safeFirst<T>(arr: T[] | undefined | null): T | undefined {
  return Array.isArray(arr) && arr.length > 0 ? arr[0] : undefined;
}

/**
 * Checks if an entry has unrevealed secrets
 */
export function hasUnrevealedSecrets(entry: ScrapbookEntry): boolean {
  return safeLength(entry.scratchOffs) > 0 && 
         entry.scratchOffs!.some(s => !s.isRevealed);
}

/**
 * Gets the primary photo from an entry
 */
export function getPrimaryPhoto(entry: ScrapbookEntry) {
  return safeFirst(entry.photos);
}

/**
 * Formats a date for scrapbook display
 */
export function formatScrapbookDate(date: Date): string {
  try {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return 'Invalid Date';
  }
}

/**
 * Formats a full date for scrapbook display
 */
export function formatFullDate(date: Date): string {
  try {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return 'Invalid Date';
  }
}
