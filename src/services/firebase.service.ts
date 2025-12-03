/**
 * Centralized Firebase service layer
 * All Firebase operations should go through this service for consistency
 */

import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,

  limit,
  startAfter,
  QueryConstraint,
  DocumentData,
  QueryDocumentSnapshot,
  Timestamp,
  writeBatch,
  increment,
  arrayUnion,
  arrayRemove,
  onSnapshot,
  Unsubscribe,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { handleError, withErrorHandling } from '../utils/errorHandling';
import { COLLECTIONS } from '../constants/app';

// Re-export db for convenience
export { db };

/**
 * Generic document operations
 */
export class FirebaseService<T extends DocumentData> {
  constructor(private collectionName: string) {}

  /**
   * Get a single document by ID
   */
  async getById(id: string): Promise<T | null> {
    return withErrorHandling(async () => {
      const docRef = doc(db, this.collectionName, id);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        return null;
      }
      
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as unknown as T;
    })();
  }

  /**
   * Get all documents with optional query constraints
   */
  async getAll(constraints: QueryConstraint[] = []): Promise<T[]> {
    return withErrorHandling(async () => {
      const collectionRef = collection(db, this.collectionName);
      const q = query(collectionRef, ...constraints);
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as unknown as T[];
    })();
  }

  /**
   * Get documents with pagination
   */
  async getPaginated(
    pageSize: number,
    lastDoc?: QueryDocumentSnapshot,
    constraints: QueryConstraint[] = []
  ): Promise<{ data: T[]; lastDoc: QueryDocumentSnapshot | null }> {
    return withErrorHandling(async () => {
      const collectionRef = collection(db, this.collectionName);
      const queryConstraints = [
        ...constraints,
        limit(pageSize),
      ];
      
      if (lastDoc) {
        queryConstraints.push(startAfter(lastDoc));
      }
      
      const q = query(collectionRef, ...queryConstraints);
      const querySnapshot = await getDocs(q);
      
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as unknown as T[];
      
      const newLastDoc = querySnapshot.docs[querySnapshot.docs.length - 1] || null;
      
      return { data, lastDoc: newLastDoc };
    })();
  }

  /**
   * Create a new document
   */
  async create(id: string, data: Partial<T>): Promise<void> {
    return withErrorHandling(async () => {
      const docRef = doc(db, this.collectionName, id);
      await setDoc(docRef, {
        ...data,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
    })();
  }

  /**
   * Update an existing document
   */
  async update(id: string, data: Partial<T>): Promise<void> {
    return withErrorHandling(async () => {
      const docRef = doc(db, this.collectionName, id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: Timestamp.now(),
      });
    })();
  }

  /**
   * Delete a document
   */
  async delete(id: string): Promise<void> {
    return withErrorHandling(async () => {
      const docRef = doc(db, this.collectionName, id);
      await deleteDoc(docRef);
    })();
  }

  /**
   * Check if document exists
   */
  async exists(id: string): Promise<boolean> {
    return withErrorHandling(async () => {
      const docRef = doc(db, this.collectionName, id);
      const docSnap = await getDoc(docRef);
      return docSnap.exists();
    })();
  }

  /**
   * Query documents by field
   */
  async queryByField(
    field: string,
    operator: '==' | '!=' | '<' | '<=' | '>' | '>=' | 'in' | 'array-contains',
    value: unknown
  ): Promise<T[]> {
    return withErrorHandling(async () => {
      const collectionRef = collection(db, this.collectionName);
      const q = query(collectionRef, where(field, operator, value));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as unknown as T[];
    })();
  }

  /**
   * Subscribe to document changes
   */
  subscribe(id: string, callback: (data: T | null) => void): Unsubscribe {
    const docRef = doc(db, this.collectionName, id);
    return onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          callback({
            id: docSnap.id,
            ...docSnap.data(),
          } as unknown as T);
        } else {
          callback(null);
        }
      },
      (error) => {
        handleError(error);
        callback(null);
      }
    );
  }

  /**
   * Subscribe to collection changes
   */
  subscribeToCollection(
    callback: (data: T[]) => void,
    constraints: QueryConstraint[] = []
  ): Unsubscribe {
    const collectionRef = collection(db, this.collectionName);
    const q = query(collectionRef, ...constraints);
    
    return onSnapshot(
      q,
      (querySnapshot) => {
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as unknown as T[];
        callback(data);
      },
      (error) => {
        handleError(error);
        callback([]);
      }
    );
  }

  /**
   * Batch operations
   */
  async batchWrite(operations: Array<{
    type: 'create' | 'update' | 'delete';
    id: string;
    data?: Partial<T>;
  }>): Promise<void> {
    return withErrorHandling(async () => {
      const batch = writeBatch(db);
      
      for (const op of operations) {
        const docRef = doc(db, this.collectionName, op.id);
        
        switch (op.type) {
          case 'create':
            batch.set(docRef, {
              ...op.data,
              createdAt: Timestamp.now(),
              updatedAt: Timestamp.now(),
            });
            break;
          case 'update':
            batch.update(docRef, {
              ...op.data,
              updatedAt: Timestamp.now(),
            });
            break;
          case 'delete':
            batch.delete(docRef);
            break;
        }
      }
      
      await batch.commit();
    })();
  }

  /**
   * Increment a numeric field
   */
  async incrementField(id: string, field: string, value: number): Promise<void> {
    return withErrorHandling(async () => {
      const docRef = doc(db, this.collectionName, id);
      await updateDoc(docRef, {
        [field]: increment(value),
        updatedAt: Timestamp.now(),
      });
    })();
  }

  /**
   * Add item to array field
   */
  async addToArray(id: string, field: string, value: unknown): Promise<void> {
    return withErrorHandling(async () => {
      const docRef = doc(db, this.collectionName, id);
      await updateDoc(docRef, {
        [field]: arrayUnion(value),
        updatedAt: Timestamp.now(),
      });
    })();
  }

  /**
   * Remove item from array field
   */
  async removeFromArray(id: string, field: string, value: unknown): Promise<void> {
    return withErrorHandling(async () => {
      const docRef = doc(db, this.collectionName, id);
      await updateDoc(docRef, {
        [field]: arrayRemove(value),
        updatedAt: Timestamp.now(),
      });
    })();
  }
}

