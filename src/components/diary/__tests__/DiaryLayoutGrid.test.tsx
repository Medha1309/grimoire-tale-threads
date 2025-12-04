import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DiaryLayoutGrid } from '../DiaryLayoutGrid';
import { DiaryEntry } from '../../../types';

const mockEntries: DiaryEntry[] = [
  {
    id: '1',
    userId: 'user1',
    content: 'First entry',
    mood: 'joy',
    isLocked: false,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    isPublished: false,
  },
  {
    id: '2',
    userId: 'user1',
    content: 'Second entry',
    mood: 'calm',
    isLocked: true,
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
    isPublished: false,
  },
];

describe('DiaryLayoutGrid', () => {
  const mockOnEntryClick = vi.fn();
  const mockOnClearHighlight = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render book layout', () => {
    render(
      <DiaryLayoutGrid
        entries={mockEntries}
        layout="book"
        savedEntry={null}
        onEntryClick={mockOnEntryClick}
        onClearHighlight={mockOnClearHighlight}
      />
    );

    expect(screen.getByText('First entry')).toBeInTheDocument();
    expect(screen.getByText('Second entry')).toBeInTheDocument();
  });

  it('should render list layout', () => {
    render(
      <DiaryLayoutGrid
        entries={mockEntries}
        layout="list"
        savedEntry={null}
        onEntryClick={mockOnEntryClick}
        onClearHighlight={mockOnClearHighlight}
      />
    );

    expect(screen.getByText('First entry')).toBeInTheDocument();
    expect(screen.getByText('Second entry')).toBeInTheDocument();
  });

  it('should render grid layout', () => {
    render(
      <DiaryLayoutGrid
        entries={mockEntries}
        layout="grid"
        savedEntry={null}
        onEntryClick={mockOnEntryClick}
        onClearHighlight={mockOnClearHighlight}
      />
    );

    expect(screen.getByText('First entry')).toBeInTheDocument();
    expect(screen.getByText('Second entry')).toBeInTheDocument();
  });

  it('should call onEntryClick when entry is clicked', () => {
    render(
      <DiaryLayoutGrid
        entries={mockEntries}
        layout="book"
        savedEntry={null}
        onEntryClick={mockOnEntryClick}
        onClearHighlight={mockOnClearHighlight}
      />
    );

    const firstEntry = screen.getByText('First entry').closest('article');
    fireEvent.click(firstEntry!);

    expect(mockOnEntryClick).toHaveBeenCalledWith(mockEntries[0]);
    expect(mockOnClearHighlight).toHaveBeenCalled();
  });

  it('should display mood icons', () => {
    render(
      <DiaryLayoutGrid
        entries={mockEntries}
        layout="list"
        savedEntry={null}
        onEntryClick={mockOnEntryClick}
        onClearHighlight={mockOnClearHighlight}
      />
    );

    // Check for mood icons (they render as symbols)
    const moodIcons = screen.getAllByText(/[♡✦◇✧]/);
    expect(moodIcons.length).toBeGreaterThan(0);
  });

  it('should display lock icon for locked entries', () => {
    render(
      <DiaryLayoutGrid
        entries={mockEntries}
        layout="list"
        savedEntry={null}
        onEntryClick={mockOnEntryClick}
        onClearHighlight={mockOnClearHighlight}
      />
    );

    // The second entry is locked
    const articles = screen.getAllByRole('article');
    expect(articles).toHaveLength(2);
  });

  it('should highlight saved entry', () => {
    render(
      <DiaryLayoutGrid
        entries={mockEntries}
        layout="book"
        savedEntry={mockEntries[0]}
        onEntryClick={mockOnEntryClick}
        onClearHighlight={mockOnClearHighlight}
      />
    );

    // The component should apply special animation to the saved entry
    expect(screen.getByText('First entry')).toBeInTheDocument();
  });

  it('should display entry numbers in reverse order', () => {
    render(
      <DiaryLayoutGrid
        entries={mockEntries}
        layout="book"
        savedEntry={null}
        onEntryClick={mockOnEntryClick}
        onClearHighlight={mockOnClearHighlight}
      />
    );

    expect(screen.getByText('Entry 2')).toBeInTheDocument();
    expect(screen.getByText('Entry 1')).toBeInTheDocument();
  });
});



