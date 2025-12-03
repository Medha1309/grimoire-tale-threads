/**
 * Firebase Optimizations
 * Batch operations, connection pooling, and query optimization
 */

import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  writeBatch,
  DocumentData,
  Query,
  QueryConstraint,
  // Firestore, // Unused
} from 'firebase/firestore';
import { db } from '../lib/firebase';

// ============================================================================
// QUERY BUILDER
// ============================================================================

export class QueryBuilder {
  private constraints: QueryConstraint[] = [];
  private collectionPath: string;

  constructor(collectionPath: string) {
    this.collectionPath = collectionPath;
  }

  where(field: string, operator: any, value: any): this {
    this.constraints.push(where(field, operator, value));
    return this;
  }

  orderBy(field: string, direction: 'asc' | 'desc' = 'asc'): this {
    this.constraints.push(orderBy(field, direction));
    return this;
  }

  limit(count: number): this {
    this.constraints.push(limit(count));
    return this;
  }

  build(): Query<DocumentData> {
    return query(collection(db, this.collectionPath), ...this.constraints);
  }

  async execute<T>(): Promise<T[]> {
    const q = this.build();
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
  }
}

// ============================================================================
// BATCH OPERATIONS
// ============================================================================

export class BatchWriter {
  private batch = writeBatch(db);
  private operationCount = 0;
  private readonly MAX_OPERATIONS = 500;

  add(operation: (batch: any) => void): void {
    if (this.operationCount >= this.MAX_OPERATIONS) {
      throw new Error('Batch operation limit reached. Commit current batch first.');
    }
    operation(this.batch);
    this.operationCount++;
  }

  async commit(): Promise<void> {
    if (this.operationCount === 0) return;
    await this.batch.commit();
    this.batch = writeBatch(db);
    this.operationCount = 0;
  }

  getOperationCount(): number {
    return this.operationCount;
  }
}

// ============================================================================
// QUERY CACHE WITH INVALIDATION
// ============================================================================

interface CachedQuery<T> {
  data: T[];
  timestamp: number;
  queryKey: string;
}

class FirestoreQueryCache {
  private cache = new Map<string, CachedQuery<any>>();
  private readonly TTL = 5 * 60 * 1000; // 5 minutes

  set<T>(queryKey: string, data: T[]): void {
    this.cache.set(queryKey, {
      data,
      timestamp: Date.now(),
      queryKey,
    });
  }

  get<T>(queryKey: string): T[] | null {
    const cached = this.cache.get(queryKey);
    if (!cached) return null;

    if (Date.now() - cached.timestamp > this.TTL) {
      this.cache.delete(queryKey);
      return null;
    }

    return cached.data;
  }

  invalidate(pattern?: string): void {
    if (!pattern) {
      this.cache.clear();
      return;
    }

    for (const [key] of this.cache) {
      if (key.includes(pattern)) {
        this.cache.delete(key);
      }
    }
  }

  clear(): void {
    this.cache.clear();
  }
}

export const firestoreCache = new FirestoreQueryCache();

// ============================================================================
// OPTIMIZED QUERY EXECUTOR
// ============================================================================

export async function executeOptimizedQuery<T>(
  queryKey: string,
  queryFn: () => Promise<T[]>,
  options: { useCache?: boolean; ttl?: number } = {}
): Promise<T[]> {
  const { useCache = true } = options;

  // Check cache
  if (useCache) {
    const cached = firestoreCache.get<T>(queryKey);
    if (cached) return cached;
  }

  // Execute query
  const data = await queryFn();

  // Cache result
  if (useCache) {
    firestoreCache.set(queryKey, data);
  }

  return data;
}

// ============================================================================
// CONNECTION POOL MANAGER
// ============================================================================

class ConnectionPoolManager {
  private activeConnections = 0;
  private readonly MAX_CONNECTIONS = 10;
  private queue: Array<() => void> = [];

  async acquire<T>(operation: () => Promise<T>): Promise<T> {
    if (this.activeConnections >= this.MAX_CONNECTIONS) {
      await new Promise<void>(resolve => this.queue.push(resolve));
    }

    this.activeConnections++;
    try {
      return await operation();
    } finally {
      this.activeConnections--;
      const next = this.queue.shift();
      if (next) next();
    }
  }

  getActiveConnections(): number {
    return this.activeConnections;
  }
}

export const connectionPool = new ConnectionPoolManager();
