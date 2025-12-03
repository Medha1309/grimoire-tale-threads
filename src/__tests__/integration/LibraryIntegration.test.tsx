/**
 * End-to-end integration tests for Library system
 * Tests the complete workflow from browsing to reading stories
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Stories } from '../../pages/Stories';
import { StoryDetail } from '../../pages/StoryDetail';
import { useStories } from '../../hooks/useStories';
import { useUserStories } from '../../hooks/useUserStories';
import { useAuth } from '../../contexts/AuthContext';
import { useBookmarks } from '../../hooks/useBookmarks';
import { useStoryInteractions } from '../../hooks/useStoryInteractions';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { beforeEach } from 'vitest';
import { describe } from 'vitest';

// Mock all dependencies
jest.mock('../../hooks/useStories');
jest.mock('../../hooks/useUserStories');
jest.mock('../../contexts/AuthContext');
jest.mock('../../hooks/useBookmarks');
jest.mock('../../hooks/useStoryInteractions');
jest.mock('../../hooks/useNavigation', () => ({
  useNavigation: () => ({
    goTo: {
      home: jest.fn(),
      stories: jest.fn(),
      storyDetail: (slug: string) => {
        window.history.pushState({}, '', `/story/${slug}`);
      },
      reader: jest.fn(),
      login: jest.fn(),
    },
  }),
}));
jest.mock('../../components/CommentsSection', () => ({
  CommentsSection: () => <div>Comments Section</div>,
}));

const mockUseStories = useStories as jest.MockedFunction<typeof useStories>;
const mockUseUserStories = useUserStories as jest.MockedFunction<typeof useUserStories>;
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
const mockUseBookmarks = useBookmarks as jest.MockedFunction<typeof useBookmarks>;
const mockUseStoryInteractions = useStoryInteractions as jest.MockedFunction<typeof useStoryInteractions>;

describe('Library Integration Tests', () => {
  const mockUserStory = {
    id: 'user-1',
    slug: 'my-horror-story',
    title: 'My Horror Story',
    author: 'Test User',
    authorId: 'test-user-123',
    cover: 'https://example.com/my-cover.jpg',
    coverType: 'image' as const,
    genre: 'horror' as const,
    blurb: 'A scary tale I wrote...',
    content: 'This is my horror story content...',
    isUserStory: true,
    published: true,
  };

  const mockCuratedStory = {
    id: 'blackwood-manor',
    slug: 'blackwood-manor',
    title: 'The Haunting of Blackwood Manor',
    author: 'M. R. James',
    cover: 'https://example.com/blackwood.gif',
    coverType: 'gif' as const,
    genre: 'horror' as const,
    blurb: 'Eleanor inherits a cursed manor...',
    content: [
      { page: 1, text: 'The iron gates of Blackwood Manor groaned...' },
      { page: 2, text: 'Inside, the air tasted of decay...' },
    ],
    isUserStory: false,
  };

  const mockRelatedStory = {
    id: 'whispering-shadows',
    slug: 'whispering-shadows',
    title: 'The Whispering Shadows',
    author: 'E. Vale',
    cover: 'https://example.com/shadows.gif',
    coverType: 'gif' as const,
    genre: 'horror' as const,
    blurb: 'Shadows that move independently...',
    content: [{ page: 1, text: 'They started as whispers...' }],
    isUserStory: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseAuth.mockReturnValue({
      currentUser: { uid: 'test-user-123' } as any,
      userProfile: { displayName: 'Test User' } as any,
      loading: false,
      signIn: jest.fn(),
      signUp: jest.fn(),
      signOut: jest.fn(),
      updateProfile: jest.fn(),
    });

    mockUseStories.mockReturnValue({
      allStories: [mockUserStory, mockCuratedStory, mockRelatedStory],
      userStories: [mockUserStory],
      curatedStories: [mockCuratedStory, mockRelatedStory],
      loading: false,
      error: null,
      getStoryBySlug: (slug: string) => {
        if (slug === 'my-horror-story') return mockUserStory;
        if (slug === 'blackwood-manor') return mockCuratedStory;
        if (slug === 'whispering-shadows') return mockRelatedStory;
        return undefined;
      },
      getStoriesByAuthor: jest.fn(),
      getStoriesByGenre: jest.fn(() => [mockRelatedStory]),
    });

    mockUseUserStories.mockReturnValue({
      stories: [],
      loading: false,
      error: null,
      createStory: jest.fn(),
      updateStory: jest.fn(),
      deleteStory: jest.fn(),
    });

    mockUseBookmarks.mockReturnValue({
      bookmarkedSlugs: new Set(),
      toggleBookmark: jest.fn(),
      isBookmarked: jest.fn(),
    });

    mockUseStoryInteractions.mockReturnValue({
      stats: {
        views: 2847,
        likes: 342,
        bookmarks: 156,
        avgRating: 4.6,
        totalRatings: 89,
      },
      userInteraction: {
        liked: false,
        bookmarked: false,
        rated: false,
        rating: 0,
      },
      commentsCount: 15,
      loading: false,
      error: null,
      toggleLike: jest.fn(),
      toggleBookmark: jest.fn(),
      rateStory: jest.fn(),
    });
  });

  it('should complete full workflow: browse library -> view story detail -> interact', async () => {
    const App = () => (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Stories />} />
          <Route path="/story/:slug" element={<StoryDetail />} />
        </Routes>
      </BrowserRouter>
    );

    render(<App />);

    // Step 1: User sees library page
    await waitFor(() => {
      expect(screen.getByText('LIBRARY')).toBeInTheDocument();
    });

    // Step 2: User sees their own stories
    expect(screen.getByText('Your Tales')).toBeInTheDocument();
    expect(screen.getByText('My Horror Story')).toBeInTheDocument();

    // Step 3: User sees stories
    expect(screen.getByText('The Haunting of Blackwood Manor')).toBeInTheDocument();

    // Step 4: User clicks on a curated story
    const curatedStoryCard = screen.getByText('The Haunting of Blackwood Manor').closest('article');
    expect(curatedStoryCard).toBeInTheDocument();
    
    if (curatedStoryCard) {
      fireEvent.click(curatedStoryCard);
    }

    // Step 5: User is taken to story detail page
    await waitFor(() => {
      expect(screen.getByText('The Haunting of Blackwood Manor')).toBeInTheDocument();
      expect(screen.getByText('by M. R. James')).toBeInTheDocument();
    });

    // Step 6: User sees story information
    expect(screen.getByText(/Eleanor inherits a cursed manor/)).toBeInTheDocument();
    expect(screen.getByText('2,847 views')).toBeInTheDocument();
    expect(screen.getByText('342 likes')).toBeInTheDocument();

    // Step 7: User sees chapters
    expect(screen.getByText('Chapters (2)')).toBeInTheDocument();
    expect(screen.getByText('Chapter 1')).toBeInTheDocument();
    expect(screen.getByText('Chapter 2')).toBeInTheDocument();

    // Step 8: User sees related stories
    expect(screen.getByText('More Like This')).toBeInTheDocument();
    expect(screen.getByText('The Whispering Shadows')).toBeInTheDocument();

    // Step 9: User can interact with the story
    const likeButtons = screen.getAllByRole('button');
    const likeButton = likeButtons.find(btn => btn.innerHTML.includes('M4.318 6.318'));
    expect(likeButton).toBeInTheDocument();
  });

  it('should handle user story workflow differently than curated stories', async () => {
    const App = () => (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Stories />} />
          <Route path="/story/:slug" element={<StoryDetail />} />
        </Routes>
      </BrowserRouter>
    );

    render(<App />);

    // Navigate to library
    await waitFor(() => {
      expect(screen.getByText('LIBRARY')).toBeInTheDocument();
    });

    // Click on user's own story
    const userStoryCard = screen.getByText('My Horror Story').closest('article');
    if (userStoryCard) {
      fireEvent.click(userStoryCard);
    }

    // Should show story detail
    await waitFor(() => {
      expect(screen.getByText('My Horror Story')).toBeInTheDocument();
      expect(screen.getByText('by Test User')).toBeInTheDocument();
    });

    // User story has plain text content, so no chapters section
    expect(screen.queryByText(/Chapters/)).not.toBeInTheDocument();

    // But still has blurb
    expect(screen.getByText(/A scary tale I wrote/)).toBeInTheDocument();
  });

  it('should maintain bookmark state across navigation', async () => {
    const mockToggleBookmark = jest.fn();
    const bookmarkedSlugs = new Set(['blackwood-manor']);

    mockUseBookmarks.mockReturnValue({
      bookmarkedSlugs,
      toggleBookmark: mockToggleBookmark,
      isBookmarked: (slug: string) => bookmarkedSlugs.has(slug),
    });

    const App = () => (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Stories />} />
          <Route path="/story/:slug" element={<StoryDetail />} />
        </Routes>
      </BrowserRouter>
    );

    render(<App />);

    // Library page should show bookmarked story
    await waitFor(() => {
      expect(screen.getByText('LIBRARY')).toBeInTheDocument();
    });

    // Navigate to story detail
    const storyCard = screen.getByText('The Haunting of Blackwood Manor').closest('article');
    if (storyCard) {
      fireEvent.click(storyCard);
    }

    // Story detail should show bookmarked state
    await waitFor(() => {
      expect(screen.getByText('The Haunting of Blackwood Manor')).toBeInTheDocument();
    });

    // Bookmark button should reflect bookmarked state
    const bookmarkButtons = screen.getAllByRole('button');
    const bookmarkButton = bookmarkButtons.find(btn => btn.innerHTML.includes('M5 5a2 2 0 012-2h10'));
    expect(bookmarkButton).toBeInTheDocument();
  });

  it('should handle cover types correctly throughout the workflow', async () => {
    const App = () => (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Stories />} />
          <Route path="/story/:slug" element={<StoryDetail />} />
        </Routes>
      </BrowserRouter>
    );

    const { container } = render(<App />);

    // Library page should render different cover types
    await waitFor(() => {
      expect(screen.getByText('LIBRARY')).toBeInTheDocument();
    });

    // User story has image cover
    const userStoryCard = screen.getByText('My Horror Story').closest('article');
    expect(userStoryCard).toBeInTheDocument();

    // Curated story has gif cover
    const curatedStoryCard = screen.getByText('The Haunting of Blackwood Manor').closest('article');
    expect(curatedStoryCard).toBeInTheDocument();

    // Navigate to story with gif cover
    if (curatedStoryCard) {
      fireEvent.click(curatedStoryCard);
    }

    // Story detail should show the cover
    await waitFor(() => {
      const coverImage = container.querySelector('img[alt="The Haunting of Blackwood Manor"]');
      expect(coverImage).toBeInTheDocument();
      expect(coverImage).toHaveAttribute('src', 'https://example.com/blackwood.gif');
    });
  });

  it('should handle errors gracefully', async () => {
    mockUseStories.mockReturnValue({
      allStories: [],
      userStories: [],
      curatedStories: [],
      loading: false,
      error: 'Failed to load stories',
      getStoryBySlug: jest.fn(),
      getStoriesByAuthor: jest.fn(),
      getStoriesByGenre: jest.fn(),
    });

    const App = () => (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Stories />} />
        </Routes>
      </BrowserRouter>
    );

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('LIBRARY')).toBeInTheDocument();
    });

    // Should still render the page structure even with errors
  });

  it('should handle navigation between related stories', async () => {
    const App = () => (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Stories />} />
          <Route path="/story/:slug" element={<StoryDetail />} />
        </Routes>
      </BrowserRouter>
    );

    render(<App />);

    // Start at library
    await waitFor(() => {
      expect(screen.getByText('LIBRARY')).toBeInTheDocument();
    });

    // Navigate to first story
    const firstStory = screen.getByText('The Haunting of Blackwood Manor').closest('article');
    if (firstStory) {
      fireEvent.click(firstStory);
    }

    // Should show story detail
    await waitFor(() => {
      expect(screen.getByText('The Haunting of Blackwood Manor')).toBeInTheDocument();
      expect(screen.getByText('More Like This')).toBeInTheDocument();
    });

    // Should show related story
    expect(screen.getByText('The Whispering Shadows')).toBeInTheDocument();

    // Click on related story
    const relatedStory = screen.getByText('The Whispering Shadows').closest('button');
    if (relatedStory) {
      fireEvent.click(relatedStory);
    }

    // Should navigate to related story
    // (In real app, this would trigger navigation)
  });
});
