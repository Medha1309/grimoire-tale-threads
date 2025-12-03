/**
 * useArchive Hook
 * Unified archive management for diary, reading history, and scrapbooks
 * Handles soft delete, restore, and auto-deletion after 30 days
 */

import { useState, useEffect, useCallback } from 'react';
import {
  ArchiveItem,
  ArchiveContentType,
  shouldAutoDelete,
  getDaysUntilDeletion,
  ArchiveStats,
} from '../types/archive';

const STORAGE_KEY_PREFIX = 'grimr_archive_';

export const useArchive = (contentType: ArchiveContentType) => {
  const [items, setItems] = useState<ArchiveItem[]>([]);
  const [loading, setLoading] = useState(true);

  const storageKey = `${STORAGE_KEY_PREFIX}${contentType}`;

  // Load from localStorage
  const loadItems = useCallback(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        const items = parsed.map((item: any) => ({
          ...item,
          archivedAt: new Date(item.archivedAt),
          originalCreatedAt: new Date(item.originalCreatedAt),
          date: item.date ? new Date(item.date) : undefined,
        }));
        
        // Filter out items that should be auto-deleted
        const validItems = items.filter((item: ArchiveItem) => !shouldAutoDelete(item.archivedAt));
        
        // If any were filtered, update storage
        if (validItems.length !== items.length) {
          localStorage.setItem(storageKey, JSON.stringify(validItems));
        }
        
        setItems(validItems);
      }
    } catch (error) {
      console.error(`Failed to load ${contentType} archive:`, error);
    } finally {
      setLoading(false);
    }
  }, [storageKey, contentType]);

  // Save to localStorage
  const saveItems = useCallback((newItems: ArchiveItem[]) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(newItems));
      setItems(newItems);
    } catch (error) {
      console.error(`Failed to save ${contentType} archive:`, error);
    }
  }, [storageKey, contentType]);

  // Archive an item (soft delete)
  const archiveItem = useCallback((item: Omit<ArchiveItem, 'archivedAt'>) => {
    const archivedItem: ArchiveItem = {
      ...item,
      archivedAt: new Date(),
    } as ArchiveItem;

    const updated = [archivedItem, ...items];
    saveItems(updated);
    return archivedItem;
  }, [items, saveItems]);

  // Restore an item from archive
  const restoreItem = useCallback((id: string) => {
    const item = items.find(i => i.id === id);
    if (!item) return null;

    const updated = items.filter(i => i.id !== id);
    saveItems(updated);
    return item;
  }, [items, saveItems]);

  // Permanently delete an item
  const permanentlyDelete = useCallback((id: string) => {
    const updated = items.filter(i => i.id !== id);
    saveItems(updated);
  }, [items, saveItems]);

  // Get item by ID
  const getItem = useCallback((id: string) => {
    return items.find(i => i.id === id);
  }, [items]);

  // Get stats
  const getStats = useCallback((): ArchiveStats => {
    const diaryItems = items.filter(i => i.type === 'diary');
    const readingItems = items.filter(i => i.type === 'reading');
    const scrapbookItems = items.filter(i => i.type === 'scrapbook');

    const dates = items.map(i => i.archivedAt);
    const oldestItem = dates.length > 0 ? new Date(Math.min(...dates.map(d => d.getTime()))) : undefined;
    const newestItem = dates.length > 0 ? new Date(Math.max(...dates.map(d => d.getTime()))) : undefined;

    const artItems = items.filter(i => i.type === 'art');

    return {
      totalItems: items.length,
      diaryCount: diaryItems.length,
      readingCount: readingItems.length,
      scrapbookCount: scrapbookItems.length,
      artCount: artItems.length,
      oldestItem,
      newestItem,
    };
  }, [items]);

  // Get items with days until deletion
  const getItemsWithDeletion = useCallback(() => {
    return items.map(item => ({
      ...item,
      daysUntilDeletion: getDaysUntilDeletion(item.archivedAt),
    }));
  }, [items]);

  // Load on mount and set up auto-cleanup interval
  useEffect(() => {
    loadItems();

    // Check for auto-deletion every hour
    const interval = setInterval(() => {
      loadItems();
    }, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [loadItems]);

  return {
    items,
    loading,
    archiveItem,
    restoreItem,
    permanentlyDelete,
    getItem,
    getStats,
    getItemsWithDeletion,
    refreshItems: loadItems,
  };
};
