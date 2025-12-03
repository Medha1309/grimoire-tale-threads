/**
 * Haunted Gallery Effects
 * Artworks that change when you're not looking
 */

import { useEffect, useState } from 'react';

export const useHauntedGallery = (artworkCount: number) => {
  const [glitchingIds, setGlitchingIds] = useState<Set<string>>(new Set());
  const [shadowedIds, setShadowedIds] = useState<Set<string>>(new Set());

  // Random artwork glitching
  useEffect(() => {
    if (artworkCount === 0) return;

    const interval = setInterval(() => {
      if (Math.random() < 0.2) {
        // Pick random artwork to glitch
        const randomIndex = Math.floor(Math.random() * artworkCount);
        const id = `artwork-${randomIndex}`;
        
        setGlitchingIds(prev => new Set(prev).add(id));
        
        setTimeout(() => {
          setGlitchingIds(prev => {
            const next = new Set(prev);
            next.delete(id);
            return next;
          });
        }, 500);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [artworkCount]);

  // Random shadow figures appearing
  useEffect(() => {
    if (artworkCount === 0) return;

    const interval = setInterval(() => {
      if (Math.random() < 0.15) {
        const randomIndex = Math.floor(Math.random() * artworkCount);
        const id = `artwork-${randomIndex}`;
        
        setShadowedIds(prev => new Set(prev).add(id));
        
        setTimeout(() => {
          setShadowedIds(prev => {
            const next = new Set(prev);
            next.delete(id);
            return next;
          });
        }, 3000);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [artworkCount]);

  return {
    glitchingIds,
    shadowedIds,
    isGlitching: (id: string) => glitchingIds.has(id),
    isShadowed: (id: string) => shadowedIds.has(id),
  };
};
