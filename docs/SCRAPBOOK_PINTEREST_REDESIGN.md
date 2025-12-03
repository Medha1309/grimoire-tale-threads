# Scrapbook - Pinterest-Inspired Redesign

## Overview

A clean, cohesive Pinterest-style scrapbook for preserving memories with photos, GIFs, and videos.

## Features

### Core Functionality
- **Masonry Layout**: Pinterest-style responsive grid
- **Media Support**: Photos, GIFs, and videos
- **Rich Metadata**: Date, title, thoughts, mood, location, tags
- **Search & Filter**: By text, tags, and media type
- **Demo Content**: Pre-loaded GIF for demonstration

### Design System
- **Cohesive Aesthetic**: Matches dollhouse design tokens
- **Pink Theme**: #ffb6d9 primary color
- **Serif Typography**: Grimoire font throughout
- **No Emojis**: Clean, professional interface
- **Smooth Animations**: Framer Motion transitions

### User Experience
- **Add Memory**: Upload multiple files, add metadata
- **View Details**: Full-screen modal with gallery
- **Filter**: Search, tags, media type filters
- **Delete**: Confirmation before deletion
- **Responsive**: Works on all screen sizes

## Components

### MemoryScrapbook
Main container with masonry grid layout

### ScrapbookCard
Individual memory card with media preview

### ScrapbookDetail
Full-screen modal for viewing memory details

### ScrapbookAddModal
Form for creating new memories

### ScrapbookFilters
Search and filter controls

## Data Structure

```typescript
interface ScrapbookEntry {
  id: string;
  date: Date;
  title: string;
  thought: string;
  media: ScrapbookMedia[];
  tags: string[];
  mood?: string;
  location?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

## Storage

- **localStorage**: Browser-based persistence
- **Key**: `grimr_scrapbook_entries`
- **Demo Entry**: Haunting GIF pre-loaded

## Usage

```bash
npm run dev
# Navigate to: Dollhouse → Scrapbook
```

### Adding a Memory
1. Click "Add Memory"
2. Fill in date, title, and thoughts
3. Upload photos/GIFs/videos
4. Add optional mood, location, tags
5. Click "Save Memory"

### Viewing a Memory
- Click any card to open full view
- Navigate through multiple media
- View all metadata
- Delete if needed

### Filtering
- Search by text
- Filter by media type (All/Photos/GIFs/Videos)
- Filter by tags
- Clear all filters

## Design Tokens

Uses `dollhouseTokens` for consistency:
- Colors: Pink theme (#ffb6d9)
- Typography: Serif font
- Shadows: Subtle pink glow
- Borders: Pink with low opacity
- Backgrounds: Dark with transparency

## Demo Content

Pre-loaded entry:
- **Title**: "A Haunting Memory"
- **Date**: October 31, 2024
- **Thought**: "Some memories refuse to fade..."
- **Media**: Haunting GIF from Giphy
- **Tags**: haunting, memories, darkness
- **Mood**: melancholic
- **Location**: The Old House

## Technical Details

- **Framework**: React + TypeScript
- **Animations**: Framer Motion
- **Layout**: CSS Columns (masonry)
- **Storage**: localStorage
- **File Upload**: FileReader API
- **Image Formats**: All image types, GIFs, videos

## Future Enhancements

- Firebase integration
- Collaborative scrapbooks
- Export as PDF
- Print layouts
- Advanced filters (date range)
- Bulk operations
- Archive system integration

---

**Status**: Complete and functional
**Design**: Cohesive with app aesthetic
**No Emojis**: Clean professional interface
**Demo**: Pre-loaded GIF included
