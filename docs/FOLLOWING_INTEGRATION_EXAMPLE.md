# Quick Integration Examples

## 1. Add Follow Button to Story Detail Page

```tsx
// In src/pages/StoryDetail.tsx - Add this import at the top
import { FollowButton } from '../components/social/FollowButton';

// Find where the author info is displayed and add:
<div className="flex items-center justify-between mb-6">
  <div className="flex items-center gap-3">
    {/* Author avatar */}
    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-900 to-zinc-900 flex items-center justify-center text-lg font-serif">
      {story.authorName?.charAt(0)?.toUpperCase()}
    </div>
    
    {/* Author info */}
    <div>
      <button 
        onClick={() => navigate(`/profile/${story.authorId}`)}
        className="text-lg font-serif text-zinc-200 hover:text-red-400 transition-colors"
      >
        {story.authorName}
      </button>
      <p className="text-sm text-zinc-500">Author</p>
    </div>
  </div>
  
  {/* Follow button */}
  <FollowButton userId={story.authorId} variant="compact" />
</div>
```

## 2. Add Follow Button to Story Cards

```tsx
// In src/components/library/StoryCard.tsx
import { FollowButton } from '../social/FollowButton';

// Add to the card, perhaps on hover:
<div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
  <FollowButton userId={story.authorId} variant="compact" />
</div>
```

## 3. Notify Followers When Publishing Story

```tsx
// In your story publishing function (e.g., in Compose page or NovelWritingEditor)
import { notifyFollowersOfNewStory } from '../utils/followingNotifications';

const handlePublish = async () => {
  try {
    // Your existing publish logic
    const storyRef = await addDoc(collection(db, 'userStories'), {
      title: storyData.title,
      content: storyData.content,
      authorId: currentUser.uid,
      authorName: userProfile.displayName,
      published: true,
      publishedAt: serverTimestamp(),
      // ... other fields
    });

    // NEW: Notify all followers
    await notifyFollowersOfNewStory(
      currentUser.uid,
      userProfile.displayName,
      storyRef.id,
      storyData.title
    );

    showSuccess('Story published and followers notified!');
  } catch (error) {
    console.error('Error publishing:', error);
  }
};
```

## 4. Add to Forum Posts

```tsx
// In src/components/forum/PostView.tsx or ForumList.tsx
import { FollowButton } from '../social/FollowButton';

// Next to the author name:
<div className="flex items-center gap-2">
  <span className="text-zinc-300">{post.authorName}</span>
  <FollowButton userId={post.authorId} variant="ghost" />
</div>
```

## 5. Notify on Story Like

```tsx
// In your like handler (wherever you handle story likes)
import { notifyAuthorOfLike } from '../utils/followingNotifications';

const handleLike = async (storyId: string, authorId: string, storyTitle: string) => {
  try {
    // Your existing like logic
    await addDoc(collection(db, 'storyLikes'), {
      storyId,
      userId: currentUser.uid,
      createdAt: serverTimestamp()
    });

    // NEW: Notify the author
    await notifyAuthorOfLike(
      authorId,
      currentUser.uid,
      userProfile.displayName,
      storyId,
      storyTitle
    );
  } catch (error) {
    console.error('Error liking story:', error);
  }
};
```

## 6. Notify on Comment

```tsx
// In your comment submission handler
import { notifyAuthorOfComment } from '../utils/followingNotifications';

const handleCommentSubmit = async (comment: string) => {
  try {
    // Your existing comment logic
    await addDoc(collection(db, 'comments'), {
      storyId,
      userId: currentUser.uid,
      userName: userProfile.displayName,
      content: comment,
      createdAt: serverTimestamp()
    });

    // NEW: Notify the story author
    await notifyAuthorOfComment(
      story.authorId,
      currentUser.uid,
      userProfile.displayName,
      storyId,
      story.title
    );
  } catch (error) {
    console.error('Error posting comment:', error);
  }
};
```

## 7. Make Author Names Clickable

```tsx
// Anywhere you display an author name, make it clickable:
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

<button
  onClick={() => navigate(`/profile/${authorId}`)}
  className="text-zinc-300 hover:text-red-400 transition-colors font-medium"
>
  {authorName}
</button>
```

## 8. Add to User Cameo Component

```tsx
// In src/components/shared/UserCameo.tsx
import { FollowButton } from '../social/FollowButton';

// Add follow button to the cameo:
<div className="flex items-center justify-between">
  <div className="flex items-center gap-2">
    {/* Existing avatar and name */}
  </div>
  <FollowButton userId={userId} variant="ghost" />
</div>
```

## Testing Checklist

- [ ] Follow button appears on story pages
- [ ] Follow button appears on user profiles
- [ ] Clicking follow updates the button state
- [ ] Notification bell shows unread count
- [ ] Clicking notification navigates to correct page
- [ ] Publishing story notifies followers
- [ ] Liking story notifies author
- [ ] Commenting notifies author
- [ ] Follower/following counts update in real-time
- [ ] Can view followers/following lists
- [ ] Can navigate to user profiles from lists

## Quick Start

1. **Deploy Firestore rules** (already updated in firestore.rules)
2. **Add follow button to Story Detail page** (example above)
3. **Test with two accounts** - follow and publish a story
4. **Check notifications** - bell icon should light up
5. **Expand to other pages** as needed

The system is fully functional and ready to use!
