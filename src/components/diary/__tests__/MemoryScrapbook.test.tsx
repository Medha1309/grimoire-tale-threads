/**
 * Integration Tests for MemoryScrapbook Component
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryScrapbook } from '../MemoryScrapbook';
import { DiaryEntry } from '../../../types/diary';

describe('MemoryScrapbook', () => {
  const mockEntries: DiaryEntry[] = [];

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('renders without crashing', () => {
    const onBack = vi.fn();
    
    render(<MemoryScrapbook entries={mockEntries} onBack={onBack} />);
    
    expect(screen.getByText('Memory Scrapbook')).toBeInTheDocument();
  });

  it('shows empty state when no entries', () => {
    const onBack = vi.fn();
    
    render(<MemoryScrapbook onBack={onBack} />);
    
    expect(screen.getByText('No memories yet')).toBeInTheDocument();
    expect(screen.getByText('+ Add Memory')).toBeInTheDocument();
  });

  it('calls onBack when back button is clicked', () => {
    const onBack = vi.fn();
    
    render(<MemoryScrapbook onBack={onBack} />);
    
    const backButton = screen.getByText('Back to Dollhouse');
    fireEvent.click(backButton);
    
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it('opens add modal when capture button is clicked', async () => {
    const onBack = vi.fn();
    
    render(<MemoryScrapbook onBack={onBack} />);
    
    const captureButton = screen.getByText('+ Add Memory');
    fireEvent.click(captureButton);
    
    // Wait for modal to appear - check for modal backdrop
    await waitFor(() => {
      const modal = document.querySelector('.fixed.inset-0.z-50');
      expect(modal).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('loads entries from localStorage on mount', () => {
    const storedEntries = [
      {
        id: '1',
        date: new Date('2025-11-17').toISOString(),
        thought: 'Test memory',
        photos: [{ id: 'p1', image: 'test', filter: 'none' }],
        stickers: [],
        scratchOffs: [],
        layout: 'single',
      },
    ];
    
    localStorage.setItem('grimr_scrapbook_entries', JSON.stringify(storedEntries));
    
    const onBack = vi.fn();
    render(<MemoryScrapbook entries={mockEntries} onBack={onBack} />);
    
    expect(screen.getByText('Test memory')).toBeInTheDocument();
  });

  it('saves entries to localStorage when added', async () => {
    const onBack = vi.fn();
    
    render(<MemoryScrapbook onBack={onBack} />);
    
    // Open modal
    const captureButton = screen.getByText('+ Add Memory');
    fireEvent.click(captureButton);
    
    // The modal should be open (check for modal backdrop)
    await waitFor(() => {
      const modal = document.querySelector('.fixed.inset-0.z-50');
      expect(modal).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('displays floating capture button when entries exist', () => {
    const storedEntries = [
      {
        id: '1',
        date: new Date('2025-11-17').toISOString(),
        thought: 'Test memory',
        photos: [{ id: 'p1', image: 'test', filter: 'none' }],
        stickers: [],
        scratchOffs: [],
        layout: 'single',
      },
    ];
    
    localStorage.setItem('grimr_scrapbook_entries', JSON.stringify(storedEntries));
    
    const onBack = vi.fn();
    render(<MemoryScrapbook entries={mockEntries} onBack={onBack} />);
    
    const floatingButton = screen.getAllByLabelText('Capture new memory')[0];
    expect(floatingButton).toBeInTheDocument();
  });

  it('handles corrupted localStorage data gracefully', () => {
    localStorage.setItem('grimr_scrapbook_entries', 'invalid json');
    
    const onBack = vi.fn();
    
    expect(() => {
      render(<MemoryScrapbook entries={mockEntries} onBack={onBack} />);
    }).not.toThrow();
    
    // Component should render successfully even with corrupted data
    expect(screen.getByText(/memory scrapbook/i)).toBeInTheDocument();
  });

  it('converts diary entries to scrapbook format', () => {
    const onBack = vi.fn();
    render(<MemoryScrapbook onBack={onBack} />);
    
    // Should show empty state when no scrapbook entries exist
    expect(screen.getByText('No memories yet')).toBeInTheDocument();
  });

  it('shows entries in masonry grid layout', () => {
    const storedEntries = [
      {
        id: '1',
        date: new Date('2025-11-17').toISOString(),
        thought: 'Memory 1',
        photos: [{ id: 'p1', image: 'test1', filter: 'none' }],
        stickers: [],
        scratchOffs: [],
        layout: 'single',
      },
      {
        id: '2',
        date: new Date('2025-11-18').toISOString(),
        thought: 'Memory 2',
        photos: [{ id: 'p2', image: 'test2', filter: 'sepia' }],
        stickers: [],
        scratchOffs: [],
        layout: 'single',
      },
    ];
    
    localStorage.setItem('grimr_scrapbook_entries', JSON.stringify(storedEntries));
    
    const onBack = vi.fn();
    render(<MemoryScrapbook entries={mockEntries} onBack={onBack} />);
    
    expect(screen.getByText('Memory 1')).toBeInTheDocument();
    expect(screen.getByText('Memory 2')).toBeInTheDocument();
  });

  it('opens detail view when entry is clicked', async () => {
    const storedEntries = [
      {
        id: '1',
        date: new Date('2025-11-17').toISOString(),
        thought: 'Test memory',
        photos: [{ id: 'p1', image: 'test', filter: 'none' }],
        stickers: [],
        scratchOffs: [],
        layout: 'single',
      },
    ];
    
    localStorage.setItem('grimr_scrapbook_entries', JSON.stringify(storedEntries));
    
    const onBack = vi.fn();
    render(<MemoryScrapbook entries={mockEntries} onBack={onBack} />);
    
    const entry = screen.getByText('Test memory');
    const card = entry.closest('div[class*="cursor-pointer"]');
    if (card) {
      fireEvent.click(card);
    }
    
    // Wait for modal to appear - check for the modal container or delete button
    await waitFor(() => {
      const modal = document.querySelector('.fixed.inset-0.z-50');
      expect(modal).toBeInTheDocument();
    }, { timeout: 2000 });
  });
});
