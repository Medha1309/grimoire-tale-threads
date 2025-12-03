/**
 * Integration Tests for Navigation Buttons across Pages
 * Verifies that navigation buttons are properly integrated and functional
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { About } from '../../pages/About';
import { Stories } from '../../pages/Stories';
import { StoryDetail } from '../../pages/StoryDetail';
import { Reader } from '../../pages/Reader';

// Mock dependencies
vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    currentUser: null,
    userProfile: null,
  }),
}));

vi.mock('../../hooks/useNavigation', () => ({
  useNavigation: () => ({
    goTo: {
      home: vi.fn(),
      stories: vi.fn(),
      storyDetail: vi.fn(),
      reader: vi.fn(),
      login: vi.fn(),
    },
  }),
}));

vi.mock('../../hooks/useStories', () => ({
  useStories: () => ({
    allStories: [
      {
        slug: 'test-story-1',
        title: 'Test Story 1',
        author: 'Test Author',
        genre: 'horror',
        content: 'Test content',
        blurb: 'Test blurb',
        cover: '',
      },
      {
        slug: 'test-story-2',
        title: 'Test Story 2',
        author: 'Test Author',
        genre: 'horror',
        content: 'Test content',
        blurb: 'Test blurb',
        cover: '',
      },
    ],
    userStories: [],
    curatedStories: [],
    getStoryBySlug: (slug: string) => ({
      slug,
      title: 'Test Story',
      author: 'Test Author',
      genre: 'horror',
      content: 'Test content',
      blurb: 'Test blurb',
      cover: '',
    }),
    loading: false,
  }),
}));

vi.mock('../../hooks/useUserStories', () => ({
  useUserStories: () => ({
    createStory: vi.fn(),
    error: null,
  }),
}));

vi.mock('../../hooks/useBookmarks', () => ({
  useBookmarks: () => ({
    bookmarkedSlugs: [],
  }),
}));

vi.mock('../../hooks/useStoryPublishing', () => ({
  useStoryPublishing: () => ({
    validateAndPublish: vi.fn(),
    isSaving: false,
    error: null,
  }),
}));

vi.mock('../../hooks/useStoryInteractions', () => ({
  useStoryInteractions: () => ({
    stats: { likes: 0, bookmarks: 0, views: 0 },
    commentsCount: 0,
    statsLoading: false,
    userInteraction: { liked: false, bookmarked: false },
    interactionLoading: false,
    toggleLike: vi.fn(),
    toggleBookmark: vi.fn(),
  }),
}));

vi.mock('../../components/library/TorchEffect', () => ({
  TorchEffect: () => null,
  useTorchPosition: () => ({
    torchPos: { x: 0, y: 0 },
    torchActive: false,
  }),
}));

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, onClick, disabled, className, ...props }: any) => (
      <button onClick={onClick} disabled={disabled} className={className} {...props}>
        {children}
      </button>
    ),
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    article: ({ children, ...props }: any) => <article {...props}>{children}</article>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

vi.mock('../../components/about/InvestigationRoom', () => ({
  InvestigationRoom: ({ children }: any) => <div>{children}</div>,
}));

vi.mock('../../components/about/CinematicSequenceController', () => ({
  CinematicSequenceController: () => null,
}));

vi.mock('../../components/Creatures', () => ({
  SpiderField: () => null,
}));

vi.mock('../../components/CommentsSection', () => ({
  CommentsSection: () => <div>Comments Section</div>,
}));

describe('Navigation Buttons Integration', () => {
  describe('About Page', () => {
    it('renders HomeButton with "Return Home" label', () => {
      render(
        <BrowserRouter>
          <About />
        </BrowserRouter>
      );

      expect(screen.getByText('Return Home')).toBeInTheDocument();
      expect(screen.getByText('🏠')).toBeInTheDocument();
    });

    it('HomeButton is prominent and visible', () => {
      const { container } = render(
        <BrowserRouter>
          <About />
        </BrowserRouter>
      );

      const homeButton = screen.getByText('Return Home').closest('button');
      expect(homeButton).toBeInTheDocument();
      expect(homeButton?.className).toContain('px-6');
      expect(homeButton?.className).toContain('py-3');
    });
  });

  describe('Stories Page', () => {
    it('renders BackButton with ghost variant', () => {
      render(
        <BrowserRouter>
          <Stories />
        </BrowserRouter>
      );

      const backButton = screen.getByText('Back');
      expect(backButton).toBeInTheDocument();
      expect(screen.getByText('←')).toBeInTheDocument();
    });

    it('renders LIBRARY header', () => {
      render(
        <BrowserRouter>
          <Stories />
        </BrowserRouter>
      );

      expect(screen.getByText('LIBRARY')).toBeInTheDocument();
    });

    it('renders Write button', () => {
      render(
        <BrowserRouter>
          <Stories />
        </BrowserRouter>
      );

      expect(screen.getByText('Write')).toBeInTheDocument();
    });
  });

  describe('StoryDetail Page', () => {
    it('renders navigation group with back button', async () => {
      render(
        <MemoryRouter initialEntries={['/story/test-story-1']}>
          <StoryDetail />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('Back')).toBeInTheDocument();
      });
    });

    it('renders next/previous buttons when available', async () => {
      render(
        <MemoryRouter initialEntries={['/story/test-story-1']}>
          <StoryDetail />
        </MemoryRouter>
      );

      await waitFor(() => {
        // Should have navigation buttons
        const buttons = screen.getAllByRole('button');
        expect(buttons.length).toBeGreaterThan(0);
      });
    });

    it('displays story title', async () => {
      render(
        <MemoryRouter initialEntries={['/story/test-story-1']}>
          <StoryDetail />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('Test Story')).toBeInTheDocument();
      });
    });
  });

  describe('Reader Page', () => {
    it('renders navigation group in header', async () => {
      render(
        <MemoryRouter initialEntries={['/read/test-story-1']}>
          <Reader />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('Back')).toBeInTheDocument();
      });
    });

    it('renders next/previous buttons when stories available', async () => {
      render(
        <MemoryRouter initialEntries={['/read/test-story-1']}>
          <Reader />
        </MemoryRouter>
      );

      await waitFor(() => {
        const buttons = screen.getAllByRole('button');
        expect(buttons.length).toBeGreaterThan(0);
      });
    });

    it('renders navigation at bottom of page', async () => {
      render(
        <MemoryRouter initialEntries={['/read/test-story-1']}>
          <Reader />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('Back to Story')).toBeInTheDocument();
      });
    });
  });

  describe('Navigation Button Functionality', () => {
    it('back button is clickable', () => {
      render(
        <BrowserRouter>
          <Stories />
        </BrowserRouter>
      );

      const backButton = screen.getByText('Back').closest('button');
      expect(backButton).toBeInTheDocument();
      expect(backButton).not.toBeDisabled();
      
      // Verify it's clickable
      fireEvent.click(backButton!);
    });

    it('navigation buttons are keyboard accessible', () => {
      render(
        <BrowserRouter>
          <Stories />
        </BrowserRouter>
      );

      const backButton = screen.getByText('Back').closest('button');
      backButton?.focus();
      expect(document.activeElement).toBe(backButton);
    });
  });

  describe('Responsive Behavior', () => {
    it('navigation buttons render on mobile', () => {
      // Set mobile viewport
      global.innerWidth = 375;
      global.innerHeight = 667;

      render(
        <BrowserRouter>
          <Stories />
        </BrowserRouter>
      );

      expect(screen.getByText('Back')).toBeInTheDocument();
    });

    it('navigation buttons render on desktop', () => {
      // Set desktop viewport
      global.innerWidth = 1920;
      global.innerHeight = 1080;

      render(
        <BrowserRouter>
          <Stories />
        </BrowserRouter>
      );

      expect(screen.getByText('Back')).toBeInTheDocument();
    });
  });

  describe('Navigation Button Variants', () => {
    it('ghost variant has correct styling', () => {
      render(
        <BrowserRouter>
          <Stories />
        </BrowserRouter>
      );

      const backButton = screen.getByText('Back').closest('button');
      expect(backButton?.className).toContain('text-zinc-400');
    });

    it('prominent variant has correct styling', () => {
      render(
        <BrowserRouter>
          <About />
        </BrowserRouter>
      );

      const homeButton = screen.getByText('Return Home').closest('button');
      expect(homeButton?.className).toContain('px-6');
      expect(homeButton?.className).toContain('py-3');
      expect(homeButton?.className).toContain('rounded-lg');
    });
  });

  describe('Edge Cases', () => {
    it('navigation buttons work with multiple stories', async () => {
      render(
        <MemoryRouter initialEntries={['/story/test-story-1']}>
          <StoryDetail />
        </MemoryRouter>
      );

      await waitFor(() => {
        // Should have back button
        expect(screen.getByText('Back')).toBeInTheDocument();
        
        // Should have navigation buttons
        const buttons = screen.getAllByRole('button');
        expect(buttons.length).toBeGreaterThan(0);
      });
    });

    it('reader page has navigation controls', async () => {
      render(
        <MemoryRouter initialEntries={['/read/test-story-1']}>
          <Reader />
        </MemoryRouter>
      );

      await waitFor(() => {
        // Should have back button
        expect(screen.getByText('Back')).toBeInTheDocument();
        
        // Should have bottom navigation
        expect(screen.getByText('Back to Story')).toBeInTheDocument();
      });
    });
  });
});
