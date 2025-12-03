/**
 * Tests for useArchive Hook
 */

import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useArchive } from '../useArchive';
import { ArchiveItem } from '../../types/archive';

describe('useArchive', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('diary archive', () => {
    it('should initialize with empty archive', () => {
      const { result } = renderHook(() => useArchive('diary'));
      
      expect(result.current.items).toEqual([]);
      expect(result.current.loading).toBe(false);
    });

    it('should archive a diary entry', () => {
      const { result } = renderHook(() => useArchive('diary'));
      
      const diaryEntry = {
        id: 'diary-1',
        type: 'diary' as const,
        content: 'Test diary entry',
        mood: 'joy' as const,
        isLocked: false,
        originalCreatedAt: new Date(),
      };
      
      act(() => {
        result.current.archiveItem(diaryEntry);
      });
      
      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].id).toBe('diary-1');
      expect(result.current.items[0].type).toBe('diary');
    });

    it('should restore a diary entry', () => {
      const { result } = renderHook(() => useArchive('diary'));
      
      const diaryEntry = {
        id: 'diary-1',
        type: 'diary' as const,
        content: 'Test diary entry',
        mood: 'joy' as const,
        isLocked: false,
        originalCreatedAt: new Date(),
      };
      
      act(() => {
        result.current.archiveItem(diaryEntry);
      });
      
      expect(result.current.items).toHaveLength(1);
      
      let restored: ArchiveItem | null = null;
      act(() => {
        restored = result.current.restoreItem('diary-1');
      });
      
      expect(restored).not.toBeNull();
      expect(restored?.id).toBe('diary-1');
      expect(result.current.items).toHaveLength(0);
    });

    it('should permanently delete an entry', () => {
      const { result } = renderHook(() => useArchive('diary'));
      
      const diaryEntry = {
        id: 'diary-1',
        type: 'diary' as const,
        content: 'Test diary entry',
        mood: 'joy' as const,
        isLocked: false,
        originalCreatedAt: new Date(),
      };
      
      act(() => {
        result.current.archiveItem(diaryEntry);
      });
      
      expect(result.current.items).toHaveLength(1);
      
      act(() => {
        result.current.permanentlyDelete('diary-1');
      });
      
      expect(result.current.items).toHaveLength(0);
    });
  });

  describe('reading archive', () => {
    it('should archive a reading entry', () => {
      const { result } = renderHook(() => useArchive('reading'));
      
      const readingEntry = {
        id: 'reading-1',
        type: 'reading' as const,
        storySlug: 'test-story',
        storyTitle: 'Test Story',
        storyAuthor: 'Test Author',
        originalCreatedAt: new Date(),
      };
      
      act(() => {
        result.current.archiveItem(readingEntry);
      });
      
      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].type).toBe('reading');
    });
  });

  describe('scrapbook archive', () => {
    it('should archive a scrapbook entry', () => {
      const { result } = renderHook(() => useArchive('scrapbook'));
      
      const scrapbookEntry = {
        id: 'scrapbook-1',
        type: 'scrapbook' as const,
        date: new Date(),
        thought: 'Test memory',
        photos: [],
        stickers: [],
        scratchOffs: [],
        layout: 'single' as const,
        originalCreatedAt: new Date(),
      };
      
      act(() => {
        result.current.archiveItem(scrapbookEntry);
      });
      
      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].type).toBe('scrapbook');
    });
  });

  describe('persistence', () => {
    it('should persist to localStorage', () => {
      const { result } = renderHook(() => useArchive('diary'));
      
      const diaryEntry = {
        id: 'diary-1',
        type: 'diary' as const,
        content: 'Test diary entry',
        mood: 'joy' as const,
        isLocked: false,
        originalCreatedAt: new Date(),
      };
      
      act(() => {
        result.current.archiveItem(diaryEntry);
      });
      
      const stored = localStorage.getItem('grimr_archive_diary');
      expect(stored).not.toBeNull();
      
      const parsed = JSON.parse(stored!);
      expect(parsed).toHaveLength(1);
      expect(parsed[0].id).toBe('diary-1');
    });

    it('should load from localStorage on mount', () => {
      const diaryEntry = {
        id: 'diary-1',
        type: 'diary',
        content: 'Test diary entry',
        mood: 'joy',
        isLocked: false,
        originalCreatedAt: new Date().toISOString(),
        archivedAt: new Date().toISOString(),
      };
      
      localStorage.setItem('grimr_archive_diary', JSON.stringify([diaryEntry]));
      
      const { result } = renderHook(() => useArchive('diary'));
      
      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].id).toBe('diary-1');
    });
  });

  describe('auto-deletion', () => {
    it('should filter out items older than 30 days', () => {
      const oldDate = new Date();
      oldDate.setDate(oldDate.getDate() - 31);
      
      const oldEntry = {
        id: 'old-1',
        type: 'diary',
        content: 'Old entry',
        mood: 'joy',
        isLocked: false,
        originalCreatedAt: oldDate.toISOString(),
        archivedAt: oldDate.toISOString(),
      };
      
      const recentEntry = {
        id: 'recent-1',
        type: 'diary',
        content: 'Recent entry',
        mood: 'joy',
        isLocked: false,
        originalCreatedAt: new Date().toISOString(),
        archivedAt: new Date().toISOString(),
      };
      
      localStorage.setItem('grimr_archive_diary', JSON.stringify([oldEntry, recentEntry]));
      
      const { result } = renderHook(() => useArchive('diary'));
      
      // Old entry should be filtered out
      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].id).toBe('recent-1');
    });

    it('should calculate days until deletion correctly', () => {
      const { result } = renderHook(() => useArchive('diary'));
      
      const diaryEntry = {
        id: 'diary-1',
        type: 'diary' as const,
        content: 'Test diary entry',
        mood: 'joy' as const,
        isLocked: false,
        originalCreatedAt: new Date(),
      };
      
      act(() => {
        result.current.archiveItem(diaryEntry);
      });
      
      const itemsWithDeletion = result.current.getItemsWithDeletion();
      expect(itemsWithDeletion[0].daysUntilDeletion).toBe(30);
    });
  });

  describe('stats', () => {
    it('should calculate stats correctly', () => {
      const { result } = renderHook(() => useArchive('diary'));
      
      act(() => {
        result.current.archiveItem({
          id: 'diary-1',
          type: 'diary' as const,
          content: 'Entry 1',
          mood: 'joy' as const,
          isLocked: false,
          originalCreatedAt: new Date(),
        });
      });
      
      act(() => {
        result.current.archiveItem({
          id: 'diary-2',
          type: 'diary' as const,
          content: 'Entry 2',
          mood: 'sorrow' as const,
          isLocked: false,
          originalCreatedAt: new Date(),
        });
      });
      
      const stats = result.current.getStats();
      expect(stats.totalItems).toBe(2);
      expect(stats.diaryCount).toBe(2);
      expect(stats.readingCount).toBe(0);
      expect(stats.scrapbookCount).toBe(0);
    });
  });

  describe('error handling', () => {
    it('should handle corrupted localStorage data', () => {
      localStorage.setItem('grimr_archive_diary', 'invalid json');
      
      const { result } = renderHook(() => useArchive('diary'));
      
      // Should not crash
      expect(result.current.items).toEqual([]);
      expect(result.current.loading).toBe(false);
    });

    it('should handle missing item on restore', () => {
      const { result } = renderHook(() => useArchive('diary'));
      
      let restored: ArchiveItem | null = null;
      act(() => {
        restored = result.current.restoreItem('non-existent');
      });
      
      expect(restored).toBeNull();
    });
  });
});
