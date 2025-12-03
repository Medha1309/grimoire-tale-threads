/**
 * useStoryPublishing Hook
 * Handles story creation and validation logic
 */

import { useState, useCallback } from 'react';

interface UseStoryPublishingProps {
  createStory: (data: any) => Promise<any>;
  onSuccess?: () => void;
}

export const useStoryPublishing = ({ createStory, onSuccess }: UseStoryPublishingProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateAndPublish = useCallback(async (
    title: string,
    content: string,
    genre: string
  ) => {
    // Validation
    if (!title.trim()) {
      setError('Please enter a title for your story');
      return false;
    }

    if (!content.trim()) {
      setError('Your story needs some content');
      return false;
    }

    if (content.trim().length < 50) {
      setError('Your story should be at least 50 characters long');
      return false;
    }

    // Publishing
    setIsSaving(true);
    setError(null);

    try {
      const result = await createStory({
        title,
        content,
        genre,
        published: true,
      });

      if (result) {
        onSuccess?.();
        return true;
      } else {
        setError('Failed to publish story. Please check your connection and try again.');
        return false;
      }
    } catch (err: any) {
      setError(err.message || 'Failed to publish story. Please try again.');
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [createStory, onSuccess]);

  return { validateAndPublish, isSaving, error, setError };
};
