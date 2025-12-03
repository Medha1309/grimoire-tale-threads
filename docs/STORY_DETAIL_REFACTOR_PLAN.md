# Story Detail Page - Complete Refactor Plan

## Authentication Design Philosophy

### Public Access (No Login Required)
- ✅ View story details (title, author, cover, description)
- ✅ Read story content
- ✅ See public stats (views, likes count, bookmarks count, comments count)
- ✅ Browse related stories

### Requires Authentication
- 🔒 Like a story
- 🔒 Bookmark a story
- 🔒 Rate a story
- 🔒 Comment on a story
- 🔒 Write stories

## Loading States - Separated Concerns

### 1. Story Content Loading
- **What:** The actual story data (title, author, content, etc.)
- **Blocks:** Entire page render
- **Source:** `useStories` hook
- **State:** `storiesLoading`

### 2. Stats Loading
- **What:** Public stats (views, likes, bookmarks, comments count)
- **Blocks:** Nothing - shows placeholder
- **Source:** `useStoryInteractions` hook
- **State:** `statsLoading`

### 3. User Interaction Loading
- **What:** User's personal interactions (liked?, bookmarked?, rating)
- **Blocks:** Only interaction buttons
- **Source:** `useStoryInteractions` hook (only if logged in)
- **State:** `interactionLoading`

## Refactored Hook Structure

```typescript
useStoryInteractions(storyId) returns:
  - stats: StoryStats (public data)
  - userInteraction: UserInteraction (private data, empty if not logged in)
  - commentsCount: number
  - statsLoading: boolean (for public stats)
  - interactionLoading: boolean (for user data)
  - toggleLike() - throws if not logged in
  - toggleBookmark() - throws if not logged in
  - rateStory() - throws if not logged in
```

## Page Behavior

1. **Initial Load:**
   - Show loading screen only while story content loads
   - Once story loads, show page immediately
   - Stats show "..." placeholders while loading
   - Buttons are enabled once interaction data loads

2. **Not Logged In:**
   - Stats load and display normally
   - Buttons are enabled (not disabled)
   - Clicking like/bookmark redirects to login

3. **Logged In:**
   - Stats load and display normally
   - User interaction loads separately
   - Buttons disabled only during interaction loading
   - Once loaded, buttons reflect user's state

## Clean Code Principles

- Separate concerns: content, stats, user interactions
- No blocking on non-critical data
- Clear loading states for each concern
- Graceful degradation for non-logged-in users
