/**
 * Examples of standardized error handling patterns
 * Use these patterns throughout the app for consistency
 */

import { handleError, withErrorHandling, logError } from './errorHandler';
import { notify } from './notifications';
import { MESSAGES } from './messages';

// ============================================================================
// EXAMPLE 1: Basic try-catch with error handling
// ============================================================================

export const exampleBasicErrorHandling = async () => {
  try {
    // Your operation here
    const result = await someAsyncOperation();
    notify.success(MESSAGES.STORIES.SAVE_SUCCESS);
    return result;
  } catch (error) {
    const errorMessage = handleError(error, 'exampleBasicErrorHandling');
    notify.error(errorMessage);
    throw error; // Re-throw if needed
  }
};

// ============================================================================
// EXAMPLE 2: Using withErrorHandling wrapper
// ============================================================================

export const exampleWithErrorHandling = async () => {
  const { data, error } = await withErrorHandling(
    async () => {
      return await someAsyncOperation();
    },
    'exampleWithErrorHandling',
    {
      fallbackMessage: MESSAGES.STORIES.SAVE_ERROR,
      onError: (_err) => {
        // Additional error handling if needed
        notify.error(MESSAGES.STORIES.SAVE_ERROR);
      },
    }
  );

  if (error) {
    return null;
  }

  notify.success(MESSAGES.STORIES.SAVE_SUCCESS);
  return data;
};

// ============================================================================
// EXAMPLE 3: Form submission with validation
// ============================================================================

export const exampleFormSubmission = async (formData: any) => {
  // Validation
  if (!formData.title) {
    notify.error(MESSAGES.GENERAL.REQUIRED_FIELD);
    return;
  }

  try {
    const result = await submitForm(formData);
    notify.success(MESSAGES.CONTACT.SEND_SUCCESS);
    return result;
  } catch (error) {
    const errorMessage = handleError(error, 'exampleFormSubmission', MESSAGES.CONTACT.SEND_ERROR);
    notify.error(errorMessage);
  }
};

// ============================================================================
// EXAMPLE 4: Delete operation with confirmation
// ============================================================================

export const exampleDeleteOperation = async (itemId: string, itemType: string = 'item') => {
  // Note: Confirmation should be handled in the UI before calling this
  try {
    await deleteItem(itemId);
    notify.deleted(itemType);
  } catch (error) {
    const errorMessage = handleError(error, 'exampleDeleteOperation');
    notify.error(errorMessage);
    throw error;
  }
};

// ============================================================================
// EXAMPLE 5: Loading data with error state
// ============================================================================

export const exampleLoadData = async (
  setData: (data: any) => void,
  setLoading: (loading: boolean) => void,
  setError: (error: string | null) => void
) => {
  setLoading(true);
  setError(null);

  try {
    const data = await fetchData();
    setData(data);
  } catch (error) {
    const errorMessage = handleError(error, 'exampleLoadData', MESSAGES.GENERAL.ERROR);
    setError(errorMessage);
    notify.error(errorMessage);
  } finally {
    setLoading(false);
  }
};

// ============================================================================
// EXAMPLE 6: Silent error logging (no user notification)
// ============================================================================

export const exampleSilentLogging = async () => {
  try {
    await someNonCriticalOperation();
  } catch (error) {
    // Log error but don't show to user
    logError('exampleSilentLogging', error, {
      severity: 'low',
      userImpact: 'none',
    });
  }
};

// ============================================================================
// EXAMPLE 7: Multiple operations with individual error handling
// ============================================================================

export const exampleMultipleOperations = async () => {
  const results = {
    operation1: false,
    operation2: false,
    operation3: false,
  };

  // Operation 1
  try {
    await operation1();
    results.operation1 = true;
  } catch (error) {
    logError('operation1', error);
    notify.error('Failed to complete operation 1');
  }

  // Operation 2
  try {
    await operation2();
    results.operation2 = true;
  } catch (error) {
    logError('operation2', error);
    notify.error('Failed to complete operation 2');
  }

  // Operation 3
  try {
    await operation3();
    results.operation3 = true;
  } catch (error) {
    logError('operation3', error);
    notify.error('Failed to complete operation 3');
  }

  // Show summary
  const successCount = Object.values(results).filter(Boolean).length;
  if (successCount === 3) {
    notify.success('All operations completed successfully');
  } else if (successCount > 0) {
    notify.warning(`${successCount} of 3 operations completed`);
  } else {
    notify.error('All operations failed');
  }

  return results;
};

// ============================================================================
// EXAMPLE 8: Optimistic updates with rollback
// ============================================================================

export const exampleOptimisticUpdate = async (
  itemId: string,
  newData: any,
  updateLocalState: (data: any) => void,
  rollbackState: (previousData: any) => void,
  previousData: any
) => {
  // Optimistically update UI
  updateLocalState(newData);

  try {
    await updateItem(itemId, newData);
    notify.success(MESSAGES.GENERAL.SUCCESS);
  } catch (error) {
    // Rollback on error
    rollbackState(previousData);
    const errorMessage = handleError(error, 'exampleOptimisticUpdate');
    notify.error(errorMessage);
  }
};

// ============================================================================
// Mock functions for examples
// ============================================================================

const someAsyncOperation = async () => ({ success: true });
const submitForm = async (_data: any) => ({ success: true });
const deleteItem = async (_id: string) => ({ success: true });
const fetchData = async () => ({ data: [] });
const someNonCriticalOperation = async () => ({ success: true });
const operation1 = async () => ({ success: true });
const operation2 = async () => ({ success: true });
const operation3 = async () => ({ success: true });
const updateItem = async (_id: string, _data: any) => ({ success: true });
