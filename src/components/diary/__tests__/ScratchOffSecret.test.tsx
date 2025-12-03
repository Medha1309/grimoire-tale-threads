/**
 * Tests for ScratchOffSecret Component
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ScratchOffSecret } from '../ScratchOffSecret';

describe('ScratchOffSecret', () => {
  it('renders scratch layer when not revealed', () => {
    const onReveal = vi.fn();
    
    render(
      <ScratchOffSecret
        text="Hidden secret message"
        isRevealed={false}
        onReveal={onReveal}
      />
    );
    
    const canvas = document.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('renders revealed text when isRevealed is true', () => {
    const onReveal = vi.fn();
    
    render(
      <ScratchOffSecret
        text="Hidden secret message"
        isRevealed={true}
        onReveal={onReveal}
      />
    );
    
    expect(screen.getByText('Hidden secret message')).toBeInTheDocument();
    expect(screen.getByText('Revealed')).toBeInTheDocument();
  });

  it('does not show canvas when revealed', () => {
    const onReveal = vi.fn();
    
    const { container } = render(
      <ScratchOffSecret
        text="Hidden secret message"
        isRevealed={true}
        onReveal={onReveal}
      />
    );
    
    const canvas = container.querySelector('canvas');
    expect(canvas).not.toBeInTheDocument();
  });

  it('handles mouse events on canvas', () => {
    const onReveal = vi.fn();
    
    const { container } = render(
      <ScratchOffSecret
        text="Hidden secret message"
        isRevealed={false}
        onReveal={onReveal}
      />
    );
    
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
    
    // Simulate mouse down
    fireEvent.mouseDown(canvas!);
    expect(canvas).toBeInTheDocument();
  });

  it('displays correct text when revealed', () => {
    const onReveal = vi.fn();
    const secretText = 'This is my deepest secret';
    
    render(
      <ScratchOffSecret
        text={secretText}
        isRevealed={true}
        onReveal={onReveal}
      />
    );
    
    expect(screen.getByText(secretText)).toBeInTheDocument();
  });

  it('shows revealed badge when revealed', () => {
    const onReveal = vi.fn();
    
    render(
      <ScratchOffSecret
        text="Secret"
        isRevealed={true}
        onReveal={onReveal}
      />
    );
    
    const badge = screen.getByText('Revealed');
    expect(badge).toHaveClass('bg-[#ffb6d9]');
  });

  it('applies correct styling to revealed container', () => {
    const onReveal = vi.fn();
    
    const { container } = render(
      <ScratchOffSecret
        text="Secret"
        isRevealed={true}
        onReveal={onReveal}
      />
    );
    
    const revealedDiv = container.querySelector('.bg-black\\/30');
    expect(revealedDiv).toBeInTheDocument();
  });
});
