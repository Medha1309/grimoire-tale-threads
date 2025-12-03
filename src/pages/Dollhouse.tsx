import React, { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { DollhouseBackground } from '../components/diary/DollhouseBackground';
import { DollhouseTitle } from '../components/diary/DollhouseTitle';
import { DollhouseHomeView } from '../components/diary/DollhouseHomeView';
import { DollhouseViewRouter } from '../components/diary/DollhouseViewRouter';
import { BoudoirAtmosphere, useBoudoirAtmosphere } from '../components/diary/BoudoirAtmosphere';
import { NoiseMode } from '../components/diary/NoiseMode';
import { useDiaryEntries } from '../hooks/useDiaryEntries';
import { useAuth } from '../contexts/AuthContext';
import { DiaryEntry } from '../types/diary';

type DiaryView = 'home' | 'diary' | 'write' | 'library' | 'scrapbook' | 'bookmarks' | 'archive' | 'art';
type Mood = 'joy' | 'sorrow' | 'calm' | 'unrest';

import { Page } from '../types';

interface DollhouseProps {
  go: (page: Page, slug?: string) => void;
}

export const Dollhouse: React.FC<DollhouseProps> = ({ go }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { atmospherePos, atmosphereActive } = useBoudoirAtmosphere();
  const [view, setView] = useState<DiaryView>('home');
  const [litRoom, setLitRoom] = useState(-1);
  const [hoveredRoom, setHoveredRoom] = useState(-1);
  const [possessedRoom, setPossessedRoom] = useState(-1);
  const [randomLitRooms, setRandomLitRooms] = useState<Set<number>>(new Set());

  // Diary state
  const { entries, createEntry, deleteEntry } = useDiaryEntries();
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);
  const [diaryLayout, setDiaryLayout] = useState<'book' | 'list' | 'grid'>('book');
  const [savedEntry, setSavedEntry] = useState<DiaryEntry | null>(null);

  // Write state
  const [entryTitle, setEntryTitle] = useState('');
  const [entryText, setEntryText] = useState('');
  const [selectedMood, setSelectedMood] = useState<Mood>('calm');
  const [isLocked, setIsLocked] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessPreview, setShowSuccessPreview] = useState(false);

  // NEW: Enhanced features
  const [selectedStickers, setSelectedStickers] = useState<string[]>([]);
  const [noiseModeEnabled, setNoiseModeEnabled] = useState(false);

  // Bookmarks
  const [bookmarkedStories, setBookmarkedStories] = useState<any[]>([]);

  // Load bookmarks from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('bookmarkedStories');
    if (stored) {
      try {
        setBookmarkedStories(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse bookmarked stories', e);
      }
    }
  }, []);

  // Handle room navigation
  const handleNavigateToRoom = useCallback((newView: DiaryView) => {
    setView(newView);
    setLitRoom(-1);
  }, []);

  // Handle room hover
  const handleRoomHover = useCallback((roomIndex: number) => {
    setHoveredRoom(roomIndex);
    setLitRoom(roomIndex);
  }, []);

  const handleRoomLeave = useCallback(() => {
    setHoveredRoom(-1);
  }, []);

  // Save entry
  const handleSaveEntry = useCallback(async () => {
    if (!currentUser) {
      console.error('❌ Cannot save: User not authenticated');
      alert('Please sign in to save diary entries');
      navigate('/login');
      return;
    }

    if (!entryText.trim()) {
      console.log('❌ Cannot save: Entry text is empty');
      return;
    }

    console.log('💾 Saving diary entry...', { 
      user: currentUser.email,
      contentLength: entryText.length, 
      mood: selectedMood, 
      isLocked 
    });

    setIsSaving(true);
    
    try {
      const newEntry = await createEntry({
        content: entryText,
        mood: selectedMood,
        isLocked,
        enableAI: false,
      });

      if (!newEntry) {
        console.error('❌ Failed to create entry - createEntry returned null');
        alert('Failed to save entry. Please check the console for details.');
        setIsSaving(false);
        return;
      }

      console.log('✅ Entry saved successfully:', newEntry.id);

      setSavedEntry(newEntry);
      setShowSuccessPreview(true);

      setEntryTitle('');
      setEntryText('');
      setSelectedMood('calm');
      setIsLocked(false);

      setTimeout(() => {
        setView('diary');
      }, 1500);
    } catch (error) {
      console.error('❌ Error saving entry:', error);
      alert(`Error saving entry: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSaving(false);
    }
  }, [currentUser, entryText, selectedMood, isLocked, createEntry, navigate]);

  // Cancel entry
  const handleCancelEntry = useCallback(() => {
    setEntryTitle('');
    setEntryText('');
    setSelectedMood('calm');
    setIsLocked(false);
    setSelectedStickers([]);
    setView('diary');
  }, []);

  // Toggle sticker
  const handleStickerToggle = useCallback((id: string) => {
    setSelectedStickers(prev => 
      prev.includes(id) 
        ? prev.filter(s => s !== id)
        : [...prev, id]
    );
  }, []);

  // Clear success state
  const handleClearSuccessState = useCallback(() => {
    setShowSuccessPreview(false);
    setSavedEntry(null);
  }, []);

  // Handle story navigation
  const handleGoToStory = useCallback((slug: string) => {
    go('storyDetail', slug);
  }, [go]);

  const handleGoToStories = useCallback(() => {
    go('stories');
  }, [go]);

  // Remove bookmark
  const handleRemoveBookmark = useCallback((slug: string) => {
    const updated = bookmarkedStories.filter(s => s.slug !== slug);
    setBookmarkedStories(updated);
    localStorage.setItem('bookmarkedStories', JSON.stringify(updated));
  }, [bookmarkedStories]);

  // Delete diary entry
  const handleDeleteEntry = useCallback(async (entryId: string) => {
    const success = await deleteEntry(entryId);
    if (success) {
      setSelectedEntry(null); // Close the modal
    }
  }, [deleteEntry]);

  // Random room lighting effect
  useEffect(() => {
    if (view !== 'home') {
      console.log('🏠 Not on home view, skipping random lights');
      return;
    }

    console.log('💡 Starting random room lighting system');

    const lightUpRandomRoom = () => {
      const roomCount = 5; // Total number of rooms
      const randomRoom = Math.floor(Math.random() * roomCount);
      
      console.log(`✨ Lighting up room ${randomRoom}`);
      
      setRandomLitRooms(prev => {
        const newSet = new Set(prev);
        newSet.add(randomRoom);
        console.log('Current lit rooms:', Array.from(newSet));
        return newSet;
      });

      // Turn off the light after a longer duration
      const duration = 4000 + Math.random() * 3000; // 4-7 seconds
      setTimeout(() => {
        console.log(`🌑 Turning off room ${randomRoom}`);
        setRandomLitRooms(prev => {
          const newSet = new Set(prev);
          newSet.delete(randomRoom);
          return newSet;
        });
      }, duration);
    };

    // Initial random lights - start immediately
    lightUpRandomRoom();

    // Set up recurring random lighting
    const interval = setInterval(() => {
      if (Math.random() > 0.3) { // 70% chance to light up a room
        lightUpRandomRoom();
      }
    }, 2000 + Math.random() * 3000); // Every 2-5 seconds

    return () => {
      console.log('🛑 Stopping random room lighting');
      clearInterval(interval);
    };
  }, [view]);

  // Unused state cleanup
  useEffect(() => {
    setPossessedRoom(-1);
  }, []);

  // Removed idle heart animation

  // NEW: Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }

      // Ctrl/Cmd + S to save (when in write view)
      if ((e.ctrlKey || e.metaKey) && e.key === 's' && view === 'write') {
        e.preventDefault();
        if (entryText.trim().length > 0) {
          handleSaveEntry();
        }
      }

      // Shift + Enter for new entry
      if (e.shiftKey && e.key === 'Enter' && view === 'diary') {
        e.preventDefault();
        setView('write');
      }

      // Escape to cancel (when in write view)
      if (e.key === 'Escape' && view === 'write') {
        handleCancelEntry();
      }

      // N key to toggle noise mode
      if (e.key === 'n' && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
        setNoiseModeEnabled(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [view, entryText, handleSaveEntry, handleCancelEntry]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Original wallpaper background */}
      <DollhouseBackground />

      {/* Atmospheric glow effect - behind content */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 5 }}>
        <BoudoirAtmosphere active={atmosphereActive} position={atmospherePos} />
      </div>

      {/* NEW: Noise Mode CRT Effect */}
      <NoiseMode enabled={noiseModeEnabled} />

      {/* Removed floating heart animation */}

      {/* Film grain texture */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.9" /></filter><rect width="100%" height="100%" filter="url(%23noise)"/></svg>')`,
          opacity: 0.02,
          zIndex: 15,
        }}
      />

      {/* Subtle vignette for depth */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
          zIndex: 15,
        }}
      />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
          {view === 'home' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-6xl"
            >
              <DollhouseTitle />
              <DollhouseHomeView
                litRoom={litRoom}
                hoveredRoom={hoveredRoom}
                possessedRoom={possessedRoom}
                randomLitRooms={randomLitRooms}
                onRoomHover={handleRoomHover}
                onRoomLeave={handleRoomLeave}
                onNavigateToRoom={handleNavigateToRoom}
                onBack={() => go('landing')}
              />
            </motion.div>
          )}

          {view !== 'home' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-6xl"
            >
              <DollhouseViewRouter
                view={view}
                entries={entries}
                selectedEntry={selectedEntry}
                diaryLayout={diaryLayout}
                savedEntry={savedEntry}
                entryTitle={entryTitle}
                entryText={entryText}
                selectedMood={selectedMood}
                isLocked={isLocked}
                isSaving={isSaving}
                showSuccessPreview={showSuccessPreview}
                selectedStickers={selectedStickers}
                bookmarkedStories={bookmarkedStories}
                onNavigateToRoom={handleNavigateToRoom}
                onSetView={setView}
                onSetDiaryLayout={setDiaryLayout}
                onSetSelectedEntry={setSelectedEntry}
                onSetEntryTitle={setEntryTitle}
                onSetEntryText={setEntryText}
                onSetSelectedMood={setSelectedMood}
                onSetIsLocked={setIsLocked}
                onStickerToggle={handleStickerToggle}
                onSaveEntry={handleSaveEntry}
                onCancelEntry={handleCancelEntry}
                onClearSuccessState={handleClearSuccessState}
                onGoToStory={handleGoToStory}
                onGoToStories={handleGoToStories}
                onRemoveBookmark={handleRemoveBookmark}
                onDeleteEntry={handleDeleteEntry}
              />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

// Export with alternative name for compatibility
export const Boudoir = Dollhouse;
