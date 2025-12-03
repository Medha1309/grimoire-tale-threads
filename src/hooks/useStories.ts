/**
 * User Stories Hook
 * Provides access to user-generated stories + seed stories for demo
 */

import { useMemo } from 'react';
import { useUserStories, UserStory } from './useUserStories';
import { getStoryCover } from '../utils/generatePlaceholderCover';
import { parseChapters } from '../utils/chapterParser';
import { SEED_STORIES } from '../data/seedStories';

export interface UnifiedStory {
  id: string;
  slug: string;
  title: string;
  author: string;
  authorId: string;
  cover?: string;
  coverType?: 'image' | 'gif' | 'video';
  genre: 'horror' | 'mystery' | 'romance' | 'thriller';
  blurb: string;
  content: Array<{ page: number; text: string }> | string;
  published?: boolean;
  createdAt?: any;
  updatedAt?: any;
}

export const useStories = () => {
  const { stories: userStories, loading, error } = useUserStories();

  // Convert seed stories to unified format
  const seedStoriesUnified: UnifiedStory[] = useMemo(() => 
    SEED_STORIES.map(story => ({
      id: story.id,
      slug: story.slug,
      title: story.title,
      author: story.author,
      authorId: story.authorId,
      cover: story.cover,
      coverType: story.coverType,
      genre: story.genre,
      blurb: story.blurb,
      content: story.content,
      published: story.published,
      createdAt: story.createdAt,
    })),
    []
  );

  // Convert user story to unified format
  const convertUserStory = (story: UserStory): UnifiedStory => {
    const cover = story.cover || getStoryCover(story);
    
    // Parse chapters from content if it contains chapter breaks
    let content: Array<{ page: number; text: string }> | string;
    if (story.content.includes('---') || story.content.includes('# Chapter')) {
      // Parse into chapters
      content = parseChapters(story.content);
    } else {
      // Keep as plain text
      content = story.content;
    }
    
    return {
      id: story.id,
      slug: story.slug,
      title: story.title,
      author: story.author,
      authorId: story.authorId,
      cover,
      coverType: cover ? (cover.includes('.gif') ? 'gif' : cover.includes('.mp4') ? 'video' : 'image') : undefined,
      genre: story.genre,
      blurb: story.blurb || story.content.substring(0, 150) + '...',
      content,
      published: story.published,
      createdAt: story.createdAt,
      updatedAt: story.updatedAt,
    };
  };

  // Convert all user stories and combine with seed stories
  const allStories = useMemo(() => {
    const converted = userStories.map(convertUserStory);
    // Add seed stories at the end (so user stories appear first)
    return [...converted, ...seedStoriesUnified];
  }, [userStories, seedStoriesUnified]);

  // Get story by slug
  const getStoryBySlug = (slug: string): UnifiedStory | undefined => {
    return allStories.find(s => s.slug === slug);
  };

  // Get stories by author
  const getStoriesByAuthor = (authorId: string): UnifiedStory[] => {
    return allStories.filter(s => s.authorId === authorId);
  };

  // Get stories by genre
  const getStoriesByGenre = (genre: string): UnifiedStory[] => {
    return allStories.filter(s => s.genre === genre);
  };

  return {
    allStories,
    userStories: allStories,
    loading,
    error,
    getStoryBySlug,
    getStoriesByAuthor,
    getStoriesByGenre,
  };
};
