# GRIMOIRE - Comments & Interactions System 💬

## ✅ What's Been Implemented

### Real-Time Comments System
- ✅ Add comments to stories
- ✅ Reply to comments (nested, up to 3 levels deep)
- ✅ Edit your own comments
- ✅ Delete your own comments
- ✅ Like/unlike comments
- ✅ Real-time updates (see new comments instantly)
- ✅ User authentication required
- ✅ Time ago display (e.g., "2h ago")

### Story Interactions
- ✅ Like/unlike stories
- ✅ Bookmark/unbookmark stories
- ✅ Real-time view counts
- ✅ Real-time like counts
- ✅ Real-time bookmark counts
- ✅ Real-time comment counts
- ✅ User-specific interaction state

## 📁 New Files Created

```
src/
├── hooks/
│   ├── useComments.ts              # Comments hook with real-time updates
│   └── useStoryInteractions.ts     # Story likes, bookmarks, views
├── components/
│   ├── Comment.tsx                 # Individual comment component
│   └── CommentsSection.tsx         # Full comments UI
└── pages/
    └── StoryDetail.tsx             # Updated with real interactions
```

## 🗄️ Database Structure

### Comments Collection
```javascript
comments/{commentId}
  - id: string
  - storyId: string
  - userId: string
  - userName: string
  - userAvatar?: string
  - text: string
  - parentId?: string (for replies)
  - likes: number
  - likedBy: string[] (user IDs)
  - createdAt: timestamp
  - updatedAt?: timestamp
```

### Story Stats Collection
```javascript
storyStats/{storyId}
  - views: number
  - likes: number
  - bookmarks: number
  - avgRating: number
  - totalRatings: number
```

### User Interactions Collection
```javascript
userInteractions/{userId}
  - likedStories: string[] (story IDs)
  - bookmarkedStories: string[] (story IDs)
  - ratings: { [storyId]: number }
```

## 🚀 Features in Detail

### 1. Comments

**Add Comment:**
```typescript
const { addComment } = useComments(storyId);
await addComment("This story is terrifying!");
```

**Reply to Comment:**
```typescript
await addComment("I agree!", parentCommentId);
```

**Edit Comment:**
```typescript
const { editComment } = useComments(storyId);
await editComment(commentId, "Updated text");
```

**Delete Comment:**
```typescript
const { deleteComment } = useComments(storyId);
await deleteComment(commentId);
```

**Like Comment:**
```typescript
const { toggleLike } = useComments(storyId);
await toggleLike(commentId);
```

### 2. Story Interactions

**Like Story:**
```typescript
const { toggleLike } = useStoryInteractions(storyId);
await toggleLike();
```

**Bookmark Story:**
```typescript
const { toggleBookmark } = useStoryInteractions(storyId);
await toggleBookmark();
```

**Rate Story (1-5 stars):**
```typescript
const { rateStory } = useStoryInteractions(storyId);
await rateStory(5);
```

### 3. Real-Time Updates

Comments update automatically when:
- New comments are added
- Comments are edited
- Comments are deleted
- Comments are liked

Stats update automatically when:
- Stories are liked/unliked
- Stories are bookmarked/unbookmarked
- Stories are rated
- Comments are added/deleted

## 🎨 UI Features

### Comment Component
- User avatar (initial-based)
- Username and timestamp
- "Edited" indicator
- Like button with count
- Reply button (up to 3 levels)
- Edit/Delete buttons (own comments only)
- Nested replies with visual indentation
- Collapsible reply threads

### Comments Section
- Comment count header
- New comment textarea
- "Sign in to comment" prompt for guests
- Real-time comment list
- Reply forms inline
- Loading states
- Error handling

### Story Detail Page
- Real view count
- Real like count (with user state)
- Real bookmark count (with user state)
- Real comment count
- Interactive like/bookmark buttons
- Full comments section

## 🔒 Security Rules

Add these to your Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Comments
    match /comments/{commentId} {
      // Anyone can read comments
      allow read: if true;
      
      // Must be authenticated to create
      allow create: if request.auth != null
        && request.resource.data.userId == request.auth.uid
        && request.resource.data.userName is string
        && request.resource.data.text is string
        && request.resource.data.storyId is string;
      
      // Can only update own comments
      allow update: if request.auth != null
        && resource.data.userId == request.auth.uid;
      
      // Can only delete own comments
      allow delete: if request.auth != null
        && resource.data.userId == request.auth.uid;
    }
    
    // Story stats
    match /storyStats/{storyId} {
      // Anyone can read stats
      allow read: if true;
      
      // Only authenticated users can update
      allow write: if request.auth != null;
    }
    
    // User interactions
    match /userInteractions/{userId} {
      // Users can only read/write their own interactions
      allow read, write: if request.auth != null
        && request.auth.uid == userId;
    }
  }
}
```

## 📊 Usage Examples

### In a Component

```typescript
import { useComments } from '../hooks/useComments';
import { useStoryInteractions } from '../hooks/useStoryInteractions';

