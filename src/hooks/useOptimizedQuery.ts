/**
 * Optimized Query Hook
 * Provides caching, deduplication, and automatic refetching
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { queryCache } from '../utils/cache';

interface QueryOptions<T> {
  cacheKey: string;
  enabled?: boolean;
  staleTime?: number;
  refetchOnMount?: boolean;
  refetchOnWindowFocus?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

interface QueryResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  isStale: boolean;
}

// Track in-flight requests to prevent duplicates
const inflightRequests = new Map<string, Promise<any>>();

export function useOptimizedQuery<T>(
  queryFn: () => Promise<T>,
  options: QueryOptions<T>
): QueryResult<T> {
  const {
    cacheKey,
    enabled = true,
    staleTime = 5 * 60 * 1000,
    refetchOnMount = true,
    refetchOnWindowFocus = false,
    onSuccess,
    onError,
  } = options;

  const [data, setData] = useState<T | null>(() => queryCache.get(cacheKey));
  const [loading, setLoading] = useState(!data);
  const [error, setError] = useState<Error | null>(null);
  const [isStale, setIsStale] = useState(false);
  
  const mountedRef = useRef(true);
  const lastFetchRef = useRef(0);

  const fetchData = useCallback(async (force = false) => {
    if (!enabled) return;

    const now = Date.now();
    const timeSinceLastFetch = now - lastFetchRef.current;

    // Skip if recently fetched and not forced
    if (!force && timeSinceLastFetch < 1000) return;

    // Check cache first
    if (!force) {
      const cached = queryCache.get(cacheKey) as T | null;
      if (cached) {
        setData(cached);
        setLoading(false);
        setIsStale(timeSinceLastFetch > staleTime);
        return;
      }
    }

    // Check for in-flight request
    if (inflightRequests.has(cacheKey)) {
      try {
        const result = await inflightRequests.get(cacheKey);
        if (mountedRef.current) {
          setData(result);
          setLoading(false);
          setError(null);
        }
        return;
      } catch (err) {
        if (mountedRef.current) {
          setError(err as Error);
          setLoading(false);
        }
        return;
      }
    }

    setLoading(true);
    setError(null);
    lastFetchRef.current = now;

    // Create and track the request
    const request = queryFn();
    inflightRequests.set(cacheKey, request);

    try {
      const result = await request;
      
      if (mountedRef.current) {
        setData(result);
        setLoading(false);
        setIsStale(false);
        queryCache.set(cacheKey, result);
        onSuccess?.(result);
      }
    } catch (err) {
      if (mountedRef.current) {
        const error = err as Error;
        setError(error);
        setLoading(false);
        onError?.(error);
      }
    } finally {
      inflightRequests.delete(cacheKey);
    }
  }, [cacheKey, enabled, queryFn, staleTime, onSuccess, onError]);

  const refetch = useCallback(() => fetchData(true), [fetchData]);

  // Initial fetch
  useEffect(() => {
    if (refetchOnMount || !data) {
      fetchData();
    }
  }, [cacheKey, enabled]);

  // Refetch on window focus
  useEffect(() => {
    if (!refetchOnWindowFocus) return;

    const handleFocus = () => {
      if (isStale) fetchData();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [refetchOnWindowFocus, isStale, fetchData]);

  // Cleanup
  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return { data, loading, error, refetch, isStale };
}
