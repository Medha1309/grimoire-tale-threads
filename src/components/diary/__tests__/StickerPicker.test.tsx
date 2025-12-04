import React from 'react';
/**
 * Tests for StickerPicker Component
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { StickerPicker } from '../StickerPicker';
import { STICKER_LIBRARY } from '../../../types/scrapbook';

describe('StickerPicker', () => {
  it('does not render when closed', () => {
    const onClose = vi.fn();
    const onAddSticker = vi.fn();
    
    const { container } = render(
      <StickerPicker isOpen={false} onClose={onClose} onAddSticker={onAddSticker} />
    );
    
    expect(container.firstChild).toBeNull();
  });

  it('renders when open', () => {
    const onClose = vi.fn();
    const onAddSticker = vi.fn();
    
    render(<StickerPicker isOpen={true} onClose={onClose} onAddSticker={onAddSticker} />);
    
    expect(screen.getByText('Add Stickers')).toBeInTheDocument();
  });

  it('displays all stickers from library', () => {
    const onClose = vi.fn();
    const onAddSticker = vi.fn();
    
    render(<StickerPicker isOpen={true} onClose={onClose} onAddSticker={onAddSticker} />);
    
    STICKER_LIBRARY.forEach(sticker => {
      expect(screen.getByText(sticker.emoji)).toBeInTheDocument();
    });
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    const onAddSticker = vi.fn();
    
    render(<StickerPicker isOpen={true} onClose={onClose} onAddSticker={onAddSticker} />);
    
    const closeButton = screen.getByText('×');
    fireEvent.click(closeButton);
    
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onAddSticker when a sticker is clicked', () => {
    const onClose = vi.fn();
    const onAddSticker = vi.fn();
    
    render(<StickerPicker isOpen={true} onClose={onClose} onAddSticker={onAddSticker} />);
    
    const firstSticker = screen.getByText(STICKER_LIBRARY[0].emoji);
    fireEvent.click(firstSticker);
    
    expect(onAddSticker).toHaveBeenCalledTimes(1);
    expect(onAddSticker).toHaveBeenCalledWith(
      expect.objectContaining({
        type: STICKER_LIBRARY[0].type,
        emoji: STICKER_LIBRARY[0].emoji,
      })
    );
  });

  it('adds sticker with random position and rotation', () => {
    const onClose = vi.fn();
    const onAddSticker = vi.fn();
    
    render(<StickerPicker isOpen={true} onClose={onClose} onAddSticker={onAddSticker} />);
    
    const firstSticker = screen.getByText(STICKER_LIBRARY[0].emoji);
    fireEvent.click(firstSticker);
    
    const call = onAddSticker.mock.calls[0][0];
    expect(call.x).toBeGreaterThan(0);
    expect(call.y).toBeGreaterThan(0);
    expect(call.rotation).toBeDefined();
    expect(call.scale).toBeGreaterThan(0);
  });

  it('closes modal when backdrop is clicked', () => {
    const onClose = vi.fn();
    const onAddSticker = vi.fn();
    
    const { container } = render(
      <StickerPicker isOpen={true} onClose={onClose} onAddSticker={onAddSticker} />
    );
    
    const backdrop = container.firstChild;
    fireEvent.click(backdrop as Element);
    
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not close when clicking inside modal', () => {
    const onClose = vi.fn();
    const onAddSticker = vi.fn();
    
    render(<StickerPicker isOpen={true} onClose={onClose} onAddSticker={onAddSticker} />);
    
    const title = screen.getByText('Add Stickers');
    fireEvent.click(title);
    
    expect(onClose).not.toHaveBeenCalled();
  });
});


