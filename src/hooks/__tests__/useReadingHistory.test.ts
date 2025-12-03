/**
 * Tests for useReadingHistory Hook
 */

import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useReadingHistory } from '../useReadingHistory';

describe('useReadingHistory', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with empty history', () => {
    const { result } = renderHook(() => useReadingHistory());
    
    expect(result.current.history).toEqual([]);
    expect(result.current.stats.totalBooks).toBe(0);
  });

  it('should add a book to history', () => {
    const { result } = renderHook(() => useReadingHistory());
    
    act(() => {
      result.current.addToHistory({
        storySlug: 'test-story',
        storyTitle: 'Test Story',
        storyAuthor: 'Test Author',
        storyGenre: 'horror',
        readingTime: 30,
      });
    });
    
    expect(result.current.history).toHaveLength(1);
    expect(result.current.history[0].storySlug).toBe('test-story');
    expect(result.current.history[0].completedAt).toBeInstanceOf(Date);
  });

  it('should update entry notes and rating', () => {
    const { result } = renderHook(() => useReadingHistory());
    
    let entryId: string;
    act(() => {
      const entry = result.current.addToHistory({
        storySlug: 'test-story',
        storyTitle: 'Test Story',
        storyAuthor: 'Test Author',
      });
      entryId = entry.id;
    });
    
    act(() => {
      result.current.updateEntry(entryId, {
        personalNotes: 'Great story!',
        rating: 5,
      });
    });
    
    expect(result.current.history[0].personalNotes).toBe('Great story!');
    expect(result.current.history[0].rating).toBe(5);
  });

  it('should remove from history', () => {
    const { result } = renderHook(() => useReadingHistory());
    
    let entryId: string;
    act(() => {
      const entry = result.current.addToHistory({
        storySlug: 'test-story',
        storyTitle: 'Test Story',
        storyAuthor: 'Test Author',
      });
      entryId = entry.id;
    });
    
    expect(result.current.history).toHaveLength(1);
    
    act(() => {
      result.current.removeFromHistory(entryId);
    });
    
    expect(result.current.history).toHaveLength(0);
  });

  it('should check if story is in history', () => {
    const { result } = renderHook(() => useReadingHistory());
    
    act(() => {
      result.current.addToHistory({
        storySlug: 'test-story',
        storyTitle: 'Test Story',
        storyAuthor: 'Test Author',
      });
    });
    
    expect(result.current.isInHistory('test-story')).toBe(true);
    expect(result.current.isInHistory('other-story')).toBe(false);
  });

  it('should get entry by slug', () => {
    const { result } = renderHook(() => useReadingHistory());
    
    act(() => {
      result.current.addToHistory({
        storySlug: 'test-story',
        storyTitle: 'Test Story',
        storyAuthor: 'Test Author',
      });
    });
    
    const entry = result.current.getEntryBySlug('test-story');
    expect(entry).not.toBeUndefined();
    expect(entry?.storyTitle).toBe('Test Story');
  });

  describe('stats', () => {
    it('should calculate total books', () => {
      const { result } = renderHook(() => useReadingHistory());
      
      act(() => {
        result.current.addToHistory({
          storySlug: 'story-1',
          storyTitle: 'Story 1',
          storyAuthor: 'Author 1',
        });
      });
      
      act(() => {
        result.current.addToHistory({
          storySlug: 'story-2',
          storyTitle: 'Story 2',
          storyAuthor: 'Author 2',
        });
      });
      
      expect(result.current.stats.totalBooks).toBe(2);
    });

    it('should calculate total reading time', () => {
      const { result } = renderHook(() => useReadingHistory());
      
      act(() => {
        result.current.addToHistory({
          storySlug: 'story-1',
          storyTitle: 'Story 1',
          storyAuthor: 'Author 1',
          readingTime: 30,
        });
      });
      
      act(() => {
        result.current.addToHistory({
          storySlug: 'story-2',
          storyTitle: 'Story 2',
          storyAuthor: 'Author 2',
          readingTime: 45,
        });
      });
      
      expect(result.current.stats.totalReadingTime).toBe(75);
    });

    it('should count genres', () => {
      const { result } = renderHook(() => useReadingHistory());
      
      act(() => {
        result.current.addToHistory({
          storySlug: 'story-1',
          storyTitle: 'Story 1',
          storyAuthor: 'Author 1',
          storyGenre: 'horror',
        });
      });
      
      act(() => {
        result.current.addToHistory({
          storySlug: 'story-2',
          storyTitle: 'Story 2',
          storyAuthor: 'Author 2',
          storyGenre: 'horror',
        });
      });
      
      act(() => {
        result.current.addToHistory({
          storySlug: 'story-3',
          storyTitle: 'Story 3',
          storyAuthor: 'Author 3',
          storyGenre: 'mystery',
        });
      });
      
      expect(result.current.stats.genreCounts.horror).toBe(2);
      expect(result.current.stats.genreCounts.mystery).toBe(1);
    });

    it('should calculate average rating', () => {
      const { result } = renderHook(() => useReadingHistory());
      
      let id1: string, id2: string;
      act(() => {
        const entry1 = result.current.addToHistory({
          storySlug: 'story-1',
          storyTitle: 'Story 1',
          storyAuthor: 'Author 1',
        });
        id1 = entry1.id;
      });
      
      act(() => {
        const entry2 = result.current.addToHistory({
          storySlug: 'story-2',
          storyTitle: 'Story 2',
          storyAuthor: 'Author 2',
        });
        id2 = entry2.id;
      });
      
      act(() => {
        result.current.updateEntry(id1, { rating: 4 });
      });
      
      act(() => {
        result.current.updateEntry(id2, { rating: 5 });
      });
      
      expect(result.current.stats.averageRating).toBe(4.5);
    });
  });

  describe('persistence', () => {
    it('should persist to localStorage', () => {
      const { result } = renderHook(() => useReadingHistory());
      
      act(() => {
        result.current.addToHistory({
          storySlug: 'test-story',
          storyTitle: 'Test Story',
          storyAuthor: 'Test Author',
        });
      });
      
      const stored = localStorage.getItem('grimr_reading_history');
      expect(stored).not.toBeNull();
      
      const parsed = JSON.parse(stored!);
      expect(parsed).toHaveLength(1);
      expect(parsed[0].storySlug).toBe('test-story');
    });

    it('should load from localStorage on mount', () => {
      const entry = {
        id: 'test-id',
        storySlug: 'test-story',
        storyTitle: 'Test Story',
        storyAuthor: 'Test Author',
        completedAt: new Date().toISOString(),
      };
      
      localStorage.setItem('grimr_reading_history', JSON.stringify([entry]));
      
      const { result } = renderHook(() => useReadingHistory());
      
      expect(result.current.history).toHaveLength(1);
      expect(result.current.history[0].storySlug).toBe('test-story');
    });
  });

  describe('error handling', () => {
    it('should handle corrupted localStorage data', () => {
      localStorage.setItem('grimr_reading_history', 'invalid json');
      
      const { result } = renderHook(() => useReadingHistory());
      
      // Should not crash
      expect(result.current.history).toEqual([]);
    });
  });
});
