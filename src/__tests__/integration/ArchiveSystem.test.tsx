/**
 * Integration Tests for Archive System
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ArchiveView } from '../../components/diary/ArchiveView';
import { ReadingArchiveView } from '../../components/diary/ReadingArchiveView';

describe('Archive System Integration', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('Diary Archive', () => {
    it('should display empty state when no archived items', () => {
      const mockOnBack = vi.fn();
      const mockOnRestore = vi.fn();
      
      render(
        <ArchiveView
          type="diary"
          onBack={mockOnBack}
          onRestore={mockOnRestore}
        />
      );
      
      expect(screen.getByText(/archive is empty/i)).toBeInTheDocument();
    });

    it('should display archived diary entries', () => {
      const archivedEntry = {
        id: 'diary-1',
        type: 'diary',
        content: 'Test diary content',
        mood: 'joy',
        isLocked: false,
        originalCreatedAt: new Date().toISOString(),
        archivedAt: new Date().toISOString(),
      };
      
      localStorage.setItem('grimr_archive_diary', JSON.stringify([archivedEntry]));
      
      const mockOnBack = vi.fn();
      const mockOnRestore = vi.fn();
      
      render(
        <ArchiveView
          type="diary"
          onBack={mockOnBack}
          onRestore={mockOnRestore}
        />
      );
      
      expect(screen.getByText('Test diary content')).toBeInTheDocument();
    });

    it('should restore an archived entry', async () => {
      const archivedEntry = {
        id: 'diary-1',
        type: 'diary',
        content: 'Test diary content',
        mood: 'joy',
        isLocked: false,
        originalCreatedAt: new Date().toISOString(),
        archivedAt: new Date().toISOString(),
      };
      
      localStorage.setItem('grimr_archive_diary', JSON.stringify([archivedEntry]));
      
      const mockOnBack = vi.fn();
      const mockOnRestore = vi.fn();
      
      render(
        <ArchiveView
          type="diary"
          onBack={mockOnBack}
          onRestore={mockOnRestore}
        />
      );
      
      const restoreButton = screen.getByText('Restore');
      fireEvent.click(restoreButton);
      
      await waitFor(() => {
        expect(mockOnRestore).toHaveBeenCalled();
      });
    });

    it('should show days until deletion', () => {
      const archivedEntry = {
        id: 'diary-1',
        type: 'diary',
        content: 'Test diary content',
        mood: 'joy',
        isLocked: false,
        originalCreatedAt: new Date().toISOString(),
        archivedAt: new Date().toISOString(),
      };
      
      localStorage.setItem('grimr_archive_diary', JSON.stringify([archivedEntry]));
      
      const mockOnBack = vi.fn();
      const mockOnRestore = vi.fn();
      
      render(
        <ArchiveView
          type="diary"
          onBack={mockOnBack}
          onRestore={mockOnRestore}
        />
      );
      
      expect(screen.getByText(/30 days left/i)).toBeInTheDocument();
    });

    it('should permanently delete an entry', async () => {
      const archivedEntry = {
        id: 'diary-1',
        type: 'diary',
        content: 'Test diary content',
        mood: 'joy',
        isLocked: false,
        originalCreatedAt: new Date().toISOString(),
        archivedAt: new Date().toISOString(),
      };
      
      localStorage.setItem('grimr_archive_diary', JSON.stringify([archivedEntry]));
      
      const mockOnBack = vi.fn();
      const mockOnRestore = vi.fn();
      
      render(
        <ArchiveView
          type="diary"
          onBack={mockOnBack}
          onRestore={mockOnRestore}
        />
      );
      
      const deleteButton = screen.getByText('Delete Forever');
      fireEvent.click(deleteButton);
      
      // Confirm deletion
      await waitFor(() => {
        expect(screen.getByText(/permanent deletion/i)).toBeInTheDocument();
      });
      
      const confirmButton = screen.getByText('Delete Forever', { selector: 'button' });
      fireEvent.click(confirmButton);
      
      await waitFor(() => {
        expect(screen.getByText(/archive is empty/i)).toBeInTheDocument();
      });
    });
  });

  describe('Reading Archive', () => {
    it('should display empty state when no reading history', () => {
      const mockOnBack = vi.fn();
      const mockOnNavigateToLibrary = vi.fn();
      
      render(
        <ReadingArchiveView
          onBack={mockOnBack}
          onNavigateToLibrary={mockOnNavigateToLibrary}
        />
      );
      
      expect(screen.getByText(/archive empty/i)).toBeInTheDocument();
    });

    it('should display reading history entries', () => {
      const historyEntry = {
        id: 'reading-1',
        storySlug: 'test-story',
        storyTitle: 'Test Story',
        storyAuthor: 'Test Author',
        storyGenre: 'horror',
        completedAt: new Date().toISOString(),
        readingTime: 30,
      };
      
      localStorage.setItem('grimr_reading_history', JSON.stringify([historyEntry]));
      
      const mockOnBack = vi.fn();
      const mockOnNavigateToLibrary = vi.fn();
      
      render(
        <ReadingArchiveView
          onBack={mockOnBack}
          onNavigateToLibrary={mockOnNavigateToLibrary}
        />
      );
      
      expect(screen.getByText('Test Story')).toBeInTheDocument();
      expect(screen.getByText(/Test Author/i)).toBeInTheDocument();
    });

    it('should display reading stats', () => {
      const historyEntries = [
        {
          id: 'reading-1',
          storySlug: 'story-1',
          storyTitle: 'Story 1',
          storyAuthor: 'Author 1',
          completedAt: new Date().toISOString(),
          readingTime: 30,
          rating: 4,
        },
        {
          id: 'reading-2',
          storySlug: 'story-2',
          storyTitle: 'Story 2',
          storyAuthor: 'Author 2',
          completedAt: new Date().toISOString(),
          readingTime: 45,
          rating: 5,
        },
      ];
      
      localStorage.setItem('grimr_reading_history', JSON.stringify(historyEntries));
      
      const mockOnBack = vi.fn();
      const mockOnNavigateToLibrary = vi.fn();
      
      render(
        <ReadingArchiveView
          onBack={mockOnBack}
          onNavigateToLibrary={mockOnNavigateToLibrary}
        />
      );
      
      expect(screen.getByText('2')).toBeInTheDocument(); // Total books
    });

    it('should allow adding notes to a reading entry', async () => {
      const historyEntry = {
        id: 'reading-1',
        storySlug: 'test-story',
        storyTitle: 'Test Story',
        storyAuthor: 'Test Author',
        completedAt: new Date().toISOString(),
      };
      
      localStorage.setItem('grimr_reading_history', JSON.stringify([historyEntry]));
      
      const mockOnBack = vi.fn();
      const mockOnNavigateToLibrary = vi.fn();
      
      render(
        <ReadingArchiveView
          onBack={mockOnBack}
          onNavigateToLibrary={mockOnNavigateToLibrary}
        />
      );
      
      // Click on the entry to view details
      const storyCard = screen.getByText('Test Story');
      fireEvent.click(storyCard);
      
      await waitFor(() => {
        expect(screen.getByText(/personal notes/i)).toBeInTheDocument();
      });
    });
  });

  describe('Auto-deletion', () => {
    it('should not display items older than 30 days', () => {
      const oldDate = new Date();
      oldDate.setDate(oldDate.getDate() - 31);
      
      const oldEntry = {
        id: 'old-1',
        type: 'diary',
        content: 'Old entry',
        mood: 'joy',
        isLocked: false,
        originalCreatedAt: oldDate.toISOString(),
        archivedAt: oldDate.toISOString(),
      };
      
      localStorage.setItem('grimr_archive_diary', JSON.stringify([oldEntry]));
      
      const mockOnBack = vi.fn();
      const mockOnRestore = vi.fn();
      
      render(
        <ArchiveView
          type="diary"
          onBack={mockOnBack}
          onRestore={mockOnRestore}
        />
      );
      
      expect(screen.getByText(/archive is empty/i)).toBeInTheDocument();
    });
  });
});
