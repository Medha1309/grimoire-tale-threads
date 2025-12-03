/**
 * Tests for useBookmarkManager Hook
 */

import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useBookmarkManager } from '../useBookmarkManager';

// Mock Firebase
vi.mock('../../lib/firebase', () => ({
  db: {},
}));

vi.mock('firebase/firestore', () => ({
  doc: vi.fn(),
  getDoc: vi.fn(),
  setDoc: vi.fn(),
  updateDoc: vi.fn(),
  arrayUnion: vi.fn((val) => val),
  arrayRemove: vi.fn((val) => val),
  increment: vi.fn((val) => val),
}));

// Mock AuthContext
vi.mock('../../contexts/AuthContext', () => ({
  useAuth: vi.fn(() => ({ currentUser: null })),
}));

const mockStory = {
  slug: 'test-story',
  title: 'Test Story',
  author: 'Test Author',
  cover: 'test-cover.jpg',
  genre: 'horror' as const,
  blurb: 'A test story',
};

describe('useBookmarkManager', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('localStorage mode (no auth)', () => {
    it('should initialize with no bookmarks', () => {
      const { result } = renderHook(() => useBookmarkManager(mockStory));
      
      expect(result.current.isBookmarked).toBe(false);
      expect(result.current.isLoading).toBe(false);
    });

    it('should detect existing bookmark from localStorage', () => {
      localStorage.setItem('bookmarkedStories', JSON.stringify([mockStory]));
      
      const { result } = renderHook(() => useBookmarkManager(mockStory));
      
      expect(result.current.isBookmarked).toBe(true);
    });

    it('should add bookmark to localStorage', async () => {
      const { result } = renderHook(() => useBookmarkManager(mockStory));
      
      expect(result.current.isBookmarked).toBe(false);
      
      await act(async () => {
        await result.current.toggleBookmark();
      });
      
      expect(result.current.isBookmarked).toBe(true);
      
      const stored = JSON.parse(localStorage.getItem('bookmarkedStories') || '[]');
      expect(stored).toHaveLength(1);
      expect(stored[0].slug).toBe('test-story');
    });

    it('should remove bookmark from localStorage', async () => {
      localStorage.setItem('bookmarkedStories', JSON.stringify([mockStory]));
      
      const { result } = renderHook(() => useBookmarkManager(mockStory));
      
      expect(result.current.isBookmarked).toBe(true);
      
      await act(async () => {
        await result.current.toggleBookmark();
      });
      
      expect(result.current.isBookmarked).toBe(false);
      
      const stored = JSON.parse(localStorage.getItem('bookmarkedStories') || '[]');
      expect(stored).toHaveLength(0);
    });

    it('should dispatch storage event on toggle', async () => {
      const storageEventSpy = vi.fn();
      window.addEventListener('storage', storageEventSpy);
      
      const { result } = renderHook(() => useBookmarkManager(mockStory));
      
      await act(async () => {
        await result.current.toggleBookmark();
      });
      
      expect(storageEventSpy).toHaveBeenCalled();
      
      window.removeEventListener('storage', storageEventSpy);
    });

    it('should handle multiple bookmarks', async () => {
      const story1 = { ...mockStory, slug: 'story-1' };
      const story2 = { ...mockStory, slug: 'story-2' };
      
      const { result: result1 } = renderHook(() => useBookmarkManager(story1));
      const { result: result2 } = renderHook(() => useBookmarkManager(story2));
      
      await act(async () => {
        await result1.current.toggleBookmark();
        await result2.current.toggleBookmark();
      });
      
      const stored = JSON.parse(localStorage.getItem('bookmarkedStories') || '[]');
      expect(stored).toHaveLength(2);
      expect(stored.map((s: any) => s.slug)).toContain('story-1');
      expect(stored.map((s: any) => s.slug)).toContain('story-2');
    });

    it('should not duplicate bookmarks', async () => {
      const { result } = renderHook(() => useBookmarkManager(mockStory));
      
      // Toggle on
      await act(async () => {
        await result.current.toggleBookmark();
      });
      
      let stored = JSON.parse(localStorage.getItem('bookmarkedStories') || '[]');
      expect(stored).toHaveLength(1);
      
      // Toggle off
      await act(async () => {
        await result.current.toggleBookmark();
      });
      
      stored = JSON.parse(localStorage.getItem('bookmarkedStories') || '[]');
      expect(stored).toHaveLength(0);
      
      // Toggle on again
      await act(async () => {
        await result.current.toggleBookmark();
      });
      
      stored = JSON.parse(localStorage.getItem('bookmarkedStories') || '[]');
      expect(stored).toHaveLength(1);
    });
  });

  describe('error handling', () => {
    it('should handle corrupted localStorage data', () => {
      localStorage.setItem('bookmarkedStories', 'invalid json');
      
      const { result } = renderHook(() => useBookmarkManager(mockStory));
      
      // Should not crash, should default to false
      expect(result.current.isBookmarked).toBe(false);
    });

    it('should handle localStorage quota exceeded', async () => {
      const originalSetItem = Storage.prototype.setItem;
      Storage.prototype.setItem = vi.fn(() => {
        throw new Error('QuotaExceededError');
      });
      
      const { result } = renderHook(() => useBookmarkManager(mockStory));
      
      await act(async () => {
        await result.current.toggleBookmark();
      });
      
      // Should not crash
      expect(result.current.isLoading).toBe(false);
      
      Storage.prototype.setItem = originalSetItem;
    });
  });
});
