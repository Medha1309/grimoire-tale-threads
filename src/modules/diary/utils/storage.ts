/**
 * Diary Module - Storage Utilities
 * IndexedDB with LocalStorage fallback
 */

import { DiaryEntry } from '../types';

const DB_NAME = 'GrimrDiaryDB';
const DB_VERSION = 1;
const STORE_NAME = 'entries';
const LOCALSTORAGE_KEY = 'grimr_diary_entries';

// IndexedDB instance
let db: IDBDatabase | null = null;

/**
 * Initialize IndexedDB
 */
export const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (db) {
      resolve(db);
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const database = (event.target as IDBOpenDBRequest).result;
      
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        const objectStore = database.createObjectStore(STORE_NAME, { keyPath: 'id' });
        objectStore.createIndex('userId', 'userId', { unique: false });
        objectStore.createIndex('createdAt', 'createdAt', { unique: false });
        objectStore.createIndex('mood', 'mood', { unique: false });
      }
    };
  });
};

/**
 * Save entry to IndexedDB
 */
export const saveEntryToDB = async (entry: DiaryEntry): Promise<void> => {
  try {
    const database = await initDB();
    const transaction = database.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    // Convert dates to ISO strings for storage
    const entryToStore = {
      ...entry,
      createdAt: entry.createdAt.toISOString(),
      updatedAt: entry.updatedAt.toISOString(),
    };
    
    store.put(entryToStore);
    
    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  } catch (error) {
    console.warn('IndexedDB failed, falling back to localStorage', error);
    saveEntryToLocalStorage(entry);
  }
};

/**
 * Get all entries from IndexedDB
 */
export const getEntriesFromDB = async (userId: string): Promise<DiaryEntry[]> => {
  try {
    const database = await initDB();
    const transaction = database.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const index = store.index('userId');
    const request = index.getAll(userId);
    
    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        const entries = request.result.map((entry: any) => ({
          ...entry,
          createdAt: new Date(entry.createdAt),
          updatedAt: new Date(entry.updatedAt),
        }));
        resolve(entries);
      };
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.warn('IndexedDB failed, falling back to localStorage', error);
    return getEntriesFromLocalStorage(userId);
  }
};

/**
 * Delete entry from IndexedDB
 */
export const deleteEntryFromDB = async (entryId: string): Promise<void> => {
  try {
    const database = await initDB();
    const transaction = database.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    store.delete(entryId);
    
    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  } catch (error) {
    console.warn('IndexedDB failed, falling back to localStorage', error);
    deleteEntryFromLocalStorage(entryId);
  }
};

/**
 * LocalStorage fallback - Save
 */
const saveEntryToLocalStorage = (entry: DiaryEntry): void => {
  const stored = localStorage.getItem(LOCALSTORAGE_KEY);
  const entries: DiaryEntry[] = stored ? JSON.parse(stored) : [];
  
  const index = entries.findIndex(e => e.id === entry.id);
  if (index >= 0) {
    entries[index] = entry;
  } else {
    entries.push(entry);
  }
  
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(entries));
};

/**
 * LocalStorage fallback - Get
 */
const getEntriesFromLocalStorage = (userId: string): DiaryEntry[] => {
  const stored = localStorage.getItem(LOCALSTORAGE_KEY);
  if (!stored) return [];
  
  const entries: any[] = JSON.parse(stored);
  return entries
    .filter(e => e.userId === userId)
    .map(e => ({
      ...e,
      createdAt: new Date(e.createdAt),
      updatedAt: new Date(e.updatedAt),
    }));
};

/**
 * LocalStorage fallback - Delete
 */
const deleteEntryFromLocalStorage = (entryId: string): void => {
  const stored = localStorage.getItem(LOCALSTORAGE_KEY);
  if (!stored) return;
  
  const entries: DiaryEntry[] = JSON.parse(stored);
  const filtered = entries.filter(e => e.id !== entryId);
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(filtered));
};
