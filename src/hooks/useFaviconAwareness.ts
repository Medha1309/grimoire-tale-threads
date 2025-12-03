import { useEffect } from 'react';
import { showFaviconNotification, setFaviconState } from '../utils/dynamicFavicon';

/**
 * Hook to make favicon respond to notifications
 */
export const useFaviconNotification = (hasNewNotification: boolean) => {
  useEffect(() => {
    if (hasNewNotification) {
      showFaviconNotification();
    }
  }, [hasNewNotification]);
};

/**
 * Hook to make favicon respond to page context
 */
export const useFaviconContext = (context: 'writing' | 'reading' | 'social' | 'default') => {
  useEffect(() => {
    switch (context) {
      case 'writing':
        setFaviconState('typing');
        break;
      case 'reading':
        setFaviconState('watching');
        break;
      case 'social':
        setFaviconState('active');
        break;
      default:
        setFaviconState('idle');
    }

    return () => {
      setFaviconState('idle');
    };
  }, [context]);
};
