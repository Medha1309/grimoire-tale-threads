/**
 * useArtwork Hook
 * Manages artwork state and localStorage persistence
 */

import { useState, useEffect, useCallback } from 'react';
import { Artwork } from '../types/artwork';

const STORAGE_KEY = 'grimoire_artworks';

export const useArtwork = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load artworks from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Convert date strings back to Date objects
        const artworks = parsed.map((art: any) => ({
          ...art,
          createdAt: new Date(art.createdAt),
          updatedAt: new Date(art.updatedAt),
        }));
        setArtworks(artworks);
      }
    } catch (error) {
      console.error('Failed to load artworks:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save artworks to localStorage
  const saveToStorage = useCallback((artworks: Artwork[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(artworks));
    } catch (error) {
      console.error('Failed to save artworks:', error);
    }
  }, []);

  // Add new artwork
  const addArtwork = useCallback((artwork: Artwork) => {
    setArtworks(prev => {
      const updated = [artwork, ...prev];
      saveToStorage(updated);
      return updated;
    });
  }, [saveToStorage]);

  // Update artwork
  const updateArtwork = useCallback((id: string, updates: Partial<Artwork>) => {
    setArtworks(prev => {
      const updated = prev.map(art =>
        art.id === id ? { ...art, ...updates, updatedAt: new Date() } : art
      );
      saveToStorage(updated);
      return updated;
    });
  }, [saveToStorage]);

  // Delete artwork
  const deleteArtwork = useCallback((id: string) => {
    setArtworks(prev => {
      const updated = prev.filter(art => art.id !== id);
      saveToStorage(updated);
      return updated;
    });
  }, [saveToStorage]);

  // Archive artwork
  const archiveArtwork = useCallback((id: string) => {
    const artwork = artworks.find(art => art.id === id);
    if (!artwork) return;

    // Add to archive
    const archivedArtwork = {
      ...artwork,
      isArchived: true,
      archivedAt: new Date(),
    };

    // Store in archive
    try {
      const archived = JSON.parse(localStorage.getItem('grimoire_archived_art') || '[]');
      localStorage.setItem('grimoire_archived_art', JSON.stringify([archivedArtwork, ...archived]));
    } catch (error) {
      console.error('Failed to archive artwork:', error);
    }

    // Remove from active artworks
    deleteArtwork(id);
  }, [artworks, deleteArtwork]);

  // Get artwork by ID
  const getArtwork = useCallback((id: string) => {
    return artworks.find(art => art.id === id);
  }, [artworks]);

  // Filter non-archived artworks
  const activeArtworks = artworks.filter(art => !art.isArchived);

  return {
    artworks: activeArtworks,
    isLoading,
    addArtwork,
    updateArtwork,
    deleteArtwork,
    archiveArtwork,
    getArtwork,
  };
};
