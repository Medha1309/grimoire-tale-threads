# Library Writing Experience

## Overview
The Library now features a professional novel writing interface optimized for long-form content creation. It reuses the diary's proven writing components but tailors them specifically for book writing with enhanced tools and statistics.

## Key Features

### 1. **Professional Sidebar**
- **Writing Statistics**: Real-time tracking of words, characters, paragraphs, sentences, and estimated reading time
- **Daily Goals**: Set and track word count goals with visual progress indicators
- **Genre Selection**: Quick genre switching (Horror, Thriller, Mystery, Romance)
- **Craft Tips**: Contextual writing advice for better storytelling
- **Auto-save Status**: Visual feedback on draft saving

### 2. **Distraction-Free Editor**
- Clean, minimal interface focused on the writing
- Large, readable serif font optimized for long-form writing
- Generous line height (1.9) and letter spacing for comfortable reading
- Collapsible sidebar to maximize writing space

### 3. **Rich Text Formatting**
- **Bold** (Ctrl+B): `**text**`
- *Italic* (Ctrl+I): `*text*`
- ~~Strikethrough~~: `~~text~~`
- Chapter breaks with automatic formatting
- Markdown support throughout

### 4. **Focus Mode**
- Full-screen distraction-free writing
- Ambient background with floating particles
- Word count display
- Press `Esc` to exit

### 5. **Smart Features**
- Auto-save drafts to localStorage every 5 seconds
- Keyboard shortcuts for common actions
- Real-time word count in toolbar
- Chapter break insertion tool
- Smooth animations and transitions

## Design Philosophy

### Sophisticated & Mature
- Designed for 30-50 year old writers
- No gimmicky elements or childish aesthetics
- Professional color palette (zinc grays, subtle reds)
- Elegant typography with serif fonts

### Writer-Focused
- All tools a novelist needs without clutter
- Statistics that matter (reading time, paragraph count)
- Craft tips that actually help
- Smooth, polished interactions

### Performance Optimized
- Reuses existing diary components for consistency
- Efficient rendering with React.useMemo
- Debounced auto-save
- Minimal re-renders

## Component Architecture

```
NovelWritingEditor
├── FocusMode (reused from diary)
├── WritingGoals (reused from diary)
├── useAutoSave hook (reused from diary)
└── Custom novel-specific features
    ├── Statistics panel
    ├── Formatting toolbar
    ├── Chapter management
    └── Genre selection
```

## Usage

1. Click "Write" button in the Library
2. Enter your novel title
3. Select genre from sidebar
4. Set a daily word goal (optional)
5. Start writing with full formatting support
6. Use Focus Mode for deep work sessions
7. Auto-save keeps your work safe
8. Click "Publish" when ready

## Keyboard Shortcuts

- `Ctrl/Cmd + B`: Bold
- `Ctrl/Cmd + I`: Italic
- `Ctrl/Cmd + S`: Save
- `Esc`: Exit Focus Mode

## Technical Details

- **Auto-save**: 5-second delay, saves to localStorage
- **Statistics**: Calculated in real-time with useMemo
- **Reading Time**: Based on 200 words/minute average
- **Formatting**: Markdown-based for portability
- **State Management**: Local React state with callbacks

## Future Enhancements

Potential additions for future iterations:
- Chapter navigation sidebar
- Export to various formats (PDF, EPUB)
- Version history
- Collaboration features
- AI writing assistance
- Thesaurus integration
- Grammar checking

## Aesthetic Alignment

The writing experience maintains the app's sophisticated horror aesthetic:
- Subtle texture overlays
- Muted color palette
- Elegant animations
- Professional typography
- No cartoonish elements
- Mature, polished feel

Perfect for serious writers who want powerful tools in a beautiful, distraction-free environment.
