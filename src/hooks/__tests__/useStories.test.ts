/**
 * Tests for useStories hook
 * Ensures unified story system works correctly
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useStories } from '../useStories';
import { useUserStories } from '../useUserStories';
import { useAuth } from '../../contexts/AuthContext';

// Mock dependencies
vi.mock('../useUserStories');
vi.mock('../../contexts/AuthContext');

const mockUseUserStories = useUserStories as any;
const mockUseAuth = useAuth as any;

describe('useStories', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Default mock implementations
    mockUseAuth.mockReturnValue({
      currentUser: { uid: 'test-user-123' } as any,
      userProfile: null,
      loading: false,
      signIn: vi.fn(),
      signUp: vi.fn(),
      signOut: vi.fn(),
      updateProfile: vi.fn(),
    });

    mockUseUserStories.mockReturnValue({
      stories: [],
      loading: false,
      error: null,
      createStory: vi.fn(),
      updateStory: vi.fn(),
      deleteStory: vi.fn(),
    });
  });

  it('should combine user stories and curated stories', async () => {
    const mockUserStories = [
      {
        id: 'user-1',
        slug: 'my-horror-story',
        title: 'My Horror Story',
        author: 'Test User',
        authorId: 'test-user-123',
        content: 'This is my scary story...',
        genre: 'horror' as const,
        blurb: 'A scary tale',
        published: true,
        createdAt: { seconds: Date.now() / 1000 } as any,
      },
    ];

    mockUseUserStories.mockReturnValue({
      stories: mockUserStories,
      loading: false,
      error: null,
      createStory: vi.fn(),
      updateStory: vi.fn(),
      deleteStory: vi.fn(),
    });

    const { result } = renderHook(() => useStories());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Should have all stories (user + seed)
    expect(result.current.allStories.length).toBeGreaterThan(0);
    
    // User story should be first
    const userStory = result.current.allStories.find(s => s.slug === 'my-horror-story');
    expect(userStory).toBeDefined();
    expect(userStory?.authorId).toBe('test-user-123');

    // Should also have seed stories
    expect(result.current.allStories.length).toBeGreaterThan(1);
  });

  it('should get story by slug', async () => {
    const { result } = renderHook(() => useStories());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const story = result.current.getStoryBySlug('blackwood-manor');
    expect(story).toBeDefined();
    expect(story?.title).toBe('The Haunting of Blackwood Manor');
  });

  it('should get stories by genre', async () => {
    const { result } = renderHook(() => useStories());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const horrorStories = result.current.getStoriesByGenre('horror');
    expect(horrorStories.length).toBeGreaterThan(0);
    expect(horrorStories.every(s => s.genre === 'horror')).toBe(true);
  });

  it('should get stories by author', async () => {
    const mockUserStories = [
      {
        id: 'user-1',
        slug: 'story-1',
        title: 'Story 1',
        author: 'Test User',
        authorId: 'test-user-123',
        content: 'Content 1',
        genre: 'horror' as const,
        blurb: 'Blurb 1',
        published: true,
        createdAt: { seconds: Date.now() / 1000 } as any,
      },
      {
        id: 'user-2',
        slug: 'story-2',
        title: 'Story 2',
        author: 'Test User',
        authorId: 'test-user-123',
        content: 'Content 2',
        genre: 'thriller' as const,
        blurb: 'Blurb 2',
        published: true,
        createdAt: { seconds: Date.now() / 1000 } as any,
      },
    ];

    mockUseUserStories.mockReturnValue({
      stories: mockUserStories,
      loading: false,
      error: null,
      createStory: vi.fn(),
      updateStory: vi.fn(),
      deleteStory: vi.fn(),
    });

    const { result } = renderHook(() => useStories());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const authorStories = result.current.getStoriesByAuthor('test-user-123');
    expect(authorStories.length).toBe(2);
    expect(authorStories.every(s => s.authorId === 'test-user-123')).toBe(true);
  });

  it('should handle cover types correctly', async () => {
    const mockUserStories = [
      {
        id: 'user-1',
        slug: 'gif-story',
        title: 'GIF Story',
        author: 'Test User',
        authorId: 'test-user-123',
        content: 'Content',
        genre: 'horror' as const,
        cover: 'https://example.com/cover.gif',
        blurb: 'Blurb',
        published: true,
        createdAt: { seconds: Date.now() / 1000 } as any,
      },
    ];

    mockUseUserStories.mockReturnValue({
      stories: mockUserStories,
      loading: false,
      error: null,
      createStory: vi.fn(),
      updateStory: vi.fn(),
      deleteStory: vi.fn(),
    });

    const { result } = renderHook(() => useStories());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const story = result.current.getStoryBySlug('gif-story');
    expect(story?.coverType).toBe('gif');
  });

  it('should generate placeholder covers for stories without covers', async () => {
    const mockUserStories = [
      {
        id: 'user-1',
        slug: 'no-cover-story',
        title: 'No Cover Story',
        author: 'Test User',
        authorId: 'test-user-123',
        content: 'Content',
        genre: 'horror' as const,
        blurb: 'Blurb',
        published: true,
        createdAt: { seconds: Date.now() / 1000 } as any,
      },
    ];

    mockUseUserStories.mockReturnValue({
      stories: mockUserStories,
      loading: false,
      error: null,
      createStory: vi.fn(),
      updateStory: vi.fn(),
      deleteStory: vi.fn(),
    });

    const { result } = renderHook(() => useStories());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const story = result.current.getStoryBySlug('no-cover-story');
    expect(story?.cover).toBeDefined();
    expect(story?.cover).toContain('data:image/svg+xml');
  });

  it('should handle loading state', () => {
    mockUseUserStories.mockReturnValue({
      stories: [],
      loading: true,
      error: null,
      createStory: vi.fn(),
      updateStory: vi.fn(),
      deleteStory: vi.fn(),
    });

    const { result } = renderHook(() => useStories());

    expect(result.current.loading).toBe(true);
  });

  it('should handle errors', async () => {
    const errorMessage = 'Failed to load stories';
    mockUseUserStories.mockReturnValue({
      stories: [],
      loading: false,
      error: errorMessage,
      createStory: vi.fn(),
      updateStory: vi.fn(),
      deleteStory: vi.fn(),
    });

    const { result } = renderHook(() => useStories());

    await waitFor(() => {
      expect(result.current.error).toBe(errorMessage);
    });
  });
});


