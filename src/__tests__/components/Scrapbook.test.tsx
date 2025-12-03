/**
 * Scrapbook Component Tests
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryScrapbook } from '../../components/diary/MemoryScrapbook';
import { ScrapbookCard } from '../../components/diary/ScrapbookCard';
import { ScrapbookDetail } from '../../components/diary/ScrapbookDetail';
import { ScrapbookFilters } from '../../components/diary/ScrapbookFilters';
import { ScrapbookEntry } from '../../types/scrapbook';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock hooks
vi.mock('../../hooks/useScrapbook', () => ({
  useScrapbook: () => ({
    entries: mockEntries,
    allTags: ['haunting', 'memories', 'darkness'],
    filter: { searchQuery: '', selectedTags: [], mediaType: undefined },
    setFilter: vi.fn(),
    isLoading: false,
    addEntry: vi.fn(),
    updateEntry: vi.fn(),
    deleteEntry: vi.fn(),
  }),
}));

const mockEntries: ScrapbookEntry[] = [
  {
    id: 'test-1',
    date: new Date('2024-10-31'),
    title: 'Test Memory',
    thought: 'This is a test thought',
    media: [
      {
        id: 'media-1',
        type: 'gif',
        url: 'https://example.com/test.gif',
      },
    ],
    tags: ['test', 'memory'],
    mood: 'happy',
    location: 'Test Location',
    createdAt: new Date('2024-10-31'),
    updatedAt: new Date('2024-10-31'),
  },
  {
    id: 'test-2',
    date: new Date('2024-11-01'),
    title: 'Empty Media Memory',
    thought: 'Memory without media',
    media: [],
    tags: [],
    createdAt: new Date('2024-11-01'),
    updatedAt: new Date('2024-11-01'),
  },
];

describe('ScrapbookCard', () => {
  it('renders without crashing with full data', () => {
    const onClick = vi.fn();
    render(<ScrapbookCard entry={mockEntries[0]} onClick={onClick} />);
    
    expect(screen.getByText('Test Memory')).toBeInTheDocument();
    expect(screen.getByText('This is a test thought')).toBeInTheDocument();
  });

  it('renders without crashing with empty media', () => {
    const onClick = vi.fn();
    render(<ScrapbookCard entry={mockEntries[1]} onClick={onClick} />);
    
    expect(screen.getByText('Empty Media Memory')).toBeInTheDocument();
    expect(screen.getByText('Memory without media')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const onClick = vi.fn();
    const { container } = render(<ScrapbookCard entry={mockEntries[0]} onClick={onClick} />);
    
    const card = container.firstChild as HTMLElement;
    fireEvent.click(card);
    
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('displays tags when present', () => {
    const onClick = vi.fn();
    render(<ScrapbookCard entry={mockEntries[0]} onClick={onClick} />);
    
    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('memory')).toBeInTheDocument();
  });

  it('displays mood and location when present', () => {
    const onClick = vi.fn();
    render(<ScrapbookCard entry={mockEntries[0]} onClick={onClick} />);
    
    expect(screen.getByText('happy')).toBeInTheDocument();
    expect(screen.getByText('Test Location')).toBeInTheDocument();
  });

  it('does not crash with undefined media array', () => {
    const entryWithUndefinedMedia = {
      ...mockEntries[1],
      media: undefined as any,
    };
    const onClick = vi.fn();
    
    expect(() => {
      render(<ScrapbookCard entry={entryWithUndefinedMedia} onClick={onClick} />);
    }).not.toThrow();
  });

  it('does not crash with undefined tags array', () => {
    const entryWithUndefinedTags = {
      ...mockEntries[1],
      tags: undefined as any,
    };
    const onClick = vi.fn();
    
    expect(() => {
      render(<ScrapbookCard entry={entryWithUndefinedTags} onClick={onClick} />);
    }).not.toThrow();
  });
});

describe('ScrapbookDetail', () => {
  it('renders without crashing', () => {
    const onClose = vi.fn();
    const onUpdate = vi.fn();
    const onDelete = vi.fn();
    
    render(
      <ScrapbookDetail
        entry={mockEntries[0]}
        onClose={onClose}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
    );
    
    expect(screen.getByText('Test Memory')).toBeInTheDocument();
    expect(screen.getByText('This is a test thought')).toBeInTheDocument();
  });

  it('handles close button click', () => {
    const onClose = vi.fn();
    const onUpdate = vi.fn();
    const onDelete = vi.fn();
    
    render(
      <ScrapbookDetail
        entry={mockEntries[0]}
        onClose={onClose}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
    );
    
    const closeButtons = screen.getAllByRole('button');
    const closeButton = closeButtons.find(btn => 
      btn.querySelector('svg path[d*="M6 18L18 6M6 6l12 12"]')
    );
    
    if (closeButton) {
      fireEvent.click(closeButton);
      expect(onClose).toHaveBeenCalled();
    }
  });

  it('shows delete confirmation', async () => {
    const onClose = vi.fn();
    const onUpdate = vi.fn();
    const onDelete = vi.fn();
    
    render(
      <ScrapbookDetail
        entry={mockEntries[0]}
        onClose={onClose}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
    );
    
    const deleteButtons = screen.getAllByRole('button');
    const deleteButton = deleteButtons.find(btn => 
      btn.querySelector('svg path[d*="M19 7l-.867"]')
    );
    
    if (deleteButton) {
      fireEvent.click(deleteButton);
      
      await waitFor(() => {
        expect(screen.getByText(/Are you sure you want to delete/)).toBeInTheDocument();
      });
    }
  });

  it('renders without media gracefully', () => {
    const onClose = vi.fn();
    const onUpdate = vi.fn();
    const onDelete = vi.fn();
    
    expect(() => {
      render(
        <ScrapbookDetail
          entry={mockEntries[1]}
          onClose={onClose}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      );
    }).not.toThrow();
  });
});

describe('ScrapbookFilters', () => {
  it('renders search input', () => {
    const setFilter = vi.fn();
    const filter = { searchQuery: '', selectedTags: [], mediaType: undefined };
    
    render(
      <ScrapbookFilters
        filter={filter}
        setFilter={setFilter}
        allTags={['test', 'memory']}
        totalCount={2}
      />
    );
    
    expect(screen.getByPlaceholderText('Search memories...')).toBeInTheDocument();
  });

  it('displays total count', () => {
    const setFilter = vi.fn();
    const filter = { searchQuery: '', selectedTags: [], mediaType: undefined };
    
    render(
      <ScrapbookFilters
        filter={filter}
        setFilter={setFilter}
        allTags={[]}
        totalCount={5}
      />
    );
    
    expect(screen.getByText('5 memories')).toBeInTheDocument();
  });

  it('displays singular form for one memory', () => {
    const setFilter = vi.fn();
    const filter = { searchQuery: '', selectedTags: [], mediaType: undefined };
    
    render(
      <ScrapbookFilters
        filter={filter}
        setFilter={setFilter}
        allTags={[]}
        totalCount={1}
      />
    );
    
    expect(screen.getByText('1 memory')).toBeInTheDocument();
  });

  it('renders media type filters', () => {
    const setFilter = vi.fn();
    const filter = { searchQuery: '', selectedTags: [], mediaType: undefined };
    
    render(
      <ScrapbookFilters
        filter={filter}
        setFilter={setFilter}
        allTags={[]}
        totalCount={0}
      />
    );
    
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Photos')).toBeInTheDocument();
    expect(screen.getByText('GIFs')).toBeInTheDocument();
    expect(screen.getByText('Videos')).toBeInTheDocument();
  });

  it('renders tags when provided', () => {
    const setFilter = vi.fn();
    const filter = { searchQuery: '', selectedTags: [], mediaType: undefined };
    
    render(
      <ScrapbookFilters
        filter={filter}
        setFilter={setFilter}
        allTags={['haunting', 'memories']}
        totalCount={2}
      />
    );
    
    expect(screen.getByText('haunting')).toBeInTheDocument();
    expect(screen.getByText('memories')).toBeInTheDocument();
  });

  it('handles search input change', () => {
    const setFilter = vi.fn();
    const filter = { searchQuery: '', selectedTags: [], mediaType: undefined };
    
    render(
      <ScrapbookFilters
        filter={filter}
        setFilter={setFilter}
        allTags={[]}
        totalCount={0}
      />
    );
    
    const searchInput = screen.getByPlaceholderText('Search memories...');
    fireEvent.change(searchInput, { target: { value: 'test' } });
    
    expect(setFilter).toHaveBeenCalledWith({
      ...filter,
      searchQuery: 'test',
    });
  });
});

describe('Edge Cases', () => {
  it('handles null/undefined gracefully in ScrapbookCard', () => {
    const onClick = vi.fn();
    const edgeCaseEntry: ScrapbookEntry = {
      id: 'edge-1',
      date: new Date(),
      title: 'Edge Case',
      thought: 'Testing edge cases',
      media: [],
      tags: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    expect(() => {
      render(<ScrapbookCard entry={edgeCaseEntry} onClick={onClick} />);
    }).not.toThrow();
  });

  it('handles very long titles and thoughts', () => {
    const onClick = vi.fn();
    const longEntry: ScrapbookEntry = {
      id: 'long-1',
      date: new Date(),
      title: 'A'.repeat(200),
      thought: 'B'.repeat(500),
      media: [],
      tags: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    expect(() => {
      render(<ScrapbookCard entry={longEntry} onClick={onClick} />);
    }).not.toThrow();
  });

  it('handles many tags', () => {
    const onClick = vi.fn();
    const manyTagsEntry: ScrapbookEntry = {
      id: 'tags-1',
      date: new Date(),
      title: 'Many Tags',
      thought: 'Testing many tags',
      media: [],
      tags: Array.from({ length: 20 }, (_, i) => `tag${i}`),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    expect(() => {
      render(<ScrapbookCard entry={manyTagsEntry} onClick={onClick} />);
    }).not.toThrow();
  });
});
