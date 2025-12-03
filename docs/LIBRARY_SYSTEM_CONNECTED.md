# Library System - Fully Connected

## Overview
All library components are now properly connected with functional stats, bookmarks, and chapter-based writing.

## Key Features Implemented

### 1. **Functional Stats with Glow Effect**
- **Location**: `StoryCard.tsx`
- **Behavior**: 
  - Stars (⭐) and reads (📖) display actual data from Firebase
  - Numbers glow on hover with warm amber/orange effect
  - Uses `useStoryStats` hook for efficient data fetching with caching
  - Shows "New" for stories with no ratings yet

### 2. **Bookmark System**
- **Removed from**: Library grid hover (no longer shows bookmark button on hover)
- **Added to**: StoryDetail page only
- **Behavior**:
  - Click bookmark button on story detail page to save
  - Syncs with both Firebase (`useStoryInteractions`) and localStorage
  - Bookmarks appear in Dollhouse → Bookmarks room
  - Real-time sync across tabs via storage events

### 3. **Chapter-Based Writing**
- **Location**: `NovelWritingEditor.tsx`
- **Format**:
  ```markdown
  # Chapter 1
  
  Your content here...
  
  ---
  
  # Chapter 2
  
  More content...
  ```
- **Features**:
  - Insert chapter breaks with toolbar button
  - Chapters automatically parsed when story is saved
  - Reader displays chapters sequentially
  - Works with both chapter-based and plain text stories

### 4. **Connected Components**

#### Stories Page (`Stories.tsx`)
- Displays user stories and curated collection
- Shows real-time stats on each card
- Click card to view details
- No bookmark button on hover (moved to detail page)

#### Story Detail (`StoryDetail.tsx`)
- Full story information
- Bookmark button (syncs with Dollhouse)
- Like button
- Comments section
- Chapter list (if story has chapters)
- Related stories sidebar

#### Reader (`Reader.tsx`)
- Reads both chapter arrays and plain text
- Progress bar
- Chapter navigation
- Supports user-created and curated stories

#### Dollhouse Bookmarks (`Dollhouse.tsx`)
- Shows all bookmarked stories
- Syncs with localStorage
- Click to navigate to story detail
- Remove bookmark button

## Data Flow

### Writing a Story
1. User writes in `NovelWritingEditor`
2. Can insert chapter breaks with `---`
3. On publish, content saved to Firebase
4. `parseChapters` utility converts to chapter array if breaks exist
5. Story appears in library with stats initialized

### Reading a Story
1. Click story card in library
2. Navigate to `StoryDetail`
3. View stats, bookmark, like
4. Click "Start Reading"
5. `Reader` displays chapters or plain text
6. Progress tracked

### Bookmarking
1. On `StoryDetail`, click bookmark button
2. Saves to Firebase (`userInteractions` collection)
3. Also saves to localStorage for Dollhouse
4. Bookmark appears in Dollhouse → Bookmarks
5. Click bookmark in Dollhouse to return to story

## Firebase Collections

### `storyStats`
```typescript
{
  views: number;
  likes: number;
  bookmarks: number;
  avgRating: number;
  totalRatings: number;
}
```

### `userInteractions`
```typescript
{
  likedStories: string[];      // Array of story slugs
  bookmarkedStories: string[]; // Array of story slugs
  ratings: {
    [storySlug: string]: number; // 1-5 rating
  };
}
```

### `userStories`
```typescript
{
  slug: string;
  title: string;
  author: string;
  authorId: string;
  content: string;  // Can contain chapter breaks
  genre: 'horror' | 'thriller' | 'mystery' | 'romance';
  cover?: string;
  blurb?: string;
  published: boolean;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
}
```

## Hooks

### `useStoryStats(storyId: string)`
- Lightweight stats fetching
- 1-minute cache to reduce Firebase reads
- Used in library grid for displaying stats

### `useStoryInteractions(storyId: string)`
- Full interaction management
- Handles likes, bookmarks, ratings
- Increments view count
- Used in StoryDetail page

### `useStories()`
- Unified interface for all stories
- Combines user stories and curated stories
- Parses chapters automatically
- Provides helper methods (getStoryBySlug, etc.)

### `useBookmarks()`
- Manages localStorage bookmarks
- Used for Dollhouse integration
- Syncs with Firebase bookmarks

## Utilities

### `chapterParser.ts`
- `parseChapters(content)`: Converts markdown to chapter array
- `chaptersToMarkdown(chapters)`: Converts back to markdown
- `getChapterCount(content)`: Returns number of chapters
- `getPreviewText(content, maxLength)`: Gets preview from first chapter

## Testing Checklist

- [x] Hover over book cards shows glowing stats
- [x] Stats are functional (not random)
- [x] No bookmark button on library grid hover
- [x] Bookmark button works on StoryDetail page
- [x] Bookmarks sync to Dollhouse
- [x] Chapter breaks work in editor
- [x] Chapters display correctly in Reader
- [x] Plain text stories still work
- [x] User stories and curated stories both work
- [x] Stats cache prevents excessive Firebase reads

## Performance Optimizations

1. **Stats Caching**: 1-minute cache reduces Firebase reads
2. **Lazy Loading**: Heavy components lazy loaded
3. **Memoization**: Story data memoized to prevent re-renders
4. **Intersection Observer**: Cards animate only when visible
5. **Debounced Auto-save**: Prevents excessive writes

## Future Enhancements

- [ ] Chapter-specific bookmarks (save reading position)
- [ ] Reading history tracking
- [ ] Story recommendations based on interactions
- [ ] Author following system
- [ ] Reading lists/collections
- [ ] Export stories to PDF/EPUB
