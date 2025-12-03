import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useRoomLighting } from '../useRoomLighting';

describe('useRoomLighting', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useRoomLighting());

    expect(result.current.litRoom).toBe(-1);
    expect(result.current.hoveredRoom).toBe(-1);
    expect(result.current.possessedRoom).toBe(-1);
  });

  it('should update hovered room', () => {
    const { result } = renderHook(() => useRoomLighting());

    act(() => {
      result.current.handleRoomHover(2);
    });

    expect(result.current.hoveredRoom).toBe(2);
  });

  it('should clear hovered room on leave', () => {
    const { result } = renderHook(() => useRoomLighting());

    act(() => {
      result.current.handleRoomHover(2);
    });

    act(() => {
      result.current.handleRoomLeave();
    });

    expect(result.current.hoveredRoom).toBe(-1);
  });

  it('should light up room after hover delay', () => {
    const { result } = renderHook(() => useRoomLighting());

    act(() => {
      result.current.handleRoomHover(1);
    });

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(result.current.litRoom).toBe(1);
  });

  it('should cycle through rooms automatically', () => {
    const { result } = renderHook(() => useRoomLighting());

    // Initial delay
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(result.current.litRoom).toBe(0);

    // Room stays lit for 3 seconds
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(result.current.litRoom).toBe(-1);

    // Next cycle
    act(() => {
      jest.advanceTimersByTime(1300);
    });

    expect(result.current.litRoom).toBe(1);
  });

  it('should randomly possess rooms', () => {
    const { result } = renderHook(() => useRoomLighting());

    // Initial delay
    act(() => {
      jest.advanceTimersByTime(8000);
    });

    // Should have possessed a room
    expect(result.current.possessedRoom).toBeGreaterThanOrEqual(0);
    expect(result.current.possessedRoom).toBeLessThan(5);

    // Possession should clear after 600ms
    act(() => {
      jest.advanceTimersByTime(600);
    });

    expect(result.current.possessedRoom).toBe(-1);
  });

  it('should not possess room when hovering', () => {
    const { result } = renderHook(() => useRoomLighting());

    act(() => {
      result.current.handleRoomHover(1);
    });

    act(() => {
      jest.advanceTimersByTime(8000);
    });

    // Should not possess when hovering
    expect(result.current.possessedRoom).toBe(-1);
  });
});
