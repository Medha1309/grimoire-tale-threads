/**
 * Unified App Navigation Hook
 * Provides consistent, type-safe navigation throughout the app
 */

import { useNavigate, useLocation } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { ROUTES, buildRoute } from '../config/routes';

interface NavigationOptions {
  replace?: boolean;
  state?: any;
}

interface StoryFilters {
  genre?: string;
  sort?: string;
  search?: string;
}

/**
 * Main navigation hook with history tracking and smart back
 */
export const useAppNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [navigationHistory, setNavigationHistory] = useState<string[]>([]);

  // Track navigation history
  useEffect(() => {
    setNavigationHistory(prev => [...prev, location.pathname]);
  }, [location.pathname]);

  // Check if we can go back
  const canGoBack = useCallback(() => {
    return window.history.length > 1 && location.key !== 'default';
  }, [location.key]);

  // Smart back - goes to previous page or fallback
  const goBack = useCallback((fallback: string = ROUTES.HOME) => {
    if (canGoBack()) {
      navigate(-1);
    } else {
      navigate(fallback);
    }
  }, [navigate, canGoBack]);

  // Navigation methods
  const goTo = {
    // Core pages
    home: (options?: NavigationOptions) => 
      navigate(ROUTES.HOME, options),
    
    stories: (filters?: StoryFilters, options?: NavigationOptions) => {
      const query = filters ? `?${new URLSearchParams(filters as any)}` : '';
      navigate(`${ROUTES.STORIES}${query}`, options);
    },
    
    storyDetail: (slug: string, options?: NavigationOptions) => 
      navigate(buildRoute.storyDetail(slug), options),
    
    reader: (slug: string, options?: NavigationOptions) => 
      navigate(buildRoute.reader(slug), options),
    
    about: (options?: NavigationOptions) => 
      navigate(ROUTES.ABOUT, options),
    
    contact: (options?: NavigationOptions) => 
      navigate(ROUTES.CONTACT, options),
    
    // Auth pages
    login: (options?: NavigationOptions) => 
      navigate(ROUTES.LOGIN, options),
    
    signup: (options?: NavigationOptions) => 
      navigate(ROUTES.SIGNUP, options),
    
    profile: (options?: NavigationOptions) => 
      navigate(ROUTES.PROFILE, options),
    
    userProfile: (userId: string, options?: NavigationOptions) => 
      navigate(`/profile/${userId}`, options),
    
    // Content pages
    compose: (options?: NavigationOptions) => 
      navigate(ROUTES.COMPOSE, options),
    
    forum: (options?: NavigationOptions) => 
      navigate(ROUTES.FORUM, options),
    
    forumPost: (postId: string, options?: NavigationOptions) => 
      navigate(buildRoute.forumPost(postId), options),
    
    diary: (options?: NavigationOptions) => 
      navigate(ROUTES.DIARY, options),
    
    diaryEntry: (entryId: string, options?: NavigationOptions) => 
      navigate(buildRoute.diaryEntry(entryId), options),
    
    // Special pages
    admin: (options?: NavigationOptions) => 
      navigate(ROUTES.ADMIN, options),
    
    desktop: (options?: NavigationOptions) => 
      navigate(ROUTES.DESKTOP, options),
    
    retro: (options?: NavigationOptions) => 
      navigate(ROUTES.RETRO, options),
    
    // Tale Threads
    taleThreads: (options?: NavigationOptions) => 
      navigate('/tale-threads', options),
    
    collaborativeProject: (projectId: string, options?: NavigationOptions) => 
      navigate(`/tale-threads/projects/${projectId}`, options),
    
    // Scrapbook
    scrapbook: (options?: NavigationOptions) => 
      navigate('/scrapbook', options),
    
    scrapbookCollection: (collectionId: string, options?: NavigationOptions) => 
      navigate(`/scrapbook/${collectionId}`, options),
    
    // Smart back
    back: goBack,
  };

  // Exit with confirmation
  const exitWithConfirmation = useCallback((
    message: string,
    destination: string
  ) => {
    if (window.confirm(message)) {
      navigate(destination);
      return true;
    }
    return false;
  }, [navigate]);

  // Replace current route
  const replace = useCallback((path: string) => {
    navigate(path, { replace: true });
  }, [navigate]);

  return {
    goTo,
    goBack,
    exitWithConfirmation,
    replace,
    canGoBack: canGoBack(),
    location,
    navigationHistory,
    navigate, // Expose raw navigate for edge cases
  };
};

/**
 * Hook for handling unsaved changes
 */
export const useUnsavedChanges = (hasChanges: boolean, message?: string) => {
  const defaultMessage = 'You have unsaved changes. Are you sure you want to leave?';
  
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasChanges) {
        e.preventDefault();
        e.returnValue = message || defaultMessage;
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasChanges, message, defaultMessage]);
  
  // Return function to check before navigation
  const checkBeforeNavigate = useCallback(() => {
    if (hasChanges) {
      return window.confirm(message || defaultMessage);
    }
    return true;
  }, [hasChanges, message, defaultMessage]);
  
  return { checkBeforeNavigate };
};

/**
 * Hook for keyboard navigation shortcuts
 */
export const useKeyboardNavigation = (enabled: boolean = true) => {
  const { goTo, goBack } = useAppNavigation();
  
  useEffect(() => {
    if (!enabled) return;
    
    const handleKeyPress = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in input
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }
      
      // Alt + H = Home
      if (e.altKey && e.key === 'h') {
        e.preventDefault();
        goTo.home();
      }
      
      // Alt + B = Back
      if (e.altKey && e.key === 'b') {
        e.preventDefault();
        goBack();
      }
      
      // Alt + L = Library/Stories
      if (e.altKey && e.key === 'l') {
        e.preventDefault();
        goTo.stories();
      }
      
      // Alt + F = Forum
      if (e.altKey && e.key === 'f') {
        e.preventDefault();
        goTo.forum();
      }
      
      // Alt + D = Diary/Dollhouse
      if (e.altKey && e.key === 'd') {
        e.preventDefault();
        goTo.diary();
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [enabled, goTo, goBack]);
};

/**
 * Hook for focus management after navigation
 */
export const useFocusManagement = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Focus main content after navigation
    const mainContent = document.querySelector('main');
    if (mainContent) {
      (mainContent as HTMLElement).focus();
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);
};
