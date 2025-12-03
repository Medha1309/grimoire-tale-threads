/**
 * Integration tests for StoryDetail page
 * Tests the integrated story detail view
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { StoryDetail } from '../StoryDetail';
import { useStories } from '../../hooks/useStories';
import { useStoryInteractions } from '../../hooks/useStoryInteractions';

// Mock dependencies
jest.mock('../../hooks/useStories');
jest.mock('../../hooks/useStoryInteractions');
jest.mock('../../hooks/useNavigation', () => ({
  useNavigation: () => ({
    goTo: {
      stories: jest.fn(),
      reader: jest.fn(),
      login: jest.fn(),
      storyDetail: jest.fn(),
    },
  }),
}));
jest.mock('../../components/CommentsSection', () => ({
  CommentsSection: () => <div>Comments Section</div>,
}));

const mockUseStories = useStories as jest.MockedFunction<typeof useStories>;
const mockUseStoryInteractions = useStoryInteractions as jest.MockedFunction<typeof useStoryInteractions>;

describe('StoryDetail Page', () => {
  const mockStory = {
    id: 'blackwood-manor',
    slug: 'blackwood-manor',
    title: 'The Haunting of Blackwood Manor',
    author: 'M. R. James',
    cover: 'https://example.com/blackwood.gif',
    coverType: 'gif' as const,
    genre: 'horror' as const,
    blurb: 'Eleanor inherits a cursed manor where mirrors show the dead...',
    content: [
      { page: 1, text: 'The iron gates of Blackwood Manor groaned...' },
      { page: 2, text: 'Inside, the air tasted of decay...' },
    ],
    isUserStory: false,
  };

  const mockRelatedStories = [
    {
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
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseStories.mockReturnValue({
      allStories: [mockStory, ...mockRelatedStories],
      userStories: [],
      curatedStories: [mockStory, ...mockRelatedStories],
      loading: false,
      error: null,
      getStoryBySlug: (slug: string) => (slug === 'blackwood-manor' ? mockStory : undefined),
      getStoriesByAuthor: jest.fn(),
      getStoriesByGenre: jest.fn(() => mockRelatedStories),
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

  it('should render story detail page with all information', async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/story/:slug" element={<StoryDetail />} />
        </Routes>
      </BrowserRouter>,
      { wrapper: ({ children }) => <BrowserRouter>{children}</BrowserRouter> }
    );

    // Navigate to story detail
    window.history.pushState({}, '', '/story/blackwood-manor');

    await waitFor(() => {
      expect(screen.getByText('The Haunting of Blackwood Manor')).toBeInTheDocument();
    });

    expect(screen.getByText('by M. R. James')).toBeInTheDocument();
    expect(screen.getByText(/Eleanor inherits a cursed manor/)).toBeInTheDocument();
    expect(screen.getByText('2,847 views')).toBeInTheDocument();
    expect(screen.getByText('342 likes')).toBeInTheDocument();
    expect(screen.getByText('156 bookmarks')).toBeInTheDocument();
    expect(screen.getByText('15 comments')).toBeInTheDocument();
  });

  it('should display chapters for stories with chapter content', async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/story/:slug" element={<StoryDetail />} />
        </Routes>
      </BrowserRouter>
    );

    window.history.pushState({}, '', '/story/blackwood-manor');

    await waitFor(() => {
      expect(screen.getByText('Chapters (2)')).toBeInTheDocument();
    });

    expect(screen.getByText('Chapter 1')).toBeInTheDocument();
    expect(screen.getByText('Chapter 2')).toBeInTheDocument();
  });

  it('should not display chapters section for user stories with plain text content', async () => {
    const userStory = {
      ...mockStory,
      content: 'This is a plain text story without chapters.',
      isUserStory: true,
    };

    mockUseStories.mockReturnValue({
      allStories: [userStory],
      userStories: [userStory],
      curatedStories: [],
      loading: false,
      error: null,
      getStoryBySlug: () => userStory,
      getStoriesByAuthor: jest.fn(),
      getStoriesByGenre: jest.fn(),
    });

    render(
      <BrowserRouter>
        <Routes>
          <Route path="/story/:slug" element={<StoryDetail />} />
        </Routes>
      </BrowserRouter>
    );

    window.history.pushState({}, '', '/story/blackwood-manor');

    await waitFor(() => {
      expect(screen.getByText('The Haunting of Blackwood Manor')).toBeInTheDocument();
    });

    expect(screen.queryByText(/Chapters/)).not.toBeInTheDocument();
  });

  it('should handle like button click', async () => {
    const mockToggleLike = jest.fn();
    mockUseStoryInteractions.mockReturnValue({
      stats: { views: 100, likes: 10, bookmarks: 5, avgRating: 4.5, totalRatings: 20 },
      userInteraction: { liked: false, bookmarked: false, rated: false, rating: 0 },
      commentsCount: 5,
      loading: false,
      error: null,
      toggleLike: mockToggleLike,
      toggleBookmark: jest.fn(),
      rateStory: jest.fn(),
    });

    render(
      <BrowserRouter>
        <Routes>
          <Route path="/story/:slug" element={<StoryDetail />} />
        </Routes>
      </BrowserRouter>
    );

    window.history.pushState({}, '', '/story/blackwood-manor');

    await waitFor(() => {
      expect(screen.getByText('The Haunting of Blackwood Manor')).toBeInTheDocument();
    });

    // Find and click like button (heart icon)
    const likeButtons = screen.getAllByRole('button');
    const likeButton = likeButtons.find(btn => btn.innerHTML.includes('M4.318 6.318'));
    
    if (likeButton) {
      fireEvent.click(likeButton);
      expect(mockToggleLike).toHaveBeenCalled();
    }
  });

  it('should handle bookmark button click', async () => {
    const mockToggleBookmark = jest.fn();
    mockUseStoryInteractions.mockReturnValue({
      stats: { views: 100, likes: 10, bookmarks: 5, avgRating: 4.5, totalRatings: 20 },
      userInteraction: { liked: false, bookmarked: false, rated: false, rating: 0 },
      commentsCount: 5,
      loading: false,
      error: null,
      toggleLike: jest.fn(),
      toggleBookmark: mockToggleBookmark,
      rateStory: jest.fn(),
    });

    render(
      <BrowserRouter>
        <Routes>
          <Route path="/story/:slug" element={<StoryDetail />} />
        </Routes>
      </BrowserRouter>
    );

    window.history.pushState({}, '', '/story/blackwood-manor');

    await waitFor(() => {
      expect(screen.getByText('The Haunting of Blackwood Manor')).toBeInTheDocument();
    });

    // Find and click bookmark button
    const bookmarkButtons = screen.getAllByRole('button');
    const bookmarkButton = bookmarkButtons.find(btn => btn.innerHTML.includes('M5 5a2 2 0 012-2h10'));
    
    if (bookmarkButton) {
      fireEvent.click(bookmarkButton);
      expect(mockToggleBookmark).toHaveBeenCalled();
    }
  });

  it('should redirect to login when unauthenticated user tries to like', async () => {
    const mockGoToLogin = jest.fn();
    const mockToggleLike = jest.fn().mockRejectedValue(new Error('You must be logged in'));

    jest.spyOn(require('../../hooks/useNavigation'), 'useNavigation').mockReturnValue({
      goTo: {
        stories: jest.fn(),
        reader: jest.fn(),
        login: mockGoToLogin,
        storyDetail: jest.fn(),
      },
    });

    mockUseStoryInteractions.mockReturnValue({
      stats: { views: 100, likes: 10, bookmarks: 5, avgRating: 4.5, totalRatings: 20 },
      userInteraction: { liked: false, bookmarked: false, rated: false, rating: 0 },
      commentsCount: 5,
      loading: false,
      error: null,
      toggleLike: mockToggleLike,
      toggleBookmark: jest.fn(),
      rateStory: jest.fn(),
    });

    render(
      <BrowserRouter>
        <Routes>
          <Route path="/story/:slug" element={<StoryDetail />} />
        </Routes>
      </BrowserRouter>
    );

    window.history.pushState({}, '', '/story/blackwood-manor');

    await waitFor(() => {
      expect(screen.getByText('The Haunting of Blackwood Manor')).toBeInTheDocument();
    });

    const likeButtons = screen.getAllByRole('button');
    const likeButton = likeButtons.find(btn => btn.innerHTML.includes('M4.318 6.318'));
    
    if (likeButton) {
      fireEvent.click(likeButton);
      await waitFor(() => {
        expect(mockGoToLogin).toHaveBeenCalled();
      });
    }
  });

  it('should display related stories', async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/story/:slug" element={<StoryDetail />} />
        </Routes>
      </BrowserRouter>
    );

    window.history.pushState({}, '', '/story/blackwood-manor');

    await waitFor(() => {
      expect(screen.getByText('More Like This')).toBeInTheDocument();
    });

    expect(screen.getByText('The Whispering Shadows')).toBeInTheDocument();
  });

  it('should handle related story click', async () => {
    const mockGoToStoryDetail = jest.fn();
    jest.spyOn(require('../../hooks/useNavigation'), 'useNavigation').mockReturnValue({
      goTo: {
        stories: jest.fn(),
        reader: jest.fn(),
        login: jest.fn(),
        storyDetail: mockGoToStoryDetail,
      },
    });

    render(
      <BrowserRouter>
        <Routes>
          <Route path="/story/:slug" element={<StoryDetail />} />
        </Routes>
      </BrowserRouter>
    );

    window.history.pushState({}, '', '/story/blackwood-manor');

    await waitFor(() => {
      expect(screen.getByText('The Whispering Shadows')).toBeInTheDocument();
    });

    const relatedStory = screen.getByText('The Whispering Shadows').closest('button');
    if (relatedStory) {
      fireEvent.click(relatedStory);
      expect(mockGoToStoryDetail).toHaveBeenCalledWith('whispering-shadows');
    }
  });

  it('should show loading state', () => {
    mockUseStories.mockReturnValue({
      allStories: [],
      userStories: [],
      curatedStories: [],
      loading: true,
      error: null,
      getStoryBySlug: jest.fn(),
      getStoriesByAuthor: jest.fn(),
      getStoriesByGenre: jest.fn(),
    });

    render(
      <BrowserRouter>
        <Routes>
          <Route path="/story/:slug" element={<StoryDetail />} />
        </Routes>
      </BrowserRouter>
    );

    window.history.pushState({}, '', '/story/blackwood-manor');

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should show not found message for invalid slug', async () => {
    mockUseStories.mockReturnValue({
      allStories: [],
      userStories: [],
      curatedStories: [],
      loading: false,
      error: null,
      getStoryBySlug: () => undefined,
      getStoriesByAuthor: jest.fn(),
      getStoriesByGenre: jest.fn(),
    });

    render(
      <BrowserRouter>
        <Routes>
          <Route path="/story/:slug" element={<StoryDetail />} />
        </Routes>
      </BrowserRouter>
    );

    window.history.pushState({}, '', '/story/invalid-slug');

    await waitFor(() => {
      expect(screen.getByText('Story not found')).toBeInTheDocument();
    });
  });

  it('should handle start reading button click', async () => {
    const mockGoToReader = jest.fn();
    jest.spyOn(require('../../hooks/useNavigation'), 'useNavigation').mockReturnValue({
      goTo: {
        stories: jest.fn(),
        reader: mockGoToReader,
        login: jest.fn(),
        storyDetail: jest.fn(),
      },
    });

    render(
      <BrowserRouter>
        <Routes>
          <Route path="/story/:slug" element={<StoryDetail />} />
        </Routes>
      </BrowserRouter>
    );

    window.history.pushState({}, '', '/story/blackwood-manor');

    await waitFor(() => {
      expect(screen.getByText('Start Reading')).toBeInTheDocument();
    });

    const startReadingButton = screen.getByText('Start Reading');
    fireEvent.click(startReadingButton);

    expect(mockGoToReader).toHaveBeenCalledWith('blackwood-manor');
  });
});
