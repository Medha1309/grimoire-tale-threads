/**
 * PageWrapper Component
 * Wraps pages that need navigation props with useNavigation hook
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { buildRoute } from '../config/routes';

// Legacy navigation function for backward compatibility
export const useLegacyNavigation = () => {
  const navigate = useNavigate();
  
  const go = React.useCallback((page: string, slug?: string) => {
    switch (page) {
      case 'home':
        navigate('/');
        break;
      case 'stories':
        navigate('/stories');
        break;
      case 'story':
        if (slug) navigate(buildRoute.storyDetail(slug));
        break;
      case 'reader':
        if (slug) navigate(buildRoute.reader(slug));
        break;
      case 'about':
        navigate('/about');
        break;
      case 'contact':
        navigate('/contact');
        break;
      case 'compose':
        navigate('/compose');
        break;
      case 'login':
        navigate('/login');
        break;
      case 'signup':
        navigate('/signup');
        break;
      case 'profile':
        navigate('/profile');
        break;
      case 'forum':
        navigate('/forum');
        break;
      case 'diary':
        navigate('/diary');
        break;
      default:
        navigate('/');
    }
  }, [navigate]);
  
  return { go };
};

interface PageWrapperProps {
  children: React.ReactElement;
}

export const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  const { go } = useLegacyNavigation();
  return React.cloneElement(children, { go });
};

export default PageWrapper;
