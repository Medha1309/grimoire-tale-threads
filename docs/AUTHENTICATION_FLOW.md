# Authentication & Permission Flow

## User Journey

```
┌─────────────────────────────────────────────────────────────┐
│                    User Visits Library                       │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              View Stories (No Login Required)                │
│  ✓ Browse stories                                            │
│  ✓ Read story details                                        │
│  ✓ See view counts, likes, bookmarks                         │
│  ✓ Read comments                                             │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│           User Clicks Like/Bookmark/Comment                  │
└─────────────────────────────────────────────────────────────┘
                            ↓
                    ┌───────────────┐
                    │  Logged In?   │
                    └───────────────┘
                     ↓             ↓
                   NO             YES
                     ↓             ↓
        ┌────────────────┐   ┌────────────────┐
        │ Redirect to    │   │ Perform Action │
        │ Login Page     │   │ Update Firestore│
        └────────────────┘   └────────────────┘
                                      ↓
                            ┌────────────────┐
                            │ Real-time      │
                            │ Update UI      │
                            └────────────────┘
```

## Firestore Permission Flow

### Story Interactions

```
User Action: Like Story
    ↓
Check: Is user authenticated?
    ↓ YES
Update: storyStats/{storyId}
    - Increment likes count
    ↓
Update: userInteractions/{userId}
    - Add storyId to likedStories array
    ↓
UI Updates: Show filled heart icon
```

### Comments

```
User Action: Add Comment
    ↓
Check: Is user authenticated?
    ↓ YES
Check: Is userId in request == current user?
    ↓ YES
Create: comments/{commentId}
    - storyId
    - userId
    - userName
    - text
    - createdAt
    ↓
UI Updates: Show new comment immediately
```

## Security Rules Logic

### Public Read, Authenticated Write
```
Collections: comments, forum_posts, forum_replies
- Anyone can read
- Must be logged in to create
- Can only edit/delete own content
```

### Private User Data
```
Collections: userInteractions, diary_entries
- Can only read own data
- Can only write own data
```

### Public Stats
```
Collection: storyStats
- Anyone can read
- Anyone can update (for view counts)
- System manages integrity
```

## Authentication Methods

### Email/Password
```
1. User enters email + password
2. Firebase validates credentials
3. Returns user object with uid
4. AuthContext stores user state
5. Components check currentUser
```

### Google Sign-In
```
1. User clicks "Sign in with Google"
2. Google OAuth popup
3. User authorizes
4. Firebase creates/updates user
5. AuthContext stores user state
```

## Component Permission Checks

### StoryDetail.tsx
```typescript
// Like button
const handleLike = async () => {
  try {
    await toggleLike();
  } catch (error) {
    if (error.message.includes('logged in')) {
      goTo.login(); // Redirect to login
    }
  }
};
```

### CommentsSection.tsx
```typescript
// Add comment
const handleSubmitComment = async () => {
  if (!currentUser) {
    onLoginRequired(); // Trigger login modal/redirect
    return;
  }
  await addComment(newComment);
};
```

## Hook Permission Checks

### useStoryInteractions.ts
```typescript
const toggleLike = async () => {
  if (!currentUser) {
    throw new Error('Must be logged in to like');
  }
  // Proceed with Firestore update
};
```

### useComments.ts
```typescript
const addComment = async (text: string) => {
  if (!currentUser || !userProfile) {
    throw new Error('You must be logged in to comment');
  }
  // Proceed with Firestore update
};
```

## Firestore Rules Validation

### When User Tries to Like
```
1. Client calls toggleLike()
2. Hook checks: currentUser exists?
3. Firestore checks: request.auth != null?
4. Firestore checks: userId matches request.auth.uid?
5. If all pass: Update allowed
6. If any fail: Permission denied
```

### When User Tries to Comment
```
1. Client calls addComment()
2. Hook checks: currentUser exists?
3. Firestore checks: request.auth != null?
4. Firestore checks: request.resource.data.userId == request.auth.uid?
5. If all pass: Create allowed
6. If any fail: Permission denied
```

## Error Handling Flow

```
User Action
    ↓
Try Operation
    ↓
    ├─ Success → Update UI
    │
    ├─ Not Authenticated → Redirect to Login
    │
    ├─ Permission Denied → Show Error Message
    │
    └─ Network Error → Show Retry Option
```

## Real-time Updates

```
User A likes story
    ↓
Firestore updates storyStats
    ↓
All connected clients receive update
    ↓
User B sees updated like count
    ↓
No page refresh needed
```

## Best Practices Implemented

✅ Client-side auth check (fast feedback)
✅ Server-side auth check (security)
✅ Graceful error handling
✅ User-friendly error messages
✅ Redirect to login when needed
✅ Real-time updates
✅ Optimistic UI updates
✅ Permission validation at multiple levels
