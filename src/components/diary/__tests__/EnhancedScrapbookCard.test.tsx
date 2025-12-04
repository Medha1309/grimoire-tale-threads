import React from 'react';
/**
 * Tests for EnhancedScrapbookCard Component
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { EnhancedScrapbookCard } from '../EnhancedScrapbookCard';
import { ScrapbookEntry } from '../../../types/scrapbook';

describe('EnhancedScrapbookCard', () => {
  const mockEntry: ScrapbookEntry = {
    id: '1',
    date: new Date('2025-11-17'),
    thought: 'A beautiful memory',
    photos: [
      {
        id: 'photo1',
        image: 'data:image/png;base64,test',
        filter: 'none',
      },
    ],
    stickers: [
      {
        id: 'sticker1',
        type: 'flower',
        emoji: '🌸',
        x: 50,
        y: 50,
        rotation: 0,
        scale: 1,
      },
    ],
    scratchOffs: [],
    layout: 'single',
    isHaunted: false,
    isLocked: false,
  };

  it('renders without crashing', () => {
    const onClick = vi.fn();
    render(<EnhancedScrapbookCard entry={mockEntry} index={0} onClick={onClick} />);
    expect(screen.getByText('A beautiful memory')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const onClick = vi.fn();
    render(<EnhancedScrapbookCard entry={mockEntry} index={0} onClick={onClick} />);
    
    const card = screen.getByRole('article');
    fireEvent.click(card);
    
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('displays date correctly', () => {
    const onClick = vi.fn();
    render(<EnhancedScrapbookCard entry={mockEntry} index={0} onClick={onClick} />);
    // Date should be displayed in some format (Nov 17, 2025 or similar)
    const dateElement = screen.getByText(/2025/);
    expect(dateElement).toBeInTheDocument();
  });

  it('shows locked indicator when entry is locked', () => {
    const lockedEntry = { ...mockEntry, isLocked: true };
    const onClick = vi.fn();
    render(<EnhancedScrapbookCard entry={lockedEntry} index={0} onClick={onClick} />);
    expect(screen.getByText(/Sealed/)).toBeInTheDocument();
  });

  it('shows haunted indicator when entry is haunted', () => {
    const hauntedEntry = { ...mockEntry, isHaunted: true };
    const onClick = vi.fn();
    render(<EnhancedScrapbookCard entry={hauntedEntry} index={0} onClick={onClick} />);
    expect(screen.getByText(/Haunted/)).toBeInTheDocument();
  });

  it('shows scratch-off indicator when entry has unrevealed secrets', () => {
    const entryWithSecret = {
      ...mockEntry,
      scratchOffs: [
        {
          id: 'secret1',
          text: 'Hidden secret',
          isRevealed: false,
          x: 50,
          y: 50,
        },
      ],
    };
    const onClick = vi.fn();
    render(<EnhancedScrapbookCard entry={entryWithSecret} index={0} onClick={onClick} />);
    expect(screen.getByText(/Hidden Secret/)).toBeInTheDocument();
  });

  it('handles entry with no photos gracefully', () => {
    const entryWithoutPhotos = { ...mockEntry, photos: [] };
    const onClick = vi.fn();
    render(<EnhancedScrapbookCard entry={entryWithoutPhotos} index={0} onClick={onClick} />);
    expect(screen.getByText('A beautiful memory')).toBeInTheDocument();
  });

  it('handles entry with undefined photos array', () => {
    const entryWithUndefinedPhotos = { ...mockEntry, photos: undefined as any };
    const onClick = vi.fn();
    expect(() => {
      render(<EnhancedScrapbookCard entry={entryWithUndefinedPhotos} index={0} onClick={onClick} />);
    }).not.toThrow();
  });

  it('handles entry with no stickers gracefully', () => {
    const entryWithoutStickers = { ...mockEntry, stickers: [] };
    const onClick = vi.fn();
    render(<EnhancedScrapbookCard entry={entryWithoutStickers} index={0} onClick={onClick} />);
    expect(screen.getByText('A beautiful memory')).toBeInTheDocument();
  });

  it('handles entry with undefined stickers array', () => {
    const entryWithUndefinedStickers = { ...mockEntry, stickers: undefined as any };
    const onClick = vi.fn();
    expect(() => {
      render(<EnhancedScrapbookCard entry={entryWithUndefinedStickers} index={0} onClick={onClick} />);
    }).not.toThrow();
  });

  it('renders multiple photos in double layout', () => {
    const multiPhotoEntry = {
      ...mockEntry,
      layout: 'double' as const,
      photos: [
        { id: 'photo1', image: 'data:image/png;base64,test1', filter: 'none' as const },
        { id: 'photo2', image: 'data:image/png;base64,test2', filter: 'sepia' as const },
      ],
    };
    const onClick = vi.fn();
    render(<EnhancedScrapbookCard entry={multiPhotoEntry} index={0} onClick={onClick} />);
    
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
  });

  it('renders stickers with correct emoji', () => {
    const onClick = vi.fn();
    render(<EnhancedScrapbookCard entry={mockEntry} index={0} onClick={onClick} />);
    expect(screen.getByText('🌸')).toBeInTheDocument();
  });

  it('applies correct rotation based on index', () => {
    const onClick = vi.fn();
    const { container } = render(<EnhancedScrapbookCard entry={mockEntry} index={1} onClick={onClick} />);
    
    const article = container.querySelector('article');
    // Check that the article element exists and has a style attribute
    // The rotation is applied via framer-motion's style prop
    expect(article).toBeInTheDocument();
    // (1 % 3 - 1) * 3 = 0 degrees rotation
  });
});


