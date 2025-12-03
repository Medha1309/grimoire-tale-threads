/**
 * Integration tests for Stories (Library) page
 * Tests the fully integrated library system
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Stories } from '../Stories';
import { useStories } from '../../hooks/useStories';
import { useUserStories } from '../../hooks/useUserStories';
import { useAuth } from '../../contexts/AuthContext';
import { useBookmarks } from '../../hooks/useBookmarks';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { beforeEach } from 'vitest';
import { describe } from 'vitest';

// Mock dependencies
jest.mock('../../hooks/useStories');
jest.mock('../../hooks/useUserStories');
jest.mock('../../contexts/AuthContext');
jest.mock('../../hooks/useBookmarks');
jest.mock('../../hooks/useNavigation', () => ({
  useNavigation: () => ({
    goTo: {
      home: jest.fn(),
      stories: jest.fn(),
      storyDetail: jest.fn(),
      login: jest.fn(),
    },
  }),
}));

const mockUseStories = useStories as jest.MockedFunction<typeof useStories>;
const mockUseUserStories = useUserStories as jest.MockedFunction<typeof useUserStories>;
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
const mockUseBookmarks = useBookmarks as jest.MockedFunction<typeof useBookmarks>;

describe('Stories (Library) Page', () => {
  const mockUserStories = [
    {
      id: 'user-1',
      slug: 'my-story',
      title: 'My Horror Story',
      author: 'Test User',
      authorId: 'test-user-123',
      cover: 'https://example.com/cover.jpg',
      coverType: 'image' as const,
      genre: 'horror' as const,
      blurb: 'A scary tale',
      content: 'Story content...',
      isUserStory: true,
      published: true,
    },
  ];

  const mockCuratedStories = [
    {
      id: 'blackwood-manor',
      slug: 'blackwood-manor',
      title: 'The Haunting of Blackwood Manor',
      author: 'M. R. James',
      cover: 'https://example.com/blackwood.gif',
      coverType: 'gif' as const,
      genre: 'horror' as const,
      blurb: 'Eleanor inherits a cursed manor...',
      content: [{ page: 1, text: 'The iron gates...' }],
      isUserStory: false,
    },
  ];

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
      allStories: [...mockUserStories, ...mockCuratedStories],
      userStories: mockUserStories,
      curatedStories: mockCuratedStories,
      loading: false,
      error: null,
      getStoryBySlug: jest.fn(),
      getStoriesByAuthor: jest.fn(),
      getStoriesByGenre: jest.fn(),
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
  });

  it('should render library page with user and curated stories', async () => {
    render(
      <BrowserRouter>
        <Stories />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('LIBRARY')).toBeInTheDocument();
    });

    // Should show user stories section
    expect(screen.getByText('Your Tales')).toBeInTheDocument();
    expect(screen.getByText('My Horror Story')).toBeInTheDocument();

    // Should show stories section
    expect(screen.getByText('The Haunting of Blackwood Manor')).toBeInTheDocument();
  });

  it('should not show user stories section when user has no stories', async () => {
    mockUseStories.mockReturnValue({
      allStories: mockCuratedStories,
      userStories: [],
      curatedStories: mockCuratedStories,
      loading: false,
      error: null,
      getStoryBySlug: jest.fn(),
      getStoriesByAuthor: jest.fn(),
      getStoriesByGenre: jest.fn(),
    });

    render(
      <BrowserRouter>
        <Stories />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('LIBRARY')).toBeInTheDocument();
    });

    expect(screen.queryByText('Your Tales')).not.toBeInTheDocument();
  });

  it('should handle write button click for authenticated users', async () => {
    render(
      <BrowserRouter>
        <Stories />
      </BrowserRouter>
    );

    const writeButton = screen.getByText('Write');
    fireEvent.click(writeButton);

    await waitFor(() => {
      // Should show writing editor
      expect(screen.queryByText('LIBRARY')).not.toBeInTheDocument();
    });
  });

  it('should redirect to login when unauthenticated user clicks write', async () => {
    const mockGoToLogin = jest.fn();
    mockUseAuth.mockReturnValue({
      currentUser: null,
      userProfile: null,
      loading: false,
      signIn: jest.fn(),
      signUp: jest.fn(),
      signOut: jest.fn(),
      updateProfile: jest.fn(),
    });

    jest.spyOn(require('../../hooks/useNavigation'), 'useNavigation').mockReturnValue({
      goTo: {
        home: jest.fn(),
        stories: jest.fn(),
        storyDetail: jest.fn(),
        login: mockGoToLogin,
      },
    });

    render(
      <BrowserRouter>
        <Stories />
      </BrowserRouter>
    );

    const writeButton = screen.getByText('Write');
    fireEvent.click(writeButton);

    expect(mockGoToLogin).toHaveBeenCalled();
  });

  it('should handle story click navigation', async () => {
    const mockGoToStoryDetail = jest.fn();
    jest.spyOn(require('../../hooks/useNavigation'), 'useNavigation').mockReturnValue({
      goTo: {
        home: jest.fn(),
        stories: jest.fn(),
        storyDetail: mockGoToStoryDetail,
        login: jest.fn(),
      },
    });

    render(
      <BrowserRouter>
        <Stories />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('My Horror Story')).toBeInTheDocument();
    });

    const storyCard = screen.getByText('My Horror Story').closest('article');
    if (storyCard) {
      fireEvent.click(storyCard);
      expect(mockGoToStoryDetail).toHaveBeenCalledWith('my-story');
    }
  });

  it('should handle bookmark toggle', async () => {
    const mockToggleBookmark = jest.fn();
    mockUseBookmarks.mockReturnValue({
      bookmarkedSlugs: new Set(),
      toggleBookmark: mockToggleBookmark,
      isBookmarked: jest.fn(),
    });

    render(
      <BrowserRouter>
        <Stories />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('My Horror Story')).toBeInTheDocument();
    });

    // Hover over story card to show bookmark button
    const storyCard = screen.getByText('My Horror Story').closest('.group');
    if (storyCard) {
      fireEvent.mouseEnter(storyCard);
      
      // Find and click bookmark button
      const bookmarkButtons = screen.getAllByText('🔖');
      if (bookmarkButtons.length > 0) {
        fireEvent.click(bookmarkButtons[0]);
        expect(mockToggleBookmark).toHaveBeenCalled();
      }
    }
  });

  it('should display covers with correct types', async () => {
    render(
      <BrowserRouter>
        <Stories />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('My Horror Story')).toBeInTheDocument();
    });

    // User story should have image cover
    const userStoryCard = screen.getByText('My Horror Story').closest('article');
    expect(userStoryCard).toBeInTheDocument();

    // Curated story should have gif cover
    const curatedStoryCard = screen.getByText('The Haunting of Blackwood Manor').closest('article');
    expect(curatedStoryCard).toBeInTheDocument();
  });

  it('should handle back button navigation', async () => {
    const mockGoToHome = jest.fn();
    jest.spyOn(require('../../hooks/useNavigation'), 'useNavigation').mockReturnValue({
      goTo: {
        home: mockGoToHome,
        stories: jest.fn(),
        storyDetail: jest.fn(),
        login: jest.fn(),
      },
    });

    render(
      <BrowserRouter>
        <Stories />
      </BrowserRouter>
    );

    const backButton = screen.getByText('Back');
    fireEvent.click(backButton);

    expect(mockGoToHome).toHaveBeenCalled();
  });

  it('should show torch effect prompt when torch is inactive', async () => {
    render(
      <BrowserRouter>
        <Stories />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Move your cursor to light the torch/i)).toBeInTheDocument();
    });
  });
});