function StoryPage({ storyId }) {
  // Comments
  const {
    comments,
    loading,
    addComment,
    deleteComment,
    toggleLike,
    getTopLevelComments,
  } = useComments(storyId);
  
  // Interactions
  const {
    stats,
    userInteraction,
    toggleLike: toggleStoryLike,
    toggleBookmark,
  } = useStoryInteractions(storyId);
  
  return (
    <div>
      <h1>Views: {stats.views}</h1>
      <h1>Likes: {stats.likes}</h1>
      <h1>Comments: {comments.length}</h1>
      
      <button onClick={toggleStoryLike}>
        {userInteraction.liked ? 'Unlike' : 'Like'}
      </button>
      
      <CommentsSection 
        storyId={storyId}
        onLoginRequired={() => navigate('/login')}
      />
    </div>
  );
}
```

## 🎯 User Experience

### For Readers
1. **View story** → View count increments
2. **Like story** → Like count updates, button changes color
3. **Bookmark story** → Bookmark count updates, saved to profile
4. **Read comments** → See all discussions in real-time
5. **Add comment** → Comment appears instantly
6. **Reply to comment** → Nested conversation
7. **Like comment** → Heart fills, count updates

### For Authors
- See real-time engagement on their stories
- Read and respond to comments
- Track views, likes, bookmarks
- Future: Analytics dashboard

## 🔧 Customization

### Comment Depth Limit
Change max nesting level in `Comment.tsx`:
```typescript
{depth < 3 && ( // Change 3 to your desired max depth
  <button onClick={() => onReply(comment.id)}>Reply</button>
)}
```

### Time Format
Customize time display in `Comment.tsx`:
```typescript
function getTimeAgo(timestamp: any): string {
  // Customize format here
}
```

### Comment Sorting
Change sort order in `useComments.ts`:
```typescript
orderBy('createdAt', 'desc') // or 'asc' for oldest first
```

## 🐛 Error Handling

All operations include error handling:

```typescript
try {
  await addComment("Great story!");
} catch (error) {
  if (error.message.includes('logged in')) {
    // Redirect to login
  } else {
    // Show error message
  }
}
```

## 📈 Performance

**Optimizations:**
- Real-time listeners (no polling)
- Firestore indexes for fast queries
- Optimistic UI updates
- Lazy loading for nested replies
- Efficient re-renders with React hooks

**Firestore Indexes Needed:**
```
Collection: comments
Fields: storyId (Ascending), createdAt (Descending)
```

Create this index when prompted by Firebase, or manually in Console.

## 🧪 Testing Checklist

- [ ] Add a comment (logged in)
- [ ] Add a comment (logged out - should prompt login)
- [ ] Reply to a comment
- [ ] Edit your own comment
- [ ] Try to edit someone else's comment (should fail)
- [ ] Delete your own comment
- [ ] Like a comment
- [ ] Unlike a comment
- [ ] Like a story
- [ ] Bookmark a story
- [ ] View counts increment
- [ ] Real-time updates work (open in 2 tabs)
- [ ] Nested replies display correctly
- [ ] Time ago displays correctly

## 🚀 What's Next

### Phase 3: Enhanced Features
- [ ] Comment notifications
- [ ] Mention users (@username)
- [ ] Rich text formatting (markdown)
- [ ] Comment reactions (beyond likes)
- [ ] Report inappropriate comments
- [ ] Moderator tools
- [ ] Comment sorting (top, new, old)
- [ ] Comment search
- [ ] Pin comments
- [ ] Award badges to comments

### Phase 4: Analytics
- [ ] Most commented stories
- [ ] Most liked comments
- [ ] User engagement metrics
- [ ] Comment activity timeline
- [ ] Popular discussion topics

## 💡 Tips

1. **Test with multiple accounts** to see real-time updates
2. **Check Firebase Console** to see data structure
3. **Monitor Firestore usage** in Firebase Console
4. **Set up indexes** when prompted
5. **Update security rules** before production

## 🎉 Success!

You now have a fully functional, real-time comments and interactions system! Users can:
- Comment on stories
- Reply to comments
- Like comments and stories
- Bookmark stories
- See real-time updates
- Edit and delete their own content

All data is stored in Firebase and updates in real-time across all users!

**Happy commenting! 👻💬**
