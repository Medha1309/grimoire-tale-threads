/**
 * Diary Module - Main Hook
 * Manages diary entries with auto-save and persistence
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { DiaryEntry, DiaryFilters, DiaryStats } from '../types';
import { saveEntryToDB, getEntriesFromDB, deleteEntryFromDB } from '../utils/storage';
import { generateHeadline } from '../utils/headlineGenerator';
import { AUTO_SAVE_INTERVAL } from '../constants';

export const useDiary = (userId: string) => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  // Auto-save timer
  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null);
  const pendingEntryRef = useRef<Partial<DiaryEntry> | null>(null);

  /**
   * Load entries from storage
   */
  const loadEntries = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const loadedEntries = await getEntriesFromDB(userId);
      setEntries(loadedEntries.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));
    } catch (err) {
      console.error('Failed to load entries:', err);
      setError('Failed to load diary entries');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  /**
   * Create new entry
   */
  const createEntry = useCallback(async (
    title: string,
    content: string,
    mood: DiaryEntry['mood'],
    stickers: string[] = [],
    tags: string[] = []
  ): Promise<DiaryEntry> => {
    const newEntry: DiaryEntry = {
      id: `entry_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      title,
      content,
      mood,
      stickers,
      headline: generateHeadline(content, mood),
      createdAt: new Date(),
      updatedAt: new Date(),
      tags,
      isFavorite: false,
    };

    try {
      setIsSaving(true);
      await saveEntryToDB(newEntry);
      setEntries(prev => [newEntry, ...prev]);
      return newEntry;
    } catch (err) {
      console.error('Failed to create entry:', err);
      throw new Error('Failed to save entry');
    } finally {
      setIsSaving(false);
    }
  }, [userId]);

  /**
   * Update existing entry
   */
  const updateEntry = useCallback(async (
    entryId: string,
    updates: Partial<Omit<DiaryEntry, 'id' | 'userId' | 'createdAt'>>
  ): Promise<void> => {
    const entry = entries.find(e => e.id === entryId);
    if (!entry) {
      throw new Error('Entry not found');
    }

    const updatedEntry: DiaryEntry = {
      ...entry,
      ...updates,
      updatedAt: new Date(),
      // Regenerate headline if content or mood changed
      headline: updates.content || updates.mood
        ? generateHeadline(updates.content || entry.content, updates.mood || entry.mood)
        : entry.headline,
    };

    try {
      setIsSaving(true);
      await saveEntryToDB(updatedEntry);
      setEntries(prev => prev.map(e => e.id === entryId ? updatedEntry : e));
    } catch (err) {
      console.error('Failed to update entry:', err);
      throw new Error('Failed to update entry');
    } finally {
      setIsSaving(false);
    }
  }, [entries]);

  /**
   * Delete entry
   */
  const deleteEntry = useCallback(async (entryId: string): Promise<void> => {
    try {
      await deleteEntryFromDB(entryId);
      setEntries(prev => prev.filter(e => e.id !== entryId));
    } catch (err) {
      console.error('Failed to delete entry:', err);
      throw new Error('Failed to delete entry');
    }
  }, []);

  /**
   * Toggle favorite
   */
  const toggleFavorite = useCallback(async (entryId: string): Promise<void> => {
    const entry = entries.find(e => e.id === entryId);
    if (!entry) return;

    await updateEntry(entryId, { isFavorite: !entry.isFavorite });
  }, [entries, updateEntry]);

  /**
   * Auto-save functionality
   */
  const scheduleAutoSave = useCallback((entryData: Partial<DiaryEntry>) => {
    pendingEntryRef.current = entryData;

    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }

    autoSaveTimerRef.current = setTimeout(async () => {
      if (pendingEntryRef.current && pendingEntryRef.current.id) {
        try {
          await updateEntry(pendingEntryRef.current.id, pendingEntryRef.current);
          pendingEntryRef.current = null;
        } catch (err) {
          console.error('Auto-save failed:', err);
        }
      }
    }, AUTO_SAVE_INTERVAL);
  }, [updateEntry]);

  /**
   * Filter entries
   */
  const filterEntries = useCallback((filters: DiaryFilters): DiaryEntry[] => {
    let filtered = [...entries];

    if (filters.mood) {
      filtered = filtered.filter(e => e.mood === filters.mood);
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(e =>
        e.title.toLowerCase().includes(query) ||
        e.content.toLowerCase().includes(query) ||
        e.headline?.toLowerCase().includes(query)
      );
    }

    if (filters.dateRange) {
      filtered = filtered.filter(e =>
        e.createdAt >= filters.dateRange!.start &&
        e.createdAt <= filters.dateRange!.end
      );
    }

    if (filters.tags && filters.tags.length > 0) {
      filtered = filtered.filter(e =>
        filters.tags!.some(tag => e.tags.includes(tag))
      );
    }

    if (filters.isFavorite !== undefined) {
      filtered = filtered.filter(e => e.isFavorite === filters.isFavorite);
    }

    return filtered;
  }, [entries]);

  /**
   * Get statistics
   */
  const getStats = useCallback((): DiaryStats => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const entriesThisWeek = entries.filter(e => e.createdAt >= weekAgo).length;
    const favoriteCount = entries.filter(e => e.isFavorite).length;

    const moodDistribution = entries.reduce((acc, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
      return acc;
    }, {} as Record<DiaryEntry['mood'], number>);

    return {
      totalEntries: entries.length,
      entriesThisWeek,
      favoriteCount,
      moodDistribution,
    };
  }, [entries]);

  // Load entries on mount
  useEffect(() => {
    loadEntries();
  }, [loadEntries]);

  // Cleanup auto-save timer
  useEffect(() => {
    return () => {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
      }
    };
  }, []);

  return {
    entries,
    loading,
    error,
    isSaving,
    createEntry,
    updateEntry,
    deleteEntry,
    toggleFavorite,
    scheduleAutoSave,
    filterEntries,
    getStats,
    refreshEntries: loadEntries,
  };
};
