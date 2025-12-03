import { useState, useCallback } from 'react';
import { DiaryEntry } from '../types';

type DiaryView = 'home' | 'diary' | 'write' | 'library' | 'scrapbook' | 'bookmarks' | 'archive' | 'diary-archive' | 'scrapbook-archive' | 'reading-archive' | 'art' | 'art-create' | 'art-detail' | 'art-archive';
type DiaryLayout = 'book' | 'list' | 'grid';
type Mood = 'joy' | 'sorrow' | 'calm' | 'unrest';

export const useDiaryState = () => {
  // View state
  const [view, setView] = useState<DiaryView>('home');
  const [diaryLayout, setDiaryLayout] = useState<DiaryLayout>('book');
  
  // Entry state
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);
  
  // Form state
  const [entryTitle, setEntryTitle] = useState('');
  const [entryText, setEntryText] = useState('');
  const [selectedMood, setSelectedMood] = useState<Mood>('calm');
  const [isLocked, setIsLocked] = useState(false);
  
  // UI state
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessPreview, setShowSuccessPreview] = useState(false);
  const [savedEntry, setSavedEntry] = useState<DiaryEntry | null>(null);
  
  // Room transition state
  const [showRoomTransition, setShowRoomTransition] = useState(false);
  const [pendingView, setPendingView] = useState<DiaryView | null>(null);
  
  // Room lighting state
  const [litRoom, setLitRoom] = useState(-1);
  const [hoveredRoom, setHoveredRoom] = useState(-1);
  const [possessedRoom, setPossessedRoom] = useState(-1);
  
  // Bookmarked stories state
  const [bookmarkedStories, setBookmarkedStories] = useState<any[]>([]);

  // Clear form data
  const clearForm = useCallback(() => {
    setEntryTitle('');
    setEntryText('');
    setSelectedMood('calm');
    setIsLocked(false);
  }, []);

  // Clear success state
  const clearSuccessState = useCallback(() => {
    setShowSuccessPreview(false);
    setSavedEntry(null);
  }, []);

  // Save entry
  const saveEntry = useCallback(async () => {
    if (!entryText.trim()) return;
    
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newEntry: DiaryEntry = {
      id: Date.now().toString(),
      userId: 'current-user',
      content: entryText,
      mood: selectedMood,
      isLocked,
      createdAt: new Date(),
      updatedAt: new Date(),
      isPublished: false,
    };
    
    setEntries(prev => [newEntry, ...prev]);
    setSavedEntry(newEntry);
    setIsSaving(false);
    setShowSuccessPreview(true);
    
    // Auto-navigate to diary after brief success animation
    setTimeout(() => {
      clearForm();
      clearSuccessState();
      setView('diary');
    }, 2000);
  }, [entryText, selectedMood, isLocked, clearForm, clearSuccessState]);

  // Cancel entry creation
  const cancelEntry = useCallback(() => {
    clearForm();
    clearSuccessState();
    setView('diary');
  }, [clearForm, clearSuccessState]);

  // Navigation helpers
  const navigateToRoom = useCallback((targetView: DiaryView) => {
    setView(targetView);
  }, []);

  const handleRoomTransitionComplete = useCallback(() => {
    if (pendingView) {
      setView(pendingView);
      setPendingView(null);
    }
    setShowRoomTransition(false);
  }, [pendingView]);

  return {
    // State
    view,
    diaryLayout,
    entries,
    selectedEntry,
    entryTitle,
    entryText,
    selectedMood,
    isLocked,
    isSaving,
    showSuccessPreview,
    savedEntry,
    showRoomTransition,
    pendingView,
    litRoom,
    hoveredRoom,
    possessedRoom,
    bookmarkedStories,
    
    // Setters
    setView,
    setDiaryLayout,
    setEntries,
    setSelectedEntry,
    setEntryTitle,
    setEntryText,
    setSelectedMood,
    setIsLocked,
    setLitRoom,
    setHoveredRoom,
    setPossessedRoom,
    setBookmarkedStories,
    
    // Actions
    saveEntry,
    cancelEntry,
    clearForm,
    clearSuccessState,
    navigateToRoom,
    handleRoomTransitionComplete,
  };
};
