import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useToast } from '../useToast';

describe('useToast Hook', () => {
  it('initializes with default state', () => {
    const { result } = renderHook(() => useToast());

    expect(result.current.toast).toEqual({
      message: '',
      type: 'success',
      isVisible: false,
    });
  });

  it('shows toast with showToast', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.showToast('Test message', 'error');
    });

    expect(result.current.toast).toEqual({
      message: 'Test message',
      type: 'error',
      isVisible: true,
    });
  });

  it('shows success toast with showSuccess', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.showSuccess('Success message');
    });

    expect(result.current.toast).toEqual({
      message: 'Success message',
      type: 'success',
      isVisible: true,
    });
  });

  it('shows error toast with showError', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.showError('Error message');
    });

    expect(result.current.toast).toEqual({
      message: 'Error message',
      type: 'error',
      isVisible: true,
    });
  });

  it('shows info toast with showInfo', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.showInfo('Info message');
    });

    expect(result.current.toast).toEqual({
      message: 'Info message',
      type: 'info',
      isVisible: true,
    });
  });

  it('shows warning toast with showWarning', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.showWarning('Warning message');
    });

    expect(result.current.toast).toEqual({
      message: 'Warning message',
      type: 'warning',
      isVisible: true,
    });
  });

  it('hides toast with hideToast', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.showSuccess('Test message');
    });

    expect(result.current.toast.isVisible).toBe(true);

    act(() => {
      result.current.hideToast();
    });

    expect(result.current.toast.isVisible).toBe(false);
    expect(result.current.toast.message).toBe('Test message'); // Message persists
  });

  it('defaults to success type when not specified', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.showToast('Default type message');
    });

    expect(result.current.toast.type).toBe('success');
  });

  it('maintains stable function references', () => {
    const { result, rerender } = renderHook(() => useToast());

    const initialShowToast = result.current.showToast;
    const initialHideToast = result.current.hideToast;
    const initialShowSuccess = result.current.showSuccess;

    rerender();

    expect(result.current.showToast).toBe(initialShowToast);
    expect(result.current.hideToast).toBe(initialHideToast);
    expect(result.current.showSuccess).toBe(initialShowSuccess);
  });
});
