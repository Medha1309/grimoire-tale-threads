import { renderHook, act } from '@testing-library/react';
import { useDiaryState } from '../useDiaryState';

describe('useDiaryState', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useDiaryState());

    expect(result.current.view).toBe('home');
    expect(result.current.diaryLayout).toBe('book');
    expect(result.current.entries).toEqual([]);
    expect(result.current.selectedEntry).toBeNull();
    expect(result.current.entryTitle).toBe('');
    expect(result.current.entryText).toBe('');
    expect(result.current.selectedMood).toBe('calm');
    expect(result.current.isLocked).toBe(false);
    expect(result.current.isSaving).toBe(false);
  });

  it('should update entry text', () => {
    const { result } = renderHook(() => useDiaryState());

    act(() => {
      result.current.setEntryText('Test entry');
    });

    expect(result.current.entryText).toBe('Test entry');
  });

  it('should update selected mood', () => {
    const { result } = renderHook(() => useDiaryState());

    act(() => {
      result.current.setSelectedMood('joy');
    });

    expect(result.current.selectedMood).toBe('joy');
  });

  it('should save entry and create new entry', async () => {
    const { result } = renderHook(() => useDiaryState());

    act(() => {
      result.current.setEntryText('My diary entry');
      result.current.setSelectedMood('sorrow');
      result.current.setIsLocked(true);
    });

    await act(async () => {
      result.current.saveEntry();
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.entries).toHaveLength(1);
    expect(result.current.entries[0].content).toBe('My diary entry');
    expect(result.current.entries[0].mood).toBe('sorrow');
    expect(result.current.entries[0].isLocked).toBe(true);
    expect(result.current.isSaving).toBe(false);
    expect(result.current.showSuccessPreview).toBe(true);
  });

  it('should not save empty entry', async () => {
    const { result } = renderHook(() => useDiaryState());

    await act(async () => {
      result.current.saveEntry();
    });

    expect(result.current.entries).toHaveLength(0);
    expect(result.current.isSaving).toBe(false);
  });

  it('should clear form on cancel', () => {
    const { result } = renderHook(() => useDiaryState());

    act(() => {
      result.current.setEntryText('Test');
      result.current.setSelectedMood('joy');
      result.current.setIsLocked(true);
    });

    act(() => {
      result.current.cancelEntry();
    });

    expect(result.current.entryText).toBe('');
    expect(result.current.selectedMood).toBe('calm');
    expect(result.current.isLocked).toBe(false);
  });

  it('should navigate to room with transition', () => {
    const { result } = renderHook(() => useDiaryState());

    act(() => {
      result.current.navigateToRoom('diary');
    });

    expect(result.current.showRoomTransition).toBe(true);
    expect(result.current.pendingView).toBe('diary');
  });

  it('should complete room transition', () => {
    const { result } = renderHook(() => useDiaryState());

    act(() => {
      result.current.navigateToRoom('diary');
    });

    act(() => {
      result.current.handleRoomTransitionComplete();
    });

    expect(result.current.view).toBe('diary');
    expect(result.current.showRoomTransition).toBe(false);
    expect(result.current.pendingView).toBeNull();
  });

  it('should update diary layout', () => {
    const { result } = renderHook(() => useDiaryState());

    act(() => {
      result.current.setDiaryLayout('list');
    });

    expect(result.current.diaryLayout).toBe('list');

    act(() => {
      result.current.setDiaryLayout('grid');
    });

    expect(result.current.diaryLayout).toBe('grid');
  });

  it('should clear success state', () => {
    const { result } = renderHook(() => useDiaryState());

    act(() => {
      result.current.setEntryText('Test');
    });

    act(async () => {
      result.current.saveEntry();
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.showSuccessPreview).toBe(true);

    act(() => {
      result.current.clearSuccessState();
    });

    expect(result.current.showSuccessPreview).toBe(false);
    expect(result.current.savedEntry).toBeNull();
  });
});
