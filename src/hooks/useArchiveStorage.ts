import { useEffect, useState, useCallback } from "react";

export type Book = {
  id: string;
  title: string;
  author?: string;
  dateRead?: string; // ISO
  tags?: string[];
  rating?: number; // 1-5
  note?: string;
  createdAt: string;
  updatedAt: string;
  deleted?: boolean; // soft delete
};

const STORAGE_KEY = "archive_books:v1";

// MIGRATION NOTE: To switch to IndexedDB, replace these functions with idb calls
// Example: import { openDB } from 'idb';
// const db = await openDB('archive-db', 1, { upgrade(db) { db.createObjectStore('books', { keyPath: 'id' }); }});
// Then replace localStorage.getItem/setItem with db.getAll('books') and db.put('books', book)

function readStorage(): Book[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Book[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeStorage(books: Book[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}

export function useArchiveStorage() {
  const [books, setBooks] = useState<Book[]>(() => readStorage());

  useEffect(() => {
    writeStorage(books);
  }, [books]);

  const addBook = useCallback((partial: Partial<Book>) => {
    const now = new Date().toISOString();
    const book: Book = {
      id: `b_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      title: partial.title || "Untitled",
      author: partial.author || "",
      dateRead: partial.dateRead || now,
      tags: partial.tags || [],
      rating: partial.rating || 0,
      note: partial.note || "",
      createdAt: now,
      updatedAt: now,
    };
    setBooks((s) => [book, ...s]);
    return book;
  }, []);

  const updateBook = useCallback((id: string, patch: Partial<Book>) => {
    setBooks((s) =>
      s.map((b) =>
        b.id === id ? { ...b, ...patch, updatedAt: new Date().toISOString() } : b
      )
    );
  }, []);

  const softDelete = useCallback((id: string) => {
    setBooks((s) =>
      s.map((b) =>
        b.id === id ? { ...b, deleted: true, updatedAt: new Date().toISOString() } : b
      )
    );
  }, []);

  const restore = useCallback((id: string) => {
    setBooks((s) =>
      s.map((b) =>
        b.id === id ? { ...b, deleted: false, updatedAt: new Date().toISOString() } : b
      )
    );
  }, []);

  const hardDelete = useCallback((id: string) => {
    setBooks((s) => s.filter((b) => b.id !== id));
  }, []);

  const bulkSoftDelete = useCallback((ids: string[]) => {
    setBooks((s) =>
      s.map((b) =>
        ids.includes(b.id)
          ? { ...b, deleted: true, updatedAt: new Date().toISOString() }
          : b
      )
    );
  }, []);

  const bulkUpdate = useCallback((ids: string[], patch: Partial<Book>) => {
    setBooks((s) =>
      s.map((b) =>
        ids.includes(b.id)
          ? { ...b, ...patch, updatedAt: new Date().toISOString() }
          : b
      )
    );
  }, []);

  const importJson = useCallback((data: Book[]) => {
    setBooks((s) => {
      const map = new Map<string, Book>(s.map((b) => [b.id, b]));
      for (const b of data) {
        map.set(b.id, b);
      }
      return Array.from(map.values()).sort((a, z) =>
        a.createdAt > z.createdAt ? -1 : 1
      );
    });
  }, []);

  const exportJson = useCallback(() => {
    return JSON.stringify(readStorage(), null, 2);
  }, []);

  return {
    books,
    setBooks,
    addBook,
    updateBook,
    softDelete,
    restore,
    hardDelete,
    bulkSoftDelete,
    bulkUpdate,
    importJson,
    exportJson,
  };
}
