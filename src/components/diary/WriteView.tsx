import { memo } from 'react';
import { SpectralDiaryEditor } from './SpectralDiaryEditor';

type Mood = 'joy' | 'sorrow' | 'calm' | 'unrest';

interface WriteViewProps {
  entryTitle?: string;
  entryText: string;
  selectedMood: Mood;
  isLocked: boolean;
  isSaving: boolean;
  showSuccessPreview?: boolean;
  selectedStickers?: string[];
  onTitleChange?: (title: string) => void;
  onContentChange: (content: string) => void;
  onMoodChange: (mood: Mood) => void;
  onLockToggle: (locked: boolean) => void;
  onStickerToggle?: (id: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export const WriteView = memo<WriteViewProps>(({
  entryText,
  selectedMood,
  isLocked,
  isSaving,
  selectedStickers = [],
  onContentChange,
  onMoodChange,
  onLockToggle,
  onStickerToggle = () => {},
  onSave,
  onCancel,
}) => {
  return (
    <SpectralDiaryEditor
      entryText={entryText}
      selectedMood={selectedMood}
      isLocked={isLocked}
      isSaving={isSaving}
      selectedStickers={selectedStickers}
      onContentChange={onContentChange}
      onMoodChange={onMoodChange}
      onLockToggle={onLockToggle}
      onStickerToggle={onStickerToggle}
      onSave={onSave}
      onCancel={onCancel}
    />
  );
});

WriteView.displayName = 'WriteView';
