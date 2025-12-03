# WritingEditor Component

## Overview
A reusable, distraction-free writing interface component that can be used for stories, diary entries, forum posts, and any other long-form content.

## Location
`src/components/shared/WritingEditor.tsx`

## Features
- ✅ Distraction-free full-screen editor
- ✅ Sticky header with word count and actions
- ✅ Large, prominent title input
- ✅ Customizable metadata section (genre, tags, etc.)
- ✅ Optional writing tips with flickering lantern
- ✅ Line numbers
- ✅ Character and word count
- ✅ Error display
- ✅ Floating save reminder
- ✅ Parchment texture background
- ✅ Smooth animations

## Usage

### Basic Example (Stories)
```typescript
import { WritingEditor } from '@/components/shared/WritingEditor';

<WritingEditor
  title={storyTitle}
  content={storyContent}
  onTitleChange={setStoryTitle}
  onContentChange={setStoryContent}
  onCancel={() => setView('library')}
  onSave={handleSaveStory}
  isSaving={isSaving}
  error={saveError}
  titlePlaceholder="Untitled Story"
  saveButtonText="Publish Story"
  pageTitle="Library"
/>
```

### With Metadata (Genre Selector)
```typescript
<WritingEditor
  // ... other props
  metadata={
    <div className="flex items-center gap-2">
      <span className="text-xs text-zinc-600 font-serif">Genre:</span>
      <div className="flex gap-2">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => setGenre(genre)}
            className={genreButtonClass(genre)}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  }
/>
```

### For Diary Entries
```typescript
<WritingEditor
  title={entryTitle}
  content={entryContent}
  onTitleChange={setEntryTitle}
  onContentChange={setEntryContent}
  onCancel={() => navigateToRoom('home')}
  onSave={handleSaveDiary}
  isSaving={isSaving}
  error={saveError}
  titlePlaceholder="Today's Thoughts"
  contentPlaceholder="Pour your heart out... What secrets do you hold today?"
  saveButtonText="Save Entry"
  savingButtonText="Saving..."
  pageTitle="Dollhouse"
  showTips={true}
  tips={[
    'Write freely - this is your private space',
    'Express your true feelings without judgment',
    'Reflect on your day and emotions',
    'Lock entries to keep them extra private',
  ]}
  metadata={
    <div className="flex items-center gap-4">
      {/* Mood selector */}
      <div className="flex gap-2">
        {moods.map((mood) => (
          <button key={mood} onClick={() => setMood(mood)}>
            {mood}
          </button>
        ))}
      </div>
      {/* Lock toggle */}
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={isLocked}
          onChange={(e) => setIsLocked(e.target.checked)}
        />
        <span>Lock Entry</span>
      </label>
    </div>
  }
/>
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `title` | `string` | ✅ | - | Current title value |
| `content` | `string` | ✅ | - | Current content value |
| `onTitleChange` | `(title: string) => void` | ✅ | - | Title change handler |
| `onContentChange` | `(content: string) => void` | ✅ | - | Content change handler |
| `onCancel` | `() => void` | ✅ | - | Cancel button handler |
| `onSave` | `() => void \| Promise<void>` | ✅ | - | Save button handler |
| `metadata` | `React.ReactNode` | ❌ | - | Custom metadata section (genre, tags, etc.) |
| `isSaving` | `boolean` | ❌ | `false` | Loading state for save button |
| `error` | `string \| null` | ❌ | `null` | Error message to display |
| `titlePlaceholder` | `string` | ❌ | `"Untitled"` | Title input placeholder |
| `contentPlaceholder` | `string` | ❌ | `"Begin your tale..."` | Content textarea placeholder |
| `saveButtonText` | `string` | ❌ | `"Publish"` | Save button text |
| `savingButtonText` | `string` | ❌ | `"Publishing..."` | Save button text while saving |
| `pageTitle` | `string` | ❌ | `"Back"` | Back button label |
| `showTips` | `boolean` | ❌ | `true` | Show/hide writing tips section |
| `tips` | `string[]` | ❌ | Default tips | Array of writing tips |
| `minContentLength` | `number` | ❌ | `50` | Minimum content length for save reminder |

## Styling
The component uses the app's existing design system:
- Dark theme (`bg-zinc-950`)
- Serif fonts for content
- Blood red accent color (`#6a0000`)
- Flickering lantern animations
- Parchment texture background

## Integration Points

### Current Usage
- ✅ **Stories Page** (`src/pages/Stories.tsx`) - For writing novels/stories

### Planned Usage
- 🔄 **Dollhouse Page** (`src/pages/Dollhouse.tsx`) - For diary entries
- 🔄 **Forum Page** (`src/pages/Forum.tsx`) - For creating threads/posts
- 🔄 **Compose Page** (`src/pages/Compose.tsx`) - For general writing

## Benefits
1. **Consistency** - Same writing experience across the app
2. **Maintainability** - Update once, affects all writing interfaces
3. **Reusability** - Easy to add new writing features
4. **Flexibility** - Customizable through props and metadata slot
5. **Professional** - Polished, writer-friendly interface

## Next Steps
1. Replace Dollhouse write modal with WritingEditor
2. Update Forum thread creation to use WritingEditor
3. Add auto-save functionality (optional prop)
4. Add draft management (optional prop)
5. Add word goal tracking (optional prop)
