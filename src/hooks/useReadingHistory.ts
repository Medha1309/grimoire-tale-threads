/**
 * useReadingHistory Hook
 * Tracks books read from the Library
 */

import { useState, useEffect } from 'react';

export interface ReadingHistoryEntry {
  id: string;
  storySlug: string;
  storyTitle: string;
  storyAuthor: string;
  storyCover?: string;
  storyGenre?: 'horror' | 'mystery' | 'romance' | 'thriller';
  completedAt: Date;
  readingTime?: number; // minutes
  personalNotes?: string;
  rating?: number; // 1-5
}

const STORAGE_KEY = 'grimr_reading_history';

export const useReadingHistory = () => {
  const [history, setHistory] = useState<ReadingHistoryEntry[]>([]);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const entries = parsed.map((entry: any) => ({
          ...entry,
          completedAt: new Date(entry.completedAt),
        }));
        setHistory(entries);
      } catch (error) {
        console.error('Failed to load reading history:', error);
      }
    }
  }, []);

  // Save to localStorage
  const saveHistory = (entries: ReadingHistoryEntry[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    setHistory(entries);
  };

  // Add a book to history
  const addToHistory = (entry: Omit<ReadingHistoryEntry, 'id' | 'completedAt'>) => {
    const newEntry: ReadingHistoryEntry = {
      ...entry,
      id: `history-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      completedAt: new Date(),
    };

    const updated = [newEntry, ...history];
    saveHistory(updated);
    return newEntry;
  };

  // Update notes or rating
  const updateEntry = (id: string, updates: Partial<ReadingHistoryEntry>) => {
    const updated = history.map(entry =>
      entry.id === id ? { ...entry, ...updates } : entry
    );
    saveHistory(updated);
  };

  // Remove from history
  const removeFromHistory = (id: string) => {
    const updated = history.filter(entry => entry.id !== id);
    saveHistory(updated);
  };

  // Check if a story is in history
  const isInHistory = (storySlug: string) => {
    return history.some(entry => entry.storySlug === storySlug);
  };

  // Get entry by story slug
  const getEntryBySlug = (storySlug: string) => {
    return history.find(entry => entry.storySlug === storySlug);
  };

  // Get stats
  const stats = {
    totalBooks: history.length,
    totalReadingTime: history.reduce((sum, entry) => sum + (entry.readingTime || 0), 0),
    genreCounts: history.reduce((acc, entry) => {
      if (entry.storyGenre) {
        acc[entry.storyGenre] = (acc[entry.storyGenre] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>),
    averageRating: history.length > 0
      ? history.reduce((sum, entry) => sum + (entry.rating || 0), 0) / history.filter(e => e.rating).length
      : 0,
  };

  return {
    history,
    addToHistory,
    updateEntry,
    removeFromHistory,
    isInHistory,
    getEntryBySlug,
    stats,
  };
};
