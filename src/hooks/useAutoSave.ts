/**
 * useAutoSave Hook
 * Automatically saves content after a delay
 */

import { useState, useEffect, useCallback, useRef } from 'react';

interface UseAutoSaveOptions {
  delay?: number; // Delay in milliseconds before auto-saving
  onSave: (content: string) => Promise<void>;
  enabled?: boolean;
}

interface UseAutoSaveReturn {
  status: 'idle' | 'saving' | 'saved' | 'error';
  lastSaved: Date | null;
  triggerSave: () => void;
}

export const useAutoSave = (
  content: string,
  options: UseAutoSaveOptions
): UseAutoSaveReturn => {
  const { delay = 3000, onSave, enabled = true } = options;
  
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  
  const timeoutRef = useRef<NodeJS.Timeout>();
  const lastContentRef = useRef<string>(content);
  const isSavingRef = useRef(false);

  const performSave = useCallback(async () => {
    if (isSavingRef.current || !content.trim()) return;

    try {
      isSavingRef.current = true;
      setStatus('saving');
      
      await onSave(content);
      
      setStatus('saved');
      setLastSaved(new Date());
      lastContentRef.current = content;
      
      // Reset to idle after 2 seconds
      setTimeout(() => setStatus('idle'), 2000);
    } catch (error) {
      console.error('Auto-save failed:', error);
      setStatus('error');
      
      // Reset to idle after 3 seconds
      setTimeout(() => setStatus('idle'), 3000);
    } finally {
      isSavingRef.current = false;
    }
  }, [content, onSave]);

  // Auto-save when content changes
  useEffect(() => {
    if (!enabled || content === lastContentRef.current) return;

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      performSave();
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [content, delay, enabled, performSave]);

  const triggerSave = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    performSave();
  }, [performSave]);

  return {
    status,
    lastSaved,
    triggerSave,
  };
};
