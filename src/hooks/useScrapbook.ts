/**
 * Scrapbook Hook
 * Manages scrapbook entries with localStorage persistence
 */

import { useState, useEffect, useCallback } from 'react';
import { ScrapbookEntry, ScrapbookFilter } from '../types/scrapbook';

const STORAGE_KEY = 'grimr_scrapbook_entries';

// Demo entry for initial state
const DEMO_ENTRY: ScrapbookEntry = {
  id: 'demo-1',
  date: new Date('2024-10-31'),
  title: 'A Haunting Memory',
  thought: 'Some memories refuse to fade, lingering like shadows in the corners of our minds...',
  photos: [
    {
      id: 'demo-photo-1',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400',
      filter: 'sepia',
    },
  ],
  stickers: [],
  tags: ['haunting', 'memories', 'darkness'],
  mood: 'melancholic',
  location: 'The Old House',
  createdAt: new Date('2024-10-31'),
  updatedAt: new Date('2024-10-31'),
};

export function useScrapbook() {
  const [entries, setEntries] = useState<ScrapbookEntry[]>([]);
  const [filter, setFilter] = useState<ScrapbookFilter>({
    searchQuery: '',
    selectedTags: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  // Load entries from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const entries = parsed.map((entry: any) => ({
          ...entry,
          date: new Date(entry.date),
          createdAt: new Date(entry.createdAt),
          updatedAt: new Date(entry.updatedAt),
        }));
        setEntries(entries);
      } else {
        // Add demo entry if no entries exist
        setEntries([DEMO_ENTRY]);
      }
    } catch (error) {
      console.error('Failed to load scrapbook entries:', error);
      setEntries([DEMO_ENTRY]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save entries to localStorage
  const saveEntries = useCallback((newEntries: ScrapbookEntry[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newEntries));
      setEntries(newEntries);
    } catch (error) {
      console.error('Failed to save scrapbook entries:', error);
    }
  }, []);

  // Add new entry
  const addEntry = useCallback(
    (entry: Omit<ScrapbookEntry, 'id' | 'createdAt' | 'updatedAt'>) => {
      const newEntry: ScrapbookEntry = {
        ...entry,
        id: `entry-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        photos: entry.photos || [],
        stickers: entry.stickers || [],
        tags: entry.tags || [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const updatedEntries = [newEntry, ...entries];
      saveEntries(updatedEntries);
      console.log('✅ Scrapbook entry saved:', newEntry.id, newEntry);
    },
    [entries, saveEntries]
  );

  // Update entry
  const updateEntry = useCallback(
    (id: string, updates: Partial<ScrapbookEntry>) => {
      const updated = entries.map((entry) =>
        entry.id === id
          ? { ...entry, ...updates, updatedAt: new Date() }
          : entry
      );
      saveEntries(updated);
    },
    [entries, saveEntries]
  );

  // Delete entry
  const deleteEntry = useCallback(
    (id: string) => {
      saveEntries(entries.filter((entry) => entry.id !== id));
    },
    [entries, saveEntries]
  );

  // Filter entries
  const filteredEntries = entries.filter((entry) => {
    // Search query
    if (filter.searchQuery) {
      const query = filter.searchQuery.toLowerCase();
      const matchesTitle = entry.title?.toLowerCase().includes(query) || false;
      const matchesThought = entry.thought?.toLowerCase().includes(query) || false;
      const matchesTags = entry.tags?.some((tag: string) =>
        tag.toLowerCase().includes(query)
      ) || false;
      if (!matchesTitle && !matchesThought && !matchesTags) {
        return false;
      }
    }

    // Selected tags
    if (filter.selectedTags && filter.selectedTags.length > 0) {
      const hasTag = filter.selectedTags.some((tag: string) =>
        entry.tags?.includes(tag)
      );
      if (!hasTag) return false;
    }

    // Media type
    if (filter.mediaType) {
      const hasMediaType = entry.media?.some(
        (m: any) => m.type === filter.mediaType
      ) || false;
      if (!hasMediaType) return false;
    }

    // Date range
    if (filter.dateRange) {
      const entryDate = new Date(entry.date);
      if (
        entryDate < filter.dateRange.start ||
        entryDate > filter.dateRange.end
      ) {
        return false;
      }
    }

    return true;
  });

  // Get all unique tags
  const allTags = Array.from(
    new Set(entries.flatMap((entry) => entry.tags || []))
  ).sort();

  return {
    entries: filteredEntries,
    allEntries: entries,
    allTags,
    filter,
    setFilter,
    isLoading,
    addEntry,
    updateEntry,
    deleteEntry,
  };
}
