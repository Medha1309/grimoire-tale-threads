import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Toast } from '../Toast';

describe('Toast Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders when visible', () => {
    render(
      <Toast
        message="Test message"
        type="success"
        isVisible={true}
      />
    );

    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('does not render when not visible', () => {
    render(
      <Toast
        message="Test message"
        type="success"
        isVisible={false}
      />
    );

    expect(screen.queryByText('Test message')).not.toBeInTheDocument();
  });

  it('applies correct styling for success type', () => {
    render(
      <Toast
        message="Success message"
        type="success"
        isVisible={true}
      />
    );

    const toast = screen.getByText('Success message').closest('div')?.parentElement;
    expect(toast).toHaveClass('bg-green-950/90');
    expect(toast).toHaveClass('border-green-900/50');
    expect(toast).toHaveClass('text-green-300');
  });

  it('applies correct styling for error type', () => {
    render(
      <Toast
        message="Error message"
        type="error"
        isVisible={true}
      />
    );

    const toast = screen.getByText('Error message').closest('div')?.parentElement;
    expect(toast).toHaveClass('bg-red-950/90');
    expect(toast).toHaveClass('border-red-900/50');
    expect(toast).toHaveClass('text-red-300');
  });

  it('applies correct styling for info type', () => {
    render(
      <Toast
        message="Info message"
        type="info"
        isVisible={true}
      />
    );

    const toast = screen.getByText('Info message').closest('div')?.parentElement;
    expect(toast).toHaveClass('bg-blue-950/90');
  });

  it('applies correct styling for warning type', () => {
    render(
      <Toast
        message="Warning message"
        type="warning"
        isVisible={true}
      />
    );

    const toast = screen.getByText('Warning message').closest('div')?.parentElement;
    expect(toast).toHaveClass('bg-amber-950/90');
  });

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup({ delay: null });
    const onClose = vi.fn();

    render(
      <Toast
        message="Test message"
        type="success"
        isVisible={true}
        onClose={onClose}
      />
    );

    const closeButton = screen.getByLabelText('Close notification');
    await user.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('auto-dismisses after duration', async () => {
    const onClose = vi.fn();

    render(
      <Toast
        message="Test message"
        type="success"
        isVisible={true}
        onClose={onClose}
        duration={3000}
      />
    );

    expect(onClose).not.toHaveBeenCalled();

    vi.advanceTimersByTime(3000);

    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  it('does not auto-dismiss when duration is 0', async () => {
    const onClose = vi.fn();

    render(
      <Toast
        message="Test message"
        type="success"
        isVisible={true}
        onClose={onClose}
        duration={0}
      />
    );

    vi.advanceTimersByTime(10000);

    expect(onClose).not.toHaveBeenCalled();
  });

  it('clears timer on unmount', () => {
    const onClose = vi.fn();

    const { unmount } = render(
      <Toast
        message="Test message"
        type="success"
        isVisible={true}
        onClose={onClose}
        duration={3000}
      />
    );

    unmount();
    vi.advanceTimersByTime(3000);

    expect(onClose).not.toHaveBeenCalled();
  });

  it('renders without close button when onClose is not provided', () => {
    render(
      <Toast
        message="Test message"
        type="success"
        isVisible={true}
      />
    );

    expect(screen.queryByLabelText('Close notification')).not.toBeInTheDocument();
  });
});