/**
 * Pre-configured service instances for each collection
 */
export const userService = new FirebaseService(COLLECTIONS.USERS);
export const storyService = new FirebaseService(COLLECTIONS.STORIES);
export const chapterService = new FirebaseService(COLLECTIONS.CHAPTERS);
export const commentService = new FirebaseService(COLLECTIONS.COMMENTS);
export const likeService = new FirebaseService(COLLECTIONS.LIKES);
export const bookmarkService = new FirebaseService(COLLECTIONS.BOOKMARKS);
export const followService = new FirebaseService(COLLECTIONS.FOLLOWS);
export const notificationService = new FirebaseService(COLLECTIONS.NOTIFICATIONS);
export const forumPostService = new FirebaseService(COLLECTIONS.FORUM_POSTS);
export const forumReplyService = new FirebaseService(COLLECTIONS.FORUM_REPLIES);
export const diaryEntryService = new FirebaseService(COLLECTIONS.DIARY_ENTRIES);
export const scrapbookItemService = new FirebaseService(COLLECTIONS.SCRAPBOOK_ITEMS);
export const scrapbookCollectionService = new FirebaseService(COLLECTIONS.SCRAPBOOK_COLLECTIONS);
export const artworkService = new FirebaseService(COLLECTIONS.ARTWORKS);
export const chainLetterService = new FirebaseService(COLLECTIONS.CHAIN_LETTERS);
export const chainSessionService = new FirebaseService(COLLECTIONS.CHAIN_SESSIONS);
export const collaborativeProjectService = new FirebaseService(COLLECTIONS.COLLABORATIVE_PROJECTS);
export const proposalService = new FirebaseService(COLLECTIONS.PROPOSALS);
export const reflectionSessionService = new FirebaseService(COLLECTIONS.REFLECTION_SESSIONS);
export const adminLogService = new FirebaseService(COLLECTIONS.ADMIN_LOGS);
export const reportService = new FirebaseService(COLLECTIONS.REPORTS);
export const messageService = new FirebaseService(COLLECTIONS.MESSAGES);
