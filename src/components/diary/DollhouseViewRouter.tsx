import { memo } from 'react';
import { DiaryEntry } from '../../types/diary';
import { WriteView } from './WriteView';
import { DiaryView } from './DiaryView';
import { BookmarksView } from './BookmarksView';
import { SpectralScrapbook } from './SpectralScrapbook';
import { ArtStudioView } from './ArtStudioView';
import { ReadingArchiveView } from './ReadingArchiveView';
import { DiaryEntryModal } from './DiaryEntryModal';

type DiaryView = 'home' | 'diary' | 'write' | 'library' | 'scrapbook' | 'bookmarks' | 'archive' | 'art';
type Mood = 'joy' | 'sorrow' | 'calm' | 'unrest';

interface DollhouseViewRouterProps {
  view: DiaryView;
  
  // Diary state
  entries: DiaryEntry[];
  selectedEntry: DiaryEntry | null;
  diaryLayout: 'book' | 'list' | 'grid';
  savedEntry: DiaryEntry | null;
  
  // Write state
  entryTitle: string;
  entryText: string;
  selectedMood: Mood;
  isLocked: boolean;
  isSaving: boolean;
  showSuccessPreview: boolean;
  selectedStickers?: string[];
  
  // Bookmarks
  bookmarkedStories: any[];
  
  // Handlers
  onNavigateToRoom: (view: any) => void;
  onSetView: (view: DiaryView) => void;
  onSetDiaryLayout: (layout: 'book' | 'list' | 'grid') => void;
  onSetSelectedEntry: (entry: DiaryEntry | null) => void;
  onSetEntryTitle: (title: string) => void;
  onSetEntryText: (text: string) => void;
  onSetSelectedMood: (mood: Mood) => void;
  onSetIsLocked: (locked: boolean) => void;
  onStickerToggle?: (id: string) => void;
  onSaveEntry: () => void;
  onCancelEntry: () => void;
  onClearSuccessState: () => void;
  onGoToStory: (slug: string) => void;
  onGoToStories: () => void;
  onRemoveBookmark: (slug: string) => void;
  onDeleteEntry?: (entryId: string) => Promise<void>;
}

export const DollhouseViewRouter = memo<DollhouseViewRouterProps>((props) => {
  const {
    view,
    entries,
    diaryLayout,
    savedEntry,
    entryTitle,
    entryText,
    selectedMood,
    isLocked,
    isSaving,
    showSuccessPreview,
    bookmarkedStories,
    onNavigateToRoom,
    onSetView,
    onSetDiaryLayout,
    onSetSelectedEntry,
    onSetEntryTitle,
    onSetEntryText,
    onSetSelectedMood,
    onSetIsLocked,
    onSaveEntry,
    onCancelEntry,
    onClearSuccessState,
    onGoToStory,
    onGoToStories,
    onRemoveBookmark,
  } = props;

  // Write view
  if (view === 'write') {
    return (
      <WriteView
        entryTitle={entryTitle}
        entryText={entryText}
        selectedMood={selectedMood}
        isLocked={isLocked}
        isSaving={isSaving}
        showSuccessPreview={showSuccessPreview}
        selectedStickers={props.selectedStickers}
        onTitleChange={onSetEntryTitle}
        onContentChange={onSetEntryText}
        onMoodChange={onSetSelectedMood}
        onLockToggle={onSetIsLocked}
        onStickerToggle={props.onStickerToggle}
        onSave={onSaveEntry}
        onCancel={onCancelEntry}
      />
    );
  }

  // Diary view
  if (view === 'diary') {
    return (
      <>
        <DiaryView
          entries={entries}
          diaryLayout={diaryLayout}
          savedEntry={savedEntry}
          onBack={() => onSetView('home')}
          onWrite={() => onSetView('write')}
          onLayoutChange={onSetDiaryLayout}
          onEntryClick={onSetSelectedEntry}
          onClearHighlight={onClearSuccessState}
        />
        {/* Entry Detail Modal */}
        {props.selectedEntry && (
          <DiaryEntryModal
            entry={props.selectedEntry}
            onClose={() => onSetSelectedEntry(null)}
            onDelete={props.onDeleteEntry}
            mode="view"
          />
        )}
      </>
    );
  }

  // Scrapbook view
  if (view === 'scrapbook') {
    return (
      <SpectralScrapbook 
        onBack={() => onNavigateToRoom('home')}
      />
    );
  }

  // Bookmarks view
  if (view === 'bookmarks') {
    return (
      <BookmarksView
        bookmarkedStories={bookmarkedStories}
        onNavigateToRoom={onNavigateToRoom}
        onGoToStory={onGoToStory}
        onGoToStories={onGoToStories}
        onRemoveBookmark={onRemoveBookmark}
      />
    );
  }

  // Archive view (Reading History)
  if (view === 'archive') {
    return (
      <ReadingArchiveView
        onBack={() => onNavigateToRoom('home')}
        onNavigateToLibrary={onGoToStories}
      />
    );
  }

  // Art Studio view
  if (view === 'art') {
    return (
      <ArtStudioView onNavigateToRoom={onNavigateToRoom} />
    );
  }

  // Default: return null for home view (handled by parent)
  return null;
});

DollhouseViewRouter.displayName = 'DollhouseViewRouter';
