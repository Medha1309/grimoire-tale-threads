import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookCard from '../../components/archive/BookCard';
import { Book } from '../../hooks/useArchiveStorage';

const mockBook: Book = {
  id: 'test-1',
  title: 'Test Book',
  author: 'Test Author',
  dateRead: '2024-01-15',
  tags: ['fiction', 'mystery'],
  rating: 4,
  note: 'This is a test note that is long enough to be truncated when displayed on the card to test the truncation functionality.',
  createdAt: '2024-01-15T00:00:00Z',
  updatedAt: '2024-01-15T00:00:00Z',
};

describe('BookCard', () => {
  it('should render book information', () => {
    render(<BookCard book={mockBook} onOpen={vi.fn()} />);

    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText('Test Author')).toBeInTheDocument();
    expect(screen.getByText('fiction')).toBeInTheDocument();
    expect(screen.getByText('mystery')).toBeInTheDocument();
  });

  it('should display rating stars', () => {
    render(<BookCard book={mockBook} onOpen={vi.fn()} />);

    const stars = screen.getByLabelText('Rating: 4 stars');
    expect(stars).toBeInTheDocument();
    expect(stars.textContent).toBe('★★★★');
  });

  it('should truncate long notes', () => {
    render(<BookCard book={mockBook} onOpen={vi.fn()} />);

    const noteText = screen.getByText(/This is a test note/);
    expect(noteText.textContent).toContain('…');
    expect(noteText.textContent!.length).toBeLessThan(mockBook.note!.length);
  });

  it('should call onOpen when View button clicked', () => {
    const onOpen = vi.fn();
    render(<BookCard book={mockBook} onOpen={onOpen} />);

    const viewButton = screen.getByRole('button', { name: /View details/i });
    fireEvent.click(viewButton);

    expect(onOpen).toHaveBeenCalledWith('test-1');
  });

  it('should call onOpen when Enter key pressed', () => {
    const onOpen = vi.fn();
    render(<BookCard book={mockBook} onOpen={onOpen} />);

    const card = screen.getByRole('article');
    fireEvent.keyDown(card, { key: 'Enter' });

    expect(onOpen).toHaveBeenCalledWith('test-1');
  });

  it('should handle selection checkbox', () => {
    const onSelect = vi.fn();
    render(
      <BookCard
        book={mockBook}
        onOpen={vi.fn()}
        selected={false}
        onSelect={onSelect}
      />
    );

    const checkbox = screen.getByRole('checkbox', { name: /Select Test Book/i });
    fireEvent.click(checkbox);

    expect(onSelect).toHaveBeenCalledWith('test-1', true);
  });

  it('should show selected state', () => {
    render(
      <BookCard
        book={mockBook}
        onOpen={vi.fn()}
        selected={true}
        onSelect={vi.fn()}
      />
    );

    const card = screen.getByRole('article');
    expect(card.className).toContain('ring-2');
  });

  it('should display formatted date', () => {
    render(<BookCard book={mockBook} onOpen={vi.fn()} />);

    // Date format depends on locale, just check it exists
    const dateText = screen.getByText(/1\/15\/2024|15\/1\/2024/);
    expect(dateText).toBeInTheDocument();
  });

  it('should limit displayed tags to 3', () => {
    const bookWithManyTags: Book = {
      ...mockBook,
      tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5'],
    };

    render(<BookCard book={bookWithManyTags} onOpen={vi.fn()} />);

    expect(screen.getByText('tag1')).toBeInTheDocument();
    expect(screen.getByText('tag2')).toBeInTheDocument();
    expect(screen.getByText('tag3')).toBeInTheDocument();
    expect(screen.queryByText('tag4')).not.toBeInTheDocument();
  });

  it('should handle book without optional fields', () => {
    const minimalBook: Book = {
      id: 'minimal-1',
      title: 'Minimal Book',
      createdAt: '2024-01-15T00:00:00Z',
      updatedAt: '2024-01-15T00:00:00Z',
    };

    render(<BookCard book={minimalBook} onOpen={vi.fn()} />);

    expect(screen.getByText('Minimal Book')).toBeInTheDocument();
    expect(screen.queryByLabelText(/Rating/)).not.toBeInTheDocument();
  });
});



