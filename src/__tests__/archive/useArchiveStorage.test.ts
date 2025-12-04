import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useArchiveStorage } from '../../hooks/useArchiveStorage';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('useArchiveStorage', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  it('should initialize with empty array', () => {
    const { result } = renderHook(() => useArchiveStorage());
    expect(result.current.books).toEqual([]);
  });

  it('should add a book', () => {
    const { result } = renderHook(() => useArchiveStorage());

    act(() => {
      result.current.addBook({
        title: 'Test Book',
        author: 'Test Author',
        rating: 5,
      });
    });

    expect(result.current.books).toHaveLength(1);
    expect(result.current.books[0].title).toBe('Test Book');
    expect(result.current.books[0].author).toBe('Test Author');
    expect(result.current.books[0].rating).toBe(5);
  });

  it('should update a book', () => {
    const { result } = renderHook(() => useArchiveStorage());

    let bookId: string;
    act(() => {
      const book = result.current.addBook({ title: 'Original' });
      bookId = book.id;
    });

    act(() => {
      result.current.updateBook(bookId, { title: 'Updated' });
    });

    expect(result.current.books[0].title).toBe('Updated');
  });

  it('should soft delete a book', () => {
    const { result } = renderHook(() => useArchiveStorage());

    let bookId: string;
    act(() => {
      const book = result.current.addBook({ title: 'To Delete' });
      bookId = book.id;
    });

    act(() => {
      result.current.softDelete(bookId);
    });

    expect(result.current.books[0].deleted).toBe(true);
  });

  it('should restore a deleted book', () => {
    const { result } = renderHook(() => useArchiveStorage());

    let bookId: string;
    act(() => {
      const book = result.current.addBook({ title: 'To Restore' });
      bookId = book.id;
    });

    act(() => {
      result.current.softDelete(bookId);
    });

    expect(result.current.books[0].deleted).toBe(true);

    act(() => {
      result.current.restore(bookId);
    });

    expect(result.current.books[0].deleted).toBe(false);
  });

  it('should hard delete a book', () => {
    const { result } = renderHook(() => useArchiveStorage());

    let bookId: string;
    act(() => {
      const book = result.current.addBook({ title: 'To Hard Delete' });
      bookId = book.id;
    });

    act(() => {
      result.current.hardDelete(bookId);
    });

    expect(result.current.books).toHaveLength(0);
  });

  it('should bulk soft delete books', () => {
    const { result } = renderHook(() => useArchiveStorage());

    let ids: string[];
    act(() => {
      const b1 = result.current.addBook({ title: 'Book 1' });
      const b2 = result.current.addBook({ title: 'Book 2' });
      ids = [b1.id, b2.id];
    });

    act(() => {
      result.current.bulkSoftDelete(ids);
    });

    expect(result.current.books.every((b) => b.deleted)).toBe(true);
  });

  it('should export to JSON', () => {
    const { result } = renderHook(() => useArchiveStorage());

    act(() => {
      result.current.addBook({ title: 'Export Test' });
    });

    const json = result.current.exportJson();
    const parsed = JSON.parse(json);

    expect(Array.isArray(parsed)).toBe(true);
    expect(parsed[0].title).toBe('Export Test');
  });

  it('should import from JSON', () => {
    const { result } = renderHook(() => useArchiveStorage());

    const importData = [
      {
        id: 'import-1',
        title: 'Imported Book',
        author: 'Import Author',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    act(() => {
      result.current.importJson(importData);
    });

    expect(result.current.books).toHaveLength(1);
    expect(result.current.books[0].title).toBe('Imported Book');
  });

  it('should persist to localStorage', () => {
    const { result } = renderHook(() => useArchiveStorage());

    act(() => {
      result.current.addBook({ title: 'Persist Test' });
    });

    const stored = localStorageMock.getItem('archive_books:v1');
    expect(stored).toBeTruthy();

    const parsed = JSON.parse(stored!);
    expect(parsed[0].title).toBe('Persist Test');
  });

  it('should load from localStorage on init', () => {
    const testData = [
      {
        id: 'test-1',
        title: 'Preloaded',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    localStorageMock.setItem('archive_books:v1', JSON.stringify(testData));

    const { result } = renderHook(() => useArchiveStorage());

    expect(result.current.books).toHaveLength(1);
    expect(result.current.books[0].title).toBe('Preloaded');
  });
});


