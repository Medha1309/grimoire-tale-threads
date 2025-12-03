# The Tea Room (Forum) - Quick Start Guide

**Last Updated**: December 2, 2024  
**Status**: ✅ Production Ready

---

## What is The Tea Room?

The Tea Room is a **discussion forum** where users can create threads about stories, reply to discussions, and engage with the community. It features a beautiful gothic aesthetic with floating candles and ambient fog effects.

---

## Features

### Core Functionality
- ✅ **Create Threads** - Post discussions with title, content, and genre tags
- ✅ **Reply to Threads** - Nested replies (2 levels deep)
- ✅ **Like System** - Like threads and replies with candle icon
- ✅ **Share Threads** - Share via X (Twitter), email, or copy link
- ✅ **Report Content** - Report inappropriate content to moderators
- ✅ **Filter & Sort** - Filter by 13 genre tags, sort by recent/popular/active
- ✅ **Search** - Search threads by title, content, author, or tags
- ✅ **Edit & Delete** - Authors can edit or delete their own threads

### Visual Design
- Gothic "séance chamber" theme
- 12 floating candles that follow mouse movement
- Ambient fog with pulsing animation
- Film grain texture overlay
- Elegant corner bracket ornaments
- Magazine-style thread layout

---

## User Guide

### Creating a Thread

1. Navigate to `/forum` (The Tea Room)
2. Click the **"New Post"** button
3. Fill in the form:
   - **Title**: Up to 100 characters
   - **Content**: Up to 5000 characters (rich text supported)
   - **Genre Tags**: Select from 13 options (optional)
4. Click **"Post"**
5. Your thread appears at the top of the list

### Viewing a Thread

1. Click any thread card in the list
2. View full content with author info
3. See all replies in nested format
4. Actions available:
   - Like the thread
   - Share the thread
   - Report inappropriate content
   - Edit (if you're the author)
   - Delete (if you're the author)

### Replying to a Thread

1. Scroll to the reply form at the bottom
2. Type your reply (minimum 3 characters)
3. Optionally quote another reply
4. Click **"Reply"**
5. Your reply appears immediately

### Filtering & Searching

**Filters**:
- **Sort by**: Recent, Popular, Active
- **Genre Tags**: Select one or more genres
- **Clear All**: Reset all filters

**Search**:
- Type in the search bar
- Searches: titles, content, authors, tags, story titles
- Results update in real-time

---

## Configuration

### Sample Data Mode

The forum can use sample data for testing or real Firebase data for production.

**Environment Variable**: `.env`
```bash
# Set to 'true' for sample data, 'false' for Firebase
VITE_USE_SAMPLE_FORUM_DATA=false
```

**Sample Data**: 12 mock threads in `src/data/sampleForumPosts.ts`

### Firebase Collections

**forum_posts**:
- Thread documents
- Fields: id, authorId, authorName, title, content, tags, likeCount, replyCount, createdAt, etc.

**forum_replies**:
- Reply documents
- Fields: id, threadId, parentReplyId, authorId, authorName, content, likeCount, createdAt, depth

**forum_likes**:
- Like tracking
- Fields: userId, targetId, targetType, createdAt

**forum_reports**:
- Content reports
- Fields: targetId, targetType, reporterId, reason, status, createdAt

---

## Technical Details

### File Structure

```
src/pages/Forum.tsx                    # Main page
src/components/forum/
  ├── ForumList.tsx                    # Thread list with magazine layout
  ├── ThreadView.tsx                   # Full thread display
  ├── ThreadPreview.tsx                # Hover preview of replies
  ├── ReplySection.tsx                 # Reply form and nested replies
  ├── FilterChips.tsx                  # Genre and sort filters
  ├── CandleLike.tsx                   # Like button component
  ├── ShareTray.tsx                    # Share modal
  └── ReportModal.tsx                  # Report content modal

src/hooks/
  ├── useForumPosts.ts                 # Fetch/create threads
  ├── useForumPost.ts                  # Fetch single thread + replies
  ├── useForumLikes.ts                 # Like/unlike functionality
  └── useThreadActivity.ts             # Track new activity

src/types/forum.ts                     # TypeScript types
src/data/sampleForumPosts.ts           # Sample data
```

### Key Components

**Forum.tsx**:
- Main page component
- Handles routing between list and detail views
- Manages filters and search

**ForumList.tsx**:
- Magazine-style layout
- Featured thread (large)
- Regular threads (2-column grid)
- Hover previews

**ThreadView.tsx**:
- Full thread display
- Gatsby-level refined styling
- Actions: like, share, report, edit, delete

**ReplySection.tsx**:
- Nested reply system (max 2 levels)
- Reply form with validation
- Quote and like functionality

### Security

- **Rate Limiting**: Prevents spam
- **Input Validation**: Max lengths, profanity filtering
- **Authentication**: All write operations require login
- **Content Moderation**: Report system for inappropriate content

### Performance

- **Caching**: Thread lists cached in memory
- **Optimistic Updates**: Likes update immediately
- **Lazy Loading**: Images load on demand
- **Pagination**: Loads 12 threads at a time

---

## Keyboard Shortcuts

- **Tab**: Navigate between elements
- **Enter**: Open selected thread
- **Esc**: Close modals

---

## Troubleshooting

### No Threads Showing
- Check filters - try clearing them
- Verify Firebase connection
- Check `VITE_USE_SAMPLE_FORUM_DATA` setting

### Can't Edit Thread
- Ensure you're the author
- Check that you're logged in
- Refresh the page if needed

### Slow Loading
- Check internet connection
- Verify Firebase configuration
- Consider enabling sample data mode for testing

---

## API Reference

### useForumPosts Hook

```typescript
const {
  posts,           // ForumThread[]
  loading,         // boolean
  hasMore,         // boolean
  error,           // string | null
  loadMore,        // () => void
  createPost,      // (data) => Promise<ForumPost>
  refreshPosts,    // () => void
} = useForumPosts(filters);
```

### useForumPost Hook

```typescript
const {
  post,            // ForumThread | null
  replies,         // ReplyNode[]
  loading,         // boolean
  error,           // string | null
} = useForumPost(threadId);
```

### useForumLikes Hook

```typescript
const {
  isLiked,         // boolean
  likeCount,       // number
  loading,         // boolean
  error,           // string | null
  toggleLike,      // () => Promise<void>
} = useForumLikes(targetId, targetType);
```

---

## Future Enhancements

Potential improvements:
- Pagination UI (currently loads all)
- Advanced filtering (by author, date range)
- Saved filter presets
- Thread pinning (admin feature)
- User mentions (@username)
- Rich text formatting toolbar
- Image uploads in threads
- Thread categories/subcategories

---

## Support

For issues or questions:
- Check this documentation
- Review `TALE_THREADS_TECHNICAL_AUDIT.md` for detailed analysis
- File an issue in the repository

---

## Summary

The Tea Room is a **production-ready discussion forum** with:
- ✅ Beautiful gothic design
- ✅ Full CRUD functionality
- ✅ Security and validation
- ✅ Responsive and accessible
- ✅ Clean, maintainable code

**Route**: `/forum`  
**Component**: `src/pages/Forum.tsx`  
**Status**: Ready for production use
